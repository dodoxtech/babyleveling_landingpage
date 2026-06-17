---
tags: [feature]
status: implemented
updated: 2026-06-17
---

# Hero Section

> Above-the-fold opener that lands the pitch in one screen and drives to the waitlist.

## Overview

The first thing a visitor sees. It carries the core promise of BabyLeveling:
daily care can feel like a tiny RPG quest, while still staying useful for real parents.
The redesigned hero uses a bright character-driven composition with a baby hero mascot,
quest tiles, an XP card, mode toggle, and one primary waitlist CTA.

## User Stories

- [ ] As a visitor, I immediately understand this is a gamified baby tracker, not a hospital form.
- [ ] As a visitor, I see baby care framed as quick, friendly quests within the first screen.
- [ ] As a visitor, I can tap one obvious CTA to join the waitlist without scrolling.
- [ ] As a visitor on mobile, the hero fits one viewport with no layout shift.
- [ ] As a visitor, I see an App Store badge / "coming soon" state if not yet launched.

## UX notes

- Light, cheerful game-world palette with chunky tactile controls.
- Primary visual is a centered baby hero mascot with supporting XP and quick-log cards.
- The hero fits one viewport on desktop and stacks cleanly on mobile.
- Respect `prefers-reduced-motion`: mascot bobbing and transitions collapse to static.

## Data

- Static copy and routes live in `lib/content/` and locale dictionaries - see [[architecture/data-flow]].
- The CTA scrolls to / focuses the [[features/waitlist-signup]] form (no separate route).

## Implementation

- `components/sections/Hero.tsx` is a Server Component with static text, mascot art,
  mode toggle, quick-log quest tiles, and tactile CTAs.
- Visual assets come from `public/assets/characters` and `public/assets/icons`.
- No WebGL is mounted for the hero in the current redesign.

## Related
- [[features/waitlist-signup]]
- [[features/feature-showcase]]
- [[architecture/overview]]
