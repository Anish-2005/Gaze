'use client'

import { motion } from 'framer-motion'
import { DollarSign, ShieldOff, Lock } from 'lucide-react'

const problems = [
  {
    icon: ShieldOff,
    title: 'Conventional interfaces exclude millions',
    description:
      'Individuals affected by paralysis, ALS, stroke, or critical illness often lose the ability to speak or use standard input devices, resulting in complete communication breakdown.',
  },
  {
    icon: DollarSign,
    title: 'Assistive communication relies on expensive hardware',
    description:
      'Existing eye-tracking and AAC systems typically require proprietary hardware costing upwards of $10,000, making large-scale deployment financially unviable.',
  },
  {
    icon: Lock,
    title: 'Access to communication becomes conditional',
    description:
      'When essential communication tools are limited by cost and infrastructure, dignity, autonomy, and care quality are compromised.',
  },
]

export default function Problem() {
  return (
    <section className="py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
            Communication loss is a systemic problem.
          </h2>

          <p className="text-lg text-slate-600">
            Despite advances in medical care, millions of people worldwide remain
            unable to communicate basic needs due to physical or neurological
            impairment.
          </p>
        </motion.div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-8"
              >
                <div className="mb-6 text-slate-700">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-semibold mb-4">
                  {problem.title}
                </h3>

                <p className="text-slate-600 text-base leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
