'use client'

import dynamic from 'next/dynamic'

const DemoShell = dynamic(() => import('./DemoShell'), { ssr: false })

export default function DemoPage() {
  return <DemoShell />
}