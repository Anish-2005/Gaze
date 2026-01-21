'use client'

import { motion } from 'framer-motion'
import { Camera, Eye, Map, MousePointer } from 'lucide-react'

const steps = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Webcam',
    description: 'Use any standard webcam or smartphone camera',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Eye Tracking',
    description: 'AI computer vision detects iris position with extreme precision',
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: 'Gaze Mapping',
    description: 'Real-time conversion of eye movement to screen coordinates',
  },
  {
    icon: <MousePointer className="w-6 h-6" />,
    title: 'Cursor Control',
    description: 'Seamless digital interaction through eye movement',
  },
]

export default function Solution() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How <span className="text-gradient">GAZE</span> works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GAZE uses computer vision and adaptive AI to understand eye movement and convert it into reliable digital interaction.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center mb-6 shadow-lg">
                  <div className="text-white">{step.icon}</div>
                </div>
                
                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-8 -left-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8">
                    <div className="w-6 h-6 border-b-2 border-r-2 border-blue-300 transform rotate-45"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-100 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h4 className="text-2xl font-semibold mb-4">No technical jargon. No complex setup.</h4>
            <p className="text-gray-700 text-lg">
              Just open GAZE in your browser, calibrate in 30 seconds, and start communicating.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}