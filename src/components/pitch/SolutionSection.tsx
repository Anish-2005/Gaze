import { motion } from 'framer-motion'
import { SOLUTION_FEATURES } from './pitch-data'

export default function SolutionSection() {
    return (
        <motion.section
            id="solution"
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                    2
                                </div>
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                                    Our Solution
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base font-medium">
                                    Software-first accessibility innovation
                                </p>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 py-8">
                    <div className="max-w-4xl mx-auto">

                        {/* Headline */}
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-center mb-4">
                            We removed the hardware entirely.
                        </h3>

                        {/* Core Explanation */}
                        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-6">
                            GAZE converts standard webcams and smartphone cameras into
                            high-precision assistive communication systems using
                            real-time computer vision and adaptive AI.
                            No proprietary devices. No installations. No infrastructure changes.
                        </p>

                        {/* Divider */}
                        <div className="my-6 border-t border-slate-200" />

                        {/* Architecture / Capabilities */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                            {SOLUTION_FEATURES.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-400 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6" />
                                    </div>

                                    <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                                        {feature.title}
                                    </h4>

                                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Closing Insight */}
                        <div className="mt-8 max-w-3xl mx-auto text-center">
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                By shifting assistive communication from specialized hardware
                                to software infrastructure, GAZE becomes instantly deployable
                                across homes, hospitals, and public systems worldwide.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}