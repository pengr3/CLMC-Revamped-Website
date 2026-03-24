'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import type React from 'react'

export function useStagger(containerRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const containers = containerRef.current?.querySelectorAll('[data-stagger]') ?? []

      containers.forEach((container) => {
        const children = container.querySelectorAll('[data-stagger-child]')
        if (children.length === 0) return

        gsap.set(children, { opacity: 0, y: 40 })

        ScrollTrigger.create({
          trigger: container,
          start: 'top 90%',
          end: 'bottom top',
          onEnter: () =>
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              stagger: {
                each: 0.1,
                ease: 'power1.out',
                from: 'start',
              },
            }),
          onLeave: () =>
            gsap.to(children, { opacity: 0, y: -20, duration: 0.3 }),
          onEnterBack: () =>
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              stagger: {
                each: 0.1,
                ease: 'power1.out',
                from: 'start',
              },
            }),
          onLeaveBack: () =>
            gsap.to(children, { opacity: 0, y: 40, duration: 0.3 }),
        })
      })
    },
    { scope: containerRef }
  )
}
