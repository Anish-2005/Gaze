'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Cpu, Users, Gavel } from 'lucide-react'

export default function GovernanceHero() {
  return (
    <section className="relative py-28 bg-[#F7F9FC] text-[#0F172A]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Governance Framework
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="block">Ethics, privacy, and</span>
            <span className="block text-gradient mt-2">accessible by design</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
            GAZE is engineered as assistive communication infrastructure with ethical principles
            embedded at every layer. This framework ensures we restore communication capabilities
            without compromising user dignity, privacy, or autonomy.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: <Lock className="w-5 h-5" />, label: 'Zero Biometric Storage' },
              { icon: <Cpu className="w-5 h-5" />, label: 'On-Device Processing' },
              { icon: <Users className="w-5 h-5" />, label: 'User-Led Design' },
              { icon: <Gavel className="w-5 h-5" />, label: 'Regulatory Alignment' },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <div className="text-blue-600">{item.icon}</div>
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}