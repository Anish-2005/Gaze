'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Globe2, HeartPulse, Hospital, Users } from 'lucide-react'

const contexts = [
  {
    icon: Hospital,
    title: 'Hospitals and ICUs',
    description: 'Enable communication for intubated or temporarily paralyzed patients on shared bedside devices.',
    features: ['Emergency communication phrases', 'No procurement dependency', 'Rapid nurse onboarding'],
  },
  {
    icon: Users,
    title: 'Rehabilitation centers',
    description: 'Support long-term recovery journeys for stroke, ALS, and spinal cord injury populations.',
    features: ['Therapy-aligned workflows', 'Adaptive interaction profiles', 'Progress continuity'],
  },
  {
    icon: HeartPulse,
    title: 'NGOs and non-profits',
    description: 'Scale communication programs across constrained budgets and mixed infrastructure settings.',
    features: ['Bulk access provisioning', 'Offline-ready deployments', 'Multi-language support'],
  },
  {
    icon: Globe2,
    title: 'Public sector programs',
    description: 'Deploy as regional or national accessibility infrastructure through government initiatives.',
    features: ['Central governance controls', 'Compliance alignment', 'Staff training enablement'],
  },
]

export default function DeploymentContexts() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Designed for institutional scale and operational reality.</h2>
          <p className="section-subtitle mx-auto">
            A single platform pattern that adapts across acute care, rehabilitation, and public-service deployment models.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contexts.map((context, index) => (
            <motion.article
              key={context.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <context.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{context.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {context.description}
              </p>
              <ul className="mt-4 space-y-2">
                {context.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    {feature}
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
