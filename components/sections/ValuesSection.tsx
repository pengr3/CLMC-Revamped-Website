'use client'

import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'
import { VALUES } from '@/data/about'

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useFadeUp(sectionRef)
  useStagger(sectionRef)

  return (
    <section ref={sectionRef} className="py-4xl px-md md:px-2xl bg-surface-secondary">
      <div className="max-w-7xl mx-auto">
        <h2
          data-fade-up
          className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3xl"
        >
          Our Values
        </h2>
        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 gap-lg"
        >
          {VALUES.map((value) => (
            <div
              key={value.title}
              data-stagger-child
              className="border border-surface-border rounded-md p-lg bg-surface-secondary/50"
            >
              <h3 className="font-display text-lg font-bold text-text-primary mb-sm">
                {value.title}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
