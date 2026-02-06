'use client'

import { motion } from 'framer-motion'
import { Heart, Globe, Users, TrendingUp } from 'lucide-react'

const impactMetrics = [
  {
    icon: Users,
    value: '50M+',
    label: 'People who could benefit',
    description: 'Living with conditions affecting speech'
  },
  {
    icon: Globe,
    value: '150+',
    label: 'Countries reached',
    description: 'With internet access to GAZE'
  },
  {
    icon: TrendingUp,
    value: '99%',
    label: 'Cost reduction',
    description: 'Compared to traditional hardware'
  },
  {
    icon: Heart,
    value: '∞',
    label: 'Lives improved',
    description: 'Our ultimate measure of success'
  }
]

export default function SocialImpact() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-400">Social Impact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Technology with{' '}
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Purpose
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We believe communication is a fundamental human right. Our mission is
            to make assistive technology accessible to everyone, everywhere.
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-center group hover:border-pink-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/20 transition-colors">
                <metric.icon className="w-6 h-6 text-pink-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm font-medium text-slate-300 mb-1">{metric.label}</div>
              <div className="text-xs text-slate-500">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50"
        >
          <blockquote className="text-xl sm:text-2xl text-slate-300 italic mb-4">
            "Our goal is not profit – it's impact. Every feature we build,
            every optimization we make, is measured by one metric:
            <span className="text-white font-semibold"> did it help someone communicate?</span>"
          </blockquote>
          <p className="text-sm text-slate-500">— The GAZE Team</p>
        </motion.div>
      </div>
    </section>
  )
}
