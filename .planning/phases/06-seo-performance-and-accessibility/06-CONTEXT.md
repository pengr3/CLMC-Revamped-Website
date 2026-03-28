# Phase 6: SEO, Performance and Accessibility - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Add SEO metadata to every page, optimize performance for Core Web Vitals, and ensure WCAG 2.2 AA accessibility compliance across the entire site. This is the final phase before production launch on Vercel.

This phase does NOT add new features or pages — it hardens existing pages for production readiness.

</domain>

<decisions>
## Implementation Decisions

### SEO Metadata & Structured Data
- **D-01:** Next.js Metadata API — export `metadata` object from each `page.tsx` with unique title, description, and OG tags. Per CLAUDE.md spec.
- **D-02:** Single shared OG image (`/og-image.jpg`) as placeholder for all pages — user provides real branded image later.
- **D-03:** LocalBusiness JSON-LD schema markup in `app/layout.tsx` — CLMC company name, Philippine office address, phone, email. Satisfies SEO-02.
- **D-04:** `app/sitemap.ts` + `app/robots.ts` using Next.js built-in conventions for automatic sitemap generation and crawler directives.

### Performance Optimization
- **D-05:** Add `formats: ['image/avif', 'image/webp']` to `next.config.ts` images config. Audit all `next/image` usage for width/height/alt compliance.
- **D-06:** Verify `next/font` configuration from Phase 1 — no FOUT, font-display settings correct.
- **D-07:** Run bundle analysis to identify heavy client JS. Lazy-load heavy components with `dynamic()` if needed.
- **D-08:** Audit `priority` prop on all above-fold images (hero, first visible elements) — per CLAUDE.md spec.

### Accessibility (WCAG 2.2 AA)
- **D-09:** Full accessibility audit: semantic HTML (landmarks, heading hierarchy), keyboard navigation (focus order, focus trap in mobile menu), focus indicators, alt text on all images.
- **D-10:** Focus indicator: `focus-visible:ring-2 focus-visible:ring-text-primary` on all interactive elements — visible against dark backgrounds.
- **D-11:** Add "Skip to main content" link at top of `app/layout.tsx` — standard WCAG skip-navigation pattern.
- **D-12:** Verify `prefers-reduced-motion` is still respected across all new Phase 3-5 pages.

### Claude's Discretion
- Exact meta title and description text per page (placeholder copy)
- OG image dimensions and placeholder content
- JSON-LD specific field values (address, geo coordinates, opening hours)
- Sitemap priority values per route
- Robots.txt crawl rules specifics
- Which components get `dynamic()` lazy loading (if any)
- Skip link styling and positioning
- Heading hierarchy adjustments needed
- ARIA attributes to add (roles, labels, descriptions)
- Focus trap implementation details for mobile menu

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `next/font` already configured in `app/layout.tsx` (Phase 1)
- `prefers-reduced-motion` handling in `globals.css` and `LenisProvider` (Phase 1/2)
- `next/image` used across all project cards, hero sections, detail pages
- Dark theme with consistent `surface-primary` / `text-primary` tokens

### Established Patterns
- Server Components by default — metadata export is natural fit
- `app/layout.tsx` is the root layout — JSON-LD goes here
- All images already use `next/image` — audit is for compliance, not migration

### Integration Points
- Every `page.tsx` file needs metadata export added
- `app/layout.tsx` — JSON-LD script, skip link
- `next.config.ts` — image formats config
- `globals.css` — focus indicator styles
- `components/layout/Navbar.tsx` — mobile menu focus trap, skip link target

</code_context>

<specifics>
## Specific Ideas

- This phase is about hardening, not new features — minimal visual changes, maximum production readiness
- Meta descriptions should be compelling and mention CLMC + Philippines + construction for local SEO
- JSON-LD should use actual CLMC business data from the original site (https://clmc.com.ph/)
- Focus indicators must be visible on the dark background — white/light ring is essential
- Bundle size should be monitored but Phase 1 was already designed for minimal client JS

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 06-seo-performance-and-accessibility*
*Context gathered: 2026-03-28 via Smart Discuss*
