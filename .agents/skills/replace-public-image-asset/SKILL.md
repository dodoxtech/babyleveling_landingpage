---
name: replace-public-image-asset
description: Generate or use a provided image, convert it into a PNG asset with real alpha transparency when needed, and replace an existing file under public/assets using the same filename. Use when Codex is asked to create, convert, rename, copy, or overwrite website/app image assets in public/assets, especially generated mascot or character PNGs with chroma-key backgrounds that must become transparent.
---

# Replace Public Image Asset

## Workflow

Use this skill when the final deliverable is an image file in `public/assets`.

1. Identify the source image.
   - If the user attached an image, use that path directly and tell the user where it is stored.
   - If the user wants a new image generated, use the built-in `image_gen` workflow first. For transparency requests, generate on a flat chroma-key background (`#ff00ff` for blue/green subjects, `#00ff00` otherwise).
2. Identify the exact target path under `public/assets`.
   - Preserve the old filename when the user says "replace the old asset" or "rename it to the same name".
   - Search references with `rg` if the target is ambiguous.
   - Do not replace files outside `public/assets`.
3. Convert and replace with `scripts/replace_public_image_asset.py`.
   - For flat magenta/green keyed images, let the script auto-sample the border key.
   - For an already-transparent PNG, pass `--no-remove-key` so it is copied/normalized to RGBA PNG.
   - Use `--force` only after confirming replacement is the user's requested outcome.
4. Validate the final asset.
   - Check `file <target>`.
   - Check with Pillow that mode is `RGBA`, alpha extrema include `0` and `255`, transparent corners exist for isolated assets, and dimensions are expected.
   - Use `view_image` for a visual pass when the image matters.
5. Report the source path, target path, dimensions, and alpha validation.

## Commands

Convert a keyed source image and overwrite an existing public asset:

```bash
python3 .agents/skills/replace-public-image-asset/scripts/replace_public_image_asset.py \
  --input /path/to/source.png \
  --target public/assets/characters/warrior-baby-shield.png \
  --force
```

Copy an already-transparent PNG while preserving alpha:

```bash
python3 .agents/skills/replace-public-image-asset/scripts/replace_public_image_asset.py \
  --input /path/to/source.png \
  --target public/assets/characters/warrior-baby-shield.png \
  --no-remove-key \
  --force
```

## Guardrails

- Never use `npm` or `yarn` in this repo.
- Do not create new consuming code references when the user asks to replace an old file; overwrite the old filename instead.
- Do not replace unrelated assets just because they are visually similar.
- Do not leave generated project assets only in `$CODEX_HOME` or temp folders.
- Do not claim transparency from a checkerboard preview; verify the actual alpha channel.
