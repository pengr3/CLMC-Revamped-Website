import { ContactFormSection } from '@/components/sections/ContactFormSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | CLMC',
  description:
    'Get in touch with CLMC — C. Lacsamana Management and Construction Corporation. Submit an inquiry or request a project consultation.',
}

export default function ContactPage() {
  return (
    <main className="bg-surface-primary">
      <div className="mx-auto max-w-7xl px-md md:px-2xl pt-5xl pb-4xl">
        <div className="grid grid-cols-1 gap-3xl lg:grid-cols-2">
          {/* Left column: Form */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-md">
              Get in Touch
            </h1>
            <p className="font-body text-text-secondary mb-xl">
              Have a project in mind? We&apos;d love to hear from you.
            </p>
            <ContactFormSection />
          </div>

          {/* Right column: Contact Info Card */}
          <div>
            <div className="sticky top-[120px] border border-surface-border rounded-md p-xl bg-surface-secondary/50">
              <h2 className="font-display text-lg font-bold text-text-primary mb-lg">
                Contact Information
              </h2>

              {/* Phone */}
              <div className="mb-lg">
                <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-xs">
                  Phone
                </p>
                <a
                  href="tel:+63XXXXXXXXXX"
                  className="font-body text-text-secondary hover:text-interactive-hover transition-colors"
                >
                  +63 (XX) XXX-XXXX
                </a>
              </div>

              {/* Email */}
              <div className="mb-lg">
                <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-xs">
                  Email
                </p>
                <a
                  href="mailto:info@clmc.ph"
                  className="font-body text-text-secondary hover:text-interactive-hover transition-colors"
                >
                  info@clmc.ph
                </a>
              </div>

              {/* Office */}
              <div className="mb-lg">
                <p className="font-body text-xs text-text-muted uppercase tracking-wider mb-xs">
                  Office
                </p>
                <p className="font-body text-text-secondary">
                  [Placeholder Address], Metro Manila, Philippines
                </p>
              </div>

              {/* Map placeholder */}
              <div className="h-48 rounded-md bg-surface-tertiary flex items-center justify-center">
                <span className="text-text-muted text-sm">Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
