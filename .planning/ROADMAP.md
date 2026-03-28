# Roadmap: CLMC Revamped Website

## Overview

Six phases build the CLMC site from the ground up in strict dependency order. Phase 1 establishes the design token system, global layout, and navigation shell that every subsequent component inherits. Phase 2 lays the animation infrastructure — GSAP, Lenis, Motion primitives — before any page section is written, preventing the hydration and memory-leak pitfalls that are expensive to retrofit. Phase 3 builds the Home page first because it is the highest-complexity page and validates the animation stack against a real, client-visible route. Phase 4 delivers the Projects gallery, the site's conversion centrepiece, and validates the image pipeline before it propagates to other pages. Phase 5 completes the remaining content pages and the contact form. Phase 6 applies the SEO metadata layer, runs formal accessibility and performance audits, and prepares the site for launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Design System** - Project scaffold, design tokens, global layout, Navbar, Footer, and UI atoms (completed 2026-03-23)
- [x] **Phase 2: Animation Infrastructure** - GSAP + Lenis + Motion primitives, page transitions, and scroll-trigger patterns (completed 2026-03-24)
- [x] **Phase 3: Home Page** - Full home page with hero, featured projects, services overview, credibility, clients strip, and CTA (completed 2026-03-28)
- [x] **Phase 4: Projects Gallery** - Filterable project grid, per-project detail pages, and optimised image pipeline (completed 2026-03-28)
- [ ] **Phase 5: Content Pages and Contact** - About, CEO, Services, Clients, Testimonials, QMS, and Contact pages
- [ ] **Phase 6: SEO, Performance and Accessibility** - Metadata, schema markup, Core Web Vitals audit, and WCAG 2.2 compliance

## Phase Details

### Phase 1: Foundation and Design System
**Goal**: The project scaffold, design system, and global navigation shell are in place so every subsequent page and component has a consistent, correct foundation to build on
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees a styled sticky Navbar with CLMC logo and navigation links on every page, and it changes appearance on scroll
  2. Visitor sees a Footer with contact information, navigation links, and copyright on every page
  3. Navigation is accessible and usable on mobile via a hamburger/drawer menu
  4. All pages share a consistent visual language driven by a defined color, typography, and spacing token system
  5. Smooth scroll behavior (Lenis) is active site-wide and all animations have a static fallback when `prefers-reduced-motion` is set
**Plans:** 2/2 plans complete
Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 project, design tokens, fonts, Button atom, route placeholders
- [x] 01-02-PLAN.md — Navbar (sticky, scroll-aware, mobile overlay), Footer, Lenis smooth scroll, visual verification
**UI hint**: yes

### Phase 2: Animation Infrastructure
**Goal**: Reusable animation primitives, smooth scroll integration, and page transition machinery are ready for every page section to consume without hydration errors or memory leaks
**Depends on**: Phase 1
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Page sections animate in on scroll (fade-up or equivalent reveal) without console errors or hydration mismatches
  2. Navigating between pages triggers a smooth animated transition with no hard flash
  3. Interactive elements (buttons, cards, nav links) respond with distinct hover micro-interaction states
  4. Hero-level parallax effect is functional on desktop and gracefully disabled on mobile (no jank)
**Plans:** 2/2 plans complete
Plans:
- [ ] 02-01-PLAN.md — GSAP config, Lenis-GSAP ticker sync, page transition crossfade, Button hover, ProjectCard component
- [ ] 02-02-PLAN.md — Scroll reveal hooks (useFadeUp, useClipReveal, useStagger) and hero parallax hook (useHeroParallax)
**UI hint**: yes

### Phase 3: Home Page
**Goal**: Visitors can experience the full CLMC home page — from the cinematic hero down to the inquiry CTA — with all sections delivering the intended brand impression
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07
**Success Criteria** (what must be TRUE):
  1. Visitor sees a full-bleed hero section above the fold with CLMC's brand statement, tagline, parallax photography, and a primary CTA button
  2. Visitor can scroll through a featured projects teaser section (3-6 projects) that links through to the full Projects page
  3. Visitor can read an overview of CLMC's core services with brief descriptions on the home page
  4. Visitor sees a company credibility section (years of experience, projects completed, key facts) and a client logos strip as social proof
  5. Visitor sees an inquiry CTA section at the bottom of the home page prompting them to get in touch
**Plans:** 3/3 plans complete
Plans:
- [ ] 03-01-PLAN.md — Setup (placeholders, Button/ProjectCard updates), HeroSection, FeaturedProjectsSection
- [ ] 03-02-PLAN.md — ServiceCard component, ServicesSection, useCountUp hook, StatsSection
- [ ] 03-03-PLAN.md — ClientLogosSection, InquiryCTASection, page.tsx assembly, visual verification
**UI hint**: yes

### Phase 4: Projects Gallery
**Goal**: Visitors can browse the full CLMC project portfolio, filter by category, and open dedicated per-project pages — all loading quickly with optimised imagery
**Depends on**: Phase 3
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. Visitor can view a full project gallery page displaying all CLMC projects as image cards with project name and brief descriptor
  2. Visitor can filter the gallery by category (residential, commercial, government, infrastructure) and see results update without a page reload
  3. Visitor can open a dedicated per-project detail page with extended scope, description, and additional images
  4. Gallery images load quickly with WebP/AVIF format, blur placeholders, and no layout shift
  5. Featured projects on the Home page link correctly through to the Projects page
**Plans:** 2/2 plans complete
Plans:
- [x] 04-01-PLAN.md — Shared data layer (data/projects.ts), FeaturedProjectsSection migration, gallery page with filter pills and masonry grid
- [x] 04-02-PLAN.md — Per-project detail pages with generateStaticParams, ProjectCard Link upgrade, visual verification
**UI hint**: yes

### Phase 5: Content Pages and Contact
**Goal**: All remaining CLMC pages — About, CEO, Services, Clients, Testimonials, QMS, and Contact — are live and consistent with the design system and animation patterns established in earlier phases
**Depends on**: Phase 4
**Requirements**: ABOUT-01, ABOUT-02, SVC-01, CLIENT-01, TESTI-01, QMS-01, CTCT-01, CTCT-02, CTCT-03
**Success Criteria** (what must be TRUE):
  1. Visitor can read the About Us page (company background, mission, track record) and the About CEO page (leadership profile with portrait)
  2. Visitor can read the Services page with a clear enumeration of management consultancy and engineering services
  3. Visitor can view the Our Clients page (logo grid) and the Client Testimony page (curated written testimonials)
  4. Visitor can view the QMS Policy page with quality management documentation in a scannable layout
  5. Visitor can access a /contact page, submit an inquiry via a contact form that delivers to CLMC, and see CLMC's phone and email in the header or footer on every page
**Plans:** 2/3 plans executed
Plans:
- [x] 05-01-PLAN.md — About Us, About CEO, and Services pages with data files and section components
- [x] 05-02-PLAN.md — Clients, Testimonials, QMS pages and Navbar update with QMS link (D-14)
- [ ] 05-03-PLAN.md — Contact page with Formspree form integration, contact info card, and Footer verification
**UI hint**: yes

### Phase 6: SEO, Performance and Accessibility
**Goal**: The site passes Core Web Vitals, meets WCAG 2.2 AA, has full SEO metadata on every page, and is ready for production launch on Vercel
**Depends on**: Phase 5
**Requirements**: SEO-01, SEO-02, PERF-01, PERF-02, PERF-03, A11Y-01
**Success Criteria** (what must be TRUE):
  1. Each page has a unique, optimised meta title, description, and Open Graph tags visible when the URL is shared on social media
  2. Site includes LocalBusiness JSON-LD schema markup and passes a structured data validation test
  3. Site passes Core Web Vitals thresholds (LCP < 2.5s, CLS < 0.1) on both desktop and mobile in Lighthouse / PageSpeed Insights
  4. All pages are fully usable and visually correct on mobile (375px+), tablet (768px+), and desktop (1280px+)
  5. All pages meet WCAG 2.2 AA baseline: keyboard navigable, focus indicators visible, all images have descriptive alt text, semantic HTML throughout
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Design System | 2/2 | Complete   | 2026-03-23 |
| 2. Animation Infrastructure | 2/2 | Complete   | 2026-03-24 |
| 3. Home Page | 3/3 | Complete   | 2026-03-28 |
| 4. Projects Gallery | 2/2 | Complete   | 2026-03-28 |
| 5. Content Pages and Contact | 2/3 | In Progress|  |
| 6. SEO, Performance and Accessibility | 0/TBD | Not started | - |
