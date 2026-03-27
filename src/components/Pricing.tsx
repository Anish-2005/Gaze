'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building2, Check, User, Workflow } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Personal',
    price: 'Free',
    period: 'forever',
    icon: User,
    cta: 'Start Free',
    href: '/demo',
    highlighted: false,
    description: 'For patients and families who need direct communication support.',
    features: ['Core gaze keyboard', 'Predictive text', 'Multi-language support', 'Offline-ready usage'],
  },
  {
    name: 'Clinical',
    price: '$99',
    period: 'per month',
    icon: Building2,
    cta: 'Start Clinical Trial',
    href: '/institutions',
    highlighted: true,
    description: 'For hospitals and rehabilitation teams managing patient communication programs.',
    features: ['Everything in Personal', 'Team-level administration', 'Usage analytics', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'annual contracts',
    icon: Workflow,
    cta: 'Talk to Sales',
    href: '/institutions',
    highlighted: false,
    description: 'For public health systems and large institutions with compliance-heavy environments.',
    features: ['Everything in Clinical', 'Dedicated deployment options', 'Custom integration support', 'SLA-backed operations'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-badge mx-auto mb-5">Pricing</div>
          <h2 className="section-title">Accessible by default, sustainable at scale.</h2>
          <p className="section-subtitle mx-auto">
            Personal communication access remains free. Institutional plans fund deployment, compliance, and long-term platform reliability.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className={`${plan.highlighted ? 'surface-card-strong ring-1 ring-blue-500/35' : 'surface-card'} p-6`}
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {plan.description}
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <plan.icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mb-5">
                <p className="text-4xl font-semibold">{plan.price}</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                  {plan.period}
                </p>
              </div>

              <ul className="mb-7 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className={plan.highlighted ? 'btn-brand w-full' : 'btn-secondary w-full'}>
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

