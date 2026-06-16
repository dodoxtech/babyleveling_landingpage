---
tags: [feature]
status: planned
updated: 2026-06-16
---

# Hero Section

> Above-the-fold opener that lands the pitch in one screen and drives to the waitlist.

## Overview

The first thing a visitor sees. It carries the core promise of BabyLeveling —
*"You just had a baby. You also just started a new game."* — and a single primary CTA
(join the waitlist / get notified at launch). Visually it echoes the app's cinematic splash:
dark starfield background, neon-gradient logo, an XP-bar motif.

## User Stories

- [ ] As a visitor, I immediately understand this is a gamified baby tracker, not a hospital form.
- [ ] As a visitor, I see the tagline *"Every day is a new quest"* within the first screen.
- [ ] As a visitor, I can tap one obvious CTA to join the waitlist without scrolling.
- [ ] As a visitor on mobile, the hero fits one viewport with no layout shift.
- [ ] As a visitor, I see an App Store badge / "coming soon" state if not yet launched.

## UX notes

- Dark-mode-first, near-black background (`#0A0A14` family) with drifting particle dots.
- Logo animates in (letters drop with bounce); tagline fades in last.
- Primary CTA uses a plasma-purple → hot-pink gradient fill, scale-on-press.
- An animated XP-bar accent reinforces the "leveling up" metaphor.
- Respect `prefers-reduced-motion`: drop particle/letter animation, keep static layout.

## Data

- Static copy (headline, tagline, CTA label) lives in `lib/content/` — see [[architecture/data-flow]].
- The CTA scrolls to / focuses the [[features/waitlist-signup]] form (no separate route).

## Related
- [[features/waitlist-signup]]
- [[features/feature-showcase]]
- [[architecture/overview]]
