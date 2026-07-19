'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Mail, Phone, ArrowRight, BarChart2 } from 'lucide-react'
import { useCalcT } from '@/lib/i18n/calc'

const STEP_META = [
  { icon: Mail, color: 'bg-blue-100 text-blue-700' },
  { icon: Clock, color: 'bg-amber-100 text-amber-700' },
  { icon: BarChart2, color: 'bg-brand-100 text-brand-700' },
  { icon: Phone, color: 'bg-purple-100 text-purple-700' },
]

export function ThankYouContent() {
  const ct = useCalcT()
  const t = ct.thankYou

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-16 lg:pt-20">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          {/* Success icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-brand-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-neutral-500 max-w-xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* What happens next */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-7 md:p-8 mb-7">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">{t.whatNext}</h2>
            <div className="space-y-5">
              {t.steps.map((step, i) => {
                const meta = STEP_META[i]
                const Icon = meta.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-semibold text-neutral-900">{step.title}</span>
                        <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
            >
              {t.backHome}
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold rounded-xl border border-neutral-200 transition-colors"
            >
              {t.runAnother} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-center text-neutral-400 text-sm mt-8">
            {t.questions}{' '}
            <a href="mailto:hello@brinowatt.com" className="text-brand-600 hover:underline">
              hello@brinowatt.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
