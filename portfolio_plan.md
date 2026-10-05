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

Audience: recruiters and hiring managers. Country-specific job-search, relocation and visa requirements are private context for applications, not public website content. The website should communicate personal curiosity and character through authentic stories.

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
- Lovable: optional bounded design critique or scaffold. Keep the local project authoritative; do not publish a duplicate or spend credits debugging. A critique-only pass does not require a second scaffold or GitHub sync.
- Primary hosting: GitHub Pages, public repository `khannaveed2020/Portfolio`, base path `/Portfolio/` (case-sensitive). Home-server hosting may follow after the site is stable.

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
- Palette: dark-only with charcoal/navy surfaces and off-white text. The approved revision adds sand/amber in the hero, muted indigo for work and rose for contact. Credentials use a neutral navy surface with explicit off-white headings, light-grey body text and restrained mint accents; avoid low-contrast green-on-green content.
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
4. Testimonials: attributed excerpts from verified received LinkedIn recommendations, before Contact. No additional top navigation item.
5. Contact: clear links and call to action; mailto or another no-backend option in v1.

The top navigation uses the explicit labels `About Me`, `About My Work`, and `Credentials & Labs`, and scrolls through the single page. Work experience and other dense content may use accessible inline expansion, but the summary must remain visible without interaction.

The personal story should demonstrate, rather than merely claim, determined problem-solving and curiosity. Supporting examples may include more than 10 hours of hands-on flight experience in a Cessna 172, driving independently across India, and sustained learning. Do not use unsupported adjectives such as `reliable` or `trustworthy` without evidence.

Content boundary for v1: do not publicly disclose disability. This does not change the requirement to provide complete and accurate information in any official employment, medical, or immigration process.

Professional content is sourced from `public/Naveed_Khan_Resume.pdf`. Include current roles, dates, technical capabilities, credentials, PowerShell projects and accurately labelled labs. Project content may also come from inspected user-owned public repositories. RoadLens is a local hackathon prototype with YOLO object detection and deterministic keyword search, not a production safety system or LLM search. No licence is declared, so label it public-source. Personal copy and portrait remain provisional; supplied Aviation and Scuba photographs are integrated. Remaining content does not block development.

### Public résumé

- Public download: `public/Naveed_Khan_Resume.pdf`; title `Naveed Khan Resume`.
- Editable local source: `assets/source-documents/Naveed_Khan_Public_Resume.docx`; exclude this directory from Git and deployment.
- Persistent header control: accessible label `Open Naveed Khan résumé PDF`, opens in a new tab with `rel="noopener noreferrer"`.
- Use Vite's base URL so the deployed link is `/Portfolio/Naveed_Khan_Resume.pdf`.
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
- GitHub Pages: `base: '/Portfolio/'` in `vite.config.ts`; deploy `dist/` through GitHub Actions. Repository created as `khannaveed2020/Portfolio` on 5 October 2026. Verify deployment separately from successful Git push.
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
- Aviation and Scuba photographs are supplied and integrated. Supply a clear source portrait and approve character concepts in the hero before preparing animation layers.
- Final character treatment: preferred soft editorial; compare a restrained pixel option when source photo is available.
- Push verified changes to `khannaveed2020/Portfolio`; verify live workflow and résumé link after publishing.
- Complete cross-browser and Lighthouse verification before calling the first release ready.

## 14. Initial implementation

- Development begins with approved placeholders, résumé-derived professional content and no paid services.
- React renders static HTML during the production build, then hydrates for navigation highlights and animation. Essential content and native `<details>` work without JavaScript.
- Section IDs: `about`, `work`, `credentials`, `contact`. Three sticky navigation labels; Contact at the end.
- Dark editorial layout, CSS focus/hover states, Motion reveals and SVG placeholder character with desktop tracking, touch/reduced-motion fallbacks and quiet desktop corner behavior.
- Build outputs only public assets. Source documents stay local. Run `npm run build` and `npm run check` for each verified phase.
- Initial implementation completed locally on 5 October 2026. Git initialized; strict production build and public-output checks pass. GitHub Pages workflow is prepared. See `VERIFICATION.md` for actual browser checks, Lighthouse results and remaining launch tasks. No remote or live deployment is configured yet.

## 15. Design revision agreed 5 October 2026

- Remove public relocation/visa copy and education. Retain résumé unchanged. Email is a labelled mailto control, not visible address text (the address necessarily remains in the link target).
- Use labelled profile logos for LinkedIn, GitHub, Credly and PowerShell Gallery.
- Expand the palette with warm sand/amber, indigo work accents, ocean teal and a muted rose contact chapter, while remaining dark-only.
- Make scroll entrances visibly intentional, add a reading-progress line, scroll-linked story illustration movement and keyboard/touch-operable aircraft/diving controls. Reduced motion removes movement; static HTML stays readable.
- Aviation/ocean vector studies were interim artwork, now replaced by the supplied photo galleries. Character likeness still awaits the user-supplied portrait.
- Lovable critique-only pass used one credit; no remote project code changes or publishing requested.

## 16. Project content, credentials and branding revision

- Credentials & Labs is an explicit section heading. Credentials appear first with visible grouped lists, then public projects/tools and separately labelled homelab learning.
- Add RoadLens with repository/demo links, inspected stack and visible README-supported benefits: searchable people/vehicle detections, local footage/session control, offline use after setup and flexible cross-platform/Docker/package installation. Remove the visitor-facing hackathon/MVP label and limitations notice. Do not infer production adoption, individual contribution scope, accuracy guarantees, safety-system capabilities or unrestricted AI search.
- Use employer marks beside company names and an Azure mark beside Microsoft/Azure credentials. Preserve role names and dates; logos are identification, not endorsement.
- Experience details use compact, subtly outlined boxes (12px text, 36px minimum height) with plus/minus indicators and visible keyboard focus. Avoid the earlier prominent filled pill treatment. Technical capabilities is an always-visible, properly headed bordered panel with category/description rows, not a disclosure control.
- Remove the visitor-facing “Personal introduction in progress” draft marker. Personal copy can remain provisional in planning without exposing editorial reminders on the website.
- HCL's original wordmark artwork remains unchanged; trim the SVG's excessive internal whitespace and size it for legibility in work experience and the logo tape.
- Security & networking shows Cisco, Check Point and ISC2 organisation symbols. Professional development shows Kepner-Tregoe, Linux Academy, Linux Foundation and Wireshark symbols, not certification badges.
- Keep Craftz.dog-inspired personal warmth and Brittany Chiang-inspired readable hierarchy. Avoid a stock grid or hiding certificate names behind disclosure controls.
- Existing public résumé remains unchanged; private editable documents remain excluded from all Git history and deployment.
- Repository created and verified code pushed to `https://github.com/khannaveed2020/Portfolio`; GitHub build run `37302299316` passed for implementation commit `6f4780c`. Publishing remains manual; Pages has not been activated in this revision.

## 17. Testimonials

- Add `testimonials` near the bottom, immediately before Contact, preserving the three-item sticky navigation.
- Received LinkedIn recommendations verified in the signed-in profile on 5 October 2026: Ratnavo Dutta (10 January 2026) and Ankush G (22 September 2025).
- Latest display order: Ankush first, Ratnavo second; preserve full supplied quotations.
- Use the complete recommendation text supplied by the user, author names, profile links, source dates and observed working relationships. Preserve the original wording, including typos; do not rewrite quotes, infer companies or imply corporate endorsement. Do not import pending/given recommendations or unrelated profile content.
- Use a vibrant plum chapter surface, warm-white readable quotations and peach highlights; keep paragraphs fully visible without line clamps, scrolling boxes or Read more truncation.
- Link to the full recommendations; disclose that LinkedIn may require sign-in. Latest interaction: manually cycled two-item quote tape. Click the quote or labelled Next testimonial button to switch 1 → 2 → 1; no auto-rotation. Keep author links separate. Without JavaScript, both quotations remain readable.

## 18. Skills tape

- Add a continuously moving skills tape near the bottom, above the footer, using selected résumé-supported skills. Lab-only tools remain labelled as lab experience; do not add inferred LinkedIn skills.
- Latest user revision supersedes the pause requirement: no stop/resume controls and no hover/focus pausing. Reduced-motion preferences still show static wrapped lists, as does the no-JavaScript fallback. Exclude duplicated visual loops from assistive technology. Continuous non-essential motion without a pause/stop/hide mechanism is an acknowledged WCAG 2.2.2 trade-off, not full accessibility conformance.
- Tape A uses smaller 15–18px skills text and moves left. Include user-requested Copilot Studio, GitHub Copilot and AI Agents. Latest speed is 36.555 pixels/second, another 5% increase. Tape B still moves right at 34.814 pixels/second; measure each loop's width independently to preserve speed after resizing.
- Tape B sequence: Wipro, HCL, Mphasis, Microsoft; Cisco CCNA, CCNA Security and Web Content Security badges; Check Point CCSA; AZ-900, AZ-104, AZ-700, AZ-720, AI-900, AB-730, AB-731. ISC2 and Kepner-Tregoe are no longer on this tape, but their credential entries remain unchanged.
- Use authentic Credly badge artwork and the official Microsoft Learn fundamentals mark for AI-900. Preserve original logos and optimise assets locally. Latest user decision: show logos with credential-name-only accessible labels/tooltips and no old/new/historical/expired wording or status note. Do not add current/active/renewed claims. Linux learning and Wireshark are not invented certification marks.
- Use existing CSS/React only, with no new dependencies. Preserve contrast, normal scrolling and the three primary navigation links.

## 19. Personal photo galleries

- Precede Aviation with an editorial personal summary tying together user-confirmed travel, photography, aviation and scuba/adventure interests. Do not infer personality assessments, achievements or professional ability from the photographs.
- Bridge About Me to Work with a spacious, scroll-revealed transition: “A different setting. The same curiosity.” Shift the background gradually toward the indigo work chapter and provide a clear Work anchor. Preserve native scrolling, reduced-motion and static-content fallbacks; no new dependencies.

- Photography follows Scuba within About Me, with all 16 supplied HBK photos, a two-sentence travel/photography introduction and the same manually cycled gallery. Show a subtle corner HBK watermark as a website overlay on every photograph; originals remain untouched. Keep the three-item main navigation unchanged.

- Use all six supplied Aviation photos and both Scuba photos in their respective alternating image/text stories. Clearly distinguish the three flight-simulation images from real flying.
- Show one photograph at a time after hydration, with a photo count and subtle Next photo button slightly below. Each gallery cycles independently back to its first image; no automatic advancement.
- Preserve whole images without cropping, meaningful alternative text and keyboard-operable controls. Without JavaScript, all photographs and captions remain visible.
- Publish responsive, optimised, metadata-free copies only; ignore `Pics/` and leave original files unchanged. Exclude MOV clips and unrelated portraits.
