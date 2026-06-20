---
title: Asset Source Files
updated: 2026-06-20
---

# Asset Source Files

Production character, timeline, scene, and utility icon PNG assets in `public/assets/` use
the RPG baby-tracker style from the uploaded ChatGPT reference sheet:

`/Users/taio/Downloads/ChatGPT Image Jun 16, 2026, 02_42_56 PM.png`

The logo system is generated raster artwork: a gender-neutral cute level-badge mark
combining a baby face, cream/mint outfit, a gold RPG star badge, and a small XP chevron,
plus a generated horizontal BabyLeveling lockup for website use. The logo intentionally
avoids boy/girl-coded styling such as bows, hair ribbons, dresses, or pink/blue stereotype
color cues.

The sheet defines the current mascot, progression, icon, mode, and fantasy landscape
language: cheerful Duolingo-like baby characters, glossy RPG badges, bright color,
rounded game UI, and emotional parent-friendly illustration.

## Output Rules

- Character, icon, logo, and timeline assets are exported as PNG with alpha.
- Scene assets remain opaque rectangular PNGs because the website uses them as cover
  backgrounds.
- Asset filenames and dimensions must stay stable because components reference them
  directly.

## Asset Manifest

| Output | Size | Source |
|--------|------|--------|
| `public/assets/characters/*.png` | `800x800` | Cropped mascot poses from the reference sheet |
| `public/assets/timeline/*.png` | `400x400` | Cropped level progression cards from the reference sheet |
| `public/assets/icons/*.png` | `256x256` | Cropped RPG/care icons from the reference sheet |
| `public/assets/scenes/hero-cute-bg.png` | `960x720` | Pastel castle landscape crop |
| `public/assets/scenes/hero-warrior-bg.png` | `960x720` | Dark fantasy landscape crop |
| `public/assets/scenes/features-bg.png` | `1920x600` | Multi-biome landscape strip crop |
| `public/assets/logo/babyleveling-app-icon-1024.png` | `1024x1024` | ChatGPT-generated gender-neutral baby + gold level badge app icon, resized for App Store use |
| `public/assets/logo/favicon-512.png` | `512x512` | Resized export from the generated app icon |
| `public/assets/logo/babyleveling-logo.png` | `400x120` | ChatGPT-generated gender-neutral horizontal BabyLeveling lockup using the favicon baby; green-screen background removed to alpha |
| `public/assets/logo/babyleveling-logo-dark.png` | `400x120` | Same generated transparent lockup exported for the dark-logo filename |

## Notes

The uploaded source image has a baked checkerboard background, not true alpha.
Cutout exports remove edge-connected checkerboard pixels locally and preserve the
same public asset paths.
