---
phase: 06
slug: seo-performance-and-accessibility
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 06 — Validation Strategy

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
| 06-01-01 | 01 | 1 | SEO-01, SEO-02 | build | `npm run build` | ✅ | ⬜ pending |
| 06-02-01 | 02 | 1 | PERF-01, PERF-02, PERF-03, A11Y-01 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — `npm run build` validates TypeScript, metadata exports, and static page generation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| OG tags render correctly in social media previews | SEO-01 | External service behavior | Share URL on social media or use og:image validator |
| JSON-LD passes structured data test | SEO-02 | External validation tool | Run through Google Rich Results Test |
| Core Web Vitals (LCP < 2.5s, CLS < 0.1) | PERF-01 | Runtime performance measurement | Run Lighthouse on deployed site |
| Responsive layout at 375px, 768px, 1280px | PERF-02 | Visual breakpoint check | Resize browser to each width |
| Keyboard navigation and focus indicators | A11Y-01 | Interactive keyboard behavior | Tab through all pages, verify focus ring visible |
| Skip link functionality | A11Y-01 | Keyboard interaction | Press Tab on page load, verify skip link appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
