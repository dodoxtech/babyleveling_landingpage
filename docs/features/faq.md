---
tags: [feature]
status: implemented
updated: 2026-06-16
---

# FAQ

> Answers the obvious objections so visitors convert without leaving.

## Overview

A collapsible accordion of common questions about BabyLeveling — what it is, platforms,
price, privacy of baby data, and launch timing. Reduces friction before the waitlist CTA.

## User Stories

- [x] As a visitor, I can expand/collapse individual questions.
- [x] As a visitor, I learn which platforms are supported (iOS 17+, Apple Watch).
- [x] As a privacy-conscious parent, I find a clear answer on how baby data is handled.
- [x] As a visitor, I learn whether it's free / paid and when it launches.
- [x] As a keyboard user, I can operate the accordion without a mouse.

## UX notes

- Accordion with one or many open at a time; smooth height transition.
- Use semantic `<details>`/`<summary>` or an ARIA-correct disclosure pattern.
- Keep answers short; link to the waitlist for "when does it launch?".
- Reduced motion: instant expand/collapse, no height animation.

## Data

- Driven by the `FaqItem[]` model in `lib/content/faq.ts` — see [[architecture/data-flow]].
- Adding a question = appending to that data file.

## Implementation (TASK-0004)

- `components/sections/Faq.tsx` — Server Component, S10. Native `<details>`/`<summary>`
  disclosure per question; "one or many open" is free since each `<details>` toggles
  independently with no shared state. Keyboard-operable and screen-reader correct with
  zero JavaScript. There is no height-transition animation to gate behind
  `prefers-reduced-motion` — the native toggle is already instant for every visitor.
- `lib/content/faq.ts` — 7 real `FaqItem` entries, answer-first per the AEO strategy in
  docs/planning/04-seo-aeo.md §10.2 (each answer is a self-contained 40–60 word claim,
  phrased as a real user/AI-answer-engine question), covering: what it is, the RPG
  angle, platforms (iOS 17+ / Apple Watch), pricing/launch timing, baby-data privacy,
  tracker-vs-game positioning, and family sharing.
- `FAQPage` JSON-LD structured data is mounted directly in `Faq.tsx` via
  `FaqPageJsonLd` (`components/seo/JsonLd.tsx`), landed in TASK-0009.

## Related
- [[features/waitlist-signup]]
- [[architecture/data-flow]]
