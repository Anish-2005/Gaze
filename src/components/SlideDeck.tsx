'use client'

import { Download, Copy, ChevronLeft, ChevronRight, Grid, Play, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    id: 1,
    title: "GAZE",
    subtitle: "Assistive Communication Infrastructure",
    content: [],
    backgroundColor: "from-blue-600 to-purple-600",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Millions cannot communicate.",
    subtitle: "Existing solutions rely on $10,000+ hardware",
    content: [
      "Paralysis, ALS, stroke, critical illness",
      "Proprietary eye-tracking hardware costs $10,000+",
      "Inaccessible to most families and hospitals",
    ],
    backgroundColor: "from-red-500 to-orange-500",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "GAZE replaces hardware with software.",
    subtitle: "Runs on standard cameras already in use",
    content: [
      "Uses existing smartphone/tablet cameras",
      "On-device processing - no data leaves",
      "No proprietary devices or installations",
    ],
    backgroundColor: "from-green-500 to-teal-500",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Live Demo Available",
    subtitle: "Browser-based • On-device • Operational",
    content: [
      "↗ Launch demo at /demo",
      "Medical-grade interface",
      "Zero installation required",
    ],
    backgroundColor: "from-purple-500 to-pink-500",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "Impact at Scale",
    content: [
      { value: "≥90%", label: "Cost reduction" },
      { value: "$0", label: "Additional hardware" },
      { value: "Global", label: "Deployment readiness" },
    ],
    backgroundColor: "from-blue-500 to-cyan-500",
    textColor: "text-white",
  },
  {
    id: 6,
    title: "Why Now?",
    content: [
      "Cameras are ubiquitous",
      "Efficient on-device AI",
      "Healthcare cost pressure",
      "Accessibility as infrastructure",
    ],
    backgroundColor: "from-amber-500 to-orange-500",
    textColor: "text-white",
  },
  {
    id: 7,
    title: "Restoring communication without compromising dignity, privacy, or safety.",
    subtitle: "",
    content: [],
    backgroundColor: "from-gray-900 to-gray-800",
    textColor: "text-white",
  },
]

export default function SlideDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isGridMode, setIsGridMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyDeck = async () => {
    const slideText = SLIDES.map((slide, index) => {
      let text = `Slide ${index + 1}: ${slide.title}\n`
      if (slide.subtitle) text += `${slide.subtitle}\n`
      if (Array.isArray(slide.content)) {
        slide.content.forEach(item => {
          if (typeof item === 'string') {
            text += `• ${item}\n`
          } else if (item && typeof item === 'object') {
            text += `• ${item.value}: ${item.label}\n`
          }
        })
      }
      return text + '\n'
    }).join('\n')

    await navigator.clipboard.writeText(slideText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = () => {
    const content = `
      GAZE Pitch Deck
      ==============
      
      ${SLIDES.map((slide, i) => `
      Slide ${i + 1}
      ---------
      ${slide.title}
      ${slide.subtitle ? slide.subtitle : ''}
      ${Array.isArray(slide.content) 
        ? slide.content.map(c => typeof c === 'string' ? `• ${c}` : `• ${c.value}: ${c.label}`).join('\n')
        : ''}
      `).join('\n\n')}
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'GAZE-Pitch-Deck.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentSlideData = SLIDES[currentSlide]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsGridMode(!isGridMode)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Grid className="w-4 h-4" />
            <span>{isGridMode ? 'Slide View' : 'Grid View'}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="px-4 py-2 bg-gray-100 rounded-lg">
              <span className="font-medium">{currentSlide + 1}</span>
              <span className="text-gray-500"> / {SLIDES.length}</span>
            </div>
            
            <button
              onClick={() => setCurrentSlide(prev => Math.min(SLIDES.length - 1, prev + 1))}
              disabled={currentSlide === SLIDES.length - 1}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyDeck}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Deck</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Slide Display */}
      <AnimatePresence mode="wait">
        {isGridMode ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsGridMode(false)
                }}
                className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${slide.backgroundColor} ${slide.textColor} p-8 cursor-pointer hover:scale-[1.02] transition-transform shadow-lg`}
              >
                <div className="h-full flex flex-col">
                  <div className="text-sm opacity-80 mb-2">Slide {index + 1}</div>
                  <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                  {slide.subtitle && (
                    <p className="text-lg opacity-90 mb-6">{slide.subtitle}</p>
                  )}
                  <div className="mt-auto">
                    {Array.isArray(slide.content) && slide.content.length > 0 && (
                      <div className="space-y-2">
                        {slide.content.map((item, i) => (
                          <div key={i} className="flex items-center text-sm opacity-90">
                            {typeof item === 'string' ? (
                              <>• {item}</>
                            ) : (
                              <>
                                <span className="font-bold mr-2">{item.value}</span>
                                <span>{item.label}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="slide"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className={`h-full bg-gradient-to-br ${currentSlideData.backgroundColor} ${currentSlideData.textColor} p-12 flex flex-col justify-between`}>
              {/* Slide number */}
              <div className="text-sm opacity-70">
                Slide {currentSlide + 1} of {SLIDES.length}
              </div>
              
              {/* Slide content */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  {currentSlideData.title}
                </h2>
                
                {currentSlideData.subtitle && (
                  <p className="text-2xl lg:text-3xl opacity-90 mb-12">
                    {currentSlideData.subtitle}
                  </p>
                )}
                
                {Array.isArray(currentSlideData.content) && currentSlideData.content.length > 0 && (
                  <div className="space-y-4">
                    {currentSlideData.content.map((item, index) => (
                      <div key={index} className="flex items-center text-xl lg:text-2xl">
                        {typeof item === 'string' ? (
                          <>
                            <div className="w-3 h-3 rounded-full bg-current opacity-80 mr-4"></div>
                            <span className="opacity-90">{item}</span>
                          </>
                        ) : (
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold mr-4">{item.value}</span>
                            <span className="text-xl opacity-90">{item.label}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Slide footer */}
              <div className="flex items-center justify-between pt-8 border-t border-white/20">
                <div className="text-sm opacity-70">
                  GAZE • Assistive Communication Infrastructure
                </div>
                <div className="text-sm opacity-70">
                  Press ← → to navigate
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Notes */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-bold mb-4">Speaker Notes for Slide {currentSlide + 1}</h4>
        <p className="text-gray-600">
          {currentSlide === 0 && "Start confidently. Let the title land. This is infrastructure, not a product."}
          {currentSlide === 1 && "Speak slowly. This is the emotional anchor. Pause after '$10,000+ hardware'."}
          {currentSlide === 2 && "Clear contrast: hardware vs software. Emphasize 'already in use'."}
          {currentSlide === 3 && "One-click demo. Prove it's real. Don't over-explain."}
          {currentSlide === 4 && "Impact metrics. Speak numbers clearly. Let the scale sink in."}
          {currentSlide === 5 && "Timing matters. Why this solution works now, not five years ago."}
          {currentSlide === 6 && "Final statement. Speak deliberately. End on dignity, privacy, safety."}
        </p>
      </div>
    </div>
  )
}