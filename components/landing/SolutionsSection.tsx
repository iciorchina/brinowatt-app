'use client'

import Link from 'next/link'
import { Sun, Battery, Thermometer, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

const mainMeta = [
  { icon: Sun, href: '/calculator?solution=pv', bgClass: 'from-amber-50 to-yellow-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-700', borderColor: 'hover:border-amber-200' },
  { icon: Battery, href: '/calculator?solution=bess', bgClass: 'from-blue-50 to-indigo-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-700', borderColor: 'hover:border-blue-200' },
  { icon: Thermometer, href: '/calculator?solution=heatpump', bgClass: 'from-rose-50 to-pink-50', iconBg: 'bg-rose-100', iconColor: 'text-rose-700', borderColor: 'hover:border-rose-200' },
]

const combinedMeta = [
  { href: '/calculator?solution=pv_bess', badgeColor: 'bg-brand-600' },
  { href: '/calculator?solution=pv_heatpump', badgeColor: 'bg-blue-600' },
  { href: '/calculator?solution=full_hybrid', badgeColor: 'bg-purple-600' },
]

export function SolutionsSection() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-neutral-50" id="solutions">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            {t.solutions.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.solutions.title}
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            {t.solutions.subtitle}
          </p>
        </div>

        {/* Main solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {t.solutions.main.map((sol, i) => {
            const meta = mainMeta[i]
            const Icon = meta.icon
            return (
              <div
                key={sol.title}
                className={`group relative bg-gradient-to-br ${meta.bgClass} rounded-2xl border border-neutral-100 ${meta.borderColor} p-6 transition-all duration-200 hover:shadow-xl flex flex-col`}
              >
                <div className={`w-14 h-14 ${meta.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${meta.iconColor}`} />
                </div>
                <div className="mb-1 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                  {sol.subtitle}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{sol.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">{sol.description}</p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {sol.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={meta.href}
                  className="inline-flex items-center gap-2 justify-center w-full px-5 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  {t.solutions.calculateSavings} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Combined solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.solutions.combined.map((sol, i) => {
            const meta = combinedMeta[i]
            return (
              <Link
                key={sol.title}
                href={meta.href}
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-neutral-200 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <div className={`inline-block px-2.5 py-0.5 ${meta.badgeColor} text-white text-xs font-semibold rounded-full mb-1`}>
                    {sol.badge}
                  </div>
                  <div className="font-semibold text-neutral-900">{sol.title}</div>
                  <div className="text-sm text-neutral-500">{sol.subtitle}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
