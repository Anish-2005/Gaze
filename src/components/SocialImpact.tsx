'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Globe2, HandHeart, HeartPulse, Users } from 'lucide-react'
import Link from 'next/link'

const impactMetrics = [
  { value: '50M+', label: 'People who could benefit', icon: Users },
  { value: '150+', label: 'Countries with potential reach', icon: Globe2 },
  { value: '99%', label: 'Cost reduction potential', icon: HeartPulse },
]

const collaborators = ['Hospital systems', 'Rehabilitation programs', 'Non-profit organizations', 'Public health agencies']

export default function SocialImpact() {
  return (
    <section id="social-impact" className="section-shell">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5" style={{ color: 'rgb(var(--accent-emerald))' }}>
            <HandHeart className="h-3.5 w-3.5" />
            Social impact
          </div>
          <h2 className="section-title">Measured by communication restored, not features shipped.</h2>
          <p className="section-subtitle mx-auto">
            Our mission is to make reliable communication technology universally available across clinical and community settings.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="surface-card-hover p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <metric.icon className="h-5 w-5" />
              </div>
              <p className="kpi-value">{metric.value}</p>
              <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="surface-card-strong p-7 text-lg leading-relaxed"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            "Every iteration of GAZE is evaluated by one practical question: did this make communication easier for someone who needed it today?"
            <p className="mt-4 text-sm font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              — GAZE product and clinical teams
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08 }}
            className="surface-card p-7"
          >
            <h3 className="text-xl font-semibold">Collaboration model</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
              We work with institutions that can extend communication access to underserved patient populations.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {collaborators.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/institutions" className="btn-brand mt-6 w-full">
              Partner with GAZE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

