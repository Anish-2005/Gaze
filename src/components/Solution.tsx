'use client'

import { motion } from 'framer-motion'
import { Camera, Eye, Map, MousePointer, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Camera,
    title: 'Standard Camera Input',
    description:
      'GAZE operates using any existing webcam or smartphone camera, eliminating the need for specialized hardware.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    title: 'On-Device Eye Tracking',
    description:
      'Computer vision models process eye and iris movement locally to preserve privacy and reduce latency.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Map,
    title: 'Gaze-to-Screen Mapping',
    description:
      'Calibrated eye movement is translated into stable, accurate screen coordinates in real time.',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: MousePointer,
    title: 'Assistive Interaction Layer',
    description:
      'Users interact with digital interfaces through gaze-based selection, typing, and speech output.',
    color: 'from-amber-500 to-orange-500',
  },
]

export default function Solution() {
  return (
    <section className="py-24 sm:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.1, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gradient mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              The Solution
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            How <span className="text-gradient-animated">GAZE</span> works
          </h2>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
            GAZE is designed as assistive communication infrastructure that can
            be deployed instantly across hospitals, rehabilitation centers, and
            home environments.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px">
            <motion.div
              className="h-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-teal-500/50"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center">
                    {/* Step Number & Icon */}
                    <motion.div
                      className="relative z-10 flex items-center gap-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Icon Container */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative`}
                        whileHover={{
                          boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <Icon className="w-7 h-7 text-white" />

                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      className="flex-1 glass-card-hover p-6 lg:p-8 group"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-all">
                            {step.title}
                          </h3>
                          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                            {step.description}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 group-hover:border-slate-600 group-hover:bg-slate-700 transition-all"
                          whileHover={{ x: 5 }}
                        >
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Deployment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 sm:mt-24"
        >
          <div className="glass-card p-8 sm:p-10 border-gradient relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Ready to Deploy</span>
              </motion.div>

              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Designed for immediate deployment
              </h4>

              <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                GAZE requires no installation, no device procurement, and no
                technical training. A standard camera and a short calibration are
                sufficient to restore basic communication capability.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                {['No Installation', 'No Hardware', 'No Training'].map((feature, i) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
