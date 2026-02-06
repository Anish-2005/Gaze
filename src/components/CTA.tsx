'use client'

import { motion } from 'framer-motion'
import { Eye, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-32 bg-[rgb(var(--section-bg))] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-[rgb(var(--section-bg))] to-purple-900/10" />

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Join the Movement</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgb(var(--text-primary))] mb-6 leading-tight">
            Ready to{' '}
            <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Transform
            </span>
            <br />
            Communication?
          </h2>

          <p className="text-xl text-[rgb(var(--text-secondary))] mb-10 max-w-2xl mx-auto">
            Experience the future of accessible communication technology.
            Try GAZE today – no signup, no download, no cost.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  <Eye className="w-6 h-6" />
                  Try Live Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.button>
            </Link>

            <Link href="/institutions">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-2xl font-semibold text-[rgb(var(--text-primary))] bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-black/5 transition-all text-lg"
              >
                For Institutions
              </motion.button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[rgb(var(--text-muted))]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              No signup required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Works on any device
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              100% free for personal use
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
