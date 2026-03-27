'use client'

import { Eye, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { label: 'Live Demo', href: '/demo' },
    { label: 'Institutions', href: '/institutions' },
    { label: 'Governance', href: '/governance' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  company: [
    { label: 'Mission', href: '/#solution' },
    { label: 'Social Impact', href: '/#social-impact' },
    { label: 'Contact', href: '/institutions' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Accessibility', href: '/governance' },
  ],
}

const socials = [
  { label: 'GitHub', href: '#', icon: Github },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'Email', href: '#', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--nav-border)', background: 'rgb(var(--section-bg))' }}>
      <div className="section-grid py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_22px_rgba(37,99,235,0.3)]">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">GAZE</p>
                <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                  Assistive Intelligence
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
              Eye-tracking communication software built for practical healthcare deployment and universal accessibility.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border"
                  style={{ borderColor: 'var(--card-border)', color: 'rgb(var(--text-secondary))', background: 'var(--card-bg)' }}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              Product
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--nav-border)' }}>
        <div className="section-grid flex flex-col gap-2 py-5 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ color: 'rgb(var(--text-muted))' }}>
          <p>© 2026 GAZE. Open, responsible assistive technology.</p>
          <p>Built for accessibility-first communication.</p>
        </div>
      </div>
    </footer>
  )
}

