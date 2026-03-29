'use client'

import { motion } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'

export default function ClosingStatement() {
  return (
    <section className="section-shell pb-24 sm:pb-28">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="surface-card-strong mx-auto max-w-5xl p-8 sm:p-10"
        >
          <div className="section-badge mb-5 inline-flex" style={{ color: 'rgb(var(--accent-rose))' }}>
            <Heart className="h-3.5 w-3.5" />
            Our commitment
          </div>

          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Restoring communication should never compromise dignity.
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
            <p>
              Assistive communication technologies carry deep responsibility. They operate where human vulnerability and
              technical decisions directly intersect.
            </p>
            <p>
              GAZE is built on the principle that communication recovery must not come at the cost of privacy,
              autonomy, or human dignity.
            </p>
            <p>
              This framework is operational guidance, not abstract policy. It governs how we build, deploy, and maintain
              systems for people who depend on communication access in critical moments.
            </p>
          </div>

          <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--card-border)' }}>
            <h4 className="text-base font-semibold">Ethics and governance inquiries</h4>
            <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              For compliance documentation, governance reviews, or ethics questions.
            </p>
            <a href="mailto:ethics@gaze.com" className="btn-secondary mt-4 inline-flex">
              <Mail className="h-4 w-4" />
              ethics@gaze.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
