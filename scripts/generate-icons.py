"""Regenerate PWA raster icons from the Alvor brand palette.

Run: python3 scripts/generate-icons.py
Sources: DESIGN.md Graphite primary (#334155) to primary-hover (#2B3748).
No font dependency: the "A" mark matches public/favicon.svg and the header logo.
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw

TOP = (71, 85, 105)
BOTTOM = (51, 65, 85)
WHITE = (255, 255, 255, 255)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public")


def vertical_gradient(size: int) -> Image.Image:
    grad = Image.new("RGBA", (size, size))
    px = grad.load()
    assert px is not None
    for y in range(size):
        t = y / max(size - 1, 1)
        color = (
            round(TOP[0] + (BOTTOM[0] - TOP[0]) * t),
            round(TOP[1] + (BOTTOM[1] - TOP[1]) * t),
            round(TOP[2] + (BOTTOM[2] - TOP[2]) * t),
            255,
        )
        for x in range(size):
            px[x, y] = color
    return grad


def squircle(size: int, radius_ratio: float = 0.225) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1],
        radius=int(size * radius_ratio),
        fill=255,
    )
    img.paste(vertical_gradient(size), (0, 0), mask)
    return img


def draw_mark(img: Image.Image, pad_ratio: float = 0.24) -> None:
    # "A" mark scaled from the favicon/header logo (64px viewBox):
    # apex (32, 18), feet (18, 46) and (46, 46), bar y=38 from x=24 to 40.
    del pad_ratio  # stroke geometry already carries its own padding
    s = img.width
    k = s / 64.0
    width = max(1, round(8 * k))
    apex = (32 * k, 18 * k)
    left_foot = (18 * k, 46 * k)
    right_foot = (46 * k, 46 * k)
    bar_start = (24 * k, 38 * k)
    bar_end = (40 * k, 38 * k)
    d = ImageDraw.Draw(img)
    d.line([apex, left_foot], fill=WHITE, width=width, joint="curve")
    d.line([apex, right_foot], fill=WHITE, width=width, joint="curve")
    d.line([bar_start, bar_end], fill=WHITE, width=width)


def save(img: Image.Image, *parts: str) -> None:
    path = os.path.join(OUT_DIR, *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print(f"wrote {path}")


def main() -> None:
    for size in (192, 512):
        icon = squircle(size)
        draw_mark(icon)
        save(icon, "icons", f"icon-{size}.png")

    maskable = vertical_gradient(512)
    draw_mark(maskable, pad_ratio=0.30)
    save(maskable, "icons", "maskable-512.png")

    touch = vertical_gradient(180)
    draw_mark(touch, pad_ratio=0.24)
    save(touch.convert("RGB"), "apple-touch-icon.png")


if __name__ == "__main__":
    main()
