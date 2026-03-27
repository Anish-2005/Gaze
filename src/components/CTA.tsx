'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="section-shell-alt pb-24 sm:pb-28">
      <div className="section-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="surface-card-strong mx-auto max-w-4xl p-8 text-center sm:p-12"
        >
          <div className="section-badge mx-auto mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Next step
          </div>

          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Ready to deploy accessible communication with confidence?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
            Experience the live product and review deployment options for your team. Start quickly, then scale with governance and support.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="btn-brand btn-shimmer">
              <Eye className="h-4 w-4" />
              Open Live Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/institutions" className="btn-secondary">
              View Institutional Path
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
            <span>No signup required</span>
            <span>Works on modern devices</span>
            <span>Personal use stays free</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

