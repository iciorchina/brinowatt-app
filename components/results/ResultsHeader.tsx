import Link from 'next/link'
import { ArrowLeft, TrendingUp, Zap, Leaf, Clock, Download, AlertCircle } from 'lucide-react'
import type { CombinedResults, FormData } from '@/types'
import { formatCurrency, formatYears, formatTonnesCO2 } from '@/lib/utils/formatters'

interface Props {
  results: CombinedResults
  formData: Partial<FormData>
  solutionLabel: string
}

export function ResultsHeader({ results, formData, solutionLabel }: Props) {
  const kpis = [
    {
      icon: TrendingUp,
      label: 'Total Investment',
      value: formatCurrency(results.totalCapexEUR),
      sub: 'Estimated all-in CAPEX',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Zap,
      label: 'Annual Savings',
      value: `${formatCurrency(results.totalAnnualSavings)}/yr`,
      sub: 'Energy cost reduction',
      color: 'text-brand-600',
      bg: 'bg-brand-50',
    },
    {
      icon: Clock,
      label: 'Payback Period',
      value: formatYears(results.totalPaybackYears),
      sub: 'Simple payback',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      icon: Leaf,
      label: 'CO₂ Reduction',
      value: formatTonnesCO2(results.totalCo2ReductionTonnes),
      sub: 'Annual emissions saved',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
  ]

  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Recalculate
          </Link>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-xs font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              Indicative estimates
            </div>
            <button
              disabled
              title="PDF download coming soon"
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-400 text-sm rounded-lg cursor-not-allowed"
            >
              <Download className="w-4 h-4" /> Download PDF
              <span className="text-xs bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded">Soon</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">
            Your Energy Investment Analysis
          </h1>
          <p className="text-neutral-500 text-sm">
            {formData.companyName && <strong className="text-neutral-700">{formData.companyName}</strong>}
            {formData.companyName && ' · '}
            {solutionLabel}
            {formData.country && ` · ${formData.country}`}
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <div key={kpi.label} className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                <div className={`w-9 h-9 ${kpi.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className="text-xl md:text-2xl font-bold text-neutral-900">{kpi.value}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{kpi.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
