'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, ShieldCheck } from 'lucide-react'

interface InstitutionalHeroProps {
  onScheduleCall: () => void
}

const trustMetrics = [
  { value: '$0', label: 'New hardware spend required' },
  { value: '<5 min', label: 'Average deployment setup' },
  { value: '30 sec', label: 'Patient calibration window' },
  { value: 'Unlimited', label: 'Supported shared devices' },
]

export default function InstitutionalHero({ onScheduleCall }: InstitutionalHeroProps) {
  return (
    <section className="section-shell overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-12 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="section-grid relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="section-badge mx-auto mb-5">
            <Building2 className="h-3.5 w-3.5" />
            Institutional rollout
          </div>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Deploy assistive communication as healthcare infrastructure.
          </h1>

          <p className="section-subtitle mx-auto mt-6 max-w-3xl">
            GAZE equips hospitals, rehabilitation programs, NGOs, and public-sector teams with a software-first
            communication platform that runs on existing devices without procurement-heavy hardware cycles.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={onScheduleCall} className="btn-brand btn-shimmer">
              Schedule Deployment Call
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/demo" className="btn-secondary">
              View Clinical Demo
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="surface-card p-4 text-left sm:text-center">
                <p className="kpi-value">{metric.value}</p>
                <p className="kpi-label mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="surface-card-strong mt-7 inline-flex items-center gap-2 px-4 py-3 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Security, privacy, and accessibility controls built for regulated care environments.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
