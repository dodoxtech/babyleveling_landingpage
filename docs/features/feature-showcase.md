---
tags: [feature]
status: implemented
updated: 2026-06-20
---

# Feature Showcase

> The grid that sells the gameplay — what makes BabyLeveling an RPG instead of a log.

## Overview

A responsive asymmetric grid of tactile RPG feature tiles. Content maps directly to
the real app mechanics while the presentation stays cheerful, character-driven, and
consistent with the landing page's bright game-world theme:

| Card | Hook |
|------|------|
| **XP & Levels** | Every feed, sleep, and growth log earns XP; your baby levels up. |
| **Daily Quests** | Tracking becomes daily missions: "3 feeds today = +320 XP". |
| **Skill Tree** | Milestones (smile, roll over, first words) as an unlockable RPG skill tree. |
| **Achievements** | Hexagonal badges and trophies for streaks and milestones. |
| **Streaks & Buffs** | Consistency rewards: "3-day streak, +50 XP bonus". |
| **Apple Watch** | Log feeding/sleep from the wrist in ≤ 2 taps. |

## User Stories

- [ ] As a visitor, I can scan all core features in a single scroll without reading paragraphs.
- [ ] As a visitor, each feature card tells me the *benefit*, not just the mechanic.
- [ ] As a visitor on mobile, cards stack to one column and stay legible.
- [ ] As a visitor, the cards visually feel like the in-app HUD (glass, neon accents, XP bars).

## UX notes

- Tactile white cards with chunky borders and the global BabyLeveling shadow system.
- Cards reveal on scroll and lift on hover; disabled under reduced motion.
- Each card uses its own generated PNG image from `public/assets/features/`, so the
  visual matches the mechanic instead of reusing generic icons.
- Keep copy short — one title + one blurb per card.

## Data

- Cards are driven by the `Feature[]` model in `lib/content/features.ts` — see [[architecture/data-flow]].
- Adding/removing a card = edit that data file; no component changes needed.

## Related
- [[features/theme-gallery]]
- [[features/screenshot-gallery]]
- [[architecture/data-flow]]
