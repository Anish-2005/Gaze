'use client'

import { motion } from 'framer-motion'
import { Eye, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { label: 'Live Demo', href: '/demo' },
    { label: 'For Institutions', href: '/institutions' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Documentation', href: '#' }
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Governance', href: '/governance' },
    { label: 'Research', href: '#' },
    { label: 'Careers', href: '#' }
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Support', href: '#' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'HIPAA Compliance', href: '#' },
    { label: 'Accessibility', href: '#' }
  ]
}

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' }
]

export default function Footer() {
  return (
    <footer className="relative bg-[rgb(var(--section-bg))] border-t border-[var(--nav-border)]">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[rgb(var(--text-primary))]">GAZE</span>
            </Link>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-6 max-w-xs">
              Medical-grade eye-tracking communication for patients with paralysis.
              Free for personal use. Always accessible.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-black/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--nav-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[rgb(var(--text-muted))]">
              © 2026 GAZE. Open source assistive technology.
            </p>
            <p className="text-sm text-[rgb(var(--text-muted))] flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 inline" /> for accessibility
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
