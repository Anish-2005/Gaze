'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Handshake } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Give the gift of communication
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Build a more inclusive digital future where everyone can be heard, 
            regardless of physical limitations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl transition-shadow"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Start Using GAZE - Free Forever</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-white/10 transition-colors"
            >
              <Handshake className="w-6 h-6" />
              <span>Partner With Us - For Institutions</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-blue-300 font-semibold mb-2">Zero Risk</div>
              <div className="text-gray-300">Free tier ensures no one is denied access due to cost</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-blue-300 font-semibold mb-2">Proven Impact</div>
              <div className="text-gray-300">Used by hospitals, NGOs, and individuals worldwide</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-blue-300 font-semibold mb-2">Technical Excellence</div>
              <div className="text-gray-300">ONNX model runs entirely in browser, no data leaves device</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}