'use client'

import { motion } from 'framer-motion'
import { Eye, Smartphone, Check } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  const features = [
    'Works with any webcam',
    'No hardware required',
    '30-second setup',
    'Free forever option',
  ]

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Smartphone size={16} className="mr-2" />
              Works with any smartphone camera
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Control your digital</span>
              <span className="block text-gradient">world with just your eyes</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              GAZE is an AI-powered accessibility platform that turns eye movement into seamless computer control — 
              replacing $10,000+ hardware with software.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Try the Demo
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
                For Institutions
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              * No installation required. Works directly in your browser.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Eye Animation Container */}
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 p-8"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width) * 100
                  const y = ((e.clientY - rect.top) / rect.height) * 100
                  setEyePosition({ x, y })
                }}
              >
                {/* Eye Graphic */}
                <div className="relative w-64 h-64 mx-auto mt-16">
                  <div className="absolute inset-0 rounded-full bg-white border-4 border-blue-200"></div>
                  <div className="absolute inset-8 rounded-full bg-blue-100"></div>
                  <div 
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-teal-500"
                    style={{
                      left: `${eyePosition.x}%`,
                      top: `${eyePosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.1s ease-out',
                    }}
                  ></div>
                </div>

                {/* Cursor Trail */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-4">
                    <Eye className="w-6 h-6 text-blue-600 animate-pulse" />
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"></div>
                    <div className="w-8 h-8 border-2 border-blue-600 rounded-lg transform rotate-45 animate-pulse"></div>
                  </div>
                </div>

                {/* Typing Animation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64">
                  <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <div className="text-sm font-mono text-gray-700">
                        Hello... I can speak
                      </div>
                      <div className="w-2 h-4 bg-blue-600 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  )
}