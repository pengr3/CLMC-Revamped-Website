# Domain Pitfalls: Animation-Rich Next.js Marketing Website

**Project:** CLMC Revamped Website
**Domain:** Minimalist-futuristic construction firm marketing site — Next.js App Router, GSAP/Framer Motion, scroll-driven animations
**Researched:** 2026-03-23

---

## Critical Pitfalls

Mistakes that cause rewrites, Google Search ranking damage, or completely broken user experiences.

---

### Pitfall 1: GSAP/Framer Motion Causing Hydration Mismatches on SSR

**What goes wrong:**
Both GSAP and Framer Motion rely on browser-only APIs (window, document, DOM measurements) that do not exist during Next.js server-side rendering. When animation libraries are imported and executed at module load time — or inside component bodies without proper guarding — the server renders one DOM state and the client renders another. Next.js 15 specifically has a known issue where GSAP's ScrollTrigger adds a `style={}` attribute to the `<body>` tag during SSR that differs from the client, triggering hydration errors in the console and, in severe cases, full client re-renders that destroy perceived performance.

**Why it happens:**
Developers import GSAP or start animations inside component bodies or `useLayoutEffect` without the `@gsap/react` package's `useGSAP()` hook, which implements the isomorphic pattern. Similarly, Framer Motion's `motion` components read `data-projection-id` values that differ between server and client renders.

**Consequences:**
- Hydration errors break React's server-client reconciliation, causing a full client-side re-render (doubles work)
- Console warnings escalate into broken animations on route changes
- In strict mode (which Next.js dev uses), components mount/unmount twice, killing ScrollTrigger instances mid-lifecycle
- Animation state is inconsistent between first render and after hydration

**Prevention:**
- Always use `@gsap/react` package and the `useGSAP()` hook — never raw `useEffect` with GSAP
- All animation components in Next.js App Router must include `'use client'` at the top of the file
- Use `dynamic(() => import('./HeavyAnimatedComponent'), { ssr: false })` for components that are entirely animation-driven with no SEO content
- For Framer Motion: wrap animated sections with `<MotionConfig reducedMotion="user">` and ensure `'use client'` is present
- Never call GSAP or access `window`/`document` at module scope — always inside `useGSAP()` or `useEffect`

**Warning signs:**
- "Hydration failed because initial UI does not match" in browser console
- Animations work in development but are broken or doubled in production
- ScrollTrigger fires at wrong scroll positions after navigating back to a page

**Phase to address:** Foundation/setup phase — before any animation work begins. Getting this wrong early means refactoring every animated component later.

---

### Pitfall 2: Hero LCP Destroyed by Missing `priority` or Lazy-Loaded Hero Images

**What goes wrong:**
The hero section is almost always the Largest Contentful Paint (LCP) element. If the hero image uses `loading="lazy"` (Next.js default for `<Image>` components) or lacks the `priority` prop, the browser defers loading it until scroll — meaning LCP waits until after JavaScript hydration, after layout paint, and after the lazy-load threshold triggers. This routinely produces LCP scores above 4 seconds, which Google classifies as "Poor" and directly impacts search ranking.

**Why it happens:**
The `<Image>` component from `next/image` defaults to lazy loading for performance reasons — it is the right default for most images. Developers apply it universally including the hero, not realizing the hero is the one exception that must be prioritized.

**Consequences:**
- LCP in the 4-8s range on mobile (Philippine mobile networks are slow; this is doubly critical)
- Google Core Web Vitals assessment fails, hurting SEO visibility for CLMC
- Real users on mobile bounce before the hero reveals

**Prevention:**
- Add `priority` prop to the hero `<Image>` component on every page — this is a single-line fix with enormous impact
- Set correct `sizes` prop on all `<Image>` components (e.g., `sizes="100vw"` for full-width hero, `sizes="(max-width: 768px) 100vw, 50vw"` for half-width)
- Provide explicit `width` and `height` to every `<Image>` to prevent CLS during load
- Use WebP or AVIF format for project photography — Next.js image optimization handles conversion automatically when using `next/image`
- Pre-generate `blurDataURL` placeholder for hero images to prevent jarring pop-in

**Warning signs:**
- Lighthouse LCP above 2.5s
- Hero image appears after visible content shift
- No `priority` prop on hero `<Image>` in the codebase

**Phase to address:** Whenever the hero section is built. This is a one-line fix with outsized impact — embed it as a standard practice in the initial component template.

---

### Pitfall 3: Animations Causing Cumulative Layout Shift (CLS) by Animating Non-Compositor Properties

**What goes wrong:**
Animating CSS properties that trigger layout recalculation — `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size` — causes the browser to reflow the entire document on every animation frame. Each reflow can shift content that is already visible, accumulating CLS. On a construction site with large typography and project photography, these shifts are dramatic and immediately visible. Google measures CLS during the full page lifetime, so animations triggered on scroll (which fire after initial load) still count against the score.

**Why it happens:**
Designers specify animations as element scaling, expanding text, or sliding blocks into position using positional properties rather than transforms. Developers implement as specified without understanding the compositor boundary.

**Consequences:**
- CLS above 0.1 fails Core Web Vitals "Good" threshold
- Animated reveals that shift already-read content disorient users
- Google penalizes pages that shift content during the measurement window

**Prevention:**
- **Only animate `transform` and `opacity`** — these run on the GPU compositor thread and never trigger layout
- For "slide in from below": use `transform: translateY(40px)` → `translateY(0)`, not `top: 40px` → `top: 0`
- For "fade and scale": use `transform: scale(0.95)` + `opacity: 0` → both to normal values
- Never animate `width`, `height`, `margin`, `padding`, `left`, `top`, `right`, `bottom`
- Set dimensions explicitly on all containers before animations run — use CSS aspect-ratio or fixed height on wrappers
- GSAP's `gsap.set()` should establish final element dimensions before `gsap.from()` animates entry

**Warning signs:**
- Chrome DevTools "Layout" paint flashes in Performance panel during scroll
- CLS score above 0.05 in Lighthouse
- Elements shifting after page load when scrolling

**Phase to address:** Every phase that introduces animations. Establish this as a team rule in the architecture documentation before the first animated component is built.

---

### Pitfall 4: ScrollTrigger Memory Leaks and Stale Triggers on Route Changes

**What goes wrong:**
GSAP ScrollTrigger instances are registered globally. When a Next.js App Router page component unmounts (route change), ScrollTrigger instances from that page are not automatically destroyed unless explicitly killed. They continue to respond to scroll events, referencing now-unmounted DOM elements, causing JavaScript errors, incorrect animation states, and memory leaks that degrade performance over a browser session. This is especially destructive on multi-page sites like CLMC where users navigate between Home, Projects, Services, About, etc.

**Why it happens:**
Developers write `useEffect(() => { gsap.to(ref.current, {...}); ScrollTrigger.create({...}) }, [])` without a cleanup return function. The cleanup is easy to forget, especially when timelines become complex.

**Consequences:**
- Animations from Page A fire on Page B, revealing wrong content at wrong times
- Scroll position calculations become incorrect as old triggers accumulate
- Memory usage increases with each navigation, eventually slowing the browser tab
- In development (React Strict Mode), double-mounting doubles trigger counts immediately

**Prevention:**
- Use `useGSAP()` from `@gsap/react` exclusively — it wraps `gsap.context()` and automatically kills all animations and ScrollTriggers created inside it when the component unmounts
- Never create ScrollTrigger outside `useGSAP()` or a `useEffect` with a cleanup function
- For page-level triggers: call `ScrollTrigger.refresh()` after fonts and images load, not on mount
- Test navigation flows in development — go from Home → Projects → Back to Home and check animations reset correctly

**Warning signs:**
- Animations from previous pages briefly visible when landing on a new page
- Console errors like "target is null" or "Cannot read properties of null" after navigation
- ScrollTrigger animations firing at incorrect scroll positions on second visit to a page

**Phase to address:** Core animation architecture phase. Establish `useGSAP()` as the only permitted pattern before any animation code is written.

---

## Moderate Pitfalls

### Pitfall 5: Page Transitions with Next.js App Router Exit Animations Are Broken by Design

**What goes wrong:**
The App Router navigates immediately when a link is clicked — it unmounts the current page component and mounts the new one. This makes exit animations (the current page animating out before the next one animates in) fundamentally broken without workarounds. Unlike the old Pages Router where Framer Motion's `AnimatePresence` worked reliably, the App Router's lifecycle does not wait for exit animations to complete before navigation.

**Why it happens:**
Next.js App Router was designed for speed, not animation choreography. The component tree is replaced instantly. There is no built-in "wait for exit animation" lifecycle hook.

**Consequences:**
- Exit transitions either get skipped entirely or cause jarring double-mount visual artifacts
- Using `AnimatePresence` at the top level of a layout file causes the wrong behavior: new page loads first, then exit animates, then enter animates — a visible stutter
- Complex transition systems become deeply hacky and fragile

**Prevention:**
- Use the `template.tsx` file in the App Router for enter-only transitions — this is the only officially supported approach for page animation
- For exit animations: use the View Transitions API (browser native, zero library overhead, decent browser support in 2025) via `next/navigation` and CSS `view-transition-name` properties
- Alternatively, use a proven library like `next-transition-router` specifically built for App Router
- Do not attempt to reimplement Pages Router `AnimatePresence` patterns in App Router — they will not work the same way
- Treat page transitions as a progressive enhancement, not a core requirement — get content and scroll animations right first

**Warning signs:**
- Exit animation plays after new page content is already visible
- Page transitions work in development but behave differently in production
- `AnimatePresence` at layout level causing double-flash on navigation

**Phase to address:** Navigation and page transition phase — dedicate specific research time to the chosen approach before implementing.

---

### Pitfall 6: Smooth Scroll Library (Lenis) Conflicting with GSAP ScrollTrigger

**What goes wrong:**
Lenis (popular smooth scroll library) and GSAP ScrollTrigger both intercept scroll events to measure scroll position. Without explicit synchronization, they fight over the scroll value — Lenis eases the scroll position while ScrollTrigger reads the raw browser scroll position, causing animations to trigger at wrong moments, lag behind actual scroll position, or skip entirely. The conflict is especially bad on page navigation where both need to reset.

**Why it happens:**
Both libraries are independently managing scroll state. Lenis virtualizes scroll to create smooth inertia; ScrollTrigger reads `window.scrollY` directly. Without a bridge, they read different values.

**Consequences:**
- Scroll-triggered animations fire too early or too late
- Very poor framerates on lower-end machines due to both systems running in parallel
- After page navigation, scroll position is desynchronized and animations break

**Prevention:**
- Follow the official synchronization pattern exactly: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- Disable GSAP's lag smoothing: `gsap.ticker.lagSmoothing(0)`
- Wrap Lenis initialization in a `useEffect` inside a Provider component that persists across routes in the root layout
- Consider whether Lenis is necessary at all — native browser scroll with CSS `scroll-behavior: smooth` achieves good results without the integration complexity; only add Lenis if the design specifically requires ultra-smooth inertia scrolling

**Warning signs:**
- ScrollTrigger animations trigger at unexpected scroll positions
- FPS drops significantly when both Lenis and ScrollTrigger are active
- Animations desynchronize from scroll position after navigation

**Phase to address:** Core scroll architecture setup. Decide before building any scroll animations whether Lenis will be used, and set up the synchronization pattern once in a shared provider.

---

### Pitfall 7: Ignoring `prefers-reduced-motion` — Accessibility and Legal Risk

**What goes wrong:**
Large scroll-driven animations, parallax, continuous motion, and page transitions can trigger vestibular disorders, nausea, or seizures in affected users. The `prefers-reduced-motion` media query is the standard mechanism for users to request less motion. Ignoring it is both an accessibility failure and, in some jurisdictions, a legal risk under accessibility regulations. A prestigious corporate client-facing site like CLMC should set an accessibility standard, not undermine it.

**Why it happens:**
Animation-focused development workflows treat the reduced-motion case as an afterthought. The feature is designed against users with animations enabled.

**Consequences:**
- Users with vestibular disorders cannot use the site safely
- Potential accessibility complaints — the Philippines follows international web accessibility standards
- Poor experience for the approximately 35% of people who experience motion sickness from screen movement

**Prevention:**
- Framer Motion: set `<MotionConfig reducedMotion="user">` at the root layout — this automatically disables transform and layout animations for affected users with a single line
- GSAP: use `gsap.matchMedia()` to define animation behavior per media query — `prefers-reduced-motion: reduce` should switch from transform-based reveals to simple opacity fades only
- CSS: add `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` as a global safety net
- Distinguish between decorative animations (can be removed) and informational animations (simplify but keep, e.g., a loading indicator)
- Test with the OS accessibility setting enabled — macOS: Accessibility → Display → Reduce Motion; Windows: Settings → Ease of Access → Motion

**Warning signs:**
- No mention of `prefers-reduced-motion` anywhere in the codebase
- Parallax and continuous scroll effects without fallback
- Animations not tested with reduced motion OS setting enabled

**Phase to address:** Establish as a global default in the animation system setup phase — `MotionConfig reducedMotion="user"` and `gsap.matchMedia()` patterns set up once globally, not retrofitted per component.

---

### Pitfall 8: Mobile Performance Collapse from JavaScript-Driven Scroll Animations

**What goes wrong:**
JavaScript scroll event handlers run on the main thread. On mid-range Android devices — which represent a large share of Philippine mobile users — the main thread is frequently occupied with JavaScript parsing, React reconciliation, and layout calculations. Adding scroll event listeners for parallax, sticky elements, and reveal animations on top creates visible jank (dropped frames, stuttering) that makes the site feel broken rather than polished. A "rich animations" brief that looks great on a MacBook can be unusable on a Samsung Galaxy A-series device.

**Why it happens:**
Development and testing happens on high-end machines. Animation performance on a developer's M-series MacBook or high-end Windows PC does not represent the target user's Philippine mid-range mobile device.

**Consequences:**
- Scroll stutters and janks rather than feeling cinematic
- The site actively feels worse than the original CLMC site on the target audience's actual devices
- Mobile Core Web Vitals scores (which Google weights) degrade significantly

**Prevention:**
- Prefer CSS scroll-driven animations (using the native `animation-timeline: scroll()` API) for simple reveal effects — these run on the compositor thread entirely, not the main thread
- Use `will-change: transform` sparingly on elements that will animate — only the elements currently animating, not everything
- Test on a real mid-range Android device early, not just Chrome DevTools mobile emulation
- Disable parallax effects on mobile entirely (`@media (max-width: 768px)`) — this is standard practice and users expect simpler mobile experiences
- Limit simultaneous animated elements — stagger reveals so only 2-3 elements animate at once, not entire page sections
- Use `IntersectionObserver` for scroll-triggered class additions rather than `onScroll` event listeners

**Warning signs:**
- Chrome DevTools Performance panel shows long tasks during scroll
- Frame rate drops below 60fps when scrolling past animated sections
- Animations feel smooth on desktop but noticeably jank on physical mobile devices

**Phase to address:** Every phase building scroll animations — test on a real device or BrowserStack before marking any animation feature complete.

---

### Pitfall 9: Font Loading Causing FOUT / Layout Shift in Bold Typography

**What goes wrong:**
The minimalist-futuristic design relies on bold, large typography as a primary design element. If custom fonts fail to load before first paint (or load asynchronously), the browser renders a fallback font first. When the custom font loads, the metrics (character width, line height, letter spacing) differ from the fallback, causing a visible layout shift — the FOUT (Flash of Unstyled Text) / FOUC (Flash of Unstyled Content) problem. On large display headings, even a small metric difference causes significant CLS. In production on Vercel, FOUC behavior can differ from local development, making it a surprise deployment regression.

**Why it happens:**
Using `@font-face` or Google Fonts `<link>` tags instead of `next/font`. The `next/font` module inlines font CSS, pre-loads fonts during SSR, and provides zero-layout-shift font loading by default. Using older font loading approaches in a Next.js project discards all these guarantees.

**Consequences:**
- Bold display headings visibly reflow as fonts swap in
- CLS increases from font metric differences
- First impression of the "cinematic" design is a flash of wrong typography
- Inconsistent between development and Vercel production deployments

**Prevention:**
- Use `next/font/google` or `next/font/local` exclusively — never `@import` in CSS or `<link>` in `<head>` for fonts
- Define fonts in the root `layout.tsx` file and apply via CSS variable — this ensures they load for all pages from a single shared layout
- Specify `fallback` fonts with matching metrics in `next/font` configuration to minimize shift if font load is delayed
- Use `size-adjust`, `ascent-override`, `descent-override` CSS font metrics to make the fallback match the custom font dimensions
- Import fonts once at the root layout level — importing in multiple layout files creates multiple instances and wasted network requests

**Warning signs:**
- Visible font swap on hard refresh
- CLS score correlates with font load timing in Lighthouse
- `@import url('https://fonts.googleapis.com/')` found in CSS files
- FOUC only in production but not development

**Phase to address:** Project setup/foundation phase — configure `next/font` in the root layout before any design work begins.

---

## Minor Pitfalls

### Pitfall 10: JavaScript Bundle Bloat from Animation Libraries

**What goes wrong:**
GSAP's full bundle is approximately 100KB. Framer Motion is approximately 50KB. Importing both libraries (a common "belt and suspenders" pattern) doubles the animation overhead. Additionally, importing GSAP plugins globally (ScrollTrigger, TextPlugin, SplitText, etc.) when they are only needed on specific pages loads them on every page.

**Prevention:**
- Choose one primary animation library — GSAP for complex scroll sequences, Framer Motion for component-level transitions — not both
- Register GSAP plugins only on the pages that use them, not in a global registry
- Use `dynamic(() => import('./AnimatedSection'), { ssr: false })` to code-split heavy animated components
- Audit the bundle with `@next/bundle-analyzer` before deploying

**Warning signs:**
- Bundle analyzer shows GSAP and Framer Motion both in the main chunk
- All GSAP plugins registered globally in `_app` or root layout

**Phase to address:** Architecture phase — pick one library and commit.

---

### Pitfall 11: Project Gallery Images Not Optimized, Blocking Page Load

**What goes wrong:**
The Projects gallery is described as the "flagship gallery with full project showcases." Construction photography is typically large, high-resolution images. Importing raw JPEGs without optimization, using `<img>` instead of `<Image>`, or loading all gallery images on page mount rather than on demand causes the Projects page to load slowly. With many project photographs at original camera resolution, the page can easily reach 20-50MB of unoptimized images.

**Prevention:**
- Every project photo must go through `next/image` — this handles WebP/AVIF conversion, responsive srcsets, and lazy loading automatically
- Implement a paginated or virtualized gallery — load the first 6-8 projects on initial render, fetch more on scroll or button click
- Store project images in a static `/public/projects/` directory and let Vercel's image optimization CDN handle resizing
- Use `placeholder="blur"` with generated `blurDataURL` for all gallery images to prevent jarring pop-in

**Warning signs:**
- Lighthouse shows image-related opportunities totaling more than 500KB savings
- Network tab shows multiple multi-MB image requests on Projects page initial load
- `<img>` tags found in project gallery components

**Phase to address:** Projects gallery phase.

---

### Pitfall 12: Deploying to Vercel Without Configuring Image Domains and Remote Patterns

**What goes wrong:**
If project images are ever sourced from an external URL (a CDN, CMS, or client-provided image host) rather than bundled in `/public`, the `next/image` component will refuse to optimize them unless the domain is explicitly whitelisted in `next.config.js`. This is a deployment-time error that breaks the Projects page in production.

**Prevention:**
- For static content (v1): keep all images in `/public` — no remote patterns needed
- If external images are introduced: configure `images.remotePatterns` in `next.config.js` at the time of introduction, not after deployment
- Test image optimization in production (not just dev) before each release

**Warning signs:**
- `next/image` console error mentioning "hostname not configured"
- Images that work locally are broken on Vercel

**Phase to address:** Deployment/CI phase — include as a pre-launch checklist item.

---

### Pitfall 13: Over-Engineering the Animation System Before Validating the Design

**What goes wrong:**
Spending Phase 1-2 building a sophisticated, centralized animation orchestration system (custom hooks, animation queues, scene directors, config-driven animation schemas) before any real page designs are proven locks in assumptions that may need to change when actual pages are built. Construction websites commonly have varied section types — text reveals, image sequences, stat counters, parallax heroes — each with different animation needs that resist a one-size-fits-all system.

**Prevention:**
- Build animations per-component at first — duplicate some code if needed
- Extract shared patterns into utilities only after 3+ components use the same logic
- The animation choreography for a hero section and a testimonial grid are different enough that premature abstraction creates complexity without benefit
- Prefer `useGSAP()` per component over a global animation context for most cases

**Warning signs:**
- Days spent on animation infrastructure before any page exists
- Animation "system" has more lines of code than actual animation implementations
- Cannot add a simple fade-in without modifying the central animation config

**Phase to address:** Architecture phase — decide on simple conventions (use `useGSAP()` per component, prefer `transform`/`opacity`, always `prefers-reduced-motion`) rather than building infrastructure.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project setup / foundation | GSAP SSR hydration, font FOUC | Configure `next/font` in root layout, install `@gsap/react`, enforce `'use client'` rule |
| Hero section build | Missing `priority` on hero image, LCP failure | Add `priority` prop as standard; set explicit `width`/`height` on hero `<Image>` |
| Scroll animation system | ScrollTrigger memory leaks, Lenis conflicts | Only use `useGSAP()`, decide on Lenis early, establish cleanup patterns |
| Projects gallery | Unoptimized images, no pagination | Use `next/image` for all photos, implement lazy-load pattern |
| Page transitions | App Router exit animation impossibility | Use `template.tsx` for enter-only, or View Transitions API |
| Mobile pass | JavaScript scroll jank on low-end devices | Disable parallax on mobile, test on physical Android device |
| Accessibility pass | Missing reduced-motion support | Set `MotionConfig reducedMotion="user"` globally, test OS reduced-motion setting |
| Pre-launch | Bundle bloat from duplicate libraries | Bundle analyzer audit, remove unused GSAP plugins |
| Deployment | Image domain errors, production FOUC differences | Test on Vercel staging, verify `next.config.js` image patterns |

---

## Sources

- [GSAP Accessible Animation Guide](https://gsap.com/resources/a11y/) — official GSAP accessibility documentation
- [GSAP React Integration Guide](https://gsap.com/resources/React/) — official `useGSAP()` patterns
- [Hydration Error in Next.js 15 with GSAP](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/) — community-reported specific issue
- [Next.js Hydration Error Reference](https://nextjs.org/docs/messages/react-hydration-error) — official Next.js documentation
- [Optimizing GSAP in Next.js 15 — Cleanup Best Practices](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Framer Motion Accessibility Guide](https://motion.dev/docs/react-accessibility) — official Motion documentation
- [Chrome Scroll Animation Performance Case Study](https://developer.chrome.com/blog/scroll-animation-performance-case-study) — compositor vs main thread scroll performance
- [Framer Motion vs Motion One Mobile Performance 2025](https://reactlibraries.com/blog/framer-motion-vs-motion-one-mobile-animation-performance-in-2025)
- [Next.js Image Component — LCP and CWV](https://pagepro.co/blog/nextjs-image-component-performance-cwv/)
- [Mastering Mobile LCP in Next.js 2025](https://axzlead.com/blog/mastering-mobile-lcp-nextjs-2025)
- [Understanding and Fixing FOUC in Next.js App Router 2025](https://dev.to/amritapadhy/understanding-fixing-fouc-in-nextjs-app-router-2025-guide-ojk)
- [Lenis + GSAP ScrollTrigger Synchronization Pattern](https://gsap.com/community/forums/topic/40426-patterns-for-synchronizing-scrolltrigger-and-lenis-in-reactnext/)
- [Page Transitions with GSAP + Next.js App Router](https://medium.com/@josiah.webdev/page-transitions-with-gsap-next-js-app-router-5508cee43a80)
- [App Router Page Transitions Discussion](https://github.com/vercel/next.js/discussions/42658) — Next.js official GitHub
- [Top UI/UX Mistakes That Hurt Core Web Vitals](https://websitespeedy.com/blog/top-ui-ux-mistakes-core-web-vitals/)
- [Web Animation Performance Tier List](https://motion.dev/magazine/web-animation-performance-tier-list) — Motion.dev
