'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye, Zap, Globe, Shield, ArrowRight, Play, Smartphone, Brain, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

// Stagger animation for children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return count
}

// Stat Card Component
function StatCard({ value, label, suffix = '', prefix = '', icon: Icon, delay = 0 }: {
    value: number
    label: string
    suffix?: string
    prefix?: string
    icon: React.ElementType
    delay?: number
}) {
    const count = useCounter(value, 2000)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl overflow-hidden"
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {prefix}{count}{suffix}
                </div>
                <div className="text-sm text-slate-400">{label}</div>
            </div>
        </motion.div>
    )
}

// Feature pill component
function FeaturePill({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {children}
        </motion.div>
    )
}

// Demo Preview Card
function DemoPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

            <div className="relative rounded-2xl bg-slate-900 border border-slate-700/50 overflow-hidden">
                {/* Mock Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="h-6 rounded-md bg-slate-700/50 flex items-center px-3">
                            <span className="text-xs text-slate-500">gaze-demo.app</span>
                        </div>
                    </div>
                </div>

                {/* Demo Content */}
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                    {/* Eye Tracking Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Concentric circles */}
                        <motion.div
                            className="absolute w-32 h-32 rounded-full border-2 border-blue-500/20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute w-48 h-48 rounded-full border border-purple-500/10"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        />

                        {/* Center eye icon */}
                        <motion.div
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Eye className="w-10 h-10 text-white" />
                        </motion.div>
                    </div>

                    {/* Floating text indicators */}
                    <motion.div
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-xs text-emerald-400 font-medium">Tracking Active</span>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <span className="text-xs text-blue-400 font-medium">98.5% Accuracy</span>
                    </motion.div>
                </div>

                {/* Play Button Overlay */}
                <Link href="/demo" className="absolute inset-0 flex items-center justify-center bg-slate-900/0 hover:bg-slate-900/40 transition-colors duration-300 group/play">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/play:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Play className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    )
}

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800" />

                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[80px]"
                    animate={{
                        x: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">

                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-300">Open Source • Medical-Grade Accessibility</span>
                    </div>
                </motion.div>

                {/* Main Grid - Bento Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-12 gap-6 lg:gap-8"
                >
                    {/* Left Column - Main Message */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Headline */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                                <span className="text-white">Giving </span>
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">Voice</span>
                                <br />
                                <span className="text-white">to the </span>
                                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Paralyzed</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed">
                                Medical-grade eye-tracking communication that works on any smartphone.
                                No expensive hardware. Just a camera and our AI.
                            </p>
                        </motion.div>

                        {/* Feature Pills */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                            <FeaturePill delay={0.3}>Works on any device</FeaturePill>
                            <FeaturePill delay={0.35}>No hardware needed</FeaturePill>
                            <FeaturePill delay={0.4}>Browser-based</FeaturePill>
                            <FeaturePill delay={0.45}>HIPAA Ready</FeaturePill>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/demo">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto group relative px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Eye className="w-5 h-5" />
                                        Try Live Demo
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.button>
                            </Link>

                            <Link href="/institutions">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-white bg-slate-800/80 border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600 transition-all"
                                >
                                    For Institutions
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
                            <StatCard
                                value={0}
                                prefix="$"
                                label="Hardware Cost"
                                icon={Zap}
                                delay={0.5}
                            />
                            <StatCard
                                value={99}
                                suffix="%"
                                label="Cost Reduction"
                                icon={Shield}
                                delay={0.6}
                            />
                            <div className="col-span-2 sm:col-span-1">
                                <StatCard
                                    value={50}
                                    suffix="M+"
                                    label="Potential Users"
                                    icon={Globe}
                                    delay={0.7}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Demo Preview */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <DemoPreview />

                        {/* Technology badges below demo */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start"
                        >
                            {[
                                { icon: Smartphone, label: 'Mobile First' },
                                { icon: Brain, label: 'AI Powered' },
                                { icon: Users, label: 'Accessible' }
                            ].map((item, i) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/40 border border-slate-700/30"
                                >
                                    <item.icon className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-400">{item.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

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
                        className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2"
                    >
                        <motion.div
                            className="w-1 h-2 rounded-full bg-slate-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
