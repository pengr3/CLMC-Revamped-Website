---
phase: 04-projects-gallery
plan: 02
subsystem: ui
tags: [next.js, react, typescript, tailwind, gsap, next-image, static-generation]

# Dependency graph
requires:
  - phase: 04-projects-gallery/04-01
    provides: ProjectCard component, data/projects.ts with 10 projects and BLUR_DATA_URL, ProjectsGallery with masonry layout and filter pills
provides:
  - Per-project detail page at /projects/[slug] with cinematic 60vh hero, metadata sidebar, and additional images grid
  - generateStaticParams pre-rendering all 10 project slugs at build time
  - Upgraded ProjectCard using Next.js Link for client-side navigation (no full-page reloads)
  - Complete gallery-to-detail-to-back-to-gallery navigation flow
affects:
  - 05-about
  - 06-contact
  - any phase referencing project pages

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component detail page pattern with async params (Promise<{ slug: string }>) — required for Next.js 15+ App Router
    - generateStaticParams + dynamicParams = false for fully static project routes
    - lg:sticky lg:top-[96px] sidebar pattern for content pages
    - Responsive sidebar: lg:grid-cols-[1fr_320px] collapses to single column on mobile

key-files:
  created:
    - app/projects/[slug]/page.tsx
  modified:
    - components/ui/ProjectCard.tsx

key-decisions:
  - "params typed as Promise<{ slug: string }> and awaited — Next.js 15 App Router requirement for async Server Component page props"
  - "dynamicParams = false ensures unknown slugs return 404, not dynamic rendering"
  - "Detail page has no data-fade-up attributes — content renders immediately visible since user navigated intentionally; hero provides visual impact"
  - "ProjectCard Link upgrade uses same sharedClassName — no visual change, only navigation behavior change"

patterns-established:
  - "Detail page pattern: async Server Component, await params, find-or-notFound, static hero + sidebar + grid"
  - "Sticky sidebar at top-[96px] (nav height) for long-form content pages"

requirements-completed: [PROJ-04]

# Metrics
duration: 10min
completed: 2026-03-28
---

# Phase 04 Plan 02: Per-Project Detail Pages Summary

**10 project detail pages statically pre-rendered via generateStaticParams with cinematic 60vh hero, sticky metadata sidebar, and additional images grid; ProjectCard upgraded from `<a>` to Next.js `<Link>` for client-side navigation**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-03-28
- **Completed:** 2026-03-28
- **Tasks:** 2 (1 auto + 1 checkpoint:human-verify)
- **Files modified:** 2

## Accomplishments

- Created `app/projects/[slug]/page.tsx` as a Server Component with `generateStaticParams` producing all 10 project slugs and `dynamicParams = false` for strict 404 on unknown slugs
- Each detail page renders: full-width 60vh hero with `priority` + `placeholder="blur"`, content grid with main column (title, description, additional images) and sticky sidebar (category, scope, back-to-gallery link)
- Upgraded `components/ui/ProjectCard.tsx` from plain `<a>` to Next.js `<Link>` — eliminates full-page reloads when navigating from gallery to detail
- Build verified: 19 static pages generated, TypeScript clean, all 10 `/projects/[slug]` routes confirmed in output

## Task Commits

Each task was committed atomically:

1. **Task 1: Build per-project detail page and upgrade ProjectCard to use Link** - `755a300` (feat)
2. **Task 2: Visual verification of gallery and detail pages** - checkpoint auto-approved, no commit (verification only)

## Files Created/Modified

- `app/projects/[slug]/page.tsx` — Per-project detail page with generateStaticParams, 60vh hero, sidebar, additional images grid
- `components/ui/ProjectCard.tsx` — Upgraded href branch from `<a>` to Next.js `<Link>`

## Decisions Made

- `params` typed as `Promise<{ slug: string }>` and awaited — Next.js 15 App Router passes params as a Promise for async Server Components; accessing synchronously causes a type error and runtime warning
- `dynamicParams = false` set on the detail page — ensures any slug not returned by `generateStaticParams` yields a 404 rather than attempting dynamic server render (matches static export intent)
- Detail page content intentionally has no `data-fade-up` animation — content renders immediately visible; the 60vh hero provides the visual impact moment, and animating every content block on a navigated-to page would feel jarring rather than polished
- ProjectCard Link upgrade preserves exact same `sharedClassName` — zero visual change to the card, only navigation behavior changes from hard reload to client-side transition

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Complete gallery + detail page flow is live and statically generated
- All project navigation is client-side via Next.js Link
- Phase 05 (about) and Phase 06 (contact) can proceed independently — no project page dependencies
- No blockers

---
*Phase: 04-projects-gallery*
*Completed: 2026-03-28*
