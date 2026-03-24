'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type React from 'react'

export function useClipReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const targets = containerRef.current?.querySelectorAll('[data-clip-reveal]') ?? []

      targets.forEach((el) => {
        gsap.set(el, { clipPath: 'inset(100% 0 0 0)' })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          end: 'bottom top',
          onEnter: () =>
            gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' }),
          onLeave: () =>
            gsap.to(el, { clipPath: 'inset(100% 0 0 0)', duration: 0.5, ease: 'power2.in' }),
          onEnterBack: () =>
            gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' }),
          onLeaveBack: () =>
            gsap.to(el, { clipPath: 'inset(100% 0 0 0)', duration: 0.5, ease: 'power2.in' }),
        })
      })
    },
    { scope: containerRef }
  )
}
