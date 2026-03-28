'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` when the referenced element
 * scrolls into view. Fires once (no re-animation on scroll back).
 * Respects prefers-reduced-motion by showing the final number instantly.
 *
 * @param target - The final number to count up to
 * @param duration - Animation duration in ms (default 2000)
 * @returns { count, ref } - Current animated value and ref to attach to the DOM element
 */
export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // IntersectionObserver — trigger count when element enters viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  // rAF animation — cubic ease-out
  useEffect(() => {
    if (!started) return

    // Respect prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setCount(target)
      return
    }

    let startTime: number | null = null
    let rafId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Cubic ease-out: decelerating to final number
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setCount(target) // Ensure exact final value
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [started, target, duration])

  return { count, ref }
}
