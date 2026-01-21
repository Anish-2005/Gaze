'use client'

import { motion } from 'framer-motion'
import { Camera, Eye, Map, MousePointer } from 'lucide-react'

const steps = [
  {
    icon: Camera,
    title: 'Standard Camera Input',
    description:
      'GAZE operates using any existing webcam or smartphone camera, eliminating the need for specialized hardware.',
  },
  {
    icon: Eye,
    title: 'On-Device Eye Tracking',
    description:
      'Computer vision models process eye and iris movement locally to preserve privacy and reduce latency.',
  },
  {
    icon: Map,
    title: 'Gaze-to-Screen Mapping',
    description:
      'Calibrated eye movement is translated into stable, accurate screen coordinates in real time.',
  },
  {
    icon: MousePointer,
    title: 'Assistive Interaction Layer',
    description:
      'Users interact with digital interfaces through gaze-based selection, typing, and speech output.',
  },
]

export default function Solution() {
  return (
    <section className="py-24 bg-white text-[#0F172A]">
      <div className="max-w-full mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
            System operation
          </h2>
          <p className="text-lg text-slate-600">
            GAZE is designed as assistive communication infrastructure that can
            be deployed instantly across hospitals, rehabilitation centers, and
            home environments.
          </p>
        </motion.div>

        {/* Process Flow */}
        <div className="space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:ml-10 ml-0 border-b border-slate-200 pb-10 last:border-none"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-slate-900 text-white flex items-center justify-center mx-auto sm:mx-0">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="max-w-3xl text-center sm:text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Deployment Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 bg-[#F7F9FC] border border-slate-200 rounded-xl p-10 max-w-7xl mx-auto"
        >
          <h4 className="text-xl font-semibold mb-4">
            Designed for immediate deployment
          </h4>
          <p className="text-slate-600 text-lg leading-relaxed">
            GAZE requires no installation, no device procurement, and no
            technical training. A standard camera and a short calibration are
            sufficient to restore basic communication capability.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
