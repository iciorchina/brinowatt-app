import Link from 'next/link'
import { Sun, Battery, Thermometer, ArrowRight, Star } from 'lucide-react'

const mainSolutions = [
  {
    icon: Sun,
    color: 'amber',
    title: 'Solar PV',
    subtitle: 'Photovoltaic Systems',
    description: 'Harness solar energy to power your operations directly. Ideal for businesses with roof or ground space and daytime electricity demand.',
    highlights: ['25-year system lifespan', 'Zero fuel cost operation', 'Feed-in tariff revenue', 'Scalable from 3 kWp'],
    href: '/calculator?solution=pv',
    bgClass: 'from-amber-50 to-yellow-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    borderColor: 'hover:border-amber-200',
  },
  {
    icon: Battery,
    color: 'blue',
    title: 'Battery Storage',
    subtitle: 'BESS Systems',
    description: 'Store excess solar energy or charge at low-cost off-peak periods. Maximise self-consumption, enable backup power, and shave peak demand.',
    highlights: ['Peak demand shaving', 'Backup power capability', 'Grid arbitrage', '12+ year lifespan'],
    href: '/calculator?solution=bess',
    bgClass: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    borderColor: 'hover:border-blue-200',
  },
  {
    icon: Thermometer,
    color: 'rose',
    title: 'Heat Pumps',
    subtitle: 'Air-to-Water Systems',
    description: 'Replace gas or oil heating with efficient heat pump technology. Up to 3.5× more efficient than resistance heating — dramatically cut heating costs.',
    highlights: ['3.0–4.5× COP efficiency', 'Heating & cooling', 'CO₂ emissions cut 60–80%', '20-year lifespan'],
    href: '/calculator?solution=heatpump',
    bgClass: 'from-rose-50 to-pink-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    borderColor: 'hover:border-rose-200',
  },
]

const combinedSolutions = [
  { title: 'Solar + Battery', subtitle: 'PV + BESS', badge: 'Most Popular', href: '/calculator?solution=pv_bess', badgeColor: 'bg-brand-600' },
  { title: 'Solar + Heat Pump', subtitle: 'PV + Heat Pump', badge: 'Best for Heating', href: '/calculator?solution=pv_heatpump', badgeColor: 'bg-blue-600' },
  { title: 'Full Hybrid', subtitle: 'PV + BESS + Heat Pump', badge: 'Maximum Savings', href: '/calculator?solution=full_hybrid', badgeColor: 'bg-purple-600' },
]

export function SolutionsSection() {
  return (
    <section className="py-24 bg-neutral-50" id="solutions">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            Energy Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Choose the Right Energy Solution
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Calculate the financial return of individual technologies or model combined systems for maximum impact.
          </p>
        </div>

        {/* Main solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {mainSolutions.map((sol) => {
            const Icon = sol.icon
            return (
              <div
                key={sol.title}
                className={`group relative bg-gradient-to-br ${sol.bgClass} rounded-2xl border border-neutral-100 ${sol.borderColor} p-6 transition-all duration-200 hover:shadow-xl flex flex-col`}
              >
                <div className={`w-14 h-14 ${sol.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${sol.iconColor}`} />
                </div>
                <div className="mb-1 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                  {sol.subtitle}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{sol.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">{sol.description}</p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {sol.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={sol.href}
                  className="inline-flex items-center gap-2 justify-center w-full px-5 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Calculate Savings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Combined solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {combinedSolutions.map((sol) => (
            <Link
              key={sol.title}
              href={sol.href}
              className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-neutral-200 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className={`inline-block px-2.5 py-0.5 ${sol.badgeColor} text-white text-xs font-semibold rounded-full mb-1`}>
                  {sol.badge}
                </div>
                <div className="font-semibold text-neutral-900">{sol.title}</div>
                <div className="text-sm text-neutral-500">{sol.subtitle}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
