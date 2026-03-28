'use client'

import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'
import { SERVICES_DETAIL, ICON_MAP } from '@/data/services'

export function ServiceDetailSection() {
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
          What We Do
        </h2>
        <div data-stagger>
          {SERVICES_DETAIL.map((service, index) => {
            const Icon = ICON_MAP[service.icon]
            const isLast = index === SERVICES_DETAIL.length - 1
            return (
              <div
                key={service.id}
                data-stagger-child
                className={`py-xl ${isLast ? '' : 'border-b border-surface-border'}`}
              >
                <div className="flex items-start gap-lg mb-lg">
                  {Icon && (
                    <Icon
                      className="h-10 w-10 text-text-secondary shrink-0 mt-1 stroke-[1.5]"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="font-display text-2xl font-bold text-text-primary">
                    {service.title}
                  </h3>
                </div>
                <p className="font-body text-text-secondary leading-relaxed mb-lg max-w-3xl">
                  {service.description}
                </p>
                <ul className="space-y-sm pl-md">
                  {service.scope.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm text-text-secondary leading-relaxed list-disc"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
