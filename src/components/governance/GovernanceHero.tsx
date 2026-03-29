'use client'

import { motion } from 'framer-motion'
import { Cpu, Gavel, Lock, ShieldCheck, Users } from 'lucide-react'

const pillars = [
  { icon: Lock, label: 'No biometric data storage' },
  { icon: Cpu, label: 'On-device processing by default' },
  { icon: Users, label: 'User and caregiver control' },
  { icon: Gavel, label: 'Regulatory alignment by design' },
]

export default function GovernanceHero() {
  return (
    <section className="section-shell overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-1/4 h-72 w-72 rounded-full bg-emerald-500/12 blur-[120px]" />
      </div>

      <div className="section-grid relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-5xl"
        >
          <div className="section-badge mb-5 inline-flex">
            <ShieldCheck className="h-3.5 w-3.5" />
            Governance and ethics framework
          </div>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Ethics, privacy, and accessibility at production scale.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
            GAZE is designed as assistive communication infrastructure. This framework defines how we preserve dignity,
            protect privacy, and maintain accountable deployment across healthcare and public-sector environments.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.label} className="surface-card flex items-center gap-3 p-4">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <pillar.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>{pillar.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
