'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: 'color-mix(in oklab, rgb(var(--bg-primary)) 76%, black 24%)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Schedule Discovery Call"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="surface-card-strong max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold sm:text-2xl">Schedule Discovery Call</h3>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border transition"
            style={{ borderColor: 'var(--card-border)', color: 'rgb(var(--text-secondary))' }}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4">
          {[{ label: 'Name', type: 'text', placeholder: 'John Smith' },
            { label: 'Organization', type: 'text', placeholder: 'Hospital or institution name' },
            { label: 'Email', type: 'email', placeholder: 'john@hospital.org' }].map((field) => (
            <div key={field.label}>
              <label className="mb-2 block text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                className="w-full rounded-xl border px-4 py-2.5 text-sm"
                style={{
                  borderColor: 'var(--card-border)',
                  background: 'var(--card-bg)',
                  color: 'rgb(var(--text-primary))',
                }}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
              Deployment Interest
            </label>
            <select
              className="w-full rounded-xl border px-4 py-2.5 text-sm"
              style={{
                borderColor: 'var(--card-border)',
                background: 'var(--card-bg)',
                color: 'rgb(var(--text-primary))',
              }}
              defaultValue=""
            >
              <option value="" disabled>Select primary interest</option>
              <option>Hospital or ICU deployment</option>
              <option>Rehabilitation center</option>
              <option>NGO or nonprofit program</option>
              <option>Government initiative</option>
              <option>Research partnership</option>
            </select>
          </div>

          <button type="submit" className="btn-brand w-full justify-center">
            Request Call
          </button>
        </form>

        <p className="mt-4 text-center text-xs sm:text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
          Response time is typically within 24 hours for scheduling.
        </p>
      </motion.div>
    </div>
  )
}
