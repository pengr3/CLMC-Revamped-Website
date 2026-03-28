---
phase: 04
slug: projects-gallery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | next build (no test framework installed) |
| **Config file** | next.config.ts |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full build must succeed
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | PROJ-01, PROJ-05 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 04-01-02 | 01 | 1 | PROJ-02 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 04-02-01 | 02 | 2 | PROJ-03, PROJ-04 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — `npm run build` validates TypeScript compilation and Next.js page rendering including `generateStaticParams` for dynamic routes.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Category filter reflows cards with animation | PROJ-02 | Visual Motion AnimatePresence behavior | Click category pills, verify cards animate in/out smoothly |
| Gallery images show blur placeholder then resolve | PROJ-04 | Visual loading behavior | Throttle network in DevTools, reload gallery page |
| Detail page hero image renders at 60vh | PROJ-03 | Visual layout check | Navigate to any project detail page, verify hero sizing |
| Featured projects on home page link to individual detail pages | PROJ-05 | Navigation integration | Click each featured project card on home page, verify correct detail page opens |
| Masonry grid layout with varied card heights | PROJ-01 | Visual CSS columns behavior | View gallery on desktop, verify staggered column layout |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
