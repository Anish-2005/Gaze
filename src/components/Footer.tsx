import {
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
  Globe,
} from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'System Overview', href: '#' },
    { label: 'Accessibility Standards', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Open Architecture', href: '#' },
  ],
  Institutions: [
    { label: 'Hospitals & ICUs', href: '#' },
    { label: 'Public Sector Deployment', href: '#' },
    { label: 'NGO Partnerships', href: '#' },
    { label: 'Insurance & Reimbursement', href: '#' },
  ],
  Governance: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Ethical Guidelines', href: '#' },
    { label: 'Data Protection', href: '#' },
    { label: 'Regulatory Compliance', href: '#' },
  ],
}

const trustSignals = [
  { icon: ShieldCheck, text: 'Privacy-first, on-device processing' },
  { icon: FileText, text: 'Designed for healthcare compliance' },
  { icon: Globe, text: 'Globally deployable, web-based system' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-slate-300">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-2xl font-semibold text-white tracking-tight">
                GAZE
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Assistive Communication Infrastructure
              </div>
            </div>

            <p className="max-w-md text-slate-400 leading-relaxed mb-6">
              GAZE is a software-based assistive communication system designed
              to restore basic human interaction for individuals who are unable
              to speak or use traditional input devices.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>contact@gaze.global</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Global • Distributed deployment</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {section}
              </h4>
              <ul className="space-y-3 text-sm">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {trustSignals.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-sm text-slate-400"
              >
                <Icon className="w-4 h-4 text-slate-300" />
                <span>{item.text}</span>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-400">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} GAZE.
            <br className="md:hidden" />
            Assistive communication as public infrastructure.
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Compliance
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
