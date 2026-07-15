'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

export function FAQSection() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            {t.faq.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.faq.title}
          </h2>
          <p className="text-lg text-neutral-500">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                suppressHydrationWarning
              >
                <span className="font-semibold text-neutral-900">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 bg-neutral-50">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
