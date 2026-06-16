---
tags: [feature]
status: planned
updated: 2026-06-16
---

# FAQ

> Answers the obvious objections so visitors convert without leaving.

## Overview

A collapsible accordion of common questions about BabyLeveling — what it is, platforms,
price, privacy of baby data, and launch timing. Reduces friction before the waitlist CTA.

## User Stories

- [ ] As a visitor, I can expand/collapse individual questions.
- [ ] As a visitor, I learn which platforms are supported (iOS 17+, Apple Watch).
- [ ] As a privacy-conscious parent, I find a clear answer on how baby data is handled.
- [ ] As a visitor, I learn whether it's free / paid and when it launches.
- [ ] As a keyboard user, I can operate the accordion without a mouse.

## UX notes

- Accordion with one or many open at a time; smooth height transition.
- Use semantic `<details>`/`<summary>` or an ARIA-correct disclosure pattern.
- Keep answers short; link to the waitlist for "when does it launch?".
- Reduced motion: instant expand/collapse, no height animation.

## Data

- Driven by the `FaqItem[]` model in `lib/content/faq.ts` — see [[architecture/data-flow]].
- Adding a question = appending to that data file.

## Related
- [[features/waitlist-signup]]
- [[architecture/data-flow]]
