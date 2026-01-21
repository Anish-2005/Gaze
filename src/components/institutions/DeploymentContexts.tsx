'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Users, Heart, Globe, CheckCircle } from 'lucide-react'

export default function DeploymentContexts() {
  return (
    <section className="py-12 md:py-24 bg-white text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            Designed for <span className="text-slate-600">institutional scale</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 px-4">
            From bedside communication in ICUs to national accessibility programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {[
            {
              icon: <Stethoscope className="w-6 md:w-8 h-6 md:h-8" />,
              title: 'Hospitals & ICUs',
              description: 'Enable communication for intubated or temporarily paralyzed patients using shared tablets and existing infrastructure.',
              features: ['Emergency communication', 'No hardware procurement', 'HIPAA compliant'],
            },
            {
              icon: <Users className="w-6 md:w-8 h-6 md:h-8" />,
              title: 'Rehabilitation Centers',
              description: 'Support long-term recovery for stroke, ALS, and spinal injury patients with progressive communication tools.',
              features: ['Therapy integration', 'Progress tracking', 'Customizable interfaces'],
            },
            {
              icon: <Heart className="w-6 md:w-8 h-6 md:h-8" />,
              title: 'NGOs & Nonprofits',
              description: 'Scale assistive communication programs within constrained budgets across multiple facilities.',
              features: ['Bulk licensing', 'Offline deployment', 'Multi-language support'],
            },
            {
              icon: <Globe className="w-6 md:w-8 h-6 md:h-8" />,
              title: 'Public Sector Programs',
              description: 'Deploy as national assistive infrastructure through government accessibility initiatives.',
              features: ['Centralized management', 'Local compliance', 'Training programs'],
            },
          ].map((context, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4 md:mb-6">
                <div className="text-slate-600">{context.icon}</div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">{context.title}</h3>
              <p className="text-slate-600 mb-4 text-sm md:text-base">{context.description}</p>
              <ul className="space-y-2">
                {context.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-xs md:text-sm text-slate-500">
                    <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}