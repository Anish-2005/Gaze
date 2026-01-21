'use client'

import { motion } from 'framer-motion'
import { User, GraduationCap, Heart, Globe } from 'lucide-react'

const useCases = [
  {
    icon: <User className="w-8 h-8" />,
    title: 'Accessibility & Independence',
    pain: 'Complete loss of physical communication',
    benefit: 'Regain autonomy through eye-controlled typing and speech',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Inclusive Education',
    pain: 'Students with disabilities excluded from digital learning',
    benefit: 'Equal participation in classrooms with existing devices',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Healthcare & Rehabilitation',
    pain: 'ICU patients unable to communicate basic needs',
    benefit: 'Instant deployment on hospital tablets for critical communication',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'NGOs & Social Programs',
    pain: 'Limited budgets for assistive technology',
    benefit: 'Scale accessibility support 100x within same funding',
    color: 'from-purple-500 to-purple-600',
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Who <span className="text-gradient">benefits</span> from GAZE?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From individuals seeking independence to institutions transforming care
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-hover"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-6">
                  <div className={`bg-gradient-to-br ${useCase.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <div className="text-white">{useCase.icon}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Problem:</span> {useCase.pain}
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Solution:</span> {useCase.benefit}
                        </p>
                      </div>
                    </div>
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