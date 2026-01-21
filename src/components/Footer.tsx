import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Shield,
  Globe,
  FileText
} from 'lucide-react'

const footerLinks = {
  'About GAZE': [
    { label: 'Our Mission', href: '#' },
    { label: 'Team', href: '#' },
    { label: 'Accessibility Statement', href: '#' },
    { label: 'Press & Media', href: '#' },
  ],
  'For Users': [
    { label: 'Tutorials', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Support Center', href: '#' },
    { label: 'Voice Cloning Guide', href: '#' },
  ],
  'For Organizations': [
    { label: 'Hospital Licensing', href: '#' },
    { label: 'NGO Partnerships', href: '#' },
    { label: 'Insurance Reimbursement', href: '#' },
    { label: 'SDK Licensing (EdTech/Gaming)', href: '#' },
  ],
}

const trustBadges = [
  { icon: <Shield className="w-5 h-5" />, text: 'Privacy-first design' },
  { icon: <FileText className="w-5 h-5" />, text: 'GDPR & HIPAA compliant' },
  { icon: <Globe className="w-5 h-5" />, text: 'Open-source components' },
  { icon: <Heart className="w-5 h-5" />, text: 'Data stays on your device' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg"></div>
              <div>
                <div className="text-2xl font-bold text-white">GAZE</div>
                <div className="text-sm text-blue-300">The Eye-Tracking Communicator</div>
              </div>
            </div>
            <p className="mb-6 max-w-md">
              Giving a voice to the paralyzed using only a smartphone selfie camera.
              Compassionate capitalism in action.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>contact@gaze.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
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

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="text-blue-400">{badge.icon}</div>
              <span className="text-sm">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © {new Date().getFullYear()} GAZE. Compassionate Capitalism.
                <br />
                All rights reserved.
              </p>
            </div>
            
            <div className="text-sm">
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">Ethical Guidelines</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}