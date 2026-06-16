#!/usr/bin/env python3
"""Export sprites from a character sheet into individual web PNGs.

Slices each sprite described in a manifest out of its source sheet, removes the
background to transparency, trims it, and writes a flat PNG into the Next.js
`public/` folder — plus a typed TypeScript index the web can import.

Workflow:
  1. Source sheets live in   sheets/         (one big PNG per sheet)
  2. Crop regions live in     manifests/      (one JSON per sheet)
  3. Export everything:       python3 export_sprites.py
  4. Eyeball the contact sheet in preview/<sheet>/_contact-sheet.png
     Misaligned? Adjust origin/pitch/cell/rect in the manifest and re-run.

Outputs (relative to repo root):
  public/sprites/<key>/<name>.png      e.g. public/sprites/babyGirl/happy.png
  lib/content/sprites.ts               typed index: SpriteKey + path lookup
  tools/sprites/preview/<sheet>/...    per-sprite crops + labelled contact sheet (QA only)

Manifest format (shared with the iOS app's extract_sprites.py):
{
  "sheet": "../sheets/girl-sheet.png",
  "sections": [
    {
      "key": "babyGirl",                 // becomes the folder/prefix: babyGirl/<name>.png
      "remove_background": true,         // flood-fill border background to transparent
      "tolerance": 34,                   // RGB distance for background match
      "grid": {                          // OR give each sprite an explicit "rect"
        "origin": [480, 48],             // top-left of first cell (px)
        "cell": [130, 172],              // cell size (px)
        "pitch": [131, 214],             // distance between cell origins (px)
        "cols": 4
      },
      "sprites": [
        "happy",                                                   // grid position
        {"name": "portrait", "rect": [14, 86, 304, 384],           // explicit crop
         "remove_background": false}
      ]
    }
  ]
}
"""

import argparse
import json
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent          # tools/sprites
REPO_ROOT = HERE.parents[1]                      # repo root
DEFAULT_OUT = REPO_ROOT / "public" / "sprites"
DEFAULT_INDEX = REPO_ROOT / "lib" / "content" / "sprites.ts"
WEB_PREFIX = "/sprites"                           # public/ is served from the site root


# ---------------------------------------------------------------- extraction

def load_manifest(path: Path):
    manifest = json.loads(path.read_text())
    sheet_path = (path.parent / manifest["sheet"]).resolve()
    sheet = Image.open(sheet_path).convert("RGBA")
    return manifest, sheet


def iter_sprites(section):
    """Yield (name, rect, remove_bg, tolerance) for every sprite in a section."""
    grid = section.get("grid")
    default_remove = section.get("remove_background", True)
    default_tol = section.get("tolerance", 40)
    for index, entry in enumerate(section["sprites"]):
        if isinstance(entry, str):
            entry = {"name": entry}
        name = entry["name"]
        if "rect" in entry:
            rect = entry["rect"]
        else:
            if grid is None:
                sys.exit(f"sprite '{name}' has no rect and section '{section['key']}' has no grid")
            col = index % grid["cols"]
            row = index // grid["cols"]
            x = grid["origin"][0] + col * grid["pitch"][0]
            y = grid["origin"][1] + row * grid["pitch"][1]
            rect = [x, y, grid["cell"][0], grid["cell"][1]]
        yield (
            name,
            rect,
            entry.get("remove_background", default_remove),
            entry.get("tolerance", default_tol),
        )


def remove_background(img, tolerance):
    """Make the background transparent via flood fill from the image border.

    Background color is sampled from the four corners; any border-connected
    pixel within `tolerance` RGB distance becomes transparent. Interior pixels
    of the same color (highlights inside a sprite) are preserved.
    """
    px = img.load()
    w, h = img.size
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
    tol_sq = tolerance * tolerance

    def is_bg(p):
        dr, dg, db = p[0] - bg[0], p[1] - bg[1], p[2] - bg[2]
        return dr * dr + dg * dg + db * db <= tol_sq

    seen = bytearray(w * h)
    queue = deque()
    for x in range(w):
        for y in (0, h - 1):
            queue.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        p = px[x, y]
        if not is_bg(p):
            continue
        px[x, y] = (p[0], p[1], p[2], 0)
        if x > 0:
            queue.append((x - 1, y))
        if x < w - 1:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y < h - 1:
            queue.append((x, y + 1))
    return img


def trim_transparent(img, margin=2):
    bbox = img.getbbox()
    if bbox is None:
        return img
    left = max(bbox[0] - margin, 0)
    top = max(bbox[1] - margin, 0)
    right = min(bbox[2] + margin, img.width)
    bottom = min(bbox[3] + margin, img.height)
    return img.crop((left, top, right, bottom))


def extract_all(manifest, sheet):
    """Yield (key, name, image) for every sprite in the manifest."""
    for section in manifest["sections"]:
        for name, rect, remove_bg, tolerance in iter_sprites(section):
            x, y, w, h = rect
            crop = sheet.crop((x, y, x + w, y + h))
            if remove_bg:
                crop = remove_background(crop, tolerance)
                crop = trim_transparent(crop)
            yield section["key"], name, crop


# ---------------------------------------------------------------- web outputs

def write_pngs(sprites, out_dir):
    """Write public/sprites/<key>/<name>.png. Returns ordered (key, name, web_path)."""
    entries = []
    for key, name, img in sprites:
        key_dir = out_dir / key
        key_dir.mkdir(parents=True, exist_ok=True)
        img.save(key_dir / f"{name}.png")
        entries.append((key, name, f"{WEB_PREFIX}/{key}/{name}.png"))
    return entries


def write_contact_sheet(sprites, out_dir):
    """Labelled tiles on a checker background so transparency/stray bg is obvious."""
    out_dir.mkdir(parents=True, exist_ok=True)
    tile, label_h, cols = 150, 18, 8
    rows = (len(sprites) + cols - 1) // cols
    contact = Image.new("RGBA", (cols * tile, rows * (tile + label_h)), (60, 60, 60, 255))
    draw = ImageDraw.Draw(contact)
    for i, (key, name, img) in enumerate(sprites):
        cx, cy = (i % cols) * tile, (i // cols) * (tile + label_h)
        for qx in range(0, tile, 12):
            for qy in range(0, tile, 12):
                if (qx // 12 + qy // 12) % 2:
                    draw.rectangle([cx + qx, cy + qy, cx + qx + 11, cy + qy + 11],
                                   fill=(90, 90, 90, 255))
        thumb = img.copy()
        thumb.thumbnail((tile - 8, tile - 8))
        contact.alpha_composite(thumb, (cx + (tile - thumb.width) // 2,
                                        cy + (tile - thumb.height) // 2))
        draw.text((cx + 4, cy + tile + 2), f"{key}.{name}", fill=(255, 255, 255, 255))
    path = out_dir / "_contact-sheet.png"
    contact.save(path)
    return path


def write_index(entries, index_path):
    """Generate lib/content/sprites.ts — typed key -> public path lookup."""
    index_path.parent.mkdir(parents=True, exist_ok=True)
    flat = {f"{key}.{name}": path for key, name, path in entries}

    groups = {}
    for key, name, path in entries:
        groups.setdefault(key, {})[name] = path

    lines = [
        "// AUTO-GENERATED by tools/sprites/export_sprites.py — do not edit by hand.",
        "// Regenerate with: pnpm sprites  (or: python3 tools/sprites/export_sprites.py)",
        "",
        "/** Every sprite, keyed as `<group>.<name>` -> public path. */",
        "export const sprites = {",
    ]
    for k, path in flat.items():
        lines.append(f'  {json.dumps(k)}: {json.dumps(path)},')
    lines += [
        "} as const;",
        "",
        "export type SpriteKey = keyof typeof sprites;",
        "",
        "/** Sprites grouped by sheet section (babyGirl, babyBoy, icon, …). */",
        "export const spritesByGroup = {",
    ]
    for group, names in groups.items():
        lines.append(f"  {json.dumps(group)}: {{")
        for name, path in names.items():
            lines.append(f"    {json.dumps(name)}: {json.dumps(path)},")
        lines.append("  },")
    lines += [
        "} as const;",
        "",
        "/** Resolve a sprite key to its public `/sprites/...` path. */",
        "export function spritePath(key: SpriteKey): string {",
        "  return sprites[key];",
        "}",
        "",
    ]
    index_path.write_text("\n".join(lines))
    return flat


# ---------------------------------------------------------------- cli

def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("manifests", nargs="*", type=Path,
                        help="manifest JSON files (default: all of manifests/*.json)")
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT,
                        help=f"PNG output dir (default: {DEFAULT_OUT.relative_to(REPO_ROOT)})")
    parser.add_argument("--index", type=Path, default=DEFAULT_INDEX,
                        help=f"TS index path (default: {DEFAULT_INDEX.relative_to(REPO_ROOT)})")
    parser.add_argument("--no-contact", action="store_true", help="skip QA contact sheets")
    args = parser.parse_args()

    manifest_paths = args.manifests or sorted((HERE / "manifests").glob("*.json"))
    if not manifest_paths:
        parser.error("no manifests found")

    all_entries = []
    for mpath in manifest_paths:
        manifest, sheet = load_manifest(mpath)
        sprites = list(extract_all(manifest, sheet))
        entries = write_pngs(sprites, args.out_dir)
        all_entries.extend(entries)
        print(f"{mpath.name}: exported {len(entries)} sprites -> "
              f"{args.out_dir.relative_to(REPO_ROOT)}/")
        if not args.no_contact:
            preview = HERE / "preview" / mpath.stem
            contact = write_contact_sheet(sprites, preview)
            print(f"  contact sheet: {contact.relative_to(REPO_ROOT)}")

    flat = write_index(all_entries, args.index)
    print(f"\nwrote index ({len(flat)} keys) -> {args.index.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
