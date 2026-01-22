'use client'

import { Gavel, X } from 'lucide-react'
import { useJudgeMode } from '@/lib/useJudgeMode'
import { motion, AnimatePresence } from 'framer-motion'

export default function JudgeModeIndicator() {
  const { judgeMode, showIndicator, exitJudgeMode, setShowIndicator } = useJudgeMode()

  if (!judgeMode) return null

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-[1000]"
        >
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg shadow-xl border border-white/20">
            <div className="flex items-center space-x-2">
              <Gavel className="w-4 h-4" />
              <span className="text-sm font-medium">Judge Mode Active</span>
            </div>
            
            <button
              onClick={() => setShowIndicator(false)}
              className="ml-2 text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="hidden md:block text-xs text-white/70 ml-2">
              Ctrl+Shift+J to toggle
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}