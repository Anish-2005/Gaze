'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark')
    const [mounted, setMounted] = useState(false)

    // Load theme from localStorage on mount
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('gaze-theme') as Theme | null
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            setThemeState(savedTheme)
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setThemeState(prefersDark ? 'dark' : 'light')
        }
    }, [])

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return

        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem('gaze-theme', theme)
    }, [theme, mounted])

    const toggleTheme = () => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    // Prevent flash during hydration
    if (!mounted) {
        return (
            <div style={{ visibility: 'hidden' }}>
                {children}
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
