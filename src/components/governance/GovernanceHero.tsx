'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Cpu, Users, Gavel } from 'lucide-react'

export default function GovernanceHero() {
  return (
    <section className="py-32 bg-white text-[#0F172A]">
      <div className="max-w-8xl mx-auto px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          {/* Context label */}
          <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
            <ShieldCheck className="w-4 h-4" />
            Governance & Ethics Framework
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
            Ethics, privacy, and accessibility
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed mb-14">
            GAZE is designed as assistive communication infrastructure.
            This governance framework defines how the system protects user
            dignity, preserves privacy, and ensures accessibility across
            clinical, institutional, and public-sector deployments.
          </p>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {[
              { icon: Lock, label: 'No biometric data storage' },
              { icon: Cpu, label: 'On-device processing by default' },
              { icon: Users, label: 'User and caregiver control' },
              { icon: Gavel, label: 'Designed for regulatory alignment' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 border border-slate-200 rounded-lg px-5 py-4"
                >
                  <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
