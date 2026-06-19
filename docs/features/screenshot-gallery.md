---
tags: [feature]
status: implemented
updated: 2026-06-19
---

# Screenshot Gallery

> Shows the app UI demo screens inside a scroll-driven phone gallery that zooms each device
> into focus, one by one.

## Overview

The proof-of-product section: visitors see the character-sheet dashboard, the quest log
"battle log", the skill tree, and the trophy room in large, inspectable phone frames.

Two ergonomically distinct experiences share the same phone-UI components:

- **Desktop (≥1024px, motion allowed):** a GSAP `ScrollTrigger`-pinned section. The page
  pins to the viewport and vertical scroll drives the phone track horizontally; each device
  scales up, sharpens, and gains opacity as it reaches centre, then recedes — an
  Awwwards-style "zoom into one screen at a time" pass. A heading, an `NN / NN` step counter,
  and a scrub progress bar frame the pinned stage. The travel maths is layout-measured
  (`offsetLeft`/`offsetWidth`), so centring stays correct from a 360px phone to a 4K monitor.
- **Touch / small screens / reduced motion:** a native horizontal scroll-snap rail with dots
  and prev/next controls — no scroll hijacking, which is the right ergonomic on a phone.

## User Stories

- [x] As a visitor on desktop, scrolling zooms me through each app screen one at a time.
- [x] As a visitor, I see screenshots in a realistic phone frame so the scale reads correctly.
- [x] As a visitor on mobile, I can swipe through screenshots with snap behavior.
- [x] As a visitor, each screenshot has a short caption naming the screen.
- [x] As a screen-reader user, every preview has a meaningful accessible label.
- [x] As a keyboard user / reduced-motion user, I get the native rail with explicit controls.

## UX notes

- The desktop pin opts out of the vertical story snap (`scroll-snap-align: none`,
  `min-height: 0` on `#screenshots` in `globals.css`) so the horizontal pass owns its own
  scroll budget without fighting [[features/full-screen-scroll-snap-story]].
- GSAP + ScrollTrigger load via dynamic `import()` and stay synced to Lenis, mirroring
  `HeroCharacterXpBar.client.tsx`; the trigger is killed and styles unmount on cleanup/resize.
- Phone hardware is CSS-built: metal bezel, side buttons, Dynamic Island, screen glass,
  depth shadow, and subtle reflection.
- Demo screens are rendered as high-fidelity app previews from existing public assets until
  final exported app screenshots are available.
- Reduced motion / low-power devices fall back to the native rail with instant navigation.

## Data

- Driven by the `Screenshot[]` manifest in `lib/content/screenshots.ts`; see [[architecture/data-flow]].
- Real screenshot files will live in `public/screenshots/` once the design track delivers
  them; until then, `ScreenshotsCarousel.client.tsx` renders a polished app-preview screen
  per `Screenshot.id`.

## Related
- [[features/feature-showcase]]
- [[features/theme-gallery]]
- [[architecture/data-flow]]
