# Personal anime character — 5 October 2026

Created with built-in image generation, using the user's approved local source photographs. No extra subscription, external image service or new runtime dependency was added.

## Inputs (private, ignored)

- `Pics/Sample Self Pictures/IMG_8158.JPG`: primary facial likeness.
- `Pics/Sample Self Pictures/IMG_3346.JPG`: supplementary hair and beard reference; spectacles omitted for unobstructed eye animation.
- `Pics/Animated/071A7C0B-D5C1-4AEC-8E31-FD1F59E3D04D.PNG`: supplied illustration style reference.

## Prompt set

Initial: Create one production-ready transparent PNG character portrait for a professional personal portfolio. Preserve the photographed adult man's recognizable facial proportions, medium brown skin, thick eyebrows, swept dark hair, brown eyes, full beard and moustache. Use the illustrated reference for soft hand-drawn anime-film treatment, warm muted colours, controlled linework and gentle cel shading. Front-facing head-and-shoulders bust, navy blazer, ivory open-collar shirt, relaxed closed-mouth smile. Keep hair and shoulders inside the frame. No text, signature, scenery or props. Leave both eye whites blank, without irises, pupils or glints, for code-controlled eye layers. Genuine alpha transparency; one character only.

Refinement: Preserve the first portrait's adult likeness, full neatly shaped beard, thick swept dark hair, strong brows, navy blazer and ivory open shirt. Change rendering toward the supplied soft hand-drawn Japanese anime-film illustration: cleaner outlines, warm cel colour areas and gentle shadows rather than photographic texture. Retain actual facial proportions and skin tone. Front-facing upright bust with blank eye whites for animation. Transparent padding, upper chest, curved lower silhouette. No background, halo, scenery or text.

## Softer treatment selected

The user selected the softer animated direction. A fresh image was generated with the supplied illustration as the primary style reference and IMG_8158.JPG for identity. Final prompt: create a soft hand-drawn anime animation base, matching the reference's gentle traditional 2D face shading, softly drawn eyes, natural nose, friendly closed-mouth smile, muted navy blazer and cream shirt. Preserve recognizable adult proportions, swept dark hair, strong brows, medium brown skin and full neatly shaped beard. Use broad hair shapes, fine warm outlines, two or three face colour tones and paper-like warmth. Front-facing 1024 × 1536 bust, complete shoulders, curved lower silhouette, transparent padding. Keep outlined almond eye whites blank for separately animated brown pupils. No scenery, halo, text, signature or watermark. Built-in image generation; the published WebP replaces the earlier treatment. Eye clips, pupil positions and eyelid colour were realigned to this version.

## Runtime asset

- Runtime asset: `public/character/naveed-anime.webp` (1024 × 1536, alpha, metadata-free).
- The raster intentionally has no pupils. `src/Character.tsx` supplies brown irises, pupils and highlights in the pre-rendered HTML; the complete website portrait therefore remains visible without JavaScript.
- SVG clips separate the static torso and moving head with neck overlap. Clipped eyes follow the pointer; the head tilts at most 1.4 degrees. CSS eyelids blink briefly every eight seconds on fine-pointer devices only.
- Touch and reduced-motion visitors receive a neutral static portrait. The portrait stays in its hero; the separate cat mascot owns the corner companion role.
- The user selected this softer animation direction; likeness can still be refined through feedback.
