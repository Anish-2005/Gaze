'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Handshake, Sparkles } from 'lucide-react'
import Link from 'next/link'

const assurances = [
  {
    title: 'Immediate availability',
    description: 'The platform can be accessed instantly through a standard web browser, with no installation or hardware procurement required.',
  },
  {
    title: 'Privacy and safety by design',
    description: 'All eye-tracking and interaction processing occurs on-device, ensuring user data remains private and secure.',
  },
  {
    title: 'Designed for scale',
    description: 'GAZE supports deployment across hospitals, NGOs, and public systems without changes to existing infrastructure.',
  },
]

export default function CTA() {
  return (
    <section id="cta" className="bg-slate-900 relative overflow-hidden py-24 sm:py-28 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-600/10" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gradient mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">
              Ready to deploy
            </span>
          </div>

          <h2 className="font-bold leading-tight text-white mb-6 text-3xl sm:text-4xl lg:text-5xl">
            Engage with the <span className="text-gradient">GAZE</span> platform
          </h2>

          <p className="text-slate-400 leading-relaxed mb-12 text-base sm:text-lg max-w-2xl mx-auto">
            GAZE is available for immediate use by individuals and for structured
            deployment by institutions, healthcare providers, and public-sector
            partners.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20">
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 btn-primary px-8 py-4 text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Try Live Demo</span>
              </motion.button>
            </Link>

            <Link href="/institutions">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 btn-secondary px-8 py-4 text-lg"
              >
                <Handshake className="w-5 h-5" />
                <span>Institutional Deployment</span>
              </motion.button>
            </Link>
          </div>

          {/* Assurance Grid */}
          <div className="grid gap-8 md:grid-cols-3 text-left">
            {assurances.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="text-sm font-semibold text-white mb-2">
                  {item.title}
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
