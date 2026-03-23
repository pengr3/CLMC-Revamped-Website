---
phase: 01-foundation-and-design-system
plan: 01
subsystem: ui
tags: [nextjs, tailwind, tailwindv4, gsap, motion, lenis, typescript, fonts, design-tokens]

# Dependency graph
requires: []
provides:
  - Next.js 16.2 project scaffold (App Router, TypeScript)
  - Tailwind CSS v4 design token system (@theme blocks: colors, spacing, radius, breakpoints)
  - Geist + Inter font loading via next/font/google with CSS variable injection
  - cn() class merge utility (clsx + tailwind-merge)
  - Button UI atom (3 variants x 3 sizes, forwardRef, accessible focus ring)
  - Six route placeholder pages (home, about, services, projects, clients, contact)
  - prefers-reduced-motion global animation fallback (DSGN-04)
  - .gitignore for Next.js project
affects:
  - 01-02 (Navbar/Footer builds on this layout, tokens, and fonts)
  - all subsequent phases (design tokens, Button atom, cn() utility used throughout)

# Tech tracking
tech-stack:
  added:
    - next@16.2.1
    - react@19
    - typescript@5
    - tailwindcss@4 (@tailwindcss/postcss)
    - gsap@3.14.2
    - "@gsap/react@2.1.2"
    - motion@12.38
    - lenis@1.3.19
    - clsx@2.1.1
    - tailwind-merge@3.5
    - lucide-react@0.577
  patterns:
    - "Tailwind v4 CSS-first configuration via @theme blocks in globals.css — no tailwind.config.js"
    - "Font variables injected by next/font via className on html element, mapped via @theme inline"
    - "Design tokens declared as CSS custom properties in @theme, consumed as Tailwind utilities"
    - "cn() utility pattern for conditional class merging (clsx + twMerge)"
    - "forwardRef pattern for all UI atoms to support GSAP/Motion composition"

key-files:
  created:
    - app/globals.css (design token system — @theme blocks)
    - app/layout.tsx (root layout with Geist + Inter font injection)
    - app/page.tsx (home placeholder)
    - app/about/page.tsx (about placeholder)
    - app/services/page.tsx (services placeholder)
    - app/projects/page.tsx (projects placeholder)
    - app/clients/page.tsx (clients placeholder)
    - app/contact/page.tsx (contact placeholder)
    - lib/utils.ts (cn() utility)
    - components/ui/Button.tsx (Button atom)
    - next.config.ts (image formats + device sizes)
    - postcss.config.mjs (@tailwindcss/postcss)
    - .gitignore
  modified: []

key-decisions:
  - "Tailwind CSS v4 CSS-first config — @theme blocks replace tailwind.config.js entirely"
  - "Geist loaded via next/font/google (not local) for simplicity at scaffold stage"
  - "No output: export in next.config.ts — preserves next/image optimization on Vercel"
  - "prefers-reduced-motion gates all animations via global @media rule in globals.css"
  - "Button sm uses rounded-sm (4px) per UI-SPEC, not rounded-md — matches 6px original intention via token"

patterns-established:
  - "Design token naming: --color-{role}-{variant}, --spacing-{size}, --radius-{size}"
  - "Font utilities: font-display (Geist) and font-body (Inter) via Tailwind"
  - "All UI atoms use forwardRef and export named component plus TypeScript types"
  - "Route pages are Server Components by default — no 'use client' unless required"

requirements-completed: [DSGN-01, DSGN-02, DSGN-03, DSGN-04]

# Metrics
duration: 8min
completed: 2026-03-23
---

# Phase 1 Plan 1: Foundation and Design System Summary

**Next.js 16.2 scaffold with Tailwind CSS v4 @theme token system (dark monochrome palette), Geist/Inter fonts via next/font, Button atom with 3 variants, and six route placeholders**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-23T09:16:08Z
- **Completed:** 2026-03-23T09:24:00Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- Scaffolded Next.js 16.2 with TypeScript, App Router, and Tailwind CSS v4 via create-next-app
- Installed full animation/utility stack: gsap, @gsap/react, motion, lenis, clsx, tailwind-merge, lucide-react
- Wrote complete @theme token system in globals.css: 9 color tokens, 9 spacing tokens, 4 radius tokens, 5 breakpoints, font variable mappings
- Configured Geist + Inter fonts via next/font/google with zero-FOUT CSS variable injection on html element
- Created Button atom with primary/ghost/destructive variants and sm/md/lg sizes, forwardRef, and accessible focus ring
- Added prefers-reduced-motion global CSS fallback (DSGN-04 compliance)
- Created all 6 route placeholders that share the root layout and verify design tokens work

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 16 project and configure design token system** - `045c502` (feat)
2. **Task 2: Create Button UI atom with variant and size system** - `26f3153` (feat)

## Files Created/Modified

- `app/globals.css` - Full Tailwind v4 @theme token system (colors, spacing, radius, breakpoints, fonts, reduced-motion)
- `app/layout.tsx` - Root layout with Geist + Inter via next/font/google, metadata
- `app/page.tsx` - Home placeholder using design tokens
- `app/about/page.tsx` - About placeholder
- `app/services/page.tsx` - Services placeholder
- `app/projects/page.tsx` - Projects placeholder
- `app/clients/page.tsx` - Clients placeholder
- `app/contact/page.tsx` - Contact placeholder
- `lib/utils.ts` - cn() class merge utility (clsx + tailwind-merge)
- `components/ui/Button.tsx` - Button atom: 3 variants, 3 sizes, forwardRef, focus ring
- `next.config.ts` - AVIF/WebP image formats, device sizes for Philippine mobile coverage
- `postcss.config.mjs` - @tailwindcss/postcss plugin (Tailwind v4)
- `.gitignore` - Standard Next.js ignores

## Decisions Made

- No `output: 'export'` in next.config.ts — preserves Vercel next/image on-demand optimization
- Tailwind v4 CSS-first approach: zero tailwind.config.js, all tokens in globals.css @theme blocks
- Geist loaded via next/font/google (not local files) for simpler scaffold; can switch to local in later phase if needed
- Button `sm` size uses `rounded-sm` (4px token) as closest available token — UI-SPEC specifies 6px which is between sm(4px) and md(8px) tokens; plan spec explicitly uses `rounded-sm` so followed plan

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] node_modules corrupted after cp -r from temp scaffold**
- **Found during:** Task 1 verification (npm run build)
- **Issue:** Copying node_modules with cp -r produced broken symlinks/binaries — Next.js bin failed with MODULE_NOT_FOUND
- **Fix:** Deleted node_modules, ran npm install from package.json to get clean install
- **Files modified:** node_modules/ (runtime, not committed)
- **Verification:** npm run build exits 0 after clean install
- **Committed in:** 045c502 (no file change — runtime fix only)

**2. [Rule 2 - Missing Critical] Added .gitignore**
- **Found during:** Task 1 commit preparation
- **Issue:** No .gitignore existed; node_modules and .next build artifacts would be tracked
- **Fix:** Created standard Next.js .gitignore excluding node_modules/, .next/, build/, env files
- **Files modified:** .gitignore
- **Verification:** git status --short shows node_modules and .next excluded
- **Committed in:** 045c502 (bundled with Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking infrastructure issue, 1 missing critical gitignore)
**Impact on plan:** Both fixes essential for correctness. No scope creep.

## Issues Encountered

- npm run build returned only "ok (no output)" on first run after cp — confirmed it was running from a cache, not actual build. Reran with full output to verify exit code 0.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All design tokens available as Tailwind utilities (e.g., `bg-surface-primary`, `text-text-primary`, `font-display`)
- Root layout in place; Plan 02 can add Navbar, Footer, and LenisProvider without modifying token system
- Button atom ready for use in Navbar CTA and any page sections
- Six routes exist and render; Plan 02 adds shared layout shell components
- No blockers for Plan 02

---
*Phase: 01-foundation-and-design-system*
*Completed: 2026-03-23*
