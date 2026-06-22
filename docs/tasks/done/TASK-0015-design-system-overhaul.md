---
tags: [task, design-system, css, fonts, theme]
status: todo
priority: high
created: 2026-06-17
assigned: unassigned
depends-on: [TASK-0014]
blocked-by: [TASK-0014]
---

# TASK-0015 — Design System Overhaul: Dual Theme, Typography & Color

## Context

The current site uses a dark cosmic theme (void black `#0a0a14`, purple/teal/pink
accents, Fraunces serif display + Geist sans body). The reference design calls for
a fundamentally different aesthetic:

- **Light-first** — white/cream base, not dark void.
- **Dual theme toggle** — "Cute Mode" (soft pastel pink/lavender) and "Warrior Mode"
  (deep navy/purple/gold) that the user can switch live on the page.
- **New typography** — Fredoka Bold for display headlines, Poppins (Regular / Medium /
  SemiBold) for all UI text.
- **New colour palette** — per the reference's colour swatch section.

This task updates the global CSS, layout fonts, CSS custom properties, theme-toggle
logic, and the `lib/content/sprites.ts` path helper. It does **not** redesign any
individual sections (that is TASK-0016).

Prerequisite: TASK-0014 (assets must exist before the sprite path helper is updated).

## Goal

By the end of this task:

1. The global design tokens (custom properties) reflect both Cute Mode and Warrior
   Mode palettes.
2. The theme can be toggled between modes, persisting via `localStorage` and
   `data-theme` on `<html>`.
3. Fredoka Bold + Poppins are loaded from Google Fonts and wired up as the primary
   type scale.
4. The `lib/content/sprites.ts` helper is updated to point at the new
   `public/assets/` structure.
5. `pnpm build` succeeds with no TypeScript errors.

## Scope

**In scope**

- `app/globals.css` — replace all CSS custom properties and theme utilities
- `app/[locale]/layout.tsx` — swap Fraunces/Geist imports for Fredoka/Poppins
- `lib/content/sprites.ts` — update path helper to `public/assets/`
- New `components/ui/ThemeToggle.client.tsx` — Cute ↔ Warrior switcher component
- `components/ui/SiteHeader.tsx` + `SiteHeaderClient.tsx` — integrate toggle into nav
- `tailwind.config.ts` (if it exists) or `postcss.config.mjs` — register any new
  font/colour theme extensions if needed

**Out of scope**

- Per-section layout changes (TASK-0016)
- Any content or copy changes
- i18n dictionary changes

---

## Design Tokens Specification

### Cute Mode (default, `[data-theme="cute"]` or bare `:root`)

```css
--bg-base: #fff9f9;          /* near-white with warm blush tint */
--bg-raised: #fff0f3;        /* card/panel background */
--bg-section-alt: #fde8f0;   /* alternating section wash */

--text-primary: #2d1b2e;     /* near-black, warm purple tint */
--text-secondary: #7c5c7e;   /* muted body text */
--text-caption: #a485a7;     /* smallest text, timestamps etc. */

--accent-primary: #ff85a1;   /* main CTA pink */
--accent-secondary: #c8a4f8; /* lavender accent */
--accent-tertiary: #ffd166;  /* golden-yellow (XP, stars) */
--accent-quaternary: #a8e6cf;/* mint green (growth, health) */

--border-subtle: rgba(255, 133, 161, 0.2);
--shadow-card: 0 4px 24px rgba(255, 133, 161, 0.15);
--shadow-colored: 0 8px 32px rgba(200, 164, 248, 0.25);
```

### Warrior Mode (`[data-theme="warrior"]`)

```css
--bg-base: #0e0b1f;          /* deep navy-black */
--bg-raised: #1a1535;        /* card/panel background */
--bg-section-alt: #130f2c;   /* alternating section wash */

--text-primary: #f0eeff;     /* soft white, slight blue cast */
--text-secondary: #9b93cc;   /* muted body text */
--text-caption: #665e99;     /* smallest text */

--accent-primary: #6c63ff;   /* electric purple CTA */
--accent-secondary: #3a6fd8; /* royal blue */
--accent-tertiary: #d4a017;  /* warrior gold (XP, stars) */
--accent-quaternary: #4ade80;/* emerald green (growth) */

--border-subtle: rgba(108, 99, 255, 0.2);
--shadow-card: 0 4px 24px rgba(60, 20, 120, 0.4);
--shadow-colored: 0 8px 32px rgba(108, 99, 255, 0.3);
```

### Shared Tokens (both modes)

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;

--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

/* XP bar gradient — adapts via accent tokens */
--grad-xp: linear-gradient(90deg, var(--accent-secondary), var(--accent-primary));

/* Theme transition — applied to <html> for smooth mode switch */
--theme-transition: background-color var(--transition-slow),
                    color var(--transition-slow),
                    border-color var(--transition-slow);
```

---

## Typography Specification

Replace the current Fraunces + Geist imports with:

```ts
// In app/[locale]/layout.tsx
import { Fredoka, Poppins } from "next/font/google";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],           // Bold only — used for display headlines
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],  // Regular, Medium, SemiBold
  display: "swap",
});
```

### Type Scale (CSS)

```css
/* Display / H1 — Fredoka Bold */
.text-display {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 700;
}

/* H2 — Poppins SemiBold */
.text-h2 {
  font-family: var(--font-sans);
  font-size: clamp(1.5rem, 3.5vw, 2.75rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-weight: 600;
}

/* Body — Poppins Regular */
.text-body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.65;
  font-weight: 400;
}

/* Caption / label — Poppins Medium */
.text-caption {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  line-height: 1.4;
  letter-spacing: 0.06em;
  font-weight: 500;
}
```

---

## Theme Toggle Component Spec

Create `components/ui/ThemeToggle.client.tsx`:

```
┌──────────────────────────────────┐
│  ♥ Cute Mode   ◈ ◉  Warrior Mode │
│  [pink glow]   [toggle]  [blue]  │
└──────────────────────────────────┘
```

- A pill-shaped slider (like the reference's "Choose Your Mode" toggle).
- Left label: "Cute Mode" with a heart icon, right label: "Warrior Mode" with a shield icon.
- The active side is highlighted; the pill slides to indicate the current mode.
- On change: set `data-theme` attribute on `<html>`, write to `localStorage` key
  `"babyleveling-theme"`, dispatch a `"theme-change"` custom event for any
  components that need to react.
- On first load: read `localStorage` first, then `prefers-color-scheme`. If dark
  prefers → Warrior Mode; else → Cute Mode (light default).
- SSR: the toggle renders in its default (Cute) state server-side; a `useEffect`
  on mount reads `localStorage` and corrects if needed (no flash).

---

## Sprite Path Helper Update

Update `lib/content/sprites.ts` to return the new `public/assets/` paths.

Current helper signature (approximately):
```ts
export function spritePath(key: string): string
```

New behaviour — map the keys used in existing components to the new asset paths:

| Old key | New path |
|---------|----------|
| `babyGirl.waving` | `/assets/characters/cute-baby-girl-waving.png` |
| `babyGirl.sitting` | `/assets/characters/cute-baby-girl-sitting.png` |
| `babyBoy.sitting` | `/assets/characters/cute-baby-boy-sitting.png` |
| `babyBoy.waving` | `/assets/characters/cute-baby-boy-waving.png` |
| `icon.trophy` | `/assets/icons/trophy.png` |
| `icon.star` | `/assets/icons/xp-badge.png` |
| (…add remaining icon mappings) | |

The helper should throw a clear error if an unknown key is requested, so that dead
references are caught at development time.

---

## Utility Classes to Add (globals.css)

```css
/* Theme-aware surface classes */
.surface-base   { background: var(--bg-base); }
.surface-raised { background: var(--bg-raised); color: var(--text-primary); }
.surface-alt    { background: var(--bg-section-alt); }

/* Accent utilities */
.text-accent    { color: var(--accent-primary); }
.bg-accent      { background: var(--accent-primary); }
.border-accent  { border-color: var(--accent-primary); }

/* XP bar */
.bg-grad-xp { background: var(--grad-xp); }

/* Smooth theme switch */
html { transition: var(--theme-transition); }

/* Button primitives */
.btn-primary {
  background: var(--accent-primary);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.75rem;
  font-family: var(--font-sans);
  font-weight: 600;
  transition: filter var(--transition-fast), transform var(--transition-fast);
}
.btn-primary:hover  { filter: brightness(1.08); }
.btn-primary:active { transform: scale(0.97); }

.btn-secondary {
  background: transparent;
  border: 2px solid var(--accent-primary);
  color: var(--accent-primary);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.75rem;
  font-family: var(--font-sans);
  font-weight: 600;
  transition: background var(--transition-fast);
}
.btn-secondary:hover { background: var(--border-subtle); }
```

---

## Relevant Files

- `app/globals.css` — primary target; replace CSS custom properties and add utilities
- `app/[locale]/layout.tsx` — font imports + `<body>` classNames
- `lib/content/sprites.ts` — path helper; update to `public/assets/`
- `components/ui/ThemeToggle.client.tsx` — new file
- `components/ui/SiteHeader.tsx` — add `<ThemeToggle />` to nav right side
- `components/ui/SiteHeaderClient.tsx` — may need theme-aware class switching

## Acceptance Criteria

- [ ] `data-theme="cute"` on `<html>` produces the Cute Mode palette across all CSS tokens
- [ ] `data-theme="warrior"` on `<html>` produces the Warrior Mode palette
- [ ] `<ThemeToggle />` in the header correctly switches between modes with a smooth
      CSS transition (no flash on toggle)
- [ ] Theme preference persists across page refresh (`localStorage`)
- [ ] Fredoka Bold renders for all `font-display` usages, Poppins for body text
- [ ] `spritePath()` returns correct new paths; throws on unknown keys
- [ ] `pnpm build` succeeds, `pnpm lint` produces no errors
- [ ] No TypeScript errors in changed files

## Technical Notes

- Tailwind v4 is in use (see `postcss.config.mjs`). New custom tokens should be
  registered under `@theme inline` in `globals.css` rather than in a separate
  `tailwind.config.ts`.
- The `html { transition }` trick causes a brief transition on first load. Suppress
  it by adding a `no-transition` class during initial hydration and removing it after
  the first paint.
- Warrior Mode dark background should use `color-scheme: dark` on the `<html>` element
  so browser chrome (scrollbars, inputs) matches.

## Definition of Done

- [ ] Acceptance criteria all pass
- [ ] `docs/architecture/overview.md` updated with new font and theme-system entry
- [ ] Task file moved from `active/` to `done/`
