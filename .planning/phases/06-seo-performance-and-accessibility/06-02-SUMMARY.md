---
phase: 06-seo-performance-and-accessibility
plan: 02
subsystem: ui
tags: [accessibility, performance, next-image, wcag, focus-visible, prefers-reduced-motion]

requires:
  - phase: 06-01
    provides: SEO metadata layer, skip-link pattern, shared-metadata module
  - phase: 05-content-pages-and-contact
    provides: All 9 content page files with nested main elements

provides:
  - Zero nested main landmark elements across all content pages
  - Global focus-visible CSS safety net (WCAG 2.2 AA)
  - Hero image blur placeholder via BLUR_DATA_URL
  - Verified prefers-reduced-motion coverage
  - Full production build passing (24 static pages)

affects: [launch, vercel-deploy]

tech-stack:
  added: []
  patterns:
    - "Page content wrapped in <div> not <main> — layout.tsx owns the single <main id='main-content'>"
    - "a:focus-visible / button:focus-visible in globals.css @layer base as accessibility safety net"
    - "BLUR_DATA_URL from data/projects reused for all blur placeholders across hero and detail pages"

key-files:
  created: []
  modified:
    - app/globals.css
    - components/sections/HeroSection.tsx
    - app/about/page.tsx
    - app/about/ceo/page.tsx
    - app/services/page.tsx
    - app/projects/page.tsx
    - app/projects/[slug]/page.tsx
    - app/clients/page.tsx
    - app/clients/testimonials/page.tsx
    - app/contact/page.tsx
    - app/qms/page.tsx

key-decisions:
  - "Page files use <div> not <main> — layout.tsx is the single source of the main landmark, preventing duplicate landmark violations"
  - "BLUR_DATA_URL constant is the single shared blur placeholder for all next/image blur placeholders across the site"
  - "ProjectCard already had sizes attribute — no change needed, research finding confirmed"

patterns-established:
  - "Layout landmark ownership: layout.tsx owns <main>, page.tsx files use <div> wrappers"
  - "Global focus fallback: a:focus-visible / button:focus-visible in @layer base catches any component that forgets inline focus styles"

requirements-completed: [PERF-01, PERF-02, PERF-03, A11Y-01]

duration: 2min
completed: 2026-03-28
---

# Phase 06 Plan 02: Accessibility Hardening and Image Optimization Summary

**WCAG 2.2 AA accessibility sweep: removed 9 nested main landmarks, added global focus-visible safety net, and added hero image blur placeholder — full production build passes 24 static routes**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-28T12:38:29Z
- **Completed:** 2026-03-28T12:40:32Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Eliminated all 9 nested `<main>` landmark violations across content pages (about, ceo, services, projects, projects/[slug], clients, testimonials, contact, qms)
- Added `a:focus-visible` / `button:focus-visible` CSS safety net in `globals.css` @layer base for WCAG 2.2 AA compliance
- Added `placeholder="blur"` with `BLUR_DATA_URL` to HeroSection for instant perceived loading improvement
- Confirmed `prefers-reduced-motion` media query active in globals.css covering all data-attribute animations
- Full `npm run build` passes: 24 static pages, zero TypeScript errors, zero metadata errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix nested main elements and add global focus indicators** - `7a8cc3d` (fix)
2. **Task 2: Image optimization audit — blur placeholders, sizes, priority** - `92056ff` (feat)

## Files Created/Modified
- `app/globals.css` - Added `a:focus-visible` / `button:focus-visible` safety net rule inside @layer base
- `components/sections/HeroSection.tsx` - Added `BLUR_DATA_URL` import and `placeholder="blur"` + `blurDataURL` props to hero Image
- `app/about/page.tsx` - `<main>` replaced with `<div>`
- `app/about/ceo/page.tsx` - `<main className="bg-surface-primary">` replaced with `<div>`
- `app/services/page.tsx` - `<main>` replaced with `<div>`
- `app/projects/page.tsx` - `<main className="min-h-screen bg-surface-primary">` replaced with `<div>`
- `app/projects/[slug]/page.tsx` - `<main className="min-h-screen bg-surface-primary">` replaced with `<div>`
- `app/clients/page.tsx` - `<main className="bg-surface-primary min-h-screen">` replaced with `<div>`
- `app/clients/testimonials/page.tsx` - `<main className="bg-surface-primary min-h-screen">` replaced with `<div>`
- `app/contact/page.tsx` - `<main className="bg-surface-primary">` replaced with `<div>`
- `app/qms/page.tsx` - `<main className="bg-surface-primary min-h-screen">` replaced with `<div>`

## Decisions Made
- `layout.tsx` is the single owner of the `<main id="main-content">` landmark — all page files use `<div>` wrappers to avoid ARIA landmark violations
- `BLUR_DATA_URL` from `data/projects.ts` is reused as the single shared blur placeholder constant; consistent with the pattern established in project detail pages
- `ProjectCard.tsx` already had a `sizes` attribute (`(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw`) — the plan's research was confirmed, no modification needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All PERF-01, PERF-02, PERF-03, and A11Y-01 requirements are satisfied
- Site is production-ready: full static build passes, semantic HTML is valid, images are optimized, focus indicators are global
- No blockers for launch deployment to Vercel

---
*Phase: 06-seo-performance-and-accessibility*
*Completed: 2026-03-28*
