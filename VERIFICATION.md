# Initial portfolio verification

## Softer character refinement — 5 October 2026

- Applied the user's preference for the softer illustrated direction. Replaced the portrait WebP with a fresh image based primarily on the supplied illustration treatment and the actual photograph for likeness; realigned eye clips, pupil positions and eyelid colour.
- Desktop hero visually inspected and pointer movement verified against the new eye positions. No browser console errors observed. Screenshot: `.qa/softer-anime-character.png`.
- Production build, static checks and whitespace checks pass. Animation behaviour, responsive sizing and reduced-motion rules are unchanged; previous physical-touch and OS reduced-motion verification limitations still apply.

## Personal anime character — 5 October 2026

- Replaced the stock placeholder with a photo-derived anime portrait using the user's supplied photographs and illustration reference. A transparent 1024 × 1536 WebP asset is approximately 131 KiB; source photographs remain ignored and unchanged.
- Desktop browser inspection confirms clipped pupil movement changes with pointer position, separate head rotation, readable hero framing and the small fixed companion after navigating to Work. No browser console warnings/errors observed.
- Mobile layouts inspected at 390px and 320px: portrait stays in its hero, no horizontal overflow, no corner companion. These viewport checks do not emulate an actual touch device.
- Pointer tracking is restricted to fine pointers and ignores touch events. Reduced-motion preference changes reset eyes/head and undock the portrait; CSS blink is enabled only for fine pointers with no reduced-motion preference. Actual OS reduced-motion, physical touch, Firefox and Safari testing remain pending.
- Static build checks require both pupil layers and the base-path-correct portrait asset in pre-rendered HTML. No-JavaScript appearance is covered by static output inspection, not a separate JavaScript-disabled browser session.
- Production build, static content/privacy checks and whitespace checks pass. No new dependencies. First integrated likeness remains subject to user feedback.

## Separate credentials and practical projects — 5 October 2026

- Credentials has a standalone chapter and navigation label. Removed the combined heading and introductory “Lab experience is labelled separately…” sentence.
- Added separate `labs` chapter, Projects & Practical Learning, containing RoadLens, published PowerShell diagnostic modules and homelab experiments. Homelab descriptions remain clearly learning-focused, without implying production ownership.
- User-supplied RoadLens screenshot replaces the decorative SVG. Responsive JPEG copies have no EXIF metadata; the original remains ignored and unchanged. No new capabilities inferred from screenshot labels.
- Desktop screenshot and section boundary visually inspected; grouped tools checked at 320px with document width 320px and no overflow. Production build, static section/grouping/asset assertions and whitespace checks pass.
- Screenshots: `.qa/projects-learning.jpg`, `.qa/roadlens-screenshot.jpg`. No new Lighthouse, cross-browser or public Pages deployment.

## Personal summary and Work transition — 5 October 2026

- Added a semantic personal-interest summary before Aviation, grounded in the user's travel, photography, aviation and scuba interests. It makes no inferred qualifications or professional-performance claims.
- Added a compact personal-to-professional bridge with a gradual dark-to-indigo colour shift, existing Motion reveal and explicit Work anchor. No dependencies or scroll hijacking added; existing reduced-motion and static-HTML foundations remain intact.
- Desktop summary and bridge visually inspected. At 320px the summary is readable and document width equals viewport width. Bridge link navigates to `/Portfolio/#work`.
- Production build, static section/order assertions and whitespace checks pass. Screenshots: `.qa/personal-summary.jpg`, `.qa/chapter-transition.jpg`. No new Lighthouse, OS reduced-motion, cross-browser or live Pages audit.

Verified on 5 October 2026 against the production build served at `http://127.0.0.1:4173/portfolio/`.

## Completed

- Strict TypeScript check and production client/server builds passed.
- Static page rendering and output checks passed: all four sections, source-grounded professional content, native details, correct asset URLs and public résumé.
- `assets/source-documents/` is ignored by Git and absent from deployment output. No DOCX is present in `dist/`.
- Résumé URL `/portfolio/Naveed_Khan_Resume.pdf` returns HTTP 200 and `application/pdf`; link opens in a new tab with secure rel attributes and a descriptive accessible name.
- Desktop hero visually inspected; mobile hero and expanded experience visually inspected; native details respond to Enter and expose expanded state in the accessibility tree.
- Document width checked at 320, 390, 768 and 1440 pixels. A narrow-phone overflow was corrected; final document width matches viewport width.
- Main anchors and active section highlighting verified. The desktop companion appears after scrolling and is absent at mobile widths.
- Browser console contained no captured errors or warnings during the checks.
- Lighthouse mobile audit after the accessible logo-label fix: Performance 100, Accessibility 100, Best Practices 100, SEO 100. No failing binary audits. Scores are a local snapshot, not a guarantee for other devices or hosting.
- Production HTML contains the full content and native details before hydration. Build-time checks verify this no-JavaScript foundation. A browser session with JavaScript explicitly disabled has not been tested.
- Reduced-motion and coarse-pointer behavior are implemented in Motion configuration, effect guards and CSS. Operating-system preference and actual touch-device testing remain to be completed.

## Remaining before public launch

- Review provisional personal introduction; supply and approve final portrait artwork. Aviation and Scuba photos are now integrated (see latest revision below).
- Verify Firefox and Safari directly. The available in-app browser and Chrome Lighthouse run do not establish full cross-browser compatibility.
- Exercise actual touch and reduced-motion preferences, plus browser back-button behavior across anchors.
- Connect an accessible GitHub repository named `portfolio`. The local checkout has no remote; connector lookup of `khannaveed2020/portfolio` returned 404, which may indicate absence or lack of access.
- Select GitHub Actions in repository Pages settings, push the committed code, observe the deployment workflow and verify the live `/portfolio/` page and résumé URL.

No public deployment was made during this implementation.
# Design revision — 5 October 2026

- Strict build and static-output checks pass after content removal and visual revisions.
- Public HTML excludes relocation/visa content and education; visible email removed, labelled mailto retained. Public résumé unchanged.
- Aircraft and diving toggle controls verified in the in-app browser; pressed state changes and the aircraft transform responds. Local Credly vector loads; other profile marks are inline vectors with text labels.
- No horizontal overflow measured at 320, 390, 768 pixels; desktop and mobile hero visually inspected. Screenshot: `.qa/revised-stories.jpg`.
- Latest Chrome Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100. Illustration visible/accessibility label match passes. Reports remain local under `.qa/`.
- Reduced-motion and coarse-pointer fallbacks are implemented; actual OS reduced-motion and touch hardware still need direct testing. Firefox/Safari and live GitHub Pages checks remain pending.
- Lovable used only for design critique (one credit), not remote code edits or deployment.

## Repository-content and credentials revision — 5 October 2026

- RoadLens README, `app/search.py`, `app/detector.py` and package metadata reviewed live. Website labels it as a public-source hackathon prototype with deterministic keyword search and explicit limitations. No declared repository licence found; no production or sole-contributor claims added.
- Credentials now have real section/group headings and visible lists. Chapter text contrast against `#19232f`: body 10.64:1, headings 14.18:1, accent 12.43:1.
- Employer marks and Azure logo verified loaded in the browser; provenance recorded in `ASSET_SOURCES.md`. Microsoft employer mark is an inline SVG.
- Project inline details and narrow layouts at 320/390 pixels checked. No horizontal overflow. Desktop credentials visually inspected; screenshot `.qa/credentials-review.jpg`.
- Strict build, static-output/private-file checks and diff whitespace checks pass. Local Chrome Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100; no failed binary audits.
- Public repository `khannaveed2020/Portfolio` created. Base path changed to `/Portfolio/`; all local asset and résumé checks pass with matching case. Private source documents are absent from tracked files and Git history.
- Push builds run automatically; deployment is manual so incomplete cross-browser/content review does not publish a release. Earlier lowercase-path and no-remote observations above are historical.
- Remote `origin` connected; implementation commit `6f4780c203e556f9a517d99755de31206ad0f6d0` pushed successfully. GitHub build run `37302299316` completed successfully. Pages was not enabled or published; repository push is not a live-site release.

## Testimonials revision — 5 October 2026

- Public Firecrawl request failed; authenticated LinkedIn profile UI successfully showed two received recommendations (not pending or given).
- Ratnavo Dutta and Ankush G names, displayed roles, working relationships, dates and short verbatim excerpts verified against the original recommendation text. No unrelated profile details or images imported.
- `testimonials` sits before Contact, uses semantic quotations/attribution and links to original recommendations and author profiles. The three-item navigation remains unchanged.
- Strict build and static-output checks pass, including author names, quotation markup, placement and source link. Desktop section visually inspected; no horizontal overflow at 320/390 pixels. Screenshot `.qa/testimonials-review.jpg` remains local.
- No new Lighthouse or Firefox/Safari audit was run for this contained section addition. Existing release limitations still apply.

## Ticker revision — 5 October 2026

- Testimonials now form a manually advanced two-item strip. Clicking the quotation or the labelled Next control cycles first → second → first; keyboard Enter on Next also works. Author/source links remain separate, and the current author/count is announced politely.
- A continuous skills tape sits above the footer, using existing résumé-derived skills. Docker, Terraform and Git retain lab labels. No new experience claims or dependencies were added.
- Browser checks confirmed running animation, pause/resume state and one visible quotation after hydration. Layout checked at 320/390 pixels with no horizontal overflow. Screenshot: `.qa/testimonial-tape.jpg`.
- Without JavaScript, both quotations and the skills remain in static HTML. CSS reduced-motion fallback presents a wrapped static skills list; actual OS preference and touch-device testing remain pending.
- Strict build, static-output and whitespace checks pass. Local Chrome Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100; no failed binary audits. Report: `.qa/ticker-lighthouse.json`.
- No public deployment or Firefox/Safari verification was performed in this revision.

## Full recommendations and opposing tapes — 5 October 2026

- Both complete recommendations now use the text pasted by the user. Original wording and typos are retained, with paragraph breaks for readability. No line clamp, scroll box or excerpt truncation is applied. The manually cycled quotation/Next control and keyboard cycle remain verified.
- Testimonials use a plum chapter surface, warm-white quotations and peach accents, retaining the editorial layout and attribution/source links.
- Skills tape A uses 15–18px text and moves left. Logos-only tape B moves right, with four employer marks and 13 recorded credential/professional-development marks. Browser checks confirmed opposite animation directions and no text items in tape B.
- Previous measured loop width was 3315.648px over 100 seconds. Both new loops target 34.814px/second (5% faster), with timing measured independently after resizing. Both report running while the tape is hovered; there is no pause/resume control or hover/focus pause rule.
- Credly badge artwork verified on the public wallet; resized locally to 240px maximum. AI-900 uses the official Microsoft Learn fundamentals mark. Dark badge lettering has light backplates. Historical expired badges are disclosed rather than represented as current.
- No horizontal overflow at 320, 390 or 1440 pixels. Screenshots: `.qa/opposing-tapes.jpg` and `.qa/full-testimonial.jpg`. Static/reduced-motion fallbacks remain implemented; actual OS reduced-motion testing is still pending.
- Build, static/private-output checks and whitespace checks pass. Local Chrome Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100, with no failed binary audits. Report: `.qa/opposing-tapes-lighthouse.json`.
- The user's explicit removal of pause/stop/hide controls for continuous motion is an acknowledged WCAG 2.2.2 limitation; a Lighthouse score of 100 does not establish complete WCAG conformance. No new dependencies, public deployment or Firefox/Safari verification.

## Badge-label revision — 5 October 2026

- Removed historical/expired wording from badge names, tooltips and accessible labels, and removed the note below the tape per user request. Credential-name labels remain; no current/renewed status claims were added. This supersedes the earlier status-disclosure presentation above.
- Browser confirmed the note is absent and labels contain credential names without historical status. Screenshot: `.qa/badges-no-status.jpg`.
- Build, static-output/private-file checks and whitespace checks pass. No changes to tape speed, motion or résumé content.

## Detail controls, symbols and ordering — 5 October 2026

- Experience and technical-capability summaries share a high-contrast indigo surface, outline, 44px minimum target and plus/minus affordance. Native disclosure keyboard behaviour remains intact.
- Security & networking uses Cisco, Check Point and ISC2 organisation marks; Professional development uses Kepner-Tregoe, Linux Academy, Linux Foundation and Wireshark organisation marks, not certification badges. Browser confirmed all seven images load. The white Kepner-Tregoe wordmark uses a dark plate; Check Point uses a light plate.
- Full recommendation text is unchanged; Ankush now appears first, Ratnavo second. Browser confirmed initial status `1 / 2 · Ankush G`.
- Skills tape now includes Copilot Studio, GitHub Copilot and AI Agents per user instruction. Measured browser timing matches 36.555px/second (+5%). Logo tape remains 34.814px/second, with requested employer → Cisco → Check Point → AZ-900/AZ-104/AZ-700/AZ-720/AI-900/AB-730/AB-731 sequence; opposite directions remain unchanged.
- Build, static-output/private-file and whitespace checks pass. No new dependencies or résumé edits. Screenshots: `.qa/detail-controls.jpg` and `.qa/credential-symbols.jpg`. No new Lighthouse or cross-browser audit was run for this revision.
- At 320px, Enter opens the experience disclosure and document width remains 320px, with no horizontal overflow.

## Static capabilities and benefits-first project copy — 5 October 2026

- Technical capabilities is an always-visible semantic section with all five category/description rows in a bordered panel. No disclosure control or collapse state remains.
- Experience summaries now use compact 36px-high outlined controls with 12px text and restrained plus/minus indicators. Enter still opens details; mobile document width stays 320px with no overflow.
- Removed the visitor-facing personal-introduction draft note. This was an editorial placeholder, not professional content.
- Tightened HCL SVG viewBox around the original wordmark path and adjusted work-entry dimensions. Desktop inspection confirms the mark is legible without distortion.
- Read the current RoadLens README from the repository's main branch. Public project copy now lists supported benefits (searching people/vehicles, local footage/session control, offline after setup and flexible installation) instead of the limitations disclosure and hackathon/MVP notice. No production, safety, accuracy or unrestricted AI-search claims were introduced.
- Build, static/private-output and whitespace checks pass. Screenshots: `.qa/static-capabilities.jpg` and `.qa/roadlens-benefits.jpg`. No new Lighthouse or cross-browser audit. User-supplied untracked `Pics/` remains untouched and excluded from this commit.

## Photography addition — 5 October 2026

- All sixteen HBK photos visually inspected and integrated with descriptive alternative text and captions. Two-sentence introduction describes the user-confirmed travel/photography interest without invented destinations or achievements.
- Small translucent HBK website overlays appear on every slide. These are presentation watermarks, not embedded in JPEG pixels; originals remain unchanged.
- Desktop gallery inspected, Enter advances the control, and Next wraps from 16 to 1. Mobile at 320px shows the image, watermark, count, control and introduction without horizontal overflow (document width 320px).
- Responsive JPEG preparation strips EXIF metadata. Build and static checks verify all sixteen photos, small variants, heading and watermark overlays. No new dependencies or automatic gallery motion. Screenshot: `.qa/photography.jpg`.
- No new Lighthouse or cross-browser audit, or public Pages deployment in this revision.

## Personal photo galleries — 5 October 2026

- Six supplied Aviation photographs and two Scuba photographs replace interim story illustrations. Flight-simulation captions distinguish those images from real-world flying.
- Desktop browser confirms Next advances Aviation through its six photos and wraps to the first. Scuba wraps after two; Enter also advances its button. Each gallery operates independently, without autoplay.
- Desktop layout visually inspected; mobile 320px layout inspected with document width exactly 320px and no horizontal overflow. Full photos remain uncropped, with counts and Next controls below. Screenshot: `.qa/story-photos.jpg`.
- Build and static-output checks pass. All eight photos/captions exist in pre-rendered HTML, with interactive controls hidden until hydration. A browser with JavaScript disabled was not separately tested.
- Sixteen responsive JPEG exports are metadata-free, verified during preparation. Original `Pics/` sources are ignored and unchanged; MOV videos and unrelated source folders are absent from deployment output.
- No new dependencies, public deployment, Lighthouse or cross-browser audit in this revision.
