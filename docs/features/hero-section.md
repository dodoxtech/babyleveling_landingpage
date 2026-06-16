---
tags: [feature]
status: implemented
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

## Implementation (TASK-0003)

- `components/sections/Hero.tsx` — Server Component text shell (eyebrow, gradient
  headline, SEO-bearing `<h2>` tagline per R-3, CTA, XP-bar accent). This is the
  LCP element; verified in the production build's prerendered HTML that the headline
  renders as plain visible text with no client-only opacity wrapper.
- `components/sections/HeroCanvasMount.client.tsx` — decides static-still vs. lazy
  R3F starfield based on `lib/motion.ts`'s reduced-motion/low-power check; defers the
  `HeroCanvas.client` dynamic import via `requestIdleCallback` so it never competes
  with text for first paint.
- `components/sections/HeroCanvas.client.tsx` — the React Three Fiber + Drei
  starfield: capped DPR (≤2), fixed star count, no per-frame allocations in
  `useFrame`, paused (`frameloop="never"`) via `IntersectionObserver` when off-screen.
- `components/sections/HeroLogoReveal.client.tsx` — Framer Motion per-character
  drop-in for the headline's first line. Renders plain static text until one
  `requestAnimationFrame` after mount (avoiding Framer Motion's SSR `opacity:0`
  inline-style behavior, which would otherwise hurt LCP), then swaps to the
  animated version; reduced motion never swaps.
- Confirmed via build output: the three.js/R3F/Drei bundle is excluded from the
  route's First Load JS (208 kB) and lives in its own chunk, fetched only when
  `HeroCanvasMount` decides to load it.

## Related
- [[features/waitlist-signup]]
- [[features/feature-showcase]]
- [[architecture/overview]]
