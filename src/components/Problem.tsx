'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, DollarSign, Clock, Users, TrendingDown, Hospital, Accessibility } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const problemStats = [
  {
    value: '50M+',
    label: 'People Affected',
    description: 'Living with conditions causing speech loss',
    icon: Users,
    color: 'from-red-500 to-orange-500'
  },
  {
    value: '$15K+',
    label: 'Current Device Cost',
    description: 'Price of traditional eye-tracking systems',
    icon: DollarSign,
    color: 'from-amber-500 to-yellow-500'
  },
  {
    value: '6-12mo',
    label: 'Waitlist Time',
    description: 'Average time to receive assistive devices',
    icon: Clock,
    color: 'from-purple-500 to-pink-500'
  },
  {
    value: '< 5%',
    label: 'Access Rate',
    description: 'Patients who can afford current solutions',
    icon: TrendingDown,
    color: 'from-blue-500 to-cyan-500'
  }
]

const painPoints = [
  {
    title: 'Prohibitive Costs',
    description: 'Specialized eye-tracking hardware costs $10,000-$30,000, excluding the majority of patients and institutions.',
    icon: DollarSign
  },
  {
    title: 'Complex Setup',
    description: 'Current systems require trained technicians, specialized calibration, and ongoing maintenance.',
    icon: Hospital
  },
  {
    title: 'Limited Accessibility',
    description: 'Available primarily in wealthy nations, leaving developing regions without any options.',
    icon: Accessibility
  }
]

export default function Problem() {
  return (
    <section className="relative py-20 sm:py-32 bg-[rgb(var(--section-bg))] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--bg-tertiary))] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--bg-tertiary))] to-transparent" />

        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">The Problem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--text-primary))] mb-6">
            Millions Are{' '}
            <span style={{ background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Locked Out
            </span>
          </h2>

          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Current assistive communication technology is prohibitively expensive,
            inaccessible, and unavailable in most of the world.
          </p>
        </motion.div>

        {/* Stats Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {problemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm overflow-hidden hover:border-black/10 transition-colors"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`} />

              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-bold text-[rgb(var(--text-primary))] mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[rgb(var(--text-muted))]">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pain Points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-red-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent rounded-2xl transition-all duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <point.icon className="w-6 h-6 text-red-400" />
                </div>

                <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl sm:text-2xl text-[rgb(var(--text-secondary))] italic max-w-3xl mx-auto">
            "Communication is a fundamental human right –
            <span className="text-[rgb(var(--text-primary))] font-medium"> not a luxury for those who can afford it.</span>"
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
