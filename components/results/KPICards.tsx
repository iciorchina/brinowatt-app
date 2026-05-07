import type { CombinedResults, PVResults, BESSResults, HeatPumpResults } from '@/types'
import { TrendingUp, DollarSign, BarChart2, Sun, Leaf, Thermometer } from 'lucide-react'
import { formatCurrency, formatPercent, formatKWh, formatTonnesCO2 } from '@/lib/utils/formatters'

interface Props {
  results: CombinedResults
  pvResults?: PVResults
  bessResults?: BESSResults
  hpResults?: HeatPumpResults
}

export function KPICards({ results, pvResults, bessResults, hpResults }: Props) {
  const cards = [
    {
      icon: TrendingUp,
      label: 'Energy Cost Reduction',
      value: formatPercent(results.energyCostReductionPercent),
      sub: 'Of current energy spend',
      iconBg: 'bg-brand-100',
      iconColor: 'text-brand-700',
      valueBg: 'bg-brand-50',
    },
    {
      icon: DollarSign,
      label: 'Net Present Value',
      value: formatCurrency(results.npv),
      sub: '20-yr NPV at 5% discount',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      valueBg: 'bg-blue-50',
    },
    {
      icon: BarChart2,
      label: 'ROI at 10 Years',
      value: formatPercent(results.roi10Years),
      sub: 'Return on total investment',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
      valueBg: 'bg-purple-50',
    },
    {
      icon: Sun,
      label: pvResults ? 'Self-Consumption Rate' : bessResults ? 'Self-Consumption Boost' : 'HP Annual Output',
      value: pvResults
        ? formatPercent(pvResults.selfConsumptionRate)
        : bessResults
        ? `+${formatPercent(bessResults.selfConsumptionIncrease)}`
        : hpResults
        ? formatKWh(hpResults.annualHeatPumpElectricityKWh)
        : '—',
      sub: pvResults
        ? 'PV generation used on-site'
        : bessResults
        ? 'Additional self-consumption'
        : 'Heat pump electricity use',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      valueBg: 'bg-amber-50',
    },
    {
      icon: Leaf,
      label: 'CO₂ Reduction',
      value: formatTonnesCO2(results.totalCo2ReductionTonnes),
      sub: 'Annual carbon savings',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
      valueBg: 'bg-teal-50',
    },
    {
      icon: Thermometer,
      label: pvResults ? 'Annual PV Production' : hpResults ? 'Heating Cost Saved' : 'Annual Benefit',
      value: pvResults
        ? formatKWh(pvResults.annualProductionKWh)
        : hpResults
        ? formatCurrency(hpResults.annualSavings) + '/yr'
        : formatCurrency(results.totalAnnualSavings) + '/yr',
      sub: pvResults ? 'Est. solar generation' : hpResults ? 'vs current heating fuel' : 'Total energy savings',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-700',
      valueBg: 'bg-rose-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.label} className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
            <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div className={`inline-block px-2 py-0.5 ${card.valueBg} rounded-lg mb-2`}>
              <span className="text-xl md:text-2xl font-bold text-neutral-900">{card.value}</span>
            </div>
            <div className="text-xs font-semibold text-neutral-700">{card.label}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{card.sub}</div>
          </div>
        )
      })}
    </div>
  )
}
