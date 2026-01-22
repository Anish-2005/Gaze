'use client'

import { motion } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'

export default function ClosingStatement() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Our Commitment
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Restoring communication should never compromise dignity
          </h2>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Assistive communication technologies carry profound responsibility.
              They operate at the intersection of human vulnerability and technological capability,
              where every design decision can either empower or diminish.
            </p>

            <p>
              GAZE is built on the conviction that restoring a person's ability to communicate
              must never come at the cost of their privacy, autonomy, or dignity. We believe
              technology should serve people in their most vulnerable moments without creating
              new vulnerabilities.
            </p>

            <p>
              This governance framework isn&apos;t just a compliance document—it&apos;s our operational
              DNA. It guides how we build, deploy, and maintain communication systems for
              people who depend on them for their most basic human connections.
            </p>
          </div>

          {/* Contact for Ethics Inquiries */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold mb-2">Ethics & Governance Inquiries</h4>
                <p className="text-gray-400">
                  For questions about our ethical framework, compliance documentation, or governance practices
                </p>
              </div>
              <a
                href="mailto:ethics@gaze.com"
                className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                ethics@gaze.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}