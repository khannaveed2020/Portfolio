# Personal anime character — 5 October 2026

Created with built-in image generation, using the user's approved local source photographs. No extra subscription, external image service or new runtime dependency was added.

## Inputs (private, ignored)

- `Pics/Sample Self Pictures/IMG_8158.JPG`: primary facial likeness.
- `Pics/Sample Self Pictures/IMG_3346.JPG`: supplementary hair and beard reference; spectacles omitted for unobstructed eye animation.
- `Pics/Animated/071A7C0B-D5C1-4AEC-8E31-FD1F59E3D04D.PNG`: supplied illustration style reference.

## Prompt set

Initial: Create one production-ready transparent PNG character portrait for a professional personal portfolio. Preserve the photographed adult man's recognizable facial proportions, medium brown skin, thick eyebrows, swept dark hair, brown eyes, full beard and moustache. Use the illustrated reference for soft hand-drawn anime-film treatment, warm muted colours, controlled linework and gentle cel shading. Front-facing head-and-shoulders bust, navy blazer, ivory open-collar shirt, relaxed closed-mouth smile. Keep hair and shoulders inside the frame. No text, signature, scenery or props. Leave both eye whites blank, without irises, pupils or glints, for code-controlled eye layers. Genuine alpha transparency; one character only.

Refinement: Preserve the first portrait's adult likeness, full neatly shaped beard, thick swept dark hair, strong brows, navy blazer and ivory open shirt. Change rendering toward the supplied soft hand-drawn Japanese anime-film illustration: cleaner outlines, warm cel colour areas and gentle shadows rather than photographic texture. Retain actual facial proportions and skin tone. Front-facing upright bust with blank eye whites for animation. Transparent padding, upper chest, curved lower silhouette. No background, halo, scenery or text.

## Delivery

- Runtime asset: `public/character/naveed-anime.webp` (1024 × 1536, alpha, metadata-free).
- The raster intentionally has no pupils. `src/Character.tsx` supplies brown irises, pupils and highlights in the pre-rendered HTML; the complete website portrait therefore remains visible without JavaScript.
- SVG clips separate the static torso and moving head with neck overlap. Clipped eyes follow the pointer; the head tilts at most 1.4 degrees. CSS eyelids blink briefly every eight seconds on fine-pointer devices only.
- Touch and reduced-motion visitors receive a neutral static portrait. Desktop scrolling docks it in a corner; the docked portrait reacts only within 180px.
- This is the first implemented likeness for user review, not a claim that the user has approved the final artwork.
