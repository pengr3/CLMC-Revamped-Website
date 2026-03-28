import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'
import { ProjectsGallery } from '@/components/sections/ProjectsGallery'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse the CLMC project portfolio — commercial fit-outs, residential builds, government facilities, and infrastructure across the Philippines.',
  openGraph: {
    ...sharedOG,
    title: 'Projects',
    description: 'CLMC project portfolio across the Philippines.',
    url: '/projects',
    type: 'website',
  },
}


export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-surface-primary">
      <section className="py-4xl px-md md:px-2xl">
        <div className="max-w-7xl mx-auto">
          <ProjectsGallery />
        </div>
      </section>
    </div>
  )
}
