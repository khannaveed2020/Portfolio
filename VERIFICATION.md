# Initial portfolio verification

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

- Review provisional personal introduction and photo placeholders; supply and approve portrait and personal imagery.
- Verify Firefox and Safari directly. The available in-app browser and Chrome Lighthouse run do not establish full cross-browser compatibility.
- Exercise actual touch and reduced-motion preferences, plus browser back-button behavior across anchors.
- Connect an accessible GitHub repository named `portfolio`. The local checkout has no remote; connector lookup of `khannaveed2020/portfolio` returned 404, which may indicate absence or lack of access.
- Select GitHub Actions in repository Pages settings, push the committed code, observe the deployment workflow and verify the live `/portfolio/` page and résumé URL.

No public deployment was made during this implementation.
