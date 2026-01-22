import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function ProblemSection() {
    return (
        <motion.section
            id="problem"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-28"
        >
            <div className="bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-8 overflow-hidden">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                            backgroundSize: '20px 20px'
                        }}></div>
                    </div>

                    {/* Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                    1
                                </div>
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                                    The Problem
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base font-medium">
                                    Understanding the communication crisis
                                </p>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 py-8">
                    <div className="max-w-4xl mx-auto">

                        {/* Headline */}
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-center mb-4">
                            Communication access is fundamentally broken.
                        </h3>

                        {/* Core Explanation */}
                        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-6">
                            Millions of people lose the ability to speak due to paralysis, ALS, stroke, or
                            critical illness. While eye-tracking technology exists, it depends on
                            proprietary hardware costing over <span className="font-semibold text-slate-800">$10,000</span>,
                            placing basic communication out of reach for most families, hospitals, and public systems.
                        </p>

                        {/* Divider */}
                        <div className="my-6 border-t border-slate-200" />

                        {/* Insight Box */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-6">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-slate-900 font-semibold text-base md:text-lg mb-2">
                                        The real failure is not technological.
                                    </p>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                        When communication tools exist but are financially or operationally inaccessible,
                                        we unintentionally turn a basic human function into a privilege.
                                        This gap affects patient dignity, clinical outcomes, and caregiver efficiency
                                        at global scale.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}