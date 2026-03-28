export interface Testimonial {
  id: string
  quote: string
  clientName: string
  company: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    quote:
      'CLMC delivered our office renovation ahead of schedule and within budget. Their project management team maintained clear communication throughout the entire process. We were impressed by the quality of workmanship and attention to detail.',
    clientName: 'Maria Santos',
    company: 'Phirst Park Homes',
    role: 'Head of Facilities',
  },
  {
    id: 'testimonial-02',
    quote:
      'We engaged CLMC for a full fit-out of two floors in our BGC headquarters. The team handled every aspect — from MEP coordination to custom joinery — with professionalism and minimal disruption to ongoing operations.',
    clientName: 'Jonathan Cruz',
    company: 'Auctane Philippines',
    role: 'Operations Director',
  },
  {
    id: 'testimonial-03',
    quote:
      'CLMC\'s property management team is responsive, proactive, and knowledgeable. Maintenance issues are resolved promptly and our building compliance records are always in order. We trust them fully with our Ortigas assets.',
    clientName: 'Carmela Reyes',
    company: 'JG Summit Holdings',
    role: 'Asset Manager',
  },
  {
    id: 'testimonial-04',
    quote:
      'The HVAC installation CLMC completed for our commercial building was flawless. The commissioning process was thorough and the system has been running optimally since day one. Highly recommended for M&E works.',
    clientName: 'Roberto Aquino',
    company: 'Filinvest Land',
    role: 'VP of Engineering',
  },
  {
    id: 'testimonial-05',
    quote:
      'We have worked with CLMC on multiple residential fit-out projects across BGC and Makati. Their craftsmanship is consistently excellent and their site supervisors keep everything running on schedule. A reliable long-term partner.',
    clientName: 'Andrea Lim',
    company: 'Robinsons Land Corporation',
    role: 'Senior Project Manager',
  },
  {
    id: 'testimonial-06',
    quote:
      'CLMC managed the repair and waterproofing works on our commercial facade with expertise and minimal disruption to tenants. Their documentation and reporting standards meet our corporate governance requirements.',
    clientName: 'Eduardo Villanueva',
    company: 'Ayala Corporation',
    role: 'Director of Property Operations',
  },
]
