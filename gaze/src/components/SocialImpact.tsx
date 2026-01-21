'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Globe, Zap, DollarSign } from 'lucide-react'

const metrics = [
  {
    icon: <TrendingDown className="w-8 h-8" />,
    value: '90%',
    label: 'cheaper than hardware',
    description: 'Compared to $10,000+ alternatives',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: '0',
    label: 'extra devices needed',
    description: 'Uses existing smartphones & computers',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    value: '10x',
    label: 'faster communication',
    description: 'With AI sentence prediction',
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    value: '∞',
    label: 'global reach',
    description: 'Web-based, no geographical limits',
  },
]

export default function SocialImpact() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The <span className="text-gradient">Social Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Accessibility should scale like software, not hardware
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{metric.icon}</div>
                </div>
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <div className="font-semibold text-gray-900 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.description}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-blue-100">
              <div className="max-w-3xl mx-auto text-center">
                <div className="text-5xl text-blue-600 mb-6">"</div>
                <blockquote className="text-2xl md:text-3xl font-semibold mb-8 text-gray-900">
                  We replaced a $10,000 hardware device with a free web app. 
                  Accessibility should be measured in lives impacted, not dollars spent.
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-400"></div>
                  <div className="text-left">
                    <div className="font-semibold">Compassionate Capitalism</div>
                    <div className="text-gray-600">Our guiding principle</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}