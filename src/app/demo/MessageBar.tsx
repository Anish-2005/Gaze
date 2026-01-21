'use client'

import { Volume2, Trash2, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageBarProps {
  message: string
  isSpeaking: boolean
  onSpeak: () => void
  onClear: () => void
  onReset?: () => void
}

export default function MessageBar({
  message,
  isSpeaking,
  onSpeak,
  onClear,
  onReset,
}: MessageBarProps) {
  return (
    <div className="fixed top-10 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[80px] py-4">
          {/* Message Display */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-2 h-full bg-blue-500 rounded-full"></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">
                  Current Message
                </div>
                <div className={cn(
                  "text-3xl font-medium transition-all duration-300",
                  message ? "text-gray-900" : "text-gray-400 italic"
                )}>
                  {message || "Waiting for input..."}
                </div>
                
                {/* Character count */}
                {message && (
                  <div className="mt-2 text-sm text-gray-500">
                    {message.length} characters
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-3 ml-6">
            {/* Reset Button */}
            {onReset && (
              <button
                onClick={onReset}
                className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                title="Reset demo"
              >
                <RotateCcw className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                <span className="text-xs text-gray-500 mt-1">Reset</span>
              </button>
            )}

            {/* Clear Button */}
            <button
              onClick={onClear}
              disabled={!message}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
                message 
                  ? "hover:bg-red-50 text-red-500 hover:text-red-600" 
                  : "text-gray-300 cursor-not-allowed"
              )}
              title="Clear message"
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-xs mt-1">Clear</span>
            </button>

            {/* Speak Button */}
            <button
              onClick={onSpeak}
              disabled={!message || isSpeaking}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
                message && !isSpeaking
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
              title={isSpeaking ? "Speaking..." : "Speak message"}
            >
              <div className="relative">
                <Volume2 className="w-5 h-5" />
                {isSpeaking && (
                  <div className="absolute -inset-1 border-2 border-blue-400 rounded-full animate-ping"></div>
                )}
              </div>
              <span className="text-xs mt-1">
                {isSpeaking ? "Speaking..." : "Speak"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}