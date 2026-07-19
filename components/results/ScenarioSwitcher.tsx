'use client'

import type { Scenario, ScenarioResults } from '@/types'
import { formatCurrency } from '@/lib/utils/formatters'
import { useCalcT, tpl } from '@/lib/i18n/calc'

interface Props {
  active: Scenario
  onChange: (s: Scenario) => void
  scenarios: ScenarioResults
}

const SCENARIO_META: { key: Scenario; color: string; dotColor: string }[] = [
  { key: 'conservative', color: 'border-amber-400 bg-amber-50 text-amber-700', dotColor: 'bg-amber-400' },
  { key: 'standard', color: 'border-brand-500 bg-brand-50 text-brand-700', dotColor: 'bg-brand-500' },
  { key: 'optimistic', color: 'border-blue-500 bg-blue-50 text-blue-700', dotColor: 'bg-blue-500' },
]

export function ScenarioSwitcher({ active, onChange, scenarios }: Props) {
  const ct = useCalcT()
  const s = ct.results.scenarios

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 flex-wrap">
        <span className="text-sm font-semibold text-neutral-700 flex-shrink-0">{s.view}</span>
        <div className="flex gap-2 flex-wrap">
          {SCENARIO_META.map((meta) => {
            const data = scenarios[meta.key]
            const text = s[meta.key]
            const isActive = active === meta.key
            return (
              <button
                key={meta.key}
                onClick={() => onChange(meta.key)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all text-left ${
                  isActive ? meta.color + ' shadow-sm' : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? meta.dotColor : 'bg-neutral-300'}`} />
                <div>
                  <div className="font-semibold text-sm">{text.label}</div>
                  <div className="text-xs opacity-70">{tpl(s.savingsSuffix, { amount: formatCurrency(data.totalAnnualSavings) })}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-neutral-400 mt-3 border-t border-neutral-100 pt-3">
        {s.footnote1}
        <strong className="text-neutral-500"> {s.footnoteConservative}</strong>{s.footnoteConservativeVals}
        <strong className="text-neutral-500"> {s.footnoteOptimistic}</strong>{s.footnoteOptimisticVals}
      </p>
    </div>
  )
}
