/**
 * Waitlist submission model + client helper.
 * See docs/architecture/data-flow.md ("Waitlist model" / "Waitlist flow").
 */

import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

/** A single waitlist signup. `createdAt` is always stamped server-side, never by the client. */
export interface WaitlistEntry {
  email: string;
  /** Optional UTM / referrer tag — unused today, reserved for later attribution. */
  source?: string;
  /** ISO timestamp, set by `app/api/waitlist/route.ts`. */
  createdAt: string;
}

export type WaitlistSubmitOutcome =
  | { ok: true; status: "created" | "duplicate" }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Client-side email shape check — mirrors the server's validation in the route handler. */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/**
 * Submits an email to the waitlist via the server route handler. Never throws:
 * network/parse failures are normalized into the same `{ ok: false }` shape as
 * a server-reported error, so `WaitlistSignup` only has to branch on the
 * return value. `locale` rides along so the route handler can return its
 * error strings (rate-limit, generic failure) in the visitor's language —
 * see TASK-0011.
 */
export async function submitToWaitlist(
  email: string,
  locale: Locale,
): Promise<WaitlistSubmitOutcome> {
  const genericError = getDictionary(locale).home.waitlist.error;

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, locale }),
    });

    const data: unknown = await response.json().catch(() => null);
    const payload =
      data && typeof data === "object" ? (data as Record<string, unknown>) : {};

    if (!response.ok) {
      const message =
        typeof payload.error === "string" ? payload.error : genericError;
      return { ok: false, error: message };
    }

    const status = payload.status === "duplicate" ? "duplicate" : "created";
    return { ok: true, status };
  } catch {
    return { ok: false, error: genericError };
  }
}
