'use client'

import { motion } from 'framer-motion'
import { Lock, Shield, FileCheck, CheckCircle } from 'lucide-react'

export default function ComplianceGovernance() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Compliance & governance
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Engineered for healthcare environments with zero data privacy risk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Lock className="w-6 md:w-8 h-6 md:h-8" />,
                title: 'On-Device Processing',
                description: 'All eye tracking and processing happens locally. No video or biometric data ever leaves the device.',
                standards: ['HIPAA compliant', 'GDPR ready', 'No cloud storage'],
              },
              {
                icon: <Shield className="w-6 md:w-8 h-6 md:h-8" />,
                title: 'No Biometric Storage',
                description: 'We never store, transmit, or process identifiable biometric data. Only gaze coordinates are used temporarily.',
                standards: ['No facial data', 'No iris patterns', 'Ephemeral processing'],
              },
              {
                icon: <FileCheck className="w-6 md:w-8 h-6 md:h-8" />,
                title: 'Healthcare Ready',
                description: 'Designed specifically for hospital IT requirements, including air-gapped networks and legacy systems.',
                standards: ['Offline mode', 'Legacy support', 'IT admin tools'],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl bg-slate-100 flex items-center justify-center mb-4 md:mb-6">
                  <div className="text-slate-600">{item.icon}</div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{item.title}</h3>
                <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">{item.description}</p>
                <div className="space-y-2">
                  {item.standards.map((standard, i) => (
                    <div key={i} className="flex items-center text-xs md:text-sm text-slate-500">
                      <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-green-500 mr-2 flex-shrink-0" />
                      {standard}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { label: 'HIPAA Compliant', color: 'bg-slate-100 text-slate-800' },
                { label: 'GDPR Ready', color: 'bg-slate-100 text-slate-800' },
                { label: 'ISO 27001 Framework', color: 'bg-slate-100 text-slate-800' },
                { label: 'SOC 2 Type II', color: 'bg-slate-100 text-slate-800' },
              ].map((badge, index) => (
                <div key={index} className={`px-3 md:px-4 py-2 rounded-full ${badge.color} font-medium text-xs md:text-sm`}>
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}