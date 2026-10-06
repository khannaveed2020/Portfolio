# Naveed Khan portfolio

Personal portfolio built with Vite, React, strict TypeScript, Tailwind CSS and Motion, with a GSAP cat mascot. Professional content is derived from the public résumé; personal galleries use approved optimised derivatives.

## Local development

Use Node 24 and npm. Run `npm ci`, then `npm run dev`. Open the printed URL with `/Portfolio/` appended.

Run `npm run build` and `npm run check` before reviewing the production output with `npm run preview`.

The build renders the React page to static HTML before hydration. Content, navigation, résumé links and native expandable details remain usable without JavaScript.

## GitHub Pages

Repository: `khannaveed2020/Portfolio`. Default branch: `main`. Pushes run build verification. When ready to publish, select GitHub Actions as the Pages source and run the workflow manually; manual dispatch builds, verifies and deploys `dist/`. Vite is configured for `/Portfolio/` (case-sensitive).

A live deployment must be verified after the workflow completes; a successful push alone does not confirm hosting.

## Content and assets

- Professional facts: `src/content.ts`, derived from `public/Naveed_Khan_Resume.pdf`.
- RoadLens project facts: inspected public README and implementation in `khannaveed2020/intelligent-car-dashcam`; hackathon prototype, not production. No repository licence was declared at review time.
- Brand asset provenance: `ASSET_SOURCES.md`.
- Testimonials: short unchanged excerpts from received LinkedIn recommendations, verified 5 October 2026, with attribution and source links. Viewing originals may require LinkedIn sign-in.
- Personal copy: provisional; review before launch.
- Portrait: approved photo-derived anime WebP, with separately animated SVG eyes.
- Aviation, scuba and photography: approved responsive JPEG derivatives; original photographs remain private in ignored `Pics/`; unused MOV/MP4 files were deleted.
- Editable résumé source: `assets/source-documents/`, ignored by Git and excluded from `dist/`.
- Typography: locally available Avenir Next/Avenir with Segoe UI and system fallbacks; no remote font requests.

Desktop fine pointers enable portrait tracking; the portrait remains in its hero. The cat mascot loads in a separate chunk after hydration, walks in the header and docks after scrolling; reduced motion uses a static pose. Idle eye tracking stops when settled. Native scrolling and details are used throughout. The skills and logo lists move continuously, with static reduced-motion and no-JavaScript fallbacks.

Images disable native dragging in static HTML. React cancels context menus and drag events targeted at images/SVG artwork after hydration; other text and link targets retain normal behaviour. WebKit touch-callout suppression is a browser-specific extra deterrent. This does not prevent direct downloads, screenshots or copying from the public GitHub repository. Without JavaScript, context-menu blocking is unavailable.

`npm run check` verifies deployment exclusions, rejects tracked agent instructions/videos and checks JPEG/PNG/WebP metadata, including the PNG embedded in the Mphasis SVG. It checks valid generated assets, not arbitrary hostile image formats. The public résumé is intentionally downloadable and unchanged. Local agent guidance remains ignored and must not be committed. HBK is embedded in all 48 Aviation, Scuba and Photography JPEG variants; logos, badges, portrait and project preview are unchanged. The checker verifies hashes of the stamped exports. The local photo exporter requires Pillow and a TrueType font (override its macOS default with `HBK_FONT`).

To publish: open repository Settings → Pages, select GitHub Actions as the source, then open Actions → Deploy portfolio to GitHub Pages → Run workflow on `main`. Verify the deployment URL, `/Portfolio/` assets and résumé after success. Pushing alone does not publish. See [GitHub's workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

See `portfolio_plan.md` for approved decisions and `VERIFICATION.md` for checks performed and launch tasks.
