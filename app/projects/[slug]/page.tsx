import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects, BLUR_DATA_URL } from '@/data/projects'
import { buttonVariants } from '@/components/ui/Button'
import { sharedOG } from '@/app/shared-metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) return {}

  return {
    title: project.title,
    description: `${project.title} — ${project.category} project by CLMC in the Philippines.`,
    openGraph: {
      ...sharedOG,
      title: project.title,
      description: `${project.title} — ${project.category} project by CLMC.`,
      url: `/projects/${slug}`,
      images: [{ url: project.imageSrc, width: 1200, height: 630, alt: project.imageAlt }],
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }))
}

export const dynamicParams = false

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) notFound()

  return (
    <main className="min-h-screen bg-surface-primary">
      {/* Hero — 60vh full-width cinematic image */}
      <div className="max-h-[60vh] h-[60vh] relative w-full">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        {/* Subtle bottom gradient so page content blends in */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-primary"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-md md:px-2xl py-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4xl">

          {/* Main column */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-lg">
              {project.title}
            </h1>
            <p className="text-text-secondary font-body text-base leading-relaxed mb-3xl">
              {project.description}
            </p>

            {/* Additional images grid */}
            {project.additionalImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                {project.additionalImages.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3]">
                    <Image
                      src={src}
                      alt={`${project.title} - image ${i + 2}`}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[96px] self-start">
            {/* Category badge */}
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-text-muted mb-sm">
              {project.category}
            </p>

            {/* Meta (area / size) */}
            {project.meta && (
              <p className="text-text-secondary font-body text-sm mb-lg">
                {project.meta}
              </p>
            )}

            <hr className="border-surface-border mb-lg" />

            {/* Scope */}
            <h2 className="font-display text-lg font-bold text-text-primary mb-sm">
              Scope
            </h2>
            <p className="text-text-secondary font-body text-sm mb-3xl leading-relaxed">
              Full-service {project.category.toLowerCase()} project
            </p>

            {/* Back to gallery */}
            <Link href="/projects" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
              &#8592;&nbsp;All Projects
            </Link>
          </aside>

        </div>
      </div>
    </main>
  )
}
