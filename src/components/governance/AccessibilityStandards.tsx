'use client'

import { motion } from 'framer-motion'

export default function AccessibilityStandards() {
  return (
    <section className="py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Accessibility standards
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Designed to WCAG 2.1 AA standards with additional considerations for severe motor impairments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Visual & Interaction Standards */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Visual & Interaction Standards</h3>
              {[
                {
                  title: 'High Contrast Interface',
                  description: 'Minimum 4.5:1 contrast ratio with adjustable themes for varying visual capabilities',
                  icon: '👁️',
                },
                {
                  title: 'Adjustable Dwell Timing',
                  description: 'User-configurable dwell times from 0.5 to 3 seconds to match motor capabilities',
                  icon: '⏱️',
                },
                {
                  title: 'Predictable Focus States',
                  description: 'Clear, consistent visual indicators for gaze focus and selection states',
                  icon: '🎯',
                },
                {
                  title: 'Reduced Motion Options',
                  description: 'Ability to minimize or eliminate animations that could cause discomfort or distraction',
                  icon: '🌀',
                },
              ].map((standard, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-4">{standard.icon}</span>
                  <div>
                    <h4 className="font-medium mb-1">{standard.title}</h4>
                    <p className="text-sm text-gray-600">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical & Compatibility Standards */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Technical & Compatibility Standards</h3>
              {[
                {
                  title: 'Screen Reader Compatibility',
                  description: 'Full support for NVDA, JAWS, VoiceOver, and TalkBack with semantic HTML structure',
                  icon: '🔊',
                },
                {
                  title: 'Keyboard Navigation',
                  description: 'Complete keyboard-only operation for users who can only use a single switch',
                  icon: '⌨️',
                },
                {
                  title: 'Multilingual Support',
                  description: 'Interface and predictive text in 20+ languages with RTL language support',
                  icon: '🌍',
                },
                {
                  title: 'Low-Literacy Modes',
                  description: 'Symbol-based communication and phrase prediction for users with literacy challenges',
                  icon: '📝',
                },
              ].map((standard, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-4">{standard.icon}</span>
                  <div>
                    <h4 className="font-medium mb-1">{standard.title}</h4>
                    <p className="text-sm text-gray-600">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WCAG Compliance Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold mb-2">WCAG 2.1 AA Compliance</h4>
                <p className="text-slate-600">
                  All interfaces are tested against WCAG 2.1 AA standards. We maintain an
                  accessibility statement and welcome feedback from users with disabilities.
                </p>
              </div>
              <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium">
                WCAG 2.1 AA
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}