'use client'

import { motion } from 'framer-motion'
import { Check, Building2, User } from 'lucide-react'

const tiers = [
  {
    icon: User,
    title: 'Individual Access',
    subtitle: 'Free and open communication support',
    description:
      'GAZE ensures that no individual is denied basic communication capability due to financial constraints.',
    price: 'Free',
    details: 'Always available',
    features: [
      'Core gaze-based keyboard',
      'Standard text-to-speech',
      'Basic calibration and setup',
      'Browser-based access',
      'No account required',
    ],
  },
  {
    icon: User,
    title: 'Enhanced Personal Use',
    subtitle: 'Advanced features for daily communication',
    description:
      'For users who require faster communication, personalization, and cross-device continuity.',
    price: '$10 / month',
    details: 'Optional upgrade',
    features: [
      'Predictive sentence completion',
      'Personal voice recreation (optional)',
      'Cloud synchronization',
      'Custom phrase sets',
      'Offline usage support',
    ],
  },
  {
    icon: Building2,
    title: 'Institutions & Public Sector',
    subtitle: 'Hospitals, NGOs, and government programs',
    description:
      'Designed for large-scale deployment across shared devices and regulated environments.',
    price: 'Annual license',
    details: 'Flat institutional pricing',
    features: [
      'Unlimited usage per institution',
      'Deployment on shared tablets',
      'Administrative oversight and reporting',
      'Offline and air-gapped support',
      'Healthcare and data compliance',
    ],
  },
]

export default function AccessModel() {
  return (
    <section id="pricing" className="py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
            Access and sustainability model
          </h2>
          <p className="text-lg text-slate-600">
            GAZE operates on a cross-subsidized model that guarantees universal
            access for individuals while remaining financially sustainable
            through institutional partnerships.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-12">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-8"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {tier.price}
                    </div>
                    <div className="text-sm text-slate-500">
                      {tier.details}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {tier.title}
                </h3>
                <div className="text-sm text-slate-600 mb-4">
                  {tier.subtitle}
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-slate-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Compliance note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 max-w-4xl"
        >
          <p className="text-sm text-slate-500 leading-relaxed">
            GAZE is designed to integrate with existing insurance systems and
            public accessibility programs, including government assistive
            technology schemes, where applicable.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
