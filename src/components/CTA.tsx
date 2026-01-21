'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Handshake } from 'lucide-react'

export default function Engagement() {
  return (
    <section id="cta" className="py-28 bg-[#0B1220] text-slate-200">
      <div className="max-w-8xl mx-auto px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-white mb-6">
            Engage with the GAZE platform
          </h2>

          <p className="text-lg text-slate-400 mb-16 leading-relaxed">
            GAZE is available for immediate use by individuals and for structured
            deployment by institutions, healthcare providers, and public-sector
            partners.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 mb-24">
            <button className="flex items-center gap-3 px-8 py-4 rounded-md bg-white text-slate-900 font-medium text-lg hover:bg-slate-100 transition">
              <MessageCircle className="w-5 h-5" />
              <span>Access individual use</span>
            </button>

            <button className="flex items-center gap-3 px-8 py-4 rounded-md border border-slate-400 text-slate-200 font-medium text-lg hover:bg-white/5 transition">
              <Handshake className="w-5 h-5" />
              <span>Discuss institutional deployment</span>
            </button>
          </div>

          {/* Assurance Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Immediate availability
              </div>
              <p className="text-slate-400 leading-relaxed">
                The platform can be accessed instantly through a standard web
                browser, with no installation or hardware procurement required.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Privacy and safety by design
              </div>
              <p className="text-slate-400 leading-relaxed">
                All eye-tracking and interaction processing occurs on-device,
                ensuring user data remains private and secure.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Designed for scale
              </div>
              <p className="text-slate-400 leading-relaxed">
                GAZE supports deployment across hospitals, NGOs, and public
                systems without changes to existing infrastructure.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
