---
phase: 03-home-page
plan: 01
subsystem: ui
tags: [react, nextjs, gsap, tailwind, components, hero, projects]

# Dependency graph
requires:
  - phase: 02-animation-infrastructure
    provides: useHeroParallax, useStagger, useFadeUp animation hooks
  - phase: 01-foundation-and-design-system
    provides: Button, ProjectCard UI atoms, design tokens, globals.css
provides:
  - HeroSection: full-viewport cinematic hero with GSAP parallax, gradient overlay, headline, CTA
  - FeaturedProjectsSection: 6-card responsive project grid with stagger animation and View All link
  - buttonVariants helper exported from Button.tsx for Link-based button styling
  - ProjectCard meta prop for sqm/metadata display in hover overlay
  - Placeholder images in public/images/ for local next/image usage
affects:
  - home page assembly (app/page.tsx)
  - projects page (shares ProjectCard)
  - contact page (CTA link destination)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "buttonVariants helper pattern: export class-builder function alongside component for use on <Link> elements, avoiding nested interactive element antipattern"
    - "data-stagger-child on wrapper div (not directly on component): data attributes must be on native DOM elements, not React component roots"

key-files:
  created:
    - components/sections/HeroSection.tsx
    - components/sections/FeaturedProjectsSection.tsx
    - public/images/hero-placeholder.jpg
    - public/images/project-placeholder.jpg
  modified:
    - components/ui/Button.tsx
    - components/ui/ProjectCard.tsx

key-decisions:
  - "buttonVariants helper exported from Button.tsx so <Link> elements can receive button styles without nesting a <button> inside an <a>"
  - "data-stagger-child placed on wrapper <div> per project data map, not on <ProjectCard> directly — hooks scan native DOM, not component refs"
  - "Placeholder JPEGs created as valid minimal JPEG files (binary) — next/image requires actual image format, not SVG-renamed"

patterns-established:
  - "buttonVariants({variant, size}): class builder pattern for styling non-button interactive elements"
  - "sections/: components/sections/ directory established for page section compositions"

requirements-completed: [HOME-01, HOME-02, HOME-03]

# Metrics
duration: 3min
completed: 2026-03-28
---

# Phase 03 Plan 01: Hero and Featured Projects Sections Summary

**HeroSection with GSAP parallax + gradient overlay and FeaturedProjectsSection with 6 real CLMC project cards in a responsive 3-column stagger grid**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-28T07:23:57Z
- **Completed:** 2026-03-28T07:26:25Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Built HeroSection as a full-viewport (h-screen) hero with GSAP parallax via useHeroParallax (3 refs: heroRef, bgRef, textRef), dark gradient overlay, centered headline "Building the Philippines Forward", and "Request for Inspection" CTA linking to /contact
- Built FeaturedProjectsSection rendering 6 real CLMC project entries in a responsive grid (1-col mobile, 2-col tablet, 3-col desktop) with stagger reveal via useStagger + useFadeUp
- Added buttonVariants helper to Button.tsx enabling Link-styled-as-button without nesting interactive elements
- Added optional meta prop to ProjectCard for sqm metadata display in the hover overlay

## Task Commits

Each task was committed atomically:

1. **Task 1: Setup — placeholder images, buttonVariants helper, ProjectCard meta prop** - `bd31e87` (chore)
2. **Task 2: Build HeroSection and FeaturedProjectsSection components** - `14f3e44` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `components/sections/HeroSection.tsx` - Full-viewport hero with parallax, gradient overlay, CTA
- `components/sections/FeaturedProjectsSection.tsx` - 6-card project grid with stagger animation and View All link
- `public/images/hero-placeholder.jpg` - Valid minimal JPEG for hero background
- `public/images/project-placeholder.jpg` - Valid minimal JPEG for project card images
- `components/ui/Button.tsx` - Added buttonVariants helper function, refactored Button to use it
- `components/ui/ProjectCard.tsx` - Added optional meta prop with hover overlay display

## Decisions Made

- buttonVariants exported as a standalone class-builder so `<Link>` can receive button styles without nesting a `<button>` inside an `<a>` (accessibility violation)
- `data-stagger-child` placed on wrapper `<div key={project.id}>` elements in the map, not directly on `<ProjectCard>` — GSAP hooks scan native DOM attributes, not React component props
- Placeholder images created as binary minimal JPEG files (valid JPEG format) — next/image validates actual image format at build time

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- HeroSection and FeaturedProjectsSection are ready to be imported into `app/page.tsx` for home page assembly
- All 6 project entries use real CLMC project data from CONTEXT.md — ready to swap to actual photography in Phase 4
- buttonVariants pattern is now established for any future Link-styled-as-button needs across all sections

---
*Phase: 03-home-page*
*Completed: 2026-03-28*
