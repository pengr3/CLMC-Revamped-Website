---
phase: 03-home-page
plan: "03"
subsystem: ui
tags: [next.js, react, css-animation, marquee, tailwind, gsap, server-component]

# Dependency graph
requires:
  - phase: 03-home-page/03-01
    provides: HeroSection, FeaturedProjectsSection, buttonVariants helper
  - phase: 03-home-page/03-02
    provides: ServicesSection, StatsSection

provides:
  - CSS-only marquee animation (@keyframes marquee + @utility animate-marquee) in globals.css
  - ClientLogosSection — Server Component with 8-placeholder auto-scrolling logo strip
  - InquiryCTASection — Server Component full-width CTA banner linking to /contact
  - app/page.tsx — assembled home page orchestrator importing all 6 sections in D-29 order

affects: [04-projects-page, 05-inner-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CSS-only infinite marquee: duplicate array trick ([...logos, ...logos]) + translateX(-50%) + w-max on track
    - @utility directive in Tailwind v4 for custom animation utility class
    - Server Component orchestrator pattern: app/page.tsx imports client-boundary sections without becoming a client component itself

key-files:
  created:
    - components/sections/ClientLogosSection.tsx
    - components/sections/InquiryCTASection.tsx
  modified:
    - app/globals.css
    - app/page.tsx

key-decisions:
  - "CSS-only marquee with @keyframes + @utility animate-marquee — no JS, no external library"
  - "ClientLogosSection is a Server Component — CSS animation eliminates any need for useClient"
  - "8 placeholder logo slots (Array.from length 8) — user provides real logos later"
  - "Fade gradient edges (bg-gradient-to-r/l from-surface-primary) for polished infinite-scroll feel"
  - "InquiryCTASection uses buttonVariants helper on Link — avoids interactive element nesting"
  - "app/page.tsx stays Server Component — each section manages its own client boundary"
  - "D-29 section order: Hero > Featured Projects > Services > Stats > Client Logos > Inquiry CTA"

patterns-established:
  - "CSS marquee pattern: w-max flex container, duplicate items, translateX(-50%) keyframe — reusable for any scrolling strip"
  - "@utility in globals.css for custom Tailwind v4 animation utilities"

requirements-completed: [HOME-06, HOME-07]

# Metrics
duration: 5min
completed: 2026-03-28
---

# Phase 03 Plan 03: Client Logos Marquee, Inquiry CTA, and Home Page Assembly Summary

**CSS-only auto-scrolling client logos marquee and inquiry CTA section assembled into the complete 6-section CLMC home page with Next.js build passing.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-28
- **Completed:** 2026-03-28
- **Tasks:** 2 (1 auto + 1 checkpoint)
- **Files modified:** 4

## Accomplishments

- Built ClientLogosSection as a Server Component with a CSS-only infinite marquee (no JavaScript, no external library) — 8 placeholder logo slots, fade edges on both sides
- Built InquiryCTASection as a Server Component with "Ready to Build?" headline, supporting copy, and "Request for Inspection" button linking to /contact
- Assembled app/page.tsx as a Server Component orchestrator sequencing all 6 sections in D-29 order (Hero, Featured Projects, Services, Stats, Client Logos, Inquiry CTA)
- Added @keyframes marquee and @utility animate-marquee to globals.css with prefers-reduced-motion coverage

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ClientLogosSection, InquiryCTASection, marquee CSS, and assemble page.tsx** - `4904086` (feat)
2. **Task 2: Visual verification of complete home page** - checkpoint approved by user (no code changes)

## Files Created/Modified

- `components/sections/ClientLogosSection.tsx` - Server Component with CSS-only infinite marquee of 8 placeholder logos
- `components/sections/InquiryCTASection.tsx` - Server Component full-width CTA banner with headline and /contact link
- `app/globals.css` - Added @keyframes marquee, @utility animate-marquee, and reduced-motion override
- `app/page.tsx` - Home page orchestrator importing all 6 sections in D-29 order

## Decisions Made

- CSS-only marquee approach: `@keyframes marquee` (translateX 0 to -50%) + `w-max` on flex track + duplicated array for seamless loop. No JS needed, Server Component compatible, reduced-motion safe.
- `@utility animate-marquee` directive used (Tailwind v4 CSS-first pattern) rather than `theme()` extension.
- Server Component for both new sections: CSS animation and static content require zero client JavaScript.
- `buttonVariants` helper used on `<Link>` in InquiryCTASection (established pattern from Plan 01).

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None — `npm run build` passed on first run with all 9 static pages generated successfully.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Complete CLMC home page is ready: all 6 sections render in correct D-29 order, animations functional, CSS marquee scrolls continuously, CTA links to /contact
- Phase 04 (projects page) can begin immediately — home page FeaturedProjectsSection "View All" link targets /projects which is next
- Client logos: 8 placeholder slots await real CLMC client logo assets

---
*Phase: 03-home-page*
*Completed: 2026-03-28*
