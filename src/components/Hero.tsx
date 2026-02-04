'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye, Zap, Globe, Shield } from 'lucide-react'

const stats = [
    { value: '$0', label: 'Hardware Cost', icon: Zap },
    { value: '99%', label: 'Cost Reduction', icon: Shield },
    { value: 'Global', label: 'Scalability', icon: Globe },
]

const features = [
    'Works with existing smartphones, tablets, laptops',
    'No proprietary hardware required',
    'Browser-based deployment',
    'Supports ICU, rehabilitation, and home care',
    'Designed for multilingual and low-resource settings',
]

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl animate-pulse-glow" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28">
                {/* Impact Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center lg:justify-start mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gradient">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium text-slate-300">
                            Global Accessibility • Assistive Technology
                        </span>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* LEFT — MESSAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center lg:text-left"
                    >
                        {/* Logo */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow-blue">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient">
                                GAZE
                            </h1>
                        </div>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 mb-6">
                            Assistive Communication Infrastructure
                        </h2>

                        <p className="text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 text-base sm:text-lg leading-relaxed">
                            Millions of people lose the ability to speak due to paralysis,
                            neurological disease, or critical care intervention.
                            <br /><br />
                            <span className="text-slate-300">
                                GAZE replaces expensive, inaccessible eye-tracking hardware
                                with a software system that runs on any standard camera.
                            </span>
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/demo">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2"
                                >
                                    <Eye className="w-5 h-5" />
                                    Live Demonstration
                                </motion.button>
                            </Link>

                            <Link href="/institutions">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto btn-secondary"
                                >
                                    Hospitals & Institutions
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT — SYSTEM OVERVIEW */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="glass-card p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">System Overview</h3>
                                    <p className="text-sm text-slate-400">How GAZE works</p>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                        </div>
                                        <span className="text-slate-300 text-sm sm:text-base">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                            className="text-center"
                                        >
                                            <div className="flex justify-center mb-2">
                                                <Icon className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                                            <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-slate-500">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-2 rounded-full bg-slate-500" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
