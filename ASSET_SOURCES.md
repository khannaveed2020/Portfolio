# Brand assets

## Personal character

- `public/character/naveed-anime.webp`: generated here from user-approved photographs in `Pics/Sample Self Pictures/`, with the supplied illustration in `Pics/Animated/` as a style reference. Built-in image generation, then metadata-free WebP export; original photos are not published.
- Full art direction and prompt set: `assets/character-art-direction.md`. Pupils, highlights and eyelids are rendered separately in `src/Character.tsx`; the raster alone is an animation base, not the finished portrait.

## Logos and marks

Marks identify employers and linked platforms; they do not imply endorsement. Respective trademarks belong to their owners.

- Wipro and historical HCL wordmark: Simple Icons (`https://simpleicons.org/`), CC0 vector collection, local monochrome marks from `https://cdn.simpleicons.org/wipro/FFFFFF` and `https://cdn.simpleicons.org/hcl/FFFFFF`.
  - HCL viewBox tightened around the original path to remove empty vertical margins; artwork is not stretched or redrawn.
- Credly: Simple Icons, from `https://cdn.simpleicons.org/credly`.
- Mphasis: official PNG from `https://www.mphasis.com/content/dam/mphasis-com/global/logo/mphasis-logo.png`, preserved inside a local SVG image wrapper. Not a vector redraw; displayed on a white plate to preserve legibility.
- Azure: Devicon Azure vector (`https://github.com/devicons/devicon/blob/master/icons/azure/azure-original.svg`), Devicon MIT collection; Microsoft trademark.
- Microsoft four-square mark, LinkedIn, GitHub and PowerShell marks: local SVG representations used with visible identifying text.
- RoadLens illustration: original decorative SVG study, not a screenshot of project output. Earlier hobby studies are superseded by the supplied photographs.

The page does not request brand assets from external servers at runtime.

## Personal story photographs

- RoadLens preview: user-approved `Pics/RoadLense/Screenshot 2026-10-05 at 20.54.01.jpg`, replacing the decorative study. Optimised 1280px/640px JPEG exports strip metadata and preserve the original composition. Screenshot content is illustrative, not evidence of extra capabilities or production deployment.

- Photography: all sixteen user-approved `Pics/HBK/IMG_5077.jpg` through `IMG_5092.jpg`, exported as `photography-{number}.jpg` and `-small.jpg`. Landscape, architecture and everyday-detail captions describe inspected images without inferring locations. HBK is a small, translucent website overlay, not baked into downloadable JPEG pixels. Originals remain unchanged and ignored.

- User-supplied Aviation and Scuba photos in `Pics/`, approved for their respective galleries. Six Aviation images and two Scuba images are published as locally optimised JPEG copies, with 640px and 1280px variants. EXIF/GPS metadata is removed; originals are unchanged and ignored by Git.
- Aviation source order: `IMG_9942.JPG`, `IMG_9961.JPG`, `IMG_9963.JPG`, `IMG_5074.jpg`, `IMG_5075.jpg`, `IMG_5076.jpg`. Last three are explicitly captioned as flight simulation, not real-world pilot qualifications.
- Scuba source order: `IMG_5072.jpg`, `IMG_5073.jpg`.
- `scripts/prepare-story-photos.py` prepares six Aviation photos, two Scuba photos, sixteen HBK photos and one RoadLens screenshot, each in two sizes. Aviation MOV clips, unrelated portraits and other source folders are not published.

- Metadata hygiene verified 6 October 2026: all 50 JPEG derivatives and the portrait contain no EXIF/XMP. Embedded metadata was removed from 14 PNG logo/badge derivatives and the PNG inside the Mphasis SVG, without changing source photographs. The build check covers all 66 raster payloads. HBK remains a subtle website overlay, not a baked-in image watermark.

## Credential-group organisation symbols

- Cisco, ISC2, Linux Foundation and Wireshark: Simple Icons CC0 collection, retrieved as white SVG marks from `https://cdn.simpleicons.org/{cisco,isc2,linuxfoundation,wireshark}/FFFFFF`.
- Check Point: official company SVG from `https://www.checkpoint.com/wp-content/themes/checkpoint-theme-v2/images/checkpoint-logo.svg`; displayed on a light plate to preserve the wordmark colours.
- Kepner-Tregoe: official wordmark observed on its homepage, exported from `https://kepner-tregoe.com/wp-content/uploads/2025/06/kepner-tregoe-logo.png`.
- Linux Academy: archived organisation symbol from `https://seeklogo.com/vector-logo/388319/linux-academy`, image `https://images.seeklogo.com/logo-png/38/1/linux-academy-logo-png_seeklogo-388319.png`, resized to 160px. This is an organisation mark, not a certificate badge; trademark belongs to its owner.

## Credential tape artwork

- Credly images observed on the user's public badge wallet on 5 October 2026, resized to a maximum of 240px without redrawing. These identify recorded credentials. Per the latest user decision, the tape has no credential-status labels or explanatory note and makes no current/renewal claims.
  - az-700: https://images.credly.com/images/c3a2e51d-7984-48cc-a4cb-88d4e8487037/azure-network-engineer-associate-600x600.png
  - az-104: https://images.credly.com/images/336eebfc-0ac3-4553-9a67-b402f491f185/azure-administrator-associate-600x600.png
  - az-720: https://images.credly.com/images/963586bb-5903-400b-9b0a-33ebcf7f4313/image.png
  - az-900: https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png
  - ab-730: https://images.credly.com/images/d07718c4-d5c9-441f-a48f-a23464de2136/converted20260911-32-1gombi.png
  - ab-731: https://images.credly.com/images/d04ecbde-7844-4044-ba41-974832968a6a/converted20260911-32-gf8j3.png
  - isc2-cc: https://images.credly.com/images/2030e43f-8003-4d4b-9630-847add403c87/image.png
  - ccna: https://images.credly.com/images/683783d8-eaac-4c37-a14d-11bd8a36321d/ccna_600.png
  - ccna-security: https://images.credly.com/images/23ae0d10-85d7-415a-a6c0-0e2919040628/cisco_ccna_security.png
  - cisco-web: https://images.credly.com/images/8ad89c9a-20d8-4d17-9433-885c8caf3978/blob
  - ccsa: https://images.credly.com/images/86f7933b-ced4-4648-8019-17f492caa4e8/CCSA_R77.png
  - kt: https://images.credly.com/images/7d93c621-dedf-4caa-a4d8-e679d5e7db10/KT-Problem_Solver.png
- AI-900 uses the official Microsoft fundamentals mark from the Azure AI Fundamentals page: https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg . This is a generic official level mark, not a fabricated AI-900 personalised badge.
- Linux learning and Wireshark remain textual learning entries, not fabricated certification badges. Employer marks identify experience, not corporate endorsement.
