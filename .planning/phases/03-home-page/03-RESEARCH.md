# Phase 03: Home Page - Research

**Researched:** 2026-03-28
**Domain:** Next.js App Router page composition, GSAP scroll animations, CSS marquee, count-up animation, Tailwind CSS v4 layout
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Section**
- D-01: Center-aligned layout — brand statement + CTA stacked centered over full-bleed background image
- D-02: Full viewport height (100vh)
- D-03: Background image: eye-level completed building photography. Placeholder image until real photography available
- D-04: Dark gradient overlay from bottom (~50% upward). Photo stays vivid at top
- D-05: CTA button label: "Request for Inspection" — links to /contact page
- D-06: No scroll-down indicator — clean and minimal
- D-07: Headline uses CLMC's existing tagline — placeholder tagline until real one is provided
- D-08: No sub-tagline — headline + CTA only
- D-09: Hero parallax via existing `useHeroParallax` hook. Text fades out + drifts up on scroll. Mobile: simple fade-in, no parallax

**Featured Projects Section**
- D-10: 3-column equal grid on desktop, stacked on mobile. 6 projects total
- D-11: Uses existing `ProjectCard` component with image zoom + overlay hover effect
- D-12: Section heading "Featured Projects" with "View All →" link aligned right
- D-13: Cards show project name + category + sqm area on hover overlay
- D-14: Real project data — 6 specific projects provided (names, categories, sqm)
- D-15: Placeholder images until real project photography is provided

**Services Section**
- D-16: Icon + title + short description card grid. Thin white line icons (Lucide)
- D-17: All 5 services as individual cards: Commercial Fit-outs, Residential Fit-outs, Maintenance, Repair Services, Property Management
- D-18: Placeholder descriptions (1-2 sentences each)
- D-19: Each service card links to /services page

**Stats / Credibility Section**
- D-20: Animated count-up numbers triggered when scrolled into view
- D-21: Placeholder stats: "25+ Years Experience", "100+ Projects Completed", "500+ Clients Served"
- D-22: Subtle surface-secondary (#141414) background
- D-23: Separate section from services — clear visual break

**Client Logos Strip**
- D-24: Auto-scrolling horizontal marquee — CSS-only continuous loop animation
- D-25: Logos displayed in full original brand colors (not grayscale)
- D-26: Placeholder logo slots for now

**Inquiry CTA Section**
- D-27: Full-width banner, surface-secondary background. Bold headline + supporting line + "Request for Inspection" button
- D-28: CTA button links to /contact page

**Page Section Order**
- D-29: Hero → Featured Projects → Services → Stats → Client Logos → Inquiry CTA

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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Visitor sees a hero section with CLMC's brand statement, tagline, and a primary CTA button above the fold | Hero section component using existing Button + useHeroParallax hook |
| HOME-02 | Hero section features full-bleed cinematic project photography with parallax depth effect | useHeroParallax already built; next/image with priority prop for LCP optimization |
| HOME-03 | Home page includes a featured projects teaser section (3–6 selected projects) linking to the full Projects page | ProjectCard component already built; 3-col CSS grid with stagger animation |
| HOME-04 | Home page includes an overview of core services with brief descriptions | New ServiceCard component; Lucide icons (Building2, Sofa, Wrench, HardHat, Key); stagger animation |
| HOME-05 | Home page includes a company credibility section (years of experience, projects completed, key facts) | Count-up pattern using Intersection Observer + requestAnimationFrame; no extra library needed |
| HOME-06 | Home page includes a client logos strip as social proof | CSS-only marquee using keyframe animation; duplicated logo set for seamless loop |
| HOME-07 | Home page includes an inquiry CTA section prompting visitors to get in touch | Simple banner section using existing Button component and design tokens |
</phase_requirements>

---

## Summary

Phase 3 is primarily a **page composition phase**. Phases 1 and 2 already delivered the design system, all reusable UI atoms (`Button`, `ProjectCard`), all scroll animation hooks (`useFadeUp`, `useClipReveal`, `useStagger`, `useHeroParallax`), and the smooth scroll provider. This phase consumes those primitives to assemble six sections into `app/page.tsx`.

The two genuinely new technical challenges are: (1) the **count-up animation** for the stats section (no library installed for this — must be implemented with Intersection Observer + `requestAnimationFrame`, which is straightforward and lightweight), and (2) the **CSS marquee** for client logos (pure CSS keyframe animation, no JS required).

All other sections are direct compositions of existing components and design tokens. The `ProjectCard` component already implements the exact hover behavior required. The `Button` component already has the correct variants. The data-attribute animation API is already wired.

**Primary recommendation:** Structure `app/page.tsx` as a thin orchestrator that imports six section components. Each section component lives in `components/sections/` and is a `"use client"` component only when it requires animation hooks. The hero section requires the most care — it directly consumes `useHeroParallax` and the transparent Navbar from Phase 1 depends on hero content extending behind it.

---

## Standard Stack

### Core (already installed — no new installs required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.1 | App Router page, routing, next/image | Project framework |
| React | 19.2.4 | Component rendering | Ships with Next.js |
| TypeScript | 5.x | Type safety | Established in project |
| Tailwind CSS | 4.x | Layout, spacing, responsive grid | Established in project |
| GSAP + @gsap/react | 3.14.2 + 2.1.2 | Scroll animations via existing hooks | Established pattern |
| lucide-react | 0.577.0 | Service card icons | Already installed, thin line icons match design |
| motion | 12.38.0 | Page transition already configured | Established in template.tsx |

### No New Installs Required

All dependencies for this phase are already in `package.json`. The count-up animation uses native browser APIs (Intersection Observer + `requestAnimationFrame`). The marquee uses CSS keyframes.

---

## Architecture Patterns

### Recommended Project Structure

```
app/
└── page.tsx                    # Thin orchestrator — imports and renders section sequence

components/
└── sections/                   # New directory for full-page sections
    ├── HeroSection.tsx         # "use client" — useHeroParallax
    ├── FeaturedProjectsSection.tsx  # "use client" — useStagger
    ├── ServicesSection.tsx     # "use client" — useStagger
    ├── StatsSection.tsx        # "use client" — count-up via IntersectionObserver
    ├── ClientLogosSection.tsx  # Server Component — pure CSS marquee, no JS
    └── InquiryCTASection.tsx   # Server Component — static content
```

`app/page.tsx` stays a Server Component (no `"use client"`) — it just imports and sequences sections. Client JS is colocated with the section that needs it.

### Pattern 1: Hero Section Composition

**What:** Full-viewport section using three separate refs passed to `useHeroParallax`. Background image in one ref, text content in another, entire section in a third.

**When to use:** Whenever the parallax hook needs to animate background and text independently.

**Key detail:** The Navbar is transparent above the fold (Phase 1). The hero `<section>` must NOT have `pt-` padding added for the navbar — the hero content should be vertically centered accounting for the navbar height using a negative top offset or `calc(100vh)` height that compensates. The Phase 1 Navbar adds its own `fixed` positioning, so the hero can safely be `h-screen` with content centered via flexbox.

**Example:**
```typescript
// Source: Phase 2 — useHeroParallax signature
'use client'
import { useRef } from 'react'
import { useHeroParallax } from '@/components/animation/useHeroParallax'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useHeroParallax(heroRef, bgRef, textRef)

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background image layer */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-placeholder.jpg"
          alt="CLMC construction project"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay — bottom ~50% dark, top vivid — D-04 */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/40 to-transparent" />
      </div>
      {/* Text content layer */}
      <div ref={textRef} className="relative z-10 flex h-full flex-col items-center justify-center text-center px-md">
        <h1 className="font-display text-5xl font-bold text-text-primary">
          Building the Philippines Forward
        </h1>
        <Button asChild size="lg" className="mt-xl">
          <Link href="/contact">Request for Inspection</Link>
        </Button>
      </div>
    </section>
  )
}
```

**Note on Button + Link:** The current `Button` component renders a `<button>` element. For a link CTA, use an `<a>` wrapper or Next.js `<Link>` wrapping a `<button>`, OR pass `as="a"` if the component supports it. The current Button does NOT have an `asChild` prop — the simplest approach is to render `<Link href="/contact"><Button>Request for Inspection</Button></Link>`, which renders a button inside an anchor. This is accessible (button inside link is valid when button IS the link target). Alternatively, apply the Button's visual class names directly to a `<Link>` element using `cn()`.

### Pattern 2: Featured Projects Grid with Stagger

**What:** 3-column responsive grid using `data-stagger` + `data-stagger-child` attributes on `ProjectCard` wrappers. The `useStagger` hook wires ScrollTriggers automatically.

**When to use:** Any multi-card section where items should animate in sequentially on scroll.

**Key detail:** `ProjectCard` renders either an `<a>` (when `href` is provided) or a `<div>`. For the featured projects, always pass `href="/projects"` to get the link-through behavior from D-12. The `ProjectCard` does NOT accept a `data-stagger-child` prop — the stagger wrapper must wrap the `ProjectCard` elements in a parent `<div data-stagger>` with each card in a `<div data-stagger-child>`.

```typescript
// Stagger wrapper pattern around ProjectCard
<div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
  {projects.map((project) => (
    <div key={project.id} data-stagger-child>
      <ProjectCard {...project} />
    </div>
  ))}
</div>
```

**D-13 note:** ProjectCard already shows title + category on hover overlay. The "sqm area" from D-13 is NOT in the current `ProjectCard` props interface (`imageSrc`, `imageAlt`, `title`, `category`, `href`, `priority`). The sqm value must be appended to the `title` or `category` prop, OR the `ProjectCard` component needs a new optional `meta` prop. Recommend appending to title: e.g., `"AUCTANE 7 and 8 – 4,800 sqm"`.

### Pattern 3: Count-Up Stats (No Library)

**What:** Numbers animate from 0 to target value when the section scrolls into view. Triggered by Intersection Observer. Driven by `requestAnimationFrame`.

**When to use:** Numeric credibility stats that need visual impact on reveal.

**Why no library:** `react-intersection-observer` is NOT in `package.json`. Installing a count-up library for 3 numbers is wasteful. A hook with ~30 lines covers the full requirement.

```typescript
// Source: Native browser APIs — HIGH confidence
'use client'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration: number = 2000, enabled: boolean = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setCount(target)
      return
    }
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, enabled])

  return count
}
```

The Intersection Observer triggers `enabled` to flip true when the section enters viewport. This is a single-fire trigger (once in, always counted up — appropriate for credibility stats).

**Easing:** Cubic ease-out (decelerate to final number) feels more confident than linear. Duration 1800ms for numbers under 100, 2200ms for numbers over 100.

### Pattern 4: CSS Marquee (Client Logos)

**What:** Continuous horizontal scroll of logos using a CSS keyframe animation. No JS. Two identical sets of logos concatenated so the loop is seamless.

**Why CSS-only:** D-24 specifies CSS-only. No JS needed. Works even before hydration. Zero layout shift.

```css
/* Placed in globals.css or as a Tailwind @keyframes utility */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

```typescript
// ClientLogosSection — Server Component (no JS)
// Inner track contains logos × 2 for seamless loop
<div className="overflow-hidden">
  <div className="flex w-max animate-marquee gap-3xl">
    {[...logos, ...logos].map((logo, i) => (
      <div key={i} className="flex items-center justify-center h-12 w-32 shrink-0">
        {/* Placeholder: colored div block */}
        <div className="h-8 w-24 rounded bg-surface-tertiary" />
      </div>
    ))}
  </div>
</div>
```

**Speed guidance:** 30s for ~8-10 logos is comfortable. Too fast feels urgent; too slow defeats the purpose. Pause on hover is a nice touch but D-24 says CSS-only — skip for now.

**Tailwind v4 custom keyframe:** In Tailwind CSS v4, custom keyframes are registered in `globals.css` using `@keyframes` inside `@layer utilities` or directly in `@theme`. The `animate-marquee` class can be created using a Tailwind `@utility` rule:

```css
/* In globals.css */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@utility animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### Pattern 5: Service Card Component

**What:** New reusable card with Lucide icon, title, description, and link behavior. Not in the codebase yet — needs to be created.

**Icon recommendations per service (verified against installed lucide-react 0.577.0):**
| Service | Icon | Rationale |
|---------|------|-----------|
| Commercial Fit-outs | `Building2` | Multi-story commercial building |
| Residential Fit-outs | `Home` | Residential context |
| Maintenance | `Wrench` | Tool/maintenance |
| Repair Services | `Hammer` | Active repair work |
| Property Management | `KeyRound` | Keys = property access |

**Card structure:**
```typescript
// components/ui/ServiceCard.tsx
'use client' // NOT required — static content, make it a Server Component
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  className?: string
}
```

Service cards should NOT be `"use client"` — they are static content. The parent `ServicesSection` is `"use client"` for the stagger animation hook.

### Pattern 6: Section Layout Wrapper

**What:** Consistent padding and max-width applied to every section. Prevents inconsistent horizontal spacing.

**Recommended approach:** A simple `SectionWrapper` utility or just consistent class strings. Since Tailwind v4 is utility-first, a class string constant is cleaner than a wrapper component for a marketing site.

```typescript
// Consistent section padding pattern
const sectionBase = 'px-md md:px-2xl py-4xl'
const containerBase = 'max-w-7xl mx-auto'
```

### Anti-Patterns to Avoid

- **Animating the hero section background with GSAP from page.tsx:** All GSAP setup must be inside `useGSAP()` within a component that has `"use client"`. The hero component encapsulates this.
- **Using `next/link` inside `ProjectCard` when `href` is provided:** `ProjectCard` already handles `href` by rendering an `<a>` — do not add another `<Link>` wrapper around it.
- **Adding `"use client"` to `ClientLogosSection` or `InquiryCTASection`:** These sections are static. Keep them Server Components to minimize client JS.
- **Using `import` from `gsap` directly:** All project code imports from `@/lib/gsap`. The established pattern (Phase 2) is to never import from `gsap` directly.
- **Forgetting `priority` on the hero image:** Hero is the LCP element. Missing `priority` causes lazy loading and a failed LCP score.
- **Adding navbar height padding to hero:** The Navbar is `fixed` + transparent. The hero should be `h-screen` with content centered via flexbox — no top padding compensation needed at the section level. The Navbar floats over the hero.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Marquee animation | Custom JS scrolling loop | CSS `@keyframes` + `translateX` | No hydration, works before JS, zero bundle cost |
| Count-up numbers | `react-countup` or other library | Native `useEffect` + `requestAnimationFrame` | 3 numbers don't justify a package; native API handles easing cleanly |
| Scroll-triggered animations | Custom `IntersectionObserver` wiring per component | Existing `useFadeUp`, `useStagger`, `useClipReveal` hooks | Phase 2 already built and tested these; data-attribute API is consistent |
| Hero parallax | Custom GSAP timeline | Existing `useHeroParallax` hook | Phase 2 decision and implementation; do not duplicate |
| Image optimization | Manual srcset/WebP conversion | `next/image` with `priority` prop | Already project standard; handles AVIF/WebP automatically |
| Button styles | New button component | Existing `Button` component | Phase 1 established variants; ghost variant available for secondary CTAs |
| Icon library | SVG by hand | `lucide-react` (already installed) | Consistent stroke width, tree-shakeable, matches "thin white line" aesthetic |

**Key insight:** This phase is almost entirely composition. The infrastructure is done. Resist the urge to solve problems that are already solved.

---

## Common Pitfalls

### Pitfall 1: Hero Image and CLS (Cumulative Layout Shift)

**What goes wrong:** Hero image loads after text is already rendered, shifting layout.

**Why it happens:** `next/image` with `fill` needs a positioned parent. Without `position: relative` on the parent and an explicit height, the image has no dimensions to fill and causes CLS.

**How to avoid:** The hero section must be `relative` + `h-screen` (or `h-[100vh]`). The `<Image fill>` sits inside this positioned container. The gradient overlay is `absolute inset-0` over the image.

**Warning signs:** Lighthouse CLS score > 0.1; content visibly jumps on load.

### Pitfall 2: ProjectCard `href` vs Link Wrapping

**What goes wrong:** Nested anchor elements (`<a>` inside `<a>`) cause invalid HTML and broken click behavior.

**Why it happens:** `ProjectCard` with `href` already renders an `<a>` element. If the caller also wraps it in `<Link>`, the result is `<a><a>` — a DOM violation.

**How to avoid:** When using `ProjectCard` with `href`, do NOT also wrap it in `<Link>`. Pass `href` directly to the `ProjectCard` component prop.

### Pitfall 3: `data-stagger-child` on ProjectCard Directly

**What goes wrong:** The `useStagger` hook queries `[data-stagger-child]` elements and applies GSAP initial state. `ProjectCard` renders either a `<div>` or `<a>` — it does not forward arbitrary data attributes unless explicitly typed.

**Why it happens:** TypeScript will reject `data-stagger-child` on a component that does not spread `...props` to the root element. Looking at the `ProjectCard` code: it DOES accept `className` but does NOT spread all props, so `data-stagger-child` would be silently dropped.

**How to avoid:** Wrap each `ProjectCard` in a `<div data-stagger-child>` container. The stagger animation applies to the wrapper div, and the card animates as a unit.

### Pitfall 4: Count-Up Flashing on Hydration

**What goes wrong:** Server renders `0`, client hydrates with `0`, then Intersection Observer fires and animates up. No flash. BUT if the stat section is above the fold or immediately visible, the Observer fires before animation starts causing a momentary `0` state.

**Why it happens:** Intersection Observer fires asynchronously after mount. Initial render always shows `0`.

**How to avoid:** The stats section is below the fold (D-29 section order: position 4 of 6). This means IO will fire on scroll-in, not immediately. The `0` initial state will never be seen. Accept this as the correct behavior.

### Pitfall 5: Marquee Jumping at Loop Point

**What goes wrong:** The marquee appears to jump or snap when the animation loops.

**Why it happens:** The CSS `translateX(-50%)` technique works only if the track width is exactly double the visible logos. If the two logo sets are different widths (e.g., due to different image sizes), the loop point is off.

**How to avoid:** Use `w-max` on the flex container and ensure both logo arrays are identical (spread the same array twice). The `flex` + `gap` ensures consistent spacing regardless of logo widths.

### Pitfall 6: Button Inside Link Accessibility

**What goes wrong:** Screen readers and keyboards behave unexpectedly with nested interactive elements.

**Why it happens:** `<Link><Button>` renders `<a><button>` which is technically invalid HTML (interactive element inside interactive element).

**How to avoid:** For CTA buttons that are navigation links, use `<Link href="/contact" className={buttonVariantClasses}>Request for Inspection</Link>` — apply button styles to the anchor directly using `cn()` with the same classes from Button.tsx. The Button component's variant and size class strings can be imported and composed.

Alternatively: wrap `<Button>` in `<Link>` is widely used in Next.js projects and works in practice. Choose the approach consistently. Recommend: extract button class composition to a `buttonVariants()` helper (shadcn pattern) so it can be applied to both `<button>` and `<a>` elements.

---

## Code Examples

### Hero Gradient Overlay (D-04)

```typescript
// Source: Tailwind CSS v4 + design tokens from globals.css
// "bottom ~50% dark, top vivid"
<div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/50 to-transparent" aria-hidden="true" />
```

### Stagger Section Shell

```typescript
// Source: Phase 2 — data-attribute API pattern
'use client'
import { useRef } from 'react'
import { useStagger } from '@/components/animation/useStagger'

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useStagger(sectionRef)

  return (
    <section ref={sectionRef} className="py-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        {/* heading with data-fade-up */}
        <h2 data-fade-up className="font-display text-4xl font-bold text-text-primary mb-3xl">
          Our Services
        </h2>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {services.map((service) => (
            <div key={service.id} data-stagger-child>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Count-Up Hook with Intersection Observer

```typescript
// Source: Native browser APIs — no library required
'use client'
import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { count, ref }
}
```

Usage: `const { count, ref } = useCountUp(100, 2000)` → `<span ref={ref}>{count}+</span>`

### CSS Marquee in globals.css

```css
/* Add to globals.css after existing animation states */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@utility animate-marquee {
  animation: marquee 30s linear infinite;
}

/* Pause on reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none !important;
  }
}
```

### Section Heading with "View All" Link Pattern

```typescript
// Matches D-12 pattern: heading left, link right
<div className="flex items-baseline justify-between mb-3xl">
  <h2 data-clip-reveal className="font-display text-4xl font-bold text-text-primary">
    Featured Projects
  </h2>
  <a
    href="/projects"
    className="text-text-secondary text-sm font-body hover:text-text-primary transition-colors duration-150"
  >
    View All →
  </a>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Locomotive Scroll for smooth scroll | Lenis (already installed) | 2024 | Already implemented in Phase 2 |
| react-spring / framer-motion for count-up | Native rAF + IO | 2023+ | Smaller bundle, no dependency |
| CSS `overflow-x: scroll` with JS snap for logos | CSS `@keyframes` marquee | 2022 | No JS, no layout shift, simpler |
| `asChild` prop for polymorphic buttons (Radix) | `<Link><Button>` or className composition | Ongoing | Project does not use Radix — choose one pattern consistently |

**Deprecated/outdated (do not introduce):**
- `react-countup`: Extra dependency for trivial behavior; native rAF is sufficient
- `react-intersection-observer`: NOT installed; use native IntersectionObserver API directly
- Locomotive Scroll: Already replaced by Lenis in this project

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no test runner in package.json |
| Config file | None — Wave 0 gap |
| Quick run command | N/A until framework installed |
| Full suite command | N/A until framework installed |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HOME-01 | Hero renders brand statement + CTA above fold | smoke (visual) | Manual browser check | ❌ Wave 0 |
| HOME-02 | Hero shows full-bleed image + parallax on desktop | smoke (visual) | Manual browser check | ❌ Wave 0 |
| HOME-03 | 6 ProjectCards render with correct titles + /projects links | unit | N/A — no test framework | ❌ Wave 0 |
| HOME-04 | 5 service cards render with icons, titles, descriptions | unit | N/A — no test framework | ❌ Wave 0 |
| HOME-05 | Stats section shows 3 stat items, count-up triggers on scroll | smoke | Manual browser check | ❌ Wave 0 |
| HOME-06 | Client logos strip animates continuously | smoke (visual) | Manual browser check | ❌ Wave 0 |
| HOME-07 | Inquiry CTA section renders headline + /contact button | unit | N/A — no test framework | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` (TypeScript compilation + Next.js page build catches structural errors)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** `npm run build` green + manual browser walkthrough of all 6 sections before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No test framework installed — `npm install -D jest @testing-library/react @testing-library/jest-dom` if unit tests are desired
- [ ] Alternatively, Playwright for smoke/visual tests: `npm install -D @playwright/test`
- [ ] For this phase's scope (visual/animated marketing page), `npm run build` as compilation gate + manual browser verification is the practical testing strategy
- [ ] Consider deferring test framework installation to Phase 6 (performance + a11y phase) when systematic testing becomes critical

---

## Open Questions

1. **ProjectCard sqm display (D-13)**
   - What we know: `ProjectCard` accepts `title` and `category`. D-13 requires sqm area visible in hover overlay.
   - What's unclear: Whether sqm should be appended to `title`, added to `category`, or requires a new `meta` prop on `ProjectCard`.
   - Recommendation: Add an optional `meta` prop to `ProjectCard` (e.g., `meta?: string`) displayed below the title in the hover overlay. This is cleaner than string concatenation and keeps the data model clear.

2. **Button + Link pattern (CTA buttons)**
   - What we know: Hero CTA and Inquiry CTA both link to `/contact`. Current `Button` only renders `<button>`.
   - What's unclear: Whether to use `<Link><Button>` (nested interactive elements), or extract `buttonVariants` to apply to `<Link>`.
   - Recommendation: For this phase, use `<Link href="/contact"><Button as="span">Request for Inspection</Button></Link>` OR directly apply button classes to `<Link>`. The simplest correct approach: create a `buttonVariants` helper in `Button.tsx` (same pattern as shadcn/ui) that returns className strings, then `<Link href="/contact" className={buttonVariants({ variant: 'primary', size: 'lg' })}>`.

3. **Placeholder hero image**
   - What we know: D-03 specifies a placeholder until real photography is available.
   - What's unclear: The `public/` directory has no images yet. An external placeholder URL (like `https://placehold.co/1920x1080`) will fail `next/image` without domain allowlist in `next.config.ts`. A local placeholder SVG or a local JPEG in `/public/images/` is required.
   - Recommendation: Wave 0 task — create `/public/images/hero-placeholder.jpg` (a dark gradient JPEG) and `/public/images/project-placeholder.jpg` for project cards.

---

## Sources

### Primary (HIGH confidence)
- Existing codebase — components/animation/*.ts, components/ui/*.tsx, app/globals.css, lib/gsap.ts — read directly
- CONTEXT.md — 03-CONTEXT.md — all decisions locked and referenced
- MDN Web Docs — IntersectionObserver API, requestAnimationFrame — native browser APIs
- Tailwind CSS v4 `@utility` directive — official docs for custom utilities

### Secondary (MEDIUM confidence)
- lucide-react 0.577.0 — icon names verified by running `require('lucide-react')` against installed package
- CSS marquee `translateX(-50%)` seamless loop — widely documented pattern, verified conceptually

### Tertiary (LOW confidence)
- Count-up easing formula (cubic ease-out `1 - Math.pow(1 - progress, 3)`) — standard formula, implementation verified by logic review

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified from package.json in repo
- Architecture: HIGH — all hooks and components read directly from codebase
- Pitfalls: HIGH — derived from reading actual component source code (ProjectCard, Button, useStagger, useHeroParallax)
- Count-up pattern: HIGH — native browser APIs with well-known easing formula
- CSS marquee: HIGH — CSS `@keyframes` + `translateX` is a foundational technique

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable stack — 30 days reasonable)
