# Phase 3: Home Page - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the complete CLMC home page — from the cinematic full-viewport hero section down to the inquiry CTA — delivering the full brand impression with all six sections. Uses the animation primitives from Phase 2 and the design system from Phase 1.

This phase does NOT include the Projects gallery page (Phase 4), content pages (Phase 5), contact form functionality (Phase 5), or SEO optimization (Phase 6).

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **D-01:** Center-aligned layout — brand statement + CTA stacked centered over full-bleed background image. Maximum cinematic impact.
- **D-02:** Full viewport height (100vh). Hero fills the entire screen.
- **D-03:** Background image: eye-level completed building photography. Use placeholder image until real CLMC photography is available.
- **D-04:** Dark gradient overlay from bottom (~50% upward) to ensure text readability. Photo stays vivid at top.
- **D-05:** CTA button label: "Request for Inspection" — links to /contact page.
- **D-06:** No scroll-down indicator — clean and minimal. Full-viewport hero is self-evident.
- **D-07:** Headline uses CLMC's existing tagline — use placeholder tagline in the right brand voice until real one is provided.
- **D-08:** No sub-tagline — headline + CTA only. Ultra-minimal, maximum impact.
- **D-09:** Hero parallax via existing `useHeroParallax` hook (Phase 2). Text fades out + drifts up on scroll (Phase 2 D-13). Mobile: simple fade-in, no parallax (Phase 2 D-14/D-15).

### Featured Projects Section
- **D-10:** 3-column equal grid on desktop, stacked on mobile. 6 projects total (2 rows of 3).
- **D-11:** Uses existing `ProjectCard` component with image zoom + overlay hover effect.
- **D-12:** Section heading "Featured Projects" with "View All →" link (links to /projects page) aligned right.
- **D-13:** Cards show: project name + category + sqm area on hover overlay.
- **D-14:** Real project data (not placeholders):
  1. AUCTANE 7 and 8 Floor 4800sqm — Commercial Fit-outs
  2. Phirst Park Homes Head Office 3,500sqm — Commercial Fit-outs
  3. GREENROOM STUDIO 1000sqm — Commercial Fit-outs
  4. Pluxee Office, Lepanto Building Makati 500sqm — Commercial Fit-outs
  5. Chiropractic First Fitout — Commercial Fit-outs
  6. HVAC Installation 50HP VRF System — Maintenance
- **D-15:** Placeholder images until real project photography is provided.

### Services Section
- **D-16:** Icon + title + short description card grid. Thin white line icons (Lucide or similar).
- **D-17:** All 5 services as individual cards:
  1. Commercial Fit-outs
  2. Residential Fit-outs
  3. Maintenance
  4. Repair Services
  5. Property Management
- **D-18:** Placeholder descriptions (1-2 sentences each) — Claude drafts, user refines later.
- **D-19:** Each service card links to /services page.

### Stats / Credibility Section
- **D-20:** Animated count-up numbers that count from 0 when scrolled into view. Triggered by `data-fade-up` or intersection observer.
- **D-21:** Placeholder stats (e.g. "25+ Years Experience", "100+ Projects Completed", "500+ Clients Served") — user will swap in real numbers.
- **D-22:** Subtle surface change background (surface-secondary #141414) to differentiate from services section above.
- **D-23:** Separate section from services — clear visual break between them.

### Client Logos Strip
- **D-24:** Auto-scrolling horizontal marquee — CSS-only continuous loop animation.
- **D-25:** Logos displayed in full original brand colors (not grayscale/monochrome).
- **D-26:** Placeholder logo slots for now — user will provide real client logos later.

### Inquiry CTA Section
- **D-27:** Full-width banner with surface-secondary background. Bold headline (e.g. "Ready to Build?") + brief supporting line + "Request for Inspection" button.
- **D-28:** CTA button links to /contact page (same destination as hero CTA).

### Page Section Order
- **D-29:** Top-to-bottom flow: Hero → Featured Projects → Services → Stats → Client Logos → Inquiry CTA. Lead with impact, build credibility, end with action.

### Claude's Discretion
- Exact headline placeholder text and tagline wording
- Service card descriptions (placeholder copy)
- Placeholder stat numbers and labels
- Number of placeholder client logos in marquee
- Marquee scroll speed and animation timing
- Icon choices for each service card
- Spacing between sections (using existing spacing tokens)
- Grid gap values for project cards and service cards
- Stats count-up animation duration and easing
- CTA section headline and supporting text
- Mobile responsive breakpoints for grid columns (1-col vs 2-col)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Tech Stack
- `CLAUDE.md` — Full technology stack spec: Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, GSAP, Motion, Lenis. All library choices and rationale documented here

### Requirements
- `.planning/REQUIREMENTS.md` — Phase 3 requirements: HOME-01 through HOME-07. Acceptance criteria that must be met
- `.planning/PROJECT.md` — Core value, design direction ("minimalist-futuristic"), out-of-scope items

### Prior Phase Context
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md` — Phase 1 decisions: dark-only monochrome palette (#0D0D0D bg, #F5F5F5 text), Geist + Inter fonts, transparent→frosted-glass Navbar, animated underline nav hover, forwardRef on all UI atoms, Button component variants
- `.planning/phases/02-animation-infrastructure/02-CONTEXT.md` — Phase 2 decisions: fade-up + clip-reveal scroll animations, stagger children, re-animate on scroll, hero parallax (10-20% speed diff), crossfade page transitions, button scale hover, ProjectCard image zoom + overlay hover

### Existing Components
- `components/ui/Button.tsx` — Primary/ghost/destructive variants with forwardRef, hover scale effect
- `components/ui/ProjectCard.tsx` — Image card with zoom + dark overlay + title reveal on hover. Props: imageSrc, imageAlt, title, category, href, priority
- `components/animation/` — useFadeUp, useClipReveal, useStagger, useHeroParallax hooks with data-attribute API
- `components/providers/LenisProvider.tsx` — Smooth scroll provider already initialized
- `app/globals.css` — Design tokens, animation initial states (data-fade-up, data-clip-reveal, data-stagger-child)

### Out-of-Scope Guardrails
- `.planning/REQUIREMENTS.md` Out of Scope table — No auto-rotating carousels/sliders, no stock photography, no excessive parallax (hero only)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ProjectCard` component: Ready to use directly for featured projects grid. Already has image zoom + overlay hover with title/category reveal. Accepts `href` for link-through. Uses `forwardRef` for GSAP composition.
- `Button` component: Primary variant for CTA buttons. Already has hover scale + shadow effect. Ghost variant available for secondary actions.
- Animation hooks: `useFadeUp`, `useClipReveal`, `useStagger` for scroll-triggered section entrances. `useHeroParallax` for hero background depth effect. All use data-attribute API pattern.
- `cn()` utility in `lib/utils.ts` for conditional class composition.

### Established Patterns
- `"use client"` directive required on all interactive/animated components
- `forwardRef` on all UI components for GSAP/Motion composition
- Tailwind CSS v4 with @theme tokens — use existing spacing (xs through 5xl), surface colors, text colors
- Data-attribute animation API: `[data-fade-up]`, `[data-clip-reveal]`, `[data-stagger]` + `[data-stagger-child]`
- `prefers-reduced-motion` handling via CSS fallbacks in globals.css + LenisProvider skip

### Integration Points
- `app/page.tsx` — Currently a placeholder. This phase replaces it with the full home page.
- `app/template.tsx` — Page transitions already configured (enter-only fade)
- Navbar already has transparent → frosted-glass scroll behavior — hero section relies on this for above-the-fold visual
- `next/image` for all project photography — use `priority` on above-fold hero image

</code_context>

<specifics>
## Specific Ideas

- Visual reference: Linear.app, Vercel.com aesthetic — near-black backgrounds, white type, high-contrast editorial feel (carried from Phase 1)
- ProjectCard already implements the exact hover pattern decided in Phase 2 (D-09): image scales 1.05x with dark gradient overlay revealing title/CTA
- Hero should leverage the full-viewport cinematic feel — the transparent Navbar from Phase 1 means the hero photo extends behind the nav for maximum visual impact
- Client logos in full color is a deliberate choice — the monochrome site makes the client logos pop as visual proof points
- Count-up stats are a key credibility moment — should feel impactful, not gimmicky

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-home-page*
*Context gathered: 2026-03-24*
