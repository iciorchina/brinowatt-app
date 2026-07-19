'use client'

import Link from 'next/link'
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  CheckCircle2,
  Euro,
  Leaf,
  BarChart3,
} from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

const trustIcons = [Shield, CheckCircle2, Globe, Zap]

export function HeroSection() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-green-400/8 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/6 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-green-300/4 blur-3xl" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        <div className="absolute top-24 right-[15%] w-4 h-4 rounded-full bg-green-400/30 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-[10%] w-2.5 h-2.5 rounded-full bg-blue-400/25 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-[8%] w-3 h-3 rounded-full bg-green-500/25 animate-pulse" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <div className="absolute top-1/3 left-[12%] w-2 h-2 rounded-full bg-blue-300/30 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── Left column: copy ─── */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6">
              {t.hero.headline1}
              <span className="relative">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {t.hero.headlineHighlight}
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                  <path d="M2 8 Q75 2 150 8 Q225 14 298 6" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#16a34a" />
                      <stop offset="1" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {t.hero.headline2}
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
              {t.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-2xl transition-all duration-200 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 active:scale-95"
              >
                <BarChart3 className="w-5 h-5" />
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {t.hero.trust.map((label, i) => {
                const Icon = trustIcons[i]
                return (
                  <div key={label} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Icon className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ─── Right column: sample result card ─── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-green-400/12 blur-2xl" />
            </div>

            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-100 text-xs font-semibold uppercase tracking-wider">
                      {t.hero.card.sampleResults}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
                      {t.hero.card.indicative}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-bold">PV 50 kWp + BESS 75 kWh</h3>
                  <p className="text-green-100 text-sm mt-0.5">{t.hero.card.subtitle}</p>
                </div>

                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center justify-between p-4 rounded-2xl bg-green-50 border border-green-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-600 text-white">
                        <Euro className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-xs text-green-700 font-medium">{t.hero.card.annualSavings}</p>
                        <p className="text-2xl font-extrabold text-green-700">€18,400</p>
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">{t.hero.card.paybackPeriod}</p>
                    <p className="text-xl font-bold text-slate-800">3.0 {t.hero.card.yearsUnit}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{t.hero.card.fromInvestment}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">{t.hero.card.co2Reduction}</p>
                    <div className="flex items-center gap-1.5">
                      <Leaf className="w-4 h-4 text-green-500" />
                      <p className="text-xl font-bold text-slate-800">22 {t.hero.card.tonsUnit}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{t.hero.card.annualOffset}</p>
                  </div>

                  <div className="col-span-2 flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <div>
                      <p className="text-xs text-blue-600 font-medium">{t.hero.card.roi10}</p>
                      <p className="text-2xl font-extrabold text-blue-700">283%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-blue-500">{t.hero.card.netProfitAfter}</p>
                      <p className="text-sm font-semibold text-blue-600">{t.hero.card.tenYears}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-300" />
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href="/calculator"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors active:scale-95"
                  >
                    {t.hero.card.getResults}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-slate-400 mt-2">{t.hero.card.freeNoReg}</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-full shadow-lg border border-slate-100 text-xs font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {t.hero.card.liveEstimates}
              </div>
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-2xl shadow-lg border border-slate-100">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 leading-none">{t.hero.card.avgSavings}</p>
                  <p className="text-sm font-bold text-slate-800 leading-none mt-0.5">{t.hero.card.energyCosts}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  )
}
