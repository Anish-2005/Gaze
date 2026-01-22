'use client'

import { motion } from 'framer-motion'
import { Users, Target, XCircle, AlertTriangle, Settings, CheckCircle } from 'lucide-react'

export default function EthicalDesignPrinciples() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ethical <span className="text-gradient">design principles</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Principles that guide every design decision, prioritizing dignity, autonomy, and user agency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Dignity & Agency',
                description: 'Communication support designed to enhance autonomy, never infantilize or control.',
                principles: [
                  'User-led interaction pacing',
                  'No forced responses',
                  'Communication autonomy preserved',
                ],
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Consent by Design',
                description: 'Explicit, continuous control over when tracking is active and what data is processed.',
                principles: [
                  'Granular consent controls',
                  'Tracking status always visible',
                  'One-touch pause functionality',
                ],
                color: 'from-teal-500 to-teal-600',
              },
              {
                icon: <XCircle className="w-8 h-8" />,
                title: 'Non-Extractive AI',
                description: 'Models serve users without exploiting their data for training or behavioral insights.',
                principles: [
                  'No user data in training',
                  'No behavioral profiling',
                  'Transparent model limitations',
                ],
                color: 'from-purple-500 to-purple-600',
              },
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-br ${principle.color} p-6`}>
                  <div className="text-white">{principle.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                  <p className="text-gray-600 mb-6">{principle.description}</p>
                  <ul className="space-y-3">
                    {principle.principles.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Principles */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            {[
              {
                title: 'Power Imbalance Awareness',
                description: 'Designed for users who cannot easily opt-out or advocate for themselves. Includes caregiver controls that respect user agency.',
                icon: <AlertTriangle className="w-5 h-5" />,
              },
              {
                title: 'Minimal Viable Technology',
                description: 'Use the simplest effective solution. Avoid unnecessary complexity or features that could compromise reliability or understanding.',
                icon: <Settings className="w-5 h-5" />,
              },
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}