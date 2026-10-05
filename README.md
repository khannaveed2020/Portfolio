# Naveed Khan portfolio

Personal portfolio built with Vite, React, strict TypeScript, Tailwind CSS and Motion. The initial design uses a temporary character and photo placeholders. Professional content is derived from the public résumé.

## Local development

Use Node 24 and npm. Run `npm ci`, then `npm run dev`. Open the printed URL with `/portfolio/` appended.

Run `npm run build` and `npm run check` before reviewing the production output with `npm run preview`.

The build renders the React page to static HTML before hydration. Content, navigation, résumé links and native expandable details remain usable without JavaScript.

## GitHub Pages

Repository name: `portfolio`. Default branch: `main`. In repository Settings → Pages, select GitHub Actions as the source. The included workflow builds, verifies and deploys `dist/` on pushes to main or manual dispatch. Vite is configured for `/portfolio/`.

No GitHub remote or repository is created automatically. Connect the intended GitHub repository before pushing. A live deployment must be verified after the workflow completes.

## Content and assets

- Professional facts: `src/content.ts`, derived from `public/Naveed_Khan_Resume.pdf`.
- Personal copy: provisional; review before launch.
- Portrait: SVG placeholder, not an accurate likeness. Replace only after photo-based concept approval.
- Flying and scuba pictures: labelled layout placeholders pending user assets.
- Editable résumé source: `assets/source-documents/`, ignored by Git and excluded from `dist/`.
- Typography: locally available Avenir Next/Avenir with Segoe UI and system fallbacks; no remote font requests.

Desktop fine pointers enable facial tracking and a quiet corner companion after scrolling. Touch and reduced-motion users retain a static portrait. Native scrolling and details are used throughout.

See `portfolio_plan.md` for approved decisions and `VERIFICATION.md` for checks performed and launch tasks.
