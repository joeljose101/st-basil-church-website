# UI/UX Documentation
### St. Basil Jacobite Syrian Orthodox Church — Website

---

## 1. Color Palette

| Token | Hex | Used for |
|---|---|---|
| Burgundy | `#5A1827` | Primary brand color, section backgrounds (Contact) |
| Burgundy Dark | `#3A0D18` | Hero/Worship section backgrounds, nav background |
| Burgundy Darkest | `#1A0A0F` | Deepest background layer (Quote section) |
| Gold | `#C5A059` | Accent — links, borders, active states, icons |
| Gold Light | `#E8C782` | Hover states on gold elements |
| Alabaster | `#FAFAFA` | Light section backgrounds (About, Ministries) |
| Pearl | `#F3F1ED` | Light text on dark backgrounds, light section backgrounds (Events) |
| Sand | `#E6E0D4` | Borders on light backgrounds |
| Charcoal | `#2D2825` | Body text on light backgrounds |
| Muted | `#7A726A` | Secondary/supporting text |

**Verified contrast pairs** (see audit findings below for the one pair that failed and
was corrected):

| Foreground | Background | Ratio | WCAG AA (4.5:1 normal text)? |
|---|---|---|---|
| Pearl text | Burgundy Dark (nav, scrolled) | 11.08:1 | Pass |
| Pearl text | Burgundy Dark (nav, at rest, **corrected** opacity) | 7.57:1 | Pass |
| Pearl text | Burgundy Dark (nav, at rest, **original** opacity) | 3.73:1 | **Fail — fixed in Phase 4** |
| Charcoal text | Alabaster | Not yet measured | Pending — see Phase 7 |
| Gold text | Burgundy | Not yet measured | Pending — see Phase 7 |

This table is intentionally incomplete. Only the pair that was actually suspected of
failing (nav text, since it sits over a photo) was measured precisely in Phase 4. The
remaining pairs are flagged as pending rather than assumed-fine, and will be measured
properly in Phase 7 (Testing) using the same method (relative luminance calculation,
not visual inspection).

## 2. Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | Cinzel | Weights used: 400, 600, 700 |
| Body text | Lora | Weights used: 400, 500, 600 (see Architecture Decisions — weight 300 was originally requested and doesn't exist in this font, corrected during initial build) |

**Why serif-on-serif, rather than the more common serif-heading/sans-body pairing:**
Cinzel's letterforms are based on Roman capital inscriptions — it reads as ceremonial
and carved rather than soft, which suits an Orthodox church's visual register. Lora was
chosen as the body font specifically because it has genuine italic forms (not a faked
slant), which the project uses for scripture quotes (`QuoteBlock.jsx`) where an
authentic italic matters for readability over a long quoted passage.

## 3. Layout Approach

Single-page, vertically scrolling layout. This was the right call for a church site of
this content size (10 distinct sections) — multi-page navigation would force a visitor
to make a choice ("which page has service times?") before they have enough information
to choose correctly. A single scroll lets every visitor encounter the same content in
the same order, with anchor-link navigation for those who know what they want.

**Mobile-first verification status:** the codebase uses Tailwind's mobile-first
breakpoint convention throughout (unprefixed classes apply to all sizes, `lg:` prefixes
override for desktop) — this is verified by inspection of the source, but the *actual
rendered behavior* at 375px/768px/1440px has not yet been tested in a real or emulated
viewport. That verification belongs to Phase 7 and is logged there, not assumed here.

## 4. Phase 4 Audit Findings

This audit found three real defects, not zero — a UI/UX review that finds nothing wrong
is more often a sign the review wasn't rigorous than a sign the UI is perfect.

### Found and fixed

**4.1 — Nav contrast failure at rest.** The unscrolled nav background was
`bg-burgundy-dark` at 55% opacity, sitting over the hero photograph. Measured contrast
for the nav link text against this background, in the worst case where a bright section
of the hero photo (`cathedral-light.jpg`) sits directly behind it: **3.73:1** — below
the WCAG AA minimum of 4.5:1 for normal-size text. Corrected to 80% opacity at rest;
re-measured at **7.57:1**, which clears both AA and AAA thresholds.

**4.2 — Mobile menu missing keyboard dismissal.** The hamburger menu could be opened
but had no Escape-key handler to close it, and the toggle button's `aria-label` always
read "Toggle menu" regardless of state, and had no `aria-controls` linking it to the
menu it controls. Added an Escape listener (active only while the menu is open, removed
on close, to avoid an unnecessary global listener) and `aria-controls="mobile-menu"`
pointing to the menu's new `id`. The toggle label now reads "Open menu" / "Close menu"
to match actual state.

**4.3 — Gallery filter state conveyed by color only.** The active filter button was
visually distinguished by a gold fill, but had no `aria-pressed` attribute, so screen
reader users had no way to know which filter was currently selected. Added
`aria-pressed={filter === f}` to each button, wrapped the button group in
`role="group"` with a descriptive label, and added a visually-hidden (`sr-only`)
`aria-live="polite"` region that announces the result count whenever the filter changes
— since the visual update (the grid re-rendering) is otherwise silent to a screen
reader.

**4.4 — Contact form fields with no associated labels.** All three fields (name, email,
message) relied on `placeholder` text alone. This fails for two concrete reasons:
placeholder text vanishes once a field has content, so a person who pauses mid-form and
returns later loses the field's purpose; and placeholder text is not a reliable label
substitute across all screen readers. Added a proper `<label>` for each field, visually
hidden via `sr-only` to preserve the minimal placeholder-driven visual design, but
present and correctly associated (`htmlFor`/`id`) in the markup.

### Checked and passed (no fix needed)

**4.5 — Asymmetric curve-rounded corners (`rounded-curve-tl`/`tr`) clipping content.**
Verified the actual radius value (`60px`) against the padding used on every card that
applies this class (`px-8 py-10`, `p-9`, etc.) — clearance is sufficient that body text
at the sizes used in this project does not visually clip into the curve. No change made.

---
*Last updated: as of this conversation, Phase 4 audit.*
