'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

const phases = [
  {
    phase: 'Phase 1',
    title: 'Pilot deployment',
    duration: 'Months 1-3',
    description: 'Deploy in 2-3 units to validate workflow fit and patient outcomes.',
    deliverables: ['Clinical feedback loop', 'Workflow integration', 'IT compatibility validation'],
  },
  {
    phase: 'Phase 2',
    title: 'Department rollout',
    duration: 'Months 4-6',
    description: 'Scale across departments with training and operational support paths.',
    deliverables: ['Staff enablement plan', 'Usage analytics setup', 'Support desk onboarding'],
  },
  {
    phase: 'Phase 3',
    title: 'Institution scale',
    duration: 'Months 7-12',
    description: 'Operationalize as standard communication support across relevant units.',
    deliverables: ['Centralized governance', 'License activation at scale', 'Long-term operations model'],
  },
  {
    phase: 'Phase 4',
    title: 'Multi-site expansion',
    duration: 'Year 2+',
    description: 'Extend to partner hospitals or regional program clusters.',
    deliverables: ['Cross-site training model', 'Regional support structure', 'Feature roadmap collaboration'],
  },
]

export default function PilotRolloutPlan() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Pilot-to-scale rollout designed for measurable adoption.</h2>
          <p className="section-subtitle mx-auto">
            A phased implementation structure balancing speed, safety, and institutional governance.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {phases.map((phase, index) => (
            <motion.article
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">{phase.phase}</span>
                <span className="text-xs font-medium" style={{ color: 'rgb(var(--text-muted))' }}>{phase.duration}</span>
              </div>
              <h3 className="text-lg font-semibold">{phase.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{phase.description}</p>

              <ul className="mt-4 space-y-2">
                {phase.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <Target className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
