# Phase 1: Foundation and Design System - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js 15 project, define the design token system (colors, typography, spacing), build the global Navbar (sticky, scroll-aware, mobile hamburger), Footer, and foundational UI atoms — the shared foundation every subsequent phase builds on.

This phase does NOT include page content, animations (Phase 2), or any route-specific sections.

</domain>

<decisions>
## Implementation Decisions

### Color Mode
- **D-01:** Dark-only theme — no light mode, no toggle. Single token layer. Simpler system, stronger visual identity.

### Color Palette
- **D-02:** Background — near-black in the `#0A0A0A`–`#111111` range. Maximum contrast, cinematic feel (Linear.app / Vercel aesthetic).
- **D-03:** Primary accent — crisp white / off-white (`#F5F5F5` or pure `#FFFFFF`). Monochrome system — no color hue in the palette.
- **D-04:** Interactive states (hover, focus) — white at reduced opacity (60–80%). No hue introduced. Pure black/white/opacity system throughout.
- **D-05:** Surface hierarchy (card backgrounds, dividers, secondary text) to be handled with opacity steps on white — Claude's discretion on the specific scale.

### Typography
- **D-06:** Display/headline font — **Geist** (Vercel's open-source sans). Loaded via `next/font/local` or `next/font/google`. Ultra-clean, technical, modern.
- **D-07:** Body/UI font — **Inter**. High-legibility, screen-optimized, 9 weights.
- **D-08:** Headline style — tight negative letter-spacing (`-0.02em` to `-0.04em`), aggressive size scale (80–120px for hero-level H1s). Cinematic, editorial, high-impact.
- **D-09:** Type scale steps and line-height values — Claude's discretion, following a harmonious modular scale.

### Navbar
- **D-10:** Default state (before scroll, over hero) — fully transparent. No background. Logo and links appear white against the hero image. Full-bleed hero is preserved above the fold.
- **D-11:** Scroll state (after crossing ~80px) — frosted glass: dark background + `backdrop-blur`. Smooth CSS transition between states.
- **D-12:** Nav link hover/active — animated underline appears on hover; persists as active page indicator. White underline, subtle entrance animation.
- **D-13:** Logo treatment — text logotype only: `"CLMC"` in Geist, white, bold. No SVG icon/mark required.
- **D-14:** Mobile nav — full-screen overlay. Hamburger icon toggles a full-viewport dark panel with large, centered nav links.

### Claude's Discretion
- Specific gray-scale steps for surface hierarchy (card bg, borders, secondary text, muted text)
- Type scale values (rem steps, line-heights, font-weight assignments per heading level)
- Footer layout structure and column arrangement
- UI atom variants (button sizes, border-radius values, spacing tokens)
- Hamburger icon animation style (morph to X, slide lines, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Tech Stack
- `CLAUDE.md` — Full technology stack spec: Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, GSAP, Motion, Lenis. All library choices and rationale are documented here. Follow the stack exactly.

### Requirements
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: DSGN-01–04, NAV-01–05. Acceptance criteria that must be met.
- `.planning/PROJECT.md` — Core value, design direction, constraints, and out-of-scope items.

No external ADRs or design specs exist yet — all decisions are captured above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — project has not been scaffolded yet. Phase 1 creates the scaffold.

### Established Patterns
- None yet. This phase establishes the patterns all future phases will follow.

### Integration Points
- All subsequent phases (2–6) will import design tokens, Navbar, Footer, and UI atoms from this phase's output.
- Animation infrastructure (Phase 2) will hook into the Lenis smooth scroll instance initialized here (NAV-05).

</code_context>

<specifics>
## Specific Ideas

- Visual reference: Linear.app, Vercel.com aesthetic — near-black backgrounds, white type, frosted glass nav, high-contrast editorial feel.
- Navbar frosted glass: the transition from transparent → blurred should feel smooth, not jarring — use CSS `transition` on `background-color` and `backdrop-filter`.
- Full-screen mobile menu: should feel like a design statement, not just a utility — large type, generous spacing, entrance animation (Phase 2 can enhance, but the structure must be in place here).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-and-design-system*
*Context gathered: 2026-03-23*
