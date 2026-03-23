# Requirements: CLMC Revamped Website

**Defined:** 2026-03-23
**Core Value:** A stunning first impression that positions CLMC as the most forward-thinking construction firm in the Philippines — winning clients through prestige and credibility on every scroll.

## v1 Requirements

### Design System

- [ ] **DSGN-01**: Site uses a defined design token system (color palette, typography scale, spacing) implemented via Tailwind CSS v4 configuration
- [ ] **DSGN-02**: Global typography uses `next/font` with a display font (headlines) and body font (copy) pair that communicates minimalist-futuristic aesthetic
- [ ] **DSGN-03**: All UI components share a consistent visual language (border radius, shadow system, color usage) across all pages
- [ ] **DSGN-04**: `prefers-reduced-motion` media query is respected globally — all animations have a static fallback

### Layout & Navigation

- [ ] **NAV-01**: Visitor sees a persistent sticky header with CLMC logo and primary navigation links on all pages
- [ ] **NAV-02**: Header changes appearance on scroll (opacity shift or size reduction) to reinforce premium feel
- [ ] **NAV-03**: Navigation is accessible and functional on mobile via hamburger/drawer menu
- [ ] **NAV-04**: Footer displays contact information (phone, email), navigation links, and copyright on all pages
- [ ] **NAV-05**: Smooth scroll behavior is active site-wide (Lenis)

### Home Page

- [ ] **HOME-01**: Visitor sees a hero section with CLMC's brand statement, tagline, and a primary CTA button above the fold
- [ ] **HOME-02**: Hero section features full-bleed cinematic project photography with parallax depth effect
- [ ] **HOME-03**: Home page includes a featured projects teaser section (3–6 selected projects) linking to the full Projects page
- [ ] **HOME-04**: Home page includes an overview of core services with brief descriptions
- [ ] **HOME-05**: Home page includes a company credibility section (e.g. years of experience, projects completed, key facts)
- [ ] **HOME-06**: Home page includes a client logos strip as social proof
- [ ] **HOME-07**: Home page includes an inquiry CTA section prompting visitors to get in touch

### Projects Gallery

- [ ] **PROJ-01**: Visitor can view a full project gallery page displaying all CLMC projects as image cards
- [ ] **PROJ-02**: Visitor can filter the project gallery by category (e.g. residential, commercial, government, infrastructure)
- [ ] **PROJ-03**: Each project card displays a high-quality image, project name, and brief descriptor
- [ ] **PROJ-04**: Visitor can open a dedicated per-project detail page with extended project information (scope, description, additional images)
- [ ] **PROJ-05**: Featured projects section on the Home page links through to the full Projects page

### Content Pages

- [ ] **ABOUT-01**: Visitor can read the About Us page covering CLMC's company background, founding, mission, and track record
- [ ] **ABOUT-02**: Visitor can read the About CEO page with a leadership profile and portrait photography
- [ ] **SVC-01**: Visitor can read the Services page with a clear enumeration of management consultancy and engineering services offered
- [ ] **CLIENT-01**: Visitor can view the Our Clients page displaying a logo grid of key clients with brief context
- [ ] **TESTI-01**: Visitor can read the Client Testimony page with curated written testimonials from past clients
- [ ] **QMS-01**: Visitor can view the QMS Policy page displaying CLMC's quality management system documentation in a scannable layout

### Animations & Interactions

- [ ] **ANIM-01**: Page sections animate in as the visitor scrolls (fade-up, reveal, or equivalent scroll-triggered entrance animations)
- [ ] **ANIM-02**: Hero section features a parallax depth effect on scroll
- [ ] **ANIM-03**: Navigating between pages triggers a smooth animated transition (no hard flash)
- [ ] **ANIM-04**: Interactive elements (buttons, project cards, nav links) have distinct hover micro-interaction states

### Contact

- [ ] **CTCT-01**: Visitor can submit an inquiry via a contact form; submission triggers an email delivery to CLMC
- [ ] **CTCT-02**: CLMC's phone number and email address are visible in the site header or footer on all pages
- [ ] **CTCT-03**: Visitor can access a dedicated Contact page (/contact) from the navigation

### SEO

- [ ] **SEO-01**: Each page has unique, optimised meta title, description, and Open Graph tags via Next.js Metadata API
- [ ] **SEO-02**: Site includes LocalBusiness JSON-LD schema markup for Philippine search visibility

### Performance & Accessibility

- [ ] **PERF-01**: Site passes Core Web Vitals thresholds (LCP < 2.5s, CLS < 0.1) on desktop and mobile
- [ ] **PERF-02**: All pages are fully responsive and usable on mobile (375px+), tablet (768px+), and desktop (1280px+)
- [ ] **PERF-03**: All project photography and images are served via `next/image` with WebP/AVIF format, correct srcset, and blur placeholders
- [ ] **A11Y-01**: All pages meet WCAG 2.2 AA baseline: semantic HTML, keyboard navigable, focus indicators visible, all images have descriptive alt text

---

## v2 Requirements

### Enhanced Projects

- **PROJ-V2-01**: Per-project pages include video walkthroughs or time-lapse construction footage
- **PROJ-V2-02**: Projects page supports an interactive map view showing project locations in the Philippines

### Content Management

- **CMS-01**: Site content (projects, testimonials, services) is editable via a headless CMS (Sanity or Contentful) without code changes
- **CMS-02**: New projects can be published by a non-technical CLMC team member

### Marketing

- **MKT-01**: Blog or Insights section with construction industry articles for SEO content strategy
- **MKT-02**: Curated video testimonials from clients embedded on Testimonials page
- **MKT-03**: WhatsApp click-to-chat CTA for direct mobile contact

### Analytics

- **ANLYT-01**: Privacy-first analytics (Vercel Analytics or Plausible) tracks page views and contact form submissions
- **ANLYT-02**: Heatmap tool (e.g. Hotjar) implemented on key pages to inform UX improvements

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / admin backend | Adds infrastructure complexity not justified for static v1; add after content update frequency is proven |
| Client portal / login system | Out of scope per PROJECT.md; authentication surface area not appropriate for a marketing site |
| Chatbot or AI assistant | Perceived as low-quality by B2B buyers; WhatsApp/email CTAs are more trusted |
| Social media feed embeds | Third-party scripts harm Core Web Vitals; static social proof is more credible |
| Auto-rotating carousels / sliders | Banner blindness, poor mobile UX, performance cost — replaced by scroll-driven sequences |
| Cost / estimate calculator | High complexity; a bad estimator erodes trust — "Request a Quote" CTA is better |
| Cookie consent banner (heavy GDPR-style) | Philippine law does not require GDPR-level consent for this use case; use privacy-first analytics |
| Stock photography | Destroys credibility signal of a real portfolio — actual CLMC project photography required |
| Excessive parallax (every section) | Causes mobile jank and visual fatigue — reserved for 1–2 hero moments only |

---

## Traceability

*Populated during roadmap creation.*

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | — | Pending |
| DSGN-02 | — | Pending |
| DSGN-03 | — | Pending |
| DSGN-04 | — | Pending |
| NAV-01 | — | Pending |
| NAV-02 | — | Pending |
| NAV-03 | — | Pending |
| NAV-04 | — | Pending |
| NAV-05 | — | Pending |
| HOME-01 | — | Pending |
| HOME-02 | — | Pending |
| HOME-03 | — | Pending |
| HOME-04 | — | Pending |
| HOME-05 | — | Pending |
| HOME-06 | — | Pending |
| HOME-07 | — | Pending |
| PROJ-01 | — | Pending |
| PROJ-02 | — | Pending |
| PROJ-03 | — | Pending |
| PROJ-04 | — | Pending |
| PROJ-05 | — | Pending |
| ABOUT-01 | — | Pending |
| ABOUT-02 | — | Pending |
| SVC-01 | — | Pending |
| CLIENT-01 | — | Pending |
| TESTI-01 | — | Pending |
| QMS-01 | — | Pending |
| ANIM-01 | — | Pending |
| ANIM-02 | — | Pending |
| ANIM-03 | — | Pending |
| ANIM-04 | — | Pending |
| CTCT-01 | — | Pending |
| CTCT-02 | — | Pending |
| CTCT-03 | — | Pending |
| SEO-01 | — | Pending |
| SEO-02 | — | Pending |
| PERF-01 | — | Pending |
| PERF-02 | — | Pending |
| PERF-03 | — | Pending |
| A11Y-01 | — | Pending |

**Coverage:**
- v1 requirements: 40 total
- Mapped to phases: 0
- Unmapped: 40 ⚠️ (populated during roadmap creation)

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 after initial definition*
