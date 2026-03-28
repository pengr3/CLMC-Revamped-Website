'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects, ALL_CATEGORIES, type ProjectCategory } from '@/data/projects'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { cn } from '@/lib/utils'

type FilterValue = ProjectCategory | 'All'

export function ProjectsGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useFadeUp(sectionRef)

  const [active, setActive] = useState<FilterValue>('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  const filterOptions: FilterValue[] = ['All', ...ALL_CATEGORIES]

  return (
    <div ref={sectionRef}>
      {/* Page heading */}
      <div className="mb-3xl" data-fade-up>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-md">
          Our Projects
        </h1>
        <p className="text-text-secondary font-body text-lg max-w-2xl">
          Browse our portfolio of commercial fit-outs, residential renovations, and facility
          management projects across the Philippines.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-sm mb-3xl">
        {filterOptions.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-md py-sm text-[13px] font-body font-bold uppercase tracking-[0.06em] rounded-full border transition-all duration-150 ease-out',
              active === cat
                ? 'bg-text-primary text-surface-primary border-text-primary'
                : 'bg-transparent text-text-secondary border-surface-border hover:border-text-secondary hover:text-text-primary',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-lg">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="break-inside-avoid mb-lg"
            >
              <ProjectCard
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                category={project.category}
                meta={project.meta}
                href={`/projects/${project.id}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
