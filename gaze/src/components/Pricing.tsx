'use client'

import { motion } from 'framer-motion'
import { Check, Star, Building2 } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Gaze Basic',
    icon: <Check className="w-6 h-6" />,
    price: 'Free',
    period: 'Forever',
    description: 'Ensuring no one is denied communication due to cost',
    features: [
      'Core eye-tracking keyboard',
      'Standard text-to-speech',
      'Basic calibration',
      'Works in browser',
      'Community support',
    ],
    cta: 'Get Started Free',
    color: 'from-blue-500 to-blue-600',
    popular: false,
  },
  {
    name: 'Gaze Pro',
    icon: <Star className="w-6 h-6" />,
    price: '$10',
    period: '/month',
    description: 'For those who need enhanced communication',
    features: [
      'AI prediction (GPT-4o) - 10x faster',
      'Personal voice cloning',
      'Cloud sync across devices',
      'Priority support',
      'Advanced customization',
      'Offline mode',
    ],
    cta: 'Start Free Trial',
    color: 'from-teal-500 to-teal-600',
    popular: true,
  },
  {
    name: 'Institutions',
    icon: <Building2 className="w-6 h-6" />,
    price: 'Custom',
    period: 'licensing',
    description: 'Hospitals, NGOs, and large organizations',
    features: [
      'Flat yearly fee per institution',
      'Unlimited deployment',
      'Offline deployment options',
      'Admin dashboard & reporting',
      'Bulk access management',
      'HIPAA compliance',
    ],
    cta: 'Contact Sales',
    color: 'from-purple-500 to-purple-600',
    popular: false,
  },
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Compassionate</span> Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Impact-driven pricing designed to be affordable at scale
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`bg-white rounded-2xl p-8 h-full border-2 ${
                plan.popular ? 'border-teal-200 shadow-xl' : 'border-gray-100 shadow-lg'
              }`}>
                <div className="mb-6">
                  <div className={`bg-gradient-to-br ${plan.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <div className="text-white">{plan.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                }`}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600">
            * We work with insurance providers and government programs for reimbursement.
            <br />
            Contact us about Medicaid/Medicare and ADIP scheme coverage.
          </p>
        </motion.div>
      </div>
    </section>
  )
}