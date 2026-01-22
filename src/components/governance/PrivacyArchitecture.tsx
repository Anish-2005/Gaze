'use client'

import { motion } from 'framer-motion'
import { EyeOff, Cpu, Fingerprint, Server, ShieldCheck, CheckCircle } from 'lucide-react'

export default function PrivacyArchitecture() {
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
              <Fingerprint className="w-4 h-4 mr-2" />
              Biometric Privacy
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Privacy architecture
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Engineered from the ground up to eliminate surveillance risk and biometric data exposure
            </p>
          </div>

          {/* Data Flow Visualization */}
          <div className="mb-12">
            <div className="relative grid md:grid-cols-5 gap-4 items-center">
              {[
                { icon: <EyeOff className="w-6 h-6" />, label: 'Camera Input', color: 'bg-slate-100 text-slate-600' },
                { icon: <Cpu className="w-6 h-6" />, label: 'Local Processing', color: 'bg-slate-100 text-slate-600' },
                { icon: <Fingerprint className="w-6 h-6" />, label: 'No Storage', color: 'bg-slate-100 text-slate-600' },
                { icon: <Server className="w-6 h-6" />, label: 'Ephemeral Cache', color: 'bg-slate-100 text-slate-600' },
                { icon: <EyeOff className="w-6 h-6" />, label: 'Local Output', color: 'bg-slate-100 text-slate-600' },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mx-auto mb-3`}>
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium">{step.label}</div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-full transform -translate-x-1/2 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Guarantees */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Zero Biometric Persistence',
                description: 'Raw video is processed frame-by-frame and immediately discarded. No facial features, iris patterns, or gaze paths are stored.',
                icon: <Fingerprint className="w-6 h-6" />,
                guarantees: ['No facial recognition', 'No iris mapping', 'No gaze pattern storage'],
              },
              {
                title: 'On-Device Processing Only',
                description: 'All eye tracking and gaze inference runs locally. No video or biometric data ever leaves the user\'s device.',
                icon: <Cpu className="w-6 h-6" />,
                guarantees: ['No cloud processing', 'No data transmission', 'Works fully offline'],
              },
              {
                title: 'No Behavioral Profiling',
                description: 'We don\'t analyze how users communicate, what they say, or when they communicate for any purpose beyond immediate assistance.',
                icon: <EyeOff className="w-6 h-6" />,
                guarantees: ['No communication analysis', 'No usage patterns', 'No sentiment tracking'],
              },
              {
                title: 'Ephemeral Text Processing',
                description: 'When cloud AI is used (opt-in only), only the typed text is processed, and it\'s discarded after generating a response.',
                icon: <Server className="w-6 h-6" />,
                guarantees: ['Text-only processing', 'Immediate deletion', 'No conversation storage'],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="text-slate-600">{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {item.guarantees.map((guarantee, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-500">
                      <CheckCircle className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                      {guarantee}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Compliance Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <div className="flex items-start">
              <ShieldCheck className="w-6 h-6 text-slate-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Regulatory Alignment</h4>
                <p className="text-slate-600">
                  Our architecture is designed to comply with global privacy regulations including GDPR,
                  HIPAA, and emerging biometric privacy laws. We maintain documentation for institutional
                  compliance reviews and audits.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}