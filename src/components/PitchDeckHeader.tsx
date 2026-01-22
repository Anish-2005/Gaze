'use client'

export default function PitchDeckHeader() {
  return (
    <header className="bg-white border-b border-slate-200 pt-20 md:pt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* Left: Title + Context */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Investor Pitch • January 2026
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              GAZE
              <span className="block sm:inline sm:ml-2 text-slate-500 font-medium">
                : Assistive Communication Platform
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-slate-600 leading-relaxed">
              Software-first eye-tracking communication replacing $10,000+ assistive hardware
              with a scalable, ethical, and hospital-ready platform.
            </p>
          </div>

          {/* Right: Ask Card */}
          <div className="w-full sm:w-auto">
            <div className="rounded-xl border border-slate-300 bg-slate-900 text-white px-5 py-4 shadow-sm">
              <div className="text-sm font-semibold tracking-wide">
                Raising Seed Round
              </div>

              <div className="mt-1 text-2xl font-bold">
                10K
              </div>

              <div className="mt-1 text-xs text-slate-300">
                Pre-revenue • Proprietary IP • Clinical focus
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}