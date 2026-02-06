'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Link from 'next/link'
import { Eye, Zap, Globe, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'

const stats = [
    { value: 0, suffix: '$0', label: 'Hardware Cost', icon: Zap },
    { value: 99, suffix: '%', label: 'Cost Reduction', icon: Shield },
    { value: 0, suffix: 'Global', label: 'Scalability', icon: Globe, isText: true },
]

const features = [
    'Works with existing smartphones, tablets, laptops',
    'No proprietary hardware required',
    'Browser-based deployment',
    'Supports ICU, rehabilitation, and home care',
    'Designed for multilingual and low-resource settings',
]

// Animated Counter Component
function AnimatedCounter({ value, suffix, isText }: { value: number; suffix: string; isText?: boolean | undefined }) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (isText) return
        const controls = animate(count, value, {
            duration: 2,
            ease: "easeOut",
        })
        const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))
        return () => {
            controls.stop()
            unsubscribe()
        }
    }, [count, rounded, value, isText])

    if (isText) {
        return <span className="animate-number-glow">{suffix}</span>
    }

    return (
        <span className="animate-number-glow">
            {suffix === '$0' ? '$' : ''}{displayValue}{suffix === '%' ? '%' : ''}
        </span>
    )
}

// Pre-calculated particle positions to avoid hydration mismatch
const particlePositions = [
    { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 45 },
    { left: 35, top: 15 }, { left: 45, top: 60 }, { left: 55, top: 35 },
    { left: 65, top: 80 }, { left: 75, top: 20 }, { left: 85, top: 55 },
    { left: 95, top: 40 }, { left: 10, top: 70 }, { left: 20, top: 90 },
    { left: 30, top: 5 }, { left: 40, top: 75 }, { left: 50, top: 50 },
    { left: 60, top: 85 }, { left: 70, top: 30 }, { left: 80, top: 65 },
    { left: 90, top: 15 }, { left: 12, top: 48 }
]

// Floating Particle Component
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Dot Grid */}
            <div className="absolute inset-0 opacity-30">
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + (i % 4),
                            repeat: Infinity,
                            delay: (i % 3) * 0.7,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Larger Floating Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl"
                animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    delay: 2,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}

// Typing Animation Hook
function useTypingAnimation(text: string, speed: number = 50) {
    const [displayedText, setDisplayedText] = useState('')
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let i = 0
        setDisplayedText('')
        setIsComplete(false)

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1))
                i++
            } else {
                setIsComplete(true)
                clearInterval(timer)
            }
        }, speed)

        return () => clearInterval(timer)
    }, [text, speed])

    return { displayedText, isComplete }
}

export default function Hero() {
    const { displayedText, isComplete } = useTypingAnimation('Assistive Communication Infrastructure', 40)

    return (
        <section className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                {/* Floating Particles */}
                <FloatingParticles />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
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
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-status-pulse" />
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
                            <motion.div
                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow-multi"
                                animate={{
                                    boxShadow: [
                                        '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)',
                                        '0 0 60px rgba(59, 130, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.2)',
                                        '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)',
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Eye className="w-8 h-8 text-white" />
                            </motion.div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient-animated">
                                GAZE
                            </h1>
                        </div>

                        {/* Typing Animation Tagline */}
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 mb-6 h-10">
                            {displayedText}
                            {!isComplete && (
                                <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-typing-cursor" />
                            )}
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

                        {/* CTAs with Shimmer Effect */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/demo">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto btn-primary btn-shimmer flex items-center justify-center gap-2"
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
                        <motion.div
                            className="glass-card p-6 sm:p-8 card-3d"
                            whileHover={{ scale: 1.01 }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Zap className="w-5 h-5 text-blue-400" />
                                </motion.div>
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
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-start gap-3 group"
                                    >
                                        <motion.div
                                            className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                                            whileHover={{ scale: 1.2, backgroundColor: 'rgba(16, 185, 129, 0.4)' }}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                        </motion.div>
                                        <span className="text-slate-300 text-sm sm:text-base group-hover:text-white transition-colors">
                                            {feature}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Stats with Animated Counters */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + index * 0.15 }}
                                            className="text-center group"
                                        >
                                            <motion.div
                                                className="flex justify-center mb-2"
                                                whileHover={{ scale: 1.2, y: -4 }}
                                            >
                                                <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                            </motion.div>
                                            <div className="text-xl sm:text-2xl font-bold text-white">
                                                <AnimatedCounter
                                                    value={stat.value}
                                                    suffix={stat.suffix}
                                                    isText={stat.isText}
                                                />
                                            </div>
                                            <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-slate-500">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2"
                    >
                        <motion.div
                            className="w-1 h-2 rounded-full bg-blue-400"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
