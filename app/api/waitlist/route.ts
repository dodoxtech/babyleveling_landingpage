import { NextRequest, NextResponse } from "next/server";
import { getWaitlistProvider } from "@/lib/waitlist-provider";
import type { WaitlistEntry } from "@/lib/waitlist";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import {
  isValidEmail,
  normalizeEmail,
  sanitizeSource,
} from "@/lib/waitlist-validation";

/**
 * POST /api/waitlist  -  the site's one dynamic surface (see
 * docs/architecture/data-flow.md "Waitlist flow"). Validates the email,
 * stamps `createdAt` server-side, rejects honeypot-filled bot submissions,
 * applies a basic in-memory rate-limit, then hands off to a `WaitlistProvider`
 * (see lib/waitlist-provider.ts)  -  storage/email-provider choice is explicitly
 * deferred, see the TODO in docs/architecture/modules.md.
 *
 * Error strings are localized from the `locale` the client sends (see
 * `lib/waitlist.ts`'s `submitToWaitlist`, TASK-0011)  -  falls back to `en` if
 * absent/invalid, since the client-side validation message is always shown
 * first for the common "invalid email" case regardless.
 */

// Basic fixed-window, in-memory rate limit. Good enough to deter naive bot
// hammering for now; not durable across serverless instances/restarts  -  a
// real deployment would move this to shared storage (e.g. the same provider
// chosen for waitlist storage, or an edge KV).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientKey(request: NextRequest): string {
  // Vercel/most proxies set x-forwarded-for; fall back to a constant bucket
  // (shared rate limit) if it's ever absent, e.g. local dev without a proxy.
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

interface WaitlistRequestBody {
  email?: unknown;
  source?: unknown;
  locale?: unknown;
  /** Honeypot: a hidden field real visitors never fill; bots that fill every
   * field trip it. Any non-empty value rejects the request. */
  company?: unknown;
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  let body: WaitlistRequestBody = {};
  try {
    body = await request.json();
  } catch {
    // Fall through with an empty body  -  handled by the email-validation branch below.
  }

  const rawLocale = body.locale;
  const locale =
    typeof rawLocale === "string" && isLocale(rawLocale)
      ? rawLocale
      : defaultLocale;
  const { waitlist: messages } = getDictionary(locale).home;

  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: messages.error }, { status: 429 });
  }

  // Honeypot field: real visitors never see or fill this input. Respond with
  // a generic success-shaped rejection so bots get no signal to adapt on,
  // while real users never hit this path at all.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ error: messages.invalid }, { status: 400 });
  }

  const email = normalizeEmail(body.email);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: messages.invalid }, { status: 400 });
  }

  const entry: WaitlistEntry = {
    email,
    source: sanitizeSource(body.source),
    createdAt: new Date().toISOString(),
  };

  try {
    const result = await getWaitlistProvider().submit(entry);
    // Resubmitting the same email is still a 200 with status "duplicate"  -
    // never a confusing error  -  so the UI can show the same success state
    // either way (per docs/features/waitlist-signup.md user story).
    return NextResponse.json({ status: result.status }, { status: 200 });
  } catch {
    return NextResponse.json({ error: messages.error }, { status: 500 });
  }
}
