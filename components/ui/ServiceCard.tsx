import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  className?: string
}

function ServiceCard({ icon: Icon, title, description, href = '/services', className }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block rounded-md border border-surface-border p-lg',
        'bg-surface-secondary/50',
        'transition-colors duration-150 hover:bg-surface-secondary hover:border-white/15',
        className,
      )}
    >
      <Icon
        className="h-8 w-8 text-text-secondary mb-md stroke-[1.5] transition-colors duration-150 group-hover:text-text-primary"
        aria-hidden="true"
      />
      <h3 className="font-display text-lg font-bold text-text-primary mb-sm">
        {title}
      </h3>
      <p className="text-text-secondary text-sm font-body leading-relaxed">
        {description}
      </p>
    </Link>
  )
}

export { ServiceCard }
export type { ServiceCardProps }
