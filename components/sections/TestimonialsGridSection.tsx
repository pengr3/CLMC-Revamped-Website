'use client'

import { useRef } from 'react'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { useStagger } from '@/components/animation/useStagger'
import { testimonials } from '@/data/testimonials'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

export function TestimonialsGridSection() {
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
          What Our Clients Say
        </h2>
        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 gap-lg"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} data-stagger-child>
              <TestimonialCard
                quote={testimonial.quote}
                clientName={testimonial.clientName}
                company={testimonial.company}
                role={testimonial.role}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
