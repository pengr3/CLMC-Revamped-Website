---
phase: 02-animation-infrastructure
plan: 01
subsystem: animation-foundation
tags: [gsap, lenis, scroll, page-transitions, hover, micro-interactions]
dependency_graph:
  requires: [01-02]
  provides: [gsap-registration, lenis-gsap-sync, page-transitions, button-hover, project-card]
  affects: [all-animated-components, scroll-trigger-usage]
tech_stack:
  added: []
  patterns:
    - "lib/gsap.ts as single source of truth for all GSAP imports — registers plugins once at module level"
    - "LenisProvider drives scroll via gsap.ticker.add() — single RAF loop, no double tick"
    - "app/template.tsx for per-navigation enter animations — no AnimatePresence complexity"
    - "motion-safe: prefix on all CSS transition classes for prefers-reduced-motion compliance"
key_files:
  created:
    - lib/gsap.ts
    - app/template.tsx
    - components/ui/ProjectCard.tsx
  modified:
    - components/providers/LenisProvider.tsx
    - components/ui/Button.tsx
decisions:
  - "lib/gsap.ts is the single import source for GSAP — all consumers import from @/lib/gsap, never from gsap directly"
  - "LenisProvider uses autoRaf: false with gsap.ticker.add() — single RAF loop prevents double-tick scroll jank"
  - "template.tsx uses enter-only fade (no exit prop) — 300ms is fast enough that absence of stale page is imperceptible"
  - "ProjectCard uses conditional anchor/div rendering instead of cast to avoid TypeScript HTMLElement event handler incompatibility"
metrics:
  duration_seconds: 422
  completed_date: "2026-03-24"
  tasks_completed: 3
  files_created: 3
  files_modified: 2
---

# Phase 2 Plan 01: Animation Infrastructure Foundation Summary

**One-liner:** GSAP plugin registration, Lenis-GSAP ticker sync, Motion page crossfade, and CSS hover micro-interactions for Button and ProjectCard.

---

## What Was Built

### Task 1: GSAP Config + LenisProvider Refactor (commit: 8919562)

Created `lib/gsap.ts` as the single import source for GSAP. All future components must import `gsap`, `ScrollTrigger`, and `useGSAP` from `@/lib/gsap` — never from `gsap` or `gsap/ScrollTrigger` directly. This ensures `gsap.registerPlugin()` runs exactly once at module load, preventing duplicate registration errors.

Refactored `LenisProvider.tsx` to use `autoRaf: false` and drive Lenis via `gsap.ticker.add(tickerFn)`. This creates a single RAF loop: GSAP ticks → Lenis ticks → ScrollTrigger updates. Eliminated the previous double-tick setup where Lenis ran its own independent `requestAnimationFrame`.

### Task 2: Page Transition Crossfade (commit: 63ed816)

Created `app/template.tsx` using Motion's `motion.div` with `initial={{ opacity: 0 }}` and `animate={{ opacity: 1 }}` at 300ms `easeInOut`. Next.js App Router's template file re-mounts on every navigation, so the enter animation fires on each route change without any `AnimatePresence` wrapper needed in `layout.tsx`. Navbar and Footer remain outside the template, staying mounted and stable during transitions.

### Task 3: Hover Micro-Interactions (commit: 39bf897)

Added `motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0px_8px_24px_rgba(0,0,0,0.5)]` to `Button.tsx`. The existing `transition-all duration-150 ease-out` animates the scale and shadow lift smoothly.

Created `components/ui/ProjectCard.tsx` — a reusable card primitive for project photography. Implements: image zoom (`group-hover:scale-[1.05]` clipped by `overflow-hidden` on container), dark gradient overlay (`from-black/80 via-black/30 to-transparent` fading from `opacity-0` to `opacity-100`), and title/category reveal (sliding from `translate-y-3 opacity-0` to `translate-y-0 opacity-100`). All transitions use `motion-safe:` prefix for DSGN-04 compliance.

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript type incompatibility in ProjectCard forwardRef**

- **Found during:** Task 3 — build failed with TypeScript error
- **Issue:** The original plan's implementation spread `...props` (typed as `React.HTMLAttributes<HTMLDivElement>`) while simultaneously casting to `React.AnchorHTMLAttributes<HTMLAnchorElement>`. TypeScript rejected this because `ClipboardEventHandler<HTMLDivElement>` is not assignable to `ClipboardEventHandler<HTMLAnchorElement>` — `HTMLDivElement` is missing 21+ properties from `HTMLAnchorElement`.
- **Fix:** Extracted shared JSX content into a `content` variable, then conditionally renders either an `<a href={href}>` or `<div ref={ref}>` wrapper based on the `href` prop. This removes the need for the problematic dual-type cast. The interface was simplified to explicit props only (no `extends React.HTMLAttributes<HTMLDivElement>`) since the spread of arbitrary HTML attributes was the root cause.
- **Files modified:** `components/ui/ProjectCard.tsx`
- **Commit:** 39bf897 (included in Task 3 commit)

---

## Auth Gates

None encountered.

---

## Self-Check

Verification of all created/modified files and commits:

- lib/gsap.ts: FOUND
- app/template.tsx: FOUND
- components/ui/ProjectCard.tsx: FOUND
- components/providers/LenisProvider.tsx: FOUND
- components/ui/Button.tsx: FOUND
- Commit 8919562: FOUND
- Commit 63ed816: FOUND
- Commit 39bf897: FOUND

## Self-Check: PASSED
