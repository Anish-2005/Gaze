import { motion } from 'framer-motion'
import { WHY_NOW_ITEMS } from './pitch-data'

export default function WhyNowSection() {
    return (
        <motion.section
            id="why-now"
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                    5
                                </div>
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 opacity-20"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                                    Why Now
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base font-medium">
                                    Perfect timing for accessibility innovation
                                </p>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8">
                    <div className="max-w-4xl mx-auto">

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-center">
                            The conditions finally align.
                        </h3>

                        <div className="space-y-4">
                            {WHY_NOW_ITEMS.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900 mb-1">
                                            {item.title}
                                        </p>
                                        <p className="text-slate-600 text-base">
                                            {item.detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}