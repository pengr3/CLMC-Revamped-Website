// Server Component — static content, no JS needed
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'

export function InquiryCTASection() {
  return (
    <section className="py-5xl px-md md:px-2xl bg-surface-secondary">
      <div className="max-w-3xl mx-auto text-center">
        {/* D-27: Bold headline + supporting line */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-md">
          Ready to Build?
        </h2>
        <p className="text-text-secondary font-body text-lg mb-xl max-w-xl mx-auto">
          Let&apos;s discuss your next project. Our team is ready to deliver
          world-class construction and management solutions.
        </p>
        {/* D-28: CTA links to /contact */}
        <Link
          href="/contact"
          className={buttonVariants({ variant: 'primary', size: 'lg' })}
        >
          Request for Inspection
        </Link>
      </div>
    </section>
  )
}
