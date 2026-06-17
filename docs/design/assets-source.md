---
title: Asset Source Files
updated: 2026-06-17
---

# Asset Source Files

Production PNG assets in `public/assets/` now use the RPG baby-tracker style from
the uploaded ChatGPT reference sheet:

`/Users/taio/Downloads/ChatGPT Image Jun 16, 2026, 02_42_56 PM.png`

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
| `public/assets/logo/*.png` | `400x120` / `512x512` | Star mark from the reference sheet plus BabyLeveling wordmark |

## Notes

The uploaded source image has a baked checkerboard background, not true alpha.
Cutout exports remove edge-connected checkerboard pixels locally and preserve the
same public asset paths.
