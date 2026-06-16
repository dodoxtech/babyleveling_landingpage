---
tags: [task]
status: todo          # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: unassigned  # e.g. claude-code, or a person
---

# TASK-0004 — Closing block: FAQ (S10) + Waitlist (S11) + Footer (S12)

## Context

The bottom-of-page conversion + trust block — the page's only conversion event. This
completes Milestone **M2 — Conversion MVP**: a beautiful page that captures real emails.
Dev tasks D-14, D-15, D-16, D-17. Depends on [[TASK-0002-app-frame-header]].

Read first: [[../../features/waitlist-signup]], [[../../features/faq]],
[[../../architecture/data-flow]] (waitlist flow + `WaitlistEntry`),
[[../../planning/01-strategy#3-story-framework]] (S10–S12),
[[../../planning/05-copy-multilingual]] (`faq.*`, `waitlist.*`, `footer.*`).

## Goal

An accessible FAQ accordion, a working single-field waitlist form (idle→submitting→
success→error) backed by a server route handler, and the site footer.

## Scope

**In scope**
- `sections/Faq` (S10): server-rendered `<details>`/ARIA disclosure from `faq.ts`.
- `sections/WaitlistSignup` (S11): client form, email-only, client + server validation,
  state machine `idle | submitting | success | error`, celebratory "+1 Party Member" success.
- `app/api/waitlist/route.ts`: POST, validate, stamp `createdAt`, honeypot + basic rate-limit,
  **pluggable provider behind an interface** (provider not chosen yet — see ADR below).
- `components/ui/SiteFooter` (S12): sitemap columns, locale-switch stub, legal links, ©.
- Reduced-motion: instant accordion; success shows text + static badge (no burst).

**Out of scope**
- Choosing/integrating the actual email provider implementation (stub the interface; the
  decision is its own ADR — see Technical Notes).
- Marketing nurture emails (marketing track M-01/M-02).
- Functional locale switching (TASK-0011).

## Relevant Files

- `components/sections/Faq.tsx`, `components/sections/WaitlistSignup.tsx` — create.
- `components/ui/SiteFooter.tsx` — create.
- `app/api/waitlist/route.ts` — create.
- `lib/waitlist.ts` — create client submit helper (`fetch POST /api/waitlist`).
- `lib/content/faq.ts` — consume; `WaitlistEntry` type per [[../../architecture/data-flow]].

## Acceptance Criteria

- [ ] FAQ is keyboard-operable; one-or-many open; reduced-motion = instant expand/collapse.
- [ ] Submitting a valid email returns success and shows the confirmation/reward state.
- [ ] Invalid email is rejected client-side with a helpful message and re-validated server-side.
- [ ] Resubmitting the same email does not error confusingly.
- [ ] Route handler has a honeypot + basic rate-limit; `createdAt` stamped server-side.
- [ ] Footer renders the sitemap, legal links, and locale stub; all links valid.
- [ ] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Provider (Resend / Mailchimp / Supabase) is **not yet decided** — code to an interface and
  capture the decision in a new ADR (`docs/decisions/ADR-0002-waitlist-provider.md`) when made.
- Form state is local/ephemeral; no global store (per [[../../architecture/data-flow]]).
- FAQ Q&A is answer-first for AEO (see [[../../planning/04-seo-aeo#10-2-faq-strategy]]).
- pnpm only.

## Definition of Done

- [ ] Acceptance criteria all pass.
- [ ] [[../../features/waitlist-signup]], [[../../features/faq]] `updated:` bumped; new ADR
      created when the provider is chosen; new modules in [[../../architecture/modules]].
- [ ] Task file moved from `active/` to `done/`.
</content>
