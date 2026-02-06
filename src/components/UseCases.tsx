'use client'

import { motion } from 'framer-motion'
import { Hospital, Home, GraduationCap, Stethoscope, HeartPulse, Building2 } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const useCases = [
  {
    title: 'Intensive Care Units',
    description: 'Enable communication for ventilated patients who cannot speak or move. Quick deployment when every moment matters.',
    icon: HeartPulse,
    gradient: 'from-red-500 to-rose-600',
    stats: { value: '47%', label: 'of ICU patients' }
  },
  {
    title: 'Rehabilitation Centers',
    description: 'Support stroke and TBI recovery with adaptive communication tools that grow with patient progress.',
    icon: Hospital,
    gradient: 'from-blue-500 to-cyan-600',
    stats: { value: '2.4M', label: 'stroke survivors/yr' }
  },
  {
    title: 'Home Care',
    description: 'Empower patients with ALS, MS, and other conditions to communicate independently from home.',
    icon: Home,
    gradient: 'from-emerald-500 to-teal-600',
    stats: { value: '30K+', label: 'US ALS patients' }
  },
  {
    title: 'Research Institutions',
    description: 'Conduct accessible communication research with standardized, affordable eye-tracking.',
    icon: GraduationCap,
    gradient: 'from-purple-500 to-violet-600',
    stats: { value: '500+', label: 'research labs' }
  },
  {
    title: 'Pediatric Care',
    description: 'Child-friendly interfaces designed for young patients with communication challenges.',
    icon: Stethoscope,
    gradient: 'from-pink-500 to-rose-600',
    stats: { value: '1 in 68', label: 'children affected' }
  },
  {
    title: 'Senior Care Facilities',
    description: 'Bridge communication gaps for elderly patients with dementia or reduced mobility.',
    icon: Building2,
    gradient: 'from-amber-500 to-orange-600',
    stats: { value: '5.8M', label: 'with dementia' }
  }
]

export default function UseCases() {
  return (
    <section className="relative py-20 sm:py-32 bg-slate-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Hospital className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Use Cases</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Built for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Real-World Impact
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From emergency rooms to living rooms, GAZE adapts to diverse
            healthcare environments and patient needs.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <useCase.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {useCase.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {useCase.description}
              </p>

              {/* Stats */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{useCase.stats.value}</span>
                  <span className="text-xs text-slate-500">{useCase.stats.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
