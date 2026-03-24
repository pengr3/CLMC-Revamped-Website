import { cn } from '@/lib/utils'
import Image from 'next/image'
import { forwardRef } from 'react'

interface ProjectCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  category?: string
  href?: string
  priority?: boolean
  className?: string
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ imageSrc, imageAlt, title, category, href, priority = false, className }, ref) => {
    const content = (
      <>
        {/* Image with zoom on hover */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover motion-safe:transition-transform motion-safe:duration-250 motion-safe:ease-out motion-safe:group-hover:scale-[1.05]"
        />

        {/* Dark gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-t from-black/80 via-black/30 to-transparent',
            'opacity-0 motion-safe:transition-opacity motion-safe:duration-250 motion-safe:ease-out',
            'group-hover:opacity-100',
          )}
          aria-hidden="true"
        />

        {/* Title + category reveal on hover */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-lg',
            'translate-y-3 opacity-0',
            'motion-safe:transition-all motion-safe:duration-250 motion-safe:ease-out',
            'group-hover:translate-y-0 group-hover:opacity-100',
          )}
        >
          {category && (
            <p className="text-text-muted text-[12px] font-body font-bold uppercase tracking-[0.08em] mb-xs">
              {category}
            </p>
          )}
          <h3 className="text-text-primary font-display font-bold text-[18px] leading-[1.3]">
            {title}
          </h3>
        </div>
      </>
    )

    const sharedClassName = cn(
      'group relative block overflow-hidden rounded-md',
      'aspect-[4/3]',
      'cursor-pointer',
      className,
    )

    if (href) {
      return (
        <a href={href} className={sharedClassName}>
          {content}
        </a>
      )
    }

    return (
      <div ref={ref} className={sharedClassName}>
        {content}
      </div>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'

export { ProjectCard }
export type { ProjectCardProps }
