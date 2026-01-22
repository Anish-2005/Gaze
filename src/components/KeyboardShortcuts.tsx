'use client'

import { useState, useEffect } from 'react'
import { Command, Eye, Gavel, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useJudgeMode } from '@/lib/useJudgeMode'

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false)
  const { judgeMode, enterJudgeMode, exitJudgeMode } = useJudgeMode()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + / to show help
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault()
        setShowHelp(prev => !prev)
      }
      
      // Escape to close help
      if (e.key === 'Escape') {
        setShowHelp(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const shortcuts = [
    { key: 'Ctrl + /', action: 'Show/hide shortcuts', icon: <Command className="w-4 h-4" /> },
    { key: 'Ctrl + Shift + J', action: 'Toggle judge mode', icon: <Gavel className="w-4 h-4" /> },
    { key: 'Space', action: 'Speak message (in demo)', icon: <Eye className="w-4 h-4" /> },
    { key: 'Escape', action: 'Clear message (in demo)', icon: <X className="w-4 h-4" /> },
  ]

  return (
    <>
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 z-50 w-80"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Command className="w-5 h-5" />
                    <h3 className="font-semibold">Keyboard Shortcuts</h3>
                  </div>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <div className="text-blue-600">{shortcut.icon}</div>
                        </div>
                        <div>
                          <div className="font-medium">{shortcut.action}</div>
                        </div>
                      </div>
                      <kbd className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Judge Mode:</span> {judgeMode ? 'Active' : 'Inactive'}
                    <button
                      onClick={judgeMode ? exitJudgeMode : enterJudgeMode}
                      className="ml-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {judgeMode ? 'Exit' : 'Enter'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcut Indicator */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        title="Show keyboard shortcuts (Ctrl+/)"
      >
        <Command className="w-5 h-5" />
      </button>
    </>
  )
}