---
phase: 2
slug: animation-infrastructure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-24
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None detected — Wave 0 installs Vitest or defers to `npm run build` gate |
| **Config file** | None — Wave 0 installs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual QA in dev server
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | ANIM-01 | build + visual | `npm run build` | ✅ | ⬜ pending |
| 02-01-02 | 01 | 1 | ANIM-02 | build + visual | `npm run build` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 1 | ANIM-03 | build + visual | `npm run build` | ✅ | ⬜ pending |
| 02-02-02 | 02 | 1 | ANIM-04 | build + visual | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Verify `npm run build` passes cleanly before starting phase work
- [ ] Verify `npm run lint` passes cleanly before starting phase work

*Animation infrastructure is primarily validated via TypeScript compilation + visual QA in dev server. GSAP/ScrollTrigger behaviors require browser rendering and cannot be meaningfully unit tested in jsdom.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Scroll reveal fires on scroll | ANIM-01 | Requires browser scroll geometry | Open dev server, scroll page, verify sections fade-up on viewport entry |
| Page crossfade transition | ANIM-03 | Requires route navigation in browser | Navigate between pages, verify 300ms opacity fade with no hard flash |
| Button/card hover states | ANIM-04 | Requires mouse interaction | Hover buttons and cards, verify scale + shadow response |
| Hero parallax on desktop | ANIM-02 | Requires scroll + viewport size | Open at ≥1024px width, scroll past hero, verify background parallax |
| Parallax disabled on mobile | ANIM-02 | Requires narrow viewport | Open at <1024px width, verify no parallax jank |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
