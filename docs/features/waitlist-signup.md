---
tags: [feature]
status: implemented
updated: 2026-06-20
---

# Waitlist Signup

> The site's one conversion goal and its only runtime/dynamic surface.

## Overview

An email capture form so visitors can be notified at launch. This is the single piece of
user-generated data on the site and the only path that hits a server. Submission flows
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
