'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock3, DollarSign, Globe2, Users } from 'lucide-react'

const problemStats = [
  { value: '50M+', label: 'People impacted globally', icon: Users },
  { value: '$10k-$30k', label: 'Typical hardware system cost', icon: DollarSign },
  { value: '6-12 months', label: 'Average procurement delay', icon: Clock3 },
  { value: '<5%', label: 'Patients with meaningful access', icon: Globe2 },
]

const constraints = [
  {
    title: 'Cost barrier',
    body: 'Most eye-tracking communication systems are priced outside the reach of families and underfunded clinics.',
  },
  {
    title: 'Operational complexity',
    body: 'Deployment often requires proprietary hardware, specialist setup, and recurring maintenance contracts.',
  },
  {
    title: 'Regional inequity',
    body: 'Assistive communication remains heavily concentrated in high-income settings, leaving global care gaps.',
  },
]

export default function Problem() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5" style={{ color: 'rgb(var(--accent-rose))' }}>
            <AlertTriangle className="h-3.5 w-3.5" />
            Why current systems fail at scale
          </div>
          <h2 className="section-title">Communication access is still priced like specialty hardware.</h2>
          <p className="section-subtitle mx-auto">
            Critical assistive technology remains inaccessible for most people who need it. The challenge is not awareness, it is delivery.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {problemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="surface-card-hover p-5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="kpi-value">{stat.value}</p>
              <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {constraints.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="surface-card p-6"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

