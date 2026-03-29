'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Cpu, EyeOff, Fingerprint, Server, ShieldCheck } from 'lucide-react'

const safeguards = [
  {
    icon: Fingerprint,
    title: 'Zero biometric persistence',
    description: 'Raw video is processed frame-by-frame and discarded immediately.',
    items: ['No facial recognition templates', 'No iris mapping storage', 'No gaze history retention'],
  },
  {
    icon: Cpu,
    title: 'On-device processing',
    description: 'Tracking and inference are performed locally under explicit user controls.',
    items: ['No cloud video processing', 'No biometric transmission', 'Offline-capable operation'],
  },
  {
    icon: EyeOff,
    title: 'No behavioral profiling',
    description: 'Communication behavior is not used for advertising, profiling, or extraction.',
    items: ['No sentiment surveillance', 'No hidden analytics vectors', 'Purpose-limited processing'],
  },
  {
    icon: Server,
    title: 'Ephemeral text services',
    description: 'Optional AI text assistance handles prompt data ephemerally with bounded scope.',
    items: ['Text-only request path', 'Immediate discard policy', 'No long-term conversation logging'],
  },
]

export default function PrivacyArchitecture() {
  return (
    <section className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5">
            <Fingerprint className="h-3.5 w-3.5" />
            Biometric privacy
          </div>
          <h2 className="section-title">Privacy architecture built to prevent surveillance risk.</h2>
          <p className="section-subtitle mx-auto">
            Data boundaries are explicit, minimal, and aligned with institutional compliance reviews.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {safeguards.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.items.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    {point}
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
          Architecture is aligned for HIPAA/GDPR-oriented deployment reviews and supports institutional audit workflows.
        </motion.div>
      </div>
    </section>
  )
}
