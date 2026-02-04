'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
  Globe,
  Eye,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  Platform: [
    { label: 'System Overview', href: '#' },
    { label: 'Accessibility Standards', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Open Architecture', href: '#' },
  ],
  Institutions: [
    { label: 'Hospitals & ICUs', href: '#' },
    { label: 'Public Sector Deployment', href: '#' },
    { label: 'NGO Partnerships', href: '#' },
    { label: 'Insurance & Reimbursement', href: '#' },
  ],
  Governance: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Ethical Guidelines', href: '#' },
    { label: 'Data Protection', href: '#' },
    { label: 'Regulatory Compliance', href: '#' },
  ],
}

const trustSignals = [
  { icon: ShieldCheck, text: 'Privacy-first, on-device processing' },
  { icon: FileText, text: 'Designed for healthcare compliance' },
  { icon: Globe, text: 'Globally deployable, web-based system' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-slate-300 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.07, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-8xl mx-auto px-5 sm:px-6 lg:px-12 py-14 sm:py-16 relative z-10">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14 sm:mb-16">

          {/* Brand */}
          <motion.div
            className="lg:col-span-2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/20 transition-shadow"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Eye className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <div className="text-2xl font-semibold text-white tracking-tight group-hover:text-gradient transition-all">
                  GAZE
                </div>
                <div className="text-xs text-slate-500">
                  Assistive Communication Infrastructure
                </div>
              </div>
            </Link>

            <p className="max-w-md mx-auto lg:mx-0 text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
              GAZE is a software-based assistive communication system designed
              to restore basic human interaction for individuals who are unable
              to speak or use traditional input devices.
            </p>

            <div className="space-y-3 text-sm flex flex-col items-center lg:items-start">
              <motion.a
                href="mailto:contact@gaze.global"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span>contact@gaze.global</span>
              </motion.a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Global • Distributed deployment</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:col-span-3">
            {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  {section}
                </h4>
                <ul className="space-y-3 text-sm">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Trust Signals */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {trustSignals.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="flex items-center justify-center sm:justify-start gap-3 text-sm text-slate-400 glass-card px-4 py-3 rounded-xl"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span>{item.text}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col md:flex-row gap-6 justify-between items-center text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center md:text-left leading-relaxed">
            <span className="text-slate-500">©</span> {new Date().getFullYear()} GAZE.
            <span className="hidden md:inline"> •</span>
            <br className="md:hidden" />
            <span className="text-slate-500"> Assistive communication as public infrastructure.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy', 'Terms', 'Accessibility', 'Compliance'].map((link, i) => (
              <motion.a
                key={link}
                href="#"
                className="text-slate-400 hover:text-white transition-colors relative group"
                whileHover={{ y: -1 }}
              >
                {link}
                <span className="absolute left-0 bottom-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
