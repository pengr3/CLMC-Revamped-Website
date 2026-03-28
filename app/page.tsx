import { HeroSection } from '@/components/sections/HeroSection'
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
