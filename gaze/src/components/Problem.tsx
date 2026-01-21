'use client'

import { motion } from 'framer-motion'
import { DollarSign, ShieldOff, Lock } from 'lucide-react'

const problems = [
  {
    icon: <ShieldOff className="w-8 h-8" />,
    title: 'Traditional input devices fail millions',
    description: 'People with ALS, paralysis, or Locked-In Syndrome cannot speak or type. Traditional input devices fail them daily.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: 'Assistive hardware is unaffordable',
    description: 'Specialized eye-tracking devices cost $10,000+, placing them out of reach for most families and institutions.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Accessibility becomes a luxury',
    description: 'When technology exists but isn\'t accessible, fundamental human connection becomes a privilege.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
]

export default function Problem() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Digital access is not optional.
            <br />
            <span className="text-gradient">It's fundamental.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Millions face communication barriers that shouldn't exist in 2024
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className={`${problem.bgColor} rounded-2xl p-8 h-full card-hover`}>
                <div className={`${problem.color} mb-6`}>
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
                
                {/* Problem Indicator */}
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}