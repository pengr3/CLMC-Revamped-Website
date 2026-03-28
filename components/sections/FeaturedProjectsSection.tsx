'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useStagger } from '@/components/animation/useStagger'
import { useFadeUp } from '@/components/animation/useFadeUp'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { featuredProjects } from '@/data/projects'

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useFadeUp(sectionRef)
  useStagger(sectionRef)

  return (
    <section ref={sectionRef} className="py-4xl px-md md:px-2xl bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        {/* D-12: Heading left, "View All" link right */}
        <div className="flex items-baseline justify-between mb-3xl" data-fade-up>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-text-secondary text-sm font-body hover:text-text-primary transition-colors duration-150"
          >
            View All &rarr;
          </Link>
        </div>

        {/* D-10: 3-col grid on desktop (lg), 2-col on tablet (md), 1-col on mobile */}
        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
        >
          {featuredProjects.map((project) => (
            <div key={project.id} data-stagger-child>
              <ProjectCard
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                category={project.category}
                meta={project.meta}
                href={`/projects/${project.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
