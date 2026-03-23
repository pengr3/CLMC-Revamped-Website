# Feature Landscape

**Domain:** Premium AEC (Architecture, Engineering, Construction) marketing website — Philippine construction and management consultancy
**Project:** CLMC Revamped Website
**Researched:** 2026-03-23
**Overall Confidence:** HIGH (multiple authoritative sources, corroborated across AEC-specific publications)

---

## Table Stakes

Features that B2B buyers in the AEC space expect. Missing or broken versions cause immediate credibility loss.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mobile-responsive design | 80%+ of B2B buyers use mobile throughout the buying journey; finger-friendly tap targets required | Low | Already a Next.js constraint; test at every breakpoint, not just "works on phone" |
| Project portfolio / gallery | Most-visited section of any AEC site; clients evaluate competence through past work | Medium | Must include high-quality images, project names, and at minimum a one-line description per project |
| Services page | Buyers need to quickly confirm the firm does what they need | Low | One clear page enumerating offerings; can be one page or split by service type |
| About / Company page | Trust signal; validates legitimacy and establishes history | Low | Company background, founding, mission, track record |
| Contact form or CTA | Conversion endpoint; no contact path = lost leads | Low | Must be prominent on every key page, not buried in the footer |
| Visible phone / email | B2B clients want immediate human contact options, not just forms | Low | Display in header or hero area, not just footer |
| Clear brand statement | Visitors decide within 3–5 seconds whether to stay; a confused value proposition = bounce | Low | One to three sentences — who you are, what you do, who you serve |
| Navigation that prioritises services + portfolio | Clients should reach these in one click from anywhere | Low | Sticky or persistent top nav; Services and Projects must be top-level |
| Fast load times (Core Web Vitals pass) | Google ranks slow sites lower; B2B decision-makers are impatient | High | Tension with animation richness — requires aggressive image optimisation and animation deferral |
| HTTPS and basic security signals | Trust baseline for any professional site in 2025 | Low | Non-negotiable; handled by hosting/Vercel by default |
| Consistent branding and typography | 75% of people judge credibility by design alone | Medium | Applies to font choice, colour palette, spacing — must be coherent across all pages |
| Responsive images | Project photography is the hero asset; broken or pixelated images destroy credibility | Medium | Use Next.js `<Image>` with proper srcset; WebP/AVIF conversion |

---

## Differentiators

Features that elevate CLMC above the generic Philippine construction website. Not expected, but when present, they win deals.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-driven cinematic animations | Creates "forward-thinking" brand impression; almost no Philippine construction firm does this well | High | GSAP ScrollTrigger for complex sequences; Framer Motion for React-native transitions; both can coexist in Next.js |
| Hero video or full-bleed project photography in hero | Immediately communicates scale and quality of work; stops the scroll | Medium | Video adds load complexity; if used, lazy-load and mute autoplay; high-res static fallback required |
| Filterable / categorised project gallery | Lets prospects self-select by sector (residential, commercial, government, infrastructure) | Medium | Client-side filter with URL state preferred; avoids page reload and feels snappy |
| Per-project showcase pages | Deep-dive storytelling — scope, challenges, solutions, outcome — turns portfolio into case studies | High | Requires per-project content; more pages = more SEO surface area; aligns with static content v1 approach |
| CEO / leadership profile page | Humanises the firm; Philippine B2B relationships are often personal — showing the face behind the company builds rapport | Low | Existing requirement from PROJECT.md; portrait photography is the hard dependency |
| QMS Policy page as credibility signal | ISO 9001 / QMS certification is a procurement requirement for government and large corporate clients in the Philippines; publishing it on the website functions as an instant trust signal | Low | Static page; content is documentation — design around scannability, not density |
| Client logos page with recognisable names | Social proof via name recognition; especially powerful for government or GLC clients | Low | Grid of client logos with brief context; hover states add polish |
| Curated video testimonials | 91% of consumers read reviews before deciding; video adds emotional layer text cannot | High | Requires client consent and production quality; text-only testimonials are table stakes — video is the differentiator |
| Micro-interactions on hover / focus | Signals design intentionality; distinguishes bespoke from template | Medium | Button states, image reveals, cursor effects; must not impede usability |
| Dark/light contrast as a design system pillar | Bold contrast communicates precision and confidence; visually distinct from the "busy" industrial look of competitors | Medium | Requires a defined design token system early — colours, spacing, type scale — not ad-hoc styling |
| Bold typographic hierarchy | Large-scale type as a visual element (not just body text) reads as architectural and premium | Low | Font selection is critical; a strong display font paired with a neutral body face is the core of the minimalist-futuristic direction |
| Local SEO signals (Philippine context) | Positions CLMC for "construction firm Philippines" and sector-specific searches; most competitors ignore structured SEO | Medium | Google My Business sync, local schema markup, NAP consistency; Next.js static generation helps |
| Structured schema markup for projects and services | Google rich results for construction services; improves CTR from search | Medium | `LocalBusiness`, `Service`, and custom `Project` schema; implement via Next.js metadata API |
| Accessibility compliance (WCAG 2.2) | WCAG 2.2 became ISO/IEC 40500:2025 in October 2025 — now a formal international standard; B2B procurement increasingly demands it; also improves SEO | Medium | Semantic HTML, focus management, alt text on all images, reduced-motion media query for animations |
| `prefers-reduced-motion` support for animations | Required for WCAG 2.2 AAA animation criterion; removes motion for users who need it without degrading layout | Medium | All GSAP/Framer Motion animations must check this media query; static fallback required |
| Open Graph / social meta tags | When links are shared in email or LinkedIn (primary AEC B2B channel), a rich preview with project photography elevates brand perception | Low | Next.js Metadata API handles this cleanly; requires per-page OG images |
| Smooth page transitions | Reinforces the cinematic brand feel; makes the site feel like a product, not a document | Medium | App Router + Framer Motion `AnimatePresence`; must not block navigation or cause layout shift |
| Sticky header with scroll-aware behaviour | Keeps navigation accessible throughout long scroll pages; shrinks or changes opacity on scroll for elegance | Low | Common pattern; straightforward with GSAP or CSS scroll-driven animations |

---

## Anti-Features

Things to deliberately not build for v1. Each one has a clear reason — scope creep kills launch momentum.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| CMS / admin backend | Adds infrastructure complexity (database, auth, deployment pipeline) that isn't justified for a static marketing site launching to validate content strategy | Hard-code content in v1; add a headless CMS (Sanity, Contentful) in a future milestone once content update frequency is proven |
| Blog or news section | Requires ongoing content production commitment; an empty or stale blog is worse than no blog — it signals inactivity | Defer to a future milestone; if SEO content is prioritised, launch with 3–5 evergreen pieces at that point, not zero |
| Client portal or login system | Authentication adds security surface area, backend infrastructure, and UX complexity far out of scope for a marketing site | Out of scope per PROJECT.md; if needed, link out to a third-party project management tool |
| Cost calculator / estimator | High implementation complexity; estimation in construction is domain-expert work — a bad estimator erodes trust rather than building it | Replace with a clear "Request a Quote" CTA and a well-structured inquiry form |
| Chatbot or AI assistant | Chatbots on professional services sites are frequently perceived as low-quality by B2B buyers; creates expectation of instant response the firm may not be able to meet | A prominent, clearly labelled WhatsApp or email CTA achieves the same "immediate contact" signal with no technical overhead |
| Social media feed embeds | Third-party scripts degrade Core Web Vitals; feeds go stale and show unprofessional content; Instagram/Facebook embeds add render-blocking requests | Use static social proof (logos, testimonials) instead; link to social profiles from the footer |
| Cookie consent banners (heavy GDPR-style) | The Philippines does not currently require EU-GDPR-level cookie consent for a purely domestic marketing site with no personal data processing beyond a contact form | Use a minimal analytics approach (Vercel Analytics or privacy-first Plausible) that doesn't require consent infrastructure |
| Animation that cannot be disabled | WCAG 2.2 and user experience best practice; vestibular disorders affect ~35% of adults; motion-sick visitors will leave | All animations must respond to `prefers-reduced-motion: reduce`; design a static layout first, animate as enhancement |
| Stock photography throughout | Destroys the "real work" credibility signal that is the entire purpose of the project gallery | Use actual CLMC project photography; if a section lacks photos, use abstract geometric/minimal design rather than stock filler |
| Carousels / auto-rotating sliders | Banner blindness is well-documented; auto-rotation removes user control; they perform poorly on mobile | Use static featured project cards, a hover-reveal gallery, or scroll-driven sequences instead |
| Parallax on every section | Overused pattern that becomes visually fatiguing; also causes severe performance issues on mobile when misimplemented | Reserve parallax for 1–2 hero moments where it has compositional purpose; use opacity and transform reveals elsewhere |

---

## Feature Dependencies

The following dependencies must inform build order within each phase:

```
Design token system (colours, type scale, spacing)
  → All page components (every component inherits tokens)

Project photography library (actual CLMC project images)
  → Project gallery page
  → Hero section (if project-photography-led)
  → Per-project showcase pages
  → Open Graph images

Responsive image pipeline (Next.js Image + optimisation config)
  → All pages using photography

Animation library selection (GSAP vs Framer Motion vs both)
  → Scroll-driven sequences
  → Page transitions
  → Micro-interactions
  → prefers-reduced-motion implementation

Accessibility baseline (semantic HTML, focus management)
  → Every page component (cannot be retrofitted cleanly)

Core page structure (layout, nav, footer)
  → All content pages

Contact form (with email delivery — Resend, Nodemailer, or Formspree)
  → Home page CTA
  → Services page CTA
  → Dedicated contact page (if added)

Client content (testimonials, logos, project data)
  → Client logos page
  → Testimonials page
  → Projects page
  → About page (client context)
```

---

## MVP Recommendation

Given the PROJECT.md page structure and the "stunning first impression" core value, prioritise:

**Must ship at launch:**
1. Home page — brand statement, hero, featured projects teaser, primary CTA
2. Projects page — filterable gallery with all available project photography
3. Services page — clear enumeration of offerings
4. About (Company) page — background, values, history
5. About (CEO) page — leadership profile
6. Contact — accessible from every page via sticky nav and inline CTAs
7. Mobile responsiveness — all of the above at every breakpoint
8. Core Web Vitals — LCP, CLS, FID targets met despite animations

**Include because they are client-specific requirements (not generic table stakes):**
- QMS Policy page — critical for Philippine government/corporate procurement
- Our Clients page — client logos as social proof
- Client Testimony page — curated written testimonials

**Defer confidently:**
- Video testimonials — production dependency; launch with text, upgrade later
- Per-project deep-dive pages — launch with gallery, add case study detail pages in milestone 2
- Blog / SEO content — separate milestone, separate content strategy
- Schema markup — implement in a polish phase after page structure is stable
- Headless CMS — evaluate after 3 months of update frequency data

---

## Sources

- [Essential Website Features for AEC Firms — Circle S Studio](https://circlesstudio.com/blog/essential-website-features-aec-firms/)
- [2025 AEC Marketing Trends: The Vital Role of Branding and Web Design — Third & Arch](https://www.thirdandarch.com/thoughts/2025-aec-marketing-trends/)
- [Top Features Every Construction Company Website Needs in 2025 — Three29](https://three29.com/top-features-every-construction-company-website-needs-in-2025/)
- [25 Best Construction Website Examples — OpenAsset](https://openasset.com/resources/construction-website-examples/)
- [Top 12 Architecture Websites in 2025: Examples and Best Practices — Webflow Blog](https://webflow.com/blog/best-architecture-websites)
- [The Best Construction Website Design Examples of 2025 — Vnzo AEC](https://www.vnzoaec.com/post/the-best-construction-website-design-examples)
- [AEC SEO Best Practices 2025 — EcoYork](https://www.ecoyork.com/aec-seo-best-practices-2025/)
- [Web Accessibility Best Practices 2025 — Broworks](https://www.broworks.net/blog/web-accessibility-best-practices-2025-guide)
- [WCAG 2.2 / ISO 40500:2025 accessibility standard — WCAG.com](https://www.wcag.com/)
- [Framer vs GSAP: Which Animation Library Should You Choose? — Pentaclay](https://pentaclay.com/blog/framer-vs-gsap-which-animation-library-should-you-choose)
- [Key Website Design and UX Principles for Construction Firms — Mauka Digital](https://maukadigital.com/articles/technology-solutions/ux-ui-design/key-website-design-and-ux-principles-for-construction-firms)
- [SEO for Construction Companies — InvoiceFly](https://invoicefly.com/academy/seo-for-construction-companies/)
