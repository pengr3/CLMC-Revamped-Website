# Project Research Summary

**Project:** CLMC Revamped Website
**Domain:** Premium AEC (Architecture, Engineering, Construction) marketing / portfolio site — Philippine construction and management consultancy
**Researched:** 2026-03-23
**Confidence:** HIGH

---

## Executive Summary

CLMC requires a statically-generated, animation-rich marketing site that positions a Philippine construction firm as the most visually sophisticated in its sector. Research across four domains converges on a clear approach: Next.js 15 App Router with full SSG, Tailwind CSS v4 for styling, GSAP + ScrollTrigger for complex scroll-driven sequences, and Motion (Framer Motion) for component-level UI transitions. All pages are React Server Components at their root; animated sections are Client Components isolated at the leaf level. Content is hard-coded TypeScript modules for v1 with no CMS. This architecture maximises Core Web Vitals performance while enabling cinematic scroll experiences — the two goals that are in most tension on this type of project.

The recommended approach is build-in-order: establish foundations first (design tokens, fonts via `next/font`, global layout, typed content modules, centralised GSAP registration), then animation primitives, then page sections, then individual pages prioritising Home and Projects as the highest-impact routes. The QMS Policy, Client Logos, and Testimonials pages are client-specific requirements — not generic table stakes — and must be included at launch rather than deferred. The projects gallery is the site's centrepiece and must use `next/image` with `priority` on hero images, AVIF/WebP conversion, blur placeholders, and explicit dimensions throughout.

The primary risk class for this project is animation infrastructure colliding with Next.js 15's SSR and hydration model. Every critical pitfall identified — GSAP hydration mismatches, ScrollTrigger memory leaks, Lenis/ScrollTrigger synchronization, missing `priority` on hero images, `prefers-reduced-motion` gaps, and mobile scroll jank — is preventable if established as conventions before the first animated component is written. Retrofitting these patterns late is expensive. The single most important architectural decision is: all GSAP code lives inside `useGSAP()` from `@gsap/react`, registered once in `lib/gsap.ts`, and animation state never flows upward out of its Client Component boundary.

---

## Key Findings

### Recommended Stack

Next.js 15 (App Router) with React 19 and TypeScript 5 is confirmed as the right framework for this project — it is both the client's explicit requirement and the technically correct choice for a static marketing site that needs image optimisation, font loading, metadata API, and edge CDN deployment in a single integrated toolchain. Tailwind CSS v4's CSS-first configuration and Oxide engine eliminates the `tailwind.config.js` overhead and delivers 2-5x faster builds with zero runtime JS styling cost — critical for an animation-heavy site where every unnecessary JS byte hurts Core Web Vitals.

The animation stack is a deliberate split: GSAP 3.x + ScrollTrigger handles all scroll-driven sequences, pinned sections, stagger timelines, and parallax because it is the industry standard for that class of animation. Motion 11.x (Framer Motion) handles component-level transitions, page enters/exits, hover states, and `AnimatePresence` because its declarative API is faster to implement for routine UI polish. Using both is established practice on Awwwards-tier sites; the key is clear separation of concerns. Lenis 1.x provides native-feeling smooth scroll and integrates with GSAP ScrollTrigger via a specific synchronisation pattern that must be set up correctly once.

**Core technologies:**
- Next.js 15 (App Router): framework, routing, SSG, image optimisation, metadata API — project requirement, best-in-class for static marketing sites
- React 19 / TypeScript 5: UI rendering with concurrent features + type safety — ships with Next.js 15
- Tailwind CSS v4: utility-first styling, zero runtime JS, 2-5x faster builds vs v3 — eliminates CSS-in-JS performance penalty
- GSAP 3 + `@gsap/react`: complex scroll-driven animations and timelines — industry standard for cinematic scroll; `useGSAP()` hook is required for App Router cleanup
- Motion 11 (Framer Motion): component-level UI transitions, page enters, hover states — declarative API far faster than GSAP for routine polish
- Lenis 1: smooth scroll with GSAP ScrollTrigger synchronisation — current standard replacing Locomotive Scroll
- `next/image`: automatic WebP/AVIF, responsive srcset, lazy loading, CLS prevention — non-negotiable for the project gallery
- `next/font`: zero-FOUT font loading for bold display typography — mandatory for a typography-driven design
- Vercel: deployment, CDN edge, image optimisation on-demand, free Hobby tier covers the use case

**Full details:** `.planning/research/STACK.md`

---

### Expected Features

AEC buyers in the Philippines evaluate construction firms primarily through past work quality, professional credibility signals, and ease of contact. The project photography gallery is the most important conversion element on the site. The QMS Policy page and client logos carry disproportionate weight with government and corporate procurement gatekeepers.

**Must have (table stakes):**
- Mobile-responsive design at all breakpoints — B2B buyers use mobile throughout the buying journey
- Project portfolio gallery with high-quality photography, project names, and descriptions
- Services page clearly enumerating offerings
- About (Company) page — legitimacy and history
- About (CEO) page — humanises the firm; personal relationships matter in Philippine B2B
- Prominent contact CTA on every key page (form + visible phone/email)
- Clear brand statement in the hero — decision in 3-5 seconds
- Sticky navigation with Services and Projects as top-level links
- Core Web Vitals pass — LCP, CLS, FID targets met despite animations
- QMS Policy page — procurement requirement for government/corporate clients
- Our Clients page — client logo social proof
- Client Testimony page — written testimonials at minimum

**Should have (differentiators):**
- Scroll-driven cinematic animations — almost no Philippine construction firm does this well
- Filterable project gallery (by sector/category) — lets prospects self-select
- Bold typographic hierarchy as a visual design element — architectural, premium feel
- Dark/light contrast as a design system pillar — defined token system, not ad-hoc
- Micro-interactions on hover/focus — signals design intentionality
- Smooth page transitions via `template.tsx` — cinematic brand feel
- `prefers-reduced-motion` support — WCAG 2.2 + ~35% of users affected
- Open Graph / social meta tags with project photography — LinkedIn sharing is primary AEC B2B channel
- Sticky header with scroll-aware behaviour

**Defer to v2+:**
- Video testimonials — production dependency; launch with text
- Per-project deep-dive case study pages — launch gallery first, add detail in milestone 2
- Blog / SEO content — separate content strategy milestone
- Schema markup — polish phase after page structure is stable
- Headless CMS — evaluate after 3 months of update frequency data
- Social media feed embeds — degrade Core Web Vitals; do not add

**Full details:** `.planning/research/FEATURES.md`

---

### Architecture Approach

The architecture is a statically-generated, server-component-first Next.js App Router site. All pages are React Server Components that import typed TypeScript content modules from `lib/data/` at build time. Animated sections are Client Components marked `'use client'` that receive content as props from their RSC parents. The RSC-wraps-CC boundary is strictly enforced — no animation library code ever appears in a page RSC. GSAP plugins are registered once in `lib/gsap.ts`; all GSAP animations use `useGSAP()` from `@gsap/react`. Page transitions use `app/template.tsx` (which remounts on every route change, unlike `layout.tsx`).

**Major components:**
1. `app/layout.tsx` (RSC) — HTML shell, `next/font` font loading, globals, Navbar, Footer
2. `app/template.tsx` (CC) — page-transition enter animation; remounts on every route change
3. `lib/data/*.ts` — typed TypeScript content modules for projects, services, clients, navigation
4. `components/animation/` (CC only) — `FadeInUp`, `ParallaxLayer`, `GSAPProvider`; all use `'use client'`
5. `components/sections/` (CC or RSC) — page-level sections; CC only when they animate or hold browser state
6. `components/ui/` (RSC preferred) — Button, Tag, SectionLabel atoms; CC only if they animate
7. 9 public routes: `/`, `/about`, `/about-ceo`, `/services`, `/clients`, `/qms-policy`, `/testimonials`, `/projects`, `/projects/[slug]`

Build order (hard dependency chain): Foundation (data modules, layout, atoms) → Layout layer (Navbar, Footer) → Animation primitives (`lib/gsap.ts`, `FadeInUp`, `ParallaxLayer`, `template.tsx`) → Page sections → Individual pages (Home first, then Projects) → SEO/meta layer.

**Full details:** `.planning/research/ARCHITECTURE.md`

---

### Critical Pitfalls

1. **GSAP/Framer Motion hydration mismatches** — Animation libraries use browser-only APIs that do not exist during SSR. Prevention: all GSAP code inside `useGSAP()`, all animation components marked `'use client'`, never call `window`/`document` at module scope. Address in the foundation phase before any animation work begins.

2. **Missing `priority` on hero images destroying LCP** — `next/image` defaults to lazy loading; applying it to the hero delays the LCP element until after hydration. This routinely causes 4-8s LCP on Philippine mobile networks. Prevention: `priority` prop on every above-the-fold `<Image>`, explicit `width`/`height` everywhere, AVIF/WebP enabled. Address whenever any hero section is built — one-line fix.

3. **Animating layout-affecting CSS properties causing CLS** — Animating `width`, `height`, `top`, `left`, `margin` triggers browser reflow on every frame, accumulating CLS. Prevention: animate only `transform` and `opacity` — these run on the GPU compositor. Establish as a team rule before the first animated component exists.

4. **ScrollTrigger memory leaks on route changes** — GSAP ScrollTrigger instances are registered globally; without cleanup they persist after page unmount, referencing dead DOM nodes and firing on wrong pages. Prevention: `useGSAP()` from `@gsap/react` handles cleanup automatically; never create ScrollTrigger outside `useGSAP()`. Address in the core animation architecture phase.

5. **Lenis/ScrollTrigger scroll position desynchronisation** — Both libraries independently track scroll position and fight over its value without explicit bridging. Prevention: implement the exact synchronisation pattern (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(...)` + `gsap.ticker.lagSmoothing(0)`) once in a shared provider at root layout. Decide whether Lenis is necessary before building any scroll animations.

**Additional moderate pitfalls to track:**
- App Router exit animations are broken by design — use `template.tsx` for enter-only transitions or the View Transitions API
- `prefers-reduced-motion` missing — WCAG 2.2 risk; set `<MotionConfig reducedMotion="user">` globally in the animation setup phase
- Mobile scroll jank on mid-range Android devices — disable parallax at `max-width: 768px`; test on real hardware before marking any scroll animation complete
- Font FOUC on bold display typography — use `next/font` exclusively; never `@import` or `<link>` for fonts

**Full details:** `.planning/research/PITFALLS.md`

---

## Implications for Roadmap

Based on the combined research, six phases are recommended. The dependency chain is strict: animation primitives cannot be built without foundation; pages cannot be built without sections; SEO/meta cannot be finished without stable pages. Home and Projects are the highest-complexity pages and should be tackled early so animation decisions feed back into the shared primitives.

---

### Phase 1: Foundation and Design System

**Rationale:** Every component inherits from the design token system (colours, type scale, spacing). `next/font` and global layout must exist before any design work. GSAP plugin registration, `prefers-reduced-motion` patterns, and the `'use client'` boundary rules must be established before the first animated component is written — retrofitting them is the costliest category of mistakes in this domain.

**Delivers:** Project scaffold (Next.js 15, Tailwind v4, TypeScript), root layout with `next/font`, design token system, `lib/gsap.ts` centralised plugin registration, `<MotionConfig reducedMotion="user">` global wrapper, UI atoms (Button, Tag, SectionLabel), typed `lib/data/*.ts` content modules for all pages, Navbar and Footer.

**Addresses (from FEATURES.md):** Consistent branding, typography, navigation structure, HTTPS/security (Vercel default).

**Avoids (from PITFALLS.md):** Pitfall 1 (hydration mismatches), Pitfall 7 (missing reduced-motion), Pitfall 9 (font FOUC), Pitfall 13 (over-engineering animation system before validating design).

**Research flag:** Standard patterns — well-documented Next.js 15 App Router setup. No additional research needed.

---

### Phase 2: Animation Primitives and Page Transitions

**Rationale:** Animation primitives (`FadeInUp`, `ParallaxLayer`, `template.tsx`) must exist before page sections can be built. Setting up Lenis synchronisation with ScrollTrigger here — once, correctly — prevents the desynchronisation pitfall from propagating across all scroll animations.

**Delivers:** `components/animation/FadeInUp`, `FadeInLeft`, `ParallaxLayer`, `StaggerGroup`; `app/template.tsx` enter-only page transition; Lenis smooth scroll provider in root layout with GSAP ScrollTrigger synchronisation; `react-intersection-observer` pattern for lightweight scroll triggers.

**Addresses (from FEATURES.md):** Scroll-driven cinematic animations, smooth page transitions, micro-interaction foundations.

**Avoids (from PITFALLS.md):** Pitfall 4 (ScrollTrigger memory leaks), Pitfall 5 (broken exit animations), Pitfall 6 (Lenis/ScrollTrigger conflict), Pitfall 8 (mobile scroll jank — establish mobile disable pattern here).

**Research flag:** Needs research-phase attention. The Lenis + GSAP ScrollTrigger synchronisation in Next.js 15 App Router, and the `template.tsx` enter-only approach vs. View Transitions API, have subtle implementation variants. Validate the exact pattern against current library versions before building.

---

### Phase 3: Home Page

**Rationale:** Home is the highest visual complexity page and the core brand impression. Building it early means animation decisions — what works, what causes jank, what actually looks good — feed back into the animation primitives while they can still be adjusted. The hero section is also the most likely LCP failure point; catching it here prevents a late-stage performance regression.

**Delivers:** Hero section (brand statement, hero image with `priority`, primary CTA), featured projects teaser, services overview teaser, about/CTA section, sticky header with scroll-aware behaviour.

**Addresses (from FEATURES.md):** Brand statement, hero first impression, primary CTA, navigation, Core Web Vitals.

**Avoids (from PITFALLS.md):** Pitfall 2 (hero LCP — `priority` prop on hero image), Pitfall 3 (CLS from animating layout properties), Pitfall 8 (mobile performance — test on physical Android device before phase is complete).

**Research flag:** Standard patterns for hero layout, but the specific GSAP scroll sequence choreography for the hero may benefit from reviewing Awwwards-level construction site examples. Low priority — implement and adjust visually.

---

### Phase 4: Projects Gallery

**Rationale:** The projects gallery is the site's centrepiece and the most-visited section for prospective clients. It is also the highest image-load risk — unoptimised construction photography can reach 20-50MB. This phase must nail `next/image` configuration, lazy loading, blur placeholders, and filter state before any other gallery-dependent pages (Clients, Testimonials) are built.

**Delivers:** `/projects` filterable grid (by category) with all available project photography using `next/image`; `/projects/[slug]` individual project showcase pages with `generateStaticParams`; paginated/virtualized load pattern for gallery performance; `placeholder="blur"` on all project images.

**Addresses (from FEATURES.md):** Hero-feature project gallery, filterable gallery, per-project showcase, responsive images, Core Web Vitals.

**Avoids (from PITFALLS.md):** Pitfall 11 (unoptimised gallery images), Pitfall 2 (LCP on project page hero images), Pitfall 12 (Vercel image domain configuration — all images in `/public` for v1).

**Research flag:** Standard patterns — `next/image` with static `/public` assets is fully documented. The filter UI pattern (client-side state, URL-reflected filters) is straightforward. No additional research needed.

---

### Phase 5: Remaining Content Pages

**Rationale:** With the animation system, home page, and gallery validated, the remaining pages (About, CEO, Services, Clients, QMS, Testimonials) follow established patterns from Phases 1-4. These pages are lower animation complexity but must maintain the same quality bar for typography, responsiveness, and Core Web Vitals.

**Delivers:** `/about` (company background, values, history), `/about-ceo` (CEO profile with portrait photography), `/services` (management consultancy + engineering services enumeration with CTAs), `/clients` (logo grid with hover states), `/testimonials` (curated written testimonials), `/qms-policy` (quality management documentation — scannability-focused layout), `/not-found` (404 page).

**Addresses (from FEATURES.md):** All remaining table-stakes pages, QMS credibility signal, social proof via client logos, contact path on every page.

**Avoids (from PITFALLS.md):** Pitfall 3 (CLS on section reveals), Pitfall 8 (mobile scroll jank — test each page on mobile).

**Research flag:** Standard patterns. No additional research needed.

---

### Phase 6: SEO, Accessibility, and Pre-Launch Polish

**Rationale:** Schema markup and Open Graph images are deferred until page structure is stable — implementing them earlier means re-doing work if pages change. The accessibility and reduced-motion pass is a formal audit rather than ongoing work. Bundle analysis and Core Web Vitals measurement must happen against the complete site, not individual pages.

**Delivers:** Per-page `metadata` exports and `generateMetadata()` for dynamic routes; `app/sitemap.ts` and `app/robots.ts`; `LocalBusiness` JSON-LD structured data; per-page Open Graph images (1200x630); formal `prefers-reduced-motion` audit across all animated components; WCAG 2.2 audit (semantic HTML, focus management, alt text); `@next/bundle-analyzer` audit to remove unused GSAP plugins and confirm animation libraries are code-split; Vercel deployment configuration and image domain verification.

**Addresses (from FEATURES.md):** Local SEO signals, structured schema markup, accessibility compliance (WCAG 2.2), Open Graph/social meta tags.

**Avoids (from PITFALLS.md):** Pitfall 10 (bundle bloat from duplicate animation libraries), Pitfall 12 (Vercel image domain config errors), Pitfall 7 (reduced-motion gaps missed during development).

**Research flag:** The Philippine-specific local SEO signals and `LocalBusiness` schema configuration may benefit from a targeted research pass. Low risk overall — standard Next.js metadata API patterns apply.

---

### Phase Ordering Rationale

- **Foundation before everything** — design tokens and font loading cannot be retrofitted without touching every component; GSAP registration and `prefers-reduced-motion` wrappers established late require touching every animated component
- **Animation primitives before page sections** — sections import animation wrappers; building them in reverse creates rework
- **Home before other pages** — highest animation complexity; validates that GSAP ScrollTrigger + Lenis work correctly together in a real page context before that pattern propagates to 8 more pages
- **Projects before remaining content pages** — gallery image pipeline decisions (sizing, placeholders, pagination) affect every image-heavy section; validate once here
- **SEO/meta last** — metadata is stable only after page content and structure are finalized; premature schema markup gets rewritten

---

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 2 (Animation Primitives):** The exact Lenis + GSAP ScrollTrigger synchronisation pattern in Next.js 15 App Router has known library-version sensitivity; the `template.tsx` enter-only transition vs. View Transitions API tradeoff needs a focused decision before implementation
- **Phase 6 (SEO/Polish):** Philippine-specific `LocalBusiness` schema configuration and local search optimisation tactics for the construction sector are lightly documented; worth a targeted research pass before implementation

**Phases with standard, well-documented patterns (skip research-phase):**
- **Phase 1 (Foundation):** Next.js 15 App Router scaffolding, Tailwind v4, `next/font` — official documentation is authoritative and comprehensive
- **Phase 3 (Home Page):** Hero layout, sticky navigation, CTA patterns — well-covered by both Next.js docs and AEC web design literature
- **Phase 4 (Projects Gallery):** `next/image` with static assets and `generateStaticParams` — fully documented; no surprising edge cases for the v1 static approach
- **Phase 5 (Content Pages):** Follows established patterns from Phases 1-4; no new architectural territory

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core technologies are the project's explicit requirements, confirmed against current official documentation. The GSAP + Motion split is backed by multiple production examples and official library guidance. |
| Features | HIGH | Multiple AEC-specific sources corroborate the table-stakes list. Philippine procurement requirements for QMS policy and government/corporate social proof are specific but well-evidenced. |
| Architecture | MEDIUM-HIGH | RSC/CC boundary rules and static SSG patterns are authoritative. Specific animation integration patterns (GSAP + Lenis + Next.js 15) are documented but rely partly on community sources; library version sensitivity is real. |
| Pitfalls | HIGH | Critical pitfalls 1-4 are confirmed by official GSAP and Next.js documentation. Mobile performance risks are confirmed by multiple independent benchmarks. The App Router exit animation limitation is confirmed by the Next.js GitHub repo. |

**Overall confidence:** HIGH

---

### Gaps to Address

- **Actual CLMC project photography availability and quality** — the gallery is the centrepiece; if photography is not available at launch quality, placeholder strategy needs to be designed early. Confirm asset status before Phase 4 begins.
- **Contact form email delivery service** — FEATURES.md lists Resend, Nodemailer, or Formspree as options. For a v1 static site on Vercel, Formspree (no backend) or Resend (Next.js Route Handler) are the realistic choices. Decide before Phase 5 (where the contact CTA is implemented on content pages).
- **Lenis necessity decision** — Lenis adds synchronisation complexity. If the design does not specifically require ultra-smooth inertia scrolling, native CSS `scroll-behavior: smooth` with GSAP ScrollTrigger alone is simpler and avoids Pitfall 6 entirely. This decision should be made in Phase 2 after seeing the design direction in motion.
- **Font final selection** — STACK.md recommends Geist or DM Sans for display, Inter for body. This is an aesthetic decision the team must confirm against actual design mockups. Font choice affects CLS mitigation strategy (fallback metrics configuration).

---

## Sources

### Primary (HIGH confidence)
- Next.js 15 official documentation — App Router, `next/image`, `next/font`, Metadata API, `generateStaticParams`
- GSAP official documentation — React integration, `useGSAP()`, ScrollTrigger, accessibility guide
- Motion (Framer Motion) official documentation — React guide, accessibility, GSAP comparison
- Tailwind CSS v4 upgrade guide and CSS-first configuration docs
- WCAG 2.2 / ISO 40500:2025 standard

### Secondary (MEDIUM confidence)
- Awwwards construction/architecture site rebuilds (Olivier Larose tutorials)
- Circle S Studio — Essential Website Features for AEC Firms
- Third & Arch — 2025 AEC Marketing Trends
- OpenAsset — 25 Best Construction Website Examples
- Lenis official site (darkroom.engineering) — synchronisation patterns
- DebugBear Next.js image optimisation deep-dive
- Chrome Developer Blog — scroll animation performance (compositor vs main thread)

### Tertiary (LOW confidence, validate during implementation)
- Medium community posts on GSAP + Next.js 15 App Router patterns (Thomas Augot, Josiah.webdev)
- DEV Community — Next.js App Router patterns 2026 (unverified blog post)
- Various community forum threads on Lenis + ScrollTrigger synchronisation

---
*Research completed: 2026-03-23*
*Ready for roadmap: yes*
