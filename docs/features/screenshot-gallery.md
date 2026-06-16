---
tags: [feature]
status: planned
updated: 2026-06-16
---

# Screenshot Gallery

> Shows the actual app UI — the dashboard, quest log, skill tree, and achievements.

## Overview

A carousel / device-framed gallery of real app screens. This is the proof-of-product
section: visitors see the character-sheet dashboard, the quest log "battle log", the skill
tree, and the trophy room. Screens are framed in an iPhone/Apple Watch mockup to set context.

## User Stories

- [ ] As a visitor, I can browse multiple app screens in a carousel.
- [ ] As a visitor, I see screenshots in a device frame so the scale reads correctly.
- [ ] As a visitor on mobile, I can swipe through screenshots with snap behavior.
- [ ] As a visitor, each screenshot has a short caption naming the screen.
- [ ] As a screen-reader user, every image has a meaningful `alt`.

## UX notes

- Horizontal snap-scroll on mobile; arrow/dot navigation on desktop.
- Lazy-load off-screen images; use `next/image` for responsive sizing.
- Device frame is a static asset overlay, not per-screenshot.
- Reduced motion: disable auto-advance; manual navigation only.

## Data

- Driven by the `Screenshot[]` manifest in `lib/content/screenshots.ts` — see [[architecture/data-flow]].
- Image files live in `public/screenshots/`.

## Related
- [[features/feature-showcase]]
- [[features/theme-gallery]]
- [[architecture/data-flow]]
