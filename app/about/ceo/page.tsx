import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'

export const metadata: Metadata = {
  title: 'About the CEO',
  description:
    'Meet Christian Lacsamana, President and CEO of CLMC — leading construction management excellence in the Philippines.',
  openGraph: {
    ...sharedOG,
    title: 'About the CEO',
    description: 'Christian Lacsamana, President and CEO of CLMC.',
    url: '/about/ceo',
    type: 'website',
  },
}

export default function AboutCEOPage() {
  return (
    <div className="bg-surface-primary">
      <div className="pt-5xl pb-4xl px-md md:px-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl items-start">
            {/* Portrait placeholder */}
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-md overflow-hidden bg-surface-secondary flex items-center justify-center">
              <span className="font-body text-sm text-text-muted">Portrait Photo</span>
            </div>

            {/* Bio content */}
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-sm">
                [CEO Name]
              </h1>
              <p className="font-body text-lg text-text-secondary mb-3xl">
                President &amp; CEO
              </p>

              <div className="space-y-xl">
                <p className="font-body text-lg text-text-secondary leading-relaxed">
                  [CEO Name] founded C. Lacsamana Management and Construction Corporation in
                  1995 with a clear conviction: that the Philippines deserved a construction
                  partner that combined international-grade precision with deep local expertise.
                  Over three decades, that conviction has shaped every project the company has
                  delivered.
                </p>
                <p className="font-body text-lg text-text-secondary leading-relaxed">
                  Under [his/her] leadership, CLMC has grown from a small fit-out contractor into
                  a full-service construction and property management firm with an extensive portfolio
                  spanning Metro Manila and the surrounding provinces. [He/She] is directly involved
                  in client relationships and quality assurance at the senior project level — a
                  commitment to hands-on leadership that distinguishes CLMC from larger, more
                  bureaucratic competitors.
                </p>
                <p className="font-body text-lg text-text-secondary leading-relaxed">
                  [CEO Name] holds a degree in [Field] from [University] and is an active member
                  of the Philippine Contractors Accreditation Board. [He/She] believes that the
                  highest-quality built environments are the product of trust between client and
                  contractor — and that trust is earned one project at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
