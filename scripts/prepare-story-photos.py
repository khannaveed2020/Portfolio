"""Export only approved story photos; preserve originals and strip EXIF/GPS."""
from pathlib import Path
import hashlib
import json
import os
from PIL import Image, ImageOps, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent
photos = [
    ("Aviation/IMG_9942.JPG", "aviation-01"),
    ("Aviation/IMG_9961.JPG", "aviation-02"),
    ("Aviation/IMG_9963.JPG", "aviation-03"),
    ("Aviation/IMG_5074.jpg", "aviation-04"),
    ("Aviation/IMG_5075.jpg", "aviation-05"),
    ("Aviation/IMG_5076.jpg", "aviation-06"),
    ("Scuba/IMG_5072.jpg", "scuba-01"),
    ("Scuba/IMG_5073.jpg", "scuba-02"),
]
photos += [(f"HBK/IMG_{number}.jpg", f"photography-{number}") for number in range(5077, 5093)]
photos += [("RoadLense/Screenshot 2026-10-05 at 20.54.01.jpg", "roadlens-preview")]
output = root / "public/photos"
output.mkdir(parents=True, exist_ok=True)
watermarks = {}
font_path = os.environ.get("HBK_FONT", "/System/Library/Fonts/Supplemental/Arial Bold.ttf")
for source, name in photos:
    with Image.open(root / "Pics" / source) as original:
        oriented = ImageOps.exif_transpose(original).convert("RGB")
        for maximum, suffix in [(1280, ""), (640, "-small")]:
            resized = oriented.copy()
            resized.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
            # A new pixel-only image prevents copied camera/GPS metadata.
            clean = Image.new("RGB", resized.size)
            clean.paste(resized)
            if not name.startswith("roadlens"):
                # Imprint the approved mark in pixels on story derivatives only.
                overlay = Image.new("RGBA", clean.size)
                draw = ImageDraw.Draw(overlay)
                font = ImageFont.truetype(font_path, max(12, round(clean.width * .025)))
                margin = max(10, round(clean.width * .018))
                draw.text((clean.width - margin, clean.height - margin), "HBK", font=font,
                          anchor="rs", fill=(255, 255, 255, 125), stroke_width=1,
                          stroke_fill=(0, 0, 0, 90))
                clean = Image.alpha_composite(clean.convert("RGBA"), overlay).convert("RGB")
            path = output / f"{name}{suffix}.jpg"
            clean.save(path, format="JPEG", quality=82, optimize=True, progressive=True)
            if not name.startswith("roadlens"):
                watermarks[path.name] = hashlib.sha256(path.read_bytes()).hexdigest()
            with Image.open(path) as verified:
                assert not verified.getexif(), f"Metadata remains in {path}"
            print(f"{path.name}: {path.stat().st_size // 1024} KB")

(root / "scripts/story-watermarks.json").write_text(json.dumps(watermarks, indent=2) + "\n")
