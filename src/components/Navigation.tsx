'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Eye, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Track hydration - only enable animations after client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Institutions', href: '/institutions' },
    { label: 'Governance', href: '/governance' }
  ]

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-slate-900/20'
        : 'bg-transparent'
        }`}
      initial={mounted ? { y: -100 } : false}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow"
            >
              <Eye className="w-5 h-5 text-white" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              GAZE
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={mounted ? { opacity: 0, y: -10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mounted ? index * 0.1 : 0 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group py-2"
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}

            <Link href="/demo">
              <motion.button
                initial={mounted ? { opacity: 0, scale: 0.9 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: mounted ? 0.3 : 0 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all btn-shimmer flex items-center gap-2 group"
              >
                <span>Live Demo</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition relative"
            aria-label="Toggle navigation"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-slate-700/50 overflow-hidden bg-slate-900/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-4 px-4"
                >
                  <Link href="/demo" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg flex items-center justify-center gap-2 group btn-shimmer">
                      <span>Live Demo</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
