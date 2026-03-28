# Phase 6 — UI Review (Full Site Audit)

**Audited:** 2026-03-28
**Baseline:** Abstract 6-pillar standards + Phase 1–6 design decisions (01-CONTEXT.md, 03-CONTEXT.md, PROJECT.md)
**Screenshots:** Not captured — Playwright browser not installed (code-only audit)
**Design Mandate:** Minimalist-futuristic; "most forward-thinking construction firm in the Philippines"; prestige and credibility on every scroll.
**Scope:** All pages — Home, Projects Gallery, Project Detail, About, About CEO, Services, Clients, Testimonials, QMS, Contact + global Navbar, Footer, animations, SEO.

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Layout & Spatial Rhythm | 3/4 | Consistent grid system and spacing token usage; hero lacks a secondary visual element to create depth within the grid |
| 2. Typography & Hierarchy | 3/4 | Clean two-font system with disciplined weight usage; hero H1 max-size (text-6xl / 60px) undershoots the "80–120px" cinematic headline spec from D-08 |
| 3. Color & Contrast | 3/4 | Monochrome token system executed correctly; one hardcoded hex in Button.tsx; placeholder imagery degrades real-world color impact |
| 4. Component Quality | 2/4 | Card hover patterns are polished; CEO page has unresolved `[CEO Name]` / `[his/her]` tokens shipped to production; phone/address placeholders visible in Footer and Contact |
| 5. Animation & Motion | 4/4 | GSAP + Motion integration is best-practice; reduced-motion handled at every layer; hero parallax, stagger reveals, count-up, and page transitions all correctly implemented |
| 6. Visual Identity & Brand | 2/4 | The technical foundation is solid but the "futuristic" mandate is underdelivered — no accent color, no editorial typographic device, no cinematic large-scale imagery, all placeholder visuals still in place |

**Overall: 17/24**

---

## Top 3 Priority Fixes

1. **Unresolved copy and contact placeholders are live** — Any real visitor to `/about/ceo` sees `[CEO Name]` three times and `[his/her]` in body text; the Footer and Contact page show `+63 (XX) XXX-XXXX` and `[Placeholder Address]`. This actively undercuts the "prestige and credibility" mandate. Fix: supply real CEO name, phone number, office address, and portrait image before any public launch.

2. **Hero headline is too small for the cinematic spec** — Phase 1 D-08 explicitly calls for "80–120px for hero-level H1s". The current `text-6xl` (60px) is meaningfully smaller and renders the hero as competent rather than arresting. The gap between the headline and the CTA button with no sub-copy creates dead vertical space rather than powerful negative space. Fix: increase H1 to `text-7xl` (72px) on `md` and `text-8xl` (96px) on `lg`; or add a single eyebrow label (e.g., "Est. 1995 · Metro Manila") above the headline to give the white space a purpose and reinforce prestige.

3. **Client logos section is purely decorative placeholders** — The marquee strip renders eight grey boxes labeled "Client 1" through "Client 8" — the exact opposite of the intended social proof signal. The Clients Grid page similarly renders 12 grey rectangles next to client names. Given that CLMC's client list (Ayala, SM Prime, DPWH, JG Summit) is genuinely impressive, the absence of real logos is the highest-impact conversion gap on the site. Fix: supply SVG/PNG logo assets for at least the six most recognizable clients; the marquee animation and grid infrastructure are already production-ready.

---

## Detailed Findings

### Pillar 1: Layout & Spatial Rhythm (3/4)

**What works well**

The spacing token system (`xs` through `5xl`) is applied consistently throughout. Section vertical rhythm follows a predictable pattern: `py-4xl` (96px) for primary sections, `py-3xl` (64px) for supporting sections, `py-5xl` (128px) for page heroes. This creates a clear visual hierarchy between section weights without arbitrary values.

Grid systems are coherent: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` is correctly applied for projects, services, and values. The testimonials grid uses a correct `md:grid-cols-2`. The stats section uses `max-w-5xl` with `grid-cols-3`, which is appropriately narrow to give the count-up numbers room to breathe.

The `max-w-7xl mx-auto` content wrapper is applied consistently, preventing wide-viewport line sprawl. `max-w-3xl` and `max-w-2xl` are correctly used for body copy to maintain ~65–75 character line lengths.

**Issues found**

- **Hero section has no secondary anchor point.** The layout is `h-screen` with centered text + one CTA. On large viewports (1440px+), the bottom third of the hero below the CTA is entirely the background image with no element — there is no visual reason to scroll. A scroll indicator, a floating stats badge, or an offset project image would complete the composition.

- **Services section has 5 cards in a 3-column grid** — the fifth card sits alone on the left of the second row, leaving two empty cells. At `lg` breakpoints this creates an unbalanced layout. Consider a 2-column layout for services (which also gives more room to each card's icon and description), or change to `lg:grid-cols-5` with smaller cards.

- **Projects detail page sidebar is thin** — the `[1fr_320px]` layout allocates significant space to a sidebar that only contains a category badge, optional meta text, a hardcoded "Full-service {category} project" scope string, and a back button. The sidebar is visually sparse and the scope copy is a copy-paste template rather than real project data. This is not a layout problem but a content depth problem that makes the page feel unfinished.

- **Footer is 3 columns on `xl` but reverts to 1 column on mobile and 2 on `md`**. The 1-column mobile stack (Logo/tagline/copyright → Navigation → Contact) has the copyright notice before the nav links, which is an unusual hierarchy. On mobile, navigation utility comes before legal boilerplate.

- **No horizontal padding token inconsistency**: the `px-md md:px-2xl` pattern used on most sections resolves to `16px` on mobile and `48px` on desktop. Several pages use `px-md md:px-2xl` while others use the parent wrapper's `px-md md:px-2xl` inconsistently (e.g., `QMSPage` uses `px-md md:px-2xl` inline on the outer `div` rather than on the section).

**Spacing class usage summary (components/)**

The dominant spacing classes are: `mb-3xl`, `py-4xl`, `gap-lg`, `px-md`, `px-lg`, `py-sm`, `mt-md`, `mt-lg`, `mt-xl`. All resolve from the declared token scale — no raw arbitrary spacing values appear except for the pixel-unit layout values in Navbar's hamburger lines (`h-[2px]`, `gap-[5px]`, `p-[10px]`), which are micro-interaction dimensions, not layout spacing, and are acceptable.

---

### Pillar 2: Typography & Hierarchy (3/4)

**Font system**

Two fonts are in use throughout: `font-display` (Geist, loaded via `next/font/google`) and `font-body` (Inter). Both are self-hosted via `next/font`, eliminating FOUT. Letter-spacing `-0.02em` is applied on the CLMC logo mark and echoes the Phase 1 D-08 intent for negative tracking on display text.

**Sizes in use (extracted from component audit)**

| Usage | Size | Font | Weight |
|-------|------|------|--------|
| Hero H1 | `text-4xl` → `text-5xl` → `text-6xl` | display | bold |
| Page H1 (About, Services, Projects) | `text-4xl` → `text-5xl` → `text-6xl` | display | bold |
| Section H2 | `text-3xl` → `text-4xl` | display | bold |
| Service detail H3 | `text-2xl` | display | bold |
| Card H3 | `text-lg` / `text-[18px]` | display | bold |
| Stats numbers | `text-5xl` → `text-6xl` | display | bold |
| Body / description | `text-lg` | body | regular |
| Secondary text / labels | `text-sm` | body | regular / bold |
| Micro labels | `text-xs` / `text-[12px]` | body | bold |
| Nav links | `text-[14px]` | body | regular |
| Mobile overlay links | `text-[36px]` | display | bold |
| Button text | `text-[14px]` / `text-[16px]` | body | bold |
| Filter pills | `text-[13px]` | body | bold |

This is a well-structured 6-level scale. The two font weights (regular, bold) are correctly applied. Italic is used once and correctly (testimonial quotes).

**Issues found**

- **Hero H1 does not reach the 80–120px cinematic benchmark from D-08.** `text-6xl` is 60px in Tailwind's default scale. The design decision in Phase 1 explicitly called for "aggressive size scale (80–120px for hero-level H1s)." The gap between 60px and 80px is perceptible — at 60px the headline reads as standard marketing hero copy, not as a typographic statement. `text-8xl` (96px) or `text-9xl` (128px) at `lg` would fulfill the brief.

- **Mixed pixel and scale values for font sizes.** Some sizes use Tailwind scale classes (`text-lg`, `text-sm`) while others use arbitrary pixel values (`text-[14px]`, `text-[13px]`, `text-[18px]`, `text-[20px]`, `text-[36px]`). The Tailwind v4 scale already includes `text-sm` (14px), `text-base` (16px), and `text-lg` (18px), making the `text-[14px]`, `text-[16px]`, and `text-[18px]` usages redundant. This is a minor inconsistency that makes the system harder to maintain: `text-[14px]` in Navbar nav links should be `text-sm`; `text-[16px]` in Button should be `text-base`.

- **No `leading-` class on hero H1.** The hero uses `leading-tight` which is correct, but this is not consistently applied to other large headings. The `text-4xl` section headings elsewhere have no line-height class, defaulting to Tailwind's `leading-tight` (1.25) which is correct at large sizes, but worth making explicit for maintenance.

- **H2 heading hierarchy gap on About page.** The About page contains: a Section `h1` ("About CLMC") → inline `h2` ("Our Mission") → MilestonesSection `h2` ("Our Journey") → ValuesSection `h2` ("Our Values"). Three `h2`s at identical size (`text-3xl`/`text-4xl`) in sequence with no visual variation makes the page read as a flat list of sections rather than a document with sub-hierarchy.

---

### Pillar 3: Color & Contrast (3/4)

**Token system**

The monochrome dark-only palette is implemented correctly:

| Token | Value | Usage |
|-------|-------|-------|
| `surface-primary` | `#0D0D0D` | Primary page background |
| `surface-secondary` | `#141414` | Cards, stats section, CTA section |
| `surface-tertiary` | `rgba(255,255,255,0.04)` | Logo placeholder fills |
| `surface-border` | `rgba(255,255,255,0.08)` | Card borders, dividers |
| `text-primary` | `#F5F5F5` | Headings, active states |
| `text-secondary` | `rgba(255,255,255,0.60)` | Body copy, descriptions |
| `text-muted` | `rgba(255,255,255,0.35)` | Labels, captions |
| `interactive-hover` | `rgba(255,255,255,0.70)` | Link hover states |
| `destructive` | `#EF4444` | Form validation errors |

The 60/30/10 surface split works: `surface-primary` dominates, `surface-secondary` creates section delineation, `surface-tertiary` is used sparingly for placeholder elements.

**Issues found**

- **One hardcoded hex color in Button.tsx line 15:** `hover:bg-[#DC2626]` is the destructive button hover state. This is the red-600 Tailwind value and is functionally equivalent to `hover:bg-red-600`, but it bypasses the token system. Low severity, but inconsistent — the destructive base color uses the token `bg-destructive` while the hover hardcodes the hex. Fix: add `--color-destructive-hover: #DC2626` to the `@theme` block in globals.css and reference `hover:bg-destructive-hover`.

- **No visual accent.** The design direction calls for "minimalist-futuristic" — the Linear.app and Vercel references cited in Phase 1 both use selective accent colors (Linear uses violet; Vercel uses its blue gradient on key CTAs). The current site uses white-on-dark for every interactive element. The primary button (`bg-text-primary text-surface-primary`) is a white filled button — visually correct but not differentiated from any other white text element. A single carefully-placed accent — even a subtle gradient on the primary CTA (`from-white to-white/80`), or a rule color for the active nav underline — would give the UI a signature element.

- **`surface-secondary` surface shift is very subtle.** The difference between `#0D0D0D` and `#141414` is ~7 lightness points in LCH. On calibrated displays this creates a clear section boundary; on typical consumer screens it may be imperceptible, causing Services and Stats sections to appear as a single undifferentiated block. This is an acceptable design risk given the monochrome brief, but worth verifying on a real device.

- **Contrast ratios for text-muted cannot be confirmed without rendering**, but `rgba(255,255,255,0.35)` on `#0D0D0D` computes to approximately 3.7:1 — below the WCAG AA threshold of 4.5:1 for small text. `text-muted` is used on category labels, meta text, milestone years, and client industry tags. These are not purely decorative elements; they carry information. The token should be raised to `rgba(255,255,255,0.45)` (approximately 4.6:1) to clear AA for normal text.

---

### Pillar 4: Component Quality (2/4)

**What works well**

- `Button` component: three variant system (primary/ghost/destructive), three sizes, `forwardRef`, disabled state, scale-on-hover micro-interaction, `focus-visible` outline, and `motion-safe:` guard. This is thorough.

- `ProjectCard` component: `forwardRef`, `Link`/`div` polymorphism, `next/image` with `fill`/`sizes`/`priority`/blur placeholder, image zoom on hover, gradient overlay reveal, title/category/meta stagger on hover. All interaction states are covered and the implementation is clean.

- `ServiceCard`: full card is a `<Link>`, icon transitions from `text-secondary` to `text-primary` on hover, border lightens on hover. Correct treatment.

- `TestimonialCard`: `<article>` semantic element, quotation mark with `aria-hidden`, attribution visually separated with a border. Clean.

- `Navbar`: ARIA attributes (`aria-expanded`, `aria-controls`, `aria-current`, `aria-label`), keyboard focus trap on mobile overlay (Escape + Tab cycle), body scroll lock, route-change close. This is an exceptionally thorough implementation for a marketing site.

- Contact form: Formspree integration with `ValidationError` per field, loading state ("Sending..."), success state ("Message Received"), proper `htmlFor`/`id` label pairing, `required` attributes, `disabled` on submit during pending. Solid.

**Issues requiring attention**

- **CEO page has template tokens in production markup** (`app/about/ceo/page.tsx` lines 31, 39, 46, 54): `[CEO Name]`, `[his/her]`, `[Field]`, `[University]`. These are bracket-placeholder strings that will render literally in any browser. This is the most user-facing unfinished content in the entire site.

- **CEO portrait is a grey box with the text "Portrait Photo"** (`app/about/ceo/page.tsx` line 26). A key credibility page that introduces the founding CEO has no image. The grey box with text is functionally a wireframe component.

- **Phone number and office address are placeholder** in both `components/layout/Footer.tsx` (lines 58, 55) and `app/contact/page.tsx` (lines 50, 47, 73). Real contact information is the primary conversion goal of a B2B construction firm website.

- **Contact map is a grey box** (`app/contact/page.tsx` line 78): `<div className="h-48 rounded-md bg-surface-tertiary flex items-center justify-center"><span>Map</span></div>`. An embedded map (even a simple static Google Maps link) is a standard trust signal for Philippine B2B clients who want to verify a physical office exists.

- **ClientsGridSection renders 12 grey rectangles** instead of logo images. The infrastructure for a logo grid is built, but every cell shows a `bg-surface-tertiary` rectangle. The client names (Ayala, SM Prime, DPWH) are present as text, which is better than nothing, but logos are the expected visual format for a clients page.

- **ClientLogosSection marquee shows "Client 1" through "Client 8"** text labels in grey placeholder boxes. The marquee animation itself works well (CSS-only, correct dual-track loop, edge fade gradients), but the content is entirely placeholder.

- **ProjectsGallery masonry columns layout** — `columns-1 md:columns-2 lg:columns-3` with CSS `columns` creates a newspaper-column flow which can produce large vertical gaps when one column is significantly taller than adjacent ones. The `break-inside-avoid` is correct, but with `aspect-[4/3]` cards of uniform size, the masonry effect is minimal — the grid would look the same (and perform better) as a CSS Grid with `grid-cols-3`. The `AnimatePresence` filter animation is the strongest visual feature here and works correctly.

- **Project detail sidebar scope text is hardcoded** (`app/projects/[slug]/page.tsx` line 121): `Full-service {project.category.toLowerCase()} project` — this is identical boilerplate for every project and reads as unfinished. The `Project` data type includes a `description` field that is already used in the main column; the sidebar needs actual scope data populated from the project record.

---

### Pillar 5: Animation & Motion (4/4)

**Overview**

The animation implementation is the strongest pillar of the entire codebase. Every motion decision is technically sound and reflects current best practices for React + Next.js 15 + GSAP.

**Hero parallax (`useHeroParallax.ts`)**

- Correctly scoped via `useGSAP({ scope: heroRef })` — prevents ScrollTrigger memory leaks on route change (the primary GSAP/Next.js pitfall).
- `prefers-reduced-motion` check at the top of the callback, returning early before any GSAP setup.
- Mobile breakpoint guard (`window.innerWidth < 1024`) correctly disables parallax on touch devices where it causes nausea.
- Background parallax at 15% speed differential is conservative and appropriate — avoids the "over-done" parallax look.
- Text fade-out on scroll (`opacity: 0, y: -30`) is a strong editorial touch.
- `resize` event listener cleanup correctly prevents stale ScrollTrigger positions.

**Scroll reveal (`useFadeUp.ts`, `useStagger.ts`)**

- Data-attribute API (`[data-fade-up]`, `[data-stagger]`, `[data-stagger-child]`) is a clean separation of animation from component logic.
- Bidirectional animation (onEnter / onLeave / onEnterBack / onLeaveBack) means elements re-animate when scrolled back into view — a detail most implementations skip.
- CSS initial states in `globals.css` (`opacity: 0; transform: translateY(40px)`) prevent flash of visible content on SSR before GSAP initializes.
- `prefers-reduced-motion` CSS override in `globals.css` correctly forces `opacity: 1 !important; transform: none !important` so content is never hidden for motion-sensitive users.
- Stagger `each: 0.1` on a 3-column grid produces 0.2s maximum stagger delay — tight and not distracting.

**Count-up (`useCountUp.ts`)**

- `IntersectionObserver` at `threshold: 0.5` ensures the counter only starts when clearly visible.
- `prefers-reduced-motion` check correctly shows the final number immediately.
- `rAF` loop with cubic ease-out provides a natural deceleration curve.
- Single-fire design (`started` flag) prevents re-triggering on scroll-back.

**Page transitions (`app/template.tsx`)**

- `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` on the template creates a 300ms fade between routes. Short, unobtrusive, correct placement in the App Router template (not layout).

**Lenis integration (`LenisProvider.tsx`)**

- `gsap.ticker.add` pattern correctly syncs Lenis scroll with GSAP's ticker (the recommended integration).
- `lagSmoothing(0)` prevents GSAP from compensating for browser lag frames, which would cause visual desync with Lenis.
- `autoRaf: false` on the Lenis instance correctly delegates RAF to the GSAP ticker.
- `motionQuery.matches` guard skips Lenis entirely for reduced-motion users.
- Route-change scroll-to-top via `lenisRef.current?.scrollTo(0, { immediate: true })`.

**Filter animation (`ProjectsGallery.tsx`)**

- `AnimatePresence mode="popLayout"` with `layout` prop on each `motion.div` provides smooth filter transitions without janky reflow.
- `scale: 0.95` enter/exit avoids the generic opacity-only fade pattern.

**Minor note:** the `useClipReveal` hook exists in `components/animation/` but is not used in any of the audited pages. The `[data-clip-reveal]` CSS state in `globals.css` is also set up but unused. This is dead code that adds CSS weight (small) and could confuse future developers. No score impact, but should be removed or documented as a reserved pattern.

---

### Pillar 6: Visual Identity & Brand (2/4)

**Context**

The project mandate is explicit: "most forward-thinking construction firm in the Philippines — winning clients through prestige and credibility on every scroll." The reference aesthetic is Linear.app and Vercel. The design decision was "minimalist-futuristic."

**What lands correctly**

- Dark-only monochrome palette is appropriate for the construction premium segment and consistent with the Linear/Vercel reference. It immediately differentiates from typical Philippine construction sites (white backgrounds, green/yellow corporate palettes).
- Geist + Inter type pairing is clean and technical. Geist carries the "engineering precision" connotation that is right for a construction management firm.
- The transparent-to-frosted-glass navbar is a premium interaction detail that construction industry competitors do not have.
- Full-screen mobile overlay with large display-font links is a considered design statement.
- The client list (Ayala, SM Prime, DPWH, JG Summit, Megaworld) is genuinely prestigious — if surfaced visually, it would establish immediate credibility.

**Where the brief is not yet fulfilled**

- **No real photography anywhere in the site.** Every image path points to `/images/hero-placeholder.jpg` or `/images/project-placeholder.jpg`. The visual identity of a construction firm is entirely dependent on completed project photography. The monochrome design system is specifically engineered to make high-quality photography pop against dark surfaces — but that relationship only works with real images. The current state shows the same stock placeholder for every project card, the hero background, and all project detail pages.

- **The hero underdelivers on "cinematic."** A 60px headline, a single white button, and a grey-toned placeholder photo is the visual floor, not the ceiling. The Vercel homepage — one of the stated references — uses a headline that occupies roughly 15% of viewport height, dramatic gradient text, and animated backgrounds. The hero structure is sound; the execution needs the real photography and the larger type to fulfill the mandate.

- **No typographic signature element.** The linear-futuristic sites that CLMC aspires to resemble share a common trait: one unconventional typographic element that anchors the visual identity. This might be: a vertically-set label on section headings, an oversized muted background word (e.g., "CONSTRUCT" at 200px opacity-5 behind section copy), a thin hairline separating eyebrow text from headings, or a letter-spacing stretch on uppercase category labels. The current typography is clean but entirely conventional.

- **Client logos section is placeholder.** As noted in Pillar 4, the single most powerful trust element — "Trusted by Ayala, SM Prime, DPWH" — is currently invisible behind grey boxes. On a prestige-positioned site, this is a significant brand gap.

- **Services and Values use identical card templates.** ServiceCard, ValuesCard (in ValuesSection), and the ClientsGrid cards all use the same visual pattern: white border, `surface-secondary/50` background, padding. There is no visual differentiation between the types of content. The services page's ServiceDetailSection (horizontal divider list) is a different and better pattern for that context, but the home page ServicesSection and the ValuesSection feel like variants of the same card.

- **No editorial moment on any interior page.** Interior pages (About, Services, QMS) follow a strict hero-then-content pattern with no large-format visual breaks, no pull quotes, no oversized numbers, and no full-bleed image moments. The QMS page in particular is pure text on dark background — a document, not a designed page. A single typographic accent (e.g., the policy title at 120px opacity-10 as a background element) would make it feel intentional.

---

## Registry Safety

No shadcn (`components.json` not present). Registry audit skipped.

---

## Files Audited

**App Router pages**
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/template.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/about/page.tsx`
- `app/about/ceo/page.tsx`
- `app/services/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/clients/page.tsx`
- `app/clients/testimonials/page.tsx`
- `app/qms/page.tsx`
- `app/contact/page.tsx`

**Components — layout**
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/providers/LenisProvider.tsx`

**Components — UI atoms**
- `components/ui/Button.tsx`
- `components/ui/ProjectCard.tsx`
- `components/ui/ServiceCard.tsx`
- `components/ui/TestimonialCard.tsx`

**Components — sections**
- `components/sections/HeroSection.tsx`
- `components/sections/FeaturedProjectsSection.tsx`
- `components/sections/ServicesSection.tsx`
- `components/sections/StatsSection.tsx`
- `components/sections/ClientLogosSection.tsx`
- `components/sections/InquiryCTASection.tsx`
- `components/sections/ProjectsGallery.tsx`
- `components/sections/AboutHeroSection.tsx`
- `components/sections/MilestonesSection.tsx`
- `components/sections/ValuesSection.tsx`
- `components/sections/ServiceDetailSection.tsx`
- `components/sections/ClientsGridSection.tsx`
- `components/sections/TestimonialsGridSection.tsx`
- `components/sections/ContactFormSection.tsx`

**Animation hooks**
- `components/animation/useFadeUp.ts`
- `components/animation/useHeroParallax.ts`
- `components/animation/useStagger.ts`

**Data layer**
- `data/projects.ts`
- `data/services.ts`
- `data/about.ts`
- `data/clients.ts`
- `data/testimonials.ts`

**Hooks**
- `hooks/useCountUp.ts`

**Planning context**
- `.planning/phases/01-foundation-and-design-system/01-CONTEXT.md`
- `.planning/phases/03-home-page/03-CONTEXT.md`
