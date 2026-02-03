import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'GAZE - Giving Voice to the Paralyzed',
  description: 'Medical-grade eye-tracking communication for patients with paralysis using smartphone cameras',
  keywords: 'eye-tracking, accessibility, communication, paralysis, assistive technology',
  authors: [{ name: 'GAZE Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}