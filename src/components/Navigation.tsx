'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Institutions', href: '/institutions' },
    { label: 'Governance', href: '/governance' }
    // { label: 'About', href: '/about' }, // Future addition

  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F7F9FC]/95 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-slate-900 flex items-center justify-center text-white font-semibold text-sm">
              G
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              GAZE
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition"
              >
                {item.label}
              </a>
            ))}

            <Link href="/demo">
              <button className="ml-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                Live Demonstration
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 bg-[#F7F9FC]">
            <div className="py-4 space-y-2">
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4">
                <Link href="/demo">
                  <button className="w-full px-4 py-3 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                    Live Demonstration
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
