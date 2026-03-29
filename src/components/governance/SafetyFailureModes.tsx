'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react'

const safetyCards = [
  {
    title: 'Clear system status',
    description: 'Persistent indicators expose tracking status, calibration quality, and readiness state.',
    scenarios: ['Camera disconnection', 'Low-light degradation', 'Calibration drift'],
  },
  {
    title: 'Caregiver override controls',
    description: 'Authorized caregivers can intervene quickly without breaking user communication context.',
    scenarios: ['Emergency communication', 'User fatigue handling', 'Technical recovery actions'],
  },
  {
    title: 'Graceful degradation',
    description: 'Core communication remains functional when higher-level services are unavailable.',
    scenarios: ['Network interruption', 'AI service outage', 'Resource-constrained devices'],
  },
]

export default function SafetyFailureModes() {
  return (
    <section className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5" style={{ color: 'rgb(var(--accent-rose))' }}>
            <AlertTriangle className="h-3.5 w-3.5" />
            Safety engineering
          </div>
          <h2 className="section-title">Safety and failure modes designed for clinical resilience.</h2>
          <p className="section-subtitle mx-auto">
            Clear failure-state behavior and manual override controls keep communication pathways dependable.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {safetyCards.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="surface-card-hover p-6"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgb(var(--text-muted))' }}>
                Failure scenarios
              </p>
              <ul className="mt-2 space-y-2">
                {item.scenarios.map((scenario) => (
                  <li key={scenario} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-rose-400" />
                    {scenario}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="surface-card-strong mt-8 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <h4 className="text-base font-semibold">Emergency communication protocol</h4>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Bypasses standard dwell timing',
              'Enlarges critical communication actions',
              'Prioritizes voice output channel',
              'Logs emergency activation for review',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
