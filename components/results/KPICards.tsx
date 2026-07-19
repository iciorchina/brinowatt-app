'use client'

import type { CombinedResults, PVResults, BESSResults, HeatPumpResults } from '@/types'
import { TrendingUp, DollarSign, BarChart2, Sun, Leaf, Thermometer } from 'lucide-react'
import { formatCurrency, formatPercent, formatKWh, formatTonnesCO2 } from '@/lib/utils/formatters'
import { useCalcT } from '@/lib/i18n/calc'

interface Props {
  results: CombinedResults
  pvResults?: PVResults
  bessResults?: BESSResults
  hpResults?: HeatPumpResults
}

export function KPICards({ results, pvResults, bessResults, hpResults }: Props) {
  const ct = useCalcT()
  const k = ct.results.kpi

  const cards = [
    {
      icon: TrendingUp, label: k.costReduction, value: formatPercent(results.energyCostReductionPercent),
      sub: k.costReductionSub, iconBg: 'bg-brand-100', iconColor: 'text-brand-700', valueBg: 'bg-brand-50',
    },
    {
      icon: DollarSign, label: k.npv, value: formatCurrency(results.npv),
      sub: k.npvSub, iconBg: 'bg-blue-100', iconColor: 'text-blue-700', valueBg: 'bg-blue-50',
    },
    {
      icon: BarChart2, label: k.roi10, value: formatPercent(results.roi10Years),
      sub: k.roi10Sub, iconBg: 'bg-purple-100', iconColor: 'text-purple-700', valueBg: 'bg-purple-50',
    },
    {
      icon: Sun,
      label: pvResults ? k.selfConsumption : bessResults ? k.selfConsumptionBoost : k.hpOutput,
      value: pvResults
        ? formatPercent(pvResults.selfConsumptionRate)
        : bessResults
        ? `+${formatPercent(bessResults.selfConsumptionIncrease)}`
        : hpResults
        ? formatKWh(hpResults.annualHeatPumpElectricityKWh)
        : '—',
      sub: pvResults ? k.selfConsumptionSub : bessResults ? k.selfConsumptionBoostSub : k.hpOutputSub,
      iconBg: 'bg-amber-100', iconColor: 'text-amber-700', valueBg: 'bg-amber-50',
    },
    {
      icon: Leaf, label: k.co2, value: formatTonnesCO2(results.totalCo2ReductionTonnes, ct.units.tCo2),
      sub: k.co2Sub, iconBg: 'bg-teal-100', iconColor: 'text-teal-700', valueBg: 'bg-teal-50',
    },
    {
      icon: Thermometer,
      label: pvResults ? k.pvProduction : hpResults ? k.heatingSaved : k.annualBenefit,
      value: pvResults
        ? formatKWh(pvResults.annualProductionKWh)
        : hpResults
        ? formatCurrency(hpResults.annualSavings) + ct.units.perYr
        : formatCurrency(results.totalAnnualSavings) + ct.units.perYr,
      sub: pvResults ? k.pvProductionSub : hpResults ? k.heatingSavedSub : k.annualBenefitSub,
      iconBg: 'bg-rose-100', iconColor: 'text-rose-700', valueBg: 'bg-rose-50',
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
