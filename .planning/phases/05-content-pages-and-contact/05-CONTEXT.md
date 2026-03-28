# Phase 5: Content Pages and Contact - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all remaining CLMC content pages (About Us, About CEO, Services, Our Clients, Client Testimonials, QMS Policy) and the Contact page with a working form submission. All pages consistent with the design system and animation patterns from earlier phases.

This phase does NOT include SEO metadata (Phase 6), performance optimization (Phase 6), or accessibility audit (Phase 6).

</domain>

<decisions>
## Implementation Decisions

### About Pages
- **D-01:** About Us layout: hero banner section + mission statement section + timeline/milestones section + team values grid. Rich, multi-section page.
- **D-02:** About CEO layout: large portrait photo (left) + bio text (right) split on desktop, stacked on mobile. Route: `app/about/ceo/page.tsx` nested under /about.
- **D-03:** All content is placeholder text — user provides real company history, CEO bio, mission statement, and portrait photo later.
- **D-04:** Reuse existing fade-up + stagger animations from Phase 2 — consistent with home page sections. No custom page-specific animations.

### Services Page
- **D-05:** Expand on home page service cards — dedicated section per service with icon, title, full description paragraph, and scope bullet list. Reuse ServiceCard pattern and Lucide icons.

### Clients & Testimonials
- **D-06:** Our Clients page (`/clients`): full-color logo grid (3-4 columns) with company names beneath each logo — consistent with home marquee style but as a static, scannable grid.
- **D-07:** Client Testimony page (`/clients/testimonials`): testimonial cards with quote text, client name, company, and role — 2-column grid on desktop, stacked on mobile.
- **D-08:** Separate pages for clients vs testimonials (not combined).

### QMS Policy Page
- **D-09:** Scannable document layout — section headings + paragraphs + numbered lists. Clean typography, similar to a legal/policy page. Route: `app/qms/page.tsx` top-level.

### Contact Page & Form
- **D-10:** Contact form fields: Name, Email, Phone, Subject (dropdown: General Inquiry, Project Consultation, Request for Inspection), Message textarea.
- **D-11:** Form submission via Formspree (free tier, no backend needed, works with static export) — form action posts to Formspree endpoint. Placeholder endpoint until real one configured.
- **D-12:** Contact page layout: two columns — form on left, contact info card on right (phone, email, office address, map placeholder). Stacked on mobile.
- **D-13:** CTCT-02: Phone and email already in Footer from Phase 1. Verify present and add to contact page info card as well.

### Navigation Integration
- **D-14:** Update Navbar component to include all new page links. Ensure mobile hamburger menu works with expanded nav set.
- **D-15:** Page routes:
  - `/about` — About Us
  - `/about/ceo` — About CEO (nested)
  - `/services` — Services (already exists as placeholder)
  - `/clients` — Our Clients
  - `/clients/testimonials` — Client Testimonials (nested)
  - `/qms` — QMS Policy (new top-level)
  - `/contact` — Contact (already exists as placeholder)

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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ServiceCard` component (`components/ui/ServiceCard.tsx`): icon + title + description with Link — reuse for services page
- `ProjectCard` component: established card pattern for reference
- `Button` / `buttonVariants`: CTA buttons and styled links
- Animation hooks: `useFadeUp`, `useStagger`, `useClipReveal` for scroll-triggered entrances
- `ClientLogosSection` (`components/sections/ClientLogosSection.tsx`): marquee pattern — reference for logo styling
- Footer component: already has contact info (phone, email) — verify CTCT-02

### Established Patterns
- Server Components by default, client only for interactive elements
- `forwardRef` on UI components
- Tailwind CSS v4 with @theme tokens
- Data-attribute animation API
- Placeholder content approach (used throughout Phase 3 and 4)

### Integration Points
- `app/about/page.tsx` — placeholder, will become About Us
- `app/about/ceo/page.tsx` — new, nested under about
- `app/services/page.tsx` — placeholder, will become full Services
- `app/clients/page.tsx` — placeholder, will become Our Clients
- `app/clients/testimonials/page.tsx` — new, nested under clients
- `app/qms/page.tsx` — new top-level route
- `app/contact/page.tsx` — placeholder, will become Contact with form
- `components/layout/Navbar.tsx` — needs nav link updates

</code_context>

<specifics>
## Specific Ideas

- All content pages should feel like part of the same site — dark backgrounds, white text, consistent section spacing
- Services page should feel like an expanded version of the home services section — familiar but deeper
- Testimonials should feel authentic and trustworthy — clean card design, no star ratings or gimmicky elements
- Contact form should feel premium — not a generic form. Smooth validation, clear success/error states
- QMS page should be scannable and professional — not a wall of text

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-content-pages-and-contact*
*Context gathered: 2026-03-28 via Smart Discuss*
