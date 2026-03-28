import { Building2, Home, Wrench, Hammer, KeyRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ServiceDetail {
  id: string
  icon: string
  title: string
  description: string
  scope: string[]
}

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    id: 'commercial-fitouts',
    icon: 'Building2',
    title: 'Commercial Fit-outs',
    description:
      'We deliver full-scope interior construction for offices, retail spaces, and commercial buildings across Metro Manila and surrounding provinces. From early-stage design coordination with architects and engineers to final turnover inspection, our team manages every phase with precision. We work across all major commercial property types — Grade A office towers, business parks, retail podiums, and institutional buildings. Our project management approach ensures zero-defect delivery on schedule and within the agreed contract sum.',
    scope: [
      'Office interior construction — partitioning, ceiling systems, raised flooring',
      'Retail and hospitality fit-outs — display fixtures, bespoke millwork, lighting design',
      'MEP coordination — electrical, data, plumbing, and HVAC rough-in and fit-out',
      'Custom reception, boardroom, and executive suite build-outs',
      'As-built documentation and post-turnover defects warranty management',
    ],
  },
  {
    id: 'residential-fitouts',
    icon: 'Home',
    title: 'Residential Fit-outs',
    description:
      'Our residential division transforms condominiums, townhouses, and private residences into refined living environments through precision craftsmanship and meticulous project management. We handle everything from complete gut renovations to bespoke interior installations for high-net-worth clients across BGC, Makati, Ortigas, and beyond. Every residential project is managed by a dedicated site supervisor with direct client access throughout construction. We coordinate with interior designers to protect design intent while maintaining strict build quality and timeline adherence.',
    scope: [
      'Full-unit renovation — demolition, structural modifications, and complete re-fit',
      'Custom kitchen cabinetry, wardrobes, and built-in storage joinery',
      'Bathroom retiling, waterproofing, and fixture installation',
      'Flooring — engineered timber, large-format tile, and polished concrete',
      'Smart home and AV pre-wire integration',
    ],
  },
  {
    id: 'maintenance',
    icon: 'Wrench',
    title: 'Maintenance',
    description:
      'CLMC provides structured preventive and corrective maintenance programs that extend the operational lifespan of building systems and protect asset value. Our maintenance teams are trained across HVAC, electrical, plumbing, and general building works, enabling us to provide single-contractor convenience for property owners and facility managers. We build detailed maintenance schedules calibrated to each property\'s equipment inventory and usage patterns. Rapid response protocols are in place for system failures that require immediate corrective action.',
    scope: [
      'HVAC preventive maintenance — filter replacement, coil cleaning, VRF health checks',
      'Electrical system inspections — panel checks, circuit testing, lighting maintenance',
      'Plumbing — leak detection, drain servicing, valve and fixture maintenance',
      'General civil maintenance — ceiling patch, painting, floor repair',
      'Monthly and annual maintenance reporting with photographic documentation',
    ],
  },
  {
    id: 'repair-services',
    icon: 'Hammer',
    title: 'Repair Services',
    description:
      'We provide responsive repair solutions for structural, mechanical, and finishing deficiencies in both commercial and residential properties. Our repair teams deploy quickly — typically within 24 to 48 hours of a service request — and carry the tools and materials to resolve most common building defects on the first visit. We handle repairs arising from natural wear, storm damage, contractor defects, and seismic events. All repair works are documented with before-and-after photography and carry a materials-and-workmanship warranty.',
    scope: [
      'Structural crack injection, spalling concrete repair, and waterproofing',
      'Façade repair — recaulking, sealant replacement, cladding re-fixings',
      'Ceiling and drywall repair following water ingress or mechanical damage',
      'Flooring repair — tile re-grouting, timber board replacement, vinyl patching',
      'Post-typhoon damage assessment and emergency remediation',
    ],
  },
  {
    id: 'property-management',
    icon: 'KeyRound',
    title: 'Property Management',
    description:
      'Our property management service delivers end-to-end oversight for commercial, mixed-use, and residential developments. We act as the single point of accountability for facility operations, maintenance scheduling, vendor coordination, and compliance — freeing property owners from day-to-day management burden. Our team brings deep knowledge of Philippine property regulations, BOMA standards, and tenant relations best practices. We produce monthly performance reports covering maintenance completion rates, cost summaries, and compliance status.',
    scope: [
      'Facility operations management — daily rounds, issue logging, and resolution tracking',
      'Preventive maintenance programme design and contractor coordination',
      'Tenant relations — move-in/move-out coordination, defect reporting, and escalation handling',
      'Regulatory compliance — fire safety, building permits, and government inspections',
      'Monthly financial and operational reporting to building owners',
    ],
  },
]

export const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Home,
  Wrench,
  Hammer,
  KeyRound,
}
