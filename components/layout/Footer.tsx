import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
] as const

export function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-surface-border">
      <div className="mx-auto max-w-7xl px-lg py-2xl md:py-3xl">
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 xl:grid-cols-3">
          {/* Column 1: Logo + tagline + copyright */}
          <div>
            <Link
              href="/"
              className="font-display text-[20px] font-bold tracking-[-0.02em] text-text-primary"
            >
              CLMC
            </Link>
            <p className="mt-md text-[14px] text-text-secondary">
              Building the Philippines Forward
            </p>
            <p className="mt-lg text-[14px] text-text-muted">
              &copy; 2024 C. Lacsamana Management and Construction Corporation. All rights reserved.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-[14px] font-bold text-text-primary">Navigation</h3>
            <nav aria-label="Footer navigation" className="mt-md flex flex-col gap-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[14px] text-text-secondary motion-safe:transition-colors motion-safe:duration-150 hover:text-interactive-hover"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h3 className="text-[14px] font-bold text-text-primary">Contact</h3>
            <div className="mt-md flex flex-col gap-sm">
              <a
                href="tel:+63XXXXXXXXXX"
                className="text-[14px] text-text-secondary motion-safe:transition-colors motion-safe:duration-150 hover:text-interactive-hover"
              >
                +63 (XX) XXX-XXXX
              </a>
              <a
                href="mailto:info@clmc.ph"
                className="text-[14px] text-text-secondary motion-safe:transition-colors motion-safe:duration-150 hover:text-interactive-hover"
              >
                info@clmc.ph
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
