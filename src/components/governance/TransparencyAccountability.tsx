'use client'

import { motion } from 'framer-motion'
import { BookOpen, Network, FileText, Mail, ShieldCheck, Users, Clock } from 'lucide-react'

export default function TransparencyAccountability() {
  return (
    <section className="py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              <span className="text-gradient">Transparency & accountability</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Clear documentation, audit trails, and ongoing oversight mechanisms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Documentation & Disclosure</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'System Behavior Documentation',
                    description: 'Detailed technical documentation of how the system processes gaze data, makes predictions, and handles edge cases.',
                    icon: <BookOpen className="w-5 h-5" />,
                  },
                  {
                    title: 'Data Flow Diagrams',
                    description: 'Visual maps showing exactly what data is processed where, when, and for how long.',
                    icon: <Network className="w-5 h-5" />,
                  },
                  {
                    title: 'Limitations Documentation',
                    description: 'Clear statements about what the system cannot do, conditions that affect performance, and known failure modes.',
                    icon: <FileText className="w-5 h-5" />,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="text-blue-600">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Oversight & Feedback</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'User Feedback Mechanisms',
                    description: 'Multiple channels for users and caregivers to report issues, suggest improvements, or raise concerns.',
                    icon: <Mail className="w-5 h-5" />,
                  },
                  {
                    title: 'Institutional Audit Support',
                    description: 'Tools and documentation to support internal and external audits for healthcare institutions.',
                    icon: <ShieldCheck className="w-5 h-5" />,
                  },
                  {
                    title: 'Ethics Advisory Input',
                    description: 'Regular consultation with disability advocates, ethicists, and medical professionals.',
                    icon: <Users className="w-5 h-5" />,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="text-teal-600">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Trail Feature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200"
          >
            <div className="flex items-start">
              <FileText className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Audit Trail System</h4>
                <p className="text-gray-600 mb-4">
                  Institutional deployments include configurable audit trails that log:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'System activations and deactivations',
                    'Emergency mode usage',
                    'Configuration changes',
                    'Data export/import events',
                    'User consent changes',
                    'Caregiver interventions',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}