'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, FileText, Mail, Network, ShieldCheck, Users } from 'lucide-react'

const documentation = [
  {
    icon: BookOpen,
    title: 'System behavior documentation',
    description: 'Clear references for inference flow, edge cases, and fallback logic.',
  },
  {
    icon: Network,
    title: 'Data-flow transparency',
    description: 'Traceable boundaries for where data is processed, cached, and discarded.',
  },
  {
    icon: FileText,
    title: 'Limitations disclosure',
    description: 'Explicit statements of capability limits and failure conditions.',
  },
]

const oversight = [
  {
    icon: Mail,
    title: 'Feedback channels',
    description: 'Users and caregivers can report concerns and improvements continuously.',
  },
  {
    icon: ShieldCheck,
    title: 'Audit support',
    description: 'Documentation and controls for institutional compliance review cycles.',
  },
  {
    icon: Users,
    title: 'Advisory input',
    description: 'Regular consultation with disability advocates and medical professionals.',
  },
]

export default function TransparencyAccountability() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Transparency and accountability mechanisms.</h2>
          <p className="section-subtitle mx-auto">
            Governance is operationalized through documentation, auditable controls, and feedback loops.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <h3 className="text-xl font-semibold">Documentation and disclosure</h3>
            <div className="mt-5 space-y-4">
              {documentation.map((item) => (
                <article key={item.title} className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="text-xl font-semibold">Oversight and feedback</h3>
            <div className="mt-5 space-y-4">
              {oversight.map((item) => (
                <article key={item.title} className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card-strong mt-8 p-6">
          <h4 className="text-base font-semibold">Audit trail configuration</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              'System activation and deactivation events',
              'Emergency mode usage records',
              'Configuration change history',
              'Data export and import events',
              'Consent state updates',
              'Caregiver intervention logs',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
