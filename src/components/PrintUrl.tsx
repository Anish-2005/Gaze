'use client'

import { useState } from 'react'

export default function PrintUrl() {
  const [url] = useState(() => typeof window !== 'undefined' ? window.location.href : '')

  if (!url) return null

  return (
    <p className="text-sm text-gray-500 mt-4">
      Printed from: {url} • {new Date().toLocaleDateString()}
    </p>
  )
}