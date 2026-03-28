export interface Project {
  id: string
  title: string
  category: ProjectCategory
  meta?: string
  description: string
  imageSrc: string
  imageAlt: string
  additionalImages: string[]
  featured: boolean
}

export type ProjectCategory =
  | 'Commercial Fit-outs'
  | 'Residential Fit-outs'
  | 'Maintenance'
  | 'Repair Services'
  | 'Property Management'

export const ALL_CATEGORIES: ProjectCategory[] = [
  'Commercial Fit-outs',
  'Residential Fit-outs',
  'Maintenance',
  'Repair Services',
  'Property Management',
]

export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export const projects: Project[] = [
  {
    id: 'auctane',
    title: 'AUCTANE 7 and 8 Floor',
    category: 'Commercial Fit-outs',
    meta: '4,800 sqm',
    description:
      'Complete fit-out of the 7th and 8th floors for Auctane, a global e-commerce logistics company. The scope included open-plan workstations, executive suites, conference rooms, and break-out areas finished to international corporate standards.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'AUCTANE 7 and 8 Floor commercial fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: true,
  },
  {
    id: 'phirst-park',
    title: 'Phirst Park Homes Head Office',
    category: 'Commercial Fit-outs',
    meta: '3,500 sqm',
    description:
      'Full interior fit-out of Phirst Park Homes\' flagship head office. Works covered ceiling systems, raised flooring, MEP coordination, custom millwork, and furniture installation across multiple departments.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'Phirst Park Homes Head Office commercial fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: true,
  },
  {
    id: 'greenroom',
    title: 'GREENROOM STUDIO',
    category: 'Commercial Fit-outs',
    meta: '1,000 sqm',
    description:
      'Design-build fit-out of a creative studio environment for GREENROOM. The project featured exposed structural elements, custom acoustic panels, flexible event space, and a curated material palette emphasizing natural textures.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'GREENROOM STUDIO commercial fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: true,
  },
  {
    id: 'pluxee',
    title: 'Pluxee Office, Lepanto Building Makati',
    category: 'Commercial Fit-outs',
    meta: '500 sqm',
    description:
      'Turnkey office fit-out for Pluxee (formerly Sodexo Benefits) at Lepanto Building, Makati CBD. Deliverables included partitioning, ceiling works, electrical, data, air-conditioning, and custom reception area joinery.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'Pluxee Office Lepanto Building Makati commercial fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: true,
  },
  {
    id: 'chiropractic',
    title: 'Chiropractic First Fitout',
    category: 'Commercial Fit-outs',
    meta: undefined,
    description:
      'Specialist clinical fit-out for Chiropractic First, a leading wellness and chiropractic care clinic. The scope included treatment room partitioning, medical-grade flooring, reception millwork, and full MEP installation.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'Chiropractic First commercial fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: true,
  },
  {
    id: 'hvac',
    title: 'HVAC Installation 50HP VRF System',
    category: 'Maintenance',
    meta: undefined,
    description:
      'Supply and installation of a 50HP Variable Refrigerant Flow (VRF) HVAC system for a multi-tenant commercial building. Works included equipment mounting, refrigerant piping, ductwork, controls wiring, and system commissioning.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'HVAC Installation 50HP VRF System maintenance project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: true,
  },
  {
    id: 'bgc-residential',
    title: 'BGC Residential Tower Unit Renovation',
    category: 'Residential Fit-outs',
    meta: '200 sqm',
    description:
      'Full renovation of a high-end residential unit in Bonifacio Global City. The project encompassed custom kitchen cabinetry, bathroom retiling, built-in wardrobe joinery, and smart home integration throughout.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'BGC Residential Tower Unit Renovation residential fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: false,
  },
  {
    id: 'makati-condo',
    title: 'Makati Condominium Interior Fit-out',
    category: 'Residential Fit-outs',
    meta: '150 sqm',
    description:
      'Interior fit-out of a contemporary condominium unit in Makati City. Scope of works included flooring installation, custom millwork, lighting design, and full MEP fit-out to deliver a move-in-ready premium residence.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'Makati Condominium Interior Fit-out residential fit-out project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: false,
  },
  {
    id: 'building-facade',
    title: 'Commercial Building Facade Repair',
    category: 'Repair Services',
    meta: undefined,
    description:
      'Structural and cosmetic repair of a commercial building facade, including waterproofing of expansion joints, recaulking of curtain wall perimeter seals, and repainting of the external envelope to restore weather-tightness.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'Commercial Building Facade Repair repair services project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: false,
  },
  {
    id: 'property-mgmt-ortigas',
    title: 'Ortigas Center Property Management',
    category: 'Property Management',
    meta: undefined,
    description:
      'Ongoing integrated property management services for a mixed-use tower in Ortigas Center. Services include routine maintenance scheduling, contractor coordination, compliance monitoring, and tenant relations support.',
    imageSrc: '/images/project-placeholder.jpg',
    imageAlt: 'Ortigas Center Property Management property management project',
    additionalImages: [
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
      '/images/project-placeholder.jpg',
    ],
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
