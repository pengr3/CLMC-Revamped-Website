---
phase: 04-projects-gallery
plan: "01"
subsystem: projects-data-and-gallery
tags: [data-layer, gallery, filtering, animation, masonry]
dependency_graph:
  requires: []
  provides: [projects-data-source, gallery-page, featured-projects-links]
  affects: [components/sections/FeaturedProjectsSection.tsx, app/projects/page.tsx]
tech_stack:
  added: []
  patterns:
    - Single shared data/projects.ts as project data source of truth
    - CSS columns masonry layout with break-inside-avoid
    - AnimatePresence mode="popLayout" with motion.div per card for filtered transitions
key_files:
  created:
    - data/projects.ts
    - components/sections/ProjectsGallery.tsx
  modified:
    - components/sections/FeaturedProjectsSection.tsx
    - app/projects/page.tsx
decisions:
  - data/projects.ts is the single source of truth for all project data — both gallery and home page import from it
  - CSS columns masonry chosen over JS-based masonry (e.g., Masonry.js) — zero runtime cost, native CSS, no layout thrash
  - AnimatePresence mode="popLayout" used for filter transitions — handles both enter and exit cleanly as layout recalculates
  - ProjectsGallery is a client component that owns the heading and useFadeUp — avoids making the page a client component
  - app/projects/page.tsx remains a Server Component — client boundary is contained in ProjectsGallery
metrics:
  duration: "~15 minutes"
  completed: "2026-03-28"
  tasks_completed: 2
  files_created: 2
  files_modified: 2
---

# Phase 04 Plan 01: Project Data Layer and Filterable Gallery Summary

Shared project data layer in `data/projects.ts` with 10 projects across 5 categories; filterable masonry gallery at `/projects` using Motion `AnimatePresence` with CSS columns layout; `FeaturedProjectsSection` migrated to shared data source with per-project `/projects/[id]` links.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create data/projects.ts and migrate FeaturedProjectsSection | 8d5a718 | data/projects.ts, components/sections/FeaturedProjectsSection.tsx |
| 2 | Build ProjectsGallery component and gallery page | 9be5eb8 | components/sections/ProjectsGallery.tsx, app/projects/page.tsx |

## What Was Built

### data/projects.ts
Single source of truth for all CLMC project data. Exports: `Project` interface, `ProjectCategory` union type, `ALL_CATEGORIES` array (5 entries), `BLUR_DATA_URL` base64 placeholder, `projects` array (10 entries), `featuredProjects` derived array (6 entries, filtered by `featured: true`).

### components/sections/ProjectsGallery.tsx
Client component with:
- `useState<ProjectCategory | 'All'>('All')` for active filter tracking
- Filter pills row rendering `['All', ...ALL_CATEGORIES]` with conditional active/inactive Tailwind classes via `cn()`
- CSS columns masonry grid: `columns-1 md:columns-2 lg:columns-3 gap-lg` with `break-inside-avoid mb-lg` per card
- `AnimatePresence mode="popLayout"` wrapping all `motion.div` cards with `key={project.id}`, `layout`, and `initial/animate/exit` scale+opacity transitions
- `useRef` + `useFadeUp` on outer div to animate `data-fade-up` heading on scroll
- Page heading and description included inside component (keeps page.tsx a Server Component)

### components/sections/FeaturedProjectsSection.tsx
Migrated from inline `FEATURED_PROJECTS` const to `import { featuredProjects } from '@/data/projects'`. Updated card `href` from `/projects` to `/projects/${project.id}` — each featured card now deep-links to its project detail URL.

### app/projects/page.tsx
Replaced placeholder with a Server Component that renders the `<ProjectsGallery />` client component inside a full-bleed section with `py-4xl` spacing and `max-w-7xl` container.

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` — zero TypeScript errors
- `npx next build` — builds successfully, /projects route included as static (`○`)
- All 10 projects available in data layer
- FeaturedProjectsSection imports from shared data, links to /projects/[id]
- ProjectsGallery has AnimatePresence, useState, useFadeUp, masonry columns, break-inside-avoid

## Self-Check: PASSED

- data/projects.ts: FOUND
- components/sections/ProjectsGallery.tsx: FOUND
- app/projects/page.tsx: FOUND
- Commit 8d5a718: FOUND
- Commit 9be5eb8: FOUND
