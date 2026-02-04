'use client'

import { motion } from 'framer-motion'
import { DollarSign, ShieldOff, Lock } from 'lucide-react'

const problems = [
  {
    icon: ShieldOff,
    title: 'Conventional interfaces exclude millions',
    description:
      'Individuals affected by paralysis, ALS, stroke, or critical illness often lose the ability to speak or use standard input devices, resulting in complete communication breakdown.',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    shadowColor: 'shadow-red-500/20',
  },
  {
    icon: DollarSign,
    title: 'Assistive communication relies on expensive hardware',
    description:
      'Existing eye-tracking and AAC systems typically require proprietary hardware costing upwards of $10,000, making large-scale deployment financially unviable.',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    shadowColor: 'shadow-amber-500/20',
  },
  {
    icon: Lock,
    title: 'Access to communication becomes conditional',
    description:
      'When essential communication tools are limited by cost and infrastructure, dignity, autonomy, and care quality are compromised.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    shadowColor: 'shadow-purple-500/20',
  },
]

export default function Problem() {
  return (
    <section className="py-24 sm:py-32 bg-slate-900 relative overflow-hidden">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Dotted grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
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
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              The Problem
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Communication loss is a{' '}
            <span className="text-gradient">systemic problem</span>.
          </h2>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
            Despite advances in medical care, millions of people worldwide remain
            unable to communicate basic needs due to physical or neurological
            impairment.
          </p>
        </motion.div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group"
              >
                <motion.div
                  className="glass-card-hover p-8 h-full relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background glow on hover */}
                  <motion.div
                    className={`absolute inset-0 ${problem.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with animation */}
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-6 shadow-lg ${problem.shadowColor}`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                      {problem.title}
                    </h3>

                    <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                      {problem.description}
                    </p>
                  </div>

                  {/* Decorative corner gradient */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${problem.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
            Every minute of communication loss represents a missed opportunity for
            <span className="text-slate-400"> connection</span>,
            <span className="text-slate-400"> care</span>, and
            <span className="text-slate-400"> dignity</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
