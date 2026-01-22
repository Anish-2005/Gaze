import { useEffect } from 'react'

// Web Vitals tracking
export function useWebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid SSR issues
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Cumulative Layout Shift
      getCLS((metric) => {
        console.log('CLS:', metric)
        sendToAnalytics('CLS', metric)
      })

      // First Input Delay
      getFID((metric) => {
        console.log('FID:', metric)
        sendToAnalytics('FID', metric)
      })

      // First Contentful Paint
      getFCP((metric) => {
        console.log('FCP:', metric)
        sendToAnalytics('FCP', metric)
      })

      // Largest Contentful Paint
      getLCP((metric) => {
        console.log('LCP:', metric)
        sendToAnalytics('LCP', metric)
      })

      // Time to First Byte
      getTTFB((metric) => {
        console.log('TTFB:', metric)
        sendToAnalytics('TTFB', metric)
      })
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error)
    })
  }, [])
}

// Send metrics to analytics
function sendToAnalytics(metricName: string, metric: any) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', metricName, {
      value: Math.round(metric.value * 1000) / 1000,
      event_category: 'Web Vitals',
      event_label: metric.name,
      non_interaction: true,
    })
  }

  // Custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metricName,
        value: metric.value,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch((error) => {
      console.warn('Failed to send analytics:', error)
    })
  }
}

// Performance observer for additional metrics
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('Navigation timing:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
          })
        }
      })
    })

    navObserver.observe({ entryTypes: ['navigation'] })

    // Observe resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) { // Log slow resources
          console.warn('Slow resource:', entry.name, `${entry.duration}ms`)
        }
      })
    })

    resourceObserver.observe({ entryTypes: ['resource'] })

    // Observe long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn('Long task detected:', `${entry.duration}ms`)
      })
    })

    longTaskObserver.observe({ entryTypes: ['longtask'] })

    return () => {
      navObserver.disconnect()
      resourceObserver.disconnect()
      longTaskObserver.disconnect()
    }
  }, [])
}

// Memory usage monitoring
export function useMemoryMonitor() {
  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory
        const usedPercent = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100

        if (usedPercent > 80) {
          console.warn('High memory usage detected:', `${usedPercent.toFixed(1)}%`)
        }
      }
    }

    const interval = setInterval(checkMemory, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])
}