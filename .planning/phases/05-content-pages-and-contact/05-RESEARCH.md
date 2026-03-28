# Phase 5: Content Pages and Contact - Research

**Researched:** 2026-03-28
**Domain:** Next.js App Router content pages, Formspree form integration, data file patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** About Us layout: hero banner section + mission statement section + timeline/milestones section + team values grid. Rich, multi-section page.
- **D-02:** About CEO layout: large portrait photo (left) + bio text (right) split on desktop, stacked on mobile. Route: `app/about/ceo/page.tsx` nested under /about.
- **D-03:** All content is placeholder text — user provides real company history, CEO bio, mission statement, and portrait photo later.
- **D-04:** Reuse existing fade-up + stagger animations from Phase 2 — consistent with home page sections. No custom page-specific animations.
- **D-05:** Services page: dedicated section per service with icon, title, full description paragraph, and scope bullet list. Reuse ServiceCard pattern and Lucide icons.
- **D-06:** Our Clients page (`/clients`): full-color logo grid (3-4 columns) with company names beneath each logo — consistent with home marquee style but as a static, scannable grid.
- **D-07:** Client Testimony page (`/clients/testimonials`): testimonial cards with quote text, client name, company, and role — 2-column grid on desktop, stacked on mobile.
- **D-08:** Separate pages for clients vs testimonials (not combined).
- **D-09:** QMS page: scannable document layout — section headings + paragraphs + numbered lists. Clean typography, similar to a legal/policy page. Route: `app/qms/page.tsx` top-level.
- **D-10:** Contact form fields: Name, Email, Phone, Subject (dropdown: General Inquiry, Project Consultation, Request for Inspection), Message textarea.
- **D-11:** Form submission via Formspree (free tier, no backend needed, works with static export) — form action posts to Formspree endpoint. Placeholder endpoint until real one configured.
- **D-12:** Contact page layout: two columns — form on left, contact info card on right (phone, email, office address, map placeholder). Stacked on mobile.
- **D-13:** CTCT-02: Phone and email already in Footer from Phase 1. Verify present and add to contact page info card as well.
- **D-14:** Update Navbar component to include all new page links. Ensure mobile hamburger menu works with expanded nav set.
- **D-15:** Page routes: `/about`, `/about/ceo`, `/services`, `/clients`, `/clients/testimonials`, `/qms`, `/contact`

### Claude's Discretion

- Placeholder text content for all pages (company history, CEO bio, service descriptions, testimonials, QMS policy text)
- Number of placeholder client logos (suggest 12-16 for a full grid)
- Number of placeholder testimonials (suggest 4-6)
- Timeline/milestone entries for About Us page
- Team values section content and number of values
- Contact info card details (placeholder phone, email, address)
- Formspree integration specifics (placeholder endpoint)
- QMS policy section structure and heading hierarchy
- Service page section ordering and visual breaks
- CEO portrait placeholder approach

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABOUT-01 | Visitor can read the About Us page covering CLMC's company background, founding, mission, and track record | Multi-section page pattern; data file for milestones/values; fade-up + stagger animation reuse |
| ABOUT-02 | Visitor can read the About CEO page with a leadership profile and portrait photography | Split layout pattern; next/image for portrait; nested route `app/about/ceo/page.tsx` |
| SVC-01 | Visitor can read the Services page with a clear enumeration of management consultancy and engineering services | ServiceCard component reuse with extended detail sections; SERVICES data array from ServicesSection |
| CLIENT-01 | Visitor can view the Our Clients page displaying a logo grid of key clients with brief context | Static grid pattern; data file for client logos; reference ClientLogosSection logo styling |
| TESTI-01 | Visitor can read the Client Testimony page with curated written testimonials from past clients | Card grid pattern; data file for testimonials; 2-col / stacked responsive layout |
| QMS-01 | Visitor can view the QMS Policy page displaying CLMC's quality management system documentation in a scannable layout | Long-form typography page; prose-style structured content; no components needed beyond layout |
| CTCT-01 | Visitor can submit an inquiry via a contact form; submission triggers email delivery to CLMC | `@formspree/react` 3.0.0 `useForm` hook; `"use client"` ContactForm component; placeholder FORM_ID |
| CTCT-02 | CLMC's phone number and email address visible in the header or footer on all pages | Footer already has phone/email (verified); add to contact page info card |
| CTCT-03 | Visitor can access a dedicated Contact page (/contact) from the navigation | `/contact` route exists as placeholder; Navbar already has Contact link |
</phase_requirements>

---

## Summary

Phase 5 is the widest page-count phase in the project — seven routes, most of which are currently stub placeholders. The work is primarily content page construction using the design system and animation infrastructure already in place. There is no new animation infrastructure to build; all scroll-triggered reveals reuse `useFadeUp` and `useStagger` with the existing `data-fade-up` / `data-stagger` / `data-stagger-child` data attribute API.

The one genuinely new technical domain is the contact form. The locked decision (D-11) is Formspree with the `@formspree/react` package. This package is at v3.0.0 and provides a `useForm` hook that manages submission state, error display, and a success state — all within a `"use client"` component. The pattern fits cleanly into the project's existing rule that Server Components are the default and client boundaries are added only for interactivity.

The remaining complexity is organizational: five new data files (about milestones, about values, services expanded, client logos, testimonials), three new nested routes (`/about/ceo`, `/clients/testimonials`, `/qms`), four page rewrites of existing placeholders, and a Navbar update that adds the QMS and testimonials sub-links. The Navbar already contains Home, About, Services, Projects, Clients, Contact — the new nested pages (`/about/ceo`, `/clients/testimonials`, `/qms`) may or may not need explicit top-level nav entries; the planner should clarify whether a dropdown or sequential link approach is used.

**Primary recommendation:** Split Phase 5 into two plans — Plan 1 covers About, Services, Clients/Testimonials, and QMS content pages (pure Server Components with animation hooks). Plan 2 covers the contact form (new `@formspree/react` dependency + client component + success/error states) and Navbar updates.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.2.1 (installed) | Nested routes, Server Components | Already in project |
| `next/image` | built-in | CEO portrait, client logos | Already used for HeroSection and project cards |
| `@formspree/react` | 3.0.0 (latest) | Contact form submission + state | Locked decision D-11; zero backend required |
| GSAP + `@gsap/react` | 3.14.2 + 2.1.2 (installed) | Scroll-triggered animations via `useFadeUp`/`useStagger` | Already established; D-04 mandates reuse |
| Lucide React | 0.577.0 (installed) | Service icons on Services page | Already used in ServicesSection |
| Tailwind CSS v4 | 4.x (installed) | All layout and styling | Project standard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` (via `cn`) | installed | Conditional class merging | Wherever animation state or responsive variants are combined |

### New Install Required
```bash
npm install @formspree/react
```

**Version verification:** `@formspree/react` latest is `3.0.0` (verified via npm registry 2026-03-28).

---

## Architecture Patterns

### New Routes Required
```
app/
├── about/
│   ├── page.tsx          # About Us — rewrite placeholder (exists)
│   └── ceo/
│       └── page.tsx      # About CEO — NEW nested route
├── services/
│   └── page.tsx          # Services — rewrite placeholder (exists)
├── clients/
│   ├── page.tsx          # Our Clients — rewrite placeholder (exists)
│   └── testimonials/
│       └── page.tsx      # Client Testimonials — NEW nested route
├── qms/
│   └── page.tsx          # QMS Policy — NEW top-level route
└── contact/
    └── page.tsx          # Contact — rewrite placeholder (exists)

data/
├── projects.ts           # exists
├── services.ts           # NEW — expanded service definitions
├── clients.ts            # NEW — client logo data
├── testimonials.ts       # NEW — testimonial card data
└── about.ts              # NEW — milestones + values arrays

components/
├── sections/             # NEW sections for new pages
│   ├── AboutHeroSection.tsx
│   ├── MilestonesSection.tsx
│   ├── ValuesSection.tsx
│   ├── ServiceDetailSection.tsx
│   ├── ClientsGridSection.tsx
│   ├── TestimonialsGridSection.tsx
│   └── ContactFormSection.tsx
└── ui/
    └── TestimonialCard.tsx  # NEW UI atom
```

### Pattern 1: Server Component Page with Client Animation Wrapper

All content pages follow the same structure established in Phase 3 — the page itself is a Server Component, and animated sections import client components that own the `useRef` + animation hooks.

```tsx
// app/about/page.tsx — Server Component (no 'use client')
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { MilestonesSection } from '@/components/sections/MilestonesSection'
import { ValuesSection } from '@/components/sections/ValuesSection'

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <MilestonesSection />
      <ValuesSection />
    </main>
  )
}
```

```tsx
// components/sections/MilestonesSection.tsx — Client Component (needs animation hooks)
'use client'
import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'
import { MILESTONES } from '@/data/about'

export function MilestonesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useFadeUp(sectionRef)
  useStagger(sectionRef)

  return (
    <section ref={sectionRef} className="py-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <h2 data-fade-up className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3xl">
          Our Journey
        </h2>
        <div data-stagger className="flex flex-col gap-xl">
          {MILESTONES.map((m) => (
            <div key={m.year} data-stagger-child className="border-l-2 border-surface-border pl-lg">
              <span className="font-display text-sm font-bold text-text-muted">{m.year}</span>
              <p className="font-body text-text-secondary mt-xs">{m.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Key insight:** `data-stagger-child` goes on the wrapper div, NOT on the imported component directly — matches the established Phase 3 pattern (see STATE.md decision: "data-stagger-child placed on wrapper div elements, not directly on ProjectCard component").

### Pattern 2: Data File Convention

Follow `data/projects.ts` — typed interface + exported const array. New data files use the same structure.

```ts
// data/testimonials.ts
export interface Testimonial {
  id: string
  quote: string
  clientName: string
  company: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Placeholder testimonial quote from client organization...',
    clientName: 'John Doe',
    company: 'Placeholder Corp',
    role: 'Vice President, Operations',
  },
  // ... 3-5 more
]
```

### Pattern 3: Formspree Contact Form (Client Component)

The contact form is the only genuinely interactive component in this phase. It requires `"use client"` and the `@formspree/react` package.

```tsx
// components/sections/ContactFormSection.tsx
'use client'
import { useForm, ValidationError } from '@formspree/react'
import { Button } from '@/components/ui/Button'

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Project Consultation',
  'Request for Inspection',
]

export function ContactFormSection() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'placeholder'
  )

  if (state.succeeded) {
    return (
      <div className="py-2xl text-center">
        <p className="font-display text-2xl font-bold text-text-primary">Message Received</p>
        <p className="font-body text-text-secondary mt-md">
          Thank you for reaching out. We will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-lg" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="name" className="font-body text-sm text-text-secondary">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="bg-surface-secondary border border-surface-border rounded-md px-md py-sm font-body text-text-primary focus:outline-none focus-visible:border-white/40"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-destructive text-sm" />
      </div>

      {/* Subject dropdown */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="subject" className="font-body text-sm text-text-secondary">Subject</label>
        <select
          id="subject"
          name="subject"
          className="bg-surface-secondary border border-surface-border rounded-md px-md py-sm font-body text-text-primary focus:outline-none focus-visible:border-white/40"
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="message" className="font-body text-sm text-text-secondary">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="bg-surface-secondary border border-surface-border rounded-md px-md py-sm font-body text-text-primary focus:outline-none focus-visible:border-white/40 resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-destructive text-sm" />
      </div>

      {/* General errors */}
      <ValidationError errors={state.errors} className="text-destructive text-sm" />

      <Button type="submit" variant="primary" size="md" disabled={state.submitting}>
        {state.submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

**Environment variable:** Add `NEXT_PUBLIC_FORMSPREE_ID=placeholder` to `.env.local`. The value `"placeholder"` will cause submissions to 404 gracefully until real ID is configured.

### Pattern 4: About CEO Split Layout

```tsx
// app/about/ceo/page.tsx — Server Component
import Image from 'next/image'

export default function AboutCeoPage() {
  return (
    <main className="pt-5xl pb-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl items-start">
          {/* Portrait — left on desktop */}
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-md overflow-hidden bg-surface-secondary">
            {/* Placeholder until real portrait provided */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-text-muted text-sm">Portrait Photo</span>
            </div>
          </div>
          {/* Bio — right on desktop */}
          <div className="flex flex-col gap-xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary">
              [CEO Name]
            </h1>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              [CEO bio placeholder paragraph]
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
```

The CEO page has no scroll animations (D-04 says reuse existing patterns but the single viewport page with immediate content does not benefit — consistent with Phase 4 detail page decision: "Detail page content has no data-fade-up — renders immediately visible").

### Pattern 5: QMS Policy Long-Form Page

Pure typography, Server Component, no client boundary. Uses a nested `data/qms.ts` or inline structured content array with headings + paragraphs + numbered lists. No animation hooks needed — scannable document pages benefit from immediate display.

### Anti-Patterns to Avoid
- **Animating the CEO portrait page:** It's a single-viewport leadership profile — animating it would feel gratuitous. Render immediately like the project detail page.
- **Nesting `<button>` inside `<a>` for form CTA:** Use `buttonVariants` on the `<button type="submit">` element directly as established by the Phase 3 pattern.
- **`data-stagger-child` directly on component:** Place on the wrapper `<div>`, not on `<ServiceCard>`, `<TestimonialCard>`, etc. — GSAP hooks scan native DOM.
- **Importing GSAP directly:** Always import from `@/lib/gsap`, never from `gsap` directly.
- **Server Component for the contact form page:** `app/contact/page.tsx` stays a Server Component; only `ContactFormSection` (the form itself) needs `"use client"`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form submission + email delivery | Custom API route / serverless function | `@formspree/react` `useForm` | Free tier handles 50 submissions/month; includes spam filtering, email templates, field validation, AJAX submission — weeks of backend work |
| Form success/error state | Manual `useState` boolean flags | `state.succeeded`, `state.submitting`, `state.errors` from `useForm` | Covers all edge cases including network failure and field-level validation errors |
| Form field validation display | Custom validation components | `ValidationError` from `@formspree/react` | Handles both field-level and form-level errors in one component |
| Scroll-triggered section reveals | New animation hooks | Existing `useFadeUp` + `useStagger` | Already implemented, tested, and DSGN-04 compliant |
| Responsive image sizing | Manual `<img srcset>` | `next/image` with `fill` and `sizes` | Already used everywhere; handles AVIF/WebP conversion automatically |

---

## Common Pitfalls

### Pitfall 1: Navbar Mobile Focus Trap Breaking with More Links
**What goes wrong:** The existing Navbar uses `overlayFirstRef` and `overlayLastRef` to trap focus. If new links are added to `NAV_LINKS` (e.g., adding QMS), the last link index calculation (`isLast = index === NAV_LINKS.length - 1`) still works correctly — but only if sub-links (CEO, Testimonials) are NOT added to the array. Sub-pages accessed only via page navigation (not top nav) don't need to be in NAV_LINKS.
**How to avoid:** Keep NAV_LINKS flat — the existing six entries (Home, About, Services, Projects, Clients, Contact) are sufficient. QMS and sub-pages (CEO, Testimonials) are reachable through content links within parent pages, not required as top-level nav items.

### Pitfall 2: Formspree `useForm` with `NEXT_PUBLIC_` Variables in Static Export
**What goes wrong:** If `process.env.NEXT_PUBLIC_FORMSPREE_ID` is undefined at build time (no `.env.local`), the `useForm(undefined)` call will throw or produce unexpected behavior.
**How to avoid:** Always provide a fallback: `useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'placeholder')`. The string `'placeholder'` will simply result in a 404 from Formspree's API, which `state.errors` will surface gracefully.

### Pitfall 3: `data-fade-up` / `data-stagger-child` Initial State Flashing
**What goes wrong:** `globals.css` already sets `[data-fade-up] { opacity: 0; transform: translateY(40px) }`. If a section is rendered as a Server Component without a wrapping client component that calls `useFadeUp`, the elements remain invisible forever.
**How to avoid:** Every section that uses `data-fade-up` or `data-stagger-child` attributes MUST be a `'use client'` component that calls the corresponding hook. Server-only sections that don't need animation should NOT use those data attributes.

### Pitfall 4: `next/image` CEO Portrait Without Dimensions
**What goes wrong:** Using `fill` on the portrait image without a positioned parent `div` causes layout collapse or CLS.
**How to avoid:** Always wrap `fill` images in a `relative` parent with a defined `aspect-ratio` or explicit `height/width` (e.g., `aspect-[3/4]`). Already demonstrated in HeroSection with `relative h-screen`.

### Pitfall 5: `select` Element Styling in Tailwind v4
**What goes wrong:** `<select>` elements have browser-native arrow styling that doesn't respond to `appearance-none` without an explicit reset in Tailwind v4 (the `@base` layer no longer includes a form reset by default).
**How to avoid:** Add `appearance-none` class AND a custom SVG chevron background to the select, or use a custom dropdown component. Simplest: add `appearance-none` and rely on browser default arrow (acceptable for a premium but practical contact form).

### Pitfall 6: Formspree Free Tier Submission Limit
**What goes wrong:** Formspree free tier is limited to 50 submissions/month. For a construction firm's contact form, this may be fine for v1 but could hit limits during campaigns.
**How to avoid:** Placeholder endpoint in code; user must create a Formspree account and replace with real form ID. Document this clearly in code comments. User will receive email notifications via Formspree dashboard.

---

## Code Examples

### Reusing `useFadeUp` + `useStagger` (established pattern)
```tsx
// Source: components/sections/ServicesSection.tsx (existing)
'use client'
import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'

export function SomeContentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useFadeUp(sectionRef)
  useStagger(sectionRef)

  return (
    <section ref={sectionRef} className="py-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <h2 data-fade-up className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3xl">
          Section Heading
        </h2>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {items.map((item) => (
            <div key={item.id} data-stagger-child>
              {/* item content */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Formspree Installation and Basic Usage
```bash
npm install @formspree/react
```

```tsx
// Source: https://formspree.io/guides/nextjs/
'use client'
import { useForm, ValidationError } from '@formspree/react'

export function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'placeholder')

  if (state.succeeded) {
    return <p className="text-text-primary font-body">Thanks! We'll be in touch.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <ValidationError field="email" prefix="Email" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>Submit</button>
    </form>
  )
}
```

### Client Logo Grid (static, scannable — D-06)
```tsx
// Pattern: static grid, not marquee (different from ClientLogosSection)
// Server Component — no animation needed for a static logo grid
export function ClientsGridSection() {
  return (
    <section className="py-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
          {CLIENT_LOGOS.map((client) => (
            <div key={client.id} className="flex flex-col items-center gap-sm p-lg border border-surface-border rounded-md bg-surface-secondary/50">
              <div className="h-12 w-32 flex items-center justify-center">
                {/* next/image for real logos; placeholder div for now */}
                <div className="h-8 w-24 rounded bg-surface-tertiary" />
              </div>
              <span className="font-body text-sm text-text-secondary text-center">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| HTML `action=""` POST to Formspree URL | `@formspree/react` `useForm` hook (AJAX) | Formspree v2+ | No full-page reload; success/error states in React; field validation display |
| `react-hook-form` for client forms | `@formspree/react` built-in state (`useForm`) | 2023 onwards for simple forms | Fewer dependencies; Formspree provides both submission AND state management |
| `next-seo` package for metadata | Next.js native Metadata API | Next.js 13+ | Built-in, no extra dep (Phase 6 concern, not Phase 5) |

**Note on `@formspree/react` v3.0.0:** The package was updated to v3.0.0 (current as of 2026-03-28). The public API (`useForm`, `ValidationError`) is stable and matches the official Formspree Next.js guide.

---

## Open Questions

1. **QMS page: inline data vs separate data file**
   - What we know: QMS is a policy document, likely 500-1500 words. It may never change programmatically.
   - What's unclear: Should it be a TypeScript data array or just JSX prose directly in `app/qms/page.tsx`?
   - Recommendation: Inline JSX prose in the page file. No need for a data layer on a static policy document. Simpler to maintain.

2. **Navbar: Does QMS need a top-level nav link?**
   - What we know: Current NAV_LINKS has 6 items. QMS is a compliance/policy page, less prominent than primary navigation.
   - What's unclear: CONTEXT.md D-14 says "update Navbar to include all new page links" — but D-15 lists routes without specifying which appear in top nav.
   - Recommendation: Keep top nav flat (existing 6 links). Link to QMS from Footer "Navigation" column and from the About Us page. Keep Navbar uncluttered.

3. **Formspree FORM_ID: where to document the setup step**
   - What we know: The placeholder `"placeholder"` string will produce a Formspree 404 on submit.
   - What's unclear: Should there be a `TODO` comment or a `.env.example` file?
   - Recommendation: Add `.env.local.example` with `NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here` and a `// TODO:` comment in the component.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — no jest, vitest, or playwright config found |
| Config file | None |
| Quick run command | `npm run lint` (ESLint only) |
| Full suite command | `npm run build` (type-check + build verification) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABOUT-01 | About Us page renders without error | build smoke | `npm run build` | ❌ Wave 0 — page is placeholder |
| ABOUT-02 | About CEO page renders without error | build smoke | `npm run build` | ❌ Wave 0 — route does not exist |
| SVC-01 | Services page renders without error | build smoke | `npm run build` | ❌ Wave 0 — page is placeholder |
| CLIENT-01 | Clients page renders without error | build smoke | `npm run build` | ❌ Wave 0 — page is placeholder |
| TESTI-01 | Testimonials page renders without error | build smoke | `npm run build` | ❌ Wave 0 — route does not exist |
| QMS-01 | QMS page renders without error | build smoke | `npm run build` | ❌ Wave 0 — route does not exist |
| CTCT-01 | Contact form renders, `useForm` initializes without throw | build smoke + manual | `npm run build` + browser test | ❌ Wave 0 |
| CTCT-02 | Footer has phone and email links | manual visual | `npm run dev` + inspect | ✅ Footer.tsx verified in research |
| CTCT-03 | `/contact` route accessible from nav | build smoke | `npm run build` | ✅ route exists; nav link exists |

### Sampling Rate
- **Per task commit:** `npm run lint && npm run build` — catches type errors and broken routes
- **Per wave merge:** `npm run build` full build green
- **Phase gate:** All routes resolve (no 404), form renders, Footer contact info present before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `app/about/ceo/page.tsx` — covers ABOUT-02 (route must exist before build passes)
- [ ] `app/clients/testimonials/page.tsx` — covers TESTI-01
- [ ] `app/qms/page.tsx` — covers QMS-01
- [ ] `.env.local` with `NEXT_PUBLIC_FORMSPREE_ID=placeholder` — required for `ContactFormSection` to compile without undefined env error

*(No test framework is installed. All verification is build-time type checking + manual browser inspection — consistent with project's current state.)*

---

## Sources

### Primary (HIGH confidence)
- Formspree official Next.js guide (https://formspree.io/guides/nextjs/) — `useForm` hook API, `ValidationError` usage, `"use client"` requirement
- npm registry — `@formspree/react` version 3.0.0 (verified 2026-03-28)
- Existing codebase — `components/animation/useFadeUp.ts`, `useStagger.ts`, `ServicesSection.tsx`, `Navbar.tsx`, `Footer.tsx`, `Button.tsx`, `data/projects.ts` (all read directly)
- `app/globals.css` — confirmed `--color-destructive: #EF4444` token exists (placed for Phase 5 form use)
- `package.json` — confirmed installed versions: gsap 3.14.2, @gsap/react 2.1.2, lucide-react 0.577.0, motion 12.38.0, next 16.2.1

### Secondary (MEDIUM confidence)
- WebSearch: Formspree free tier 50 submissions/month — multiple sources agree (help.formspree.io, saasworthy.com)
- Next.js official forms guide (https://nextjs.org/docs/app/guides/forms) — Server Actions pattern context (not used here per D-11, but confirms `"use client"` approach is correct for Formspree)

### Tertiary (LOW confidence)
- None — all critical claims verified against official sources or codebase directly

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified against npm registry and official docs; versions confirmed from installed `package.json`
- Architecture: HIGH — patterns extrapolated directly from existing codebase with confirmed established patterns from STATE.md
- Formspree integration: HIGH — official guide read directly; package version verified
- Pitfalls: MEDIUM — drawn from code analysis and known Next.js/Tailwind/Formspree patterns; some (select styling) are general web knowledge

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (Formspree API stable; Next.js App Router patterns stable; 30-day window appropriate)
