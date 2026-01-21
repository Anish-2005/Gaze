'use client'

import { motion } from 'framer-motion'
import { User, GraduationCap, Heart, Globe } from 'lucide-react'

const contexts = [
  {
    icon: User,
    title: 'Personal Assistive Communication',
    description:
      'Individuals experiencing paralysis or loss of speech can use GAZE to regain basic communication capability using existing personal devices.',
  },
  {
    icon: GraduationCap,
    title: 'Inclusive Education Systems',
    description:
      'Educational institutions can support students with motor or speech impairments without procuring specialized assistive hardware.',
  },
  {
    icon: Heart,
    title: 'Healthcare and Rehabilitation',
    description:
      'Hospitals and rehabilitation centers can deploy GAZE on shared tablets to enable communication for ICU and post-operative patients.',
  },
  {
    icon: Globe,
    title: 'Public Sector and NGOs',
    description:
      'Governments and non-profit organizations can scale assistive communication programs within constrained budgets and low-resource settings.',
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-[#F7F9FC] text-[#0F172A]">
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
            Deployment contexts
          </h2>
          <p className="text-lg text-slate-600">
            GAZE is designed to operate across individual, institutional, and
            public-sector environments without changes to existing infrastructure.
          </p>
        </motion.div>

        {/* Context Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {contexts.map((context, index) => {
            const Icon = context.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-md bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      {context.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {context.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
