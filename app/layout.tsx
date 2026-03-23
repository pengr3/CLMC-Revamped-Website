import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import './globals.css'

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
  title: 'CLMC — C. Lacsamana Management and Construction Corporation',
  description: 'Premier construction management and consultancy firm in the Philippines.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
