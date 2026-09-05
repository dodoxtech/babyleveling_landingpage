/**
 * Google Sheets cell sanitization  -  shared by every provider that appends
 * rows to a sheet (currently `lib/contact-provider.ts`). Kept dependency-free
 * so it's trivially unit-testable (see `tests/sheets-sanitize.test.ts`).
 */

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
