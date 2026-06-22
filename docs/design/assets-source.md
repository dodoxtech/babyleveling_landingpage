---
title: Asset Source Files
updated: 2026-06-22
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
| `public/assets/characters/cute-baby-girl-*.png` | `1254x1254` | Cropped mascot poses from the reference sheet |
| `public/assets/characters/cute-baby-boy-*.png` | `1254x1254` | ChatGPT-generated baby boy variants on chroma-key green, then converted to alpha |
| `public/assets/timeline/*.png` | `400x400` | Cropped level progression cards from the reference sheet |
| `public/assets/icons/*.png` | `256x256` | Cropped RPG/care icons from the reference sheet |
| `public/assets/motion/mascot-*.png` | `800x800` | Motion-state mascot assets generated on chroma-key green, then converted to alpha |
| `public/assets/motion/care-*.png` | `256x256` | Motion care-action icons generated on chroma-key green, then converted to alpha |
| `public/assets/motion/xp-*.png` | `128x128` / `256x256` | Motion XP tokens/sparks generated on chroma-key green, then converted to alpha |
| `public/assets/motion/privacy-*.png` | `256x256` / `800x800` | Local-first privacy motion assets generated on chroma-key green, then converted to alpha |
| `public/assets/motion/journey-*.png` | `256x256` | Scroll journey motion assets generated on chroma-key green, then converted to alpha |
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

## Motion Asset Set

The initial motion asset set follows [[motion-asset-generation-brief]] and uses a flat
green chroma-key generation workflow followed by local alpha extraction.

Generated minimum set:
- `public/assets/motion/mascot-idle.png`
- `public/assets/motion/mascot-happy.png`
- `public/assets/motion/mascot-level-up.png`
- `public/assets/motion/mascot-sleep-calm.png`
- `public/assets/motion/mascot-shield-privacy.png`
- `public/assets/motion/care-feed.png`
- `public/assets/motion/care-sleep.png`
- `public/assets/motion/xp-orb.png`
- `public/assets/motion/xp-spark-small.png`
- `public/assets/motion/privacy-phone.png`
- `public/assets/motion/privacy-lock.png`
- `public/assets/motion/journey-node-active.png`
