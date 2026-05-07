import { formatCurrency, formatPercent, formatYears } from '@/lib/utils/formatters'

interface Props {
  roi5: number
  roi10: number
  roi15: number
  capex: number
  annualSavings: number
  payback: number
}

export function ROITimeline({ roi5, roi10, roi15, capex, annualSavings, payback }: Props) {
  const milestones = [
    {
      year: 5,
      roi: roi5,
      value: capex + (capex * roi5) / 100,
      color: roi5 > 0 ? 'bg-brand-100 border-brand-300 text-brand-700' : 'bg-neutral-100 border-neutral-300 text-neutral-500',
      dotColor: roi5 > 0 ? 'bg-brand-500' : 'bg-neutral-400',
    },
    {
      year: 10,
      roi: roi10,
      value: capex + (capex * roi10) / 100,
      color: 'bg-brand-100 border-brand-400 text-brand-700',
      dotColor: 'bg-brand-600',
    },
    {
      year: 15,
      roi: roi15,
      value: capex + (capex * roi15) / 100,
      color: 'bg-brand-200 border-brand-500 text-brand-800',
      dotColor: 'bg-brand-700',
    },
    {
      year: 20,
      roi: Math.round((annualSavings * 20 - capex) / capex * 100),
      value: annualSavings * 20,
      color: 'bg-neutral-900 border-neutral-800 text-white',
      dotColor: 'bg-neutral-900',
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 md:p-6">
      <div className="mb-6">
        <h3 className="text-base font-bold text-neutral-900">Return on Investment Timeline</h3>
        <p className="text-sm text-neutral-500 mt-0.5">Projected ROI at key milestones (standard scenario)</p>
      </div>

      {/* Break-even callout */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">✓</span>
        </div>
        <div>
          <div className="font-semibold text-brand-900 text-sm">
            Investment breaks even in <span className="text-brand-700">{formatYears(payback)}</span>
          </div>
          <div className="text-brand-600 text-xs mt-0.5">
            Delivering {formatCurrency(annualSavings)}/year in energy savings
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-neutral-200 hidden md:block" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div key={m.year} className="relative flex flex-col items-center text-center">
              {/* Dot on timeline */}
              <div className={`w-10 h-10 rounded-full ${m.dotColor} flex items-center justify-center mb-3 relative z-10`}>
                <span className="text-white font-bold text-xs">{m.year}yr</span>
              </div>

              <div className={`w-full rounded-xl border-2 px-3 py-2 ${m.color}`}>
                <div className="text-xl font-black">{formatPercent(m.roi)}</div>
                <div className="text-xs font-medium opacity-80">ROI</div>
                <div className="text-xs mt-1 opacity-70">{formatCurrency(Math.max(0, m.value))}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-400 mt-5 pt-4 border-t border-neutral-100">
        ROI calculated as cumulative savings relative to total CAPEX, before inflation adjustments.
        Actual returns depend on electricity price development and system performance.
      </p>
    </div>
  )
}
