# Sprite Export Workflow

Turns the AI-generated character sheets (one big PNG each) into individual
transparent sprite PNGs in `public/sprites/`, plus a typed TypeScript index
(`lib/content/sprites.ts`) the Next.js site imports.

## Layout

```
tools/sprites/
├── export_sprites.py    # the pipeline (Python 3 + Pillow)
├── requirements.txt     # Pillow
├── sheets/              # source character sheets (checked in)
│   ├── boy-sheet.png
│   └── girl-sheet.png
├── manifests/           # one JSON per sheet: named crop regions
│   ├── boy-sheet.json
│   └── girl-sheet.json
└── preview/             # generated crops + contact sheet for QA (gitignored)
```

## Prerequisites

```bash
python3 -m pip install -r tools/sprites/requirements.txt   # Pillow
```

## Usage

```bash
# Export every manifest -> public/sprites/<key>/<name>.png + lib/content/sprites.ts
python3 tools/sprites/export_sprites.py

# Or via the package script (after bootstrap):
pnpm sprites
```

This writes, relative to the repo root:

| Output | What |
|--------|------|
| `public/sprites/<key>/<name>.png` | one transparent PNG per sprite (e.g. `public/sprites/babyGirl/happy.png`) |
| `lib/content/sprites.ts` | `sprites`, `spritesByGroup`, `SpriteKey`, `spritePath()` |
| `tools/sprites/preview/<sheet>/_contact-sheet.png` | labelled QA grid on a checker background |

### Verify the crop

Open `tools/sprites/preview/<sheet>/_contact-sheet.png` — every sprite is
labelled on a checker background so transparency and stray background are easy
to spot. Misaligned? Adjust the manifest and re-run (see below).

## Using sprites in the web

```tsx
import Image from "next/image";
import { spritePath } from "@/lib/content/sprites";

<Image src={spritePath("babyGirl.happy")} alt="Happy baby" width={130} height={170} />
// or grouped:
import { spritesByGroup } from "@/lib/content/sprites";
<Image src={spritesByGroup.icon.bottle} alt="Bottle" width={72} height={72} />
```

`SpriteKey` is a union of every key, so a typo is a compile error.

## Adding / fixing sprites

1. Drop a new sheet PNG in `sheets/`.
2. Copy an existing manifest in `manifests/` and adjust:
   - `key` → the folder/prefix: `key: "babyBoy"` → `public/sprites/babyBoy/<name>.png`
   - grid sections: `origin` (top-left of first cell), `cell` (crop size),
     `pitch` (distance between cell origins), `cols`
   - one-off sprites use an explicit `"rect": [x, y, w, h]`
3. Re-run `python3 tools/sprites/export_sprites.py` and check the contact sheet
   until the crops are clean.

## Background removal

`remove_background: true` flood-fills from the crop border, turning every
border-connected pixel within `tolerance` RGB distance of the corner color
transparent. Interior pixels of the same color are preserved. Raise `tolerance`
if halos remain; lower it if the sprite gets eaten. Set
`"remove_background": false` per sprite to keep the original background (e.g. the
framed `portrait` tiles).

## Provenance

The sheets and manifests originate from the BabyLeveling iOS app's
`tools/sprites/` pipeline (same crop coordinates). The iOS version installs
Xcode imagesets; this version emits flat web PNGs + a TS index instead.
