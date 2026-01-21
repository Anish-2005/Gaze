'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'

interface InstitutionalHeroProps {
  onScheduleCall: () => void
}

export default function InstitutionalHero({ onScheduleCall }: InstitutionalHeroProps) {
  return (
    <section className="py-12 md:py-24 bg-[#F7F9FC] text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            Institutional Solutions
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-6">
            Deploy assistive communication as <span className="text-slate-600">public infrastructure</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            GAZE is engineered for deployment across hospitals, rehabilitation centers, NGOs,
            and public-sector programs—transforming existing devices into life-changing
            communication tools without hardware costs or infrastructure changes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onScheduleCall}
              className="bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium text-base md:text-lg hover:bg-slate-800 transition-colors"
            >
              Schedule Deployment Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('/demo', '_blank')}
              className="border border-slate-300 text-slate-700 px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium text-base md:text-lg hover:bg-slate-50 transition-colors"
            >
              View Clinical Demo
            </motion.button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Zero Hardware Cost', value: '$0' },
                { label: 'Deployment Time', value: '<5 min' },
                { label: 'Patient Setup', value: '30 sec' },
                { label: 'Device Support', value: 'Unlimited' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">{item.value}</div>
                  <div className="text-xs md:text-sm text-slate-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}