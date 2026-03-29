'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Settings, Target, Users, XCircle } from 'lucide-react'

const principles = [
  {
    icon: Users,
    title: 'Dignity and agency',
    description: 'Communication support should increase autonomy, never reduce user control.',
    points: ['User-led interaction pacing', 'No forced response loops', 'Communication autonomy preserved'],
  },
  {
    icon: Target,
    title: 'Consent by design',
    description: 'Tracking activation and data processing are explicit, visible, and controllable.',
    points: ['Granular consent controls', 'Persistent status visibility', 'One-action pause path'],
  },
  {
    icon: XCircle,
    title: 'Non-extractive AI',
    description: 'Models provide assistance without turning vulnerable user behavior into training fuel.',
    points: ['No user data in model training', 'No behavioral profiling', 'Clear model limitation disclosure'],
  },
]

export default function EthicalDesignPrinciples() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Ethical design principles that shape product decisions.</h2>
          <p className="section-subtitle mx-auto">
            Governance principles define how we prioritize dignity, autonomy, and trust in high-stakes care interactions.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <principle.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {principle.description}
              </p>
              <ul className="mt-4 space-y-2">
                {principle.points.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[{
            title: 'Power imbalance awareness',
            description: 'Designed for users who may not be able to advocate for themselves during care moments.',
            icon: AlertTriangle,
          }, {
            title: 'Minimal viable technology',
            description: 'Prioritize stable, understandable interaction over unnecessary complexity or novelty.',
            icon: Settings,
          }].map((item) => (
            <article key={item.title} className="surface-card p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <item.icon className="h-4 w-4" />
              </div>
              <h4 className="text-base font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
