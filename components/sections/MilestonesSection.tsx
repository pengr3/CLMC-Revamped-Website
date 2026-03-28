'use client'

import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'
import { MILESTONES } from '@/data/about'

export function MilestonesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useFadeUp(sectionRef)
  useStagger(sectionRef)

  return (
    <section ref={sectionRef} className="py-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <h2
          data-fade-up
          className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3xl"
        >
          Our Journey
        </h2>
        <div data-stagger className="border-l-2 border-surface-border pl-xl space-y-2xl">
          {MILESTONES.map((milestone) => (
            <div key={milestone.year} data-stagger-child className="relative">
              {/* Timeline dot */}
              <div
                className="absolute -left-[calc(var(--spacing-xl)+5px)] top-1 h-2.5 w-2.5 rounded-full bg-surface-border"
                aria-hidden="true"
              />
              <span className="font-display text-sm font-bold text-text-muted block mb-xs tracking-widest uppercase">
                {milestone.year}
              </span>
              <p className="font-body text-text-secondary leading-relaxed">
                {milestone.event}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
