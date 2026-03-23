<!-- GSD:project-start source:PROJECT.md -->
## Project

**CLMC Revamped Website**

A full visual revamp of the C. Lacsamana Management and Construction Corporation (CLMC) website — a Philippine construction and management consultancy firm. The new site keeps the existing page structure but rebuilds it from the ground up with a minimalist-futuristic aesthetic: ultra-clean layouts, bold typography, rich scroll-driven animations, and a visually impressive project gallery. Built with React / Next.js.

**Core Value:** A stunning first impression that positions CLMC as the most forward-thinking construction firm in the Philippines — winning clients through prestige and credibility on every scroll.

### Constraints

- **Tech Stack**: React / Next.js (App Router) — user's explicit choice
- **Design**: Must feel genuinely unique in the construction industry — not a generic template
- **Content**: Retain existing page structure (same nav sections as original site)
- **Performance**: Rich animations must not compromise Core Web Vitals significantly
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (App Router) | React framework, routing, SSG, image optimization | Project's explicit requirement; App Router enables React Server Components, which reduce client-side JS; built-in image + font optimization is critical for animation-heavy sites; native Metadata API removes need for third-party SEO packages |
| React | 19.x | UI rendering | Ships with Next.js 15; Concurrent features improve perceived performance alongside heavy animations |
| TypeScript | 5.x | Type safety | Eliminates class of runtime bugs; Next.js 15 types metadata, layout props, and image components natively |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first styling | The CSS-first configuration in v4 eliminates tailwind.config.js; the new Oxide engine delivers 2-5x faster builds (600ms → 120ms on large projects); utility classes work naturally with React Server Components with zero JS styling overhead; pairs perfectly with animation libraries since layout is CSS-only |
### Animation
#### Primary: GSAP + ScrollTrigger
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GSAP | 3.x (latest) | Complex scroll-driven animations, timelines, cinematic sequences | GSAP ScrollTrigger is the industry standard for the class of animation CLMC requires: scroll-linked parallax, staggered reveals, pinned sections, and timeline-based sequences. Core library is ~23 KB gzipped. Handles thousands of simultaneous tweens without frame loss by operating outside React's render cycle. Used by virtually every Awwwards-winning site in the construction/architecture space |
| @gsap/react | 2.x | React integration via `useGSAP` hook | Required for proper App Router integration — centralizes GSAP registration, handles cleanup on component unmount/route change to prevent ScrollTrigger memory leaks (the most common GSAP bug in Next.js 15) |
#### Secondary: Motion (Framer Motion)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| motion | 11.x | Component-level UI transitions: page enters/exits, modal/overlay animations, hover states, layout animations | Motion's declarative API (`<motion.div>`, `whileHover`, `AnimatePresence`) is far faster to implement for routine UI polish than writing GSAP timelines. The `m` + `LazyMotion` pattern reduces initial bundle contribution to ~4.6 KB. Use where GSAP's complexity is overkill |
- Locomotive Scroll — wrapper around virtual scroll that conflicts with native browser scroll behavior; maintenance has stalled; replaced by Lenis in 2024-2025
- react-spring — physics-first, excellent for micro-interactions but a poor fit for scroll-timeline control
- CSS animations alone — insufficient for the complexity required
### Smooth Scroll
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Lenis | 1.x | Native-feeling smooth scroll | The current standard recommendation replacing Locomotive Scroll. Lightweight, uses native DOM structure (no virtual scroll), plays cleanly with GSAP ScrollTrigger by syncing scroll positions. Used by darkroom.engineering and adopted across top creative agencies in 2024-2025. Requires `"use client"` wrapper in Next.js App Router |
### Image Optimization
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/image | (built-in to Next.js 15) | Automatic WebP/AVIF conversion, responsive srcset, lazy loading, blur placeholders | The project gallery is the centrepiece of the site. next/image reduces 2 MB hero images to ~180 KB, cuts LCP from 4.2s to 1.8s, and eliminates CLS with reserved dimensions. Supports AVIF format in Next.js 15, which is 30-50% smaller than WebP. Zero configuration — transformative for performance with no extra install |
- Add `priority` prop to all above-the-fold images (hero, first project card)
- Always specify `width` and `height` to prevent CLS
- Use `placeholder="blur"` with `blurDataURL` for project gallery images
- Configure `formats: ['image/avif', 'image/webp']` in `next.config.js`
- Set device sizes to cover common Philippine mobile screen resolutions
### Typography
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font | (built-in to Next.js 15) | Zero-layout-shift font loading | Eliminates FOUT (flash of unstyled text) by self-hosting Google Fonts at build time. Critical for a site where typography is a primary design element. Fonts are served from the same domain, no Google DNS lookup penalty |
- **Display / headings:** Geist (Vercel's open-source sans — ultra-clean, modern, technical feel; available via `next/font/google` or locally via `next/font/local`) or DM Sans (geometric, architectural)
- **Body:** Inter (high legibility at all sizes, widely used in SaaS/tech-forward contexts)
### SEO
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | (built-in to Next.js 15) | Meta tags, Open Graph, Twitter cards, structured data, sitemap, robots.txt | The native Metadata API in the App Router is the 2025 replacement for next-seo. It provides TypeScript-typed metadata objects, automatic deduplication, template inheritance across layouts, and handles streaming correctly (third-party solutions have documented issues with React Server Components streaming). No additional dependency needed |
- Export a `metadata` object from each `page.tsx` for static pages
- Use `generateMetadata()` for any dynamic routes (e.g., individual project pages)
- Add `sitemap.ts` in the app directory for automatic sitemap generation
- Add `robots.ts` for crawler directives
- Add JSON-LD structured data (LocalBusiness schema) for the Philippine construction market
### Deployment
| Technology | Purpose | Why |
|------------|---------|-----|
| Vercel | Primary deployment target | Vercel is the company behind Next.js; the integration is first-class — Edge Network CDN, automatic image optimization on-demand, preview deployments per branch, built-in Core Web Vitals monitoring. For a v1 marketing site with static content, Vercel's free Hobby tier handles the traffic without cost. The site is SSG (static export), so no serverless function costs |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-intersection-observer | 9.x | Lightweight trigger for enter-viewport animations | Use as the trigger mechanism for scroll-reveal animations when you want a simple in-view boolean without the full weight of GSAP ScrollTrigger — e.g., fading in client logos, triggering count-up stats |
| clsx | 2.x | Conditional class name merging | Required when combining Tailwind classes conditionally (animation state classes, active states) |
| tailwind-merge | 2.x | Merges Tailwind classes without conflicts | Prevents duplicate/conflicting utility class output in component composition |
## Rendering Strategy
- Sub-100ms TTFB globally via CDN
- Maximum Lighthouse scores since no server-side rendering at request time
- Zero cold starts
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
## Installation
# Create project
# Animation stack
# Smooth scroll
# Utilities
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
