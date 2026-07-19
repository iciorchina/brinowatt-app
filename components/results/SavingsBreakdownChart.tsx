'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils/formatters'
import { useCalcT } from '@/lib/i18n/calc'

interface Props {
  breakdown: {
    pv?: number
    bess?: number
    heatPump?: number
  }
  total: number
}

const COLORS: Record<string, string> = {
  pv: '#22c55e',
  bess: '#3b82f6',
  heatPump: '#f59e0b',
}

interface LabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) {
  if (percent < 0.08) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function CustomTooltip({ active, payload, perYear }: { active?: boolean; payload?: Array<{ name: string; value: number }>; perYear: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-neutral-900">{payload[0].name}</p>
      <p className="text-neutral-600 mt-0.5">{formatCurrency(payload[0].value)}<span className="text-neutral-400">{perYear}</span></p>
    </div>
  )
}

export function SavingsBreakdownChart({ breakdown, total }: Props) {
  const ct = useCalcT()
  const b = ct.results.breakdown
  const entries = Object.entries(breakdown)
    .filter(([, v]) => v !== undefined && v > 0)
    .map(([key, value]) => ({
      name: b.labels[key as keyof typeof b.labels] ?? key,
      value: value as number,
      color: COLORS[key] ?? '#94a3b8',
    }))

  const isSingle = entries.length <= 1

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 md:p-6 h-full">
      <div className="mb-5">
        <h3 className="text-base font-bold text-neutral-900">{b.title}</h3>
        <p className="text-sm text-neutral-500 mt-0.5">{b.subtitle}</p>
      </div>

      {isSingle ? (
        /* Single technology — show a simple total card */
        <div className="flex flex-col items-center justify-center h-48 gap-2">
          <div className="text-3xl font-bold text-brand-600">{formatCurrency(total)}</div>
          <div className="text-sm text-neutral-500">{b.single}</div>
          <div className="mt-3 px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">
            {entries[0]?.name ?? b.energySavings}
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={entries}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              dataKey="value"
              labelLine={false}
              label={CustomLabel}
            >
              {entries.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip perYear={ct.units.perYear} />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => <span className="text-neutral-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-sm text-neutral-500">{b.total}</span>
        <span className="font-bold text-brand-700">{formatCurrency(total)}{ct.units.perYr}</span>
      </div>
    </div>
  )
}
