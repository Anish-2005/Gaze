import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye } from 'lucide-react'

export default function LiveProofSection() {
    return (
        <motion.section
            id="live-proof"
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                    3
                                </div>
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-20"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                                    Live Proof
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base font-medium">
                                    Working MVP ready for testing
                                </p>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8">
                    <div className="max-w-4xl mx-auto text-center">

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Working MVP ready for testing.
                        </h3>

                        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-4">
                            GAZE has a functional prototype that demonstrates core eye-tracking capabilities.
                            The MVP runs in-browser, processes gaze data locally, and validates the technical approach
                            for assistive communication.
                        </p>

                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 rounded-xl bg-slate-900 text-white text-base md:text-lg font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            <Eye className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                            Try MVP Demo
                        </Link>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base text-slate-600">
                            <div>Functional prototype</div>
                            <div>Core eye-tracking validated</div>
                            <div>Ready for user testing</div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}