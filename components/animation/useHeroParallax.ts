'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type React from 'react'

export function useHeroParallax(
  heroRef: React.RefObject<HTMLElement | null>,
  bgRef: React.RefObject<HTMLElement | null>,
  textRef: React.RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const hero = heroRef.current
      if (!hero) return

      // D-15: Parallax completely disabled on mobile (viewport < 1024px)
      if (window.innerWidth < 1024) {
        // D-14: Mobile fallback — simple fade-in, 500ms, no scroll effects
        gsap.fromTo(
          hero,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
        )
        return
      }

      const heroHeight = hero.offsetHeight

      // D-12: Background parallax — 15% speed differential (midpoint of 10-20%)
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: heroHeight * 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // D-13: Hero text exit — fade out + drift up as user scrolls past hero
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        })
      }

      // Handle resize — recalculate parallax trigger positions (Pitfall 5)
      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: heroRef }
  )
}
