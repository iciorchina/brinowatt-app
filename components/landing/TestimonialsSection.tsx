// Sample / illustrative project profiles based on typical European deployments.
// Replace with real customer testimonials (with their permission) once available.
const testimonials = [
  {
    quote: "The 50 kWp PV + 75 kWh battery sizing matched our actual usage profile almost exactly. Three-scenario view made the boardroom decision easy.",
    name: 'Mid-size manufacturer',
    role: 'Finance lead',
    company: '~12,000 m² plant',
    country: 'France',
    initials: 'FR',
    savings: '~€42k/year potential',
    color: 'blue',
  },
  {
    quote: "Combined PV + heat pump cut a 38% slice off our annual energy spend in modelling. The country-specific gas-vs-electric numbers were the key insight.",
    name: 'Cold-chain logistics SME',
    role: 'Operations',
    company: '~8,000 m² warehouse',
    country: 'Germany',
    initials: 'DE',
    savings: '~€31k/year potential',
    color: 'brand',
  },
  {
    quote: "From first calculation to a vetted specialist quote in three weeks. The synergy logic for PV + battery prevented us from over-buying capacity.",
    name: 'Multi-site retail group',
    role: 'Facilities',
    company: '14 retail locations',
    country: 'Poland',
    initials: 'PL',
    savings: '~€19k/year potential',
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
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-800 text-sm font-semibold rounded-full mb-4">
            Sample project profiles · Illustrative
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            What typical European deployments look like
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto">
            Three example scenarios drawn from common SME profiles across the EU. Your
            numbers depend on your site, sector, and country.
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

        <p className="text-center text-neutral-400 text-xs mt-8 max-w-2xl mx-auto">
          * Illustrative scenarios based on typical European SME deployments — not actual
          customer endorsements. Real results depend on location, system specifications,
          consumption profile, and local market conditions.
        </p>
      </div>
    </section>
  )
}
