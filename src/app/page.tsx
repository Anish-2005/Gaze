'use client'

import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

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

// Loading component
function ComponentLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

// Error fallback component
function ComponentErrorFallback({ componentName }: { componentName: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Failed to load {componentName}
        </h2>
        <p className="text-gray-600 mb-4">
          Please refresh the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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
    <main className="min-h-screen">
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