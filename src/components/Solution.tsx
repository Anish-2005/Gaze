'use client'

import { motion } from 'framer-motion'
import { Eye, Smartphone, Wifi, Shield, Zap, Globe, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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

const features = [
  {
    title: 'Any Camera Works',
    description: 'Smartphones, tablets, laptops, webcams – if it has a camera, GAZE works.',
    icon: Smartphone,
    color: 'blue'
  },
  {
    title: 'Browser-Based',
    description: 'No downloads, no installations. Works instantly in any modern browser.',
    icon: Wifi,
    color: 'purple'
  },
  {
    title: 'HIPAA Ready',
    description: 'Enterprise-grade security with on-device processing. Your data stays private.',
    icon: Shield,
    color: 'emerald'
  },
  {
    title: 'Real-Time AI',
    description: 'Advanced machine learning delivers sub-100ms response times.',
    icon: Zap,
    color: 'amber'
  },
  {
    title: 'Global Reach',
    description: 'Works offline after initial load. Perfect for low-connectivity areas.',
    icon: Globe,
    color: 'teal'
  },
  {
    title: 'Medical Grade',
    description: 'Clinically validated accuracy for healthcare environments.',
    icon: Eye,
    color: 'pink'
  }
]

const colorClasses = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400', glow: 'group-hover:shadow-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', glow: 'group-hover:shadow-purple-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400', glow: 'group-hover:shadow-emerald-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400', glow: 'group-hover:shadow-amber-500/20' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', icon: 'text-teal-400', glow: 'group-hover:shadow-teal-500/20' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: 'text-pink-400', glow: 'group-hover:shadow-pink-500/20' }
}

const benefits = [
  'Zero hardware investment required',
  'Deploy in minutes, not months',
  'Works in 40+ languages',
  'Continuous AI improvements',
  'White-label options available',
  '24/7 clinical support'
]

export default function Solution() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">The Solution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Eye-Tracking for{' '}
            <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Everyone
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            GAZE replaces expensive proprietary hardware with software that runs
            on devices people already own.
          </p>
        </motion.div>

        {/* Features Grid - Bento Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl ${colors.glow}`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Benefits + CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Benefits List */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6">
              Why Choose GAZE?
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Ready to see it in action?</h3>
                  <p className="text-sm text-slate-400">Experience GAZE firsthand</p>
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                Try our live demo using just your device camera. No signup required.
              </p>

              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Launch Demo
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
