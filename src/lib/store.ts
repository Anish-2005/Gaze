import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

// UI State Store
interface UIState {
  // Navigation
  isNavigationOpen: boolean
  activeSection: string

  // Modals and overlays
  isJudgeMode: boolean
  isKeyboardShortcutsVisible: boolean
  isPrintMode: boolean

  // Performance
  isLoading: boolean
  error: string | null

  // Actions
  setNavigationOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
  setJudgeMode: (enabled: boolean) => void
  setKeyboardShortcutsVisible: (visible: boolean) => void
  setPrintMode: (enabled: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        isNavigationOpen: false,
        activeSection: 'home',
        isJudgeMode: false,
        isKeyboardShortcutsVisible: false,
        isPrintMode: false,
        isLoading: false,
        error: null,

        // Actions
        setNavigationOpen: (open) => set({ isNavigationOpen: open }),
        setActiveSection: (section) => set({ activeSection: section }),
        setJudgeMode: (enabled) => set({ isJudgeMode: enabled }),
        setKeyboardShortcutsVisible: (visible) => set({ isKeyboardShortcutsVisible: visible }),
        setPrintMode: (enabled) => set({ isPrintMode: enabled }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error, isLoading: false }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'ui-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          isJudgeMode: state.isJudgeMode,
          activeSection: state.activeSection,
        }),
      }
    ),
    { name: 'UI Store' }
  )
)

// Performance Store
interface PerformanceState {
  // Metrics
  webVitals: {
    cls?: number
    fid?: number
    fcp?: number
    lcp?: number
    ttfb?: number
  }

  // Bundle analysis
  bundleSize: number
  largestBundle: string

  // Memory usage
  memoryUsage: {
    used: number
    total: number
    limit: number
  }

  // Actions
  updateWebVitals: (metrics: Partial<PerformanceState['webVitals']>) => void
  updateBundleSize: (size: number, largest: string) => void
  updateMemoryUsage: (usage: PerformanceState['memoryUsage']) => void
}

export const usePerformanceStore = create<PerformanceState>()(
  devtools(
    (set) => ({
      // Initial state
      webVitals: {},
      bundleSize: 0,
      largestBundle: '',
      memoryUsage: { used: 0, total: 0, limit: 0 },

      // Actions
      updateWebVitals: (metrics) =>
        set((state) => ({
          webVitals: { ...state.webVitals, ...metrics }
        })),
      updateBundleSize: (size, largest) =>
        set({ bundleSize: size, largestBundle: largest }),
      updateMemoryUsage: (usage) => set({ memoryUsage: usage }),
    }),
    { name: 'Performance Store' }
  )
)

// Pitch Controller Store
interface PitchControllerState {
  // Playback state
  isPlaying: boolean
  isSpeaking: boolean
  currentScriptIndex: number
  segmentProgress: number

  // UI state
  showScript: boolean
  isCollapsed: boolean
  position: { x: number; y: number }

  // Actions
  setPlaying: (playing: boolean) => void
  setSpeaking: (speaking: boolean) => void
  setCurrentScriptIndex: (index: number) => void
  setSegmentProgress: (progress: number) => void
  setShowScript: (show: boolean) => void
  setCollapsed: (collapsed: boolean) => void
  setPosition: (position: { x: number; y: number }) => void
  reset: () => void
}

export const usePitchControllerStore = create<PitchControllerState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        isPlaying: false,
        isSpeaking: false,
        currentScriptIndex: 0,
        segmentProgress: 0,
        showScript: false,
        isCollapsed: true,
        position: { x: 20, y: 0 }, // Will be updated with window height

        // Actions
        setPlaying: (playing) => set({ isPlaying: playing }),
        setSpeaking: (speaking) => set({ isSpeaking: speaking }),
        setCurrentScriptIndex: (index) => set({ currentScriptIndex: index }),
        setSegmentProgress: (progress) => set({ segmentProgress: progress }),
        setShowScript: (show) => set({ showScript: show }),
        setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
        setPosition: (position) => set({ position }),
        reset: () =>
          set({
            isPlaying: false,
            isSpeaking: false,
            currentScriptIndex: 0,
            segmentProgress: 0,
            showScript: false,
          }),
      }),
      {
        name: 'pitch-controller-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          position: state.position,
          isCollapsed: state.isCollapsed,
        }),
      }
    ),
    { name: 'Pitch Controller Store' }
  )
)

// API Cache Store
interface APICacheState {
  // Cache storage
  cache: Map<string, { data: any; timestamp: number; ttl: number }>

  // Actions
  get: <T>(key: string) => T | null
  set: <T>(key: string, data: T, ttl?: number) => void
  invalidate: (key: string) => void
  clear: () => void
  cleanup: () => void
}

export const useAPICacheStore = create<APICacheState>()(
  devtools(
    (set, get) => ({
      // Initial state
      cache: new Map(),

      // Actions
      get: (key) => {
        const item = get().cache.get(key)
        if (!item) return null

        // Check if expired
        if (Date.now() - item.timestamp > item.ttl) {
          get().invalidate(key)
          return null
        }

        return item.data
      },

      set: (key, data, ttl = 5 * 60 * 1000) => { // 5 minutes default TTL
        set((state) => {
          const newCache = new Map(state.cache)
          newCache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
          })
          return { cache: newCache }
        })
      },

      invalidate: (key) => {
        set((state) => {
          const newCache = new Map(state.cache)
          newCache.delete(key)
          return { cache: newCache }
        })
      },

      clear: () => {
        set({ cache: new Map() })
      },

      cleanup: () => {
        const now = Date.now()
        set((state) => {
          const newCache = new Map()
          state.cache.forEach((value, key) => {
            if (now - value.timestamp <= value.ttl) {
              newCache.set(key, value)
            }
          })
          return { cache: newCache }
        })
      },
    }),
    { name: 'API Cache Store' }
  )
)