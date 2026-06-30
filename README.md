# St. Basil Jacobite Syrian Orthodox Church — Website

Official website for St. Basil Jacobite Syrian Orthodox Church, Coburg North,
Melbourne. Built with Next.js (App Router) and Tailwind CSS.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **UI library:** React 18
- **Styling:** Tailwind CSS
- **Fonts:** Cinzel (display) and Lora (body), loaded via `next/font/google`
- **Images:** `next/image` for automatic optimization, served from `/public/images`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command         | Description                              |
| ---------------- | ----------------------------------------- |
| `npm run dev`     | Start the local development server        |
| `npm run build`   | Create an optimized production build      |
| `npm run start`   | Run the production build locally          |
| `npm run lint`    | Run ESLint                                |

## Project structure

```
st-basil-church-website/
├── public/
│   ├── images/              Real parish photography (church, vicar, crest, events)
│   └── icons/                Reserved for favicon / social-share icons
├── src/
│   ├── app/
│   │   ├── layout.jsx        Root layout: fonts, metadata, global CSS import
│   │   └── page.jsx          Home page: assembles all sections + curve dividers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.jsx       Sticky navigation with mobile menu
│   │   │   └── Footer.jsx
│   │   ├── sections/         One component per page section
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Worship.jsx
│   │   │   ├── QuoteBlock.jsx
│   │   │   ├── Ministries.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── VicarDesk.jsx
│   │   │   ├── Administration.jsx
│   │   │   ├── Safeguarding.jsx   (exports Safeguarding + AcknowledgementOfCountry)
│   │   │   └── Contact.jsx
│   │   └── ui/                Small reusable building blocks
│   │       ├── CurveDivider.jsx   Signature parabola/hyperbola/cubic section transitions
│   │       ├── Reveal.jsx         Scroll-triggered fade/lift wrapper
│   │       └── Typography.jsx     SectionLabel + SectionHeading
│   ├── data/
│   │   └── content.js        All site copy and structured content in one place
│   ├── lib/
│   │   ├── curves.js          Pure curve-path math (parabola / hyperbola / cubic)
│   │   ├── useScrollY.js      Scroll-position hook (drives parallax + curve morphing)
│   │   └── useReveal.js       IntersectionObserver hook (drives scroll reveals)
│   └── styles/
│       └── globals.css        Tailwind directives + reveal/zoom utility classes
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json              Enables the `@/` import alias for src/
├── package.json
└── .eslintrc.json
```

### Why this structure

- **`components/sections`** holds one file per visual section of the page, in the
  order they appear. Each is a self-contained, independently readable unit.
- **`components/ui`** holds generic building blocks with no church-specific
  content — these could be reused on a different site.
- **`components/layout`** holds chrome that wraps every page (nav, footer).
- **`data/content.js`** centralizes all editable copy (service times, ministry
  descriptions, event listings, administration names) so non-developers can
  update the site's content without touching component code or JSX.
- **`lib/`** holds framework-agnostic logic (the curve math, the scroll hooks)
  separated from the components that consume it, so it can be unit-tested or
  reused independently.

## Content you still need to fill in

Several fields are placeholders pending information from the parish:

- Vicar's name and biography (`src/data/content.js` → not yet present, edit
  `VicarDesk.jsx` directly, or extend `content.js` with a `vicar` object)
- Past Vicars list (`pastVicars` in `src/data/content.js`)
- Administration committee names (`administration` in `src/data/content.js`)
- Phone numbers in the Contact section (`src/components/sections/Contact.jsx`)
- A real photo for the Sunday School ministry card (currently shows a
  "Photo coming soon" placeholder — see `ministries[0].isPlaceholder` in
  `src/data/content.js`)

## Dependency notes

This project pins **Next.js 14.2.35** (the latest patch on the 14.x line) and
React 18. `npm audit` will still show a handful of advisories that are only
resolved by upgrading to **Next.js 16**, which is a major version with
breaking changes to caching and routing internals. That upgrade was
deliberately left out of this build so the App Router structure and curve/
parallax behavior here remain on a version that's actually been built and
tested against. If you want to track Next 16, run `npm audit fix --force`
in a separate branch and re-test the scroll/parallax behavior afterward.

## Deployment

This is a standard Next.js app and deploys cleanly to any platform that
supports Node.js or the Next.js runtime, including:

- **Vercel** (zero-config — connect the repo and deploy)
- **Netlify** (via the official Next.js runtime plugin)
- **Any Node host / VPS / Docker** — run `npm run build` then `npm run start`

No environment variables are required for the current feature set. If you add
a backend for the contact form (e.g. an email API), document the required
keys in a `.env.local` file and add a `.env.example` alongside it.

## Accessibility and performance notes

- All images include descriptive `alt` text.
- Interactive elements (nav links, filter buttons, form fields) are keyboard
  focusable with a visible focus ring (see `globals.css`).
- `prefers-reduced-motion` is respected globally — animations and transitions
  collapse to near-zero duration for users who request reduced motion.
- Images are served through `next/image`, which handles responsive sizing,
  lazy loading, and modern formats (AVIF/WebP) automatically.
