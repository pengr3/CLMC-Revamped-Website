# Phase 06: SEO, Performance and Accessibility - Research

**Researched:** 2026-03-28
**Domain:** Next.js 16 Metadata API, Core Web Vitals, WCAG 2.2 AA, JSON-LD schema
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Next.js Metadata API — export `metadata` object from each `page.tsx` with unique title, description, and OG tags. Per CLAUDE.md spec.
- **D-02:** Single shared OG image (`/og-image.jpg`) as placeholder for all pages — user provides real branded image later.
- **D-03:** LocalBusiness JSON-LD schema markup in `app/layout.tsx` — CLMC company name, Philippine office address, phone, email. Satisfies SEO-02.
- **D-04:** `app/sitemap.ts` + `app/robots.ts` using Next.js built-in conventions for automatic sitemap generation and crawler directives.
- **D-05:** Add `formats: ['image/avif', 'image/webp']` to `next.config.ts` images config. Audit all `next/image` usage for width/height/alt compliance.
- **D-06:** Verify `next/font` configuration from Phase 1 — no FOUT, font-display settings correct.
- **D-07:** Run bundle analysis to identify heavy client JS. Lazy-load heavy components with `dynamic()` if needed.
- **D-08:** Audit `priority` prop on all above-fold images (hero, first visible elements) — per CLAUDE.md spec.
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Each page has unique, optimised meta title, description, and Open Graph tags via Next.js Metadata API | Metadata API `title.template`, `openGraph`, `twitter`, `metadataBase` patterns; shared OG image via spread operator pattern |
| SEO-02 | Site includes LocalBusiness JSON-LD schema markup for Philippine search visibility | JSON-LD via `<script type="application/ld+json">` in `app/layout.tsx`; Schema.org LocalBusiness type; Christian Lacsamana as CEO from public record |
| PERF-01 | Site passes Core Web Vitals thresholds (LCP < 2.5s, CLS < 0.1) on desktop and mobile | `priority` prop audit on above-fold images; AVIF/WebP formats already configured in next.config.ts; `@next/bundle-analyzer` for JS weight; `next build` reports CWV-related metrics |
| PERF-02 | All pages fully responsive on mobile (375px+), tablet (768px+), desktop (1280px+) | deviceSizes already set in next.config.ts; Tailwind responsive prefix audit across all pages |
| PERF-03 | All images served via `next/image` with WebP/AVIF, correct srcset, and blur placeholders | Already using `next/image` everywhere; AVIF/WebP formats confirmed in next.config.ts; `BLUR_DATA_URL` constant established in data/projects.ts; hero images missing `placeholder="blur"` |
| A11Y-01 | All pages meet WCAG 2.2 AA baseline: semantic HTML, keyboard navigable, focus indicators, alt text | Skip link in layout.tsx; focus-visible ring on all interactive elements; landmark audit; heading hierarchy audit; `lang="en"` already on `<html>` |
</phase_requirements>

---

## Summary

Phase 6 is a hardening phase, not a feature phase. All six requirements are addressed through systematic audits and targeted additions to existing files — no new pages or complex components are required. The work divides into three streams that can execute in parallel: (1) SEO — metadata completion, JSON-LD, sitemap, robots; (2) Performance — image audit, bundle check, responsive verification; (3) Accessibility — skip link, focus indicators, heading hierarchy, ARIA.

The codebase is in excellent shape for this phase. Reviewing the existing files reveals that most pages already export `metadata`, `next/image` is used everywhere, focus traps and ARIA labels are already present in Navbar, and `prefers-reduced-motion` is handled globally in `globals.css`. The primary gaps are: `app/page.tsx` (home page) has no metadata export; no `sitemap.ts` or `robots.ts` exist yet; no `metadataBase` is set in the root layout so OG image URLs will fail to resolve as absolute URLs; no JSON-LD script exists; no skip link exists; and project detail pages lack `generateMetadata` so each dynamic route has the generic root layout title.

**Primary recommendation:** Complete the metadata layer first (it requires touching every page.tsx), then add the infrastructure files (sitemap, robots, JSON-LD, skip link), then do the image/accessibility audit sweep. All work is in existing files — no new dependencies are needed.

---

## Standard Stack

### Core (already installed — no new installs required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | built-in (16.2.1) | Meta tags, OG, Twitter cards, canonical, robots directives | Native App Router solution; TypeScript-typed; deduplicates across layout/page hierarchy; replaces next-seo |
| next/image | built-in (16.2.1) | AVIF/WebP delivery, srcset, LCP optimization | Already in use site-wide; formats config already correct |
| next/font | built-in (16.2.1) | Zero-FOUT font loading | Already configured in layout.tsx with `display: 'swap'` |
| Schema.org JSON-LD | none — inline script | LocalBusiness structured data | No library needed; plain JSON object in a `<script>` tag |

### Supporting (dev tooling — install only if bundle analysis is needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/bundle-analyzer | 16.2.1 | Visualize client JS bundle breakdown | Run once to validate no unexpected heavy chunks |

**Version verification (confirmed 2026-03-28):**

```bash
npm view @next/bundle-analyzer version  # 16.2.1
npm view next version                   # 16.2.1
```

**Bundle analyzer install (dev-only, optional):**

```bash
npm install --save-dev @next/bundle-analyzer
```

---

## Architecture Patterns

### Files to Create (new)

```
app/
├── sitemap.ts              # MetadataRoute.Sitemap — all static + dynamic routes
├── robots.ts               # MetadataRoute.Robots — allow all, reference sitemap
└── (og-image.jpg)          # Place in /public/og-image.jpg — 1200×630px placeholder
```

### Files to Modify (existing)

```
app/
├── layout.tsx              # Add: metadataBase, title template, JSON-LD <script>, skip link
├── page.tsx                # Add: metadata export (HOME page — currently missing)
├── projects/page.tsx       # Add: metadata export
├── projects/[slug]/page.tsx # Add: generateMetadata() per-project dynamic metadata
└── (all other pages)       # Verify/enhance OG fields on existing metadata exports
globals.css                 # Add: skip link show-on-focus rule + global focus-visible ring
```

### Pattern 1: Root Layout — metadataBase + title template + JSON-LD

Set `metadataBase` in the root layout so relative OG image paths resolve correctly. Use `title.template` so child pages only need to export a short title string.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL('https://clmc.com.ph'),
  title: {
    template: '%s | CLMC',
    default: 'CLMC — C. Lacsamana Management and Construction Corporation',
  },
  description: 'Premier construction management and consultancy firm in the Philippines.',
  openGraph: {
    siteName: 'CLMC',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CLMC' }],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
}
```

**Critical:** Without `metadataBase`, a relative path like `/og-image.jpg` in `openGraph.images` is invalid and Next.js throws a build-time error. Setting it once in `app/layout.tsx` propagates to all pages.

**Merge behavior:** Child page `openGraph` objects entirely replace the parent's `openGraph` (shallow merge). Pages that set their own `openGraph` must repeat the `images` field or they lose the OG image. Use a shared constant:

```typescript
// app/shared-metadata.ts  (new file)
export const sharedOG = {
  siteName: 'CLMC',
  images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CLMC' }],
  locale: 'en_PH',
}
```

Then in each page:
```typescript
import { sharedOG } from '@/app/shared-metadata'

export const metadata: Metadata = {
  title: 'Our Services',  // produces: "Our Services | CLMC" via template
  description: '...',
  openGraph: {
    ...sharedOG,
    title: 'Our Services',
    description: '...',
    url: '/services',
    type: 'website',
  },
}
```

### Pattern 2: Dynamic Project Pages — generateMetadata

The `app/projects/[slug]/page.tsx` must use `generateMetadata` (not static `metadata`) to generate per-project titles and descriptions from the project data.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/projects/[slug]/page.tsx (addition)

import { sharedOG } from '@/app/shared-metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) return {}

  return {
    title: project.title,
    description: `${project.title} — ${project.category} project by CLMC in the Philippines.`,
    openGraph: {
      ...sharedOG,
      title: project.title,
      description: `${project.title} — ${project.category} project by CLMC.`,
      url: `/projects/${slug}`,
      images: [{ url: project.imageSrc, width: 1200, height: 630, alt: project.imageAlt }],
      type: 'website',
    },
  }
}
```

Note: `params` must be `Promise<{ slug: string }>` and awaited — consistent with the existing page component pattern already in this file (confirmed in codebase review).

### Pattern 3: JSON-LD LocalBusiness Schema

Inject directly in `app/layout.tsx` as a `<script>` element — no library required. Place after the closing `</LenisProvider>` but inside `<body>`.

```typescript
// app/layout.tsx (addition to RootLayout)
// Source: https://schema.org/LocalBusiness

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'C. Lacsamana Management and Construction Corporation',
  alternateName: 'CLMC',
  url: 'https://clmc.com.ph',
  logo: 'https://clmc.com.ph/og-image.jpg',
  description:
    'Construction management and consultancy firm providing fit-out, maintenance, repair, and property management services in the Philippines.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Metro Manila',
    addressCountry: 'PH',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Philippines',
  },
  founder: {
    '@type': 'Person',
    name: 'Christian Lacsamana',
    jobTitle: 'President & CEO',
  },
  sameAs: [
    'https://www.facebook.com/p/CLMC-100086052146644/',
    'https://www.linkedin.com/company/c-lacsamana-mgmt-consultancy-and-engineering-services-clmc',
  ],
}

// In RootLayout JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Note on CLMC contact data:** The original website (clmc.com.ph) does not publicly expose a phone number, email address, or street address in the scraped content. The JSON-LD should use what is confirmed: company name, URL, Manila location, founder name (Christian Lacsamana — confirmed via LinkedIn public record in web search). Leave `telephone` and `email` fields as placeholders (`"[CLMC phone]"`, `"[CLMC email]"`) for the user to fill with real data before launch.

### Pattern 4: sitemap.ts

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// app/sitemap.ts

import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const BASE_URL = 'https://clmc.com.ph'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,               lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.8 },
    { url: `${BASE_URL}/about/ceo`,           lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.6 },
    { url: `${BASE_URL}/services`,            lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.9 },
    { url: `${BASE_URL}/projects`,            lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE_URL}/clients`,             lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.7 },
    { url: `${BASE_URL}/clients/testimonials`,lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.6 },
    { url: `${BASE_URL}/qms`,                 lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.4 },
    { url: `${BASE_URL}/contact`,             lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.8 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
```

Known project slugs (confirmed from `data/projects.ts`): `auctane`, `phirst-park`, `greenroom`, `pluxee`, `chiropractic`, `hvac`, `bgc-residential`, `makati-condo`, `building-facade`, `property-mgmt-ortigas`.

### Pattern 5: robots.ts

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// app/robots.ts

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://clmc.com.ph/sitemap.xml',
  }
}
```

### Pattern 6: Skip Link

The skip link must appear before everything else in `<body>`. Style it visually hidden by default, visible on focus. Target `id="main-content"` which requires adding that id to the `<main>` wrapper in `layout.tsx`.

```typescript
// app/layout.tsx — inside <body>, before <LenisProvider>
<a
  href="#main-content"
  className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:rounded-md focus-visible:bg-surface-primary focus-visible:px-md focus-visible:py-sm focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive-focus font-body text-sm"
>
  Skip to main content
</a>
```

And in `layout.tsx` RootLayout JSX:
```html
<main id="main-content">{children}</main>
```

**Note:** The current `app/layout.tsx` uses `<main>{children}</main>` without an id. Adding `id="main-content"` is the only change needed in that element.

### Pattern 7: Global Focus Indicator

The Button component already has `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive-focus`. The hamburger button in Navbar also has this. However, Links in nav, footer, and body text do not consistently have focus indicators. Add a global baseline in `globals.css` inside `@layer base`:

```css
/* globals.css — inside @layer base */
/* WCAG 2.4.11: minimum 2px perimeter, 3:1 contrast against adjacent colors */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-interactive-focus);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

This is a safety net. Components that already use Tailwind `focus-visible:outline-*` classes are not affected because Tailwind utility classes take specificity precedence when written inline.

### Anti-Patterns to Avoid

- **Setting OG images without metadataBase:** A relative `/og-image.jpg` in `openGraph.images` without `metadataBase` causes a build error in Next.js. Always set `metadataBase` first.
- **Overwriting OG image per page without spreading sharedOG:** Each page that sets `openGraph: { title: '...', description: '...' }` without including `images` will lose the OG image entirely — shallow merge replaces the whole object.
- **Using `<script>` for JSON-LD outside `<body>`:** Script tags with `dangerouslySetInnerHTML` work in Next.js Server Components. Place it in the layout's `<body>` after the navigation.
- **Using `metadata` export AND `generateMetadata` in the same file:** Next.js throws if both are present in the same `page.tsx` or `layout.tsx`.
- **Adding `id="main-content"` to `<main>` inside a page.tsx:** The id must be on the element that wraps ALL page content — i.e., on the `<main>` in `layout.tsx`, not the `<main>` inside individual pages (several pages add their own `<main>`, creating a nested `<main>` which is invalid HTML).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML writer or third-party `next-sitemap` npm package | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Built-in since Next.js 13.3; zero config; auto-updates on new routes; no extra dependency |
| OG meta tags | Custom `<head>` manipulation | `metadata` export / `generateMetadata` | Type-safe, deduplicated, streaming-aware, supported by Googlebot |
| Focus indicators | Custom JS focus management library | CSS `:focus-visible` + Tailwind `focus-visible:` variants | Native browser pseudo-class; correct behavior by default; no JS cost |
| JSON-LD structured data | Third-party schema library | Plain JSON object in `<script type="application/ld+json">` | No parsing overhead; Google reads it directly; no external dep |
| Bundle analysis | Manual chunk inspection | `@next/bundle-analyzer` | One-command visual map; same version as Next.js; reliable |

---

## Common Pitfalls

### Pitfall 1: Nested `<main>` Elements (Invalid HTML)

**What goes wrong:** Several page.tsx files already contain their own `<main>` element (e.g., `app/about/page.tsx`, `app/clients/page.tsx`, `app/contact/page.tsx`, `app/services/page.tsx`, `app/projects/[slug]/page.tsx`, `app/qms/page.tsx`). The `app/layout.tsx` also wraps children in `<main>`. This creates `<main><main>...</main></main>` — invalid HTML that confuses screen readers.

**Why it happens:** Each page was built in isolation across phases 3-5 without a global audit.

**How to avoid:** The root layout's `<main id="main-content">` should be the single `<main>` landmark. Convert the `<main>` wrappers inside individual page.tsx files to `<div>` or a `<section>` with an appropriate label. Alternatively, remove the `<main>` from `layout.tsx` and keep it in each page (but then the skip link target must also move per-page — more complex). **Recommended approach:** Keep `<main id="main-content">` in `layout.tsx`; change page-level `<main>` tags to `<div>` with equivalent styling.

**Warning signs:** HTML validators report "duplicate landmark", axe DevTools reports "landmark-no-duplicate-main".

### Pitfall 2: OG Image 404 Without metadataBase

**What goes wrong:** `openGraph.images` with a relative path like `/og-image.jpg` throws a build-time error: "invalid URL" because Next.js requires an absolute URL for OG images.

**Why it happens:** `metadataBase` is not yet set in `app/layout.tsx` — the current metadata object only has `title` and `description`.

**How to avoid:** Add `metadataBase: new URL('https://clmc.com.ph')` to the root layout metadata. Then relative paths are resolved automatically.

### Pitfall 3: Home Page Has No Metadata Export

**What goes wrong:** `app/page.tsx` (the home page — the most important SEO page) has no `metadata` export at all. It falls back to the root layout default, meaning Google sees the generic title and description for every shared-crawler preview.

**Why it happens:** Was not added during Phase 3 home page build.

**How to avoid:** Add a full `metadata` export to `app/page.tsx` with a home-page-specific title (using `title.absolute` to bypass the template) and the strongest SEO description targeting CLMC's market position.

### Pitfall 4: Project Detail Pages Use Generic Title

**What goes wrong:** `app/projects/[slug]/page.tsx` has no `metadata` export. Every project detail page shows "CLMC — C. Lacsamana Management and Construction Corporation" as its title — identical to the root. This misses the SEO value of individual project names.

**Why it happens:** Dynamic metadata with `generateMetadata` requires accessing `params` as an async prop — more complex than a static export.

**How to avoid:** Add `generateMetadata` to the project detail page. The pattern matches the existing `params: Promise<{ slug: string }>` typing already used in the page component.

### Pitfall 5: WCAG 2.4.11 — Focus Not Meeting Minimum Contrast

**What goes wrong:** The current `interactive-focus` color token is `rgba(255, 255, 255, 0.80)`. Against the dark background `#0D0D0D`, the contrast ratio is approximately 16:1 — this is well above the 3:1 minimum. However, links within body text sections that have no explicit `focus-visible` class still render the browser default outline, which may be invisible on dark backgrounds in some browsers.

**How to avoid:** The global `a:focus-visible` CSS rule in `globals.css` (Pattern 7 above) provides the safety net. No additional action needed for components already using the Tailwind utility classes.

### Pitfall 6: `prefers-reduced-motion` Scope for New Pages

**What goes wrong:** Pages added in Phase 3-5 use `data-fade-up`, `data-stagger-child`, and `data-clip-reveal` attributes that are wired by GSAP hooks. The global `globals.css` rule already handles this — those data attributes get `opacity: 1` and `transform: none` when `prefers-reduced-motion: reduce` is active. However, any component-level `motion.div` (Motion library) that uses `initial`/`animate` props will not automatically respect this.

**How to avoid:** Verify that Motion components across Phase 3-5 pages use `motion-safe:` Tailwind variants or check `useReducedMotion()` hook from Motion. This is a verification step, not a new implementation.

---

## Code Examples

### Complete metadata export — a typical page

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// Pattern for any static page (e.g., app/services/page.tsx)

import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'

export const metadata: Metadata = {
  title: 'Our Services',  // Produces: "Our Services | CLMC" via root layout template
  description:
    'Full-service construction and property management in the Philippines — interior fit-outs, building maintenance, repair, and facilities management by CLMC.',
  openGraph: {
    ...sharedOG,
    title: 'Our Services | CLMC',
    description:
      'Full-service construction and property management in the Philippines.',
    url: '/services',
    type: 'website',
  },
}
```

### Home page — absolute title bypassing template

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: {
    absolute: 'CLMC — Premier Construction & Management in the Philippines',
  },
  description:
    'C. Lacsamana Management and Construction Corporation delivers world-class construction management, interior fit-outs, and property services across the Philippines.',
  openGraph: {
    ...sharedOG,
    title: 'CLMC — Premier Construction & Management in the Philippines',
    description: 'C. Lacsamana Management and Construction Corporation...',
    url: '/',
    type: 'website',
  },
}
```

### Bundle analyzer setup (if needed)

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
  },
}

export default withBundleAnalyzer(nextConfig)
```

Run: `ANALYZE=true npm run build`

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-seo` package | Next.js Metadata API | Next.js 13.2 (2023) | No external dep; TypeScript-typed; works with RSC streaming |
| `sitemap.xml` static file | `app/sitemap.ts` function | Next.js 13.3 (2023) | Dynamic routes included automatically |
| `robots.txt` static file | `app/robots.ts` function | Next.js 13.3 (2023) | Programmatic; zero maintenance |
| `useReducedMotion` import from framer-motion | `useReducedMotion` from `motion` v11 | 2024 | Same API, lighter package (already in use) |
| `themeColor` / `viewport` in `metadata` | `generateViewport` export | Next.js 14 | Separate export; `themeColor` in `metadata` is now deprecated |

**Deprecated / outdated:**
- `themeColor` in the `metadata` object: deprecated since Next.js 14; use `generateViewport` if needed (not needed for this project).
- `react-intersection-observer` for accessibility: not needed here (already determined in Phase 2).

---

## Codebase Audit Findings

### Current State Summary (confirmed by file review 2026-03-28)

| File | Metadata Export | Gaps |
|------|-----------------|------|
| `app/layout.tsx` | Yes (generic title + description only) | Missing: `metadataBase`, `title.template`, `openGraph`, `twitter`, JSON-LD, skip link |
| `app/page.tsx` | **NO** | Add full metadata export |
| `app/about/page.tsx` | Yes | Missing: `openGraph`, `twitter` |
| `app/about/ceo/page.tsx` | Yes | Missing: `openGraph`, `twitter` |
| `app/services/page.tsx` | Yes | Missing: `openGraph`, `twitter` |
| `app/projects/page.tsx` | **NO** | Add full metadata export |
| `app/projects/[slug]/page.tsx` | **NO** | Add `generateMetadata` |
| `app/clients/page.tsx` | Yes | Missing: `openGraph`, `twitter` |
| `app/clients/testimonials/page.tsx` | Yes | Missing: `openGraph`, `twitter` |
| `app/contact/page.tsx` | Yes | Missing: `openGraph`, `twitter` |
| `app/qms/page.tsx` | Yes | Missing: `openGraph`, `twitter` |

### Infrastructure Gaps

| File | Status |
|------|--------|
| `app/sitemap.ts` | Does not exist — create |
| `app/robots.ts` | Does not exist — create |
| `app/shared-metadata.ts` | Does not exist — create |
| `/public/og-image.jpg` | Does not exist — create 1200×630 placeholder |

### Image Compliance

| Component | `priority` | `alt` | `placeholder="blur"` | `sizes` |
|-----------|-----------|-------|----------------------|---------|
| `HeroSection.tsx` | YES | YES | NO — missing `blurDataURL` (no placeholder src) | YES (100vw) |
| `ProjectCard.tsx` | YES (optional prop) | YES (from data) | NO | NO — missing |
| `ProjectDetailPage` (hero) | YES | YES (from data) | YES (`BLUR_DATA_URL`) | YES (100vw) |
| `ProjectDetailPage` (additional) | NO (correct) | Generic `${title} - image N` | YES | YES |

`HeroSection` has `priority` set correctly. The hero image is a local placeholder (`/images/hero-placeholder.jpg`) so `placeholder="blur"` requires `blurDataURL` prop — add `BLUR_DATA_URL` from `data/projects.ts` or use an inline base64 string. `ProjectCard` does not pass `sizes` — add `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

### Heading Hierarchy Audit

Most pages have correct `h1` → `h2` → `h3` hierarchy. One issue: `app/about/page.tsx` has `<AboutHeroSection>` (which renders `<h1>`) followed by inline JSX with `<h2>About Our Mission</h2>` — correct. However, the `<main>` in layout wraps the page's own `<main>`, which means the DOM has nested `<main>` elements. This needs to be resolved (see Pitfall 1).

### ARIA and Keyboard Navigation Audit

Already implemented (confirmed in Navbar.tsx):
- `aria-label` on nav elements
- `aria-current="page"` on active links
- `aria-expanded` / `aria-controls` on hamburger button
- `role="dialog"` / `aria-modal="true"` on mobile overlay
- Focus trap with Escape key and Tab boundary handling
- Focus returns to hamburger on close

Gaps:
- No skip link (must add)
- `<html lang="en">` is set correctly in `layout.tsx`
- ContactFormSection form fields: need `<label>` elements associated with inputs via `htmlFor` (audit needed)

---

## Open Questions

1. **CLMC production domain**
   - What we know: The site is deployed to `clmc.com.ph` based on the original site URL.
   - What's unclear: Whether the new revamped site will be deployed to the same domain, a subdomain, or a staging URL for v1 launch.
   - Recommendation: Use `https://clmc.com.ph` as `metadataBase` for now. If it deploys to a different domain, only `metadataBase` in `layout.tsx` needs updating — all relative paths will resolve correctly.

2. **ContactFormSection label/input association**
   - What we know: The form uses Formspree `useForm` hook; the input styling class is defined.
   - What's unclear: Whether `<label htmlFor>` is correctly associated with each `<input id>` in `ContactFormSection.tsx` (file was not fully read during research).
   - Recommendation: During accessibility audit wave, inspect this component and add `id` / `htmlFor` pairing where missing.

3. **Actual CLMC phone/email/address for JSON-LD**
   - What we know: The original site does not expose contact details in scraped HTML. Company is in Metro Manila. CEO is Christian Lacsamana.
   - What's unclear: The exact phone number, email, and street address.
   - Recommendation: Use placeholder values in JSON-LD and add a code comment instructing the user to fill in real contact data before launch.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — manual + Lighthouse CI |
| Config file | N/A |
| Quick run command | `npm run build && npm run start` then Lighthouse in Chrome DevTools |
| Full suite command | `ANALYZE=true npm run build` for bundle + Lighthouse for CWV |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | `<head>` contains unique title, description, og:title per page | Manual / Build check | `npm run build` (build errors if metadataBase missing) | N/A |
| SEO-02 | JSON-LD `<script>` present in page source | Manual DOM inspection | View source on `/` after `npm run build && npm start` | N/A |
| PERF-01 | LCP < 2.5s, CLS < 0.1 | Lighthouse | Chrome DevTools → Lighthouse → Mobile report | N/A |
| PERF-02 | No horizontal overflow at 375px | Manual / DevTools | Chrome DevTools responsive mode at 375px, 768px, 1280px | N/A |
| PERF-03 | `<img>` in DOM is served as AVIF/WebP | DevTools Network tab | Filter by Img type in Network panel | N/A |
| A11Y-01 | WCAG 2.2 AA baseline | axe DevTools / Lighthouse | Lighthouse Accessibility score ≥ 90; axe browser extension | N/A |

### Sampling Rate

- **Per task commit:** `npm run build` — catches TypeScript errors, missing metadata, invalid OG image URLs
- **Per wave merge:** `npm run build && npm start` + manual Lighthouse run on home page + axe scan on home/projects/contact
- **Phase gate:** All 6 requirements verified before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `public/og-image.jpg` — 1200×630px placeholder image; required before `npm run build` succeeds with OG image metadata
- [ ] `app/shared-metadata.ts` — shared OG constants consumed by all page metadata exports

*(No test framework installation needed — this phase is validated through Lighthouse, browser DevTools, and axe accessibility scanner.)*

---

## Sources

### Primary (HIGH confidence)

- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — metadata fields, metadataBase, openGraph, twitter, merge behavior (verified current: v16.2.1, 2026-03-25)
- [Next.js sitemap.xml file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — MetadataRoute.Sitemap interface, changeFrequency, priority fields (verified current: v16.2.1, 2026-03-25)
- [Next.js robots.txt file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) — MetadataRoute.Robots interface
- Codebase inspection (2026-03-28) — all app/**/*.tsx files, components/**/*.tsx, globals.css, next.config.ts, package.json

### Secondary (MEDIUM confidence)

- [W3C WCAG 2.2 — 2.4.11 Focus Appearance Minimum](https://www.w3.org/TR/WCAG22/) — 2px perimeter, 3:1 contrast minimum for focus indicators (AA)
- [W3C WAI — What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) — new AA criteria summary
- Web search (2026-03-28) — confirmed Christian Lacsamana as CEO via LinkedIn public record

### Tertiary (LOW confidence — for validation only)

- WebFetch of clmc.com.ph — company description confirmed; contact details not exposed publicly; address requires user to supply real data

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tooling is built into Next.js 16.2.1; verified against official docs
- Architecture: HIGH — metadata API, sitemap.ts, robots.ts patterns verified against official docs
- Codebase audit: HIGH — based on direct file reads, not assumptions
- WCAG requirements: HIGH — verified against W3C spec
- CLMC business data (phone/address): LOW — not publicly available; use placeholders

**Research date:** 2026-03-28
**Valid until:** 2026-06-28 (stable Next.js APIs; WCAG 2.2 is current spec)
