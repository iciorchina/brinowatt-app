import type { PVResults, BESSResults, HeatPumpResults } from '@/types'
import { Sun, Battery, Thermometer } from 'lucide-react'
import { formatCurrency, formatKWh, formatKWp, formatPercent, formatYears, formatTonnesCO2, formatNumber } from '@/lib/utils/formatters'

interface Props {
  pvResults?: PVResults
  bessResults?: BESSResults
  hpResults?: HeatPumpResults
}

interface DataRow {
  label: string
  value: string
}

function SummaryCard({
  icon: Icon,
  title,
  subtitle,
  data,
  headerBg,
  iconColor,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  data: DataRow[]
  headerBg: string
  iconColor: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
      <div className={`${headerBg} px-5 py-4 flex items-center gap-3`}>
        <div className="w-9 h-9 bg-white/30 rounded-xl flex items-center justify-center">
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <div className="font-bold text-neutral-900">{title}</div>
          <div className="text-xs text-neutral-600">{subtitle}</div>
        </div>
      </div>
      <div className="p-5">
        <dl className="space-y-2.5">
          {data.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3">
              <dt className="text-sm text-neutral-500">{row.label}</dt>
              <dd className="text-sm font-semibold text-neutral-900 text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export function SystemSummaryCards({ pvResults, bessResults, hpResults }: Props) {
  const cards = []

  if (pvResults) {
    cards.push(
      <SummaryCard
        key="pv"
        icon={Sun}
        title="Solar PV System"
        subtitle="Photovoltaic"
        headerBg="bg-amber-50"
        iconColor="text-amber-600"
        data={[
          { label: 'System Size', value: formatKWp(pvResults.systemSizeKWp) },
          { label: 'Annual Production', value: formatKWh(pvResults.annualProductionKWh) },
          { label: 'Self-Consumption', value: formatPercent(pvResults.selfConsumptionRate) },
          { label: 'Grid Export', value: formatKWh(pvResults.gridExportKWh) + '/yr' },
          { label: 'Grid Export Revenue', value: formatCurrency(pvResults.gridExportRevenue) + '/yr' },
          { label: 'Annual Benefit', value: formatCurrency(pvResults.totalAnnualBenefit) + '/yr' },
          { label: 'CAPEX Estimate', value: formatCurrency(pvResults.capexEUR) },
          { label: 'Simple Payback', value: formatYears(pvResults.paybackYears) },
          { label: 'CO₂ Reduction', value: formatTonnesCO2(pvResults.co2ReductionTonnes) },
        ]}
      />
    )
  }

  if (bessResults) {
    cards.push(
      <SummaryCard
        key="bess"
        icon={Battery}
        title="Battery Storage"
        subtitle="BESS System"
        headerBg="bg-blue-50"
        iconColor="text-blue-600"
        data={[
          { label: 'Storage Capacity', value: `${formatNumber(bessResults.storageSizeKWh, 0)} kWh` },
          { label: 'Power Rating', value: `${formatNumber(bessResults.powerKW, 0)} kW` },
          { label: 'Self-Consumption Boost', value: `+${formatPercent(bessResults.selfConsumptionIncrease)}` },
          { label: 'Additional Self-Use', value: formatKWh(bessResults.additionalSelfConsumptionKWh) + '/yr' },
          { label: 'Peak Shaving Savings', value: formatCurrency(bessResults.peakShavingSavings) + '/yr' },
          { label: 'Annual Savings', value: formatCurrency(bessResults.annualSavings) + '/yr' },
          { label: 'CAPEX Estimate', value: formatCurrency(bessResults.capexEUR) },
          { label: 'Simple Payback', value: formatYears(bessResults.paybackYears) },
        ]}
      />
    )
  }

  if (hpResults) {
    cards.push(
      <SummaryCard
        key="hp"
        icon={Thermometer}
        title="Heat Pump System"
        subtitle="Air-to-Water"
        headerBg="bg-rose-50"
        iconColor="text-rose-600"
        data={[
          { label: 'System Size', value: `${hpResults.heatPumpSizeKW} kW` },
          { label: 'COP Efficiency', value: `${hpResults.cop.toFixed(1)}×` },
          { label: 'HP Electricity Use', value: formatKWh(hpResults.annualHeatPumpElectricityKWh) + '/yr' },
          { label: 'Current Heating Cost', value: formatCurrency(hpResults.annualCurrentEnergyCost) + '/yr' },
          { label: 'HP Energy Cost', value: formatCurrency(hpResults.annualHeatPumpEnergyCost) + '/yr' },
          { label: 'Annual Savings', value: formatCurrency(hpResults.annualSavings) + '/yr' },
          { label: 'CO₂ Reduction', value: formatTonnesCO2(hpResults.co2ReductionTonnes) },
          { label: 'CAPEX Estimate', value: formatCurrency(hpResults.capexEUR) },
          { label: 'Simple Payback', value: formatYears(hpResults.paybackYears) },
        ]}
      />
    )
  }

  if (cards.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-bold text-neutral-900 mb-4">System Details by Technology</h3>
      <div className={`grid grid-cols-1 gap-5 ${cards.length > 1 ? 'md:grid-cols-2' : ''} ${cards.length === 3 ? 'lg:grid-cols-3' : ''}`}>
        {cards}
      </div>
    </div>
  )
}
