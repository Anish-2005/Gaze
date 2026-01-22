import { motion } from 'framer-motion'
import Link from 'next/link'
import { ETHICAL_PRINCIPLES } from './pitch-data'

export default function DecisionSection() {
    return (
        <motion.section
            id="decision"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                    6
                                </div>
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 opacity-20"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                                    The Decision
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base font-medium">
                                    Choose accessibility at scale
                                </p>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8">
                    <div className="max-w-4xl mx-auto text-center">

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Communication without compromise.
                        </h3>

                        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 mb-6">
                            GAZE restores a fundamental human capability using scalable software —
                            without sacrificing privacy, dignity, or safety.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            {ETHICAL_PRINCIPLES.map((item, index) => (
                                <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="font-semibold text-slate-900 mb-2">
                                        {item.principle}
                                    </div>
                                    <p className="text-slate-600 text-sm sm:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/demo"
                                className="px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                            >
                                Experience the Demo
                            </Link>

                            <Link
                                href="/institutions"
                                className="px-8 py-4 rounded-xl border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-50 transition"
                            >
                                Institutional Deployment →
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}