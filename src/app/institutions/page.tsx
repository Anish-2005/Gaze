'use client'

import { motion } from 'framer-motion'
import { 
  Building2, 
  Stethoscope, 
  Heart, 
  Shield, 
  CheckCircle, 
  Tablet, 
  Users,
  Globe,
  Clock,
  DollarSign,
  Lock,
  FileCheck,
  Target,
  ArrowRight,
  Calendar,
  ChartBar,
  Server,
  Download,
  Phone,
  Mail
} from 'lucide-react'
import { useState } from 'react'

export default function InstitutionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* 1️⃣ INSTITUTIONAL HERO - PUBLIC INFRASTRUCTURE */}
      <section className="relative py-28 bg-gradient-to-b from-white to-blue-50/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4 mr-2" />
              Institutional Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900">Deploy assistive communication</span>
              <span className="block text-gradient mt-2">as public infrastructure</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
              GAZE is engineered for deployment across hospitals, rehabilitation centers, NGOs, 
              and public-sector programs—transforming existing devices into life-changing 
              communication tools without hardware costs or infrastructure changes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Deployment Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/demo', '_blank')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                View Clinical Demo
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Zero Hardware Cost', value: '$0' },
                  { label: 'Deployment Time', value: '<5 min' },
                  { label: 'Patient Setup', value: '30 sec' },
                  { label: 'Device Support', value: 'Unlimited' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ DEPLOYMENT CONTEXTS - MULTI-SECTOR APPLICABILITY */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed for <span className="text-gradient">institutional scale</span>
            </h2>
            <p className="text-lg text-gray-600">
              From bedside communication in ICUs to national accessibility programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: 'Hospitals & ICUs',
                description: 'Enable communication for intubated or temporarily paralyzed patients using shared tablets and existing infrastructure.',
                features: ['Emergency communication', 'No hardware procurement', 'HIPAA compliant'],
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Rehabilitation Centers',
                description: 'Support long-term recovery for stroke, ALS, and spinal injury patients with progressive communication tools.',
                features: ['Therapy integration', 'Progress tracking', 'Customizable interfaces'],
                color: 'from-teal-500 to-teal-600',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'NGOs & Nonprofits',
                description: 'Scale assistive communication programs within constrained budgets across multiple facilities.',
                features: ['Bulk licensing', 'Offline deployment', 'Multi-language support'],
                color: 'from-rose-500 to-rose-600',
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Public Sector Programs',
                description: 'Deploy as national assistive infrastructure through government accessibility initiatives.',
                features: ['Centralized management', 'Local compliance', 'Training programs'],
                color: 'from-purple-500 to-purple-600',
              },
            ].map((context, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-br ${context.color} p-6`}>
                  <div className="text-white">{context.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{context.title}</h3>
                  <p className="text-gray-600 mb-4">{context.description}</p>
                  <ul className="space-y-2">
                    {context.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ HOSPITAL & ICU WORKFLOW - CLINICAL REALITY */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Hospital & ICU workflow</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Deployable at bedside within minutes using existing hospital devices—no IT department involvement required.
              </p>
            </div>

            {/* Clinical Workflow Steps */}
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 transform -translate-y-1/2 z-0" />

              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {[
                  {
                    step: '1',
                    title: 'Device Preparation',
                    description: 'Load GAZE onto any hospital tablet, iPad, or laptop',
                    icon: <Tablet className="w-8 h-8" />,
                    details: ['2-minute installation', 'Works offline', 'No patient data stored'],
                  },
                  {
                    step: '2',
                    title: 'Bedside Setup',
                    description: 'Position device, calibrate gaze in 30 seconds',
                    icon: <Clock className="w-8 h-8" />,
                    details: ['Single calibration', 'Works in any lighting', 'Adaptive to movement'],
                  },
                  {
                    step: '3',
                    title: 'Patient Communication',
                    description: 'Immediate eye-controlled typing and speech',
                    icon: <Users className="w-8 h-8" />,
                    details: ['Emergency phrases', 'Pain communication', 'Basic needs'],
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative"
                  >
                    {/* Step indicator */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-xl font-bold">
                      {step.step}
                    </div>

                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mb-4">
                        <div className="text-blue-600">{step.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Clinical Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200 p-8"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { value: '5 min', label: 'Average deployment time' },
                  { value: '30 sec', label: 'Patient setup time' },
                  { value: '0%', label: 'Hardware failure risk' },
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ PARTNERSHIP & LICENSING MODEL - ETHICAL REVENUE */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Institutional <span className="text-gradient">licensing model</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Flat annual licensing enabling unlimited usage across shared devices—designed for institutional budgets and scale.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Pricing Model */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
              >
                <div className="flex items-center mb-6">
                  <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold">Annual Institutional License</h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">$5,000</span>
                    <span className="text-gray-600 ml-2">/year per institution</span>
                  </div>
                  <p className="text-gray-600">
                    Unlimited usage across all devices and patients
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'No per-device or per-user fees',
                    'Unlimited patient deployments',
                    'Priority technical support',
                    'Regular software updates',
                    'Training materials included',
                    'Bulk access management',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <strong>Comparison:</strong> Traditional hardware solutions cost $10,000+ per device
                  </div>
                </div>
              </motion.div>

              {/* Deployment Options */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  {
                    title: 'Standard Cloud Deployment',
                    description: 'For institutions with reliable internet',
                    features: ['Automatic updates', 'Usage analytics', 'Cloud backups'],
                    icon: <Server className="w-6 h-6" />,
                  },
                  {
                    title: 'Offline / Air-Gapped',
                    description: 'For high-security environments',
                    features: ['No internet required', 'Local data only', 'Manual updates'],
                    icon: <Lock className="w-6 h-6" />,
                  },
                  {
                    title: 'Hybrid Model',
                    description: 'Mix of cloud and offline deployments',
                    features: ['Flexible deployment', 'Centralized management', 'Local processing'],
                    icon: <ChartBar className="w-6 h-6" />,
                  },
                ].map((option, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <div className="text-blue-600">{option.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">{option.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                        <ul className="flex flex-wrap gap-2">
                          {option.features.map((feature, i) => (
                            <li key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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

      {/* 5️⃣ COMPLIANCE & GOVERNANCE - RISK REMOVAL */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Compliance & governance</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Engineered for healthcare environments with zero data privacy risk
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Lock className="w-8 h-8" />,
                  title: 'On-Device Processing',
                  description: 'All eye tracking and processing happens locally. No video or biometric data ever leaves the device.',
                  standards: ['HIPAA compliant', 'GDPR ready', 'No cloud storage'],
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'No Biometric Storage',
                  description: 'We never store, transmit, or process identifiable biometric data. Only gaze coordinates are used temporarily.',
                  standards: ['No facial data', 'No iris patterns', 'Ephemeral processing'],
                },
                {
                  icon: <FileCheck className="w-8 h-8" />,
                  title: 'Healthcare Ready',
                  description: 'Designed specifically for hospital IT requirements, including air-gapped networks and legacy systems.',
                  standards: ['Offline mode', 'Legacy support', 'IT admin tools'],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mb-6">
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <div className="space-y-2">
                    {item.standards.map((standard, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {standard}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Compliance Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200"
            >
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { label: 'HIPAA Compliant', color: 'bg-blue-100 text-blue-800' },
                  { label: 'GDPR Ready', color: 'bg-teal-100 text-teal-800' },
                  { label: 'ISO 27001 Framework', color: 'bg-purple-100 text-purple-800' },
                  { label: 'SOC 2 Type II', color: 'bg-amber-100 text-amber-800' },
                ].map((badge, index) => (
                  <div key={index} className={`px-4 py-2 rounded-full ${badge.color} font-medium`}>
                    {badge.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6️⃣ PILOT & ROLLOUT PLAN - FEASIBILITY */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Pilot & rollout plan</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Phased implementation focusing on measurable impact and sustainable scale
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-teal-500 transform -translate-x-1/2" />

              {[
                {
                  phase: 'Phase 1',
                  title: 'Pilot Deployment',
                  duration: 'Months 1-3',
                  description: 'Small-scale deployment in 2-3 hospital units',
                  deliverables: ['User feedback collection', 'Clinical workflow integration', 'IT compatibility validation'],
                  align: 'left',
                },
                {
                  phase: 'Phase 2',
                  title: 'Department Rollout',
                  duration: 'Months 4-6',
                  description: 'Expand to entire departments or specialized units',
                  deliverables: ['Staff training programs', 'Usage analytics setup', 'Support system establishment'],
                  align: 'right',
                },
                {
                  phase: 'Phase 3',
                  title: 'Institutional Scale',
                  duration: 'Months 7-12',
                  description: 'Full institutional deployment across all relevant units',
                  deliverables: ['Centralized management', 'Bulk licensing activation', 'Long-term support plan'],
                  align: 'left',
                },
                {
                  phase: 'Phase 4',
                  title: 'Multi-Site Expansion',
                  duration: 'Year 2+',
                  description: 'Expand to sister hospitals or partner institutions',
                  deliverables: ['Cross-institution training', 'Regional support centers', 'Custom feature development'],
                  align: 'right',
                },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: phase.align === 'left' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative mb-12 ${phase.align === 'left' ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'} pl-0`}
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold mr-4">
                        {phase.phase.split(' ')[1]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{phase.title}</h3>
                        <div className="text-blue-600 font-medium">{phase.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{phase.description}</p>
                    
                    <div className="space-y-3">
                      {phase.deliverables.map((deliverable, i) => (
                        <div key={i} className="flex items-center">
                          <Target className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute top-8 w-6 h-6 rounded-full bg-white border-4 border-blue-500 transform -translate-x-1/2"
                    style={{ left: '50%' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ INSTITUTIONAL CTA - SERIOUS ENGAGEMENT */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform patient communication at scale
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Partner with GAZE to deploy assistive communication infrastructure 
              where it's needed most—without capital expenditure or complex IT projects.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'Technical Discovery',
                  description: '45-minute call to understand your infrastructure and needs',
                },
                {
                  title: 'Pilot Planning',
                  description: 'Detailed rollout plan for your specific environment',
                },
                {
                  title: 'License Activation',
                  description: 'Seamless deployment with ongoing support',
                },
              ].map((step, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-blue-300 font-semibold mb-2">{step.title}</div>
                  <div className="text-gray-300">{step.description}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(true)}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Discovery Call
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'mailto:partnerships@gaze.com'}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Partnerships
              </motion.button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-gray-400">
                Ready for immediate pilot? 
                <button 
                  onClick={() => window.location.href = 'tel:+15551234567'}
                  className="text-white underline hover:text-blue-300 ml-2"
                >
                  Call +1 (555) 123-4567
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Schedule Discovery Call</h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hospital/Institution Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@hospital.org"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deployment Interest
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Request Call
                </button>
              </form>
              
              <p className="mt-4 text-sm text-gray-500 text-center">
                We'll respond within 24 hours to schedule a 45-minute discovery call.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}