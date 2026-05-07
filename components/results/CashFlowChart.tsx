'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { CashFlowPoint } from '@/types'
import { formatCurrency } from '@/lib/utils/formatters'

interface Props {
  data: CashFlowPoint[]
  capex: number
}

function formatYAxis(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`
  if (Math.abs(value) >= 1_000) return `€${(value / 1_000).toFixed(0)}k`
  return `€${value}`
}

interface TooltipPayload {
  name: string
  value: number
  color: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-neutral-900 mb-2">Year {label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-neutral-600">{entry.name}:</span>
          <span className="font-semibold text-neutral-900">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

export function CashFlowChart({ data, capex }: Props) {
  // Find the break-even year
  const breakEvenYear = data.find((d) => d.cumulativeCashFlow >= 0)?.year

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 md:p-6">
      <div className="mb-5">
        <h3 className="text-base font-bold text-neutral-900">20-Year Cash Flow Projection</h3>
        <p className="text-sm text-neutral-500 mt-0.5">Cumulative savings vs. net position after investment</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="cashFlowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Year', position: 'insideBottomRight', offset: -5, fontSize: 11, fill: '#94a3b8' }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            formatter={(value) => <span className="text-neutral-600">{value}</span>}
          />
          {breakEvenYear && (
            <ReferenceLine
              x={breakEvenYear}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: `Break-even Yr ${breakEvenYear}`, position: 'top', fontSize: 10, fill: '#d97706' }}
            />
          )}
          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1} />
          <Area
            type="monotone"
            dataKey="cumulativeSavings"
            name="Cumulative Savings"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#savingsGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#22c55e' }}
          />
          <Area
            type="monotone"
            dataKey="cumulativeCashFlow"
            name="Net Cash Position"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#cashFlowGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#3b82f6' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
