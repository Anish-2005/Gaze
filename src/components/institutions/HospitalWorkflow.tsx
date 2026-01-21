'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function HospitalWorkflow() {
  return (
    <section className="py-12 md:py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
              <span className="text-slate-600">Hospital workflow</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Deployable at bedside within minutes using existing hospital devices—no IT department involvement required.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: '1',
                title: 'Device Preparation',
                description: 'Load GAZE onto any hospital tablet, iPad, or laptop',
                details: ['2-minute installation', 'Works offline', 'No patient data stored'],
              },
              {
                step: '2',
                title: 'Bedside Setup',
                description: 'Position device, calibrate gaze in 30 seconds',
                details: ['Single calibration', 'Works in any lighting', 'Adaptive to movement'],
              },
              {
                step: '3',
                title: 'Patient Communication',
                description: 'Immediate eye-controlled typing and speech',
                details: ['Emergency phrases', 'Pain communication', 'Basic needs'],
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 relative"
              >
                {/* Step indicator */}
                <div className="absolute -top-3 md:-top-4 -left-3 md:-left-4 w-10 md:w-12 h-10 md:h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-lg md:text-xl font-bold">
                  {step.step}
                </div>

                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm md:text-base">{step.description}</p>
                </div>

                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-xs md:text-sm text-slate-500">
                      <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 bg-white border border-slate-200 rounded-xl p-6 md:p-8"
          >
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { value: '5 min', label: 'Average deployment time' },
                { value: '30 sec', label: 'Patient setup time' },
                { value: '0%', label: 'Hardware failure risk' },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">{metric.value}</div>
                  <div className="text-xs md:text-sm text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}