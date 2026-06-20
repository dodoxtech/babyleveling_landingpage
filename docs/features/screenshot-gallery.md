---
tags: [feature]
status: implemented
updated: 2026-06-20
---

# Screenshot Gallery

> A guided "tour inside one device": a single pinned phone whose screen swaps as you scroll,
> with the narrative copy and a brand XP bar advancing in sync.

## Overview

The proof-of-product section: visitors see the character-sheet dashboard, the quest log
"battle log", the skill tree, and the trophy room in one large, legible phone frame.

The choreography deliberately keeps the **device still and centred** (comprehension over
spectacle) and animates the *content*, not the hardware. Two experiences share the same
phone-UI components:

- **Desktop (≥1024px, motion allowed):** a single phone is pinned centre-stage via
  `position: sticky`. Vertical scroll progress (read from the section's own
  `getBoundingClientRect`) maps to an active screen index; the screen inside the phone swaps
  one beat at a time with a spring CSS transition, while the left-hand narrative copy, the
  climbing `Level NN` counter, the level pill inside the phone, and a continuously filling XP
  bar all advance in sync. A chapter stepper lets visitors jump straight to any screen.
- **Touch / small screens / reduced motion:** a vertical feature/phone/feature rhythm —
  alternating phone + copy rows — so the actual UI stays still and readable with no scroll
  hijacking.

## User Stories

- [x] As a desktop visitor, scrolling walks me through each app screen one beat at a time
      while the phone stays centred and readable.
- [x] As a visitor, the level counter and XP bar climb as I progress (the leveling mechanic).
- [x] As a visitor, I can jump to any screen via the chapter stepper.
- [x] As a visitor, I see screenshots in a realistic phone frame so the scale reads correctly.
- [x] As a mobile / reduced-motion visitor, I get a clear vertical feature-by-feature layout.
- [x] As a screen-reader user, only the active screen is exposed; inactive ones are hidden.

## UX notes

- Why pinned-single-device over a horizontal phone sweep: the UI we're selling stays still
  and centred (better comprehension), the scroll is not hijacked sideways (less
  disorientation, important for tired one-handed parents), and each screen gets a deliberate
  storytelling beat. The motion lives in the *screen swap + XP bar*, tying it to the app's
  own leveling theme rather than generic horizontal motion.
- Native `position: sticky` does the pinning — no GSAP/ScrollTrigger — so it never fights the
  Lenis smooth scroll. Each frame only reads layout and the active index updates React state;
  the swap and copy transitions are CSS.
- The section opts out of the vertical story snap (`scroll-snap-align: none`,
  `min-height: 0` on `#screenshots` in `globals.css`) so the tall sticky region owns its own
  scroll budget without fighting [[features/full-screen-scroll-snap-story]].
- Phone hardware is CSS-built: metal bezel, side buttons, Dynamic Island, screen glass,
  depth shadow, and subtle reflection — built once in `PhoneFrame`; `PhoneScreen` renders the
  swapping content.
- Demo screens are rendered as high-fidelity app previews from existing public assets until
  final exported app screenshots are available.
- Pacing is tuned by the section height (`screenshots.length * 100svh`).

## Data

- Driven by the `Screenshot[]` manifest in `lib/content/screenshots.ts`; see [[architecture/data-flow]].
- All visible copy (section heading, per-screen narrative, chapter labels, scroll hint, and the
  text inside the simulated phone screens) is localized via `home.shots` in the dictionary —
  `screens`/`mock` are keyed by `Screenshot.id`. The server `Screenshots.tsx` reads the active
  locale's `shots` block and passes it to `ScreenshotsCarousel.client.tsx` as `copy`. Only
  numeric game stats (XP/HP totals, `Level NN`, `9:41`) stay as literals.
- Real screenshot files will live in `public/screenshots/` once the design track delivers
  them; until then, `ScreenshotsCarousel.client.tsx` renders a polished app-preview screen
  per `Screenshot.id`.

## Related
- [[features/feature-showcase]]
- [[features/theme-gallery]]
- [[architecture/data-flow]]
