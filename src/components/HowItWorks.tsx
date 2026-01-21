'use client'

import { motion } from 'framer-motion'
import { Play, Target, Zap } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: <Play className="w-6 h-6" />,
    title: 'Open GAZE',
    description: 'Access directly in your browser or download our app',
  },
  {
    number: '2',
    icon: <Target className="w-6 h-6" />,
    title: 'Calibrate in 30 seconds',
    description: 'Follow the moving dot to calibrate eye tracking',
  },
  {
    number: '3',
    icon: <Zap className="w-6 h-6" />,
    title: 'Control hands-free',
    description: 'Start typing, clicking, and communicating with just your eyes',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simple as <span className="text-gradient">1-2-3</span>
            </h2>
            <p className="text-lg text-gray-600">
              No complex setup. No expensive hardware. Just communication.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-teal-300 z-0"></div>
                )}

                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg h-full">
                  {/* Step Number Background */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-2xl font-bold">
                    {step.number}
                  </div>

                  <div className="mt-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                      <div className="text-blue-600">{step.icon}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <p className="text-green-700 font-medium">
                That's it. Simple = trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}