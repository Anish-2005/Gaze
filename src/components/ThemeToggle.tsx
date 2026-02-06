'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors
        bg-slate-200/70 hover:bg-slate-300/70 border border-slate-300/60
        dark:bg-slate-800/60 dark:hover:bg-slate-700 dark:border-slate-700/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: 1
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-slate-300" />
                ) : (
                    <Sun className="w-5 h-5 text-amber-500" />
                )}
            </motion.div>
        </motion.button>
    )
}
