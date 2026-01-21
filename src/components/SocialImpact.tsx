'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Globe, Zap, DollarSign } from 'lucide-react'

const metrics = [
  {
    icon: TrendingDown,
    value: '≥90%',
    label: 'cost reduction',
    description:
      'Compared to proprietary eye-tracking hardware systems currently in use.',
  },
  {
    icon: DollarSign,
    value: '$0',
    label: 'additional hardware',
    description:
      'Operates using existing smartphones, tablets, and computers.',
  },
  {
    icon: Zap,
    value: 'Up to 10×',
    label: 'communication efficiency',
    description:
      'Observed improvement using predictive language and phrase completion.',
  },
  {
    icon: Globe,
    value: 'Global',
    label: 'deployment readiness',
    description:
      'Web-based architecture enables use across regions and income levels.',
  },
]

export default function Impact() {
  return (
    <section className="py-24 bg-white text-[#0F172A]">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
            Impact at scale
          </h2>
          <p className="text-lg text-slate-600">
            GAZE is designed to scale accessibility through software, enabling
            cost-effective deployment across healthcare systems, institutions,
            and communities.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="border border-slate-200 rounded-xl p-8 bg-[#F7F9FC]"
              >
                <div className="mb-6 w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-3xl font-semibold mb-2">
                  {metric.value}
                </div>

                <div className="text-sm font-medium text-slate-700 mb-2">
                  {metric.label}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Positioning Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 max-w-5xl"
        >
          <p className="text-lg text-slate-600 leading-relaxed">
            GAZE makes it possible to deploy communication access as infrastructure rather than as a luxury product in both high-resource and low-resource environments by substituting proprietary hardware with a software-first approach.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
