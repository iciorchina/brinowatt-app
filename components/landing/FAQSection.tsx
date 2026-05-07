'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How accurate are the estimates?',
    a: 'Estimates are based on publicly available energy price data, solar irradiance databases (PVGIS), and equipment cost benchmarks for each country. They are indicative with a typical accuracy of ±15–25% and should be treated as a first-pass investment analysis. Our specialists provide a detailed, site-specific assessment upon request.',
  },
  {
    q: 'What data do I need to provide?',
    a: "You'll need your annual electricity consumption (from your utility bill), your building size or available roof area, and your general location. For heating solutions, your current heating fuel type and annual cost is also helpful. Our form provides smart defaults if you're unsure of exact figures.",
  },
  {
    q: 'Is this tool free to use?',
    a: "Yes, completely free. There's no registration required to run a calculation. You only provide contact details if you'd like a tailored offer from one of our energy specialists.",
  },
  {
    q: 'Which countries do you cover?',
    a: 'We support all major European markets: Germany, France, Italy, Spain, Netherlands, Belgium, Austria, Poland, Czech Republic, Sweden, Denmark, Portugal, and more. Country-specific electricity prices, solar irradiance, and cost benchmarks are built into each calculation.',
  },
  {
    q: 'How long does it take to receive a tailored offer?',
    a: 'After you submit your details, our team reviews your data and typically responds within 24 business hours with a customised proposal — including system specifications, financing options, and a detailed financial model.',
  },
  {
    q: 'Can I use this for large commercial or industrial sites?',
    a: 'Yes. The calculator is designed for SMEs but works well for larger commercial sites. For very large projects (multi-MW scale), we recommend requesting a direct consultation where our specialists can model your site with greater precision.',
  },
  {
    q: 'What financing options are available?',
    a: 'We can help you explore direct purchase, bank loans, leasing/rental agreements, power purchase agreements (PPAs), and energy-as-a-service contracts. Our specialists will advise on the best structure for your financial situation and jurisdiction.',
  },
  {
    q: 'Is my data secure and GDPR-compliant?',
    a: 'Yes. We process all data in accordance with the GDPR. Your information is used solely to prepare your energy analysis and tailored offer. We do not sell or share your data with third parties for marketing purposes. See our Privacy Policy for full details.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-500">
            Everything you need to know before starting your calculation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-xl overflow-hidden"
            >
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
