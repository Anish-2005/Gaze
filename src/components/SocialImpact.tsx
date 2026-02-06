'use client'

import { motion } from 'framer-motion'
import { Heart, Globe, Users, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
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

const impactMetrics = [
  {
    icon: Users,
    value: '50M+',
    label: 'People who could benefit',
    description: 'Living with conditions affecting speech',
    color: 'blue'
  },
  {
    icon: Globe,
    value: '150+',
    label: 'Countries reached',
    description: 'With internet access to GAZE',
    color: 'teal'
  },
  {
    icon: TrendingUp,
    value: '99%',
    label: 'Cost reduction',
    description: 'Compared to traditional hardware',
    color: 'purple'
  },
  {
    icon: Heart,
    value: '∞',
    label: 'Lives improved',
    description: 'Our ultimate measure of success',
    color: 'pink'
  }
]

const colorClasses = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400', hover: 'group-hover:border-blue-500/40 group-hover:bg-blue-500/15' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', icon: 'text-teal-400', hover: 'group-hover:border-teal-500/40 group-hover:bg-teal-500/15' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', hover: 'group-hover:border-purple-500/40 group-hover:bg-purple-500/15' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: 'text-pink-400', hover: 'group-hover:border-pink-500/40 group-hover:bg-pink-500/15' }
}

const partners = [
  'Research Universities',
  'Hospital Networks',
  'NGOs',
  'Government Health Agencies'
]

export default function SocialImpact() {
  return (
    <section className="relative py-24 sm:py-32 bg-[rgb(var(--section-bg-alt))] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--bg-tertiary))] to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300">Social Impact</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--text-primary))] mb-6">
            Technology with{' '}
            <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Purpose
            </span>
          </h2>

          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            We believe communication is a fundamental human right. Our mission is
            to make assistive technology accessible to everyone, everywhere.
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {impactMetrics.map((metric) => {
            const colors = colorClasses[metric.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className={`group relative p-6 rounded-2xl bg-[var(--card-bg)] border ${colors.border} backdrop-blur-sm text-center transition-all duration-300 ${colors.hover}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <metric.icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[rgb(var(--text-primary))] mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">{metric.label}</div>
                <div className="text-xs text-[rgb(var(--text-muted))]">{metric.description}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mission Statement + Partners Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative p-8 rounded-2xl bg-[rgb(var(--section-bg))] border border-[var(--card-border)] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))]">Our Mission</h3>
              </div>

              <blockquote className="text-lg sm:text-xl text-[rgb(var(--text-secondary))] italic mb-6 leading-relaxed">
                "Our goal is not profit – it's impact. Every feature we build,
                every optimization we make, is measured by one metric:{' '}
                <span className="text-[rgb(var(--text-primary))] font-semibold not-italic">
                  did it help someone communicate?
                </span>"
              </blockquote>

              <p className="text-sm text-[rgb(var(--text-muted))]">— The GAZE Team</p>
            </div>
          </motion.div>

          {/* Partners & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]"
          >
            <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-6">Join the Movement</h3>

            <p className="text-[rgb(var(--text-secondary))] mb-6">
              We partner with organizations worldwide to bring accessible
              communication to those who need it most.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {partners.map((partner) => (
                <div key={partner} className="flex items-center gap-2 text-sm text-[rgb(var(--text-secondary))]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {partner}
                </div>
              ))}
            </div>

            <Link href="/institutions">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
