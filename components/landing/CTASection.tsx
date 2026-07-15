'use client'

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

export function CTASection() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/20 border border-brand-500/30 rounded-full text-brand-400 text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
          {t.cta.badge}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {t.cta.title1} <br />
          <span className="text-brand-400">{t.cta.title2}</span>
        </h2>

        <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
          {t.cta.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {t.cta.pills.map((pill) => (
            <span
              key={pill}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm rounded-full"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-brand-600/25 hover:shadow-xl"
          >
            {t.cta.ctaPrimary} <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-neutral-800 text-white font-semibold rounded-xl text-lg border border-neutral-600 hover:border-neutral-500 transition-all duration-200"
          >
            <Phone className="w-5 h-5" /> {t.cta.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
