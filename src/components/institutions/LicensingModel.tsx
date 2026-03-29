'use client'

import { motion } from 'framer-motion'
import { BarChart3, CheckCircle2, DollarSign, Lock, Server } from 'lucide-react'

const deploymentOptions = [
  {
    icon: Server,
    title: 'Standard cloud deployment',
    description: 'For institutions with reliable connectivity and centralized operations.',
    tags: ['Automated updates', 'Usage analytics', 'Managed backups'],
  },
  {
    icon: Lock,
    title: 'Offline and air-gapped',
    description: 'For high-security care environments requiring local-only operation.',
    tags: ['No internet dependency', 'Local data boundary', 'Manual update window'],
  },
  {
    icon: BarChart3,
    title: 'Hybrid model',
    description: 'For mixed environments balancing local resilience and central oversight.',
    tags: ['Flexible rollout', 'Site-level governance', 'Central visibility'],
  },
]

export default function LicensingModel() {
  return (
    <section className="section-shell-alt" id="institutional-pricing">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Institutional licensing designed for predictable scale.</h2>
          <p className="section-subtitle mx-auto">
            Flat annual licensing with unlimited usage across shared devices and patient sessions.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="surface-card-strong p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Annual institutional license</h3>
            </div>

            <p className="text-4xl font-semibold">$5,000<span className="ml-2 text-base font-medium" style={{ color: 'rgb(var(--text-muted))' }}>/year</span></p>
            <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Unlimited usage across devices and patients, with support and update coverage.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'No per-device or per-user fees',
                'Unlimited patient deployments',
                'Priority support and updates',
                'Deployment and onboarding material included',
                'Bulk access management tools',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
              Traditional hardware-first systems often exceed $10,000 per device before maintenance.
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-4"
          >
            {deploymentOptions.map((option) => (
              <article key={option.title} className="surface-card-hover p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <option.icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-semibold">{option.title}</h4>
                <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{option.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {option.tags.map((tag) => (
                    <span key={tag} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--card-border)', color: 'rgb(var(--text-muted))' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
