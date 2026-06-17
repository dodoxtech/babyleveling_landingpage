/**
 * Waitlist storage/notification provider  -  server-side only.
 *
 * The actual provider (Resend / Mailchimp / Supabase) is **not yet decided**
 * (see docs/features/waitlist-signup.md and the TODO in
 * docs/architecture/modules.md). `app/api/waitlist/route.ts` depends only on
 * this interface, never on a concrete vendor SDK, so swapping in a real
 * provider later is a one-file change behind `getWaitlistProvider()`. Capture
 * that decision in a new ADR when it's made  -  do not add a vendor SDK here
 * speculatively.
 */

import type { WaitlistEntry } from "@/lib/waitlist";

export type WaitlistSubmitResult =
  | { status: "created" }
  /** Same email seen before  -  still a success from the caller's point of view. */
  | { status: "duplicate" };

export interface WaitlistProvider {
  submit(entry: WaitlistEntry): Promise<WaitlistSubmitResult>;
}

/**
 * In-memory stub provider. Good enough for local dev and for proving the
 * route handler's contract; data does not persist across server restarts or
 * across serverless function instances in production. Replace with a real
 * provider (e.g. Resend audience, Mailchimp list, Supabase table) behind this
 * same interface  -  see the TODO in docs/architecture/modules.md.
 */
class InMemoryWaitlistProvider implements WaitlistProvider {
  private readonly seen = new Set<string>();

  async submit(entry: WaitlistEntry): Promise<WaitlistSubmitResult> {
    const key = entry.email.toLowerCase();
    if (this.seen.has(key)) {
      return { status: "duplicate" };
    }
    this.seen.add(key);
    return { status: "created" };
  }
}

// Module-scoped singleton so repeated requests in the same server instance
// share the same "seen" set (enough to make resubmission idempotent in dev /
// a single long-lived server process; not durable across deploys/instances).
let provider: WaitlistProvider | undefined;

export function getWaitlistProvider(): WaitlistProvider {
  if (!provider) {
    provider = new InMemoryWaitlistProvider();
  }
  return provider;
}
