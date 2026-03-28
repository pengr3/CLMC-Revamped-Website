# Phase 4: Projects Gallery - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the full CLMC projects gallery page and per-project detail pages. Visitors can browse all projects as image cards, filter by category (client-side), and open dedicated detail pages with extended info and additional images. All images optimized with next/image blur placeholders.

This phase does NOT include contact form functionality (Phase 5), other content pages (Phase 5), or SEO metadata (Phase 6).

</domain>

<decisions>
## Implementation Decisions

### Gallery Layout & Filtering
- **D-01:** Masonry-style grid layout with mixed visual interest — matches Awwwards construction portfolio patterns
- **D-02:** Horizontal pill/tab bar above grid for category filtering — standard gallery UX, client-side filtering via React state
- **D-03:** 5 categories matching service types: Commercial Fit-outs, Residential Fit-outs, Maintenance, Repair Services, Property Management + "All" default tab
- **D-04:** Framer Motion `AnimatePresence` + `layoutId` for smooth card reflow on filter change — cards animate in/out gracefully

### Per-Project Detail Pages
- **D-05:** Dynamic route `app/projects/[slug]/page.tsx` — each project gets its own URL for SEO and shareability
- **D-06:** Detail page layout: full-width hero image + project info sidebar (name, category, sqm, scope description) + additional images grid below
- **D-07:** Static `data/projects.ts` array shared between gallery page, home featured section, and detail pages — single source of truth for all project data
- **D-08:** 3-4 placeholder images per project shown in a grid below the hero — user replaces with real photography later

### Image Optimization & Performance
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ProjectCard` component (`components/ui/ProjectCard.tsx`): Has imageSrc, imageAlt, title, category, meta, href, priority props. Uses forwardRef, 4:3 aspect ratio, image zoom + overlay hover. Already used by FeaturedProjectsSection.
- `buttonVariants` helper (`components/ui/Button.tsx`): For styled Link elements without nesting interactive elements.
- Animation hooks: `useFadeUp`, `useStagger` for scroll-triggered section entrances.
- `FeaturedProjectsSection` (`components/sections/FeaturedProjectsSection.tsx`): Contains `FEATURED_PROJECTS` array with 6 real CLMC projects — data to be moved to shared `data/projects.ts`.

### Established Patterns
- `"use client"` directive on interactive/animated components
- `forwardRef` on UI components for GSAP/Motion composition
- Tailwind CSS v4 with @theme tokens
- Data-attribute animation API: `[data-fade-up]`, `[data-stagger]` + `[data-stagger-child]`
- Server Components by default, client only where needed

### Integration Points
- `app/projects/page.tsx` — Currently a placeholder, will become the full gallery
- `app/projects/[slug]/page.tsx` — New dynamic route for detail pages
- `FeaturedProjectsSection` — Must be updated to import from shared `data/projects.ts` instead of inline array
- Home page "View All →" link already points to `/projects`
- Each featured ProjectCard already has `href="/projects"` — detail pages will give them proper individual URLs

</code_context>

<specifics>
## Specific Ideas

- ProjectCard component already implements the exact hover pattern needed for gallery cards — reuse directly
- The 6 projects from FeaturedProjectsSection should be the same data in the full gallery (single source of truth)
- Full-color client logos from home page set the precedent for vivid imagery — project gallery should feel equally rich
- Detail pages should feel like a mini case study — hero image creates the cinematic moment, sidebar gives the facts
- Filter animation should feel premium — smooth layout transitions, not jarring instant swaps

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-projects-gallery*
*Context gathered: 2026-03-28 via Smart Discuss*
