'use client'

import { motion } from 'framer-motion'
import { Play, Target, Zap } from 'lucide-react'

const steps = [
  {
    icon: Play,
    title: 'Access the system',
    description:
      'GAZE runs directly in a web browser or mobile application, requiring no installation or specialized setup.',
  },
  {
    icon: Target,
    title: 'Complete a short calibration',
    description:
      'A brief guided calibration aligns eye movement with screen coordinates for accurate interaction.',
  },
  {
    icon: Zap,
    title: 'Begin hands-free communication',
    description:
      'Users can immediately start selecting, typing, and speaking using gaze-based interaction.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#F7F9FC] text-[#0F172A]">
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
            Deployment workflow
          </h2>
          <p className="text-lg text-slate-600">
            GAZE is designed to minimize setup complexity while maintaining
            reliability in clinical and home environments.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    Step {index + 1}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 max-w-4xl"
        >
          <p className="text-slate-600 text-lg leading-relaxed">
            The entire process is designed to be completed within minutes,
            enabling rapid deployment in time-sensitive environments such as
            intensive care units and rehabilitation centers.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
