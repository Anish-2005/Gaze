'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const workflowSteps = [
  {
    step: '01',
    title: 'Device preparation',
    description: 'Load GAZE on existing tablets, laptops, or ward terminals with no dedicated hardware.',
    details: ['2-minute initialization', 'Offline-capable mode', 'No patient video storage'],
  },
  {
    step: '02',
    title: 'Bedside calibration',
    description: 'Position device and complete gaze setup in under a minute for immediate communication readiness.',
    details: ['30-second calibration target', 'Adaptive lighting tolerance', 'Posture-aware tuning'],
  },
  {
    step: '03',
    title: 'Live communication',
    description: 'Patient uses gaze keyboard and critical phrases for care interactions and urgent requests.',
    details: ['Emergency phrase shortcuts', 'Predictive text support', 'Fast voice output path'],
  },
]

const impactMetrics = [
  { value: '5 min', label: 'Average deployment time' },
  { value: '30 sec', label: 'Patient setup time' },
  { value: '0%', label: 'Specialized hardware dependency' },
]

export default function HospitalWorkflow() {
  return (
    <section className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Bedside workflow built for speed under pressure.</h2>
          <p className="section-subtitle mx-auto">
            Institutional teams can deploy and operate GAZE quickly without a specialized IT project.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="surface-card-hover p-6"
            >
              <span className="inline-flex rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                STEP {step.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {step.description}
              </p>
              <ul className="mt-4 space-y-2">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    {detail}
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
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="surface-card p-5 text-center">
              <p className="kpi-value">{metric.value}</p>
              <p className="kpi-label mt-1">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
