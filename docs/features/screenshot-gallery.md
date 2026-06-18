---
tags: [feature]
status: implemented
updated: 2026-06-18
---

# Screenshot Gallery

> Shows the app UI demo screens inside a realistic horizontal phone gallery.

## Overview

A horizontal snap-scroll product demo with realistic phone hardware. This is the
proof-of-product section: visitors see the character-sheet dashboard, the quest log "battle
log", the skill tree, and the trophy room in large, inspectable phone frames.

## User Stories

- [x] As a visitor, I can browse multiple app screens in a horizontal gallery.
- [x] As a visitor, I see screenshots in a realistic phone frame so the scale reads correctly.
- [x] As a visitor on mobile, I can swipe through screenshots with snap behavior.
- [x] As a visitor, each screenshot has a short caption naming the screen.
- [x] As a screen-reader user, every preview has a meaningful accessible label.
- [x] As a keyboard user, I can move through the phone previews with arrow keys or controls.

## UX notes

- Horizontal snap-scroll on mobile and desktop, with large phone frames and room to inspect
  the demo UI.
- Arrow/progress controls remain available outside the horizontal rail.
- Phone hardware is CSS-built: metal bezel, side buttons, Dynamic Island, screen glass,
  depth shadow, and subtle reflection.
- Demo screens are rendered as high-fidelity app previews from existing public assets until
  final exported app screenshots are available.
- Reduced motion: use instant manual navigation instead of smooth scrolling.

## Data

- Driven by the `Screenshot[]` manifest in `lib/content/screenshots.ts`; see [[architecture/data-flow]].
- Real screenshot files will live in `public/screenshots/` once the design track delivers
  them; until then, `ScreenshotsCarousel.client.tsx` renders a polished app-preview screen
  per `Screenshot.id`.

## Related
- [[features/feature-showcase]]
- [[features/theme-gallery]]
- [[architecture/data-flow]]
