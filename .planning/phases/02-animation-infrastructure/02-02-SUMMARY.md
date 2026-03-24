---
phase: 02-animation-infrastructure
plan: 02
subsystem: ui
tags: [gsap, scrolltrigger, animation, hooks, react, typescript, css]

# Dependency graph
requires:
  - phase: 02-animation-infrastructure/02-01
    provides: lib/gsap.ts with GSAP+ScrollTrigger registration, LenisProvider, useGSAP hook
provides:
  - Four composable GSAP ScrollTrigger animation hooks: useFadeUp, useClipReveal, useStagger, useHeroParallax
  - Barrel export at components/animation/index.ts for Phase 3+ consumption
  - CSS initial states in globals.css preventing hydration mismatches
  - Reduced-motion CSS overrides ensuring accessibility compliance
affects:
  - Phase 3 page sections (all scroll animations consume these hooks)
  - Hero section implementation (useHeroParallax)
  - Project gallery (useClipReveal for image reveals, useStagger for card grids)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "data-attribute-driven animation targeting: [data-fade-up], [data-clip-reveal], [data-stagger] + [data-stagger-child]"
    - "CSS initial states + GSAP set() synchronization to prevent hydration mismatch"
    - "Four-callback ScrollTrigger pattern: onEnter/onLeave/onEnterBack/onLeaveBack for bidirectional re-animation"
    - "window.innerWidth < 1024 guard for desktop-only parallax effects"
    - "useGSAP with { scope: ref } for automatic ScrollTrigger cleanup on component unmount"
    - "prefers-reduced-motion guard at top of each useGSAP callback — early return before any GSAP registration"

key-files:
  created:
    - components/animation/useFadeUp.ts
    - components/animation/useClipReveal.ts
    - components/animation/useStagger.ts
    - components/animation/useHeroParallax.ts
    - components/animation/index.ts
  modified:
    - app/globals.css

key-decisions:
  - "CSS initial states added outside @layer base to apply globally regardless of Tailwind layer order — GSAP gsap.set() inside useGSAP ensures JS initial state matches CSS initial state"
  - "stagger.each: 0.1 (100ms) chosen as midpoint of 80-120ms design spec range"
  - "useHeroParallax accepts three separate refs (heroRef, bgRef, textRef) to maximize composability — callers bind their own DOM elements"
  - "Resize handler uses ScrollTrigger.refresh() rather than re-initializing to avoid double-registration"

patterns-established:
  - "Animation hook pattern: 'use client' + import from @/lib/gsap + useGSAP({ scope: ref }) + prefers-reduced-motion early return"
  - "Data attribute API: components declare [data-fade-up] / [data-clip-reveal] / [data-stagger] + [data-stagger-child] on DOM nodes; hooks scan and wire ScrollTriggers"
  - "Mobile guard: window.innerWidth < 1024 before scroll-linked parallax; simple opacity fromTo as fallback"

requirements-completed: [ANIM-01, ANIM-02]

# Metrics
duration: 4min
completed: 2026-03-24
---

# Phase 2 Plan 02: Animation Scroll Hooks Summary

**Four GSAP ScrollTrigger animation primitives — fade-up, clip-path wipe, stagger children, and hero parallax — wired via data attributes, with bidirectional re-animation and CSS hydration safety**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-24T07:47:46Z
- **Completed:** 2026-03-24T07:51:19Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Four scroll animation hooks implemented and barrel-exported from `@/components/animation`
- CSS initial states in globals.css ensure SSR-rendered elements match GSAP initial state (no hydration flicker)
- Reduced-motion overrides make all animated elements immediately visible when `prefers-reduced-motion: reduce` is set
- Hero parallax is desktop-only with 15% speed differential, text exit scrub, and mobile fade-in fallback

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useFadeUp, useClipReveal, and useStagger scroll hooks** - `1dba401` (feat)
2. **Task 2: Create useHeroParallax hook with desktop guard and mobile fallback** - `49b8466` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified
- `components/animation/useFadeUp.ts` - ScrollTrigger fade-up with four-direction callbacks, 0.7s power2.out enter
- `components/animation/useClipReveal.ts` - clip-path inset bottom-up wipe, 0.9s power3.out enter
- `components/animation/useStagger.ts` - data-stagger parent / data-stagger-child, 100ms each stagger
- `components/animation/useHeroParallax.ts` - desktop parallax (15% travel), text exit scrub, mobile fade fallback
- `components/animation/index.ts` - barrel export for all four hooks
- `app/globals.css` - [data-fade-up], [data-clip-reveal], [data-stagger-child] CSS initial states + reduced-motion overrides

## Decisions Made
- `stagger.each: 0.1` (100ms) chosen as midpoint of the 80-120ms range specified in design decisions (D-02)
- `useHeroParallax` accepts three separate refs rather than one object ref — maximizes composability for Phase 3 hero implementations
- Resize handler uses `ScrollTrigger.refresh()` to recalculate cached positions without re-registering triggers (Pitfall 5 from research)
- CSS initial states placed outside Tailwind `@layer base` to ensure they apply globally regardless of layer ordering

## Deviations from Plan

None - plan executed exactly as written. `useHeroParallax` was created during Task 1 setup (alongside the barrel export) since the barrel export referenced it, but was committed separately as Task 2 per plan structure.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All four animation hooks are importable from `@/components/animation` — ready for Phase 3 page section consumption
- CSS initial states are in place — Phase 3 components can add `data-fade-up`, `data-clip-reveal`, `data-stagger`/`data-stagger-child` attributes immediately
- Hook API is stable: callers pass a `containerRef` (or three refs for hero), hooks wire all children automatically

---
*Phase: 02-animation-infrastructure*
*Completed: 2026-03-24*

## Self-Check: PASSED

**Files verified:**
- FOUND: components/animation/useFadeUp.ts
- FOUND: components/animation/useClipReveal.ts
- FOUND: components/animation/useStagger.ts
- FOUND: components/animation/useHeroParallax.ts
- FOUND: components/animation/index.ts
- FOUND: app/globals.css

**Commits verified:**
- FOUND: 1dba401 (feat(02-02): create useFadeUp, useClipReveal, and useStagger scroll hooks)
- FOUND: 49b8466 (feat(02-02): create useHeroParallax hook with desktop guard and mobile fallback)
