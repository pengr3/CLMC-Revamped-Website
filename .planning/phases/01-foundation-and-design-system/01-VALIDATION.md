---
phase: 1
slug: foundation-and-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library (unit) + Playwright (E2E) |
| **Config file** | `vitest.config.ts` — does not exist yet (Wave 0 installs) |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx vitest run` |
| **Estimated runtime** | ~30 seconds (build) + ~10 seconds (unit tests) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (type-check + compile passes)
- **After every plan wave:** Run `npm run build && npx vitest run`
- **Before `/gsd:verify-work`:** Full suite green + manual visual check at 375px / 768px / 1280px on `localhost:3000`
- **Max feedback latency:** ~40 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-scaffold | 01 | 0 | DSGN-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 1-tokens | 01 | 1 | DSGN-01 | manual+build | `npm run build` | ❌ W0 | ⬜ pending |
| 1-fonts | 01 | 1 | DSGN-02 | build+visual | `npm run build` | ❌ W0 | ⬜ pending |
| 1-button | 01 | 1 | DSGN-03 | unit | `npx vitest run` | ❌ W0 | ⬜ pending |
| 1-reduced-motion | 01 | 1 | DSGN-04 | manual | Manual DevTools | — | ⬜ pending |
| 1-navbar | 02 | 2 | NAV-01, NAV-02 | e2e | `npx playwright test` | ❌ W0 | ⬜ pending |
| 1-mobile-nav | 02 | 2 | NAV-03 | e2e+manual | `npx playwright test` | ❌ W0 | ⬜ pending |
| 1-footer | 02 | 2 | NAV-04 | e2e | `npx playwright test` | ❌ W0 | ⬜ pending |
| 1-lenis | 02 | 2 | NAV-05 | manual | Manual visual | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Install dev dependencies: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @playwright/test`
- [ ] `vitest.config.ts` — Vitest configuration for Next.js 16
- [ ] `playwright.config.ts` — Playwright E2E configuration
- [ ] `tests/components/Button.test.tsx` — stub for DSGN-03 atom coverage
- [ ] `tests/e2e/navigation.spec.ts` — Navbar + Footer presence on all routes (NAV-01, NAV-04)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Fonts load without FOUT | DSGN-02 | Visual timing issue; no JS API | Open DevTools > Network > throttle to Slow 3G; reload; observe no font flash |
| Animations absent with prefers-reduced-motion | DSGN-04 | No browser API to assert computed animation state | DevTools > Rendering > Emulate prefers-reduced-motion: reduce; verify Navbar transition and Lenis scroll are instant/static |
| Lenis smooth scroll active | NAV-05 | Scroll feel is subjective/visual | Open localhost:3000; scroll rapidly; verify butter-smooth momentum without jitter |
| Navbar frosted glass at 80px scroll | NAV-02 | CSS backdrop-filter hard to assert in Playwright without visual diff | Scroll past 80px; verify blur + dark background appears with smooth CSS transition |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 40s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
