'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Mail, PhoneCall } from 'lucide-react'

interface InstitutionalCTAProps {
  onScheduleCall: () => void
}

const process = [
  {
    title: 'Technical discovery',
    description: 'Map infrastructure, risk constraints, and priority use cases with your team.',
  },
  {
    title: 'Pilot planning',
    description: 'Define measurable pilot scope, staffing model, and timeline milestones.',
  },
  {
    title: 'Operational launch',
    description: 'Activate institution-wide rollout with governance and support pathways.',
  },
]

export default function InstitutionalCTA({ onScheduleCall }: InstitutionalCTAProps) {
  return (
    <section className="section-shell pb-24 sm:pb-28">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="surface-card-strong mx-auto max-w-5xl p-8 sm:p-10"
        >
          <div className="text-center">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Transform communication access across your institution.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
              Partner with GAZE to launch assistive communication services without high-capital hardware projects.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {process.map((item) => (
              <article key={item.title} className="surface-card p-5 text-left">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={onScheduleCall} className="btn-brand btn-shimmer">
              <Calendar className="h-4 w-4" />
              Schedule Discovery Call
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="mailto:partnerships@gaze.com" className="btn-secondary">
              <Mail className="h-4 w-4" />
              Email Partnerships
            </a>
          </div>

          <div className="mt-7 border-t pt-6 text-center text-sm" style={{ borderColor: 'var(--card-border)', color: 'rgb(var(--text-muted))' }}>
            Ready for immediate pilot triage?
            <a href="tel:+15551234567" className="ml-2 inline-flex items-center gap-1 font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              <PhoneCall className="h-3.5 w-3.5" />
              +1 (555) 123-4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
