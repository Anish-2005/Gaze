'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Eye, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'Overview', href: '/' },
  { label: 'Solution', href: '/#solution' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Institutions', href: '/institutions' },
  { label: 'Governance', href: '/governance' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl shadow-[0_14px_40px_rgba(7,13,25,0.22)]' : 'backdrop-blur-sm'
      }`}
      style={{
        background: 'var(--nav-bg)',
        borderColor: 'var(--nav-border)',
      }}
    >
      <div className="section-grid">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)]">
              <Eye className="h-[18px] w-[18px]" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'rgb(var(--text-primary))' }}>
                GAZE
              </p>
              <p className="text-[11px] leading-tight" style={{ color: 'rgb(var(--text-muted))' }}>
                Assistive Intelligence
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.split('#')[0]) && item.href !== '/'
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium"
                  style={{
                    color: active ? 'rgb(var(--text-primary))' : 'rgb(var(--text-secondary))',
                    background: active ? 'color-mix(in oklab, rgb(var(--accent-blue)) 16%, transparent)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/demo" className="btn-brand btn-shimmer text-sm">
              Launch Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((current) => !current)}
              className="rounded-lg border p-2"
              style={{ borderColor: 'var(--card-border)', color: 'rgb(var(--text-primary))' }}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t py-3 md:hidden"
              style={{ borderColor: 'var(--nav-border)' }}
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium"
                    style={{ color: 'rgb(var(--text-secondary))' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/demo" className="btn-brand mt-2 w-full text-sm" onClick={() => setMobileOpen(false)}>
                  Launch Demo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

