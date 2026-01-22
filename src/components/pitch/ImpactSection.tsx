import { motion } from 'framer-motion'
import { METRICS } from './pitch-data'

export default function ImpactSection() {
    return (
        <motion.section
            id="impact"
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                    4
                                </div>
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-20"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                                    Impact at Scale
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base font-medium">
                                    Global accessibility transformation
                                </p>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8">
                    <div className="max-w-4xl mx-auto text-center">

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Accessibility as infrastructure.
                        </h3>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            {METRICS.map((metric, index) => (
                                <div key={index}>
                                    <div className={`mx-auto w-24 h-24 rounded-2xl ${metric.color} text-white text-3xl font-bold flex items-center justify-center mb-4`}>
                                        {metric.value}
                                    </div>
                                    <div className="text-xl font-semibold text-slate-900 mb-2">
                                        {metric.label}
                                    </div>
                                    <p className="text-slate-600 text-sm sm:text-base">
                                        {metric.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <blockquote className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-lg italic">
                            "GAZE allows assistive communication to scale like software —
                            not like medical hardware."
                        </blockquote>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}