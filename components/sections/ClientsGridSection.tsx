'use client'

import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'
import { CLIENTS } from '@/data/clients'

export function ClientsGridSection() {
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
          Our Clients
        </h2>
        <div
          data-stagger
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.id}
              data-stagger-child
              className="flex flex-col items-center gap-sm p-lg border border-surface-border rounded-md bg-surface-secondary/50"
            >
              {/* Logo placeholder — user will replace with real assets later */}
              <div className="h-12 w-32 flex items-center justify-center">
                <div className="h-8 w-24 rounded bg-surface-tertiary" />
              </div>
              <p className="font-body text-sm text-text-secondary text-center">{client.name}</p>
              {client.industry && (
                <p className="font-body text-xs text-text-muted text-center">{client.industry}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
