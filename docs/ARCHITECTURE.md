# Architecture Decisions
### St. Basil Jacobite Syrian Orthodox Church — Website

---

## 1. Framework: Next.js (App Router) over Vite

**Decision:** Next.js 14, App Router convention (`src/app/`).

**Why this matters to explain:** the original project brief this team uses by default
specifies Vite + TypeScript. We deviated from that. Per the brief's own rule
("if another technology is better, explain why before using it"), here's the comparison
that justifies it:

| | Vite + React Router | Next.js (App Router) |
|---|---|---|
| **Routing** | Manual, via React Router | File-system based, built in |
| **SEO** | Client-rendered by default; needs extra config for pre-rendering | Static pre-rendering by default — pages ship as real HTML |
| **Image optimization** | Manual (you write your own `<img>` logic) | Built in via `next/image` (responsive sizing, lazy loading, modern formats) |
| **Font loading** | Manual `@import` or `<link>` tags | Built in via `next/font/google` (self-hosts fonts at build time, no layout shift) |
| **Learning curve** | Slightly simpler mental model | One more concept (server vs. client components) |
| **Scalability** | Fine for a single page; would need more setup for SEO at scale | Scales to multi-page, blog, CMS-backed content without re-architecting |

**Recommendation for this project specifically:** Next.js. A church website's main
practical goal is being *found* — someone searches "St Basil Orthodox church Melbourne
service times" and the page needs to be indexable, fast, and pre-rendered. That's
Next.js's default behavior, not something to bolt on later. Vite would have been the
right call if this were going to stay a pure single-page app with no SEO requirement —
but Phase 9 of this project explicitly includes SEO work, which is much easier to do
well in Next.js from day one than to retrofit into a Vite SPA later.

**Trade-off accepted:** App Router's server/client component split is a genuinely new
concept if you're coming from plain React. Every component that uses `useState`,
`useEffect`, or any browser API (`window.scrollY`, `IntersectionObserver`) needs an
explicit `'use client'` directive at the top of the file, or Next.js will try to render
it on the server and fail. This project has 8 files with that directive — see Section 4.

---

## 2. Language: JavaScript over TypeScript

**Decision:** Plain JavaScript (`.jsx`), not TypeScript (`.tsx`).

**Why:** this was an explicit choice you made, deviating from the brief's TypeScript
default. Documenting the trade-off honestly:

| | JavaScript | TypeScript |
|---|---|---|
| **Setup speed** | Faster, no type definitions to write | Slower, needs types for all props/data |
| **Catches bugs** | Only at runtime (e.g. clicking the gallery filter and seeing nothing happen) | At write-time (e.g. immediately flagged if `content.js`'s `ministries` array was missing a required field) |
| **Beginner friendliness** | Easier to read with no Java/React background | More familiar if your prior experience is Java, since Java is statically typed |
| **Maintenance at scale** | Harder to refactor safely as the project grows | Refactoring is safer — the compiler tells you everywhere a change breaks something |

**Honest assessment for this project:** Given your stated Java background, TypeScript
would likely have been *more* comfortable, not less — Java's static typing is closer to
TypeScript's mental model than to plain JavaScript's. The current codebase works and
builds cleanly, but if this project grows (more content types, a CMS integration, more
contributors), migrating to TypeScript later is a real cost, not a free option — every
`.jsx` file would need conversion. This is logged here as a deliberate trade-off, not
a silent gap.

---

## 3. Folder Structure

```
src/
├── app/                 Next.js App Router pages (file-system routing)
├── components/
│   ├── layout/           Persistent chrome: Nav, Footer
│   ├── sections/          One component per visual page section
│   └── ui/                 Generic, content-free building blocks
├── data/                 Centralized content (copy, not code)
├── lib/                  Framework-agnostic logic (hooks, pure functions)
└── styles/               Global CSS
```

**Why `sections` / `ui` / `layout` are separated, not all dumped in one `components/`
folder:** each folder answers a different question.
- `layout/` — "does this wrap every page?" (yes → here)
- `sections/` — "is this one specific, named part of the homepage?" (yes → here)
- `ui/` — "could this be reused on a totally different project with different content?"
  (yes → here)

This separation is what makes `CurveDivider.jsx` trustworthy as a generic component —
it has zero church-specific text or data, so it could be copy-pasted into an unrelated
project unchanged. If it lived in `sections/` next to `About.jsx`, that wouldn't be
obvious.

**Why `data/content.js` is separate from the components that render it:** this is the
single most consequential structural decision in the project, so it gets its own
section below.

---

## 4. Client vs. Server Components (Next.js App Router specifics)

In the App Router, every component is a **server component by default** — it renders
to HTML on the server (or at build time) and ships zero JavaScript to the browser for
that component. This is good for performance, but it means a server component
**cannot** use `useState`, `useEffect`, `onClick` handlers, or any browser-only API.

Files in this project that need `'use client'` at the top, and why:

| File | Why it needs the browser |
|---|---|
| `app/page.jsx` | Calls `useScrollY()` for parallax |
| `lib/useScrollY.js` | Reads `window.scrollY` |
| `lib/useReveal.js` | Uses `IntersectionObserver` |
| `components/ui/Reveal.jsx` | Calls `useReveal()` |
| `components/ui/CurveDivider.jsx` | Reads `getBoundingClientRect()`, uses `useState`/`useEffect` |
| `components/layout/Nav.jsx` | Mobile menu `useState`, scroll listener |
| `components/sections/Hero.jsx` | Receives live `scrollY` prop, computes parallax inline |
| `components/sections/Gallery.jsx` | Filter button `useState` |

Every other component (`About.jsx`, `Worship.jsx`, `Ministries.jsx`, etc.) is a plain
server component — it just receives data from `content.js` and renders static markup.
This matters for performance: those components ship **no JavaScript bundle** to the
browser at all, only HTML and CSS.

**Common mistake this structure avoids:** marking the *entire app* `'use client'` (e.g.
putting it at the top of `layout.jsx`) "just to be safe." That would silently turn every
single component into client-rendered JavaScript, defeating the performance benefit
Next.js exists to provide. The discipline here is pushing `'use client'` as far down the
tree as possible — only the 8 files above actually need it.

---

## 5. Content/Data Separation (`src/data/content.js`)

**Decision:** All editable copy — service times, ministry descriptions, event listings,
committee names — lives in one plain JavaScript file of arrays and objects, imported by
the components that render it.

**Why this is a SOLID-adjacent decision, even in a framework not built around classes:**
this follows the **Single Responsibility Principle** in spirit — a component's job is
*how to display something*, not *what the something is*. `Ministries.jsx` doesn't know
or care what the four ministries are called; it just maps over whatever array
`content.js` gives it. If a fifth ministry gets added next year, that's a one-line
addition to an array, not a new JSX block hand-written into a component.

**Concrete trade-off, demonstrated by the one bug this audit caught in Phase 3:** the
`Safeguarding.jsx` file originally held two unrelated components
(`Safeguarding` + `AcknowledgementOfCountry`) because they were both short, content-only
sections written in the same pass. This was a real architectural inconsistency — every
other section follows one-component-per-file, and this one quietly didn't. It's been
split into `Safeguarding.jsx` and `AcknowledgementOfCountry.jsx` as part of this
review (see CHANGELOG.md). This is exactly the kind of small inconsistency a structured
architecture phase is meant to catch before it sets a bad precedent for future additions.

**Simple vs. advanced approach, as the brief asks for explicitly:**

| | Simple (current) | Advanced |
|---|---|---|
| **Approach** | Plain JS file, edited directly in code | Headless CMS (Sanity, Contentful) with an admin UI |
| **Who can edit content** | Only someone comfortable editing code and redeploying | Non-technical parish staff, via a web form |
| **Setup cost** | Zero — already done | Requires CMS account, schema design, API integration |
| **Ongoing cost** | A developer is needed for every content change | None, after initial setup |

**Recommendation:** the simple approach is correct *for now*. The parish doesn't yet
have a clear "who updates this site, how often" answer — building a CMS integration
before that's known would be solving a problem that may not exist. This is flagged in
the PRD's "Future Enhancements" section as something to revisit if a non-developer
needs to start editing content regularly.

---

## 6. The Curve/Parallax System (`lib/curves.js`, `ui/CurveDivider.jsx`)

This is the project's one genuinely custom piece of engineering, so it's worth
explaining as a system rather than just a file list.

- **`lib/curves.js`** is a pure function: given a width, height, depth, and curve type,
  it returns an SVG path string. It has no React in it at all — it could be unit-tested
  with plain `assert` calls and no testing-library setup, because it's just math in,
  string out. This is deliberate: keeping the math pure and separate from the component
  that renders it means the math can be verified independently of whether React is
  rendering it correctly.
- **`ui/CurveDivider.jsx`** is the React wrapper: it measures its own position in the
  viewport on scroll, feeds that into the pure function, and renders the resulting SVG.

**Why this split matters as an architectural pattern, not just a style choice:** if a
future contributor wants to add a fourth curve type, they edit one `switch` statement in
one pure function — they don't need to understand React, hooks, or how scroll-tracking
works at all. That's the value of separating "the math" from "the rendering."

---
*Last updated: as of this conversation, including the Safeguarding/AcknowledgementOfCountry split.*
