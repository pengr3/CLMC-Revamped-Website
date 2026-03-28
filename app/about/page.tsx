import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'
import Link from 'next/link'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { MilestonesSection } from '@/components/sections/MilestonesSection'
import { ValuesSection } from '@/components/sections/ValuesSection'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about CLMC — C. Lacsamana Management and Construction Corporation, a premier construction management and consultancy firm in the Philippines.',
  openGraph: {
    ...sharedOG,
    title: 'About Us',
    description: 'CLMC — Premier construction management and consultancy firm in the Philippines.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div>
      <AboutHeroSection />

      {/* Mission statement */}
      <div className="py-4xl px-md md:px-2xl bg-surface-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-xl">
            Our Mission
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed">
            To deliver construction and management services of exceptional quality that create
            lasting value for our clients, their tenants, and the communities they serve. We
            commit to precision in every project, integrity in every engagement, and continuous
            improvement in every process — so that every building we touch reflects the best of
            Philippine craftsmanship.
          </p>
        </div>
      </div>

      <MilestonesSection />
      <ValuesSection />

      {/* Link to CEO page */}
      <div className="py-3xl px-md md:px-2xl bg-surface-primary text-center">
        <Link
          href="/about/ceo"
          className="inline-block font-body text-text-secondary hover:text-text-primary transition-colors duration-150 text-lg"
        >
          Meet Our CEO &rarr;
        </Link>
      </div>
    </div>
  )
}
