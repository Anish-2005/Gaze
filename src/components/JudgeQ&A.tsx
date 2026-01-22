'use client'

import { useState } from 'react'
import { HelpCircle, CheckCircle, AlertTriangle, Users, DollarSign, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const OBJECTIONS = [
  {
    question: "How accurate is this compared to hardware like Tobii?",
    answer: "We don't aim to replace clinical-grade research hardware. Our goal is functional communication. For typing and selection, software-based gaze tracking is sufficient, dramatically cheaper, and deployable at scale.",
    category: "Technical",
    icon: <AlertTriangle className="w-5 h-5" />,
    keywords: ["accuracy", "Tobii", "hardware"],
  },
  {
    question: "What about people with tremors or unstable gaze?",
    answer: "The system uses dwell-based input with adjustable timing and smoothing. Caregivers can configure it per patient, and there is always a manual override for critical communication.",
    category: "Usability",
    icon: <Users className="w-5 h-5" />,
    keywords: ["tremors", "unstable", "caregivers"],
  },
  {
    question: "Isn't eye tracking invasive from a privacy perspective?",
    answer: "That's why all processing happens on-device. No video, no facial data, and no biometric templates are stored or transmitted. We designed the system specifically to avoid surveillance risks.",
    category: "Privacy",
    icon: <HelpCircle className="w-5 h-5" />,
    keywords: ["privacy", "invasive", "biometric"],
  },
  {
    question: "How do you make money ethically?",
    answer: "Individuals always have free access. Sustainability comes from institutional licensing — hospitals, NGOs, and public programs — not from charging vulnerable users. This is compassionate capitalism in practice.",
    category: "Business",
    icon: <DollarSign className="w-5 h-5" />,
    keywords: ["money", "ethical", "sustainability"],
  },
  {
    question: "Why will hospitals actually adopt this?",
    answer: "Because it requires no procurement, no training, and no integration. It runs on devices they already own and can be deployed bedside in minutes. The flat annual fee model makes budgeting predictable.",
    category: "Adoption",
    icon: <Building2 className="w-5 h-5" />,
    keywords: ["hospitals", "adoption", "integration"],
  },
  {
    question: "What's your backup plan if gaze tracking fails?",
    answer: "Multiple fallback modes: manual keyboard input, predictive text completion, and quick phrases. The system gracefully degrades to maintain basic communication functionality.",
    category: "Reliability",
    icon: <CheckCircle className="w-5 h-5" />,
    keywords: ["backup", "fails", "reliability"],
  },
]

export default function JudgeQnA() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', ...Array.from(new Set(OBJECTIONS.map(o => o.category)))]

  const filteredObjections = OBJECTIONS.filter(obj => {
    const matchesCategory = selectedCategory === 'all' || obj.category === selectedCategory
    const matchesSearch = obj.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">Hard Judge Questions</h3>
        <p className="text-gray-600">
          Prepared responses to common competition objections
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search objections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredObjections.map((obj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <div className="text-blue-600">{obj.icon}</div>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {obj.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold mb-3 text-gray-900">
                  {obj.question}
                </h4>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">{obj.answer}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {obj.keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <span className="font-medium">Judges hear:</span> Clear scope, no overclaiming, practical solution
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredObjections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No objections match your search</div>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSearchTerm('')
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}