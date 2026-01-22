'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  EyeOff, 
  Users, 
  Heart, 
  AlertTriangle,
  FileText,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Globe,
  BookOpen,
  Mail,
  ArrowRight,
  ShieldCheck,
  Gavel,
  Fingerprint,
  Cpu,
  Database,
  Server,
  Network,
  WifiOff
} from 'lucide-react'

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1️⃣ GOVERNANCE HERO - SERIOUS, AUTHORITATIVE */}
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
              <Shield className="w-4 h-4 mr-2" />
              Governance Framework
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900">Ethics, privacy, and</span>
              <span className="block text-gradient mt-2">accessible by design</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
              GAZE is engineered as assistive communication infrastructure with ethical principles 
              embedded at every layer. This framework ensures we restore communication capabilities 
              without compromising user dignity, privacy, or autonomy.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: <Lock className="w-5 h-5" />, label: 'Zero Biometric Storage' },
                { icon: <Cpu className="w-5 h-5" />, label: 'On-Device Processing' },
                { icon: <Users className="w-5 h-5" />, label: 'User-Led Design' },
                { icon: <Gavel className="w-5 h-5" />, label: 'Regulatory Alignment' },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ ETHICAL DESIGN PRINCIPLES - CORE VALUES */}
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
                Ethical <span className="text-gradient">design principles</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Principles that guide every design decision, prioritizing dignity, autonomy, and user agency
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  title: 'Dignity & Agency',
                  description: 'Communication support designed to enhance autonomy, never infantilize or control.',
                  principles: [
                    'User-led interaction pacing',
                    'No forced responses',
                    'Communication autonomy preserved',
                  ],
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: 'Consent by Design',
                  description: 'Explicit, continuous control over when tracking is active and what data is processed.',
                  principles: [
                    'Granular consent controls',
                    'Tracking status always visible',
                    'One-touch pause functionality',
                  ],
                  color: 'from-teal-500 to-teal-600',
                },
                {
                  icon: <XCircle className="w-8 h-8" />,
                  title: 'Non-Extractive AI',
                  description: 'Models serve users without exploiting their data for training or behavioral insights.',
                  principles: [
                    'No user data in training',
                    'No behavioral profiling',
                    'Transparent model limitations',
                  ],
                  color: 'from-purple-500 to-purple-600',
                },
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`bg-gradient-to-br ${principle.color} p-6`}>
                    <div className="text-white">{principle.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                    <p className="text-gray-600 mb-6">{principle.description}</p>
                    <ul className="space-y-3">
                      {principle.principles.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Principles */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 grid md:grid-cols-2 gap-6"
            >
              {[
                {
                  title: 'Power Imbalance Awareness',
                  description: 'Designed for users who cannot easily opt-out or advocate for themselves. Includes caregiver controls that respect user agency.',
                  icon: <AlertTriangle className="w-5 h-5" />,
                },
                {
                  title: 'Minimal Viable Technology',
                  description: 'Use the simplest effective solution. Avoid unnecessary complexity or features that could compromise reliability or understanding.',
                  icon: <Settings className="w-5 h-5" />,
                },
              ].map((item, index) => (
                <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="text-blue-600">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ PRIVACY & DATA HANDLING - CRITICAL SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-4">
                <Fingerprint className="w-4 h-4 mr-2" />
                Biometric Privacy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Privacy architecture</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Engineered from the ground up to eliminate surveillance risk and biometric data exposure
              </p>
            </div>

            {/* Data Flow Visualization */}
            <div className="mb-12">
              <div className="grid md:grid-cols-5 gap-4 items-center">
                {[
                  { icon: <EyeOff className="w-6 h-6" />, label: 'Camera Input', color: 'bg-blue-100 text-blue-600' },
                  { icon: <Cpu className="w-6 h-6" />, label: 'Local Processing', color: 'bg-teal-100 text-teal-600' },
                  { icon: <XCircle className="w-6 h-6" />, label: 'No Storage', color: 'bg-red-100 text-red-600' },
                  { icon: <Database className="w-6 h-6" />, label: 'Ephemeral Cache', color: 'bg-amber-100 text-amber-600' },
                  { icon: <Network className="w-6 h-6" />, label: 'Local Output', color: 'bg-green-100 text-green-600' },
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mx-auto mb-3`}>
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium">{step.label}</div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-full transform -translate-x-1/2 w-8 h-0.5 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Guarantees */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Zero Biometric Persistence',
                  description: 'Raw video is processed frame-by-frame and immediately discarded. No facial features, iris patterns, or gaze paths are stored.',
                  icon: <Fingerprint className="w-6 h-6" />,
                  guarantees: ['No facial recognition', 'No iris mapping', 'No gaze pattern storage'],
                },
                {
                  title: 'On-Device Processing Only',
                  description: 'All eye tracking and gaze inference runs locally. No video or biometric data ever leaves the user\'s device.',
                  icon: <Cpu className="w-6 h-6" />,
                  guarantees: ['No cloud processing', 'No data transmission', 'Works fully offline'],
                },
                {
                  title: 'No Behavioral Profiling',
                  description: 'We don\'t analyze how users communicate, what they say, or when they communicate for any purpose beyond immediate assistance.',
                  icon: <EyeOff className="w-6 h-6" />,
                  guarantees: ['No communication analysis', 'No usage patterns', 'No sentiment tracking'],
                },
                {
                  title: 'Ephemeral Text Processing',
                  description: 'When cloud AI is used (opt-in only), only the typed text is processed, and it\'s discarded after generating a response.',
                  icon: <Server className="w-6 h-6" />,
                  guarantees: ['Text-only processing', 'Immediate deletion', 'No conversation storage'],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="text-blue-600">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.guarantees.map((guarantee, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {guarantee}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Compliance Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200"
            >
              <div className="flex items-start">
                <ShieldCheck className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">Regulatory Alignment</h4>
                  <p className="text-gray-600">
                    Our architecture is designed to comply with global privacy regulations including GDPR, 
                    HIPAA, and emerging biometric privacy laws. We maintain documentation for institutional 
                    compliance reviews and audits.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ ACCESSIBILITY STANDARDS - SHOW COMPETENCE */}
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
                Accessibility <span className="text-gradient">standards</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Designed to WCAG 2.1 AA standards with additional considerations for severe motor impairments
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Visual & Interaction Standards */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Visual & Interaction Standards</h3>
                {[
                  {
                    title: 'High Contrast Interface',
                    description: 'Minimum 4.5:1 contrast ratio with adjustable themes for varying visual capabilities',
                    icon: '👁️',
                  },
                  {
                    title: 'Adjustable Dwell Timing',
                    description: 'User-configurable dwell times from 0.5 to 3 seconds to match motor capabilities',
                    icon: '⏱️',
                  },
                  {
                    title: 'Predictable Focus States',
                    description: 'Clear, consistent visual indicators for gaze focus and selection states',
                    icon: '🎯',
                  },
                  {
                    title: 'Reduced Motion Options',
                    description: 'Ability to minimize or eliminate animations that could cause discomfort or distraction',
                    icon: '🌀',
                  },
                ].map((standard, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-4">{standard.icon}</span>
                    <div>
                      <h4 className="font-medium mb-1">{standard.title}</h4>
                      <p className="text-sm text-gray-600">{standard.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical & Compatibility Standards */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Technical & Compatibility Standards</h3>
                {[
                  {
                    title: 'Screen Reader Compatibility',
                    description: 'Full support for NVDA, JAWS, VoiceOver, and TalkBack with semantic HTML structure',
                    icon: '🔊',
                  },
                  {
                    title: 'Keyboard Navigation',
                    description: 'Complete keyboard-only operation for users who can only use a single switch',
                    icon: '⌨️',
                  },
                  {
                    title: 'Multilingual Support',
                    description: 'Interface and predictive text in 20+ languages with RTL language support',
                    icon: '🌍',
                  },
                  {
                    title: 'Low-Literacy Modes',
                    description: 'Symbol-based communication and phrase prediction for users with literacy challenges',
                    icon: '📝',
                  },
                ].map((standard, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-4">{standard.icon}</span>
                    <div>
                      <h4 className="font-medium mb-1">{standard.title}</h4>
                      <p className="text-sm text-gray-600">{standard.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WCAG Compliance Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold mb-2">WCAG 2.1 AA Compliance</h4>
                  <p className="text-gray-600">
                    All interfaces are tested against WCAG 2.1 AA standards. We maintain an 
                    accessibility statement and welcome feedback from users with disabilities.
                  </p>
                </div>
                <div className="px-4 py-2 bg-white border border-blue-200 rounded-lg font-medium">
                  WCAG 2.1 AA
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5️⃣ SAFETY & FAILURE MODES - PLANNING FOR REALITY */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Safety Engineering
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Safety & failure modes</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Designed for reliability with clear failure states and caregiver overrides
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Clear System Status',
                  description: 'Persistent visual indicators show tracking status, calibration quality, and system health.',
                  scenarios: [
                    'Camera disconnection',
                    'Poor lighting conditions',
                    'Calibration drift',
                  ],
                  icon: '📊',
                },
                {
                  title: 'Caregiver Controls',
                  description: 'Manual overrides accessible at any time without disrupting user experience.',
                  scenarios: [
                    'Emergency communication',
                    'User fatigue',
                    'Technical issues',
                  ],
                  icon: '👨‍⚕️',
                },
                {
                  title: 'Graceful Degradation',
                  description: 'System maintains basic functionality even when advanced features fail.',
                  scenarios: [
                    'Network disconnection',
                    'AI service outage',
                    'Hardware limitations',
                  ],
                  icon: '🔄',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-500">Failure Scenarios:</div>
                    {item.scenarios.map((scenario, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                        {scenario}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Emergency Communication Protocol */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200"
            >
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">Emergency Communication Protocol</h4>
                  <p className="text-gray-600 mb-4">
                    In critical situations, caregivers can activate emergency mode which:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {[
                      'Bypasses all dwell timing',
                      'Enlarges critical communication buttons',
                      'Activates system-wide voice output',
                      'Logs emergency activation for review',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6️⃣ TRANSPARENCY & ACCOUNTABILITY */}
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
                <span className="text-gradient">Transparency & accountability</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Clear documentation, audit trails, and ongoing oversight mechanisms
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">Documentation & Disclosure</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'System Behavior Documentation',
                      description: 'Detailed technical documentation of how the system processes gaze data, makes predictions, and handles edge cases.',
                      icon: <BookOpen className="w-5 h-5" />,
                    },
                    {
                      title: 'Data Flow Diagrams',
                      description: 'Visual maps showing exactly what data is processed where, when, and for how long.',
                      icon: <Network className="w-5 h-5" />,
                    },
                    {
                      title: 'Limitations Documentation',
                      description: 'Clear statements about what the system cannot do, conditions that affect performance, and known failure modes.',
                      icon: <FileText className="w-5 h-5" />,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <div className="text-blue-600">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">Oversight & Feedback</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'User Feedback Mechanisms',
                      description: 'Multiple channels for users and caregivers to report issues, suggest improvements, or raise concerns.',
                      icon: <Mail className="w-5 h-5" />,
                    },
                    {
                      title: 'Institutional Audit Support',
                      description: 'Tools and documentation to support internal and external audits for healthcare institutions.',
                      icon: <ShieldCheck className="w-5 h-5" />,
                    },
                    {
                      title: 'Ethics Advisory Input',
                      description: 'Regular consultation with disability advocates, ethicists, and medical professionals.',
                      icon: <Users className="w-5 h-5" />,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <div className="text-teal-600">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit Trail Feature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200"
            >
              <div className="flex items-start">
                <FileText className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">Audit Trail System</h4>
                  <p className="text-gray-600 mb-4">
                    Institutional deployments include configurable audit trails that log:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'System activations and deactivations',
                      'Emergency mode usage',
                      'Configuration changes',
                      'Data export/import events',
                      'User consent changes',
                      'Caregiver interventions',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ CLOSING STATEMENT - MORAL CLARITY */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Our Commitment
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Restoring communication should never compromise dignity
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Assistive communication technologies carry profound responsibility. 
                They operate at the intersection of human vulnerability and technological capability, 
                where every design decision can either empower or diminish.
              </p>
              
              <p>
                GAZE is built on the conviction that restoring a person's ability to communicate 
                must never come at the cost of their privacy, autonomy, or dignity. We believe 
                technology should serve people in their most vulnerable moments without creating 
                new vulnerabilities.
              </p>
              
              <p>
                This governance framework isn't just a compliance document—it's our operational 
                DNA. It guides how we build, deploy, and maintain communication systems for 
                people who depend on them for their most basic human connections.
              </p>
            </div>

            {/* Contact for Ethics Inquiries */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold mb-2">Ethics & Governance Inquiries</h4>
                  <p className="text-gray-400">
                    For questions about our ethical framework, compliance documentation, or governance practices
                  </p>
                </div>
                <a 
                  href="mailto:ethics@gaze.com" 
                  className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  ethics@gaze.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}