/**
 * Waitlist input validation + sanitization  -  pure, dependency-free helpers so
 * both the server route (`app/api/waitlist/route.ts`) and the storage provider
 * (`lib/waitlist-provider.ts`) share one source of truth for "what is a safe,
 * well-formed waitlist input". Kept free of Next/googleapis imports so it is
 * trivially unit-testable (see `tests/waitlist-validation.test.ts`).
 */

/** Max email length. 254 is the practical SMTP limit (RFC 5321 forward path). */
export const MAX_EMAIL_LENGTH = 254;

/**
 * Max length for the optional attribution `source` tag. It is attacker-supplied
 * and stored verbatim, so we cap it well below anything a legit UTM/referrer
 * value would need to keep a single row from bloating the sheet.
 */
export const MAX_SOURCE_LENGTH = 200;

/**
 * Shape check  -  one `@`, no whitespace, a dotted domain. Deliberately strict
 * about whitespace/`@` rather than RFC-exhaustive; the goal is to reject junk
 * and injection payloads, not to be a full RFC 5322 parser.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Control characters (C0 range + DEL). `\s` in the email pattern catches
 * tab/newline/space, but not NUL, ESC, etc. We reject these outright in any
 * stored field: they have no place in an email or attribution tag and are a
 * classic vector for log forging and downstream parser confusion.
 */
const CONTROL_CHARS = /[\x00-\x1f\x7f]/;
const CONTROL_CHARS_GLOBAL = /[\x00-\x1f\x7f]/g;

/** Trim + lowercase so dedup in the provider is case-insensitive and stable. */
export function normalizeEmail(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().toLowerCase() : "";
}

/**
 * True only for a normalized, in-range, control-char-free, shape-valid email.
 * Pass the output of `normalizeEmail` (or any already-trimmed string).
 */
export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) return false;
  if (CONTROL_CHARS.test(email)) return false;
  return EMAIL_PATTERN.test(email);
}

/**
 * Normalize the optional `source` tag for storage, or `undefined` if it is
 * absent/empty/unusable. Drops control characters, trims, and truncates to
 * `MAX_SOURCE_LENGTH` so a hostile client can't smuggle newlines or megabytes
 * of text into a sheet cell.
 */
export function sanitizeSource(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const cleaned = raw
    .replace(CONTROL_CHARS_GLOBAL, "")
    .trim()
    .slice(0, MAX_SOURCE_LENGTH);
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Neutralize spreadsheet formula injection. Values are written to Google Sheets
 * with `valueInputOption: "RAW"`, which keeps them inert *in the sheet*  -  but
 * the moment someone exports the sheet to CSV and reopens it in Excel/Sheets, a
 * cell beginning with `=`, `+`, `-`, `@` (or a tab/CR) is evaluated as a
 * formula. An email like `=HYPERLINK("http://evil","click")@x.com` is the
 * attack. OWASP's mitigation: prefix any such cell with a single quote so the
 * value is always treated as text.
 */
export function sanitizeCellValue(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}
