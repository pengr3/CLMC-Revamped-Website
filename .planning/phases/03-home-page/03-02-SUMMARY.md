---
phase: 03-home-page
plan: "02"
subsystem: ui
tags: [react, nextjs, gsap, lucide-react, intersection-observer, animation]

requires:
  - phase: 02-animation-infrastructure
    provides: useStagger and useFadeUp hooks with data-attribute API pattern

provides:
  - ServiceCard reusable Server Component with Lucide icon, title, description, /services link
  - ServicesSection client component with 5 CLMC services in a stagger-animated responsive grid
  - useCountUp hook using native IntersectionObserver + rAF with cubic ease-out and reduced-motion support
  - StatsSection client component with 3 count-up credibility stats on surface-secondary background

affects: [03-home-page, 04-projects-gallery, services-page]

tech-stack:
  added: []
  patterns:
    - "useCountUp: native IntersectionObserver + rAF pattern, no external library, single-fire scroll trigger"
    - "Server Component cards: pure display components with no client interactivity stay directive-free"
    - "Count-up single-fire: started state prevents re-animation on scroll back into view"

key-files:
  created:
    - components/ui/ServiceCard.tsx
    - components/sections/ServicesSection.tsx
    - hooks/useCountUp.ts
    - components/sections/StatsSection.tsx
  modified: []

key-decisions:
  - "ServiceCard is a Server Component (no use client) — pure display, no interactivity needed"
  - "useCountUp uses native IntersectionObserver + requestAnimationFrame — no external dependency added"
  - "Cubic ease-out (1 - Math.pow(1 - progress, 3)) for confident deceleration on count-up"
  - "tabular-nums on count span prevents layout shift during number animation"
  - "Duration differentiated: 1800ms for 25 (small number), 2200ms for 100 and 500 (larger numbers)"

patterns-established:
  - "hooks/: custom hooks live in top-level hooks/ directory (not inside components/)"
  - "Server Component default: UI-only display components omit use client unless they need hooks/events"

requirements-completed: [HOME-04, HOME-05]

duration: 2min
completed: 2026-03-28
---

# Phase 3 Plan 02: Services and Stats Sections Summary

**ServiceCard + ServicesSection (5-service stagger grid) and StatsSection with native rAF count-up hook triggering on IntersectionObserver scroll-in**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-28T07:23:56Z
- **Completed:** 2026-03-28T07:26:21Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- ServiceCard Server Component renders Lucide icon, title, description as a /services link with group hover effects
- ServicesSection assembles 5 CLMC services (Commercial Fit-outs, Residential Fit-outs, Maintenance, Repair Services, Property Management) in a responsive 3-col grid with GSAP stagger animation
- useCountUp hook drives count-up from 0 to target using requestAnimationFrame cubic ease-out, triggered once by IntersectionObserver at 50% visibility, respects prefers-reduced-motion
- StatsSection renders 25+ years, 100+ projects, 500+ clients on bg-surface-secondary with tabular-nums preventing layout shift

## Task Commits

1. **Task 1: Create ServiceCard component and ServicesSection** - `a05e4db` (feat)
2. **Task 2: Create useCountUp hook and StatsSection** - `f6a7915` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `components/ui/ServiceCard.tsx` - Server Component: Lucide icon + title + description + Link to /services
- `components/sections/ServicesSection.tsx` - Client component: 5 service cards in stagger grid
- `hooks/useCountUp.ts` - Custom hook: IntersectionObserver + rAF count-up with cubic ease-out
- `components/sections/StatsSection.tsx` - Client component: 3 credibility stats on surface-secondary

## Decisions Made

- ServiceCard is a Server Component (no `use client`) — it renders static display content with no interactivity or hooks, keeping client bundle minimal
- useCountUp uses native browser APIs (IntersectionObserver + requestAnimationFrame) — no external library added to bundle
- `tabular-nums` on the count span ensures digits occupy fixed width, preventing layout shift during count-up animation
- Count-up fires only once (`started` state flag) — scroll back does not re-trigger, avoiding disorienting repeated animations

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- ServicesSection and StatsSection are ready to be imported into the home page layout
- Both sections integrate with existing GSAP animation infrastructure (useStagger, useFadeUp)
- Phase 3 Plan 03 (hero section or page assembly) can consume these sections directly

## Self-Check: PASSED

All 4 files verified present. Both task commits (a05e4db, f6a7915) confirmed in git log.

---
*Phase: 03-home-page*
*Completed: 2026-03-28*
