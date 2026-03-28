import type { Metadata } from 'next'
import { sharedOG } from '@/app/shared-metadata'

export const metadata: Metadata = {
  title: 'Quality Management System',
  description:
    "CLMC quality management system policy — our commitment to excellence in construction management, safety, and continuous improvement.",
  openGraph: {
    ...sharedOG,
    title: 'Quality Management System',
    description: 'CLMC quality management system policy and standards.',
    url: '/qms',
    type: 'website',
  },
}

export default function QMSPage() {
  return (
    <div className="bg-surface-primary min-h-screen">
      <div className="pt-5xl pb-4xl px-md md:px-2xl max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3xl">
          Quality Management System Policy
        </h1>

        {/* Section 1: Quality Policy Statement */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mt-2xl mb-md">
            1. Quality Policy Statement
          </h2>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            C. Lacsamana Management and Construction Corporation (CLMC) is committed to delivering
            construction, fit-out, maintenance, and property management services that consistently
            meet and exceed the requirements of our clients and applicable regulatory standards. Our
            quality policy forms the foundation of every project we undertake.
          </p>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            We achieve this through a culture of accountability, skilled workmanship, disciplined
            project management, and a continuous drive to improve our processes, systems, and
            people. Every member of the CLMC team is personally responsible for the quality of
            their work.
          </p>
        </section>

        {/* Section 2: Scope */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mt-2xl mb-md">
            2. Scope
          </h2>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            This Quality Management System Policy applies to all operations conducted by CLMC,
            encompassing the following service lines:
          </p>
          <ol className="list-decimal pl-lg font-body text-text-secondary leading-relaxed">
            <li className="mb-sm">
              Commercial and residential interior fit-out design and construction
            </li>
            <li className="mb-sm">
              Building maintenance services including HVAC, electrical, and plumbing systems
            </li>
            <li className="mb-sm">
              Structural and finishing repair services for commercial and residential properties
            </li>
            <li className="mb-sm">
              Integrated property management and facilities operations
            </li>
          </ol>
        </section>

        {/* Section 3: Quality Objectives */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mt-2xl mb-md">
            3. Quality Objectives
          </h2>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            In support of this policy, CLMC has established the following measurable quality
            objectives:
          </p>
          <ol className="list-decimal pl-lg font-body text-text-secondary leading-relaxed">
            <li className="mb-sm">
              Achieve a client satisfaction rating of 90% or above on all completed projects as
              measured by post-project evaluations
            </li>
            <li className="mb-sm">
              Deliver 95% of projects on schedule and within the approved contract budget
            </li>
            <li className="mb-sm">
              Maintain zero major non-conformances in regulatory inspections and third-party audits
            </li>
            <li className="mb-sm">
              Reduce rework incidents by 15% year-on-year through improved pre-construction planning
              and quality inspections
            </li>
            <li className="mb-sm">
              Complete 100% of required quality documentation — inspection records, material
              certifications, and as-built drawings — prior to project handover
            </li>
          </ol>
        </section>

        {/* Section 4: Management Commitment */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mt-2xl mb-md">
            4. Management Commitment
          </h2>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            The management of CLMC is fully committed to implementing and maintaining this Quality
            Management System. Senior leadership allocates the resources, authority, and
            organizational support necessary to establish, sustain, and improve quality standards
            across all projects and operations.
          </p>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            Management reviews are conducted at regular intervals to assess the effectiveness of
            the QMS, evaluate quality objectives against actual performance, identify opportunities
            for improvement, and ensure the policy remains relevant to CLMC&apos;s strategic
            direction and client expectations.
          </p>
        </section>

        {/* Section 5: Continual Improvement */}
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mt-2xl mb-md">
            5. Continual Improvement
          </h2>
          <p className="font-body text-text-secondary leading-relaxed mb-md">
            CLMC treats continual improvement as a core operating principle, not a periodic
            activity. We systematically collect project data, client feedback, and internal audit
            findings to identify root causes of deficiencies and implement corrective actions that
            prevent recurrence. Process improvements are documented, communicated to all relevant
            personnel, and monitored to verify their effectiveness over time.
          </p>
        </section>
      </div>
    </div>
  )
}
