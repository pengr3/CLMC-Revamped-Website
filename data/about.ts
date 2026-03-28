export interface Milestone {
  year: string
  event: string
}

export const MILESTONES: Milestone[] = [
  {
    year: '1995',
    event:
      'C. Lacsamana Management and Construction Corporation founded in Metro Manila, Philippines.',
  },
  {
    year: '2000',
    event:
      'Expanded service offerings to include full-scope commercial fit-out services for corporate clients.',
  },
  {
    year: '2005',
    event:
      'Completed first major landmark project in Makati CBD, establishing CLMC as a trusted name in commercial construction.',
  },
  {
    year: '2010',
    event:
      'Launched dedicated property management division, providing integrated facility oversight for mixed-use developments.',
  },
  {
    year: '2015',
    event:
      'Reached milestone of 100 completed projects across Metro Manila, Laguna, and Cavite.',
  },
  {
    year: '2020',
    event:
      'Strengthened HVAC and MEP capabilities with specialist engineering team, supporting large-scale system installations.',
  },
]

export interface Value {
  title: string
  description: string
}

export const VALUES: Value[] = [
  {
    title: 'Excellence',
    description:
      'We hold every project to the highest standard of craftsmanship and finish quality — from the structural shell to the last millimeter of millwork.',
  },
  {
    title: 'Integrity',
    description:
      'We communicate transparently with clients at every phase, delivering what we promise on scope, schedule, and budget.',
  },
  {
    title: 'Innovation',
    description:
      'We continuously adopt new construction methods, materials, and technologies to deliver better outcomes and reduce project timelines.',
  },
  {
    title: 'Client-First',
    description:
      'Every decision we make is filtered through one question: does this serve the client\'s best interest? Our long-term relationships are built on this principle.',
  },
]
