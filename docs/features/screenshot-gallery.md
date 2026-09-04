---
tags: [feature]
status: implemented
updated: 2026-09-04
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
- Phone hardware is CSS-built: metal bezel, side buttons, screen glass, depth shadow, and
  subtle reflection — built once in `PhoneFrame`; `PhoneScreen` renders the swapping content.
  No synthetic Dynamic Island overlay is drawn anymore (2026-09-04) — the real screenshots
  already include the device's own status bar/island, so a fake one would double up.
- Demo screens are **real App Store screenshots** of the shipped app (2026-09-04), not
  synthetic app previews — see Data below.
- Pacing is tuned by the section height (`screenshots.length * 100svh`).

## Data

- Driven by the `Screenshot[]` manifest in `lib/content/screenshots.ts`; see [[architecture/data-flow]].
- Narrative copy (section heading, per-screen eyebrow/heading/body, chapter labels, scroll
  hint) is localized via `home.shots` in the dictionary — `screens` is keyed by
  `Screenshot.id`. The server `Screenshots.tsx` reads the active locale's `shots` block and
  passes it to `ScreenshotsCarousel.client.tsx` as `copy`. (`home.shots.mock` still exists in
  the dictionary but is no longer read by the carousel now that screens are real screenshots,
  not simulated UI — kept in case a future synthetic-preview fallback needs it.)
- Screenshot images: `getScreenshots(locale)` in `lib/content/screenshots.ts` builds each
  `Screenshot.src` as `/screenshots/<locale>/<id>.png`. Files live under
  `public/screenshots/{en,ja,vi}/{dashboard,quest-log,skill-tree,trophy-room}.png` — real
  captures sourced from `BabyLeveling/assets/app-review/iphone/{en,jp,vn}/raw/*.png` (resized
  to 750px wide via `sips`). The manifest id doesn't always match the raw filename 1:1: id
  `quest-log` uses the app's `logs.png`, `skill-tree` uses `milestones.png`, and `trophy-room`
  uses `rank-up.png` (closest real screen to each narrative beat). Regenerate by re-running
  that resize step against a fresh `assets/app-review` export when the app's UI changes.

## Related
- [[features/feature-showcase]]
- [[features/theme-gallery]]
- [[architecture/data-flow]]
