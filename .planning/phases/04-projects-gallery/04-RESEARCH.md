# Phase 4: Projects Gallery - Research

**Researched:** 2026-03-28
**Domain:** Next.js App Router dynamic routes, Motion v12 layout animations, masonry CSS, next/image optimization
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Masonry-style grid layout with mixed visual interest — matches Awwwards construction portfolio patterns
- **D-02:** Horizontal pill/tab bar above grid for category filtering — standard gallery UX, client-side filtering via React state
- **D-03:** 5 categories matching service types: Commercial Fit-outs, Residential Fit-outs, Maintenance, Repair Services, Property Management + "All" default tab
- **D-04:** Framer Motion `AnimatePresence` + `layoutId` for smooth card reflow on filter change — cards animate in/out gracefully
- **D-05:** Dynamic route `app/projects/[slug]/page.tsx` — each project gets its own URL for SEO and shareability
- **D-06:** Detail page layout: full-width hero image + project info sidebar (name, category, sqm, scope description) + additional images grid below
- **D-07:** Static `data/projects.ts` array shared between gallery page, home featured section, and detail pages — single source of truth for all project data
- **D-08:** 3-4 placeholder images per project shown in a grid below the hero — user replaces with real photography later
- **D-09:** `next/image` with `placeholder="blur"` + `blurDataURL` (tiny base64), AVIF/WebP auto-format via next.config — per CLAUDE.md spec
- **D-10:** Show all projects immediately on gallery page (6-12 items) — no pagination needed for this project count, static data renders fast
- **D-11:** Uniform 4:3 aspect ratio for gallery cards (consistent with existing ProjectCard from Phase 3)
- **D-12:** Detail page hero: full-width, 60vh max-height with `object-cover` — cinematic without pushing content below fold

### Claude's Discretion
- Exact masonry grid implementation approach (CSS columns vs grid auto-rows)
- Number of projects in full gallery (expand beyond the 6 featured, or keep at 6)
- Project slug generation convention
- Detail page sidebar layout specifics (left vs right sidebar)
- Additional image grid columns (2-col vs 3-col)
- Placeholder project descriptions and scope text
- Filter pill styling (colors, active state, hover effects)
- Back-to-gallery navigation pattern on detail pages
- `generateStaticParams` for static generation of all project detail pages
- Mobile layout adaptations for detail page hero + sidebar

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROJ-01 | Visitor can view a full project gallery page displaying all CLMC projects as image cards | data/projects.ts → gallery page with existing ProjectCard component |
| PROJ-02 | Visitor can filter the project gallery by category (e.g. residential, commercial, government, infrastructure) | React useState for active category + Motion AnimatePresence layout animations |
| PROJ-03 | Each project card displays a high-quality image, project name, and brief descriptor | Existing ProjectCard has imageSrc, imageAlt, title, category, meta props — already handles this |
| PROJ-04 | Visitor can open a dedicated per-project detail page with extended project information (scope, description, additional images) | app/projects/[slug]/page.tsx with generateStaticParams from projects array |
| PROJ-05 | Featured projects section on the Home page links through to the full Projects page | Update FeaturedProjectsSection to import from data/projects.ts; update each ProjectCard href to /projects/[slug] |
</phase_requirements>

---

## Summary

Phase 4 builds on a solid foundation: the `ProjectCard` component, GSAP animation hooks, and design system are all established. The primary new work is: (1) creating a shared `data/projects.ts` data layer, (2) building the interactive gallery page with category filtering, (3) implementing per-project dynamic routes with `generateStaticParams`, and (4) updating `FeaturedProjectsSection` to consume the shared data and link to individual project pages.

The Motion v12 library (already installed as `motion@12.38.0`) provides `AnimatePresence` and the `layout` prop which together handle animated card reflow when filters change. The key pattern is: filter the array in React state, render only matching items inside `AnimatePresence`, and add `layout` to each `motion.div` wrapper so surviving cards smoothly reposition. The `ProjectCard` component is already built with forwardRef — it needs a thin `motion.div` wrapper at the gallery level, not internal changes.

For the masonry appearance, CSS columns (`columns-1 md:columns-2 lg:columns-3` in Tailwind) is the correct choice over CSS Grid masonry, which has no stable browser support in 2026. CSS columns with `break-inside-avoid` produces the staggered visual height effect without any JavaScript. The tradeoff is that items flow top-to-bottom within each column rather than left-to-right across the grid — acceptable for a portfolio gallery where visual interest (not strict row ordering) is the goal. For the filtering animation, the masonry effect requires extra care: Motion's `layout` prop animates position changes, but CSS columns don't use explicit grid positions, so the animation is opacity-in/opacity-out rather than a positional reflow. This is fine and consistent with D-04's intent.

**Primary recommendation:** Build gallery page as a `"use client"` component with `useState` for active filter, CSS columns for masonry layout, `AnimatePresence` wrapping all card `motion.div` wrappers (each with a unique project-id `key`), and `generateStaticParams` on the detail page to pre-render all slugs at build time.

---

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.38.0 | AnimatePresence + layout prop for filter animations | Already installed; provides the animated reflow pattern locked in D-04 |
| next/image | built-in (Next 16.2.1) | Optimized images with blur placeholder, AVIF/WebP | Already configured in next.config.ts for AVIF+WebP; zero additional setup |
| React useState | built-in (React 19.2.4) | Client-side category filter state | No library needed; single state atom |
| generateStaticParams | built-in (Next.js) | Pre-render all /projects/[slug] pages at build time | Replaces getStaticPaths; returns slug array from projects data |

### No New Packages Required
All required libraries are already installed. This phase adds no new dependencies.

**Version verification (verified 2026-03-28):**
- `motion@12.38.0` — confirmed in package.json
- `next@16.2.1` — confirmed in package.json (generateStaticParams available since Next 13)

---

## Architecture Patterns

### Recommended Project Structure (new files only)
```
data/
└── projects.ts              # Single source of truth: Project[] array

app/
└── projects/
    ├── page.tsx             # Gallery page — "use client" for filter state
    └── [slug]/
        └── page.tsx         # Detail page — Server Component with generateStaticParams

components/
└── sections/
    └── ProjectsGallery.tsx  # Client component: filter pills + masonry grid
```

### Data Layer: data/projects.ts

The `FEATURED_PROJECTS` array in `FeaturedProjectsSection.tsx` must be extracted and extended into a shared module. Every project needs a `slug` field for the dynamic route.

**Slug convention (Claude's Discretion):** Use the existing `id` field as the slug directly. It's already kebab-case (e.g., `'auctane'`, `'phirst-park'`) and matches URL conventions. No separate slug generation needed — `id === slug`.

**Project data shape:**
```typescript
// Source: derived from existing FeaturedProjectsSection FEATURED_PROJECTS
// data/projects.ts
export interface Project {
  id: string          // also the URL slug
  title: string
  category: ProjectCategory
  meta?: string       // sqm or scope summary shown on card
  description: string // extended scope text for detail page
  imageSrc: string    // hero + gallery card image
  imageAlt: string
  additionalImages?: string[]  // 3-4 images for detail page grid
  featured?: boolean  // controls inclusion in FeaturedProjectsSection (first 6 featured: true)
}

export type ProjectCategory =
  | 'Commercial Fit-outs'
  | 'Residential Fit-outs'
  | 'Maintenance'
  | 'Repair Services'
  | 'Property Management'

export const ALL_CATEGORIES: ProjectCategory[] = [
  'Commercial Fit-outs',
  'Residential Fit-outs',
  'Maintenance',
  'Repair Services',
  'Property Management',
]

export const projects: Project[] = [
  // ... 6 existing projects from FeaturedProjectsSection + any additions
]

export const featuredProjects = projects.filter(p => p.featured)
```

### Pattern 1: Client-Side Category Filtering with AnimatePresence

**What:** React `useState` holds the active category. Filtered array is derived inline. `AnimatePresence` on the card container + `motion.div` wrapper on each card (with `layout` prop) animates cards in/out.

**When to use:** Small static datasets (6-12 items) where no server round-trip is needed.

**The correct Motion pattern for filter animations:**
```tsx
// Source: https://motion.dev/docs/react-animate-presence + https://motion.dev/docs/react-layout-animations
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects, ALL_CATEGORIES, type ProjectCategory } from '@/data/projects'

export function ProjectsGallery() {
  const [active, setActive] = useState<ProjectCategory | 'All'>('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-sm mb-3xl">
        {(['All', ...ALL_CATEGORIES] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={/* active state styling */ '...'}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid — CSS columns */}
      {/* AnimatePresence with mode="popLayout" handles exit animations
          without blocking the reflow of remaining items */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-lg">
        <AnimatePresence mode="popLayout">
          {filtered.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="break-inside-avoid mb-lg"
            >
              <ProjectCard
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                category={project.category}
                meta={project.meta}
                href={`/projects/${project.id}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
```

**Critical detail:** `mode="popLayout"` on `AnimatePresence` removes the exiting element from layout flow immediately, so remaining cards reflow while the card fades out in place. This is the correct mode for grid/masonry filtering (not the default `"sync"` mode).

**Critical detail:** `key={project.id}` must use the stable project id, not the array index. Motion's AnimatePresence tracks element identity by key — using index causes all cards to re-animate on every filter change.

### Pattern 2: generateStaticParams for Detail Pages

**What:** Export `generateStaticParams` from the detail page that returns all project slugs. Next.js pre-renders each `/projects/[slug]` at build time.

**When to use:** All static data-driven dynamic routes — avoids on-demand rendering for content that never changes.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params (verified 2026-03-28, Next 16.2.1)
// app/projects/[slug]/page.tsx
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }))
}

// Prevent 404 fallback for unrecognized slugs
export const dynamicParams = false

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find(p => p.id === slug)
  if (!project) notFound()
  // ...
}
```

**Critical detail:** In Next.js App Router (v13+), `params` is a `Promise` — it must be awaited. This changed from the pages router. The `async function` + `await params` pattern is required for Next 15+.

### Pattern 3: Detail Page Hero with Sidebar

**What:** Full-width hero image at 60vh max-height, project metadata in a sticky sidebar on desktop, additional images grid below.

**Layout structure (Claude's Discretion — right sidebar recommended):**
```tsx
// Server Component — no "use client" needed
<article>
  {/* Hero */}
  <div className="relative w-full" style={{ maxHeight: '60vh', height: '60vh' }}>
    <Image
      src={project.imageSrc}
      alt={project.imageAlt}
      fill
      className="object-cover"
      priority  // Above the fold — always add priority
      sizes="100vw"
    />
  </div>

  {/* Content: sidebar right on lg+, stacked below on mobile */}
  <div className="max-w-7xl mx-auto px-md md:px-2xl py-4xl">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4xl">
      {/* Main: description */}
      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {/* Additional images 2-col grid */}
        <div className="grid grid-cols-2 gap-lg mt-3xl">
          {project.additionalImages?.map((src, i) => (
            <div key={i} className="relative aspect-[4/3]">
              <Image src={src} alt={`${project.title} — image ${i + 2}`} fill className="object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
      {/* Sidebar: metadata */}
      <aside className="lg:sticky lg:top-[96px] self-start">
        <p>{project.category}</p>
        {project.meta && <p>{project.meta}</p>}
        {/* Back link */}
        <Link href="/projects">← All Projects</Link>
      </aside>
    </div>
  </div>
</article>
```

### Pattern 4: FeaturedProjectsSection Migration

**What:** Move the inline `FEATURED_PROJECTS` array out of `FeaturedProjectsSection.tsx` into `data/projects.ts`. Update each card's `href` to `/projects/${project.id}` instead of the current `/projects`.

**Before:**
```tsx
href="/projects"  // all cards link to the gallery index
```
**After:**
```tsx
href={`/projects/${project.id}`}  // each card links to its detail page
```
This satisfies PROJ-05 ("Featured projects section on the Home page links through to the full Projects page" — the intent is that clicking a featured project card goes to that project, not just the gallery index).

### Anti-Patterns to Avoid

- **Using array index as AnimatePresence key:** Motion tracks element identity by key. If you use index, every filter change re-animates every card because positions shift. Use `project.id` as key.
- **Placing `"use client"` on the detail page:** Detail pages are Server Components. Only the gallery page (filter interaction) needs `"use client"`.
- **Not awaiting params in the detail page:** Next.js App Router 15+ requires `const { slug } = await params`. Using `params.slug` directly (synchronous access) will cause a TypeScript error and runtime warning.
- **Importing from `gsap` directly:** Codebase enforces `@/lib/gsap` as the sole import. If GSAP is needed on any gallery animation, import from the canonical module.
- **Adding `layout` to the `ProjectCard` component itself:** Motion's `layout` prop should be on the wrapper `motion.div`, not on the inner component. ProjectCard is already a forwardRef component but is not a motion component — wrapping it externally keeps separation clean.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animated card exit/enter on filter | Custom CSS transition with display:none toggling | Motion AnimatePresence + layout | CSS transitions can't animate removal from DOM; AnimatePresence keeps exiting elements until their animation completes |
| Image format selection (AVIF/WebP) | Manual `<picture>` with `<source>` elements | next/image with `formats` config | next.config.ts already has `formats: ['image/avif', 'image/webp']` — next/image selects format automatically |
| Base64 blur placeholder generation | Python/ImageMagick scripts per image | Inline tiny base64 string or build-time `plaiceholder` | For placeholder images use a single gray-tone base64; for real photos use the `plaiceholder` package at build time (or use `blurDataURL` from a 10x10 resize) |
| Slug generation from titles | Custom slugify utility | Use existing `id` field from FEATURED_PROJECTS | Ids are already URL-safe kebab-case — no transformation needed |
| Masonry layout algorithm | JavaScript-based height balancing | CSS `columns` + `break-inside-avoid` | Pure CSS; no JS; browser handles column balancing; no CLS |

**Key insight:** The entire filtering UI is 30-40 lines of React + Motion. No state management library, no complex architecture — just `useState` + `AnimatePresence`.

---

## Common Pitfalls

### Pitfall 1: AnimatePresence children must be direct motion components
**What goes wrong:** Wrapping non-motion components in `AnimatePresence` does nothing — exit animations don't fire.
**Why it happens:** `AnimatePresence` only detects direct motion children. `ProjectCard` is a regular div/anchor, not a motion component.
**How to avoid:** Wrap each `ProjectCard` in a `motion.div` inside the `AnimatePresence`. The `motion.div` holds `initial/animate/exit` and the `ProjectCard` is a regular child inside it.
**Warning signs:** Items disappear instantly without animation when filter changes.

### Pitfall 2: CSS columns break `layout` prop positional animation
**What goes wrong:** Motion's `layout` prop animates elements from old position to new position via FLIP. CSS columns don't expose explicit grid positions, so the FLIP calculation can't map old → new positions correctly.
**Why it happens:** FLIP works on bounding rect deltas. In a columns layout, when items shift between columns, the bounding rect delta is unpredictable.
**How to avoid:** For masonry + filtering, rely on `opacity/scale` entrance/exit animations (not positional FLIP). The `layout` prop on each `motion.div` still helps when items reorder within the same column. Accept that cross-column reflow won't be smoothly interpolated — it will simply be instant + opacity fade.
**Warning signs:** Cards visually teleport or animate to wrong positions during filter changes.

### Pitfall 3: `params` must be awaited in Next.js 15+ detail pages
**What goes wrong:** `params.slug` throws a TypeScript type error and a Next.js runtime warning.
**Why it happens:** The App Router changed params from a plain object to a Promise in Next.js 15 (to support async rendering pipelines).
**How to avoid:** Always `const { slug } = await params` and mark the page function `async`.
**Warning signs:** TypeScript error: "Property 'slug' does not exist on type 'Promise<...>'".

### Pitfall 4: Missing `priority` on detail page hero image
**What goes wrong:** Hero image is the LCP element but loads lazily, causing LCP > 2.5s.
**Why it happens:** next/image lazy-loads by default. Above-fold images need `priority` to load eagerly.
**How to avoid:** Always add `priority` prop to the detail page hero `<Image>`. Gallery card images below the fold should NOT have `priority` (only the first 1-2 visible cards could get it).
**Warning signs:** Lighthouse LCP score drops on detail pages; "Image LCP element was lazy-loaded" warning in Lighthouse.

### Pitfall 5: FeaturedProjectsSection still uses inline data after migration
**What goes wrong:** Home page still shows old project data; PROJ-05 link still points to `/projects` not individual pages.
**Why it happens:** If `data/projects.ts` is created but `FeaturedProjectsSection.tsx` is not updated, two data sources drift out of sync.
**How to avoid:** Migration of `FeaturedProjectsSection` to consume `featuredProjects` from `data/projects.ts` must be a single atomic task in the plan — not split across waves.
**Warning signs:** Running TypeScript finds the old `FEATURED_PROJECTS` const still in `FeaturedProjectsSection.tsx` after the data layer task.

### Pitfall 6: blurDataURL placeholder for placeholder images
**What goes wrong:** `placeholder="blur"` throws a Next.js error if `blurDataURL` is not provided for non-statically-imported images (i.e., strings, not `import img from '...'`).
**Why it happens:** Static imports get blurDataURL automatically. String src paths require an explicit `blurDataURL`.
**How to avoid:** Provide a minimal base64 gray pixel as the default blurDataURL in the project data. A 1x1 gray pixel base64 string works: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`

---

## Code Examples

Verified patterns from official sources and existing codebase conventions:

### Filter Pills (active state with Tailwind design tokens)
```tsx
// Uses established design tokens from globals.css
<button
  onClick={() => setActive(cat)}
  className={cn(
    'px-md py-sm text-[13px] font-body font-bold uppercase tracking-[0.06em] rounded-full',
    'border transition-all duration-150 ease-out',
    active === cat
      ? 'bg-text-primary text-surface-primary border-text-primary'
      : 'bg-transparent text-text-secondary border-surface-border hover:border-text-secondary hover:text-text-primary'
  )}
>
  {cat}
</button>
```

### generateStaticParams with local data
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params (Next 16.2.1)
import { projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }))
}

export const dynamicParams = false
```

### Back to Gallery navigation
```tsx
// Uses buttonVariants (established pattern from Phase 3) and Link
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'

<Link href="/projects" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
  ← All Projects
</Link>
```

### data-fade-up on gallery page static content
```tsx
// Gallery page heading/subheading uses data-fade-up (established Phase 2 pattern)
// The section ref + useFadeUp hook handles scroll animation
<section ref={sectionRef}>
  <h1 data-fade-up>Our Projects</h1>
  <p data-fade-up>Browse our portfolio...</p>
  {/* ProjectsGallery client component handles its own filter state */}
  <ProjectsGallery />
</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package, import from `motion/react` | Mid-2025 (v11+) | Project uses `motion@12.38.0` — use `import { motion, AnimatePresence } from 'motion/react'` not `'framer-motion'` |
| `getStaticPaths` + `getStaticProps` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13 | Simpler API; runs at build time; no need for `fallback` config |
| `params.slug` (synchronous) | `const { slug } = await params` (async) | Next.js 15 | Required change — params is now a Promise in App Router |
| `tailwind.config.js` with `theme.extend` | `@theme {}` blocks in `globals.css` | Tailwind v4 | Already established in project; no tailwind.config needed |

**Deprecated/outdated:**
- `import { motion } from 'framer-motion'`: framer-motion package is the legacy name; project uses `motion` package. Import from `'motion/react'`.
- `AnimatePresence` with `exitBeforeEnter` prop: Replaced by `mode="wait"` in Motion v10+.

---

## Masonry Layout: CSS Columns vs Alternatives

**Decision (Claude's Discretion):** Use CSS columns.

| Approach | Browser Support | JS Required | Motion-compatible | Verdict |
|----------|----------------|-------------|-------------------|---------|
| CSS `columns` | Universal | No | Yes (opacity/scale only) | **Recommended** |
| CSS Grid `grid-template-rows: masonry` | Chrome 125+ flag only (2026) | No | Yes | Not viable — no stable support |
| JavaScript masonry (react-masonry-css) | Universal | Yes (extra dep) | Yes | Adds dependency; CSS is sufficient |
| CSS Grid auto-rows | Universal | No | Yes (FLIP works) | Regular grid — not masonry |

CSS columns with `break-inside-avoid` on each card is the only approach that works universally, requires zero JavaScript, and keeps the bundle unchanged. The visual result — cards at varied heights creating the staggered Awwwards look — is achieved naturally.

**Tailwind utility for columns:**
```
columns-1 md:columns-2 lg:columns-3 gap-lg
```
Each card wrapper: `break-inside-avoid mb-lg`

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test config files found in project root |
| Config file | None — Wave 0 must establish if automated testing is needed |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROJ-01 | Gallery page renders project cards | manual-only | `next build` passes without error | ❌ Wave 0 gap |
| PROJ-02 | Filter changes update displayed cards | manual-only | Visual browser check — React state + DOM update | N/A |
| PROJ-03 | Cards show image, title, category | manual-only | Inspect rendered DOM | N/A |
| PROJ-04 | Detail page renders at /projects/[slug] | manual-only | `next build` — generateStaticParams succeeds for all slugs | N/A |
| PROJ-05 | Featured project cards link to /projects/[slug] | manual-only | Click through in browser or `next build` link check | N/A |

**Justification for manual-only:** The project has no test infrastructure (no jest.config, no vitest.config, no test/ directory). All phase requirements are UI/visual behaviors best verified by `next build` success + browser inspection. Adding a test framework in this phase would be scope creep given there are no existing tests.

### Sampling Rate
- **Per task commit:** `next build` (catches TypeScript errors, broken imports, generateStaticParams failures)
- **Per wave merge:** `next build` + browser visual check of gallery + one detail page
- **Phase gate:** Full `next build` green + visual confirmation of all 5 filter categories working

### Wave 0 Gaps
- [ ] `data/projects.ts` — must exist before any other task can import from it (not a test file, but a prerequisite)

*(No test files needed — existing infrastructure is build-time TypeScript checking via `next build`)*

---

## Open Questions

1. **Real photography availability**
   - What we know: STATE.md notes "CLMC project photography availability and quality must be confirmed before Phase 4 begins"
   - What's unclear: Whether real photos are available for the placeholder `imageSrc` paths, or if placeholder.jpg stays for the full phase
   - Recommendation: Plan assumes `/images/project-placeholder.jpg` stays as imageSrc for all projects; real photos can be dropped in place later without code changes since the data shape supports it

2. **How many total projects to include**
   - What we know: 6 projects exist in FeaturedProjectsSection; Claude's Discretion says to decide
   - What's unclear: Whether there are more real CLMC projects to add
   - Recommendation: Start with the existing 6, mark all as `featured: true`. The data shape allows easy addition later. Gallery shows all 6 which is sufficient for D-10 ("Show all projects immediately").

3. **blurDataURL for placeholder images**
   - What we know: `placeholder="blur"` requires blurDataURL for string src paths
   - What's unclear: Whether the user has real photos that could use dynamic blur generation
   - Recommendation: Use a single static gray base64 blurDataURL constant defined in `data/projects.ts` for all projects during this phase.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs (v16.2.1) — generateStaticParams API, verified 2026-03-28: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- Motion official docs — AnimatePresence: https://motion.dev/docs/react-animate-presence
- Motion official docs — Layout animations: https://motion.dev/docs/react-layout-animations
- Existing codebase — `components/ui/ProjectCard.tsx`, `components/sections/FeaturedProjectsSection.tsx`, `app/globals.css`, `next.config.ts`, `package.json` (all read directly)

### Secondary (MEDIUM confidence)
- CSS-Tricks — Masonry layout browser support status: https://css-tricks.com/masonry-layout-is-now-grid-lanes/
- MDN — CSS Grid masonry: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout

### Tertiary (LOW confidence)
- WebSearch results on Motion v12 filter animation patterns — cross-verified against official docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified in package.json; no new installs
- Architecture: HIGH — generateStaticParams verified against Next.js 16.2.1 official docs; Motion patterns verified against motion.dev
- Pitfalls: HIGH — `await params`, blur placeholder requirement, AnimatePresence key rules all verified from official sources
- CSS columns masonry: HIGH — universal browser support, established CSS specification

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable APIs — Next.js, Motion, CSS columns are not fast-moving targets)
