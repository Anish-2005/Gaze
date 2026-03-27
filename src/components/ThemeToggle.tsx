'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg border"
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Moon className="h-4.5 w-4.5" style={{ color: 'rgb(var(--text-secondary))' }} />
      ) : (
        <Sun className="h-4.5 w-4.5" style={{ color: 'rgb(var(--accent-blue))' }} />
      )}
    </motion.button>
  )
}
