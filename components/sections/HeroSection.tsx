'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useHeroParallax } from '@/components/animation/useHeroParallax'
import { buttonVariants } from '@/components/ui/Button'
import { BLUR_DATA_URL } from '@/data/projects'

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useHeroParallax(heroRef, bgRef, textRef)

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background image layer — scale-110 allows parallax room */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-placeholder.jpg"
          alt="CLMC completed construction project — modern commercial building"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
          sizes="100vw"
        />
        {/* D-04: Dark gradient overlay — bottom ~50% dark, top stays vivid */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/50 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* D-01: Center-aligned text content layer */}
      <div
        ref={textRef}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-md"
      >
        {/* D-07: Placeholder headline in CLMC brand voice */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary max-w-4xl leading-tight">
          Building the Philippines Forward
        </h1>
        {/* D-05: CTA links to /contact — D-08: no sub-tagline */}
        <Link
          href="/contact"
          className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' mt-xl'}
        >
          Request for Inspection
        </Link>
      </div>
    </section>
  )
}
