const testimonials = [
  {
    quote: "The ROI calculator gave us the confidence to approve the €180k investment. The payback estimate was accurate within 5% of what we actually achieved.",
    name: 'Sophie Laurent',
    role: 'CFO',
    company: 'Leclerc Manufacturing',
    country: 'France',
    initials: 'SL',
    savings: '€42k/year saved',
    color: 'blue',
  },
  {
    quote: "Saved us 38% on our electricity bill in year one. We went from sceptical to fully convinced after seeing the numbers in black and white.",
    name: 'Marcus Weber',
    role: 'Operations Director',
    company: 'Weber Logistics GmbH',
    country: 'Germany',
    initials: 'MW',
    savings: '€31k/year saved',
    color: 'brand',
  },
  {
    quote: "We went from zero knowledge to a signed contract in 3 weeks. The process was surprisingly simple and the specialist follow-up was excellent.",
    name: 'Jan Kowalski',
    role: 'Facility Manager',
    company: 'Polska Retail S.A.',
    country: 'Poland',
    initials: 'JK',
    savings: '€19k/year saved',
    color: 'purple',
  },
]

const colorMap: Record<string, { bg: string; text: string }> = {
  blue:   { bg: 'bg-blue-600',   text: 'text-blue-600' },
  brand:  { bg: 'bg-brand-600',  text: 'text-brand-600' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600' },
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Real Businesses. Real Results.
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto">
            Hundreds of European businesses have used Brinowatt to evaluate and execute profitable energy investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            const c = colorMap[t.color]
            return (
              <div key={t.name} className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-neutral-700 text-sm leading-relaxed mb-6 flex-1 italic">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className={`w-10 h-10 ${c.bg} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-neutral-900 text-sm">{t.name}</div>
                    <div className="text-neutral-500 text-xs">{t.role}, {t.company}</div>
                    <div className="text-neutral-400 text-xs">{t.country}</div>
                  </div>
                  <div className={`text-xs font-bold ${c.text} text-right`}>{t.savings}</div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-neutral-400 text-xs mt-8">
          * Results shown are based on customer-reported outcomes. Individual results may vary based on location, system size, energy usage, and local conditions.
        </p>
      </div>
    </section>
  )
}
