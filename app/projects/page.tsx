import { ProjectsGallery } from '@/components/sections/ProjectsGallery'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-surface-primary">
      <section className="py-4xl px-md md:px-2xl">
        <div className="max-w-7xl mx-auto">
          <ProjectsGallery />
        </div>
      </section>
    </main>
  )
}
