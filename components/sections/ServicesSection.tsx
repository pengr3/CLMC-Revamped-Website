'use client'

import { useRef } from 'react'
import { useStagger } from '@/components/animation/useStagger'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { Building2, Home, Wrench, Hammer, KeyRound } from 'lucide-react'

const SERVICES = [
  {
    id: 'commercial-fitouts',
    icon: Building2,
    title: 'Commercial Fit-outs',
    description:
      'Full-scope interior construction for offices, retail spaces, and commercial buildings — from design coordination to turnover.',
  },
  {
    id: 'residential-fitouts',
    icon: Home,
    title: 'Residential Fit-outs',
    description:
      'Custom residential renovations and interior build-outs that transform living spaces with precision craftsmanship.',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance',
    description:
      'Preventive and corrective maintenance programs for HVAC, electrical, plumbing, and building systems.',
  },
  {
    id: 'repair-services',
    icon: Hammer,
    title: 'Repair Services',
    description:
      'Responsive repair solutions for structural, mechanical, and finishing deficiencies in commercial and residential properties.',
  },
  {
    id: 'property-management',
    icon: KeyRound,
    title: 'Property Management',
    description:
      'End-to-end property oversight including tenant coordination, facility operations, and long-term asset preservation.',
  },
]

export function ServicesSection() {
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
          Our Services
        </h2>
        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
        >
          {SERVICES.map((service) => (
            <div key={service.id} data-stagger-child>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
