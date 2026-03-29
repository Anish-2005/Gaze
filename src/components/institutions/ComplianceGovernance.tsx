'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, FileCheck2, Lock, Shield, ShieldCheck } from 'lucide-react'

const controls = [
  {
    icon: Lock,
    title: 'On-device processing',
    description: 'Eye tracking runs locally to minimize external data exposure risk.',
    items: ['No raw video uploads', 'No biometric persistence', 'Local-first inference'],
  },
  {
    icon: Shield,
    title: 'No biometric storage',
    description: 'No iris patterns, facial signatures, or identity-linked tracking data are retained.',
    items: ['Ephemeral computation only', 'No behavioral profiling', 'Transparent data boundaries'],
  },
  {
    icon: FileCheck2,
    title: 'Healthcare-ready operations',
    description: 'Supports regulated institutional deployment models including air-gapped options.',
    items: ['Offline deployment path', 'IT admin controls', 'Audit support documentation'],
  },
]

export default function ComplianceGovernance() {
  return (
    <section className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Compliance and governance architecture for clinical trust.</h2>
          <p className="section-subtitle mx-auto">
            Designed for healthcare privacy obligations while preserving reliable communication performance.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {controls.map((control, index) => (
            <motion.article
              key={control.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <control.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{control.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {control.description}
              </p>
              <ul className="mt-4 space-y-2">
                {control.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    {item}
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
          className="surface-card-strong mt-8 flex items-start gap-3 p-5 text-sm"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
          Governance controls align with HIPAA, GDPR-oriented review processes, and institutional audit expectations.
        </motion.div>
      </div>
    </section>
  )
}
