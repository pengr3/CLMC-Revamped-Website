# Phase 1: Foundation and Design System - Research

**Researched:** 2026-03-23
**Domain:** Next.js 16 App Router scaffold, Tailwind CSS v4 design tokens, next/font, Lenis smooth scroll, Navbar/Footer component patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Dark-only theme — no light mode, no toggle. Single token layer.
- **D-02:** Background — near-black `#0D0D0D` (midpoint of `#0A0A0A`–`#111111` range).
- **D-03:** Primary accent — crisp white / off-white `#F5F5F5`. Monochrome system — no color hue.
- **D-04:** Interactive states (hover, focus) — white at reduced opacity (60–80%). Pure black/white/opacity system.
- **D-05:** Surface hierarchy via opacity steps on white — specific scale at Claude's discretion.
- **D-06:** Display/headline font — **Geist** via `next/font/local` or `next/font/google`.
- **D-07:** Body/UI font — **Inter** via `next/font/google`.
- **D-08:** Headline style — tight negative letter-spacing (`-0.02em` to `-0.04em`), 80–120px for hero H1s.
- **D-09:** Type scale steps and line-height — Claude's discretion, harmonious modular scale.
- **D-10:** Navbar default state (scroll < 80px) — fully transparent.
- **D-11:** Navbar scroll state (scroll >= 80px) — frosted glass: dark background + `backdrop-blur`. Smooth CSS transition.
- **D-12:** Nav link hover/active — animated underline via CSS `::after` pseudo-element.
- **D-13:** Logo — text logotype `"CLMC"` in Geist, white, bold. No SVG.
- **D-14:** Mobile nav — full-screen overlay, hamburger icon morphs to X.

### Claude's Discretion

- Specific gray-scale steps for surface hierarchy
- Type scale values (rem steps, line-heights, font-weight per heading level)
- Footer layout structure and column arrangement
- UI atom variants (button sizes, border-radius, spacing tokens)
- Hamburger icon animation style

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DSGN-01 | Site uses a defined design token system (color palette, typography scale, spacing) via Tailwind CSS v4 | `@theme` directive in `globals.css` — no `tailwind.config.js` needed |
| DSGN-02 | Global typography uses `next/font` with display font (Geist) and body font (Inter) pair | `next/font/google` for both; CSS variable pattern via `variable` option + `@theme inline` |
| DSGN-03 | All UI components share consistent visual language (border radius, shadow, color) | Token system in `@theme` block; atoms in `components/ui/` |
| DSGN-04 | `prefers-reduced-motion` respected globally — all animations have static fallback | CSS `@media (prefers-reduced-motion: no-preference)` wrapper on transition rules |
| NAV-01 | Persistent sticky header with CLMC logo and nav links on all pages | `position: fixed` client component; `usePathname` for active state |
| NAV-02 | Header changes appearance on scroll | `window.scrollY` event listener or `IntersectionObserver` on a sentinel element |
| NAV-03 | Accessible mobile hamburger/drawer menu | `aria-expanded`, `role="dialog"`, `aria-modal`, focus trap, `Escape` key closes |
| NAV-04 | Footer with contact info, nav links, copyright on all pages | Server component in root layout; 3-col responsive grid |
| NAV-05 | Smooth scroll (Lenis) active site-wide | `ReactLenis` or custom `LenisProvider` wrapping `{children}` in root layout |
</phase_requirements>

---

## Summary

Phase 1 scaffolds a greenfield Next.js project. The current stable release is **Next.js 16.2.1** (not 15.x as in CLAUDE.md — 16.0 was released October 2025). CLAUDE.md was written when 15.x was current; the project should target 16.x since it is the active stable line. The App Router paradigm is unchanged but 16 brings Turbopack as the default bundler, stable React Compiler option, and a renamed `proxy.ts` (was `middleware.ts`). None of these affect Phase 1's scope materially, but the version choice should be explicit.

Tailwind CSS v4 (current: 4.2.2) replaces the JavaScript config file entirely. All design tokens — colors, spacing, typography, breakpoints, border-radius — are declared via `@theme` in `globals.css`. Font integration with `next/font` uses the `variable` prop on each font instance and then `@theme inline` in CSS to map those CSS variables into Tailwind utility classes.

Lenis smooth scroll (current: 1.3.19) must be wrapped in a `"use client"` provider component that is imported into the Server Component root layout. The `lenis/react` export provides `ReactLenis` but a manual provider using `autoRaf: true` is equally valid and gives more control. The `lenis/dist/lenis.css` file must be imported to prevent layout shift from the scrollbar disappearing.

**Primary recommendation:** Scaffold with `npx create-next-app@latest` (defaults: TypeScript, ESLint, Tailwind CSS v4, App Router, Turbopack). Do NOT set `output: 'export'` — Vercel deployment handles image optimization natively; static export breaks `next/image`.

---

## Project Constraints (from CLAUDE.md)

- **Framework:** Next.js App Router — App Router only, no Pages Router
- **Styling:** Tailwind CSS v4 — no `tailwind.config.js`, no styled-components, no CSS Modules
- **Animation (scroll):** GSAP + ScrollTrigger — all GSAP code inside `useGSAP()` hook
- **Animation (UI):** Motion v11 — `<motion.div>`, `AnimatePresence`, `LazyMotion` for bundle savings
- **Smooth scroll:** Lenis 1.x — NOT Locomotive Scroll, NOT GSAP ScrollSmoother
- **Fonts:** `next/font` only — NOT Google Fonts CDN `<link>` tag
- **SEO:** Next.js Metadata API only — NOT `next-seo` package
- **Images:** `next/image` — with `priority`, `width/height`, `placeholder="blur"`, AVIF+WebP formats
- **Deployment:** Vercel — NOT `output: 'export'` (would break `next/image` optimization)
- **Icons:** `lucide-react` (from UI-SPEC)
- **Forbidden:** Locomotive Scroll, react-spring, CSS animations alone for scroll, styled-components, next-seo, stock photography, auto-rotating carousels

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | Framework, routing, SSG, image opt | Current stable; Turbopack default bundler; React 19.2 |
| react | 19.x | UI rendering | Ships with Next.js 16; Concurrent features |
| react-dom | 19.x | DOM rendering | Ships with Next.js 16 |
| typescript | 5.x | Type safety | Included by `create-next-app` default |
| tailwindcss | 4.2.2 | Utility CSS + design tokens | CSS-first config; Oxide engine 2-5x faster builds |
| @tailwindcss/postcss | 4.2.2 | PostCSS plugin for Tailwind v4 | Required adapter — Tailwind v4 no longer uses the old PostCSS plugin |
| postcss | latest | CSS processing | Required by `@tailwindcss/postcss` |

### Animation + Scroll

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gsap | 3.14.2 | Complex scroll-driven animations, timelines | Phase 2+; infrastructure initialized in Phase 1 |
| @gsap/react | 2.1.2 | `useGSAP` hook for App Router | Any component using GSAP |
| motion | 12.38.0 | Component-level UI transitions, hover states | Navbar hover polish, mobile overlay entrance |
| lenis | 1.3.19 | Native-feel smooth scroll | Site-wide; initialized in root layout |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.577.0 | SVG icon library | Hamburger, close, arrow icons |
| clsx | 2.1.1 | Conditional class names | Component state-driven class composition |
| tailwind-merge | 3.5.0 | Merge Tailwind classes without conflicts | Component prop composition |
| react-intersection-observer | 10.0.3 | Viewport detection | Phase 2+ for scroll-reveal triggers |

### Installation

```bash
# Create project (Next.js 16, TypeScript, Tailwind v4, App Router)
npx create-next-app@latest clmc-website --typescript --eslint --tailwind --app --no-src-dir --import-alias "@/*"

cd clmc-website

# Animation + scroll
npm install gsap @gsap/react motion lenis

# Utilities
npm install clsx tailwind-merge lucide-react

# Tailwind v4 PostCSS adapter (may already be installed by create-next-app)
npm install -D @tailwindcss/postcss
```

### Version Verification (confirmed 2026-03-23 via npm registry)

| Package | Registry Latest | Notes |
|---------|----------------|-------|
| next | 16.2.1 | CLAUDE.md says "15.x" — 16.0 stable since Oct 2025; use 16.x |
| tailwindcss | 4.2.2 | v4 confirmed current stable line |
| @tailwindcss/postcss | 4.2.2 | Same version as tailwindcss |
| lenis | 1.3.19 | Old `@studio-freight/lenis` deprecated — use `lenis` directly |
| motion | 12.38.0 | CLAUDE.md says "11.x" — 12.x is current; API is compatible |
| gsap | 3.14.2 | No breaking changes from 3.x |
| lucide-react | 0.577.0 | Tree-shakable; no transpilePackages needed in Next.js 16 |

---

## Architecture Patterns

### Recommended Project Structure

```
clmc-website/
├── app/
│   ├── layout.tsx            # Root layout: fonts, providers, Navbar, Footer
│   ├── globals.css           # @import "tailwindcss" + @theme tokens
│   ├── page.tsx              # Home page placeholder (Phase 3)
│   ├── about/page.tsx        # Route placeholders (Phase 5)
│   ├── services/page.tsx
│   ├── projects/page.tsx
│   ├── clients/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # "use client" — scroll detection, mobile state
│   │   └── Footer.tsx        # Server Component — static markup
│   ├── providers/
│   │   └── LenisProvider.tsx # "use client" — Lenis initialization
│   └── ui/
│       └── Button.tsx        # Atom: primary / ghost / destructive variants
├── lib/
│   └── utils.ts              # cn() helper = clsx + twMerge
├── public/
│   └── fonts/                # Optional: local Geist files if not using Google
├── next.config.ts            # images: { formats: ['avif', 'webp'] }
├── postcss.config.mjs        # @tailwindcss/postcss plugin
└── tsconfig.json             # baseUrl: ".", paths: { "@/*": ["./*"] }
```

### Pattern 1: Tailwind CSS v4 Design Token System

**What:** All design tokens declared in `globals.css` via `@theme` — no JavaScript config file.
**When to use:** For all custom colors, spacing, typography, breakpoints, border-radius tokens.

```css
/* app/globals.css */
@import "tailwindcss";

/* ── Font variables injected by next/font (via className on <body>) ── */
@theme inline {
  --font-display: var(--font-geist);
  --font-body: var(--font-inter);
}

/* ── Color tokens ── */
@theme {
  /* Surfaces */
  --color-surface-primary: #0D0D0D;
  --color-surface-secondary: #141414;
  --color-surface-tertiary: rgba(255, 255, 255, 0.04);
  --color-surface-border: rgba(255, 255, 255, 0.08);

  /* Text */
  --color-text-primary: #F5F5F5;
  --color-text-secondary: rgba(255, 255, 255, 0.60);
  --color-text-muted: rgba(255, 255, 255, 0.35);

  /* Interactive */
  --color-interactive-hover: rgba(255, 255, 255, 0.70);
  --color-interactive-focus: rgba(255, 255, 255, 0.80);

  /* Destructive (Phase 5 forms) */
  --color-destructive: #EF4444;
}

/* ── Spacing scale ── */
@theme {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 96px;
  --spacing-5xl: 128px;
}

/* ── Border radius tokens ── */
@theme {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}

/* ── Breakpoints (custom; override Tailwind defaults for sm) ── */
@theme {
  --breakpoint-sm: 23.4375rem;  /* 375px */
  --breakpoint-md: 48rem;       /* 768px */
  --breakpoint-lg: 64rem;       /* 1024px */
  --breakpoint-xl: 80rem;       /* 1280px */
  --breakpoint-2xl: 96rem;      /* 1536px */
}

/* ── Base layer: apply body defaults ── */
@layer base {
  html {
    background-color: #0D0D0D;
    color: #F5F5F5;
  }

  body {
    @apply font-body antialiased;
  }
}
```

**CRITICAL for breakpoints:** Use `rem` values, NOT `px` or CSS variable references — browsers do not support `var()` inside media queries. Values are hardcoded into the `@theme` block.

### Pattern 2: next/font with Tailwind CSS v4 CSS Variables

**What:** Load Geist and Inter with CSS variable names; map to Tailwind via `@theme inline`.

```tsx
// app/layout.tsx
import { Geist, Inter } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',   // CSS var name injected into <html>
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
```

In `globals.css`, the `@theme inline` block maps those runtime CSS variables to Tailwind font utilities:

```css
@theme inline {
  --font-display: var(--font-geist);
  --font-body: var(--font-inter);
}
```

Usage in components: `className="font-display"` or `className="font-body"`.

**Why `@theme inline` not `@theme`:** Regular `@theme` generates static CSS variable values at build time. Because `--font-geist` is injected at runtime by `next/font` (as a className on `<html>`), the theme variable must reference it dynamically. `@theme inline` defers resolution so the runtime variable value is used correctly.

### Pattern 3: Lenis Provider (Client Component in Server Layout)

**What:** Wrap `"use client"` Lenis provider in root layout without making layout client-side.

```tsx
// components/providers/LenisProvider.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      syncTouch: false,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
```

**Key:** `autoRaf: true` eliminates the need for a manual `requestAnimationFrame` loop. `lenis/dist/lenis.css` is imported in `layout.tsx` (server component context is fine for CSS imports).

### Pattern 4: Scroll-Aware Navbar

**What:** Client component with `scrolled` state toggled at 80px threshold.

```tsx
// components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 h-20 flex items-center px-xl transition-all duration-300 ease-out',
        scrolled
          ? 'bg-[rgba(13,13,13,0.85)] backdrop-blur-md border-b border-white/8 h-16'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* Logo */}
      <Link href="/" className="font-display font-bold text-[20px] tracking-[-0.02em] text-text-primary">
        CLMC
      </Link>

      {/* Desktop nav — sr-only labels etc. */}
      <nav aria-label="Primary navigation" className="hidden md:flex ml-auto gap-md">
        {NAV_LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href} active={pathname === href}>{label}</NavLink>
        ))}
      </nav>

      {/* Hamburger */}
      <button
        className="md:hidden ml-auto p-sm"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 bg-surface-primary flex flex-col items-center justify-center gap-xl"
        >
          {/* ... nav links at 36px Geist 700 */}
        </div>
      )}
    </header>
  )
}
```

**Note on `backdrop-blur` with Tailwind v4:** Use `backdrop-blur-md` (12px blur) in the class string. Custom values use arbitrary syntax: `backdrop-blur-[12px]`.

### Pattern 5: `cn()` Utility

Required helper for combining Tailwind classes conditionally:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Pattern 6: `next.config.ts` for Image Optimization

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
    // NOT output: 'export' — Vercel handles optimization natively
  },
}

export default nextConfig
```

**CRITICAL:** Do NOT set `output: 'export'`. This disables `next/image` built-in optimization. Vercel deployment without `output: 'export'` gets full CDN image optimization automatically.

### Pattern 7: `prefers-reduced-motion` Fallback (DSGN-04)

All animation CSS must be gated:

```css
/* In component CSS or @layer utilities */
.navbar-transition {
  /* Static fallback: no transition */
}

@media (prefers-reduced-motion: no-preference) {
  .navbar-transition {
    transition: background-color 300ms ease-out,
                backdrop-filter 300ms ease-out,
                border-color 300ms ease-out;
  }
}
```

For Motion components, use the `useReducedMotion()` hook:

```tsx
import { useReducedMotion } from 'motion/react'

const prefersReduced = useReducedMotion()
// Pass static variants when true
```

### Anti-Patterns to Avoid

- **`"use client"` on root layout:** Makes ALL child routes client-side. Use a `Providers` wrapper or individual client components instead.
- **`output: 'export'` in next.config:** Breaks `next/image` optimization — do not set for Vercel deployment.
- **CSS var() in `@theme` breakpoints:** Browsers cannot resolve CSS variables inside `@media` queries — use hardcoded rem values only.
- **`@studio-freight/lenis` import:** Deprecated package. Import from `lenis` directly.
- **`@studio-freight/react-lenis`:** Deprecated. Use `lenis/react` or the manual provider pattern.
- **GSAP code outside `useGSAP()`:** Memory leaks in App Router due to missed cleanup. All GSAP must be inside `useGSAP()` from `@gsap/react`.
- **`tailwind.config.js`:** Not needed for Tailwind v4. The `@theme` directive in CSS replaces it entirely.
- **Global `scroll-behavior: smooth` CSS:** Next.js 16 removed the automatic `scroll-behavior: smooth` injection. Do NOT add it as a CSS global — Lenis manages scroll behavior entirely. Adding CSS smooth scroll alongside Lenis causes double-smoothing jank.
- **Missing `lenis/dist/lenis.css` import:** Causes scrollbar width flash (CLS) when Lenis overrides native scroll. Always import this CSS file.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading without FOUT | Custom `<link>` preload logic | `next/font/google` | next/font self-hosts, zero layout shift, no Google DNS |
| Image optimization | Manual WebP conversion pipeline | `next/image` | Automatic AVIF/WebP, srcset, blur placeholder, lazy loading |
| Tailwind class conflicts | String concatenation logic | `tailwind-merge` | Handles duplicate/conflicting class deduplication |
| Conditional class names | Template literals | `clsx` | Handles arrays, objects, falsy filtering cleanly |
| Scroll smoothing | Custom `requestAnimationFrame` scroller | `lenis` | Native DOM, battles-tested easing, GSAP sync support |
| SVG icons | Inline SVG per icon | `lucide-react` | Tree-shakable, typed, consistent stroke widths, accessible |

**Key insight:** In Next.js, the hardest problems (fonts, images, scroll) are already solved by purpose-built solutions in the stack. Any custom implementation adds bundle weight and introduces edge cases (FOUT, CLS, raf loops) that the standard libraries handle correctly.

---

## Common Pitfalls

### Pitfall 1: `output: 'export'` Breaking Image Optimization

**What goes wrong:** Developer sets `output: 'export'` in `next.config.ts` thinking it's required for Vercel static hosting. `next/image` stops optimizing images — they are served as raw originals, destroying Core Web Vitals.
**Why it happens:** Confusion between "static site" and Vercel deployment. Vercel does NOT require static export — it runs the Next.js server and handles image optimization at the CDN edge.
**How to avoid:** Do not set `output: 'export'`. Deploy as a standard Next.js app on Vercel.
**Warning signs:** `next/image` warnings about unsupported loader in build output; images not being served as WebP/AVIF.

### Pitfall 2: CSS Variable References in `@theme` Breakpoints

**What goes wrong:** Using `--breakpoint-sm: var(--my-sm-value)` inside `@theme`. This passes the variable reference to the CSS `@media` query directly, which browsers cannot evaluate — media queries do not support CSS custom properties.
**Why it happens:** `@theme inline` works for fonts because those CSS variables are used in property values, not media query conditions.
**How to avoid:** Always use hardcoded `rem` values in `--breakpoint-*` tokens. Example: `--breakpoint-sm: 23.4375rem` (375px / 16px).
**Warning signs:** Responsive breakpoint classes (`sm:`, `md:`) not activating at expected viewport widths.

### Pitfall 3: Lenis Double-Smoothing with Native Scroll

**What goes wrong:** CSS `scroll-behavior: smooth` is set globally alongside Lenis. Both fight to control scroll velocity, producing a jittery, double-smoothed effect, especially on anchor link clicks.
**Why it happens:** Next.js 16 removed its previously automatic `scroll-behavior: smooth` injection, but developers sometimes add it manually in global CSS resets.
**How to avoid:** Do not set `scroll-behavior: smooth` anywhere in CSS. Lenis owns all scroll behavior.
**Warning signs:** Anchor navigation feels sluggish or overshoots; scroll events fire twice on click.

### Pitfall 4: `"use client"` Cascade from Root Layout

**What goes wrong:** Adding `"use client"` to `app/layout.tsx` to use a hook. This opts the entire route tree out of React Server Components, making every page a client component and destroying the bundle size benefits.
**Why it happens:** Layout needs a provider that requires client-side state.
**How to avoid:** Create a `Providers.tsx` client component that wraps `{children}`. Import it into the Server Component layout. The `{children}` passed into a client provider remain Server Components as pre-rendered HTML.
**Warning signs:** Every page shows large JavaScript bundles; Server Component warnings disappear entirely.

### Pitfall 5: Geist Font Not Available from `next/font/google`

**What goes wrong:** Geist was originally only available as a local font (`geist` npm package). It is now available via `next/font/google`, but historical documentation still shows the local package approach.
**Why it happens:** Stale tutorials; Geist was added to Google Fonts in 2024.
**How to avoid:** Import `Geist` from `'next/font/google'` — this is the simplest approach and confirmed working in Next.js 16. The local package approach (`geist` npm package) also works but adds an extra dependency.
**Warning signs:** TypeScript error "Module 'next/font/google' has no exported member 'Geist'" — this means you have an old version of Next.js (< 14.2). Update to 16.x.

### Pitfall 6: Missing `lenis/dist/lenis.css` Import

**What goes wrong:** Lenis hides the native scrollbar (to prevent double scrollbars) but the page width shifts when scrollbar disappears, causing Cumulative Layout Shift (CLS).
**Why it happens:** The CSS import is not auto-applied — it must be explicitly imported.
**How to avoid:** Add `import 'lenis/dist/lenis.css'` to `app/layout.tsx`.
**Warning signs:** Page content shifts horizontally when navigating between pages; CLS score in Core Web Vitals.

### Pitfall 7: Next.js 16 Breaking Changes from 15.x

**What goes wrong:** Code written for Next.js 15 may fail in 16 due to sync API removal.
**Key breaking changes affecting this project:**
- `params` and `searchParams` props in page components are now always async: `await params`
- `cookies()`, `headers()` are async: `await cookies()`
- `middleware.ts` is deprecated — rename to `proxy.ts` (not needed in Phase 1, but be aware)
- Automatic `scroll-behavior: smooth` removed — do not add it to CSS
- `next lint` CLI command removed — use `eslint` directly in package.json scripts
**How to avoid:** Scaffold fresh with `npx create-next-app@latest` which generates Next.js 16-compatible defaults.

---

## Code Examples

### PostCSS Configuration

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### `cn()` Utility

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Button Atom

```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-text-primary text-surface-primary hover:bg-[rgba(245,245,245,0.85)]',
  ghost: 'bg-transparent text-text-primary border border-white/20 hover:border-white/60',
  destructive: 'bg-destructive text-white hover:bg-[#DC2626]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[14px] rounded-sm',
  md: 'px-6 py-3 text-[16px] rounded-md',
  lg: 'px-8 py-4 text-[16px] rounded-md',
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-body transition-all duration-150 ease-out',
        'focus-visible:outline-2 focus-visible:outline-interactive-focus focus-visible:outline-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme` in `globals.css` | Tailwind v4 (Jan 2025) | No JS config file needed; tokens are native CSS vars |
| `@studio-freight/lenis` | `lenis` (direct package) | 2024 | Old package deprecated; import from `lenis` directly |
| `middleware.ts` | `proxy.ts` | Next.js 16 (Oct 2025) | Old filename deprecated; not used in Phase 1 |
| Automatic scroll-behavior: smooth | Removed from Next.js 16 | Oct 2025 | Must not add CSS smooth scroll; Lenis handles it |
| Next.js 15.x | Next.js 16.x | Oct 2025 | CLAUDE.md says 15.x — actual stable is 16.2.1 |
| `experimental.turbopack` config | Top-level `turbopack` | Next.js 16 | Config path changed |
| `next lint` script in package.json | `eslint` CLI directly | Next.js 16 | `next lint` removed |
| Sync `params` prop | `await params` | Next.js 15+ required in 16 | Page components must `await params` |

**Deprecated/outdated:**
- `@studio-freight/lenis`: deprecated, use `lenis`
- `@studio-freight/react-lenis`: deprecated, use `lenis/react` or manual provider
- `middleware.ts`: deprecated in Next.js 16, renamed to `proxy.ts`
- `next-seo`: deprecated for App Router, replaced by native Metadata API

---

## Open Questions

1. **Next.js 15.x vs 16.x version choice**
   - What we know: CLAUDE.md specifies "15.x" but npm latest stable is 16.2.1. Next.js 16 was released October 2025 and is the active supported branch.
   - What's unclear: Whether the user has a specific reason to pin to 15.x (e.g., some dependency not yet compatible with 16).
   - Recommendation: Default to 16.2.1 (latest stable). If a 15.x pin is needed, use 15.5.14. Document this decision explicitly in the plan's Wave 0.

2. **Geist font — Google Fonts vs local package**
   - What we know: `Geist` is available from `next/font/google` in Next.js 14.2+. The `geist` npm package is an alternative but adds a dependency.
   - What's unclear: The UI-SPEC says "preferred: `next/font/local`" which implies downloading font files locally. Google Fonts via `next/font/google` self-hosts automatically.
   - Recommendation: Use `next/font/google` for simplicity — it self-hosts Geist at build time with zero manual file management. Only switch to `next/font/local` if the team needs offline-first development or specific font file control.

3. **Focus trap for mobile overlay**
   - What we know: WCAG 2.2 AA requires focus trap in dialog/overlay. `focus-trap-react` (v12.0.0) is the standard library.
   - What's unclear: Whether to add `focus-trap-react` as a dependency or implement focus trap manually with a `useEffect` and keyboard listener.
   - Recommendation: Implement manually for Phase 1 (simpler, no extra dependency, full screen overlay is straightforward). `focus-trap-react` becomes worth it for modal dialogs in Phase 5.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 16 runtime | Yes | 24.13.0 (> 20.9 min) | — |
| npm | Package installation | Yes | 11.8.0 | — |
| Git | Version control | Yes | 2.52.0 | — |
| Next.js (to install) | Framework | Not installed | — (16.2.1 available) | — |
| Tailwind CSS (to install) | Styling | Not installed | — (4.2.2 available) | — |

**Notes:**
- Project is not yet scaffolded. Phase 1 Task 0 (Wave 0) must create the project.
- Node.js 24.13.0 exceeds Next.js 16's minimum of 20.9.0.
- No blocking environment gaps.

---

## Validation Architecture

### Test Framework

Phase 1 is a greenfield scaffold — no test infrastructure exists yet. For a marketing site built with Next.js and React, the appropriate validation is:

- **Unit tests:** Vitest + React Testing Library for UI atoms (Button, Navbar state logic)
- **E2E:** Playwright for accessibility and interaction validation
- **Visual/smoke:** Manual check on `localhost:3000` is the practical Phase 1 gate

Given the complexity and scope of Phase 1 (scaffold + design system + two layout components), the planner should treat automated testing as **Wave 0 setup only** for this phase — installing and configuring the test framework, not writing extensive test suites.

| Property | Value |
|----------|-------|
| Framework | Vitest + React Testing Library (recommended for Next.js 16) |
| Config file | `vitest.config.ts` — does not exist yet (Wave 0 gap) |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run --coverage` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | Token CSS variables present in `globals.css` output | Manual visual + build check | `npm run build` passes | No — Wave 0 |
| DSGN-02 | Geist and Inter fonts load without FOUT | Manual visual (Lighthouse font audit) | `npm run build && npm start` | No — Wave 0 |
| DSGN-03 | Button component renders all 3 variants correctly | Unit | `npx vitest run` | No — Wave 0 |
| DSGN-04 | Animations absent when `prefers-reduced-motion: reduce` | Manual (DevTools emulation) | Manual | — |
| NAV-01 | Navbar present on every page | E2E | `npx playwright test` | No — Wave 0 |
| NAV-02 | Navbar changes appearance after 80px scroll | E2E / manual | `npx playwright test` | No — Wave 0 |
| NAV-03 | Mobile menu opens, focus traps, Escape closes | E2E / manual accessibility | `npx playwright test` | No — Wave 0 |
| NAV-04 | Footer present on every page with contact info | E2E | `npx playwright test` | No — Wave 0 |
| NAV-05 | Lenis smooth scroll active (no jitter) | Manual visual | Manual | — |

### Sampling Rate

- **Per task commit:** `npm run build` passes (type-check + build)
- **Per wave merge:** `npm run build && npx vitest run`
- **Phase gate:** Build passes + manual visual check on `localhost:3000` at all three breakpoints (375px, 768px, 1280px) before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `vitest.config.ts` — test framework config
- [ ] `tests/components/Button.test.tsx` — basic atom rendering coverage
- [ ] `playwright.config.ts` — E2E framework config
- [ ] `tests/e2e/navigation.spec.ts` — Navbar + Footer presence on all routes
- [ ] Framework install: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @playwright/test`

---

## Sources

### Primary (HIGH confidence)

- Next.js official docs (nextjs.org/docs) — installation, App Router layout, fonts, static exports, Server/Client component boundary
- Next.js 16 blog post (nextjs.org/blog/next-16) — breaking changes, removed features, new defaults
- Tailwind CSS docs (tailwindcss.com/docs/theme) — `@theme` directive syntax, namespace conventions, breakpoints
- Tailwind CSS v4 install guide (tailwindcss.com/docs/guides/nextjs) — `@tailwindcss/postcss` setup

### Secondary (MEDIUM confidence)

- Bridger Tower Lenis + Next.js guide (bridger.to/lenis-nextjs) — provider pattern code, verified against lenis package documentation
- owolf.com Next.js 15 + Tailwind v4 font setup — `@theme inline` font variable pattern, cross-verified with Tailwind docs discussion
- npm registry (registry.npmjs.org) — all package versions verified 2026-03-23

### Tertiary (LOW confidence)

- WebSearch results for focus-trap patterns — cited `focus-trap-react` v12.0.0; not independently verified against official docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry 2026-03-23
- Architecture: HIGH — patterns verified against Next.js 16 and Tailwind v4 official docs
- Pitfalls: HIGH — several sourced from official breaking changes docs (Next.js 16 changelog)
- Validation architecture: MEDIUM — test tooling recommendations are community standard but not project-mandated

**Research date:** 2026-03-23
**Valid until:** 2026-06-23 (90 days — Next.js and Tailwind v4 are stable; Lenis 1.x is stable)
