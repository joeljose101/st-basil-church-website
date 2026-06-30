# Product Requirements Document (PRD)
### St. Basil Jacobite Syrian Orthodox Church — Website

> **Note on process:** This PRD was written *after* implementation, reconstructed from the
> decisions made during development. Normally a PRD precedes code. It's included here, and
> kept up to date going forward, so the project has a single source of truth for scope —
> per standard practice even on small projects.

---

## 1. Purpose

Give St. Basil Jacobite Syrian Orthodox Church (Coburg North, Melbourne) a public website
that communicates service times, parish ministries, leadership, and events, and lets
visitors find and contact the church — replacing reliance on a static PDF information
packet.

## 2. Scope

### In scope
- Single-page, scrolling marketing/information site
- Sections: Hero, Heritage/About, Worship schedule, Scripture quote, Ministries (4),
  Events + schedule tables, Gallery (filterable), Vicar's Desk + Past Vicars,
  Administration, Safeguarding statement, Acknowledgement of Country, Contact + map
- Mobile-responsive layout
- Real parish photography (not stock images) sourced from the church's own PDF
- Distinctive visual signature: curved (parabola/hyperbola/cubic) section transitions,
  scroll-triggered reveals, parallax hero

### Out of scope (for this version)
- User accounts / login
- Donation payment processing (UI placeholder only, no real payment gateway)
- Sermon video/audio archive
- Multi-language support
- CMS / non-developer content editing (content lives in a JS data file, not a database)
- Live event RSVP or ticketing

## 3. Users

| User type | Need |
|---|---|
| Prospective visitor | "When is the next service? Where is the church?" |
| Existing parishioner | Ministry info, event dates, contact for the parish office |
| Researcher / outside party | Leadership names, parish history, safeguarding policy |

## 4. Content Source

Primary content was migrated from an existing church-produced PDF (service schedule,
ministry descriptions, mission/vision statements, safeguarding policy) and an existing
HTML prototype (color palette, typography choices). This was a **migration task**, not
greenfield content creation — meaning accuracy-to-source mattered more than creative
license with the wording.

## 5. Branding

| Token | Value | Source |
|---|---|---|
| Primary color | Burgundy `#5A1827` | Existing HTML prototype |
| Accent color | Antique gold `#C5A059` | Existing HTML prototype |
| Display font | Cinzel | Existing HTML prototype |
| Body font | Lora | Existing HTML prototype |
| Signature visual motif | Parabola / hyperbola / cubic curve dividers | New, added per explicit request for a "modern, curvy" identity |

## 6. Functional Requirements

| ID | Requirement |
|---|---|
| FR-1 | Display Sunday service schedule (Evening Prayer, Holy Qurbana, Sunday School, Fellowship) |
| FR-2 | Display all 4 ministry groups (Sunday School, Vanitha Samajam, Youth Association, SOSMA) with mission/vision text |
| FR-3 | Display upcoming events as cards, plus structured schedule tables |
| FR-4 | Provide a filterable photo gallery (All / Community / Interior / Festival) |
| FR-5 | Display Vicar's bio + photo, and a list of Past Vicars |
| FR-6 | Display Administration/leadership committee |
| FR-7 | Display Safeguarding policy statement |
| FR-8 | Display Acknowledgement of Country |
| FR-9 | Provide a contact form (UI only — no backend submission wired up yet) and an embedded map of the church address |
| FR-10 | Navigation must scroll-link to each section and collapse into a mobile menu under 1024px width |

## 7. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | Site must be usable on mobile, tablet, and desktop viewports |
| NFR-2 | Animations must respect `prefers-reduced-motion` |
| NFR-3 | All images must have descriptive `alt` text |
| NFR-4 | Interactive elements must be keyboard-focusable with a visible focus indicator |
| NFR-5 | Production build must complete with zero compilation errors |
| NFR-6 | No use of unlicensed/watermarked imagery |
| NFR-7 | Real photos of identifiable people used only where the site owner is the photo's own organization (not third-party public figures) |

## 8. Acceptance Criteria

- [ ] `npm run build` completes with no errors
- [ ] All sections from Section 2 render with real (non-placeholder) content, except
      where explicitly flagged as pending (Sunday School photo, Vicar's name, phone numbers)
- [ ] Site is navigable and readable at 375px, 768px, and 1440px widths
- [ ] Lighthouse accessibility score ≥ 90 *(not yet measured — see Phase 7)*
- [ ] No console errors in the browser on page load

## 9. Known Gaps / Placeholder Content

These were explicitly deferred pending real information from the parish, not oversights:

- Vicar's actual name (currently `[Vicar Name]`)
- Past Vicars' names and years (currently `[Name]`)
- Administration committee names (currently `[Name]`)
- Phone numbers in Contact section
- Sunday School ministry photo (currently a labeled placeholder box)

## 10. Future Enhancements (Not Yet Scheduled)

- Wire the contact form to an actual email-sending backend (e.g. a serverless function
  or a form service like Formspree)
- Move content from `src/data/content.js` into a lightweight CMS if non-developers need
  to edit it directly
- Add a real donation payment flow if the parish wants online giving
- Add a sermon archive page if requested

---
*Last updated: as of this conversation. See `CHANGELOG.md` for revision history once created.*
