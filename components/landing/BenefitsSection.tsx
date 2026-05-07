import { Zap, TrendingDown, Shield, Clock, Globe, Users } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Reduce Energy Costs',
    description: 'Slash your electricity and heating bills by 20–45% with precisely sized systems optimised for your usage profile.',
  },
  {
    icon: TrendingDown,
    title: 'Predictable Energy Costs',
    description: 'Lock in your energy costs and shield your business from volatile energy markets and future price increases.',
  },
  {
    icon: Shield,
    title: 'Energy Independence',
    description: 'Reduce reliance on the grid. Produce, store, and manage your own clean energy — even during outages.',
  },
  {
    icon: Clock,
    title: 'Fast ROI Analysis',
    description: 'Get a complete financial analysis in under 5 minutes — no spreadsheets, no consultants, no waiting.',
  },
  {
    icon: Globe,
    title: 'Europe-Ready Calculations',
    description: 'Country-specific electricity prices, solar yields, installation costs and incentive assumptions built in.',
  },
  {
    icon: Users,
    title: 'Expert Follow-Up',
    description: 'Every analysis triggers a tailored offer from certified energy specialists. Real advice, not generic quotes.',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-24 bg-white" id="benefits">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            Why Brinowatt
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Leading Businesses Choose Brinowatt
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            From first estimate to signed contract — we provide the numbers, the confidence, and the expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group p-6 rounded-2xl border border-neutral-100 hover:border-brand-200 bg-white hover:bg-brand-50/30 transition-all duration-200 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                  <Icon className="w-6 h-6 text-brand-700" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
