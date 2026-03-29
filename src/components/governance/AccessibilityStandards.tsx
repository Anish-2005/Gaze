'use client'

import { motion } from 'framer-motion'
import { Eye, FileText, Globe, Keyboard, RotateCcw, Target, Timer, Volume2 } from 'lucide-react'

const visualStandards = [
  {
    icon: Eye,
    title: 'High-contrast interface',
    description: 'Contrast and legibility support users with varied visual capability needs.',
  },
  {
    icon: Timer,
    title: 'Adjustable dwell timing',
    description: 'Dwell windows can be tuned to match motor precision and fatigue patterns.',
  },
  {
    icon: Target,
    title: 'Predictable focus states',
    description: 'Consistent state signaling reduces cognitive load and ambiguity.',
  },
  {
    icon: RotateCcw,
    title: 'Reduced-motion option',
    description: 'Motion effects can be minimized for vestibular comfort and clarity.',
  },
]

const technicalStandards = [
  {
    icon: Volume2,
    title: 'Screen reader compatibility',
    description: 'Semantic structure supports NVDA, VoiceOver, TalkBack, and related tooling.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard operation path',
    description: 'Core workflows remain accessible through keyboard-only interaction.',
  },
  {
    icon: Globe,
    title: 'Multilingual support',
    description: 'Interface and communication outputs support broad language coverage.',
  },
  {
    icon: FileText,
    title: 'Low-literacy modes',
    description: 'Phrase and symbol-assisted flows reduce literacy burden in urgent contexts.',
  },
]

export default function AccessibilityStandards() {
  return (
    <section className="section-shell-alt">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Accessibility standards for severe motor and speech impairment use cases.</h2>
          <p className="section-subtitle mx-auto">
            WCAG-aligned design plus assistive interaction safeguards for clinical communication contexts.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <h3 className="text-xl font-semibold">Visual and interaction standards</h3>
            <div className="mt-5 space-y-4">
              {visualStandards.map((item) => (
                <article key={item.title} className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="text-xl font-semibold">Technical compatibility standards</h3>
            <div className="mt-5 space-y-4">
              {technicalStandards.map((item) => (
                <article key={item.title} className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card-strong mt-8 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-base font-semibold">WCAG 2.1 AA alignment</h4>
            <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Interfaces are tested against WCAG criteria and reviewed with disability-centered feedback loops.
            </p>
          </div>
          <span className="rounded-lg border px-3 py-1.5 text-sm font-semibold" style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
            WCAG 2.1 AA
          </span>
        </div>
      </div>
    </section>
  )
}
