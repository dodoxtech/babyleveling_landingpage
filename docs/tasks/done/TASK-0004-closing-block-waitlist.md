---
tags: [task]
status: done           # todo | in-progress | blocked | done
priority: high        # low | medium | high
created: 2026-06-16
assigned: claude-code  # e.g. claude-code, or a person
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

- [x] FAQ is keyboard-operable; one-or-many open; reduced-motion = instant expand/collapse.
- [x] Submitting a valid email returns success and shows the confirmation/reward state.
- [x] Invalid email is rejected client-side with a helpful message and re-validated server-side.
- [x] Resubmitting the same email does not error confusingly.
- [x] Route handler has a honeypot + basic rate-limit; `createdAt` stamped server-side.
- [x] Footer renders the sitemap, legal links, and locale stub; all links valid.
- [x] `pnpm lint` and `pnpm build` pass.

## Technical Notes

- Provider (Resend / Mailchimp / Supabase) is **not yet decided** — code to an interface and
  capture the decision in a new ADR (`docs/decisions/ADR-0002-waitlist-provider.md`) when made.
- Form state is local/ephemeral; no global store (per [[../../architecture/data-flow]]).
- FAQ Q&A is answer-first for AEO (see [[../../planning/04-seo-aeo#10-2-faq-strategy]]).
- pnpm only.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] [[../../features/waitlist-signup]], [[../../features/faq]] `updated:` bumped; new ADR
      created when the provider is chosen; new modules in [[../../architecture/modules]].
- [x] Task file moved from `active/` to `done/`.

## Implementation Notes (post-completion)

**Files added:**
- `lib/content/faq.ts` — `faqItems: FaqItem[]`, 7 real entries. Answer-first per the AEO
  strategy (docs/planning/04-seo-aeo.md §10.2): each `answer` is a self-contained 40–60 word
  claim (checked by word count — all land 43–55 words), `question` phrased as a real
  user/AI-answer-engine query (using the seed questions from §10.2 verbatim where given).
  Facts are grounded in `docs/planning/01-strategy.md` and `05-copy-multilingual.md` (S10
  key message, Pillar 1–4 value props, ICP) — no invented claims (e.g. no specific price was
  stated, since pricing genuinely isn't set pre-launch).
- `components/sections/Faq.tsx` — Server Component, S10. Native `<details>`/`<summary>` per
  question, no client JS. "One-or-many open" is free (`<details>` elements are independent,
  no shared accordion state). Keyboard-operable natively (the `<summary>` is a default
  focusable/activatable control). Reduced motion needs no explicit gate here: there is no
  height-transition animation applied to the native disclosure in the first place, so the
  open/close is already instant for every visitor, motion-preference notwithstanding.
- `lib/waitlist.ts` — `WaitlistEntry` type (matches `docs/architecture/data-flow.md` exactly:
  `email`, optional `source`, server-stamped `createdAt`), `isValidEmail()` (client-side regex
  check), `submitToWaitlist()` (fetch `POST /api/waitlist`; normalizes both HTTP-error and
  network/parse-failure paths into the same `{ ok: false, error }` shape so the form component
  only has one failure branch to handle).
- `lib/waitlist-provider.ts` — `WaitlistProvider` interface (`submit(entry) => Promise<{status:
  "created" | "duplicate"}>`) + `InMemoryWaitlistProvider` stub + `getWaitlistProvider()`
  singleton accessor. The route handler imports only the interface/accessor, never a concrete
  vendor SDK — swapping in Resend/Mailchimp/Supabase later is a one-file change. Per the task's
  explicit scope, **no ADR was created** since the provider choice itself remains undecided;
  a TODO callout in `docs/architecture/modules.md` points at this file instead.
- `app/api/waitlist/route.ts` — `POST` handler. Order of checks: (1) fixed-window in-memory
  rate limit, keyed by `x-forwarded-for` (5 requests / 60s; falls back to a shared "unknown"
  bucket if the header is absent, e.g. local dev with no proxy) → `429`; (2) JSON body parse →
  `400` on failure; (3) honeypot (`company` field, any non-empty value) → generic `400`,
  same message as invalid email so bots get no extra signal; (4) email shape + max-length
  check (`254` chars) → `400` with `"Please enter a valid email."`; (5) on success, stamps
  `createdAt: new Date().toISOString()` and delegates to `getWaitlistProvider().submit()`.
  Both `"created"` and `"duplicate"` provider results return **`200`** — resubmitting the same
  email is never an error, satisfying the acceptance criterion directly at the response-shape
  level, not just in the UI.
- `components/sections/WaitlistSignup.tsx` — Client Component, S11. Local state machine
  `idle | submitting | success | error` via `useState` (no global store, per
  `docs/architecture/data-flow.md`). Client-validates with `isValidEmail()` before any network
  call; the input clears its error state on next keystroke rather than leaving a stale message.
  A visually-hidden (`sr-only`, `tabIndex={-1}`, `aria-hidden`) honeypot text input named
  `company` sits beside the real email field. On success, the form is replaced entirely by a
  "You're in. +1 Party Member!" headline + a `SuccessBadge`. `SuccessBadge` wraps in
  `framer-motion`'s `motion.div` (scale/opacity spring-in) only when `useReducedMotion()` is
  false; under reduced motion (or a detected low-power device, via the existing
  `lib/motion.ts` heuristic) it renders the same badge markup with zero animation wrapper —
  mirroring how `HeroLogoReveal.client.tsx` gates its Framer Motion flourish.
- `components/ui/SiteFooter.tsx` — Server Component, S12. Reuses `navLinks` from
  `lib/content/nav.ts` for the "Explore" column (Features/RPG System/For Parents/Pricing/FAQ —
  identical hrefs to the header, so the two can never drift apart) plus new "Company"
  (`/about`, `/blog`, `/contact`) and "Legal" (`/legal/privacy`, `/legal/terms`) columns
  pointing at the real sitemap paths from `docs/planning/02-architecture.md` §4.1 — these
  routes don't exist yet (TASK-0012/P2-P3) so they currently 404, which is expected and
  different from a dead `href="#"` placeholder. The locale-switcher stub is a byte-for-byte
  copy of `SiteHeader`'s `LocaleSwitcherStub` (same non-functional EN/日本語/Tiếng Việt list),
  since both will be replaced together by real i18n routing in TASK-0011. Copyright line uses
  `new Date().getFullYear()` rather than a hardcoded year.
- `app/page.tsx` — S10/S11/S12 `<SectionPlaceholder>`s replaced with `<Faq />`,
  `<WaitlistSignup />`, and `<SiteFooter />`. `SiteFooter` was moved to be a sibling of
  `<main>` (inside a top-level fragment), not nested inside it, since it renders its own
  `<footer>` landmark — nesting a `<footer>` inside `<main>` would be the wrong landmark
  structure. The `id="top"` anchor (used by both the header wordmark and footer wordmark
  links) stays on `<main>`.

**`FAQPage` JSON-LD was intentionally not added** — `docs/planning/04-seo-aeo.md` calls for it,
but it's explicitly owned by TASK-0009 (SEO/AEO metadata), a separate, later task; adding it
here would create overlapping ownership of the same surface.

**No new dependencies were installed.** `framer-motion` (already a dependency since
TASK-0003) covers the success-badge entrance; no email/storage SDK was added since the
provider is explicitly out of scope.

**Acceptance criteria verification detail:**
- *FAQ keyboard-operable, one-or-many open, instant reduced-motion* — verified by code
  inspection (native `<details>`/`<summary>` semantics) rather than a live screen-reader/
  keyboard session; no browser available in this environment.
- *Valid email → success state* — verified via `curl -X POST http://localhost:3000/api/waitlist
  -d '{"email":"...@example.com"}'` against a locally running `pnpm dev` instance:
  `{"status":"created"}` / HTTP 200 on first submission.
- *Invalid email → client + server rejection with helpful message* — `isValidEmail()` blocks
  obviously-invalid input before any network call; server-side, `curl -d '{"email":"not-an-
  email"}'` and `curl -d '{}'` (missing field) and `curl -d 'not-json'` (malformed body) all
  returned `{"error":"Please enter a valid email."}` / HTTP 400.
- *Resubmitting the same email does not error confusingly* — `curl`-ed the same email twice
  (including a same-address-different-case variant, `SanityCheck@Example.com` vs.
  `sanitycheck@example.com`, which the provider treats as the same entry via a lower-cased
  key): first call returned `{"status":"created"}`/200, both repeats returned
  `{"status":"duplicate"}`/200 — never an error status or non-2xx code.
- *Honeypot + rate-limit; `createdAt` stamped server-side* — `curl -d '{"email":"bot@...",
  "company":"x"}'` returned 400 (rejected before reaching the provider). Confirmed the
  rate-limiter trips at the 6th request inside a 60s window from the same client key (`429
  {"error":"Too many requests..."}`) and that a fresh server process (simulating a new
  window) accepts requests again. `createdAt` is set via `new Date().toISOString()` inside
  the route handler, never accepted from the client body.
- *Footer sitemap/legal/locale stub render* — verified by code inspection + `pnpm build`
  succeeding with no broken-import errors; the Explore column's hrefs are the same in-page
  anchors already proven reachable by `SiteHeader` (S0). `/about`, `/blog`, `/contact`,
  `/legal/privacy`, `/legal/terms` intentionally point at not-yet-built routes per the task
  brief's instruction ("Link the legal/blog/about paths even though those routes don't exist
  yet ... that's expected").
- *`pnpm lint` / `pnpm build`* — both run clean. `pnpm format:check` also clean after one
  `prettier --write` pass on the three newly authored files that hadn't been through it yet
  (`app/api/waitlist/route.ts`, `components/sections/Faq.tsx`,
  `components/sections/WaitlistSignup.tsx`).

**Docs updated:** `docs/features/waitlist-signup.md` and `docs/features/faq.md` (`status:
implemented`, user-story checkboxes checked off, new "Implementation (TASK-0004)" sections,
`updated:` already current at 2026-06-16), `docs/architecture/modules.md` (sections/ui/content/
waitlist module rows updated for `Faq`, `WaitlistSignup`, `SiteFooter`, `lib/waitlist-provider.ts`;
dependency graph + rules text updated; added a `[!todo]` callout pointing at
`lib/waitlist-provider.ts` for the still-undecided real provider, in place of the ADR the task
brief's Technical Notes anticipated — that ADR is correctly deferred until the provider is
actually chosen, per the task's own "Out of scope" list), `docs/architecture/overview.md`
(project-layout tree: `SiteFooter`, `Faq`, `lib/waitlist-provider.ts` added, with the same TODO
pointer). No ADR was created, by design — the task's Out of Scope section explicitly defers
that to when the provider decision is actually made.
