'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Handshake } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section id="cta" className="bg-[#0B1220] text-slate-200 py-20 sm:py-24 lg:py-28">
      <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl text-center sm:text-left"
        >
          <h2 className="font-semibold leading-tight text-white mb-5 text-[clamp(1.6rem,5vw,2.25rem)] lg:text-[clamp(2rem,3vw,2.5rem)]">
            Engage with the GAZE platform
          </h2>

          <p className="text-slate-400 leading-relaxed mb-12 sm:mb-14 text-base sm:text-lg">
            GAZE is available for immediate use by individuals and for structured
            deployment by institutions, healthcare providers, and public-sector
            partners.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 sm:mb-20 justify-center sm:justify-start">
            <Link href="/demo" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md bg-white text-slate-900 font-medium text-base sm:text-lg hover:bg-slate-100 transition">
                <MessageCircle className="w-5 h-5" />
                <span>Access individual use</span>
              </button>
            </Link>

            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md border border-slate-400 text-slate-200 font-medium text-base sm:text-lg hover:bg-white/5 transition">
              <Handshake className="w-5 h-5" />
              <span>Discuss institutional deployment</span>
            </button>
          </div>

          {/* Assurance Grid */}
          <div className="grid gap-10 sm:gap-12 md:grid-cols-3 text-left">
            <div>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Immediate availability
              </div>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                The platform can be accessed instantly through a standard web
                browser, with no installation or hardware procurement required.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Privacy and safety by design
              </div>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                All eye-tracking and interaction processing occurs on-device,
                ensuring user data remains private and secure.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Designed for scale
              </div>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
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
