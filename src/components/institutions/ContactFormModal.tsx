'use client'

import { motion } from 'framer-motion'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold">Schedule Discovery Call</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm md:text-base"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm md:text-base"
                placeholder="Hospital/Institution Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm md:text-base"
                placeholder="john@hospital.org"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deployment Interest
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm md:text-base">
                <option>Select primary interest</option>
                <option>Hospital/ICU Deployment</option>
                <option>Rehabilitation Center</option>
                <option>NGO/Nonprofit Program</option>
                <option>Government Initiative</option>
                <option>Research Partnership</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-sm md:text-base"
            >
              Request Call
            </button>
          </form>

          <p className="mt-4 text-xs md:text-sm text-gray-500 text-center">
            We&apos;ll respond within 24 hours to schedule a 45-minute discovery call.
          </p>
        </div>
      </motion.div>
    </div>
  )
}