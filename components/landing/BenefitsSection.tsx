'use client'

import { Zap, TrendingDown, Shield, Clock, Globe, Users } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

const icons = [Zap, TrendingDown, Shield, Clock, Globe, Users]

export function BenefitsSection() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-white" id="benefits">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            {t.benefits.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.benefits.title}
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.benefits.items.map((benefit, i) => {
            const Icon = icons[i]
            return (
              <div
                key={benefit.title}
                className="group p-8 bg-white rounded-2xl border border-neutral-100 hover:border-brand-200 shadow-card hover:shadow-card-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2.5">{benefit.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
