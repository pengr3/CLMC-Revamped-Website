# Phase 2: Animation Infrastructure - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Reusable animation primitives (GSAP ScrollTrigger + Motion), smooth scroll integration with existing Lenis provider, and page transition machinery. This phase delivers the animation foundation every subsequent page section will consume — scroll reveals, page transitions, hover micro-interactions, and hero parallax.

This phase does NOT include page content, section layouts, or route-specific components (Phase 3+). It builds primitives and patterns.

</domain>

<decisions>
## Implementation Decisions

### Scroll Reveal Style
- **D-01:** Mixed approach — fade-up for standard content sections (headings, text blocks, cards), clip/mask reveals for hero moments and key visual sections (project gallery, hero images, key stats)
- **D-02:** Stagger children — grid items, list elements, and cards animate in sequentially with ~80-120ms delays (cascade/waterfall effect)
- **D-03:** Re-animate each time — elements animate out when leaving viewport and back in when re-entering. Scroll-linked, dynamic feel throughout
- **D-04:** Early trigger — animations fire as soon as the element's top edge crosses the bottom of the viewport (~90% scroll position). Snappy, ready feel

### Page Transitions
- **D-05:** Crossfade between pages — current page fades out, new page fades in. ~300ms duration. Clean, minimal, premium (Vercel/Linear standard)
- **D-06:** Shell persists — Navbar and Footer stay visible during transitions; only `<main>` content area crossfades. App-like stability, no layout shift
- **D-07:** Hold current page until next is ready — no loading indicator needed (SSG site, transitions near-instant)

### Hover Micro-Interactions
- **D-08:** Buttons — scale up to ~1.03-1.05x on hover with subtle lift shadow. Physical, tactile feel
- **D-09:** Project/image cards — image inside card scales ~1.05x (overflow hidden) with dark overlay fading in showing project title/CTA. Classic portfolio pattern
- **D-10:** Nav links — keep Phase 1's animated underline (D-12 from Phase 1). No magnetic cursor, no additional effects. Consistent with established pattern
- **D-11:** No custom cursor — standard browser cursor everywhere. No dot follower or cursor effects

### Hero Parallax
- **D-12:** Subtle parallax — 10-20% speed difference between background image and content. Gentle depth, elegant, not showy
- **D-13:** Hero exit — text and CTA fade out + slight upward drift as user scrolls past. Smooth dissolve-into-page effect
- **D-14:** Mobile fallback — simple fade-in entrance animation on page load (~500ms). No scroll effects. Polished first impression without parallax complexity
- **D-15:** Parallax completely disabled on mobile (per REQUIREMENTS ANIM-02: "gracefully disabled on mobile")

### Claude's Discretion
- Exact GSAP ScrollTrigger configuration values (scrub, start/end markers)
- Clip/mask reveal implementation approach (clip-path vs overflow techniques)
- Stagger timing curve (linear vs eased cascade)
- Crossfade easing function
- Shadow values for button hover lift
- Overlay opacity and gradient for card hover effect
- Parallax speed ratio within the 10-20% range
- Hero exit scroll distance and easing

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Tech Stack
- `CLAUDE.md` — Full technology stack spec. GSAP 3.x + @gsap/react (useGSAP hook), Motion 11.x (for page transitions via AnimatePresence), Lenis 1.x (already installed). All library choices and integration patterns documented here

### Requirements
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: ANIM-01 (scroll reveals), ANIM-02 (hero parallax), ANIM-03 (page transitions), ANIM-04 (hover micro-interactions)
- `.planning/PROJECT.md` — Core value, design direction ("minimalist-futuristic"), out-of-scope items (no excessive parallax)

### Prior Phase Context
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md` — Phase 1 decisions: dark-only theme, monochrome palette, Geist+Inter fonts, transparent→frosted-glass Navbar, animated underline nav hover (D-12), forwardRef on all UI atoms

### Out-of-Scope Guardrails
- `.planning/REQUIREMENTS.md` Out of Scope table — "Excessive parallax (every section): Causes mobile jank and visual fatigue — reserved for 1-2 hero moments only"

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/providers/LenisProvider.tsx` — Lenis smooth scroll already initialized (autoRaf: true, duration: 1.2). Respects prefers-reduced-motion by skipping entirely. Animation primitives should integrate with this scroll instance
- `components/ui/Button.tsx` — Uses forwardRef, already has `transition-all duration-150 ease-out`. Ready for GSAP/Motion composition. Hover scale effect can be added via CSS or Motion
- `components/layout/Navbar.tsx` — Already has scroll-aware state and animated underline hover. Phase 2 should not modify nav hover behavior, only build new primitives
- `lib/utils.ts` — cn() utility (clsx + tailwind-merge) available for conditional class composition

### Established Patterns
- `forwardRef` on all UI components — enables GSAP ref targeting and Motion component wrapping
- `"use client"` directive on interactive components — GSAP/Motion code must follow this pattern
- Tailwind CSS v4 with @theme tokens — animation classes should use CSS custom properties where relevant
- prefers-reduced-motion handling — LenisProvider skips entirely; animation primitives must provide static fallbacks

### Integration Points
- `app/layout.tsx` — Page transition wrapper (AnimatePresence) will wrap the `<main>{children}</main>` area inside the existing LenisProvider > Navbar > main > Footer structure
- GSAP ScrollTrigger must sync with Lenis scroll events (Lenis provides scroll position that ScrollTrigger can consume)
- All animation primitives should be importable as hooks or wrapper components for Phase 3+ pages to consume

</code_context>

<specifics>
## Specific Ideas

- Visual reference: Linear.app, Vercel.com — the animation language should match these: restrained, purposeful, never flashy
- Re-animate on scroll: user wants the dynamic feel of elements entering/exiting as they scroll back and forth, not the "animate once and done" pattern
- Card hover (image zoom + overlay) is a key visual moment — it's how project photography gets showcased throughout the site
- No custom cursor effects — site should feel premium-corporate, not creative-agency

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-animation-infrastructure*
*Context gathered: 2026-03-24*
