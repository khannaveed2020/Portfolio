# Portfolio Plan

## 0. How to use this document (instructions for the assistant)

- Treat this file as the project brief. Do not invent facts about me, my experience, or my projects. If content is missing, ask.
- Ask one focused question at a time, only when the answer changes the plan. Otherwise state the assumption and proceed.
- Propose a plan and the file list before writing code. Build one component or behavior per step.
- Be direct. Flag risks, weak assumptions, and better alternatives. Do not agree by default.
- Verify library APIs against current official documentation before using them. Say when unsure.
- No extra dependencies beyond the stack below without asking first.

## 1. Goal

Build an interactive, visually distinctive static personal portfolio website with:

- A character whose eyes and head follow the cursor
- Smooth scrolling and scroll-driven animation
- Clear project and experience content (content matters more than effects)
- Self-hostable static output

Finish a content-complete version first. Add animation polish afterward.

Audience: recruiters and hiring managers, especially New Zealand employers in Auckland and the North Island open to employer-supported AEWV candidates. The website should also communicate personal curiosity and character through authentic stories.

## 2. Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS
- Motion for component, entrance, and scroll-linked animation
- CSS transitions for simple hover and focus effects
- GSAP + ScrollTrigger only if an approved interaction cannot be implemented cleanly with Motion
- Native scrolling first; Lenis only if user testing identifies a real need
- Character: layered transparent artwork or SVG (see section 4)
- Output: static files in `dist/`, no backend for v1

## 3. Tools and accounts available

- ChatGPT Plus (chat and Codex in VS Code)
- VS Code, Git, GitHub
- Lovable (100 credits): optional, for a fast layout scaffold only. Sync to GitHub immediately if used, then continue in VS Code. Do not spend credits on debugging.
- Primary hosting: GitHub Pages, repository `portfolio`, base path `/portfolio/`. Home-server hosting may follow after the site is stable.

### UI and animation library policy for v1

- Start from a clean Vite project rather than adopting a complete portfolio template. Existing templates may be inspected for individual implementation patterns, but their layouts, dependency sets, and visual identities must not become the foundation of the site.
- Use Motion as the default and only general-purpose animation library. Prefer CSS for simple hover, focus, and opacity transitions.
- Use native anchor scrolling first. Do not add Lenis unless testing reveals a specific scrolling problem or an approved interaction demonstrably benefits from it.
- Add GSAP and ScrollTrigger only if the approved hero-to-corner character transition or another complex scroll sequence cannot be implemented cleanly with Motion. Do not use both libraries for the same behaviour.
- Skiper UI, React Bits, and Vengence UI are reference collections, not required dependencies or design systems. Free components or source patterns may be adapted selectively after checking their current licence, dependencies, accessibility, mobile behaviour, and visual fit.
- Do not purchase Skiper UI or another UI library for v1. A subscription or paid component may be reconsidered only when a specific approved component is essential and recreating it would cost more than buying it.
- Do not use Animaster Lib unless an official source, clear licence, maintainership, and implementation documentation can be verified first.
- Avoid Three.js, React Three Fiber, WebGL hero scenes, replacement cursors, splash effects, particle backgrounds, and cinematic page-transition systems in v1.
- Because v1 is a single page, use section transitions and anchor navigation rather than route or page transitions.

## 4. Character plan

**Selected direction for v1:** a recognisable, closely stylised portrait based on my own photo. The preferred treatment is a soft editorial, hand-drawn illustration with controlled linework, muted colours, restrained shading, and a transparent background. It should look professional rather than strongly anime, childish, or like a generic mascot.

Before finalising the artwork, compare two concepts in the actual hero layout: the preferred soft illustrated portrait and one restrained pixel-art alternative. Do not choose based on the character in isolation.

**Alternative concept: pixel-art avatar from my own image**
- Source: my own photo or drawing, converted to pixel art, then cleaned up by hand.
- Tools: Piskel, Lospec Pixel Editor, LibreSprite, or Aseprite for cleanup. AI image tools can produce a first draft; manual cleanup is expected.
- Canvas: small (for example 64x64 or 96x96), integer scaling only, `image-rendering: pixelated`.
- Cursor tracking: 9 directional frames (center plus 8 directions) chosen by angle from the character to the cursor, or a separate eyes layer moved a few pixels.
- Idle: blink using CSS `steps()` or a sprite sheet.

**Preferred concept: soft editorial character**
- Concept art from my own photo, cleaned and separated into transparent layers (head, eyes or pupils, eyelids, mouth, body) using free tools such as Inkscape where practical.
- Production owner: create concepts here after I supply a clear photo; I approve the concept before cleanup and layer preparation. Start with a clearly labelled SVG placeholder. No additional subscription is required to begin; available generation and layer quality must be checked at that stage.

**Rules for both**
- Pinterest is for inspiration and a mood board only. Do not use other artists' artwork directly.
- Build the whole site with a simple placeholder character first so the character does not block progress.
- Touch devices have no cursor: provide a static or idle-animation fallback.
- Respect `prefers-reduced-motion`.
- On initial load, the character can be prominent in the hero. As the visitor scrolls, it may transition into a small corner companion on desktop.
- The corner version must remain mostly still: occasional blinking or a small proximity reaction only. It must not compete with the content.
- Use only a few animation layers: body, head, pupils or eyes, and an optional alternate smile.
- Do not visually represent or publicly disclose my disability in v1.

## 5. Design direction

- Reference sites: Craftz.dog (`https://www.craftz.dog/`) and Brittany Chiang (`https://brittanychiang.com/`).
- Reference qualities: Craftz.dog for warm personal storytelling and interests; Brittany Chiang for information hierarchy and professional clarity. Borrow patterns, not artwork or layouts.
- Typography: warm and approachable. Initial implementation uses locally available Avenir Next/Avenir, falling back to Segoe UI and sans-serif, with restrained monospace labels. No paid or remote font service is needed. Review the fallback rendering across platforms before release.
- Visual personality: balanced professional and technical, but not a dashboard.
- Style: clean editorial structure with clear hierarchy and restrained interactive touches. It should feel custom, but neither basic nor excessively elaborate.
- Layout density: use large, open editorial sections with generous spacing. Use bordered or elevated cards selectively for work entries, certifications, experiments, and other content that genuinely benefits from grouping; avoid a card grid across the whole page.
- Personal imagery: use authentic photos supplied by me, including flying and scuba-diving images, in the About Me section. Treat each interest as its own short visual story rather than combining them. Use alternating split layouts with the photograph on one side and text on a solid surface on the other, plus a restrained fade-in or gentle image scale. The images must support the narrative without becoming persistent backgrounds.
- Shape language: use moderately rounded corners for buttons, expandable panels, and cards. Avoid both sharp dashboard-like rectangles and excessive pill-shaped controls.
- Palette: dark-first, using deep navy or charcoal, off-white text, and a restrained Azure-blue or cyan accent. A muted teal or violet may be used sparingly as a secondary accent.
- Accent treatment: use solid accent colours for buttons, links, focus states, and important labels. Limit blue-to-teal gradients or glows to the hero character area and one or two large decorative elements; do not apply gradients broadly to headings and controls.
- Theme scope: dark-only for v1. Reconsider a light theme only after the completed dark design has been tested.
- Interaction rule: never hide important information behind hover-only effects, unlabelled icons, or ambiguous controls.
- Detail pattern: show a useful summary first, followed by an explicit control such as `View experience details`; expand details inline instead of using modal dialogs.
- Hero composition: split layout on desktop, with the personal introduction on the left and the large character on the right. Stack the content vertically on smaller screens, preserving the introduction before decorative artwork in the reading order.
- Hero hierarchy: make my name and the character the immediate focal points. Do not place my formal role title in the hero; introduce role titles and technical positioning inside About My Work. Provide obvious choices to scroll or jump directly to the primary sections.
- Hero voice: professional first, with personal warmth and curiosity. Avoid superhero comparisons, `engineer by day` constructions, or hobby labels that could overstate qualifications. The short personal line should connect curiosity, learning, and determined problem-solving without sounding like a slogan generator.
- Provisional hero line: `Curious by nature. Determined in practice.` Use it as a design placeholder and reassess it against the final About Me copy before launch.
- Navigation: use a slim, always-visible sticky header for the three primary sections. Highlight the active section subtly and keep all labels explicit.
- One distinctive idea that ties the site together: the reactive personal character.

Sources for inspiration: Awwwards, Godly, Dribbble, Codrops, Pinterest (mood board only).

## 6. Site structure

1. Hero / About Me: name and personal introduction first, connecting determined problem-solving, curiosity, and continuous learning to professional value. The character is prominent here. Do not show the formal role title in this opening area.
2. About My Work: introduce the professional role title here, followed by selected experience, projects, and technical capabilities with concise summaries and clearly labelled inline details.
3. Credentials & Labs: certifications, homelab work, learning, and relevant experiments grouped together.
4. Contact: clear links and call to action; mailto or another no-backend option in v1.

The top navigation uses the explicit labels `About Me`, `About My Work`, and `Credentials & Labs`, and scrolls through the single page. Work experience and other dense content may use accessible inline expansion, but the summary must remain visible without interaction.

The personal story should demonstrate, rather than merely claim, determined problem-solving and curiosity. Supporting examples may include more than 10 hours of hands-on flight experience in a Cessna 172, driving independently across India, and sustained learning. Do not use unsupported adjectives such as `reliable` or `trustworthy` without evidence.

Content boundary for v1: do not publicly disclose disability. This does not change the requirement to provide complete and accurate information in any official employment, medical, or immigration process.

Professional content is sourced from `public/Naveed_Khan_Resume.pdf`. Include current roles, dates, technical capabilities, credentials, PowerShell projects and accurately labelled labs. Initial personal copy, portrait and flying/scuba images are explicitly provisional. They do not block development.

### Public résumé

- Public download: `public/Naveed_Khan_Resume.pdf`; title `Naveed Khan Resume`.
- Editable local source: `assets/source-documents/Naveed_Khan_Public_Resume.docx`; exclude this directory from Git and deployment.
- Persistent header control: accessible label `Open Naveed Khan résumé PDF`, opens in a new tab with `rel="noopener noreferrer"`.
- Use Vite's base URL so the deployed link is `/portfolio/Naveed_Khan_Resume.pdf`.
- Public safety changes: India only, no phone/address/postcode, no scuba depth, no Master Resume label; professional profile links retained.
- Latest additions include Traffic Manager, Bastion, Azure NAT Gateway, Azure PaaS deployment/configuration, and Wipro user-access requests, first-level analysis and monthly MIS reporting. Copilot Studio agent descriptions remain purpose-neutral.

## 7. Animation plan (one effect per section, keep it restrained)

- Global: native smooth anchor scrolling first; add Lenis only if testing proves a real need
- Hero: character cursor tracking, subtle entrance
- Projects: restrained reveal on scroll
- Experience: readable timeline or grouped roles; pinned or scrubbed behaviour is optional and must first prove usable on mobile
- Contact: simple hover and focus states
- Performance: animate `transform` and `opacity` where possible; lazy-load below-the-fold photographs and decorative assets
- Accessibility: essential content must remain available without animation; reduce or remove cursor tracking, large-scale movement, parallax, and scroll scrubbing when `prefers-reduced-motion` is active
- Input fallback: disable pointer-following and tilt interactions on touch devices; never replace the native cursor or require hover to discover content
- Rule: if an effect hurts performance or readability on mobile, remove it

## 8. Build phases

1. Project setup, Git, `AGENTS.md`, Tailwind, base layout
2. Static content and responsive layout
3. Character (placeholder first, then final art)
4. Add scroll animations one section at a time; introduce GSAP or Lenis only when an approved design requires them
5. Mobile and touch fallbacks, accessibility pass
6. Performance pass, build, deploy

Commit after every working step.

## 9. Working agreement for code prompts

- One component or behavior per prompt
- Paste exact error messages when debugging
- Each prompt states: file, behavior, constraints, no new dependencies
- Ask for a plan before code on anything touching more than one file

Example prompt:
> Build a `Hero` section: full-viewport, character on the right, headline on the left. Eyes and head follow the pointer using one `pointermove` listener with `requestAnimationFrame` smoothing. Disable on touch devices and when `prefers-reduced-motion` is set. TypeScript, Tailwind, no new dependencies.

## 10. Deployment

- Local: `npm run dev`, then `npm run build && npm run preview` to test the production build
- GitHub Pages: `base: '/portfolio/'` in `vite.config.ts`; deploy `dist/` through GitHub Actions. Connect the intended repository and enable Pages with GitHub Actions before publishing.
- Linux home server: nginx serving `dist/`, HTTPS via Let's Encrypt, domain or tunnel decision needed. Provide step-by-step guidance when I ask.

## 11. Testing checklist

- Lighthouse performance target: 90+
- Mobile and touch behavior
- `prefers-reduced-motion` respected
- Chrome, Firefox, Safari
- Keyboard navigation and color contrast
- Smooth scroll does not break anchor links or the back button
- Asset sizes (sprites, fonts, images)

## 12. Risks

- Biggest: the character artwork. Time-box it and use a placeholder.
- Too many animation libraries makes the site slow and inconsistent. Stay within the stack.
- Effects over content. Recruiters and visitors skim; clear project write-ups come first.
- AI tools rewriting working code. Use Git and small steps.

## 13. Remaining content and launch tasks

- Supply and approve final About Me introduction and individual hobby stories.
- Supply a clear source portrait and flying/scuba photographs. Approve character concepts in the hero before preparing animation layers.
- Final character treatment: preferred soft editorial; compare a restrained pixel option when source photo is available.
- Connect the GitHub `portfolio` repository and enable GitHub Pages; verify live workflow and résumé link after publishing.
- Complete cross-browser and Lighthouse verification before calling the first release ready.

## 14. Initial implementation

- Development begins with approved placeholders, résumé-derived professional content and no paid services.
- React renders static HTML during the production build, then hydrates for navigation highlights and animation. Essential content and native `<details>` work without JavaScript.
- Section IDs: `about`, `work`, `credentials`, `contact`. Three sticky navigation labels; Contact at the end.
- Dark editorial layout, CSS focus/hover states, Motion reveals and SVG placeholder character with desktop tracking, touch/reduced-motion fallbacks and quiet desktop corner behavior.
- Build outputs only public assets. Source documents stay local. Run `npm run build` and `npm run check` for each verified phase.
- Initial implementation completed locally on 5 October 2026. Git initialized; strict production build and public-output checks pass. GitHub Pages workflow is prepared. See `VERIFICATION.md` for actual browser checks, Lighthouse results and remaining launch tasks. No remote or live deployment is configured yet.
