# CLMC Revamped Website

## What This Is

A full visual revamp of the C. Lacsamana Management and Construction Corporation (CLMC) website — a Philippine construction and management consultancy firm. The new site keeps the existing page structure but rebuilds it from the ground up with a minimalist-futuristic aesthetic: ultra-clean layouts, bold typography, rich scroll-driven animations, and a visually impressive project gallery. Built with React / Next.js.

## Core Value

A stunning first impression that positions CLMC as the most forward-thinking construction firm in the Philippines — winning clients through prestige and credibility on every scroll.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Minimalist-futuristic visual design — ultra-clean, bold typography, lots of whitespace, dark/light contrast
- [ ] Rich animations — scroll-triggered, parallax, transitions, and micro-interactions throughout
- [ ] Hero-feature project gallery — visually impressive centrepiece showcasing past work
- [ ] Home page with strong brand statement and CTAs
- [ ] About Us page — company background and values
- [ ] About the CEO page — leadership profile
- [ ] Our Services page — management consultancy and engineering services
- [ ] Our Clients page — client logos / testimonials
- [ ] QMS Policy page — quality management system documentation
- [ ] Client Testimony page — curated testimonials
- [ ] Projects page — flagship gallery with full project showcases
- [ ] Responsive design — mobile and desktop
- [ ] Performance-optimized — fast load times despite rich animations
- [ ] Next.js App Router architecture

### Out of Scope

- CMS / admin backend — content is static or hard-coded for v1
- E-commerce or payment features — not a transactional site
- Client portal or login system — no authenticated area
- Blog or news section — deferred to future milestone

## Context

- **Original site**: https://clmc.com.ph/ — corporate dark theme, professional tone, built traditionally
- **Current tagline**: "CLMC: Building with Excellence, Delivering Peace of Mind."
- **Industry**: Construction and management consultancy, Philippines
- **Target audience**: Prospective clients (developers, corporations, government) evaluating construction partners
- **Design direction**: Minimalist Future — think ultra-clean Swiss-grid layouts, cinematic project photography, smooth scroll storytelling
- **Animation philosophy**: Rich but purposeful — GSAP or Framer Motion for scroll-driven sequences, subtle hover states, cinematic reveals

## Constraints

- **Tech Stack**: React / Next.js (App Router) — user's explicit choice
- **Design**: Must feel genuinely unique in the construction industry — not a generic template
- **Content**: Retain existing page structure (same nav sections as original site)
- **Performance**: Rich animations must not compromise Core Web Vitals significantly

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern React framework with SSR/SSG capabilities, great for performance + SEO | — Pending |
| Minimalist Future aesthetic | Unique in construction space; stands out vs. dark/industrial competitors | — Pending |
| Projects as hero feature | Client's #1 visual priority — showcases credibility through real work | — Pending |
| Static content for v1 | Avoids CMS complexity; iterate on content strategy after launch | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-23 after initialization*
