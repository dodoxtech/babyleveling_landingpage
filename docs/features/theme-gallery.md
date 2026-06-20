---
tags: [feature]
status: implemented
updated: 2026-06-20
---

# Theme Gallery & Visual Theme System

> The site ships three swappable visual themes — a live, instantly-repainting
> differentiator that doubles as a demo of the app's personality range.

## Overview

The website has a **single shared design-token contract** with three skins. Any
visitor can flip between them from the header/hero toggle or the in-page gallery,
and the entire page recolors + reshapes instantly (CSS variables only — nothing
re-mounts).

| Theme | id | Persona | Background | Button | Feel |
|-------|------|---------|-----------|--------|------|
| **Bloom** 🌸 | `cute` | For moms | warm blush `#FFF6F4` | candy-coral `#FF5D8F` | pillow-round, nurturing |
| **Focus** 💎 | `focus` | For dads | cool slate `#F3F5F8` | electric indigo `#3B4BE8` | crisp edges, premium ink |
| **Calm** 🍃 | `zen` | Zen | warm oat `#F2F0E8` | sage `#5E9270` | soft, low-saturation quiet luxury |

`cute` is the default (also served on SSR); dark-mode users default to `focus`.

## Architecture — three layers

1. **Reference layer** — [`lib/theme/registry.ts`](../../lib/theme/registry.ts):
   the single source of truth. Exports `THEMES` (ids, names, personas, copy, hex
   `swatch`es, and simple image icons) plus the `ThemeId` type and the
   `getStoredTheme` / `applyTheme` helpers. Every theme-aware component reads
   from here.
2. **Token layer** — `app/globals.css`: one `[data-theme="<id>"]` block per
   theme. Each block defines the **same** named tokens — surfaces, text, accents,
   borders, shadows **and** shape (`--radius-*`, `--grid-line`). Only the values
   differ, so each theme carries its own *feel*, not just its hue.
3. **Component layer** — `.btn-primary`, `.card-duolingo`, etc. and Tailwind
   `var(--token)` references. Unchanged when themes change.

> To add/restyle a theme: add an entry in `registry.ts` **and** a matching
> `[data-theme]` block in `globals.css` using the same `id`. Nothing else changes.

## Switching

`applyTheme(id)` sets `data-theme` on `<html>`, persists to `localStorage`
(`babyleveling-theme`), and dispatches a `theme-change` CustomEvent so every
mounted control (header toggle, hero toggle, gallery) stays in sync. A
`no-transition` class suppresses the first-paint flash before hydration.

## Components

- `components/ui/ThemeToggle.client.tsx` — compact 3-segment radiogroup with a
  sliding active pill; simple theme image icons stay visible on narrow screens.
- `components/sections/ThemeGallery.tsx` — `#themes` section; one card per theme
  with a live image/palette preview, persona chip, blurb, descriptor pills, and
  a "Try" button with the matching theme image.

## Data

- Website visual themes live in `lib/theme/registry.ts`.
- Simple theme icons live in `public/assets/themes/`.
- Distinct from `lib/content/themes.ts`, which models the in-app **game worlds**
  (Royal/Warrior/Zen) — see [[architecture/data-flow]].

## Related
- [[features/feature-showcase]]
- [[features/screenshot-gallery]]
- [[architecture/data-flow]]
