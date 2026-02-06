'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Building2, Users, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

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
    popular: false,
    icon: Users,
    gradient: 'from-slate-500 to-slate-600'
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
    popular: true,
    icon: Building2,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
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
    popular: false,
    icon: Zap,
    gradient: 'from-purple-500 to-pink-600'
  }
]

export default function Pricing() {
  return (
    <section className="relative py-24 sm:py-32 bg-[rgb(var(--section-bg))] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--bg-tertiary))] to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Simple Pricing</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--text-primary))] mb-6">
            Accessible for{' '}
            <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Everyone
            </span>
          </h2>

          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Personal use is always free. Institutions pay to support development
            and unlock advanced clinical features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`group relative rounded-2xl transition-all duration-500 ${plan.popular
                ? 'md:-mt-4 md:mb-4'
                : ''
                }`}
            >
              {/* Glow effect for popular */}
              {plan.popular && (
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              )}

              <div className={`relative h-full p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${plan.popular
                ? 'bg-[rgb(var(--section-bg))] border-[var(--card-border)]'
                : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:bg-black/5 hover:border-black/10'
                }`}>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-bold text-white shadow-lg shadow-blue-500/30">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Plan Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[rgb(var(--text-primary))] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl sm:text-5xl font-bold text-[rgb(var(--text-primary))]">{plan.price}</span>
                    <span className="text-[rgb(var(--text-muted))] text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-[rgb(var(--text-secondary))]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.href} className="block mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group/btn ${plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                      : 'bg-[var(--card-bg)] text-[rgb(var(--text-primary))] border border-[var(--card-border)] hover:bg-black/5'
                      }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-[rgb(var(--text-muted))]"
        >
          {['No credit card required', 'Cancel anytime', '14-day free trial', 'HIPAA compliant'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
