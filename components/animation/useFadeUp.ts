'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type React from 'react'

export function useFadeUp(containerRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const targets = containerRef.current?.querySelectorAll('[data-fade-up]') ?? []

      targets.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 40 })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          end: 'bottom top',
          onEnter: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
          onLeave: () =>
            gsap.to(el, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }),
          onEnterBack: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
          onLeaveBack: () =>
            gsap.to(el, { opacity: 0, y: 40, duration: 0.4, ease: 'power2.in' }),
        })
      })
    },
    { scope: containerRef }
  )
}
