'use client'

import { motion } from 'framer-motion'
import { DollarSign, Server, Lock, ChartBar, CheckCircle } from 'lucide-react'

export default function LicensingModel() {
  return (
    <section className="py-12 md:py-24 bg-white text-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
              Institutional <span className="text-slate-600">licensing model</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Flat annual licensing enabling unlimited usage across shared devices—designed for institutional budgets and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Pricing Model */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-xl p-6 md:p-8"
            >
              <div className="flex items-center mb-4 md:mb-6">
                <DollarSign className="w-6 md:w-8 h-6 md:h-8 text-slate-600 mr-3" />
                <h3 className="text-xl md:text-2xl font-semibold">Annual Institutional License</h3>
              </div>

              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl md:text-4xl font-semibold">$5,000</span>
                  <span className="text-slate-600 ml-2 text-sm md:text-base">/year per institution</span>
                </div>
                <p className="text-slate-600 text-sm md:text-base">
                  Unlimited usage across all devices and patients
                </p>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  'No per-device or per-user fees',
                  'Unlimited patient deployments',
                  'Priority technical support',
                  'Regular software updates',
                  'Training materials included',
                  'Bulk access management',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs md:text-sm text-slate-700">
                  <strong>Comparison:</strong> Traditional hardware solutions cost $10,000+ per device
                </div>
              </div>
            </motion.div>

            {/* Deployment Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              {[
                {
                  title: 'Standard Cloud Deployment',
                  description: 'For institutions with reliable internet',
                  features: ['Automatic updates', 'Usage analytics', 'Cloud backups'],
                  icon: <Server className="w-5 md:w-6 h-5 md:h-6" />,
                },
                {
                  title: 'Offline / Air-Gapped',
                  description: 'For high-security environments',
                  features: ['No internet required', 'Local data only', 'Manual updates'],
                  icon: <Lock className="w-5 md:w-6 h-5 md:h-6" />,
                },
                {
                  title: 'Hybrid Model',
                  description: 'Mix of cloud and offline deployments',
                  features: ['Flexible deployment', 'Centralized management', 'Local processing'],
                  icon: <ChartBar className="w-5 md:w-6 h-5 md:h-6" />,
                },
              ].map((option, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-slate-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <div className="text-slate-600">{option.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold md:font-bold mb-1 md:mb-2 text-sm md:text-base">{option.title}</h4>
                      <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-3">{option.description}</p>
                      <ul className="flex flex-wrap gap-1 md:gap-2">
                        {option.features.map((feature, i) => (
                          <li key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}