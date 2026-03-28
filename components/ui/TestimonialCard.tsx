// Server Component — pure display, no animation hooks needed (wrapper handles stagger)

interface TestimonialCardProps {
  quote: string
  clientName: string
  company: string
  role: string
  className?: string
}

export function TestimonialCard({
  quote,
  clientName,
  company,
  role,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={`border border-surface-border rounded-md p-lg bg-surface-secondary/50 flex flex-col${className ? ` ${className}` : ''}`}
    >
      {/* Opening quotation mark */}
      <div className="font-display text-4xl text-text-muted leading-none mb-sm" aria-hidden="true">
        &ldquo;
      </div>

      {/* Quote text */}
      <p className="font-body text-text-secondary text-sm leading-relaxed italic flex-1">
        {quote}
      </p>

      {/* Divider + attribution */}
      <div className="border-t border-surface-border mt-lg pt-md">
        <p className="font-display text-sm font-bold text-text-primary">{clientName}</p>
        <p className="font-body text-xs text-text-muted">
          {role}, {company}
        </p>
      </div>
    </article>
  )
}
