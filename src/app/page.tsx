'use client'

import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { motion } from 'framer-motion'

// Lazy load components for better performance
const Hero = lazy(() => import('@/components/Hero'))
const Problem = lazy(() => import('@/components/Problem'))
const Solution = lazy(() => import('@/components/Solution'))
const UseCases = lazy(() => import('@/components/UseCases'))
const HowItWorks = lazy(() => import('@/components/HowItWorks'))
const Pricing = lazy(() => import('@/components/Pricing'))
const SocialImpact = lazy(() => import('@/components/SocialImpact'))
const CTA = lazy(() => import('@/components/CTA'))
const Footer = lazy(() => import('@/components/Footer'))

// Premium loading skeleton
function ComponentLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-900">
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

// Error fallback component
function ComponentErrorFallback({ componentName }: { componentName: string }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-slate-900">
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

// Wrapped component with error boundary
function LazyComponent({
  Component,
  componentName
}: {
  Component: React.ComponentType
  componentName: string
}) {
  return (
    <ErrorBoundary fallback={<ComponentErrorFallback componentName={componentName} />}>
      <Suspense fallback={<ComponentLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <LazyComponent Component={Hero} componentName="Hero" />
      <LazyComponent Component={Problem} componentName="Problem" />
      <LazyComponent Component={Solution} componentName="Solution" />
      <LazyComponent Component={UseCases} componentName="Use Cases" />
      <LazyComponent Component={HowItWorks} componentName="How It Works" />
      <LazyComponent Component={Pricing} componentName="Pricing" />
      <LazyComponent Component={SocialImpact} componentName="Social Impact" />
      <LazyComponent Component={CTA} componentName="Call to Action" />
      <LazyComponent Component={Footer} componentName="Footer" />
    </main>
  )
}