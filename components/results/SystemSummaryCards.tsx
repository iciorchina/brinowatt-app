'use client'

import type { PVResults, BESSResults, HeatPumpResults } from '@/types'
import { Sun, Battery, Thermometer } from 'lucide-react'
import { formatCurrency, formatKWh, formatKWp, formatPercent, formatYears, formatTonnesCO2, formatNumber } from '@/lib/utils/formatters'
import { useCalcT } from '@/lib/i18n/calc'

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
  const ct = useCalcT()
  const s = ct.results.system
  const perYr = ct.units.perYr
  const cards = []

  if (pvResults) {
    cards.push(
      <SummaryCard
        key="pv"
        icon={Sun}
        title={s.pvTitle}
        subtitle={s.pvSub}
        headerBg="bg-amber-50"
        iconColor="text-amber-600"
        data={[
          { label: s.systemSize, value: formatKWp(pvResults.systemSizeKWp) },
          { label: s.annualProduction, value: formatKWh(pvResults.annualProductionKWh) },
          { label: s.selfConsumption, value: formatPercent(pvResults.selfConsumptionRate) },
          { label: s.gridExport, value: formatKWh(pvResults.gridExportKWh) + perYr },
          { label: s.gridExportRevenue, value: formatCurrency(pvResults.gridExportRevenue) + perYr },
          { label: s.annualBenefit, value: formatCurrency(pvResults.totalAnnualBenefit) + perYr },
          { label: s.capex, value: formatCurrency(pvResults.capexEUR) },
          { label: s.payback, value: formatYears(pvResults.paybackYears, ct.units.years) },
          { label: s.co2, value: formatTonnesCO2(pvResults.co2ReductionTonnes, ct.units.tCo2) },
        ]}
      />
    )
  }

  if (bessResults) {
    cards.push(
      <SummaryCard
        key="bess"
        icon={Battery}
        title={s.bessTitle}
        subtitle={s.bessSub}
        headerBg="bg-blue-50"
        iconColor="text-blue-600"
        data={[
          { label: s.storageCapacity, value: `${formatNumber(bessResults.storageSizeKWh, 0)} kWh` },
          { label: s.powerRating, value: `${formatNumber(bessResults.powerKW, 0)} kW` },
          { label: s.scBoost, value: `+${formatPercent(bessResults.selfConsumptionIncrease)}` },
          { label: s.additionalSelfUse, value: formatKWh(bessResults.additionalSelfConsumptionKWh) + perYr },
          { label: s.peakShavingSavings, value: formatCurrency(bessResults.peakShavingSavings) + perYr },
          { label: s.annualSavings, value: formatCurrency(bessResults.annualSavings) + perYr },
          { label: s.capex, value: formatCurrency(bessResults.capexEUR) },
          { label: s.payback, value: formatYears(bessResults.paybackYears, ct.units.years) },
        ]}
      />
    )
  }

  if (hpResults) {
    cards.push(
      <SummaryCard
        key="hp"
        icon={Thermometer}
        title={s.hpTitle}
        subtitle={s.hpSub}
        headerBg="bg-rose-50"
        iconColor="text-rose-600"
        data={[
          { label: s.systemSize, value: `${hpResults.heatPumpSizeKW} kW` },
          { label: s.copEfficiency, value: `${hpResults.cop.toFixed(1)}×` },
          { label: s.hpElectricityUse, value: formatKWh(hpResults.annualHeatPumpElectricityKWh) + perYr },
          { label: s.currentHeatingCost, value: formatCurrency(hpResults.annualCurrentEnergyCost) + perYr },
          { label: s.hpEnergyCost, value: formatCurrency(hpResults.annualHeatPumpEnergyCost) + perYr },
          { label: s.annualSavings, value: formatCurrency(hpResults.annualSavings) + perYr },
          { label: s.co2, value: formatTonnesCO2(hpResults.co2ReductionTonnes, ct.units.tCo2) },
          { label: s.capex, value: formatCurrency(hpResults.capexEUR) },
          { label: s.payback, value: formatYears(hpResults.paybackYears, ct.units.years) },
        ]}
      />
    )
  }

  if (cards.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-bold text-neutral-900 mb-4">{s.title}</h3>
      <div className={`grid grid-cols-1 gap-5 ${cards.length > 1 ? 'md:grid-cols-2' : ''} ${cards.length === 3 ? 'lg:grid-cols-3' : ''}`}>
        {cards}
      </div>
    </div>
  )
}
