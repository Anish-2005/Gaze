'use client'

import dynamic from 'next/dynamic'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { motion } from 'framer-motion'

// Premium loading skeleton
function ComponentLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <span className="text-sm text-slate-500">Loading...</span>
      </div>
    </div>
  )
}

// Use next/dynamic with ssr: false to prevent hydration mismatches
const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const Problem = dynamic(() => import('@/components/Problem'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const Solution = dynamic(() => import('@/components/Solution'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const UseCases = dynamic(() => import('@/components/UseCases'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const Pricing = dynamic(() => import('@/components/Pricing'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const SocialImpact = dynamic(() => import('@/components/SocialImpact'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const CTA = dynamic(() => import('@/components/CTA'), {
  ssr: false,
  loading: () => <ComponentLoader />
})
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => <ComponentLoader />
})

// Error fallback component
function ComponentErrorFallback({ componentName }: { componentName: string }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 max-w-md mx-4">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Failed to load {componentName}
        </h2>
        <p className="text-slate-400 mb-4">
          Please refresh the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Hero" />}>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Problem" />}>
        <Problem />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Solution" />}>
        <Solution />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Use Cases" />}>
        <UseCases />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="How It Works" />}>
        <HowItWorks />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Pricing" />}>
        <Pricing />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Social Impact" />}>
        <SocialImpact />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Call to Action" />}>
        <CTA />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentErrorFallback componentName="Footer" />}>
        <Footer />
      </ErrorBoundary>
    </main>
  )
}