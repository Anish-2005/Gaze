'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Building2, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Personal',
    price: 'Free',
    period: 'forever',
    description: 'For individuals and families who need accessible communication.',
    features: [
      'Full eye-tracking suite',
      'Word prediction AI',
      'Multiple language support',
      'Offline mode',
      'Community support'
    ],
    cta: 'Get Started Free',
    href: '/demo',
    popular: false
  },
  {
    name: 'Clinical',
    price: '$99',
    period: '/month',
    description: 'For healthcare providers and rehabilitation centers.',
    features: [
      'Everything in Personal',
      'HIPAA compliant hosting',
      'Multi-patient dashboard',
      'Usage analytics',
      'Priority email support',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    href: '/institutions',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For hospital networks and large institutions.',
    features: [
      'Everything in Clinical',
      'Dedicated infrastructure',
      'EHR/EMR integration',
      'On-premise deployment',
      '24/7 phone support',
      'SLA guarantee',
      'Custom development'
    ],
    cta: 'Contact Sales',
    href: '/institutions',
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className="relative py-20 sm:py-32 bg-slate-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Accessible{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Pricing
            </span>
            {' '}for All
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our mission is accessibility. Personal use is always free.
            Institutions pay to support development and get premium features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${plan.popular
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-blue-500/50 shadow-xl shadow-blue-500/10'
                  : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50'
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {plan.name === 'Personal' && <Users className="w-5 h-5 text-slate-400" />}
                  {plan.name === 'Clinical' && <Building2 className="w-5 h-5 text-blue-400" />}
                  {plan.name === 'Enterprise' && <Building2 className="w-5 h-5 text-purple-400" />}
                  <span className="font-semibold text-white">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group ${plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
                    }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 mt-12"
        >
          All plans include unlimited users. No hidden fees. Cancel anytime.
        </motion.p>
      </div>
    </section>
  )
}
