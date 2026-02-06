'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getStoredTheme = (): Theme | null => {
    if (typeof window === 'undefined') return null

    try {
        const savedTheme = localStorage.getItem('gaze-theme') as Theme | null
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    } catch {
        return null
    }

    return null
}

const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const resolveTheme = (): Theme => {
    if (typeof document !== 'undefined') {
        const root = document.documentElement
        if (root.classList.contains('light')) return 'light'
        if (root.classList.contains('dark')) return 'dark'
    }

    return getStoredTheme() ?? getSystemTheme()
}

const applyThemeToDom = (nextTheme: Theme) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(nextTheme)

    try {
        localStorage.setItem('gaze-theme', nextTheme)
    } catch {
        // Ignore storage errors.
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => resolveTheme())

    useEffect(() => {
        applyThemeToDom(theme)
    }, [theme])

    const toggleTheme = () => {
        setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context !== undefined) {
        return context
    }

    return {
        theme: resolveTheme(),
        toggleTheme: () => {
            const current = resolveTheme()
            const next = current === 'dark' ? 'light' : 'dark'
            applyThemeToDom(next)
        },
        setTheme: (nextTheme: Theme) => {
            applyThemeToDom(nextTheme)
        }
    }
}
