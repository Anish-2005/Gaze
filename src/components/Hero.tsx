'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative bg-[#F7F9FC] text-[#0F172A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">

                {/* Impact Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-sm font-medium text-slate-700 mb-10"
                >
                    Global Accessibility • Assistive Technology
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT — MESSAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight mb-6">
                            GAZE
                        </h1>

                        <h2 className="text-xl md:text-2xl xl:text-3xl font-medium text-slate-700 mb-6">
                            Assistive Communication Infrastructure
                        </h2>

                        <p className="text-lg text-slate-600 max-w-xl mb-10">
                            Millions of people lose the ability to speak due to paralysis,
                            neurological disease, or critical care intervention.
                            <br /><br />
                            GAZE replaces expensive, inaccessible eye-tracking hardware
                            with a software system that runs on any standard camera.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/demo">
                                <button className="px-8 py-4 rounded-md bg-slate-900 text-white font-medium text-lg hover:bg-slate-800 transition">
                                    Live Demonstration
                                </button>
                            </Link>

                            <button className="px-8 py-4 rounded-md border border-slate-400 text-slate-800 font-medium text-lg hover:bg-slate-100 transition">
                                Hospitals & Public Institutions
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="h-full"
                    >
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm h-full flex flex-col">

                            {/* Top */}
                            <div>
                                <div className="text-sm text-slate-500 mb-6">
                                    System Overview
                                </div>

                                <ul className="space-y-4 text-slate-700 text-base">
                                    <li>• Works with existing smartphones, tablets, laptops</li>
                                    <li>• No proprietary hardware required</li>
                                    <li>• Browser-based deployment</li>
                                    <li>• Supports ICU, rehabilitation, and home care</li>
                                    <li>• Designed for multilingual and low-resource settings</li>
                                </ul>
                            </div>

                            {/* Bottom — Metrics always sit at the base */}
                            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-6 text-center">
                                <div>
                                    <div className="text-2xl font-semibold text-slate-900">$0</div>
                                    <div className="text-sm text-slate-500">Hardware Cost</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold text-slate-900">99%</div>
                                    <div className="text-sm text-slate-500">Cost Reduction</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold text-slate-900">Global</div>
                                    <div className="text-sm text-slate-500">Scalability</div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
