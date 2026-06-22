---
tags: [task, assets, blender, 3d]
status: todo
priority: high
created: 2026-06-17
assigned: unassigned
depends-on: []
blocked-by: []
---

# TASK-0014 — Blender 3D Character & Icon Asset Creation

## Context

The current site uses flat 2D PNG sprites in `public/sprites/babyBoy/` and
`public/sprites/babyGirl/` (34 poses each) plus `public/sprites/icon/` (26 icons).
The target reference design (see `docs/design/reference-redesign.png`) replaces all
of these with high-quality 3D renders produced in Blender, in two visual modes:

- **Cute Mode** — soft pastel, warm, heartwarming. Baby in pink outfit, cloud/rainbow
  backgrounds, plush toy props.
- **Warrior Mode** — epic, bold, legendary. Baby in fantasy armour with sword and
  shield, dramatic stone-platform backgrounds, lightning accents.

This task produces **all new render files** and **removes all old sprites**. It is a
prerequisite for TASK-0015 (design system) and TASK-0016 (section redesigns).

## Goal

Deliver production-ready PNG renders (transparent background where needed, white
background scenes where noted) for every asset slot listed below. Old sprites are
deleted after the new ones pass review.

## Scope

**In scope**

- All Blender model creation, texturing, rigging, and rendering listed in the asset
  inventory below
- Exporting to PNG at the specified resolutions
- Placing exports in the new folder structure under `public/assets/`
- Removing `public/sprites/babyBoy/`, `public/sprites/babyGirl/`,
  `public/sprites/icon/` after replacements are confirmed

**Out of scope**

- Animated GLB/GLTF files (the site uses static PNG renders, no 3D runtime)
- Blender source `.blend` files do not need to be committed to the repo (too large);
  store them on a shared drive and record the location in `docs/design/assets-source.md`
- Any code changes (covered in TASK-0015, TASK-0016)

---

## Asset Inventory

### 1. Hero Characters (transparent PNGs, no background)

| File | Size | Description |
|------|------|-------------|
| `public/assets/characters/cute-baby-girl-sitting.png` | 800 × 800 | Baby girl in pink ruffled outfit, seated, holding teddy bear, big smile. Cute Mode. |
| `public/assets/characters/cute-baby-girl-waving.png` | 800 × 800 | Same character, standing pose, one arm raised in a wave. |
| `public/assets/characters/cute-baby-boy-sitting.png` | 1254 × 1254 | Baby boy in soft blue outfit, seated, chroma-key generated then exported with alpha. |
| `public/assets/characters/cute-baby-boy-waving.png` | 1254 × 1254 | Same baby boy style, standing and waving, chroma-key generated then exported with alpha. |

**Style notes:**
- Proportions: large head (~50 % of body height), round chubby cheeks, big bright eyes —
  classic chibi/baby proportions.
- Cute Mode skin tone: warm medium, rosy cheeks.
- Warrior Mode armour: silver/steel plate with gold accents, blue cape.
- Lighting: soft 3-point studio light for Cute Mode; dramatic side-rim + fill for Warrior
  Mode.
- No cast shadow in the PNG (transparent) — shadows are added via CSS `drop-shadow`.

---

### 2. Growth Timeline Characters (transparent PNGs)

The "Watch Your Baby Grow & Level Up" section shows a horizontal progression of 5
character stages. Render both genders if feasible; otherwise render one gender and
indicate it serves as universal.

| File | Size | Stage | Age | Outfit/Props |
|------|------|-------|-----|--------------|
| `public/assets/timeline/lv01-newborn.png` | 400 × 400 | Lv. 1 Newborn | 0–1 mo | Swaddled in blanket, tiny star above head |
| `public/assets/timeline/lv05-explorer.png` | 400 × 400 | Lv. 5 Explorer | 3–4 mo | Sitting, holding rattle, curious expression |
| `public/assets/timeline/lv10-little-star.png` | 400 × 400 | Lv. 10 Little Star | 6–9 mo | Crawling, sparkle crown floating above head |
| `public/assets/timeline/lv20-adventurer.png` | 400 × 400 | Lv. 20 Adventurer | 12–18 mo | Standing, toddling stance, small backpack |
| `public/assets/timeline/lv50-legend.png` | 400 × 400 | Lv. 50 Legend | 2 + yr | Mini warrior armour, triumphant pose |

**Style notes:**
- Each character is visibly older/bigger than the previous.
- Lv. 1–20 use Cute Mode palette (pastel pink/lavender); Lv. 50 shifts to Warrior
  Mode (blue/gold armour) to foreshadow the "legend" outcome.
- Consistent soft lighting across all five for visual cohesion.

---

### 3. Background Scene Illustrations

These are full-width rectangular renders used as decorative section backgrounds.

| File | Size | Used in | Description |
|------|------|---------|-------------|
| `public/assets/scenes/hero-cute-bg.png` | 960 × 720 | Hero — Cute Mode side | Soft gradient sky (pale pink → lavender), floating pastel clouds, rainbow arc, distant fairy-tale castle, scattered stars and sparkles. Light, airy, no harsh edges. |
| `public/assets/scenes/hero-warrior-bg.png` | 960 × 720 | Hero — Warrior Mode side | Dramatic night sky, stone platform lit by glowing cracks, lightning in distant clouds, silhouette of epic castle, warm torchlight glow at base. |
| `public/assets/scenes/features-bg.png` | 1920 × 600 | Features dark strip | Deep purple/navy gradient with subtle particle glints. Used as a decorative parallax layer; keep it muted so text stays readable. |

---

### 4. 3D UI Icons (transparent PNG)

Replace all 26 flat icons in `public/sprites/icon/` with 3D cute-style icons.
The icon set used in the reference design includes the following. Render each on a
transparent background with a soft ambient-occlusion shadow beneath.

| File | Size | Description |
|------|------|-------------|
| `public/assets/icons/xp-badge.png` | 256 × 256 | Gold star with "XP" lettering, slight glow |
| `public/assets/icons/trophy.png` | 256 × 256 | Gold trophy cup, shiny |
| `public/assets/icons/growth-chart.png` | 256 × 256 | Colourful ascending bar chart with sparkle |
| `public/assets/icons/family.png` | 256 × 256 | Two figures (parent + baby) with heart above |
| `public/assets/icons/book.png` | 256 × 256 | Open book, pages glowing faintly |
| `public/assets/icons/shield.png` | 256 × 256 | Blue/gold fantasy shield with star emblem |
| `public/assets/icons/bottle.png` | 256 × 256 | Baby bottle, pastel blue |
| `public/assets/icons/moon-star.png` | 256 × 256 | Crescent moon with star, soft glow (sleep) |
| `public/assets/icons/camera.png` | 256 × 256 | Cute round camera, pastel |
| `public/assets/icons/achievement.png` | 256 × 256 | Medal/ribbon, gold, celebratory |
| `public/assets/icons/heart-pulse.png` | 256 × 256 | Heart with EKG line (health tracking) |
| `public/assets/icons/calendar.png` | 256 × 256 | Cute calendar page with star date |

**Style notes:**
- Consistent Blender material: painted ceramic/plastic feel, subsurface scattering on
  soft surfaces, metallic sheen on gold elements.
- Lighting: single top-left key light, soft fill, no harsh cast shadows in the icon
  itself.
- Icon proportions: centred in the 256 × 256 canvas with ~16 px inset padding.

---

### 5. Logo / Wordmark Asset

| File | Size | Description |
|------|------|-------------|
| `public/assets/logo/babyleveling-logo.png` | 400 × 120 | "BabyLeveling" wordmark — "Baby" in Cute pink, "Leveling" in Warrior purple. Small 3D star icon to the left. Both light and dark background variants. |
| `public/assets/logo/babyleveling-logo-dark.png` | 400 × 120 | Same but reversed for dark backgrounds |
| `public/assets/logo/favicon-512.png` | 512 × 512 | The star icon alone, for favicon/og-image use |

---

## Folder Structure After Completion

```
public/
├── assets/
│   ├── characters/
│   │   ├── cute-baby-girl-sitting.png
│   │   ├── cute-baby-girl-waving.png
│   │   ├── cute-baby-boy-sitting.png
│   │   └── cute-baby-boy-waving.png
│   ├── timeline/
│   │   ├── lv01-newborn.png
│   │   ├── lv05-explorer.png
│   │   ├── lv10-little-star.png
│   │   ├── lv20-adventurer.png
│   │   └── lv50-legend.png
│   ├── scenes/
│   │   ├── hero-cute-bg.png
│   │   ├── hero-warrior-bg.png
│   │   └── features-bg.png
│   ├── icons/
│   │   └── (12 icon files listed above)
│   └── logo/
│       ├── babyleveling-logo.png
│       ├── babyleveling-logo-dark.png
│       └── favicon-512.png
└── sprites/           ← DELETE entire directory after acceptance
```

---

## Relevant Files

- `public/sprites/` — existing assets to be deleted after replacement
- `lib/content/sprites.ts` — path helper; will be updated in TASK-0015 to point at `public/assets/`
- `docs/design/reference-redesign.png` — reference image (place a copy here for future contributors)

## Acceptance Criteria

- [ ] All 24 PNG files listed in the inventory exist at the paths specified
- [ ] Character renders: transparent background, no hard aliasing at edges
- [ ] Icon renders: consistent style, stroke weight, and lighting direction across all 12 icons
- [ ] Background scenes: match the mood descriptions (Cute = light/airy, Warrior = dramatic)
- [ ] Logo: legible at 200 × 60 display size (half resolution)
- [ ] `public/sprites/` directory does not exist (deleted)
- [ ] Source `.blend` file locations documented in `docs/design/assets-source.md`

## Technical Notes

- Render at 2× the target display size and export at target size via Blender's
  `Render > Resolution` — this gives sharper edges at the cost of minimal file size.
- Use PNG-24 with alpha for transparent assets; JPEG 85 % quality for full-scene
  backgrounds to keep file sizes reasonable.
- Recommended Blender setup: Cycles render engine, 256 samples, denoising enabled.
- Character rigs do not need to be animation-ready; static poses are sufficient.

## Definition of Done

- [ ] Acceptance criteria all pass
- [ ] `docs/design/assets-source.md` created with Blender file locations
- [ ] Task file moved from `active/` to `done/`
