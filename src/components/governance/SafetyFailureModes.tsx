'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react'

export default function SafetyFailureModes() {
  return (
    <section className="py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Safety Engineering
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Safety & failure modes
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Designed for reliability with clear failure states and caregiver overrides
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Clear System Status',
                description: 'Persistent visual indicators show tracking status, calibration quality, and system health.',
                scenarios: [
                  'Camera disconnection',
                  'Poor lighting conditions',
                  'Calibration drift',
                ],
                icon: '📊',
              },
              {
                title: 'Caregiver Controls',
                description: 'Manual overrides accessible at any time without disrupting user experience.',
                scenarios: [
                  'Emergency communication',
                  'User fatigue',
                  'Technical issues',
                ],
                icon: <ShieldCheck className="w-6 h-6" />,
              },
              {
                title: 'Graceful Degradation',
                description: 'System maintains basic functionality even when advanced features fail.',
                scenarios: [
                  'Network disconnection',
                  'AI service outage',
                  'Hardware limitations',
                ],
                icon: '🔄',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-slate-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 mb-6">{item.description}</p>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-500">Failure Scenarios:</div>
                  {item.scenarios.map((scenario, i) => (
                    <div key={i} className="flex items-center text-sm text-slate-600">
                      <AlertTriangle className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                      {scenario}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Communication Protocol */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <div className="flex items-start">
              <AlertTriangle className="w-8 h-8 text-slate-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Emergency Communication Protocol</h4>
                <p className="text-slate-600 mb-4">
                  In critical situations, caregivers can activate emergency mode which:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    'Bypasses all dwell timing',
                    'Enlarges critical communication buttons',
                    'Activates system-wide voice output',
                    'Logs emergency activation for review',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}