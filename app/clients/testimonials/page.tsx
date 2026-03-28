import Link from 'next/link'
import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'
import { TestimonialsGridSection } from '@/components/sections/TestimonialsGridSection'

export const metadata: Metadata = {
  title: 'Client Testimonials',
  description:
    'Read what clients say about working with CLMC — testimonials from partners across commercial, residential, and government construction projects.',
  openGraph: {
    ...sharedOG,
    title: 'Client Testimonials',
    description: 'What clients say about CLMC construction management.',
    url: '/clients/testimonials',
    type: 'website',
  },
}

export default function TestimonialsPage() {
  return (
    <main className="bg-surface-primary min-h-screen">
      {/* Breadcrumb */}
      <section className="pt-5xl pb-0 px-md md:px-2xl">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-sm text-text-muted mb-2xl">
            <Link
              href="/clients"
              className="hover:text-text-secondary transition-colors duration-200"
            >
              Our Clients
            </Link>
            {' / '}
            <span className="text-text-secondary">Testimonials</span>
          </p>
        </div>
      </section>

      {/* Hero */}
      <section className="pb-3xl px-md md:px-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-md">
            Client Testimonials
          </h1>
          <p className="font-body text-text-secondary text-lg max-w-2xl leading-relaxed">
            Our clients speak to the quality of our work, the reliability of our teams, and the
            results we deliver on every project across the Philippines.
          </p>
        </div>
      </section>

      {/* Testimonials grid */}
      <TestimonialsGridSection />
    </main>
  )
}
