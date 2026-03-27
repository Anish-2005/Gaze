'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, CheckCircle2, Globe2, ShieldCheck, Smartphone, Wifi } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Device-agnostic by design',
    description: 'Runs on standard smartphones, tablets, and laptops without external eye-tracking hardware.',
    icon: Smartphone,
  },
  {
    title: 'Zero-install workflow',
    description: 'Patients and clinicians start from a secure URL and browser permissions, reducing operational friction.',
    icon: Wifi,
  },
  {
    title: 'Clinical-grade reliability',
    description: 'Fast gaze mapping and adaptive calibration built to support high-consequence communication contexts.',
    icon: Brain,
  },
  {
    title: 'Privacy-first architecture',
    description: 'Designed for sensitive environments with transparent processing boundaries and security controls.',
    icon: ShieldCheck,
  },
]

const benefits = [
  'Immediate patient communication support',
  'Lower procurement and IT burden',
  'Scales across wards and home care',
  'Enterprise and public-sector deployment options',
]

export default function Solution() {
  return (
    <section id="solution" className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5">The GAZE approach</div>
          <h2 className="section-title">Software-first eye tracking that can be deployed anywhere.</h2>
          <p className="section-subtitle mx-auto">
            GAZE replaces expensive proprietary stacks with a modern web platform optimized for healthcare-grade communication.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06 }}
                className="surface-card-hover p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="surface-card-strong p-6"
          >
            <h3 className="text-xl font-semibold">Implementation value</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
              Purpose-built for care providers, rehabilitation teams, and accessibility programs that need measurable outcomes.
            </p>

            <ul className="mt-5 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="surface-divider mt-6 border-t pt-6">
              <div className="mb-4 flex items-center gap-2 text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                <Globe2 className="h-4 w-4 text-cyan-400" />
                Works in low-resource and high-resource settings
              </div>
              <Link href="/demo" className="btn-brand w-full">
                See Platform Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

