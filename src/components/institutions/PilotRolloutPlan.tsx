'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

export default function PilotRolloutPlan() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Pilot & rollout plan
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Phased implementation focusing on measurable impact and sustainable scale
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-300 transform -translate-x-1/2" />

            {[
              {
                phase: 'Phase 1',
                title: 'Pilot Deployment',
                duration: 'Months 1-3',
                description: 'Small-scale deployment in 2-3 hospital units',
                deliverables: ['User feedback collection', 'Clinical workflow integration', 'IT compatibility validation'],
                align: 'left',
              },
              {
                phase: 'Phase 2',
                title: 'Department Rollout',
                duration: 'Months 4-6',
                description: 'Expand to entire departments or specialized units',
                deliverables: ['Staff training programs', 'Usage analytics setup', 'Support system establishment'],
                align: 'right',
              },
              {
                phase: 'Phase 3',
                title: 'Institutional Scale',
                duration: 'Months 7-12',
                description: 'Full institutional deployment across all relevant units',
                deliverables: ['Centralized management', 'Bulk licensing activation', 'Long-term support plan'],
                align: 'left',
              },
              {
                phase: 'Phase 4',
                title: 'Multi-Site Expansion',
                duration: 'Year 2+',
                description: 'Expand to sister hospitals or partner institutions',
                deliverables: ['Cross-institution training', 'Regional support centers', 'Custom feature development'],
                align: 'right',
              },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: phase.align === 'left' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-8 md:mb-12 ${phase.align === 'left' ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'} pl-0`}
              >
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold mr-3 md:mr-4 text-sm md:text-base">
                      {phase.phase.split(' ')[1]}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">{phase.title}</h3>
                      <div className="text-slate-600 font-medium text-sm md:text-base">{phase.duration}</div>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">{phase.description}</p>

                  <div className="space-y-2 md:space-y-3">
                    {phase.deliverables.map((deliverable, i) => (
                      <div key={i} className="flex items-center">
                        <Target className="w-3 md:w-4 h-3 md:h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-slate-600">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block absolute top-6 md:top-8 w-5 md:w-6 h-5 md:h-6 rounded-full bg-white border-4 border-slate-400 transform -translate-x-1/2"
                  style={{ left: '50%' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}