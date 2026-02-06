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

        console.log('Applying theme to document:', theme)
        const root = document.documentElement
        console.log('Current classes before:', root.className)
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        console.log('Current classes after:', root.className)
        localStorage.setItem('gaze-theme', theme)
        console.log('Saved to localStorage:', theme)
    }, [theme, mounted])

    const toggleTheme = () => {
        console.log('Toggle theme called, current theme:', theme)
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        console.log('Setting new theme:', newTheme)
        setThemeState(newTheme)
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
