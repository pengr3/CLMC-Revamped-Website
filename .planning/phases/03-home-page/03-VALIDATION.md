---
phase: 03
slug: home-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | next build (no test framework installed) |
| **Config file** | next.config.ts |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full build must succeed
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | HOME-01 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | HOME-02 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-03 | 01 | 1 | HOME-03 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-04 | 01 | 1 | HOME-04 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-05 | 01 | 1 | HOME-05 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-06 | 01 | 1 | HOME-06 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-07 | 01 | 1 | HOME-07 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — `npm run build` validates TypeScript compilation and Next.js page rendering.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero parallax scroll effect | HOME-01 | Visual scroll behavior | Scroll slowly on desktop, verify background parallax movement |
| Count-up animation triggers on scroll | HOME-04 | Visual animation timing | Scroll to stats section, verify numbers animate from 0 |
| Client logo marquee scrolls continuously | HOME-05 | CSS animation visual check | Observe logo strip auto-scrolling without pauses |
| All sections render correctly on mobile | HOME-06 | Responsive visual layout | Resize browser to 375px width, check all 6 sections |
| Smooth scroll between sections | HOME-07 | Lenis integration visual | Click CTA links, verify smooth scroll behavior |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
