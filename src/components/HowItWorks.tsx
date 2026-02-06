'use client'

import { motion } from 'framer-motion'
import { Camera, Brain, MessageSquare, Monitor, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Camera Access',
    description: 'Patient opens GAZE in any browser. The system requests camera access – no downloads needed.',
    icon: Camera,
    color: 'blue'
  },
  {
    number: '02',
    title: 'AI Calibration',
    description: 'Quick 30-second calibration adapts to the patient\'s unique eye movements and positioning.',
    icon: Brain,
    color: 'purple'
  },
  {
    number: '03',
    title: 'Gaze Detection',
    description: 'Real-time AI tracks eye position with sub-100ms latency, mapping gaze to screen coordinates.',
    icon: Monitor,
    color: 'teal'
  },
  {
    number: '04',
    title: 'Communication',
    description: 'Patients select letters, words, or phrases by looking. AI predicts and accelerates typing.',
    icon: MessageSquare,
    color: 'emerald'
  }
]

const colorClasses = {
  blue: { bg: 'bg-blue-500', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  purple: { bg: 'bg-purple-500', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  teal: { bg: 'bg-teal-500', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/20' },
  emerald: { bg: 'bg-emerald-500', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' }
}

export default function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-32 bg-[rgb(var(--section-bg))] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--bg-tertiary))] to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">How It Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--text-primary))] mb-6">
            Simple.{' '}
            <span style={{ background: 'linear-gradient(to right, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Powerful.
            </span>
            {' '}Accessible.
          </h2>

          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            From camera access to conversation in under a minute.
            No technical expertise required.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses]
            const isLast = index === steps.length - 1

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3.5rem)] bg-gradient-to-b from-[rgb(var(--bg-tertiary))] to-[rgb(var(--bg-secondary))]" />
                )}

                {/* Step Number */}
                <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center shadow-xl ${colors.glow}`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className={`inline-block text-xs font-semibold ${colors.text} mb-2`}>
                    STEP {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
                    {step.description}
                  </p>

                  {!isLast && (
                    <div className="mt-4">
                      <ArrowRight className="w-4 h-4 text-[rgb(var(--text-muted))]" />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '30s', label: 'Calibration time' },
            { value: '<100ms', label: 'Response latency' },
            { value: '98.5%', label: 'Accuracy rate' },
            { value: '0', label: 'Downloads needed' }
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
              <div className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-1">{stat.value}</div>
              <div className="text-xs text-[rgb(var(--text-muted))]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
