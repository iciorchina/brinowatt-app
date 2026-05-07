import type { Scenario, ScenarioResults } from '@/types'
import { formatCurrency } from '@/lib/utils/formatters'

interface Props {
  active: Scenario
  onChange: (s: Scenario) => void
  scenarios: ScenarioResults
}

const SCENARIOS: { key: Scenario; label: string; description: string; color: string; dotColor: string }[] = [
  {
    key: 'conservative',
    label: 'Conservative',
    description: 'Higher costs · Lower yield',
    color: 'border-amber-400 bg-amber-50 text-amber-700',
    dotColor: 'bg-amber-400',
  },
  {
    key: 'standard',
    label: 'Standard',
    description: 'Base case estimate',
    color: 'border-brand-500 bg-brand-50 text-brand-700',
    dotColor: 'bg-brand-500',
  },
  {
    key: 'optimistic',
    label: 'Optimistic',
    description: 'Better pricing · Higher yield',
    color: 'border-blue-500 bg-blue-50 text-blue-700',
    dotColor: 'bg-blue-500',
  },
]

export function ScenarioSwitcher({ active, onChange, scenarios }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 flex-wrap">
        <span className="text-sm font-semibold text-neutral-700 flex-shrink-0">View scenario:</span>
        <div className="flex gap-2 flex-wrap">
          {SCENARIOS.map((s) => {
            const data = scenarios[s.key]
            const isActive = active === s.key
            return (
              <button
                key={s.key}
                onClick={() => onChange(s.key)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all text-left ${
                  isActive ? s.color + ' shadow-sm' : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? s.dotColor : 'bg-neutral-300'}`} />
                <div>
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs opacity-70">{formatCurrency(data.totalAnnualSavings)}/yr savings</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-neutral-400 mt-3 border-t border-neutral-100 pt-3">
        Scenarios reflect different equipment cost and energy yield assumptions.
        <strong className="text-neutral-500"> Conservative</strong>: +15% capex, −20% savings.
        <strong className="text-neutral-500"> Optimistic</strong>: −10% capex, +20% savings.
      </p>
    </div>
  )
}
