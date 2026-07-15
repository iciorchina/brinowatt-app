'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

const stepColors = ['brand', 'blue', 'purple', 'amber']

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  brand:  { bg: 'bg-brand-100',  text: 'text-brand-700',  border: 'border-brand-200' },
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200' },
}

export function HowItWorksSection() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {t.howItWorks.steps.map((step, idx) => {
              const c = colorMap[stepColors[idx]]
              return (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-full ${c.bg} border-4 ${c.border} flex flex-col items-center justify-center mb-5 bg-white shadow-sm`}>
                    <span className={`text-xs font-bold ${c.text} uppercase tracking-widest`}>
                      {t.howItWorks.stepLabel}
                    </span>
                    <span className={`text-2xl font-black ${c.text}`}>{String(idx + 1)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-sm hover:shadow-lg"
          >
            {t.howItWorks.cta} <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-neutral-400 text-sm mt-3">{t.howItWorks.ctaNote}</p>
        </div>
      </div>
    </section>
  )
}
