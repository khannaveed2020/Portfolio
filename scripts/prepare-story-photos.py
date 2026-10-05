"""Export only approved story photos; preserve originals and strip EXIF/GPS."""
from pathlib import Path
from PIL import Image, ImageOps

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
output = root / "public/photos"
output.mkdir(parents=True, exist_ok=True)
for source, name in photos:
    with Image.open(root / "Pics" / source) as original:
        oriented = ImageOps.exif_transpose(original).convert("RGB")
        for maximum, suffix in [(1280, ""), (640, "-small")]:
            resized = oriented.copy()
            resized.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
            # A new pixel-only image prevents copied camera/GPS metadata.
            clean = Image.new("RGB", resized.size)
            clean.paste(resized)
            path = output / f"{name}{suffix}.jpg"
            clean.save(path, format="JPEG", quality=82, optimize=True, progressive=True)
            with Image.open(path) as verified:
                assert not verified.getexif(), f"Metadata remains in {path}"
            print(f"{path.name}: {path.stat().st_size // 1024} KB")
