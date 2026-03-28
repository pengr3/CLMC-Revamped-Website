---
phase: 06-seo-performance-and-accessibility
plan: 01
subsystem: seo
tags: [next.js, metadata-api, open-graph, json-ld, sitemap, robots, accessibility, schema-org]

# Dependency graph
requires:
  - phase: 05-content-pages-and-contact
    provides: all page files that needed metadata exports
provides:
  - Next.js Metadata API coverage on all 10 pages with unique titles, descriptions, and OG tags
  - app/shared-metadata.ts with reusable sharedOG constants
  - LocalBusiness JSON-LD schema in root layout
  - sitemap.xml covering all static and dynamic project routes
  - robots.txt allowing all crawlers with sitemap reference
  - Skip to main content link in root layout for keyboard accessibility
affects: [seo, performance-audit, lighthouse, accessibility]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - sharedOG spread pattern: every page spreads sharedOG into its openGraph object to inherit the shared image without duplication
    - title template pattern: root layout sets template '%s | CLMC'; child pages use plain title string; home page uses absolute title to bypass template
    - generateMetadata for dynamic routes: project detail page uses async generateMetadata with awaited Promise<{ slug }> params

key-files:
  created:
    - app/shared-metadata.ts
    - app/sitemap.ts
    - app/robots.ts
    - public/og-image.jpg (placeholder, replace before launch)
  modified:
    - app/layout.tsx
    - app/page.tsx
    - app/about/page.tsx
    - app/about/ceo/page.tsx
    - app/services/page.tsx
    - app/projects/page.tsx
    - app/projects/[slug]/page.tsx
    - app/clients/page.tsx
    - app/clients/testimonials/page.tsx
    - app/contact/page.tsx
    - app/qms/page.tsx

key-decisions:
  - "sharedOG spread in every page openGraph object — openGraph is shallow-merged in Next.js, so each page must re-supply the image if it defines openGraph at all"
  - "Home page uses title: { absolute: '...' } to bypass the '%s | CLMC' template — only the home page needs this override"
  - "JSON-LD script placed after </LenisProvider> but inside <body> — renders in page source without blocking content"
  - "Skip link uses sr-only + focus-visible:not-sr-only pattern — invisible until keyboard focus, then visible as accessible landmark"
  - "public/og-image.jpg is a PNG-format placeholder — browser renders it fine; must be replaced with branded 1200x630 image before launch"

patterns-established:
  - "sharedOG pattern: import { sharedOG } from '@/app/shared-metadata' then spread into openGraph on every page"
  - "title template: root layout owns template, child pages set plain title string, home uses absolute title"

requirements-completed: [SEO-01, SEO-02]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 6 Plan 01: SEO Metadata Layer Summary

**Complete Next.js Metadata API coverage — LocalBusiness JSON-LD, title templates, OG tags on all 10 pages, sitemap.xml, robots.txt, and skip-to-content accessibility link**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T12:32:43Z
- **Completed:** 2026-03-28T12:36:10Z
- **Tasks:** 2
- **Files modified:** 15

## Accomplishments

- Root layout upgraded with metadataBase, title template, OG/twitter defaults, and LocalBusiness JSON-LD schema embedded as `<script type="application/ld+json">`
- All 10 page files now export unique metadata with title, description, and Open Graph tags via the `sharedOG` spread pattern
- Project detail page uses `generateMetadata` to generate per-project titles, descriptions, and OG images dynamically from project data
- sitemap.ts covers 9 static routes + all dynamic project routes; robots.ts allows all crawlers with sitemap URL reference
- Skip to main content link added to root layout for keyboard navigation accessibility

## Task Commits

Each task was committed atomically:

1. **Task 1: SEO infrastructure — shared-metadata, layout.tsx upgrades, sitemap, robots** - `9ab7726` (feat)
2. **Task 2: Add unique metadata with OG tags to all pages** - `3577321` (feat)

**Plan metadata:** (docs commit — created after self-check)

## Files Created/Modified

- `app/shared-metadata.ts` - Shared OG constants (siteName, images, locale) for spreading into every page
- `app/layout.tsx` - Added metadataBase, title template, OG/twitter defaults, JSON-LD LocalBusiness schema, skip link, id="main-content" on main
- `app/sitemap.ts` - Auto-generates sitemap covering all static + dynamic project routes
- `app/robots.ts` - Crawler directives, sitemap URL
- `public/og-image.jpg` - 1200x630 placeholder (TODO: replace with branded image before launch)
- `app/page.tsx` - Added metadata with absolute title and sharedOG spread
- `app/about/page.tsx` - Enhanced metadata with OG tags, fixed title to use template pattern
- `app/about/ceo/page.tsx` - Added OG tags, fixed title
- `app/services/page.tsx` - Added OG tags, fixed title
- `app/projects/page.tsx` - Added metadata export (was missing entirely)
- `app/projects/[slug]/page.tsx` - Added generateMetadata with dynamic per-project OG images
- `app/clients/page.tsx` - Added OG tags, fixed title
- `app/clients/testimonials/page.tsx` - Added OG tags, fixed title
- `app/contact/page.tsx` - Added OG tags, fixed title
- `app/qms/page.tsx` - Added OG tags, fixed title

## Decisions Made

- **sharedOG spread required on every page** — Next.js performs a shallow merge of openGraph, so each page that defines openGraph must re-spread `sharedOG` or it loses the OG image inherited from the root layout.
- **Home page uses `title: { absolute: '...' }`** — bypasses the `'%s | CLMC'` template to show full brand name as the browser tab title.
- **JSON-LD placed outside LenisProvider but inside body** — renders in source without interfering with scroll provider hierarchy.
- **`public/og-image.jpg` is a PNG-format placeholder** — browsers render it correctly regardless of extension; must be replaced with a real branded 1200x630 JPEG/PNG before launch.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Before launch:** Replace `public/og-image.jpg` with a real branded 1200x630 CLMC image. This image is referenced in every page's Open Graph tags and in the LocalBusiness JSON-LD schema.

## Next Phase Readiness

- All SEO-01 and SEO-02 requirements satisfied
- Foundation is ready for Plan 02: performance audit and accessibility sweep
- No blockers

---
*Phase: 06-seo-performance-and-accessibility*
*Completed: 2026-03-28*
