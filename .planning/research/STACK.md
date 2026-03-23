# Technology Stack

**Project:** CLMC Revamped Website
**Researched:** 2026-03-23
**Domain:** Futuristic minimalist marketing/portfolio website for a Philippine construction firm

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (App Router) | React framework, routing, SSG, image optimization | Project's explicit requirement; App Router enables React Server Components, which reduce client-side JS; built-in image + font optimization is critical for animation-heavy sites; native Metadata API removes need for third-party SEO packages |
| React | 19.x | UI rendering | Ships with Next.js 15; Concurrent features improve perceived performance alongside heavy animations |
| TypeScript | 5.x | Type safety | Eliminates class of runtime bugs; Next.js 15 types metadata, layout props, and image components natively |

**Confidence:** HIGH — These are the project-stated requirements confirmed against current Next.js 15 release docs.

---

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first styling | The CSS-first configuration in v4 eliminates tailwind.config.js; the new Oxide engine delivers 2-5x faster builds (600ms → 120ms on large projects); utility classes work naturally with React Server Components with zero JS styling overhead; pairs perfectly with animation libraries since layout is CSS-only |

**Why not CSS Modules:** Viable but slower iteration — Tailwind v4 achieves the same scoping benefit via `@layer components` and is faster to prototype the dense per-section styling that a marketing site requires.

**Why not styled-components / emotion:** Runtime CSS-in-JS adds layout-blocking JavaScript which directly harms Core Web Vitals, an unacceptable tradeoff for an animation-heavy site.

**Confidence:** HIGH — Tailwind v4 is stable and shipping; multiple production Next.js 15 guides confirm compatibility.

---

### Animation

This is the most consequential decision for CLMC. The project requires cinematic scroll-driven sequences, parallax, reveal transitions, and micro-interactions — all while preserving Core Web Vitals. The recommendation is a **deliberate split**: use both libraries for what each does best.

#### Primary: GSAP + ScrollTrigger

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GSAP | 3.x (latest) | Complex scroll-driven animations, timelines, cinematic sequences | GSAP ScrollTrigger is the industry standard for the class of animation CLMC requires: scroll-linked parallax, staggered reveals, pinned sections, and timeline-based sequences. Core library is ~23 KB gzipped. Handles thousands of simultaneous tweens without frame loss by operating outside React's render cycle. Used by virtually every Awwwards-winning site in the construction/architecture space |
| @gsap/react | 2.x | React integration via `useGSAP` hook | Required for proper App Router integration — centralizes GSAP registration, handles cleanup on component unmount/route change to prevent ScrollTrigger memory leaks (the most common GSAP bug in Next.js 15) |

**Critical GSAP/Next.js 15 pattern:** Animations must be initialized inside `useGSAP()`, not `useEffect()`. GSAP must be registered once in a single config module, not imported per-component. All ScrollTrigger instances are automatically cleaned up by `useGSAP` on unmount. Scrub animations (`scrub: true`) should be used judiciously — they create a continuous main-thread update stream that can cause scroll jank.

#### Secondary: Motion (Framer Motion)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| motion | 11.x | Component-level UI transitions: page enters/exits, modal/overlay animations, hover states, layout animations | Motion's declarative API (`<motion.div>`, `whileHover`, `AnimatePresence`) is far faster to implement for routine UI polish than writing GSAP timelines. The `m` + `LazyMotion` pattern reduces initial bundle contribution to ~4.6 KB. Use where GSAP's complexity is overkill |

**Why both, not one:** GSAP alone requires manual imperative code for every hover and transition — slow to build. Motion alone cannot match GSAP ScrollTrigger for pinned sections, stagger sequences, and pixel-precise scroll control. Award-level sites like those on Awwwards routinely use both.

**What NOT to use:**
- Locomotive Scroll — wrapper around virtual scroll that conflicts with native browser scroll behavior; maintenance has stalled; replaced by Lenis in 2024-2025
- react-spring — physics-first, excellent for micro-interactions but a poor fit for scroll-timeline control
- CSS animations alone — insufficient for the complexity required

**Confidence:** HIGH for GSAP, HIGH for Motion, MEDIUM for split-use pattern (evidence from multiple sources but requires careful architecture to avoid conflicts).

---

### Smooth Scroll

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Lenis | 1.x | Native-feeling smooth scroll | The current standard recommendation replacing Locomotive Scroll. Lightweight, uses native DOM structure (no virtual scroll), plays cleanly with GSAP ScrollTrigger by syncing scroll positions. Used by darkroom.engineering and adopted across top creative agencies in 2024-2025. Requires `"use client"` wrapper in Next.js App Router |

**Confidence:** MEDIUM-HIGH — Multiple credible sources confirm Lenis as the current go-to; GSAP's own forums document the integration pattern.

---

### Image Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/image | (built-in to Next.js 15) | Automatic WebP/AVIF conversion, responsive srcset, lazy loading, blur placeholders | The project gallery is the centrepiece of the site. next/image reduces 2 MB hero images to ~180 KB, cuts LCP from 4.2s to 1.8s, and eliminates CLS with reserved dimensions. Supports AVIF format in Next.js 15, which is 30-50% smaller than WebP. Zero configuration — transformative for performance with no extra install |

**Critical practices:**
- Add `priority` prop to all above-the-fold images (hero, first project card)
- Always specify `width` and `height` to prevent CLS
- Use `placeholder="blur"` with `blurDataURL` for project gallery images
- Configure `formats: ['image/avif', 'image/webp']` in `next.config.js`
- Set device sizes to cover common Philippine mobile screen resolutions

**Confidence:** HIGH — Official Next.js documentation, confirmed by multiple performance audits.

---

### Typography

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font | (built-in to Next.js 15) | Zero-layout-shift font loading | Eliminates FOUT (flash of unstyled text) by self-hosting Google Fonts at build time. Critical for a site where typography is a primary design element. Fonts are served from the same domain, no Google DNS lookup penalty |

**Recommended font pairing for futuristic minimalist direction:**
- **Display / headings:** Geist (Vercel's open-source sans — ultra-clean, modern, technical feel; available via `next/font/google` or locally via `next/font/local`) or DM Sans (geometric, architectural)
- **Body:** Inter (high legibility at all sizes, widely used in SaaS/tech-forward contexts)

**Why not:** Loading fonts via standard `<link>` tags blocks rendering; this is a measurable Core Web Vitals regression.

**Confidence:** HIGH for next/font; MEDIUM for specific font choices (aesthetic decision, not a technical one — the team may override).

---

### SEO

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | (built-in to Next.js 15) | Meta tags, Open Graph, Twitter cards, structured data, sitemap, robots.txt | The native Metadata API in the App Router is the 2025 replacement for next-seo. It provides TypeScript-typed metadata objects, automatic deduplication, template inheritance across layouts, and handles streaming correctly (third-party solutions have documented issues with React Server Components streaming). No additional dependency needed |

**Implementation:**
- Export a `metadata` object from each `page.tsx` for static pages
- Use `generateMetadata()` for any dynamic routes (e.g., individual project pages)
- Add `sitemap.ts` in the app directory for automatic sitemap generation
- Add `robots.ts` for crawler directives
- Add JSON-LD structured data (LocalBusiness schema) for the Philippine construction market

**Why not next-seo:** next-seo maintainers themselves recommend the built-in Metadata API for App Router projects. next-seo is currently suited for Pages Router only.

**Confidence:** HIGH — Confirmed by Next.js official docs and community consensus.

---

### Deployment

| Technology | Purpose | Why |
|------------|---------|-----|
| Vercel | Primary deployment target | Vercel is the company behind Next.js; the integration is first-class — Edge Network CDN, automatic image optimization on-demand, preview deployments per branch, built-in Core Web Vitals monitoring. For a v1 marketing site with static content, Vercel's free Hobby tier handles the traffic without cost. The site is SSG (static export), so no serverless function costs |

**Cost reality check:** CLMC is a construction firm website, not a high-traffic SaaS. Vercel's Hobby tier (free) supports the use case. Pro tier ($20/month) is only needed if the team wants password-protected preview links or more team seats.

**Alternative:** Netlify — feature-parity for static Next.js, slightly worse DX for Next.js-specific features. Reasonable fallback if Vercel is unavailable in the Philippines.

**Why not Cloudflare Pages:** Cloudflare Pages has limitations with Next.js App Router features (especially middleware and image optimization) that require workarounds. Not worth the complexity for a v1 marketing site.

**Confidence:** HIGH for Vercel; MEDIUM for Netlify as fallback.

---

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-intersection-observer | 9.x | Lightweight trigger for enter-viewport animations | Use as the trigger mechanism for scroll-reveal animations when you want a simple in-view boolean without the full weight of GSAP ScrollTrigger — e.g., fading in client logos, triggering count-up stats |
| clsx | 2.x | Conditional class name merging | Required when combining Tailwind classes conditionally (animation state classes, active states) |
| tailwind-merge | 2.x | Merges Tailwind classes without conflicts | Prevents duplicate/conflicting utility class output in component composition |

---

## Rendering Strategy

**Use:** Next.js App Router with Static Site Generation (SSG) via React Server Components.

All pages (Home, About, Services, Projects, Clients, QMS, Testimony) have **no dynamic data** — content is hard-coded for v1. Pages are rendered at build time to static HTML + assets and served from Vercel's CDN edge. This achieves:
- Sub-100ms TTFB globally via CDN
- Maximum Lighthouse scores since no server-side rendering at request time
- Zero cold starts

**Use `generateStaticParams`** for any future dynamic routes (e.g., individual project pages from a data array).

**Do NOT use `"use server"`** for any page content — all pages are pure RSC or client-only where animation libraries require it.

**Client boundary rule:** Components that use GSAP, Lenis, or Motion must be marked `"use client"`. Keep these components as leaf nodes to maximize the RSC surface area above them.

**Confidence:** HIGH — Standard pattern for static marketing sites on Next.js 15 App Router.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Styling | Tailwind CSS v4 | CSS Modules | Slower iteration, no utility composition benefit |
| Styling | Tailwind CSS v4 | styled-components | Runtime JS CSS — harms Core Web Vitals |
| Animation (scroll) | GSAP ScrollTrigger | CSS scroll-timeline | Limited browser support in 2025, no programmatic control |
| Animation (UI) | Motion v11 | React Spring | Physics-first, poor for timeline/scroll work |
| Smooth scroll | Lenis | Locomotive Scroll | Stalled maintenance, conflicts with native scroll behavior |
| Smooth scroll | Lenis | GSAP ScrollSmoother | Requires GSAP Club (paid), overkill |
| SEO | Next.js Metadata API | next-seo | next-seo is deprecated for App Router; extra dependency with no benefit |
| Deployment | Vercel | Cloudflare Pages | Next.js App Router image optimization conflicts |
| Fonts | next/font | Google Fonts CDN `<link>` | Blocks rendering, Google DNS lookup, FOUT |

---

## Installation

```bash
# Create project
npx create-next-app@latest clmc-website \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

# Animation stack
npm install gsap @gsap/react motion

# Smooth scroll
npm install lenis

# Utilities
npm install clsx tailwind-merge react-intersection-observer
```

**Note:** Tailwind CSS v4 is installed by default when using `create-next-app` with `--tailwind` as of early 2025. Verify the version — if it installs v3, upgrade manually:
```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

---

## Sources

- [Motion — GSAP vs Motion comparison](https://motion.dev/docs/gsap-vs-motion)
- [GSAP Community — ScrollTrigger with Next.js App Router](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/)
- [Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Lenis smooth scroll library](https://lenis.darkroom.engineering/)
- [Smooth Scrolling Libraries Comparison: Locomotive vs GSAP ScrollSmoother vs Lenis](https://www.borndigital.be/blog/our-smooth-scrolling-libraries)
- [Next.js Metadata API — official docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Tailwind CSS v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
- [Next.js — Getting Started with CSS](https://nextjs.org/docs/app/getting-started/css)
- [Next.js image optimization — DebugBear deep-dive](https://www.debugbear.com/blog/nextjs-image-optimization)
- [Vercel vs alternatives for Next.js hosting 2025](https://danubedata.ro/blog/best-vercel-alternatives-nextjs-hosting-2025)
- [next-seo vs built-in Metadata API — GitHub discussion](https://github.com/vercel/next.js/discussions/51392)
- [Awwwards landing page rebuild with Next.js, Framer Motion, and GSAP](https://blog.olivierlarose.com/tutorials/awwwards-landing-page)
- [Build smooth scroll landing page with Next.js, GSAP, Lenis](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)
