'use client'

import { AlertTriangle, Bell, ThumbsUp, ThumbsDown, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickPhrasesProps {
  selectedPhrase: string | null
  onSelect: (phrase: string) => void
  hoveredKey: string | null
  setHoveredKey: (key: string | null) => void
  isDwelling: boolean
  dwellProgress: number
}

const QUICK_PHRASES = [
  { text: "I AM IN PAIN", icon: <AlertTriangle className="w-4 h-4" />, keyId: "PAIN", color: "border-red-400 bg-gradient-to-b from-red-100 to-red-200 text-red-900", hoverColor: "shadow-red-200/50" },
  { text: "CALL NURSE", icon: <Bell className="w-4 h-4" />, keyId: "NURSE", color: "border-amber-400 bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900", hoverColor: "shadow-amber-200/50" },
  { text: "YES", icon: <ThumbsUp className="w-4 h-4" />, keyId: "YES", color: "border-green-400 bg-gradient-to-b from-green-100 to-green-200 text-green-900", hoverColor: "shadow-green-200/50" },
  { text: "NO", icon: <ThumbsDown className="w-4 h-4" />, keyId: "NO", color: "border-rose-400 bg-gradient-to-b from-rose-100 to-rose-200 text-rose-900", hoverColor: "shadow-rose-200/50" },
  { text: "THANK YOU", icon: <Heart className="w-4 h-4" />, keyId: "THANKYOU", color: "border-blue-400 bg-gradient-to-b from-blue-100 to-blue-200 text-blue-900", hoverColor: "shadow-blue-200/50" },
  { text: "I NEED WATER", icon: "💧", keyId: "WATER", color: "border-cyan-400 bg-gradient-to-b from-cyan-100 to-cyan-200 text-cyan-900", hoverColor: "shadow-cyan-200/50" },
  { text: "PLEASE HELP", icon: "🆘", keyId: "HELP", color: "border-orange-400 bg-gradient-to-b from-orange-100 to-orange-200 text-orange-900", hoverColor: "shadow-orange-200/50" },
  { text: "I CAN'T BREATHE", icon: "😮‍💨", keyId: "BREATHE", color: "border-purple-400 bg-gradient-to-b from-purple-100 to-purple-200 text-purple-900", hoverColor: "shadow-purple-200/50" },
]

export default function QuickPhrases({
  selectedPhrase,
  onSelect,
  hoveredKey,
  setHoveredKey,
  isDwelling,
  dwellProgress,
}: QuickPhrasesProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700/50 shadow-2xl">
      <div className="container mx-auto px-4 py-2">
        <div className="mb-2">
          <div className="text-xs font-medium text-gray-300 uppercase tracking-wider text-center">
            Quick Phrases • Emergency Communication
          </div>
          <div className="text-xs text-gray-400 text-center leading-tight">
            Instantly communicate urgent needs
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-2">
          {QUICK_PHRASES.map((phrase) => {
            const isHovered = hoveredKey === phrase.keyId

            return (
              <div key={phrase.text} className="relative">
                <button
                  onClick={() => onSelect(phrase.text)}
                  onMouseEnter={() => setHoveredKey(phrase.keyId)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={cn(
                    "w-full h-10 sm:h-12 md:h-14 rounded-lg border-2 transition-all duration-200 font-bold text-xs shadow-lg active:shadow-md active:scale-95 relative overflow-hidden",
                    isHovered
                      ? `${phrase.color} ${phrase.hoverColor} scale-105 border-opacity-100`
                      : "border-gray-600 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400"
                  )}
                >
                  <div className="flex flex-col items-center justify-center space-y-0.5 relative z-10">
                    <span className="text-sm sm:text-base">{phrase.icon}</span>
                    <span className="text-center leading-tight px-0.5 text-xs">{phrase.text}</span>
                  </div>
                  {/* Key top surface gradient */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                  {/* Key bottom shadow */}
                  <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-b-lg blur-sm pointer-events-none" />
                </button>

                {/* Dwell progress ring */}
                {isHovered && isDwelling && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        className="text-blue-500"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - dwellProgress / 100)}`}
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Usage hint */}
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-400 inline-flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span>Quick phrases can save critical time in emergencies</span>
          </div>
        </div>
      </div>
    </div>
  )
}