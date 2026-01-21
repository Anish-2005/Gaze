'use client'

import { motion } from 'framer-motion'
import { Calendar, Mail } from 'lucide-react'

interface InstitutionalCTAProps {
  onScheduleCall: () => void
}

export default function InstitutionalCTA({ onScheduleCall }: InstitutionalCTAProps) {
  return (
    <section className="py-12 md:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Transform patient communication at scale
          </h2>

          <p className="text-lg md:text-xl text-slate-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Partner with GAZE to deploy assistive communication infrastructure
            where it's needed most—without capital expenditure or complex IT projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              {
                title: 'Technical Discovery',
                description: '45-minute call to understand your infrastructure and needs',
              },
              {
                title: 'Pilot Planning',
                description: 'Detailed rollout plan for your specific environment',
              },
              {
                title: 'License Activation',
                description: 'Seamless deployment with ongoing support',
              },
            ].map((step, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                <div className="text-slate-300 font-semibold mb-2 text-sm md:text-base">{step.title}</div>
                <div className="text-slate-300 text-xs md:text-sm">{step.description}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onScheduleCall}
              className="bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
            >
              <Calendar className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Schedule Discovery Call
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'mailto:partnerships@gaze.com'}
              className="border-2 border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <Mail className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Email Partnerships
            </motion.button>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
            <p className="text-gray-400 text-sm md:text-base">
              Ready for immediate pilot?
              <button
                onClick={() => window.location.href = 'tel:+15551234567'}
                className="text-white underline hover:text-slate-300 ml-2"
              >
                Call +1 (555) 123-4567
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}