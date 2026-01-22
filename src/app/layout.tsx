'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import JudgeModeIndicator from '@/components/JudgeModeIndicator'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import { useJudgeMode } from '@/lib/useJudgeMode'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// Client-side only component to avoid hydration mismatch
function PrintUrl() {
  const [url, setUrl] = useState('')
  
  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  
  if (!url) return null
  
  return (
    <p className="text-sm text-gray-500 mt-4">
      Printed from: {url} • {new Date().toLocaleDateString()}
    </p>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { judgeMode } = useJudgeMode()

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Quick navigation shortcuts
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case '1':
            e.preventDefault()
            window.location.href = '/'
            break
          case '2':
            e.preventDefault()
            window.location.href = '/pitch'
            break
          case '3':
            e.preventDefault()
            window.location.href = '/demo'
            break
          case '4':
            e.preventDefault()
            window.location.href = '/institutions'
            break
          case '5':
            e.preventDefault()
            window.location.href = '/governance'
            break
        }
      }

      // Print mode (Ctrl+P)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault()
        window.print()
      }

      // Quick judge mode entry (J)
      if (e.key === 'J' && e.ctrlKey && e.shiftKey) {
        // Handled by useJudgeMode hook
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Apply judge mode classes to html
  useEffect(() => {
    if (judgeMode) {
      document.documentElement.classList.add('judge-mode')
    } else {
      document.documentElement.classList.remove('judge-mode')
    }
  }, [judgeMode])

  // Apply print styles
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        .no-print {
          display: none !important;
        }
        
        body {
          font-size: 12pt;
          line-height: 1.6;
          color: #000;
          background: #fff;
        }
        
        a {
          color: #000;
          text-decoration: underline;
        }
        
        .print-only {
          display: block !important;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <html lang="en" className={`scroll-smooth ${judgeMode ? 'judge-mode' : ''}`}>
      <head>
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="GAZE - The Eye-Tracking Communicator" />
        <meta property="og:description" content="Giving a voice to the paralyzed using only a smartphone selfie camera." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gaze.com" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GAZE - The Eye-Tracking Communicator" />
        <meta name="twitter:description" content="Giving a voice to the paralyzed using only a smartphone selfie camera." />
        <meta name="twitter:image" content="/twitter-image.png" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      
      <body className={`${inter.className} bg-white text-gray-900 antialiased min-h-screen flex flex-col`}>
        {/* Navigation - hidden in judge mode */}
        {!judgeMode && <Navigation />}
        
        {/* Judge Mode Indicator */}
        <JudgeModeIndicator />
        
        {/* Keyboard Shortcuts Help */}
        <KeyboardShortcuts />
        
        {/* Main Content */}
        <main className={`flex-1 ${judgeMode ? 'pt-0' : ''}`}>
          {children}
        </main>
        
        {/* Footer - hidden in judge mode */}
        {!judgeMode && (
          <footer className="no-print">
            <div className="border-t border-gray-200 mt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg" />
                    <div>
                      <div className="text-lg font-bold text-gray-900">GAZE</div>
                      <div className="text-sm text-blue-600">The Eye-Tracking Communicator</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="flex flex-wrap gap-4">
                      <a href="/governance" className="hover:text-blue-600 transition-colors">
                        Governance
                      </a>
                      <a href="/privacy" className="hover:text-blue-600 transition-colors">
                        Privacy
                      </a>
                      <a href="/accessibility" className="hover:text-blue-600 transition-colors">
                        Accessibility
                      </a>
                      <a href="mailto:contact@gaze.com" className="hover:text-blue-600 transition-colors">
                        Contact
                      </a>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      © {new Date().getFullYear()} GAZE. Compassionate Capitalism.
                    </div>
                  </div>
                </div>
                
                {/* Quick Links for Judges */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <div className="font-medium mb-2">Quick Navigation (Ctrl + Number):</div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="flex items-center">
                        <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+1</kbd>
                        <span>Home</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+2</kbd>
                        <span>Pitch</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+3</kbd>
                        <span>Demo</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+4</kbd>
                        <span>Institutions</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+5</kbd>
                        <span>Governance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
        
        {/* Print Only Content */}
        <div className="print-only hidden">
          <div className="p-8 border-b border-gray-300">
            <h1 className="text-2xl font-bold">GAZE - The Eye-Tracking Communicator</h1>
            <p className="text-gray-600 mt-2">Giving a voice to the paralyzed using only a smartphone selfie camera.</p>
            <PrintUrl />
          </div>
        </div>
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Performance monitoring
                window.addEventListener('load', () => {
                  if (window.performance) {
                    const perfData = window.performance.timing;
                    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log('Page load time:', loadTime + 'ms');
                  }
                });
                
                // Error tracking
                window.addEventListener('error', (event) => {
                  console.error('Uncaught error:', event.error);
                });
                
                // Unhandled promise rejections
                window.addEventListener('unhandledrejection', (event) => {
                  console.error('Unhandled promise rejection:', event.reason);
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}