'use client'

import { useLang } from '@/lib/i18n/LanguageContext'

export function StatsSection() {
  const { t } = useLang()

  return (
    <section className="py-16 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
