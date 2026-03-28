// Server Component — pure CSS marquee, no JS needed (D-24)

// Placeholder logo data — user will provide real logos later (D-26)
const PLACEHOLDER_LOGOS = Array.from({ length: 8 }, (_, i) => ({
  id: `logo-${i + 1}`,
  name: `Client ${i + 1}`,
}))

export function ClientLogosSection() {
  return (
    <section className="py-3xl bg-surface-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-md md:px-2xl mb-xl">
        <p className="text-text-muted text-sm font-body uppercase tracking-wider text-center">
          Trusted by Leading Organizations
        </p>
      </div>
      {/* D-24: CSS-only auto-scrolling horizontal marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges for polished look */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface-primary to-transparent z-10" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-primary to-transparent z-10" aria-hidden="true" />
        {/* Track: two identical sets for seamless loop */}
        <div className="flex w-max animate-marquee gap-3xl">
          {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex items-center justify-center h-12 w-32 shrink-0"
            >
              {/* D-25: Full color logos — placeholder blocks for now (D-26) */}
              <div className="h-8 w-24 rounded bg-surface-tertiary flex items-center justify-center">
                <span className="text-text-muted text-xs font-body">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
