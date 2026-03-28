import Link from 'next/link'
import type { Metadata } from 'next'
import { ClientsGridSection } from '@/components/sections/ClientsGridSection'

export const metadata: Metadata = {
  title: 'Our Clients | CLMC',
  description:
    'CLMC serves leading Philippine organizations across commercial, residential, and government sectors. Explore our trusted client partnerships.',
}

export default function ClientsPage() {
  return (
    <main className="bg-surface-primary min-h-screen">
      {/* Hero */}
      <section className="pt-5xl pb-3xl px-md md:px-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-md">
            Our Clients
          </h1>
          <p className="font-body text-text-secondary text-lg max-w-2xl leading-relaxed">
            Trusted by leading Philippine corporations, government agencies, and developers —
            CLMC brings precision and professionalism to every project we undertake.
          </p>
        </div>
      </section>

      {/* Clients grid */}
      <ClientsGridSection />

      {/* CTA to testimonials */}
      <section className="py-3xl px-md md:px-2xl">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/clients/testimonials"
            className="font-body text-text-secondary hover:text-interactive-hover underline underline-offset-4 transition-colors duration-200"
          >
            Read what our clients say about working with us
          </Link>
        </div>
      </section>
    </main>
  )
}
