'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Handshake, Sparkles, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

const assurances = [
  {
    icon: Zap,
    title: 'Immediate availability',
    description: 'The platform can be accessed instantly through a standard web browser, with no installation or hardware procurement required.',
    color: 'text-blue-400',
  },
  {
    icon: Shield,
    title: 'Privacy and safety by design',
    description: 'All eye-tracking and interaction processing occurs on-device, ensuring user data remains private and secure.',
    color: 'text-emerald-400',
  },
  {
    icon: Globe,
    title: 'Designed for scale',
    description: 'GAZE supports deployment across hospitals, NGOs, and public systems without changes to existing infrastructure.',
    color: 'text-purple-400',
  },
]

export default function CTA() {
  return (
    <section id="cta" className="bg-slate-900 relative overflow-hidden py-24 sm:py-28 lg:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-teal-600/10" />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/12 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gradient mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">
              Ready to deploy
            </span>
          </motion.div>

          <h2 className="font-bold leading-tight text-white mb-6 text-3xl sm:text-4xl lg:text-5xl">
            Engage with the <span className="text-gradient-animated">GAZE</span> platform
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
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 btn-primary btn-shimmer px-8 py-4 text-lg group"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Try Live Demo</span>
              </motion.button>
            </Link>

            <Link href="/institutions">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 btn-secondary px-8 py-4 text-lg group"
              >
                <Handshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Institutional Deployment</span>
              </motion.button>
            </Link>
          </div>

          {/* Assurance Grid */}
          <div className="grid gap-6 md:grid-cols-3 text-left">
            {assurances.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-card-hover p-6 group"
                >
                  <motion.div
                    className={`w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:border-slate-600 transition-colors`}
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </motion.div>
                  <div className="text-base font-semibold text-white mb-2 group-hover:text-gradient transition-all">
                    {item.title}
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
