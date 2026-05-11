import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, Target, Globe, Users, BarChart3, Shield, ArrowRight, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Brinowatt',
  description:
    'Brinowatt is an energy intelligence platform helping European businesses make confident, data-driven decisions about solar, battery storage, and heat pump investments.',
}

const values = [
  {
    icon: BarChart3,
    title: 'Data over guesswork',
    description:
      'Every estimate is grounded in country-specific electricity prices, solar irradiance from PVGIS, and equipment cost benchmarks — not marketing copy.',
  },
  {
    icon: Shield,
    title: 'Transparent & unbiased',
    description:
      "We don't sell hardware. Our independence means our recommendations are driven by your numbers, not a manufacturer's quota.",
  },
  {
    icon: Globe,
    title: 'Built for Europe',
    description:
      '13 country presets, EUR-native financials, GDPR-by-design data handling, and energy market knowledge that respects local regulation and incentives.',
  },
  {
    icon: Users,
    title: 'Specialist follow-up',
    description:
      'Numbers are a starting point. Every analysis can be paired with a tailored proposal from a vetted local energy specialist — at no obligation.',
  },
]

const stats = [
  { value: '€2.4M+', label: 'Total savings calculated' },
  { value: '500+', label: 'Businesses analysed' },
  { value: '12+', label: 'European countries' },
  { value: '<5 min', label: 'To a complete ROI report' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 lg:pt-32 pb-20 bg-gradient-to-b from-brand-50/40 via-white to-white">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-300 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold rounded-full mb-6">
              <Leaf className="w-3.5 h-3.5" />
              About Brinowatt
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
              Energy decisions deserve <br />
              <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
                better than spreadsheets.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Brinowatt is an independent energy intelligence platform. We help European
              businesses understand the real return on solar PV, battery storage, and heat
              pump investments — in minutes, not months.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">Our mission</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Europe's energy transition can't run on hesitation. Volatile electricity
                prices, ambitious decarbonisation targets, and an alphabet soup of subsidies
                leave most business owners with the same question: <strong>"Does this
                actually pay off — for us, in our country, with our usage profile?"</strong>
              </p>
              <p>
                Until now, getting a credible answer meant booking a paid feasibility study,
                chasing three quotes, or building a spreadsheet you'd never trust. Brinowatt
                replaces that with a transparent calculation — same methodology a consulting
                firm would use, available instantly, at no cost.
              </p>
              <p>
                Our job is to give you the clearest possible first answer. If the numbers
                make sense, we connect you with a vetted specialist who can deliver the
                project. If they don't, we save you weeks of evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-neutral-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
              Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How we work
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Four commitments that shape every calculation, every conversation, and every
              recommendation we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="p-6 md:p-8 bg-white border border-neutral-100 rounded-2xl shadow-card hover:shadow-card-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">{v.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4">
              <Lightbulb className="w-3.5 h-3.5" />
              Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              What's under the hood
            </h2>
            <p className="text-lg text-neutral-500">
              We're transparent about our assumptions because guesswork doesn't deserve
              the trust of a five- or six-figure investment.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Country-specific energy data',
                body: 'Electricity tariffs, feed-in rates, gas prices, solar irradiance (PVGIS), and grid CO₂ intensity — all sourced from Eurostat, ENTSO-E, and national regulators. Refreshed periodically.',
              },
              {
                title: 'Industry-standard equipment costs',
                body: 'CAPEX benchmarks for PV (€/kWp), battery storage (€/kWh), and heat pumps (€/kW) are calibrated to 2024 European installed-system prices for SME and commercial deployments.',
              },
              {
                title: 'Realistic operating assumptions',
                body: 'Self-consumption rates (with and without battery), round-trip efficiency, depth of discharge, COP for heat pumps, panel degradation, electricity price inflation, and a 5% discount rate for NPV.',
              },
              {
                title: 'Three-scenario sensitivity',
                body: 'Every result shows conservative (+15% capex / −20% savings), standard (base case), and optimistic (−10% capex / +20% savings) so you see the full uncertainty band, not a single optimistic number.',
              },
              {
                title: 'Synergy logic',
                body: 'When you model multiple technologies together (e.g. PV + battery), we account for shared self-consumption gains rather than naively summing — preventing the double-counting that flatters most online calculators.',
              },
            ].map((m, i) => (
              <div
                key={m.title}
                className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-100 text-brand-700 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1.5">{m.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-10 md:p-14 text-center text-white shadow-card-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to see your numbers?</h2>
            <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
              Five minutes from now you could have a country-specific, three-scenario ROI
              estimate for your site — with no email required to view the results.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-md"
              >
                Start the calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500/30 hover:bg-brand-500/50 border border-white/30 text-white font-semibold rounded-xl transition-colors"
              >
                Talk to us first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
