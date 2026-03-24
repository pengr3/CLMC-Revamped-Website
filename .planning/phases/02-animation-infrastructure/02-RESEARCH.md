# Phase 2: Animation Infrastructure - Research

**Researched:** 2026-03-24
**Domain:** GSAP ScrollTrigger, Motion AnimatePresence, Lenis sync, CSS hover interactions
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Scroll Reveal Style**
- D-01: Mixed approach — fade-up for standard content sections (headings, text blocks, cards), clip/mask reveals for hero moments and key visual sections (project gallery, hero images, key stats)
- D-02: Stagger children — grid items, list elements, and cards animate in sequentially with ~80-120ms delays (cascade/waterfall effect)
- D-03: Re-animate each time — elements animate out when leaving viewport and back in when re-entering. Scroll-linked, dynamic feel throughout
- D-04: Early trigger — animations fire as soon as the element's top edge crosses the bottom of the viewport (~90% scroll position). Snappy, ready feel

**Page Transitions**
- D-05: Crossfade between pages — current page fades out, new page fades in. ~300ms duration. Clean, minimal, premium (Vercel/Linear standard)
- D-06: Shell persists — Navbar and Footer stay visible during transitions; only `<main>` content area crossfades. App-like stability, no layout shift
- D-07: Hold current page until next is ready — no loading indicator needed (SSG site, transitions near-instant)

**Hover Micro-Interactions**
- D-08: Buttons — scale up to ~1.03-1.05x on hover with subtle lift shadow. Physical, tactile feel
- D-09: Project/image cards — image inside card scales ~1.05x (overflow hidden) with dark overlay fading in showing project title/CTA. Classic portfolio pattern
- D-10: Nav links — keep Phase 1's animated underline (D-12 from Phase 1). No magnetic cursor, no additional effects. Consistent with established pattern
- D-11: No custom cursor — standard browser cursor everywhere. No dot follower or cursor effects

**Hero Parallax**
- D-12: Subtle parallax — 10-20% speed difference between background image and content. Gentle depth, elegant, not showy
- D-13: Hero exit — text and CTA fade out + slight upward drift as user scrolls past. Smooth dissolve-into-page effect
- D-14: Mobile fallback — simple fade-in entrance animation on page load (~500ms). No scroll effects. Polished first impression without parallax complexity
- D-15: Parallax completely disabled on mobile (per REQUIREMENTS ANIM-02: "gracefully disabled on mobile")

### Claude's Discretion
- Exact GSAP ScrollTrigger configuration values (scrub, start/end markers)
- Clip/mask reveal implementation approach (clip-path vs overflow techniques)
- Stagger timing curve (linear vs eased cascade)
- Crossfade easing function
- Shadow values for button hover lift
- Overlay opacity and gradient for card hover effect
- Parallax speed ratio within the 10-20% range
- Hero exit scroll distance and easing

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANIM-01 | Page sections animate in as the visitor scrolls (fade-up, reveal, or equivalent scroll-triggered entrance animations) | `useFadeUp` and `useClipReveal` hooks using GSAP ScrollTrigger inside `useGSAP()`; stagger support via `useStagger` |
| ANIM-02 | Hero section features a parallax depth effect on scroll | `useHeroParallax` hook; GSAP ScrollTrigger scrub:true; desktop-only guard (`window.innerWidth >= 1024`); mobile fade-in fallback |
| ANIM-03 | Navigating between pages triggers a smooth animated transition (no hard flash) | Motion `AnimatePresence` via `app/template.tsx` — the App Router-native approach; crossfade opacity 0→1 in 300ms |
| ANIM-04 | Interactive elements (buttons, project cards, nav links) have distinct hover micro-interaction states | Button: CSS Tailwind `hover:scale-[1.04]`; Card: CSS group-hover for image zoom + overlay; Nav: Phase 1 underline unchanged |
</phase_requirements>

---

## Summary

Phase 2 builds six reusable animation primitives on top of the tech stack already installed and partially configured in Phase 1. All packages — `gsap@3.14.2`, `@gsap/react@2.1.2`, `motion@12.38.0`, `lenis@1.3.19` — are already declared in package.json. No new installs are required; the work is purely authoring hooks, components, and CSS patterns.

The most critical technical integration is Lenis + GSAP ScrollTrigger synchronization. The current LenisProvider uses `autoRaf: true`, meaning Lenis drives its own RAF loop independent of GSAP. This **must be changed to `autoRaf: false`** and Lenis must be driven by `gsap.ticker.add()` instead. Without this, ScrollTrigger scroll positions and Lenis virtual scroll positions are out of sync, causing animations to fire at wrong scroll depths and producing jank at the scroll start/end of triggers.

For page transitions, the `app/template.tsx` pattern is the correct App Router approach — not an AnimatePresence wrapper in `layout.tsx`. Templates re-render on every navigation (enabling enter animations to retrigger), whereas layouts stay mounted (enter animations never fire again after first load). The crossfade target is a `motion.div` wrapping `{children}` inside `template.tsx`, keeping Navbar and Footer untouched in `layout.tsx`.

**Primary recommendation:** Refactor LenisProvider to `autoRaf: false` + GSAP ticker first. All other primitives depend on scroll positions being accurate. Build `template.tsx` for page transitions second. GSAP scroll hooks third. CSS hover last.

---

## Standard Stack

### Core (all already installed)
| Library | Installed Version | Purpose | Why Standard |
|---------|-------------------|---------|--------------|
| gsap | 3.14.2 | ScrollTrigger, timeline animations, parallax scrub | Industry standard for complex scroll animations; used by every Awwwards construction/architecture site |
| @gsap/react | 2.1.2 | `useGSAP` hook — cleanup, scope, SSR-safe registration | Required for App Router; auto-reverts animations on unmount, prevents memory leaks |
| motion | 12.38.0 | `AnimatePresence` for page transitions | Motion v12 has no breaking changes vs v11; AnimatePresence API is identical |
| lenis | 1.3.19 | Smooth scroll — drives GSAP ticker | Already initialized in LenisProvider; needs `autoRaf: false` modification |

### No New Installs Required
All libraries are declared in package.json. Phase 2 is pure authoring, no `npm install` step needed.

**Verified versions** (from package.json lock):
- gsap: `^3.14.2` — GSAP 3.x is the current stable series (v3 since 2019, v4 not released as of 2026-03)
- motion: `^12.38.0` — Formerly Framer Motion; v12 is current stable; no breaking changes vs v11 AnimatePresence API
- lenis: `^1.3.19` — Current stable; darkroom.engineering maintained

---

## Architecture Patterns

### Recommended Project Structure
```
components/
├── animation/
│   ├── useFadeUp.ts         # GSAP ScrollTrigger fade-up hook
│   ├── useClipReveal.ts     # GSAP ScrollTrigger clip-path wipe hook
│   ├── useStagger.ts        # GSAP stagger children hook
│   ├── useHeroParallax.ts   # GSAP scrub parallax + text exit hook
│   └── index.ts             # Re-export all animation hooks
├── providers/
│   └── LenisProvider.tsx    # MODIFIED: autoRaf:false + gsap.ticker sync
└── layout/
    └── (existing Navbar, Footer — untouched)
app/
├── template.tsx             # NEW: Motion crossfade page transition wrapper
└── layout.tsx               # MODIFIED: remove AnimatePresence (it goes in template.tsx)
```

### Pattern 1: LenisProvider Refactor (CRITICAL — do first)

**What:** Change `autoRaf: true` to `autoRaf: false` and sync Lenis via `gsap.ticker`.

**Why:** When Lenis has its own RAF loop independent of GSAP, ScrollTrigger reads the browser's native scroll position (0) while Lenis is rendering a smooth scroll position (e.g., 340px). Triggers fire at the wrong time or not at all.

**The official sync pattern (from Lenis README):**
```typescript
// Source: https://github.com/darkroomengineering/lenis/blob/main/README.md
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

const lenis = new Lenis({ autoRaf: false })  // GSAP drives the loop, not Lenis

lenis.on('scroll', ScrollTrigger.update)     // keep ST in sync with virtual scroll

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)                     // gsap time is seconds, lenis.raf needs ms
})

gsap.ticker.lagSmoothing(0)                  // prevent GSAP lag compensation from conflicting
```

**Also required:** Call `ScrollTrigger.refresh()` after Lenis initializes to ensure ST recalculates scroll heights based on the smooth-scroll document.

**Plugin registration:** `gsap.registerPlugin(ScrollTrigger, useGSAP)` must be called at module level (outside components) in a shared config file or at the top of each consuming file. Registering it once in a `lib/gsap.ts` config file is the cleanest pattern.

### Pattern 2: GSAP Hooks (useFadeUp, useClipReveal, useStagger)

**What:** Custom hooks that accept a `containerRef`, register a ScrollTrigger inside `useGSAP()`, and handle cleanup automatically.

**Template for all scroll hooks:**
```typescript
// Source: https://gsap.com/resources/React/
'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function useFadeUp(containerRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      // Respect prefers-reduced-motion (DSGN-04)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const targets = containerRef.current?.querySelectorAll('[data-fade-up]') ?? []

      targets.forEach((el) => {
        // Set initial hidden state
        gsap.set(el, { opacity: 0, y: 40 })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',      // D-04: early trigger
          end: 'bottom top',
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
          onLeave: () => gsap.to(el, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }),
          onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(el, { opacity: 0, y: 40, duration: 0.4, ease: 'power2.in' }),
        })
      })
    },
    { scope: containerRef }
  )
}
```

**Key point:** `useGSAP` with `{ scope: containerRef }` — all GSAP selector text is scoped to the container's descendants. ScrollTriggers registered inside are automatically killed on unmount.

### Pattern 3: Page Transitions via template.tsx

**What:** `app/template.tsx` — Next.js App Router-native approach. Templates re-render on every navigation, so enter animations fire on every route change. Layouts do not re-render.

**Why not layout.tsx:** `layout.tsx` stays mounted between sibling routes. Wrapping children in AnimatePresence inside layout.tsx means the `initial` animation only fires once on first page load, never again on navigation.

**Why not FrozenRouter:** The FrozenRouter pattern is a community workaround for the AnimatePresence-in-layout.tsx problem. It is not needed when using `template.tsx` correctly.

**Implementation:**
```typescript
// Source: https://www.nextsaaspilot.com/blogs/next-js-page-transitions-and-animation
// app/template.tsx
'use client'
import { motion } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}  // D-05: 300ms crossfade
    >
      {children}
    </motion.div>
  )
}
```

**layout.tsx stays as-is:** `<LenisProvider><Navbar /><main>{children}</main><Footer /></LenisProvider>` — `{children}` in layout.tsx is the template output, so only the `motion.div` wrapper crossfades; Navbar and Footer are outside it and never animate (D-06).

**Reduced motion:** The globals.css `prefers-reduced-motion` rule sets `transition-duration: 0.01ms` globally, which overrides Motion's transition timing. No additional guard needed in the template component.

**Note on exit animations:** `motion.div` with `exit` prop works in template.tsx without wrapping in `<AnimatePresence>` at the layout level because Next.js unmounts the previous template instance and mounts the new one — the exit fires during unmount. For more reliable exit control, wrap in `<AnimatePresence mode="wait">` in layout.tsx around `{children}`, but test carefully as this can cause double-render issues.

### Pattern 4: Hero Parallax (useHeroParallax)

**What:** GSAP ScrollTrigger with `scrub: true` on the background image's `y` property. Desktop only.

```typescript
export function useHeroParallax(
  heroRef: React.RefObject<HTMLElement | null>,
  bgRef: React.RefObject<HTMLElement | null>,
  textRef: React.RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.innerWidth < 1024) {
        // D-14/D-15: Mobile fallback — simple fade-in, no parallax
        gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        return
      }

      const hero = heroRef.current
      if (!hero) return
      const heroHeight = hero.offsetHeight

      // Background parallax: moves at 15% of scroll speed
      gsap.to(bgRef.current, {
        y: heroHeight * 0.15,   // D-12: 15% speed differential (midpoint of 10-20%)
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Hero text exit: fade out + drift up as user scrolls past hero
      gsap.to(textRef.current, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'bottom 80%',   // D-13: begins at hero bottom crossing 80% viewport
          end: 'bottom 20%',     // completes at hero bottom at 20% viewport
          scrub: true,
        },
      })
    },
    { scope: heroRef }
  )
}
```

### Pattern 5: Card and Button Hover (CSS Only)

**What:** Tailwind group-hover utilities — no JavaScript animation overhead.

**Button update to Button.tsx:**
```typescript
// Add to Button component className (per UI-SPEC):
'hover:scale-[1.04] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.5)]'
// duration-150 ease-out already present — do not change
```

**Card pattern (to be applied in Phase 3+ card components):**
```html
<!-- Card structure — CSS only via Tailwind group-hover -->
<div class="group relative overflow-hidden">
  <img class="transition-transform duration-250 ease-out group-hover:scale-[1.05]" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent
              opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
  <div class="absolute bottom-0 p-lg translate-y-3 opacity-0 transition-all duration-250
              ease-out group-hover:translate-y-0 group-hover:opacity-100">
    <!-- Project title + CTA -->
  </div>
</div>
```

**No Motion `whileHover` needed for these.** CSS-only is faster to implement and has zero JS overhead on scroll-heavy pages.

### Anti-Patterns to Avoid

- **`autoRaf: true` with ScrollTrigger:** Lenis and GSAP fight over scroll position; animations fire at wrong depths. Always use `autoRaf: false` when GSAP ScrollTrigger is present.
- **Registering plugins inside `useGSAP()`:** Register at module level once, not per render cycle.
- **AnimatePresence in layout.tsx for enter animations:** Layouts don't re-render on navigation; enter animations fire only on first load. Use `template.tsx` instead.
- **Raw `gsap.to()` calls outside `useGSAP()`:** No cleanup, causes memory leaks and duplicate animations on route change/StrictMode double-invoke.
- **Forgetting `prefers-reduced-motion` guard:** LenisProvider already skips entirely, but GSAP hooks must also skip ScrollTrigger registration independently.
- **Not calling `ScrollTrigger.refresh()` after Lenis init:** ScrollTrigger caches element positions at registration time; if Lenis hasn't been factored in yet, all trigger offsets are wrong.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| GSAP cleanup on unmount | Custom useEffect cleanup | `useGSAP()` from @gsap/react | Handles cleanup, scope, StrictMode double-invoke automatically |
| Scroll position sync | Custom scroll listeners | `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add()` | Official pattern; anything custom produces drift |
| Page transition state management | Custom router hooks + visibility state | `app/template.tsx` + `motion.div` | Template lifecycle maps 1:1 to route change; no state needed |
| Mobile detection for parallax | Custom hook | `window.innerWidth < 1024` inside `useGSAP()` guard | Sufficient for this use case; runs client-side only |
| Reduced motion detection per hook | Custom hook | `window.matchMedia('(prefers-reduced-motion: reduce)').matches` | Native browser API; globals.css handles CSS, JS side needs explicit check |

**Key insight:** The hardest problems in this phase are already solved — cleanup by `useGSAP`, sync by `gsap.ticker`, transitions by `template.tsx`. The work is wiring known patterns together correctly.

---

## Common Pitfalls

### Pitfall 1: Lenis autoRaf Conflict
**What goes wrong:** Lenis with `autoRaf: true` creates its own RAF loop. GSAP ScrollTrigger uses the browser's native `scrollY` to position triggers. Lenis's smooth scroll intercepts native scroll events, so `window.scrollY` may read 0 while Lenis has rendered the page at 400px. Triggers fire at wrong depths or appear to never fire.
**Why it happens:** Two competing RAF loops reading different scroll positions.
**How to avoid:** Set `autoRaf: false` in LenisProvider. Drive Lenis via `gsap.ticker.add((time) => lenis.raf(time * 1000))`. Add `lenis.on('scroll', ScrollTrigger.update)`.
**Warning signs:** ScrollTrigger markers show triggers at correct positions but animations don't fire at the expected scroll depth.

### Pitfall 2: Hydration Mismatch from GSAP Initial States
**What goes wrong:** GSAP `gsap.set(el, { opacity: 0, y: 40 })` runs client-side after hydration. Server renders the element at opacity:1, y:0. React hydration compares server and client HTML — if GSAP has already mutated the DOM before hydration, React throws a mismatch warning or bails out.
**Why it happens:** GSAP is a DOM mutator; React expects DOM to match server HTML during hydration.
**How to avoid:** Set initial hidden state with CSS, not GSAP. Add a CSS class `data-fade-up` that sets `opacity: 0; transform: translateY(40px)` by default. GSAP then animates TO the visible state without ever setting the initial state. Alternatively, use `gsap.set()` inside `useGSAP()` which only runs after mount, but rely on the CSS default for SSR.
**Warning signs:** Console warning "Prop `style` did not match. Server: opacity:1 Client: opacity:0"

### Pitfall 3: Exit Animations Fail in template.tsx
**What goes wrong:** The `exit` prop on `motion.div` in `template.tsx` may not fire if AnimatePresence is not present in a parent. Without AnimatePresence, Motion doesn't intercept the unmount and the exit animation is skipped.
**Why it happens:** Motion's exit mechanism requires an `AnimatePresence` ancestor to delay unmounting.
**How to avoid:** Either (a) keep `exit` prop off the template.tsx motion.div and rely on enter-only crossfade (perfectly acceptable for 300ms opacity fade — the absence of a stale page is imperceptible), OR (b) add `<AnimatePresence mode="wait">` around `{children}` in `layout.tsx`. Option (a) is simpler and sufficient for D-05 crossfade requirement.
**Warning signs:** Exit animation specified but page hard-cuts on navigation.

### Pitfall 4: ScrollTrigger Memory Leaks on Route Change
**What goes wrong:** ScrollTrigger instances created in a component persist after the component unmounts if not cleaned up. On next navigation to the same route, duplicate instances are created. This compounds — each navigation adds more triggers until performance degrades.
**Why it happens:** ScrollTrigger instances are global; they don't unmount with the React component automatically unless using `useGSAP`.
**How to avoid:** All ScrollTrigger creation must happen inside `useGSAP(() => { ... }, { scope: containerRef })`. Never create ScrollTriggers in raw `useEffect` without a cleanup function.
**Warning signs:** After navigating away and back, animations fire twice or scroll positions drift.

### Pitfall 5: Hero Parallax Jank on Resize
**What goes wrong:** `heroHeight * 0.15` is calculated once on mount. If the user resizes the window, the parallax travel distance is wrong.
**Why it happens:** GSAP caches `end` values at registration time.
**How to avoid:** Call `ScrollTrigger.refresh()` on window resize (debounced). GSAP's `ScrollTrigger.addEventListener('refresh', callback)` or a `ResizeObserver` on the hero element both work.
**Warning signs:** After browser resize, parallax effect stops at wrong scroll position.

---

## Code Examples

Verified patterns from official sources:

### GSAP registerPlugin (module-level, run once)
```typescript
// Source: https://gsap.com/resources/React/
// lib/gsap.ts — import this in any file that uses GSAP
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
```

### LenisProvider with GSAP sync (refactored)
```typescript
// Source: https://github.com/darkroomengineering/lenis/blob/main/README.md (integration pattern)
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    const lenis = new Lenis({
      autoRaf: false,          // CRITICAL: GSAP drives the RAF loop
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      syncTouch: false,
    })
    lenisRef.current = lenis

    // Sync Lenis virtual scroll position → ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's RAF loop (single RAF loop)
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    // Let ScrollTrigger recalculate after Lenis is ready
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
```

### template.tsx (crossfade page transition)
```typescript
// Source: https://www.nextsaaspilot.com/blogs/next-js-page-transitions-and-animation
// app/template.tsx
'use client'
import { motion } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
// Note: exit prop omitted intentionally — see Pitfall 3.
// A 300ms enter-fade is imperceptible as an exit since the new page
// immediately overlays. If hard exit is needed, add AnimatePresence
// mode="wait" in layout.tsx around {children}.
```

### Clip-path reveal (bottom-up wipe)
```typescript
// Pattern for useClipReveal — from UI-SPEC animation contract
gsap.set(el, { clipPath: 'inset(100% 0 0 0)' })  // start fully clipped

ScrollTrigger.create({
  trigger: el,
  start: 'top 90%',
  end: 'bottom top',
  onEnter: () =>
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' }),
  onLeave: () =>
    gsap.to(el, { clipPath: 'inset(100% 0 0 0)', duration: 0.5, ease: 'power2.in' }),
  onEnterBack: () =>
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' }),
  onLeaveBack: () =>
    gsap.to(el, { clipPath: 'inset(100% 0 0 0)', duration: 0.5, ease: 'power2.in' }),
})
```

### Stagger children
```typescript
// Pattern for useStagger — GSAP stagger API
gsap.set(children, { opacity: 0, y: 40 })

ScrollTrigger.create({
  trigger: container,
  start: 'top 90%',
  onEnter: () =>
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: {
        amount: 0.1 * children.length,  // 80-120ms between items (D-02)
        ease: 'power1.out',             // eased cascade (discretion)
        from: 'start',
      },
    }),
  onLeave: () => gsap.to(children, { opacity: 0, y: -20, duration: 0.3 }),
  onEnterBack: () =>
    gsap.to(children, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      stagger: { amount: 0.1 * children.length, ease: 'power1.out' },
    }),
  onLeaveBack: () => gsap.to(children, { opacity: 0, y: 40, duration: 0.3 }),
})
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| AnimatePresence in layout.tsx | `app/template.tsx` + `motion.div` | Next.js App Router (2023+) | Layouts don't re-render; templates do — enter animation fires on every navigation |
| Locomotive Scroll | Lenis | 2024 | Locomotive stalled; Lenis is lightweight, native DOM, no virtual scroll conflicts |
| gsap.registerPlugin in every component | Single `lib/gsap.ts` module with registration | 2024 best practice | Prevents duplicate registration warnings; consistent instance |
| ReactLenis wrapper component | Direct `new Lenis()` + `gsap.ticker.add()` | 2025 community guidance | ReactLenis wrapper has mobile performance issues on iOS; direct instantiation with ticker is more reliable |
| `autoRaf: true` with GSAP | `autoRaf: false` + GSAP ticker driving RAF | 2024 community consensus | Single RAF loop; no scroll position drift |

**Deprecated/outdated:**
- Locomotive Scroll: stalled maintenance, replaced by Lenis sitewide
- `scrollerProxy()` for Lenis: old pattern from Lenis v1.0; `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker` is the current recommendation
- `framer-motion` package name: rebranded to `motion`; import from `motion/react` in new code

---

## Open Questions

1. **Exit animation in template.tsx**
   - What we know: `motion.div` with `exit` prop won't fire without an `AnimatePresence` ancestor
   - What's unclear: Whether the "enter-only" crossfade (no exit) visually satisfies D-05 without an explicit exit fade
   - Recommendation: Start with enter-only (simpler). Test by navigating rapidly. If the hard-cut on exit is perceptible, add `<AnimatePresence mode="wait">` around `{children}` in layout.tsx and validate that no hydration issues arise.

2. **ScrollTrigger.refresh() timing**
   - What we know: Must be called after Lenis initializes; currently in the same `useEffect`
   - What's unclear: Whether there is a timing gap between `lenis.on(...)` and Lenis being fully ready to report scroll heights
   - Recommendation: Call `ScrollTrigger.refresh()` with a minimal `requestAnimationFrame` delay after Lenis setup, or call it in the `lenis.on('scroll', ...)` first event. Test with a long page.

3. **LenisProvider ref exposure**
   - What we know: `useHeroParallax` and other hooks call `ScrollTrigger.refresh()` after they register. If Lenis hasn't initialized yet (first render), this could cause issues.
   - What's unclear: Whether exposing the Lenis instance via Context is needed for hooks to call `ScrollTrigger.refresh()` conditionally
   - Recommendation: Not needed for this phase. `ScrollTrigger.refresh()` is idempotent and safe to call multiple times. Each hook can call it after its triggers register without coordination.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test config files or test directories found |
| Config file | None — Wave 0 must create |
| Quick run command | `npm test` (after setup) |
| Full suite command | `npm test` (after setup) |

### Phase Requirements → Test Map

Animation infrastructure is primarily a client-side runtime behavior domain. Most behaviors require browser rendering and scroll interaction that cannot be unit tested with Jest/Vitest in a Node environment. The correct test strategy is smoke tests verifying (a) components render without crashing, (b) hooks don't throw during mount/unmount, and (c) manual visual verification per the success criteria.

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANIM-01 | Scroll reveal hooks render without errors, export correct signatures | unit (mount/unmount) | `npx jest components/animation` | ❌ Wave 0 |
| ANIM-02 | useHeroParallax registers no ScrollTrigger on `window.innerWidth < 1024` mock | unit (jsdom) | `npx jest useHeroParallax` | ❌ Wave 0 |
| ANIM-03 | template.tsx renders children without crashing | unit (render) | `npx jest app/template` | ❌ Wave 0 |
| ANIM-04 | Button renders with hover scale classes applied | unit (render snapshot) | `npx jest Button` | ❌ Wave 0 |

**Note:** GSAP ScrollTrigger requires a DOM with scroll geometry (window.innerHeight, element.getBoundingClientRect). These are not available in jsdom without mocking. Tests should verify structure, not animation values. Full animation behavior is validated manually via the dev server.

### Sampling Rate
- Per task commit: `npm run build` (verify no TypeScript errors, no hydration warnings in build output)
- Per wave merge: `npm run build && npm run lint` — animation infrastructure must not introduce TS errors
- Phase gate: Manual visual check in dev server before `/gsd:verify-work` — scroll reveals, page transition, button hover all functional

### Wave 0 Gaps
- [ ] No test framework installed — decide on Vitest (preferred for Next.js) or Jest before adding tests
- [ ] `components/animation/__tests__/` directory — unit tests for hook exports
- [ ] Consider: For this phase, `npm run build` (TypeScript compilation) is the most reliable automated gate; GSAP/DOM behavior needs dev server visual QA

*(Recommendation: Accept that ANIM-01 through ANIM-04 are primarily verified via visual QA in dev server + TypeScript compilation gate. Invest test time in Phase 5 forms and Phase 6 SEO where unit testing delivers more value.)*

---

## Sources

### Primary (HIGH confidence)
- Lenis README — `https://github.com/darkroomengineering/lenis/blob/main/README.md` — official GSAP integration pattern (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add()`)
- GSAP React docs — `https://gsap.com/resources/React/` — `useGSAP` hook pattern, `registerPlugin` location, scope pattern
- Motion changelog — `https://motion.dev/changelog` — v12 has no breaking changes from v11; AnimatePresence API unchanged
- CLMC package.json — installed versions confirmed: gsap 3.14.2, @gsap/react 2.1.2, motion 12.38.0, lenis 1.3.19

### Secondary (MEDIUM confidence)
- `https://www.nextsaaspilot.com/blogs/next-js-page-transitions-and-animation` — template.tsx pattern for App Router page transitions; confirmed functional on Next.js 16
- `https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router` — FrozenRouter pattern; confirmed as workaround for layout.tsx approach (not needed when using template.tsx)
- GSAP community forum `https://gsap.com/community/forums/topic/40426-patterns-for-synchronizing-scrolltrigger-and-lenis-in-reactnext/` — `autoRaf: false` consensus; ReactLenis wrapper mobile issues

### Tertiary (LOW confidence — flag for validation)
- GSAP community: ScrollTrigger.refresh() timing after Lenis init — community guidance, not official docs. Validate behavior in dev.
- Exit animation behavior in template.tsx without AnimatePresence — inferred from Motion architecture docs; needs runtime verification.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed in package.json; versions verified against npm registry
- Architecture: HIGH — Lenis + GSAP sync from official Lenis README; useGSAP from official GSAP docs; template.tsx from Next.js App Router architecture
- Pitfalls: HIGH for pitfalls 1-4 (sourced from official docs + community consensus); MEDIUM for pitfall 5 (community sourced)

**Research date:** 2026-03-24
**Valid until:** 2026-04-24 (stable libraries; Lenis/GSAP integration API unlikely to change)
