---
tags: [feature]
status: implemented
updated: 2026-06-16
---

# Parent Mode

> Two lenses on the same data — proves the RPG layer sits on top of a rigorous tracker.

## Overview

A segmented toggle (RPG ⟷ Parent) that morphs one panel between a quest card and a clean,
clinical chart. Both panels read the same underlying activity log; RPG Mode shows it as XP,
level, and streak; Parent Mode shows it as a growth chart and exportable stats. Reassures
the skeptic/optimizer persona that the game is a skin on real data, not a replacement for it.

## User Stories

- [ ] As a visitor, I can toggle between RPG Mode and Parent Mode and see the same data
      presented two different ways.
- [ ] As a visitor, the panel transition feels like a smooth morph, not a jarring swap.
- [ ] As a visitor, stat numbers count up rather than appearing as static text.
- [ ] As a visitor with reduced motion preferences, the panel swaps instantly and numbers
      show their final value with no count-up.

## UX notes

- Segmented control (`role="tablist"`) above the panel; active tab uses the plasma gradient.
- RPG panel: sprite + a 3-stat quest-card grid (Level, Total XP, Day streak).
- Parent panel: a drawn-on representative growth line + a 3-stat grid (Feeds logged, Sleep
  tracked, Weight) — static representative content, not a real chart data pipeline.
- Panel resize/cross-fade uses Framer Motion `layout` + `AnimatePresence`.

## Data

- Driven by the `AppMode[]` model in `lib/content/modes.ts` — see [[architecture/data-flow]].
- The stat values shown in each panel are illustrative placeholders local to
  `components/sections/ParentMode.tsx`, not part of the `AppMode` content model.

## Related
- [[features/feature-showcase]]
- [[architecture/data-flow]]
