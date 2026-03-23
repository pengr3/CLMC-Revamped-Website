# Architecture Patterns

**Project:** CLMC Revamped Website
**Domain:** Animation-rich Next.js App Router marketing / portfolio site
**Researched:** 2026-03-23

---

## Recommended Architecture

A statically-generated, server-component-first Next.js App Router site where all content is authored in TypeScript data modules, pages are React Server Components, and every animation concern is isolated in dedicated Client Component wrappers. No backend is needed for v1.

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                   │
│                                                         │
│  app/                                                   │
│  ├── layout.tsx          (root layout — fonts, globals) │
│  ├── template.tsx        (page-transition wrapper)      │
│  ├── page.tsx            (Home — RSC)                   │
│  ├── about/              (About Us — RSC)               │
│  ├── about-ceo/          (CEO Profile — RSC)            │
│  ├── services/           (Services — RSC)               │
│  ├── clients/            (Clients — RSC)                │
│  ├── qms-policy/         (QMS — RSC)                    │
│  ├── testimonials/       (Testimonials — RSC)           │
│  └── projects/           (Projects Gallery — RSC)       │
│       └── [slug]/        (Individual Project — RSC)     │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  components/          (all reusable UI)             │ │
│  │  ├── layout/          (Navbar, Footer)              │ │
│  │  ├── sections/        (page-level sections)         │ │
│  │  ├── animation/       (GSAP/FM wrappers — CC only)  │ │
│  │  └── ui/              (atoms: Button, Tag, etc.)    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  lib/                                                   │
│  ├── data/               (static TS content modules)   │
│  └── utils/              (helpers, formatters)         │
│                                                         │
│  public/                                               │
│  └── images/             (project photos, logos, OG)   │
└─────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### Boundary Rule: RSC wraps CC, never the other way

React Server Components (RSC) render on the server, produce no JS bundle weight, and own all data access. Client Components (CC) hold interactivity and animations. Pass data down from RSC to CC as props — do not reach up.

| Component | Type | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `app/layout.tsx` | RSC | HTML shell, global fonts, metadata defaults, Navbar, Footer | Wraps all pages |
| `app/template.tsx` | CC ("use client") | Page-transition animation; re-mounts on every route change | Wraps page content |
| `app/[route]/page.tsx` | RSC | Assembles sections, passes static data as props, owns page metadata | Section components |
| `components/layout/Navbar` | CC | Sticky nav, mobile menu state, scroll-aware style changes | None (reads window scroll) |
| `components/layout/Footer` | RSC | Static links, copyright | None |
| `components/sections/Hero` | CC | Scroll-triggered entrance animations, parallax headline | Receives text/image props from page RSC |
| `components/sections/ProjectsGrid` | CC | Animated grid, hover reveals, filter state | Receives project array from page RSC |
| `components/sections/[Section]` | CC or RSC | Each page section; CC only if it animates or has browser state | Receives content props from page RSC |
| `components/animation/FadeIn` | CC | Generic scroll-triggered fade wrapper (Framer Motion) | Wraps any RSC-rendered content |
| `components/animation/ParallaxLayer` | CC | GSAP ScrollTrigger parallax; scope-isolated | Wraps image or decorative elements |
| `components/animation/GSAPProvider` | CC | Centralises GSAP import + plugin registration (ScrollTrigger, etc.) | Mounted once in root layout or template |
| `components/ui/*` | RSC or CC | Atoms: Button, Tag, SectionLabel — RSC unless they animate | Used throughout sections |
| `lib/data/projects.ts` | Module | Typed array of project records; imported by RSC pages | `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` |
| `lib/data/services.ts` | Module | Services content; imported by services page RSC | `app/services/page.tsx` |
| `lib/data/clients.ts` | Module | Client logos + testimonials | `app/clients/page.tsx`, `app/testimonials/page.tsx` |
| `lib/data/navigation.ts` | Module | Nav link definitions | Navbar component |

---

## Data Flow

Static content (no runtime fetching required):

```
lib/data/*.ts
    │
    │  import at build time (RSC, top of page.tsx)
    ▼
app/[route]/page.tsx   (React Server Component)
    │
    │  props (typed TypeScript objects)
    ▼
components/sections/*  (may be RSC or CC)
    │
    │  props (same objects, narrowed)
    ▼
components/ui/*        (leaf atoms — Button, Image, etc.)
```

Animation data flow (scroll position, interaction state):

```
Browser scroll / pointer events
    │
    │  GSAP ScrollTrigger / Framer Motion internal state
    ▼
components/animation/* or section CC
    │
    │  DOM transforms only (transform, opacity — no layout properties)
    ▼
Visual output — no state lifted upward, no global store
```

Key rule: animation state never flows upward to data-owning RSC. Animations are self-contained within their CC boundary.

---

## Route Structure

Eight public routes matching the existing CLMC navigation:

| URL | File | Notes |
|-----|------|-------|
| `/` | `app/page.tsx` | Home — hero, brand statement, project teaser, CTAs |
| `/about` | `app/about/page.tsx` | Company background, values, history |
| `/about-ceo` | `app/about-ceo/page.tsx` | CEO profile, photo, bio |
| `/services` | `app/services/page.tsx` | Management consultancy + engineering services |
| `/clients` | `app/clients/page.tsx` | Client logo grid + short testimonials |
| `/qms-policy` | `app/qms-policy/page.tsx` | Quality management system documentation |
| `/testimonials` | `app/testimonials/page.tsx` | Full curated testimonials |
| `/projects` | `app/projects/page.tsx` | Flagship gallery — filterable grid |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Individual project showcase |
| `/not-found` | `app/not-found.tsx` | 404 page |

All routes use `generateStaticParams` + `export const dynamic = 'force-static'` for full static export. No server runtime needed at deploy time.

---

## Animation Integration Pattern

### The Server/Client Split

Every animation lives in a Client Component. Server Components never import GSAP or Framer Motion.

**Pattern A — Framer Motion for entrance animations and page transitions**

```tsx
// components/animation/FadeInUp.tsx
'use client';
import { motion } from 'framer-motion';

export function FadeInUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

Used by: section components wrapping text blocks, cards, headings.

**Pattern B — GSAP + ScrollTrigger for complex scroll sequences and parallax**

```tsx
// components/animation/ParallaxLayer.tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ParallaxLayer({ children, speed = 0.3 }) {
  const el = useRef(null);
  useGSAP(() => {
    gsap.to(el.current, {
      yPercent: speed * -50,
      ease: 'none',
      scrollTrigger: {
        trigger: el.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: el });
  return <div ref={el}>{children}</div>;
}
```

Used by: Hero background, project cover images, decorative elements.

**Pattern C — Page transition via template.tsx**

`template.tsx` re-mounts on every route change (unlike `layout.tsx` which persists). Wrap the page content in a Framer Motion `AnimatePresence`-compatible motion div here.

```tsx
// app/template.tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

**Pattern D — GSAP plugin registration (centralised)**

Register all GSAP plugins once in a dedicated module to prevent duplicate registrations across route navigations:

```ts
// lib/gsap.ts  (imported by any CC that uses GSAP)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
export { gsap, ScrollTrigger, SplitText };
```

---

## Image Handling

All project photography and client logos go in `public/images/`. Use `next/image` everywhere.

| Image Category | Location | Priority | Sizing Strategy |
|----------------|----------|----------|-----------------|
| Hero background | `public/images/hero/` | `priority` (above fold) | `fill` + `object-cover`, sized container |
| Project gallery covers | `public/images/projects/` | lazy (default) | Fixed aspect ratio container |
| Individual project photos | `public/images/projects/[slug]/` | lazy | Responsive `sizes` prop |
| Client logos | `public/images/clients/` | lazy | Fixed width, `height="auto"` |
| CEO portrait | `public/images/team/` | `priority` (likely above fold) | Fixed dimensions |
| OG / social images | `public/` | N/A (not rendered) | 1200x630 static file |

Rules:
- Always provide `width` + `height` or `fill` to prevent CLS (Cumulative Layout Shift).
- Use `sizes` prop on responsive images to serve correct srcset.
- Prefer AVIF/WebP — `next/image` handles format negotiation automatically.
- Only images in `public/` avoid external `remotePatterns` configuration; keep all v1 assets local.

---

## Static Content Data Pattern

No CMS. All content lives in typed TypeScript modules in `lib/data/`.

```ts
// lib/data/projects.ts
export interface Project {
  slug: string;
  title: string;
  category: 'construction' | 'consultancy';
  location: string;
  year: number;
  coverImage: string;   // path relative to /public
  gallery: string[];
  description: string;
  client?: string;
}

export const projects: Project[] = [
  {
    slug: 'project-name',
    title: 'Project Name',
    // ...
  },
];
```

Why TypeScript over JSON: Autocompletion, type errors at compile time, ability to co-locate helper functions, no JSON parsing overhead at runtime.

Page RSCs import the array directly:

```ts
// app/projects/page.tsx  (RSC — no 'use client')
import { projects } from '@/lib/data/projects';
export default function ProjectsPage() {
  return <ProjectsGrid projects={projects} />;
}
```

`generateStaticParams` for dynamic project routes:

```ts
// app/projects/[slug]/page.tsx
import { projects } from '@/lib/data/projects';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

---

## Scalability Considerations

| Concern | At launch | If content grows | If CMS is added later |
|---------|-----------|------------------|-----------------------|
| Content authoring | Edit TypeScript files | Same; manageable up to ~50 projects | Replace `lib/data/*.ts` with CMS fetch, keep component API identical |
| Build time | Near-instant (static data) | Still fast; no external fetch | May need ISR (`revalidate`) |
| Animation bundle | Per-page CC split | No change | No change |
| Image storage | `public/` folder | Move to CDN (Cloudinary, R2); add `remotePatterns` | Same |
| SEO / metadata | Static `export const metadata` per page | Same | Can merge CMS metadata |

---

## Suggested Build Order (Phase Dependencies)

Components have hard dependencies. Build in this order to avoid blocking:

```
1. Foundation (no dependencies)
   ├── lib/data/*.ts         — all content modules
   ├── app/layout.tsx        — root shell, fonts, globals.css
   └── components/ui/*       — Button, SectionLabel, Tag atoms

2. Layout layer (depends on: Foundation)
   ├── components/layout/Navbar
   └── components/layout/Footer

3. Animation primitives (depends on: Foundation)
   ├── lib/gsap.ts           — centralised plugin registration
   ├── components/animation/FadeInUp
   ├── components/animation/FadeInLeft etc.
   ├── components/animation/ParallaxLayer
   └── app/template.tsx      — page transitions

4. Page sections (depends on: Foundation + Animation primitives)
   └── components/sections/* — one per page-content area

5. Individual pages (depends on: all above)
   ├── app/page.tsx          — Home (highest visual impact, do first)
   ├── app/projects/page.tsx — Projects gallery
   ├── app/projects/[slug]/page.tsx
   ├── app/services/page.tsx
   ├── app/about/page.tsx
   ├── app/about-ceo/page.tsx
   ├── app/clients/page.tsx
   ├── app/testimonials/page.tsx
   └── app/qms-policy/page.tsx

6. SEO and meta layer (depends on: all pages)
   ├── Per-page metadata exports
   ├── app/sitemap.ts
   └── app/robots.ts
```

The Home page and Projects gallery have the most visual complexity and the most CC animation surface. Build them early (step 5 first) so animation decisions feed back into the reusable primitives (step 3).

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Importing Animation Libraries in Server Components
**What:** Adding `'use client'` to a page RSC just because it imports a section component that uses Framer Motion.
**Why bad:** Pushes the entire page into the client bundle, eliminating RSC benefits.
**Instead:** Keep `page.tsx` as RSC. Move `'use client'` to the specific section or animation wrapper component only.

### Anti-Pattern 2: Registering GSAP Plugins Multiple Times
**What:** `gsap.registerPlugin(ScrollTrigger)` in every component file.
**Why bad:** Causes ScrollTrigger leaks and duplicate animation firing after route transitions.
**Instead:** One centralised `lib/gsap.ts` file; all components import from there.

### Anti-Pattern 3: Animating Layout-Affecting Properties
**What:** Using GSAP or Framer Motion to change `width`, `height`, `top`, `left`, `margin` during scroll or hover.
**Why bad:** Triggers browser layout recalculations; tanks Cumulative Layout Shift and scroll FPS.
**Instead:** Animate only `transform` (translate, scale, rotate) and `opacity`. These run on the GPU compositor.

### Anti-Pattern 4: Using layout.tsx for Page Transitions
**What:** Placing a Framer Motion `AnimatePresence` or GSAP enter animation in `layout.tsx`.
**Why bad:** `layout.tsx` persists across routes and does not remount, so the animation only fires once on initial load.
**Instead:** Use `template.tsx`, which creates a new instance on every navigation.

### Anti-Pattern 5: Putting All Sections in a Single Client Component
**What:** One large `HomePage` client component with all sections inside.
**Why bad:** Entire page becomes client JS; loses streaming SSR, increases bundle size.
**Instead:** Page RSC composes many smaller section components; only sections with animations are CCs.

---

## Sources

- [Next.js Official: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — HIGH confidence
- [Next.js Official: Image Component](https://nextjs.org/docs/app/api-reference/components/image) — HIGH confidence
- [GSAP Official: React Integration](https://gsap.com/resources/React/) — HIGH confidence
- [Framer Motion: Complete React & Next.js Guide 2026](https://inhaq.com/blog/framer-motion-complete-guide-react-nextjs-developers.html) — MEDIUM confidence
- [Page Transitions with GSAP + Next.js App Router (Medium)](https://medium.com/@josiah.webdev/page-transitions-with-gsap-next-js-app-router-5508cee43a80) — MEDIUM confidence
- [Optimizing GSAP Animations in Next.js 15 (Medium)](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — MEDIUM confidence
- [In-and-Out Page Transitions and Next.js App Router (Medium)](https://medium.com/@camille.fontaine93/in-and-out-page-transitions-and-next-js-app-router-62f2b1637ad8) — MEDIUM confidence
- [How We Boosted React Website Performance with Heavy Animations (Medium)](https://medium.com/@ssd_design/how-to-improve-performance-on-a-react-website-with-heavy-design-and-animation-ae7d655da349) — MEDIUM confidence
- [Next.js App Router Patterns That Actually Matter in 2026 (DEV Community)](https://dev.to/teguh_coding/nextjs-app-router-the-patterns-that-actually-matter-in-2026-146) — LOW confidence (blog post, unverified against official docs)
