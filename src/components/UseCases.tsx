'use client'

import { motion } from 'framer-motion'
import { Building2, GraduationCap, HeartPulse, Home, Hospital, Stethoscope } from 'lucide-react'

const useCases = [
  {
    title: 'Intensive care units',
    description: 'Supports communication for ventilated or immobile patients during high-acuity treatment windows.',
    context: 'Critical care support',
    icon: HeartPulse,
  },
  {
    title: 'Rehabilitation centers',
    description: 'Enables continuity between speech therapy plans and day-to-day communication practice.',
    context: 'Recovery pathway',
    icon: Hospital,
  },
  {
    title: 'Home care environments',
    description: 'Gives patients and families a reliable communication channel without expensive hardware procurement.',
    context: 'At-home independence',
    icon: Home,
  },
  {
    title: 'Pediatric care',
    description: 'Provides adaptable interfaces for younger patients with neuromotor or speech limitations.',
    context: 'Child-centered design',
    icon: Stethoscope,
  },
  {
    title: 'Research institutions',
    description: 'Offers a repeatable, affordable platform for communication and human-computer interaction studies.',
    context: 'Research enablement',
    icon: GraduationCap,
  },
  {
    title: 'Senior care facilities',
    description: 'Helps residents with progressive neurological conditions maintain clearer communication with staff.',
    context: 'Long-term care',
    icon: Building2,
  },
]

export default function UseCases() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5">
            <Hospital className="h-3.5 w-3.5" />
            Deployment contexts
          </div>
          <h2 className="section-title">Built for clinical reality, not just lab demos.</h2>
          <p className="section-subtitle mx-auto">
            GAZE adapts to the workflows of hospitals, rehabilitation teams, and families while keeping the user experience simple.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <motion.article
              key={useCase.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.05 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <useCase.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgb(var(--text-muted))' }}>
                {useCase.context}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{useCase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {useCase.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
