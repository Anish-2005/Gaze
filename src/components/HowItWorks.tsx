'use client'

import { motion } from 'framer-motion'
import { Brain, Camera, CheckCircle2, MessageSquareText, Monitor } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Secure session start',
    description: 'Patient opens a URL and grants camera permission. No install or specialized hardware setup is required.',
    icon: Camera,
  },
  {
    number: '02',
    title: 'Adaptive calibration',
    description: 'A short guided flow tunes gaze tracking to the user posture, lighting conditions, and device position.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Real-time tracking',
    description: 'GAZE maps eye movement to interface controls with low-latency responsiveness and stability.',
    icon: Monitor,
  },
  {
    number: '04',
    title: 'Communication output',
    description: 'Users select characters, words, and quick phrases while prediction speeds up sentence completion.',
    icon: MessageSquareText,
  },
]

const stats = [
  { value: '30s', label: 'Average calibration window' },
  { value: '<100ms', label: 'Median interaction latency' },
  { value: '98.5%', label: 'Tracking accuracy baseline' },
  { value: '0', label: 'Required external devices' },
]

export default function HowItWorks() {
  return (
    <section className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5">How it works</div>
          <h2 className="section-title">A four-step workflow designed for bedside speed.</h2>
          <p className="section-subtitle mx-auto">
            The interaction model is intentionally straightforward so clinicians and caregivers can deploy it quickly under pressure.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.05 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">STEP {step.number}</span>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <step.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="surface-card p-5">
              <p className="kpi-value">{stat.value}</p>
              <p className="kpi-label mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 surface-card-strong flex items-center gap-3 p-4 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
          Workflow is built to be operable by clinical staff, caregivers, and non-technical users with minimal onboarding.
        </div>
      </div>
    </section>
  )
}
