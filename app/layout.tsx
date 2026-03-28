import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://clmc.com.ph'),
  title: {
    template: '%s | CLMC',
    default: 'CLMC — C. Lacsamana Management and Construction Corporation',
  },
  description: 'Premier construction management and consultancy firm in the Philippines.',
  openGraph: {
    siteName: 'CLMC',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CLMC' }],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'C. Lacsamana Management and Construction Corporation',
  alternateName: 'CLMC',
  url: 'https://clmc.com.ph',
  logo: 'https://clmc.com.ph/og-image.jpg',
  description:
    'Construction management and consultancy firm providing fit-out, maintenance, repair, and property management services in the Philippines.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Metro Manila',
    addressCountry: 'PH',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Philippines',
  },
  founder: {
    '@type': 'Person',
    name: 'Christian Lacsamana',
    jobTitle: 'President & CEO',
  },
  sameAs: [
    'https://www.facebook.com/p/CLMC-100086052146644/',
    'https://www.linkedin.com/company/c-lacsamana-mgmt-consultancy-and-engineering-services-clmc',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:rounded-md focus-visible:bg-surface-primary focus-visible:px-md focus-visible:py-sm focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive-focus font-body text-sm"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
