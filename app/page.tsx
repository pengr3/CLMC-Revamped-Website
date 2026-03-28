import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'
import { HeroSection } from '@/components/sections/HeroSection'

export const metadata: Metadata = {
  title: { absolute: 'CLMC — Premier Construction & Management in the Philippines' },
  description:
    'C. Lacsamana Management and Construction Corporation delivers world-class construction management, interior fit-outs, and property services across the Philippines.',
  openGraph: {
    ...sharedOG,
    title: 'CLMC — Premier Construction & Management in the Philippines',
    description:
      'World-class construction management, interior fit-outs, and property services across the Philippines.',
    url: '/',
    type: 'website',
  },
}

import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { InquiryCTASection } from '@/components/sections/InquiryCTASection'

export default function HomePage() {
  return (
    <>
      {/* D-29: Section order — Hero → Featured Projects → Services → Stats → Client Logos → Inquiry CTA */}
      <HeroSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      <StatsSection />
      <ClientLogosSection />
      <InquiryCTASection />
    </>
  )
}
