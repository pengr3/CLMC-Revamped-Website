---
phase: 01-foundation-and-design-system
plan: 02
subsystem: ui
tags: [next.js, react, tailwind, navbar, footer, lenis, smooth-scroll, accessibility, motion-safe]

# Dependency graph
requires:
  - phase: 01-01
    provides: design tokens (CSS custom properties), cn utility, Button atom, font variables, route placeholders
provides:
  - Sticky scroll-aware Navbar with transparent-to-frosted-glass transition at 80px scroll threshold
  - Full-screen mobile overlay with hamburger-to-X morph, focus trap, Escape dismiss, and scroll lock
  - Responsive Footer (3-column xl / 2-column md / 1-column mobile) with CLMC logo, nav links, contact info
  - Lenis smooth scroll provider with prefers-reduced-motion bypass and route-change scroll-to-top
  - Root layout wired with Navbar, Footer, LenisProvider, and lenis.css import
affects:
  - All subsequent phases (every page inherits Navbar + Footer from root layout)
  - Phase 2 (animation infrastructure builds on Lenis provider already in place)
  - Phase 5 (contact page will update Footer placeholder phone number)

# Tech tracking
tech-stack:
  added:
    - lenis (smooth scroll — initialized in LenisProvider with autoRaf)
    - lenis/dist/lenis.css (imported in root layout to prevent scrollbar CLS)
  patterns:
    - "Server Component for static shell (Footer) — no 'use client' needed"
    - "Client Component for interactive shell (Navbar, LenisProvider) — 'use client' at file top"
    - "Root layout remains Server Component — client components are leaf children"
    - "motion-safe: Tailwind variant gates all CSS transitions (DSGN-04)"
    - "useEffect scroll listener with { passive: true } for scroll-aware Navbar"
    - "Focus trap via Tab/Shift+Tab keydown interception in mobile overlay"
    - "prefers-reduced-motion media query check before Lenis initialization"
    - "NavLink sub-component with after: pseudo-element Tailwind classes for underline animation"

key-files:
  created:
    - components/layout/Navbar.tsx
    - components/layout/Footer.tsx
    - components/providers/LenisProvider.tsx
  modified:
    - app/layout.tsx

key-decisions:
  - "Footer is a Server Component — static content needs no client JS"
  - "LenisProvider uses autoRaf: true — no manual requestAnimationFrame loop required"
  - "Lenis skipped entirely when prefers-reduced-motion is set — native scroll used as fallback"
  - "Mobile overlay uses CSS-only hamburger morph (3 spans) rather than swapping icons for smooth animation"
  - "Root layout keeps no 'use client' directive — Navbar and LenisProvider are client children"

patterns-established:
  - "Pattern 1: NavLink sub-component with after: Tailwind pseudo-element classes for animated underlines"
  - "Pattern 2: Hamburger morph via 3 span elements with rotation/translation transforms"
  - "Pattern 3: Focus trap in modal/overlay via keydown Tab interception + useRef for boundary elements"
  - "Pattern 4: Body scroll lock (document.body.style.overflow = 'hidden') tied to overlay open state"
  - "Pattern 5: Route-change effects via usePathname in useEffect dependency array"

requirements-completed: [NAV-01, NAV-02, NAV-03, NAV-04, NAV-05]

# Metrics
duration: ~35min
completed: 2026-03-23
---

# Phase 1 Plan 02: Navbar, Footer, and Lenis Smooth Scroll Summary

**Sticky scroll-aware Navbar with focus-trapped mobile overlay, 3-column responsive Footer, and Lenis smooth scroll provider wired into root layout — complete Phase 1 shell on every route**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-03-23 (session resumed)
- **Completed:** 2026-03-23
- **Tasks:** 3 (2 auto + 1 checkpoint)
- **Files modified:** 4

## Accomplishments

- Navbar transitions from transparent to frosted glass (`bg-[rgba(13,13,13,0.85)] backdrop-blur-md`) at 80px scroll, with all CSS transitions gated by `motion-safe:`
- Mobile overlay with CSS hamburger-to-X morph, focus trap (Tab cycle + Shift+Tab), Escape dismiss, body scroll lock, and correct ARIA attributes (`role="dialog"`, `aria-modal`, `aria-expanded`, `aria-controls`, `aria-current`)
- Footer renders 3-column grid (xl+) / 2-column (md+) / 1-column (mobile) with CLMC logo, tagline, copyright, navigation links, and contact info
- LenisProvider skips initialization entirely when `prefers-reduced-motion: reduce` is set, resets scroll position on every route change
- Human visually verified the complete shell at desktop, mobile, and reduced-motion states — approved

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Navbar** - `d16de93` (feat)
2. **Task 2: Build Footer, LenisProvider, wire root layout** - `8903440` (feat)
3. **Task 3: Human visual verification** - `c1d9fbb` (docs — checkpoint approval marker)

## Files Created/Modified

- `components/layout/Navbar.tsx` (256 lines) — Sticky scroll-aware Navbar: CLMC logo, 6 nav links with animated underline, "Get in Touch" CTA (desktop), hamburger morph to X, full-screen mobile overlay
- `components/layout/Footer.tsx` (71 lines) — Server Component: 3/2/1 column responsive footer with logo, tagline, copyright, nav links, contact info
- `components/providers/LenisProvider.tsx` (37 lines) — Client wrapper: Lenis smooth scroll with autoRaf, prefers-reduced-motion bypass, route-change scroll-to-top
- `app/layout.tsx` (38 lines) — Root layout updated: imports lenis.css, wraps body with LenisProvider > Navbar > main > Footer

## Decisions Made

- Footer is a Server Component — it has no interactivity, so adding `'use client'` would unnecessarily increase client JS bundle
- `autoRaf: true` in Lenis eliminates the need for a manual requestAnimationFrame loop in the provider, keeping the code minimal
- Lenis initialization is skipped entirely (not just disabled) when `prefers-reduced-motion: reduce` is set — this is DSGN-04 compliance and provides native scroll as the fallback
- CSS-only hamburger morph (3 `<span>` elements with transform) used instead of icon swapping — this enables the smooth morph animation specified in the UI-SPEC

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `components/layout/Footer.tsx` line 54-57: Phone number is placeholder `+63 (XX) XXX-XXXX` with `tel:+63XXXXXXXXXX` href. This is intentional per the plan spec — real CLMC contact info is not yet available. The email `info@clmc.ph` may also need verification before launch. These stubs do not prevent the plan's goal (shell is fully functional); they will be resolved in Phase 5 (Content Pages) when real client data is confirmed.

## Issues Encountered

None — build passed cleanly on both tasks.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All global shell components are in place and verified — Phase 2 (Animation Infrastructure) can proceed immediately
- Lenis is already initialized site-wide; Phase 2 GSAP integration should sync with Lenis scroll events using the `lenisRef` pattern from RESEARCH.md
- The `motion-safe:` convention is established — all Phase 2 animation code must respect this gate
- Blocker: real CLMC phone number needed before Phase 5 deploys the Contact page

---
*Phase: 01-foundation-and-design-system*
*Completed: 2026-03-23*
