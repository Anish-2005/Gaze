import { useEffect, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface WindowWithAnalytics extends Window {
  gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Core Web Vitals tracking
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      import('web-vitals').then((webVitals) => {
        webVitals.onCLS(console.log)
        webVitals.onFID(console.log)
        webVitals.onFCP(console.log)
        webVitals.onLCP(console.log)
        webVitals.onTTFB(console.log)
      })
    }
  }, [])

  // Route change performance tracking
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Log route change performance
      console.log(`Route ${pathname} loaded in ${loadTime.toFixed(2)}ms`)

      // Send to analytics if available
      if (typeof window !== 'undefined' && (window as WindowWithAnalytics).gtag) {
        (window as WindowWithAnalytics).gtag('event', 'page_load_time', {
          page_path: pathname,
          page_load_time: loadTime,
          custom_map: { metric1: 'page_load_time' }
        })
      }
    }
  }, [pathname, searchParams])

  // Memory usage monitoring
  const monitorMemoryUsage = useCallback(() => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memInfo = (performance as PerformanceWithMemory).memory
      if (memInfo) {
        console.log('Memory Usage:', {
          used: Math.round(memInfo.usedJSHeapSize / 1048576 * 100) / 100 + ' MB',
          total: Math.round(memInfo.totalJSHeapSize / 1048576 * 100) / 100 + ' MB',
          limit: Math.round(memInfo.jsHeapSizeLimit / 1048576 * 100) / 100 + ' MB'
      })
    }
  }, [])

  // Bundle size monitoring
  useEffect(() => {
    const checkBundleSize = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const resources = performance.getEntriesByType('resource')
        const jsResources = resources.filter(r => r.name.includes('.js'))

        jsResources.forEach(resource => {
          if (resource.transferSize > 1000000) { // > 1MB
            console.warn(`Large bundle detected: ${resource.name} (${(resource.transferSize / 1024 / 1024).toFixed(2)}MB)`)
          }
        })
      }
    }

    // Check after page load
    if (document.readyState === 'complete') {
      checkBundleSize()
      return undefined
    } else {
      window.addEventListener('load', checkBundleSize)
      return () => window.removeEventListener('load', checkBundleSize)
    }
  }, [])

  return { monitorMemoryUsage }
}

// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer
  private observers: Map<string, IntersectionObserver> = new Map()

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer()
    }
    return PerformanceOptimizer.instance
  }

  // Lazy load images
  lazyLoadImage(img: HTMLImageElement, src: string) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement
          lazyImage.src = src
          lazyImage.classList.remove('lazy')
          observer.unobserve(lazyImage)
        }
      })
    })

    imageObserver.observe(img)
    this.observers.set(`img-${src}`, imageObserver)
  }

  // Preload critical resources
  preloadResource(href: string, as: string = 'fetch', type?: string) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = as
    link.href = href
    if (type) link.type = type
    document.head.appendChild(link)
  }

  // Debounced function for performance
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
      const later = () => {
        timeout = null
        if (!immediate) func(...args)
      }

      const callNow = immediate && !timeout

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) func(...args)
    }
  }

  // Throttled function for performance
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean

    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }
}