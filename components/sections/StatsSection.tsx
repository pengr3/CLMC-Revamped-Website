'use client'

import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { id: 'years', target: 25, suffix: '+', label: 'Years Experience', duration: 1800 },
  { id: 'projects', target: 100, suffix: '+', label: 'Projects Completed', duration: 2200 },
  { id: 'clients', target: 500, suffix: '+', label: 'Clients Served', duration: 2200 },
]

function StatItem({
  target,
  suffix,
  label,
  duration,
}: {
  target: number
  suffix: string
  label: string
  duration: number
}) {
  const { count, ref } = useCountUp(target, duration)

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref}
        className="font-display text-5xl md:text-6xl font-bold text-text-primary tabular-nums"
      >
        {count}
        {suffix}
      </span>
      <span className="text-text-secondary font-body text-sm mt-sm uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-4xl px-md md:px-2xl bg-surface-secondary">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3xl">
        {STATS.map((stat) => (
          <StatItem
            key={stat.id}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            duration={stat.duration}
          />
        ))}
      </div>
    </section>
  )
}
