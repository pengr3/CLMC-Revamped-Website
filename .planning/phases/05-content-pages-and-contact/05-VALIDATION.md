---
phase: 05
slug: content-pages-and-contact
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 05 — Validation Strategy

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
| 05-01-01 | 01 | 1 | ABOUT-01, ABOUT-02 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 05-01-02 | 01 | 1 | SVC-01 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 05-02-01 | 02 | 1 | CLIENT-01, TESTI-01 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 05-02-02 | 02 | 1 | QMS-01 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 05-03-01 | 03 | 2 | CTCT-01, CTCT-02, CTCT-03 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — `npm run build` validates TypeScript compilation and Next.js page rendering.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| About Us page sections render with correct content hierarchy | ABOUT-01 | Visual layout check | Navigate to /about, verify hero + mission + timeline + values sections |
| CEO portrait + bio split layout on desktop | ABOUT-02 | Visual layout check | Navigate to /about/ceo, verify portrait left + bio right |
| Services page expanded descriptions | SVC-01 | Content completeness | Navigate to /services, verify all 5 services with full descriptions |
| Client logo grid with company names | CLIENT-01 | Visual layout check | Navigate to /clients, verify logo grid with names |
| Testimonial cards with quotes | TESTI-01 | Visual layout check | Navigate to /clients/testimonials, verify card grid |
| QMS Policy scannable layout | QMS-01 | Document readability | Navigate to /qms, verify headings + paragraphs + lists |
| Contact form submission to Formspree | CTCT-01 | External service integration | Submit form, verify Formspree receives it |
| Phone/email visible in footer | CTCT-02 | Cross-page visibility | Check footer on any page |
| Mobile responsive on all 7 pages | ALL | Responsive visual check | Resize to 375px, verify all pages |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
