---
tags: [feature]
status: planned
updated: 2026-06-16
---

# Waitlist Signup

> The site's one conversion goal and its only runtime/dynamic surface.

## Overview

An email capture form so visitors can be notified at launch. This is the single piece of
user-generated data on the site and the only path that hits a server. Submission flows
through a Next.js route handler to an email/storage provider — see [[architecture/data-flow]].

## User Stories

- [ ] As a visitor, I can enter my email and join the waitlist in one step.
- [ ] As a visitor, I get immediate inline feedback (submitting → success / error).
- [ ] As a visitor, I see a clear success state confirming I'm on the list.
- [ ] As a visitor who submits an invalid email, I get a helpful validation message.
- [ ] As a visitor, I am not asked for anything beyond an email.
- [ ] As a returning visitor, submitting the same email again does not error confusingly.

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
- Provider (Resend / Mailchimp / Supabase) is pluggable behind the route handler; the
  choice is **not yet made** — capture it in a future ADR when decided. See [[decisions/README]].

## Related
- [[features/hero-section]]
- [[architecture/data-flow]]
- [[decisions/README]]
