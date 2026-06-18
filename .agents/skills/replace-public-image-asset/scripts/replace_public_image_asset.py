#!/usr/bin/env python3
"""Convert an image to a PNG public asset and replace the target safely."""

from __future__ import annotations

import argparse
from pathlib import Path
import sys
from tempfile import NamedTemporaryFile
from typing import Iterable


Color = tuple[int, int, int]


def die(message: str) -> None:
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(1)


def load_pillow():
    try:
        from PIL import Image
    except ImportError:
        die("Pillow is required. Install it in the active environment before using this script.")
    return Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert a source image to an RGBA PNG and replace a file under public/assets."
    )
    parser.add_argument("--input", required=True, help="Source image path.")
    parser.add_argument(
        "--target",
        required=True,
        help="Existing or desired target path under public/assets, ending in .png.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Allow overwriting an existing target file.",
    )
    parser.add_argument(
        "--no-remove-key",
        action="store_true",
        help="Do not remove a chroma-key background; just normalize/copy to RGBA PNG.",
    )
    parser.add_argument(
        "--key-color",
        help="Explicit chroma key as #rrggbb. Defaults to median border color.",
    )
    parser.add_argument("--transparent-threshold", type=int, default=36)
    parser.add_argument("--opaque-threshold", type=int, default=220)
    return parser.parse_args()


def parse_color(raw: str) -> Color:
    value = raw.strip().lstrip("#")
    if len(value) != 6:
        die("--key-color must look like #ff00ff.")
    try:
        return (int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16))
    except ValueError:
        die("--key-color must look like #ff00ff.")


def validate_paths(source: Path, target: Path, force: bool) -> tuple[Path, Path]:
    source = source.expanduser().resolve()
    target = target.expanduser()
    if not target.is_absolute():
        target = (Path.cwd() / target).resolve()
    else:
        target = target.resolve()

    public_assets = (Path.cwd() / "public" / "assets").resolve()
    if not source.exists():
        die(f"Input image not found: {source}")
    if target.suffix.lower() != ".png":
        die("Target must end in .png.")
    if public_assets not in [target, *target.parents]:
        die(f"Target must be inside {public_assets}.")
    if target.exists() and not force:
        die(f"Target exists: {target} (use --force to replace it).")
    target.parent.mkdir(parents=True, exist_ok=True)
    return source, target


def border_pixels(image) -> Iterable[Color]:
    width, height = image.size
    rgb = image.convert("RGB")
    for x in range(width):
        yield rgb.getpixel((x, 0))
        yield rgb.getpixel((x, height - 1))
    for y in range(1, height - 1):
        yield rgb.getpixel((0, y))
        yield rgb.getpixel((width - 1, y))


def median_border_key(image) -> Color:
    pixels = list(border_pixels(image))
    return tuple(sorted(channel)[len(channel) // 2] for channel in zip(*pixels))  # type: ignore[return-value]


def distance(a: Color, b: Color) -> int:
    return max(abs(a[0] - b[0]), abs(a[1] - b[1]), abs(a[2] - b[2]))


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def alpha_for_distance(value: int, transparent: int, opaque: int) -> int:
    if value <= transparent:
        return 0
    if value >= opaque:
        return 255
    return round(255 * smoothstep((value - transparent) / (opaque - transparent)))


def despill(rgb: Color, key: Color, alpha: int) -> Color:
    if alpha == 255:
        return rgb
    spill_channels = [idx for idx, value in enumerate(key) if value >= max(key) - 16 and value > 128]
    if not spill_channels:
        return rgb
    channels = list(rgb)
    non_spill = [idx for idx in range(3) if idx not in spill_channels]
    cap = max((channels[idx] for idx in non_spill), default=0)
    blend = 1.0 - (alpha / 255.0)
    for idx in spill_channels:
        channels[idx] = round(channels[idx] * (1.0 - blend) + min(channels[idx], cap) * blend)
    return (channels[0], channels[1], channels[2])


def remove_key(image, key: Color, transparent: int, opaque: int):
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    transparent_count = 0
    partial_count = 0

    for y in range(height):
        for x in range(width):
            r, g, b, old_alpha = pixels[x, y]
            alpha = min(old_alpha, alpha_for_distance(distance((r, g, b), key), transparent, opaque))
            if alpha == 0:
                transparent_count += 1
            elif alpha < 255:
                partial_count += 1
            pixels[x, y] = (*despill((r, g, b), key, alpha), alpha)

    return rgba, transparent_count, partial_count


def validate_output(path: Path) -> None:
    Image = load_pillow()
    image = Image.open(path)
    if image.format != "PNG":
        die("Output is not a PNG.")
    if image.mode != "RGBA":
        die(f"Output mode is {image.mode}; expected RGBA.")
    alpha = image.getchannel("A")
    extrema = alpha.getextrema()
    if extrema[0] != 0:
        die("Output has no fully transparent pixels.")
    if extrema[1] != 255:
        die("Output has no fully opaque pixels.")


def main() -> None:
    args = parse_args()
    if args.transparent_threshold >= args.opaque_threshold:
        die("--transparent-threshold must be lower than --opaque-threshold.")

    source, target = validate_paths(Path(args.input), Path(args.target), args.force)
    Image = load_pillow()
    image = Image.open(source)

    if args.no_remove_key:
        output = image.convert("RGBA")
        key = None
        transparent_count = 0
        partial_count = 0
    else:
        key = parse_color(args.key_color) if args.key_color else median_border_key(image)
        output, transparent_count, partial_count = remove_key(
            image,
            key,
            args.transparent_threshold,
            args.opaque_threshold,
        )

    with NamedTemporaryFile(dir=target.parent, suffix=".png", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    try:
        output.save(tmp_path, "PNG")
        validate_output(tmp_path)
        tmp_path.replace(target)
    finally:
        if tmp_path.exists():
            tmp_path.unlink()

    print(f"Wrote {target}")
    print(f"Source: {source}")
    print(f"Size: {output.size[0]}x{output.size[1]}")
    if key is not None:
        print(f"Key color: #{key[0]:02x}{key[1]:02x}{key[2]:02x}")
        print(f"Transparent pixels: {transparent_count}/{output.size[0] * output.size[1]}")
        print(f"Partially transparent pixels: {partial_count}/{output.size[0] * output.size[1]}")


if __name__ == "__main__":
    main()
