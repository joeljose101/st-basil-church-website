# Changelog
### St. Basil Jacobite Syrian Orthodox Church — Website

Format: newest entries first. Each entry notes *why*, not just *what*, where the reason
isn't obvious from the change itself.

---

## Phase 5 — Development / Code Quality Audit

### Fixed
- **`lib/curves.js`: the `'cubic'` curve formula cancelled its own asymmetry.** The
  original formula multiplied `Math.tanh(3 * t)` (already an odd/antisymmetric
  function) by an extra `(t < 0 ? -1 : 1)` sign-flip term, which forced the output back
  into symmetry — producing a curve nearly indistinguishable from `'parabola'`, despite
  a comment claiming it produced "an asymmetric organic feel." Verified numerically
  before and after: original formula gave `y(-0.5) = y(+0.5) = 65.37` (symmetric,
  contradicting its own comment); corrected formula gives `y(-0.5) = 4.27` vs.
  `y(+0.5) = 85.73` (genuinely asymmetric). This affects 2 of the 7 dividers on the live
  page that use `kind="cubic"`.
- **`ui/CurveDivider.jsx`: removed per-scroll-frame layout reflows.** The component
  called `getBoundingClientRect()` (which forces a synchronous browser layout
  recalculation) inside an effect keyed to `scrollY`, meaning it re-measured the DOM on
  every animation-frame-throttled scroll tick. With 7 instances on the page, this meant
  7 forced reflows per frame while scrolling — a real cost on lower-end devices.
  Replaced with a one-time measurement on mount/resize, then pure arithmetic
  (`documentTop - scrollY`) on every scroll tick, since the element's distance from the
  top of the document doesn't change as the page scrolls — only its position relative
  to the viewport does, which is recoverable without touching the DOM. Verified the
  refactor is behavior-identical (not just plausible) by simulating both approaches
  across six scroll positions and confirming exact numeric agreement at every point.

### Verified, no change needed
- `lib/useScrollY.js` and `lib/useReveal.js`: reviewed for stale closures, missing
  cleanup functions, and dependency array correctness. Both are correct as written.
- Ran a full `npm run lint` (not just Next's build-time linting subset) — zero warnings,
  zero errors.

### Deferred (logged, not forgotten)
- This audit found a real numerical bug (`curves.js`) that a unit test would have
  caught immediately, and that was instead found by manual numerical verification.
  `curves.js` is pure logic with zero React dependency — a strong candidate for actual
  automated tests. No test framework (Jest/Vitest) is installed yet. Introducing one
  belongs to Phase 7 (Testing) per the project roadmap, not bolted on mid-Phase-5;
  noted here so it isn't lost before that phase begins.

### Verification
- Re-ran a full `next build` after both fixes — clean compile, bundle size unchanged
  at 14 kB (expected, since this was a logic correction and a performance refactor,
  not new code volume).

---

## Phase 4 — UI/UX Audit

### Fixed
- **Nav contrast failure at rest.** Measured (not estimated) contrast of nav link text
  against the unscrolled nav background, accounting for the worst-case bright section
  of the hero photo behind it: 3.73:1, below WCAG AA's 4.5:1 minimum. Raised background
  opacity from 55% to 80%; re-measured at 7.57:1. See `docs/UI-UX.md` for the full
  calculation.
- **Mobile menu had no Escape-to-close.** Added a keydown listener (scoped to only run
  while the menu is open) and linked the toggle button to the menu via `aria-controls`.
  Toggle button label now reflects actual state ("Open menu" / "Close menu") instead of
  a static "Toggle menu".
- **Gallery filter active state was color-only.** Added `aria-pressed` to filter
  buttons, a `role="group"` wrapper, and a visually-hidden `aria-live` region that
  announces the filtered photo count to screen reader users.
- **Contact form fields had no associated labels.** Added a `<label>` per field
  (visually hidden via `sr-only`, preserving the placeholder-driven visual design) with
  proper `htmlFor`/`id` association.
- Removed an unused `siteConfig` import from `Nav.jsx`, found incidentally during the
  contrast fix.

### Verified, no change needed
- Asymmetric curve-rounded card corners (`60px` radius) checked against actual padding
  values used across cards — sufficient clearance confirmed, no text-clipping risk.

### Verification
- Re-ran a full `next build` after all Phase 4 changes — confirmed clean compile,
  bundle size moved from 13.8 kB to 14 kB, consistent with the added `aria-*`
  attributes and label elements (not a regression).

---

## Phase 3 — Architecture Review

### Fixed
- **Split `Safeguarding.jsx` into two files.** It previously exported both `Safeguarding`
  and `AcknowledgementOfCountry` as named exports from one file — an inconsistency with
  every other section in the project, which follows one-component-per-file as a default
  export. Created `AcknowledgementOfCountry.jsx` as its own file; `Safeguarding.jsx` now
  exports only `Safeguarding`, as a default export.
- Updated the corresponding import in `src/app/page.jsx` from a single named-import
  statement to two default-import statements.
- Verified with a full `next build` after the change — confirmed identical bundle size
  (13.8 kB for the `/` route), meaning this was a pure organizational change with zero
  behavior impact.

### Earlier (pre-Phase-3, carried over from original build)
- Bumped Next.js from `14.2.5` to `14.2.35` after `npm install` flagged a known critical
  vulnerability in the originally pinned version.
- Fixed an invalid Lora font weight (`300` was requested; Lora only ships
  `400/500/600/700`). Corrected to `400/500/600` and replaced all `font-light` Tailwind
  classes with `font-normal` across 8 section components so rendered text matches an
  actual font weight rather than a browser-synthesized fake-light style.
- Bumped the top-level `postcss` devDependency to a patched version (the remaining
  audit advisories live inside Next.js's own bundled dependencies and only resolve via
  a Next.js 16 major upgrade, which was deliberately deferred — see ARCHITECTURE.md
  and README.md for the reasoning).

---

## Project Inception

- Migrated content from a parish-provided PDF and an existing HTML/Tailwind prototype
  into a Next.js App Router project.
- Extracted and re-encoded real parish photography from the source PDF (cathedral
  interior shots, vicar portrait, parish crest with transparency, community photos,
  Onam celebration photo) — excluded one watermarked Adobe Stock image and two
  devotional illustrations of uncertain license found in the same source material.
- Redesigned section transitions from straight edges to mathematically-generated
  parabola/hyperbola/cubic curves, with scroll-driven depth morphing and hero parallax,
  per explicit request for a more distinctive, "modern, curvy" visual identity.
