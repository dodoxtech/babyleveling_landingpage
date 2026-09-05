---
tags: [feature]
status: superseded
updated: 2026-09-04
---

# Waitlist Signup (pre-launch — superseded by App Store download)

> Historical: the site's conversion goal before launch. As of 2026-09-04 the app is live on
> the App Store, and the entire waitlist feature — form, dictionary fields, API route,
> validation module, and Google Sheets provider — has been **deleted outright**, not just
> unmounted. Every primary CTA (header, hero, closing S11 section) now links straight to the
> real listing (`lib/app-store.ts`). Everything below this point describes the removed
> feature for historical/audit reference only; none of the named files still exist except
> where noted.

## Current state (2026-09-04) — removed, not repurposed

- `components/sections/WaitlistSignup.tsx` was deleted and replaced by
  `components/sections/DownloadSection.tsx` (new file, not a repurposed version of the old
  one): a headline + body + `DownloadCta` button (`components/sections/DownloadCta.client.tsx`)
  linking to `APP_STORE_URL`. The section id/anchor changed from `#waitlist` to `#download`.
- The header CTA (`SiteHeaderClient`) and the Hero CTA (`Hero.tsx`) link straight to
  `APP_STORE_URL` (`target="_blank"`). `lib/content/nav.ts`'s `navCtaHref` now equals
  `APP_STORE_URL` directly (no more `#waitlist` anchor anywhere in the codebase).
- **Deleted files:** `lib/waitlist.ts`, `lib/waitlist-validation.ts`, `lib/waitlist-provider.ts`,
  `app/api/waitlist/route.ts`, `components/sections/WaitlistConfetti.client.tsx`,
  `tests/waitlist-validation.test.ts`. The one piece of shared logic among them,
  `sanitizeCellValue()` (spreadsheet formula-injection guard), moved to a new leaf module
  `lib/sheets-sanitize.ts` since `lib/contact-provider.ts` still needs it; its tests moved to
  `tests/sheets-sanitize.test.ts`.
- The dictionary's `home.waitlist` node was renamed to `home.download` and trimmed to just
  `headline`/`body`/`cta`/`subNote` — the email-form-only fields (`placeholder`, `emailLabel`,
  `ctaVariantB`, `ctaSubmitting`, `invalid`, `error`, `successHeadline`, `successBody`) were
  deleted from the type and all three locale JSON files, not left dangling.
- `lib/analytics.ts`'s `EventName` no longer has `waitlist_submit`/`waitlist_success`/
  `waitlist_error`, and `EventProps` no longer has `status`. Pre-launch copy that referenced
  the waitlist or "hasn't launched yet" was also updated where it appeared outside this
  component: legal privacy/terms pages, `/pricing`, and several FAQ answers — see those
  pages' git history for the specific wording changes made alongside this removal.

## Overview (pre-launch, historical)

An email capture form so visitors could be notified at launch. This was the single piece of
user-generated data on the site and the only path that hit a server. Submission flowed
through a Next.js route handler to an email/storage provider — see [[architecture/data-flow]].

## User Stories

- [x] As a visitor, I can enter my email and join the waitlist in one step.
- [x] As a visitor, I get immediate inline feedback (submitting → success / error).
- [x] As a visitor, I see a clear success state confirming I'm on the list.
- [x] As a visitor who submits an invalid email, I get a helpful validation message.
- [x] As a visitor, I am not asked for anything beyond an email.
- [x] As a returning visitor, submitting the same email again does not error confusingly.

## UX notes

- Single email field + gradient CTA button (matches the app's `ActionButton` energy).
- Form state machine: `idle | submitting | success | error` held in local component state.
- Validate email client-side before POST; always re-validate server-side.
- On success, replace the form with a celebratory confirmation (light "reward" moment).
- In the idle form state, the mascot image follows the active website theme via
  `ThemedBabyMascot.client.tsx`; the `focus` skin uses `cute-baby-boy-waving.png`.
- Honeypot or basic rate-limit on the route handler to deter spam.
- Reduced motion: skip the celebratory animation, keep the success text.

## Data

- `WaitlistEntry` model (`email`, optional `source`, server-stamped `createdAt`) — see [[architecture/data-flow]].
- Client helper: `lib/waitlist.ts`. Server endpoint: `app/api/waitlist/route.ts`.
- Provider is pluggable behind the route handler. The chosen backend is **Google Sheets**
  (`GoogleSheetsWaitlistProvider`): each signup is appended as a row, deduped by email. See
  [[decisions/ADR-0002-waitlist-provider]].

## Implementation (TASK-0004)

- `components/sections/WaitlistSignup.tsx` — Client Component, S11. Local state machine
  `idle | submitting | success | error` (no global store). Client-validates the email via
  `isValidEmail` before POST; always re-validates server-side. A hidden honeypot field
  (`company`) sits next to the real input. On success (`created` or `duplicate` — both
  render identically) the form is replaced by a celebratory "+1 Party Member" badge;
  under reduced motion the badge renders static with no scale/opacity entrance (Framer
  Motion is skipped entirely, mirroring `HeroLogoReveal`'s reduced-motion gate).
- `lib/waitlist.ts` — `WaitlistEntry` type, `isValidEmail()`, and `submitToWaitlist()`
  (fetch `POST /api/waitlist`, normalizes network/parse failures into the same
  `{ ok: false }` shape as a server error so the form only branches once).
- `app/api/waitlist/route.ts` — validates email shape + length server-side, rejects
  honeypot-filled submissions, applies a fixed-window in-memory rate limit (5
  requests/IP/60s), stamps `createdAt`, then delegates storage to `getWaitlistProvider()`.
  Resubmitting the same email returns `200 { status: "duplicate" }`, never an error.
- `lib/waitlist-provider.ts` — the `WaitlistProvider` interface + the
  `GoogleSheetsWaitlistProvider` implementation (TASK-0019). Appends `[email, source,
  createdAt]` to a Google Sheet via the `googleapis` SDK with service-account auth, deduping
  on column A (case-insensitive). Env vars (`GOOGLE_SHEETS_SPREADSHEET_ID`,
  `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`) are documented in
  `.env.local.example`. See [[decisions/ADR-0002-waitlist-provider]].
- Verified manually via `curl POST /api/waitlist`: valid email → `200 created`; same
  email resubmitted → `200 duplicate`; invalid/missing email → `400` with a helpful
  message; honeypot filled → `400`; 6th rapid request from the same IP → `429`.

## Related
- [[features/hero-section]]
- [[architecture/data-flow]]
- [[decisions/ADR-0002-waitlist-provider]]
- [[decisions/README]]
