---
tags: [feature]
status: implemented
updated: 2026-06-16
---

# Theme Gallery

> Showcases the app's three visual themes — a key differentiator worth its own section.

## Overview

BabyLeveling ships three per-baby themes, each a full art + color + animation personality.
This section lets a visitor preview all three and feel the range. Content mirrors the app's
theme definitions exactly:

| Theme | Vibe | Tagline | Accent |
|-------|------|---------|--------|
| **Royal** ✨ | Magical-girl anime, soft power | "Soft power." | bubblegum pink → champagne gold |
| **Warrior** ⚔️ | Dark fantasy, forged in fire | "Forged in fire." | ember orange → battle gold |
| **Zen** 🌿 | Studio Ghibli + lo-fi, gentle | "Gentle and intentional." | soft matcha → misty blue |

## User Stories

- [ ] As a visitor, I can preview each theme's color palette and background art.
- [ ] As a visitor, I can switch the previewed theme and watch the section recolor live.
- [ ] As a visitor, I understand themes are chosen per baby, not a one-time global setting.
- [ ] As a visitor on mobile, themes display as a swipeable/stacked set.

## UX notes

- A theme toggle (segmented control) recolors a preview card using each theme's palette.
- Each theme card shows: name, tagline, palette swatches, and a representative background.
- Keep the live recolor cheap — swap CSS variables, don't re-mount.
- Reduced motion: cross-fade instead of animated transitions.

## Data

- Driven by the `AppTheme[]` model in `lib/content/themes.ts` — see [[architecture/data-flow]].
- No theme art asset exists yet; the live preview recolors purely from each theme's
  `palette` (CSS values), so `art` is a descriptive key reserved for future art.

## Related
- [[features/feature-showcase]]
- [[features/screenshot-gallery]]
- [[architecture/data-flow]]
