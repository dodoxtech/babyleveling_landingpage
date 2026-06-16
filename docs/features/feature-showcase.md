---
tags: [feature]
status: implemented
updated: 2026-06-16
---

# Feature Showcase

> The grid that sells the gameplay — what makes BabyLeveling an RPG instead of a log.

## Overview

A responsive grid of glassmorphic cards, each highlighting one pillar of the app. Content
maps directly to the real app's mechanics (from the app's design system):

| Card | Hook |
|------|------|
| **XP & Levels** | Every feed, sleep, and growth log earns XP; your baby levels up. |
| **Daily Quests** | Tracking becomes daily missions — "3 feeds today = +320 XP". |
| **Skill Tree** | Milestones (smile, roll over, first words) as an unlockable RPG skill tree. |
| **Achievements** | Hexagonal badges and trophies for streaks and milestones. |
| **Streaks & Buffs** | Consistency rewards — "🔥 3-day streak, +50 XP bonus". |
| **Apple Watch** | Log feeding/sleep from the wrist in ≤ 2 taps. |

## User Stories

- [ ] As a visitor, I can scan all core features in a single scroll without reading paragraphs.
- [ ] As a visitor, each feature card tells me the *benefit*, not just the mechanic.
- [ ] As a visitor on mobile, cards stack to one column and stay legible.
- [ ] As a visitor, the cards visually feel like the in-app HUD (glass, neon accents, XP bars).

## UX notes

- Glassmorphic cards: translucent surface, subtle border, accent inner glow — matches `CardStyle`.
- Accent color varies per card (feed=orange, sleep=lavender, etc.) to echo the app palette.
- Cards reveal on scroll (fade + rise); disabled under reduced motion.
- Keep copy short — one title + one blurb per card.

## Data

- Cards are driven by the `Feature[]` model in `lib/content/features.ts` — see [[architecture/data-flow]].
- Adding/removing a card = edit that data file; no component changes needed.

## Related
- [[features/theme-gallery]]
- [[features/screenshot-gallery]]
- [[architecture/data-flow]]
