'use client'

import Link from 'next/link'
import { Leaf, Target, Globe, Users, BarChart3, Shield, ArrowRight, Lightbulb } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

const valueIcons = [BarChart3, Shield, Globe, Users]

export function AboutContent() {
  const { t } = useLang()
  const a = t.about

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 lg:pt-32 pb-20 bg-gradient-to-b from-brand-50/40 via-white to-white">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-300 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold rounded-full mb-6">
              <Leaf className="w-3.5 h-3.5" />
              {a.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
              {a.heroTitle1} <br />
              <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
                {a.heroTitle2}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {a.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">{a.missionTitle}</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-neutral-700 leading-relaxed">
              <p>{a.missionP1}</p>
              <p>{a.missionP2}</p>
              <p>{a.missionP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {a.stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-neutral-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
              {a.valuesBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {a.valuesTitle}
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              {a.valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {a.values.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <div
                  key={v.title}
                  className="p-6 md:p-8 bg-white border border-neutral-100 rounded-2xl shadow-card hover:shadow-card-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">{v.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4">
              <Lightbulb className="w-3.5 h-3.5" />
              {a.methodBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {a.methodTitle}
            </h2>
            <p className="text-lg text-neutral-500">{a.methodSubtitle}</p>
          </div>

          <div className="space-y-4">
            {a.methods.map((m, i) => (
              <div key={m.title} className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-100 text-brand-700 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1.5">{m.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-10 md:p-14 text-center text-white shadow-card-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{a.ctaTitle}</h2>
            <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">{a.ctaSubtitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-md"
              >
                {a.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500/30 hover:bg-brand-500/50 border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                {a.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
