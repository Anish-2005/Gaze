import type { Metadata } from 'next'
import './demo.module.css'

export const metadata: Metadata = {
  title: 'GAZE Demo - Medical Eye-Tracking Interface',
  description: 'Medical-grade eye-tracking communication for patients with paralysis',
  robots: 'noindex, nofollow',
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full bg-gray-50">
      {children}
    </div>
  )
}