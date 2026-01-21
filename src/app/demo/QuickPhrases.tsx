'use client'

import { AlertTriangle, Bell, ThumbsUp, ThumbsDown, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickPhrasesProps {
  selectedPhrase: string | null
  onSelect: (phrase: string) => void
}

const QUICK_PHRASES = [
  { text: "I AM IN PAIN", icon: <AlertTriangle className="w-4 h-4" />, color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" },
  { text: "CALL NURSE", icon: <Bell className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
  { text: "YES", icon: <ThumbsUp className="w-4 h-4" />, color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
  { text: "NO", icon: <ThumbsDown className="w-4 h-4" />, color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" },
  { text: "THANK YOU", icon: <Heart className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
  { text: "I NEED WATER", icon: "💧", color: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" },
  { text: "PLEASE HELP", icon: "🆘", color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
  { text: "I CAN'T BREATHE", icon: "😮‍💨", color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
]

export default function QuickPhrases({
  selectedPhrase,
  onSelect,
}: QuickPhrasesProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Quick Phrases • Emergency Communication
          </div>
          <div className="text-xs text-gray-400">
            Instantly communicate urgent needs
          </div>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {QUICK_PHRASES.map((phrase) => {
            const isSelected = selectedPhrase === phrase.text
            
            return (
              <button
                key={phrase.text}
                onClick={() => onSelect(phrase.text)}
                className={cn(
                  "flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-200",
                  "font-medium text-sm select-none",
                  phrase.color,
                  isSelected && "ring-2 ring-offset-2 ring-blue-500 scale-105"
                )}
              >
                <span>{phrase.icon}</span>
                <span>{phrase.text}</span>
              </button>
            )
          })}
        </div>

        {/* Usage hint */}
        <div className="mt-3 text-center">
          <div className="text-xs text-gray-500 inline-flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span>Quick phrases can save critical time in emergencies</span>
          </div>
        </div>
      </div>
    </div>
  )
}