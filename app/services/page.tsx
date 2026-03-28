import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'
import { ServiceDetailSection } from '@/components/sections/ServiceDetailSection'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Full-service construction and property management in the Philippines — interior fit-outs, building maintenance, repair, and facilities management by CLMC.',
  openGraph: {
    ...sharedOG,
    title: 'Our Services',
    description: 'Full-service construction and property management in the Philippines by CLMC.',
    url: '/services',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <div>
      {/* Page hero */}
      <div className="pt-5xl pb-4xl px-md md:px-2xl bg-surface-secondary">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-xl">
            Our Services
          </h1>
          <p className="font-body text-lg text-text-secondary max-w-2xl leading-relaxed">
            From full-scope interior construction to long-term property management, CLMC
            delivers a comprehensive range of services that cover every stage of a building&apos;s
            lifecycle. Each service is backed by our experienced project management team and
            decades of hands-on expertise in the Philippine market.
          </p>
        </div>
      </div>

      <ServiceDetailSection />
    </div>
  )
}
