'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Eye, ShieldCheck, Smartphone, Stethoscope } from 'lucide-react'

const trustPoints = ['Browser-based setup', 'No dedicated hardware', 'Designed for clinical settings']

const metrics = [
  { value: '$0', label: 'Hardware cost for personal users' },
  { value: '98.5%', label: 'Eye-tracking accuracy in controlled tests' },
  { value: '<100ms', label: 'Interaction latency on standard devices' },
]

export default function Hero() {
  return (
    <section className="section-shell overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-[110px]" />
      </div>

      <div className="section-grid relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge mb-5">
              <Stethoscope className="h-3.5 w-3.5" />
              Assistive communication platform
            </div>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Professional eye-tracking communication for real-world care.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
              GAZE helps people with speech and motor loss communicate using any modern device camera. It is built for reliability,
              speed, and practical deployment in both home and institutional settings.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {trustPoints.map((item) => (
                <div key={item} className="surface-card inline-flex items-center gap-2 px-3 py-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className="btn-brand btn-shimmer">
                Try Live Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/institutions" className="btn-secondary">
                Institutional Rollout
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="surface-card-strong p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'rgb(var(--text-muted))' }}>
                  Session Preview
                </p>
                <h2 className="mt-1 text-xl font-semibold">Live gaze interaction</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <Eye className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Smartphone, text: 'Patient opens GAZE in browser on phone, tablet, or laptop.' },
                { icon: ShieldCheck, text: 'Calibration completes in under 30 seconds with privacy-first processing.' },
                { icon: Eye, text: 'Communication board responds to gaze in real time with predictive text support.' },
              ].map((item) => (
                <div key={item.text} className="surface-card flex items-start gap-3 p-4">
                  <item.icon className="mt-0.5 h-4 w-4 text-blue-400" />
                  <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="surface-card p-4">
                  <p className="kpi-value">{metric.value}</p>
                  <p className="kpi-label mt-1 leading-snug">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

