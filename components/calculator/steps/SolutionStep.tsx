'use client'

import type { FormData, SolutionType } from '@/types'
import { Sun, Battery, Thermometer, Zap, ArrowRight } from 'lucide-react'

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const solutions: { id: SolutionType; label: string; sublabel: string; icon: React.ElementType; description: string; popular?: boolean; color: string }[] = [
  { id: 'pv', label: 'Solar PV', sublabel: 'Photovoltaic System', icon: Sun, color: 'amber', description: 'Generate electricity from sunlight. Best for sites with roof or ground area and daytime consumption.' },
  { id: 'bess', label: 'Battery Storage', sublabel: 'BESS System', icon: Battery, color: 'blue', description: 'Store energy from solar or grid. Maximise self-consumption and enable backup power.' },
  { id: 'heatpump', label: 'Heat Pump', sublabel: 'Air-to-Water System', icon: Thermometer, color: 'rose', description: 'Replace fossil fuel heating with efficient electric heat pump technology.' },
  { id: 'pv_bess', label: 'Solar + Battery', sublabel: 'PV + BESS Combo', icon: Zap, color: 'brand', description: 'The most popular combination. Maximise solar self-consumption and cut grid dependency.', popular: true },
  { id: 'pv_heatpump', label: 'Solar + Heat Pump', sublabel: 'PV + Heat Pump', icon: Sun, color: 'purple', description: 'Cover both electricity and heating needs from a single clean energy source.' },
  { id: 'full_hybrid', label: 'Full Hybrid System', sublabel: 'PV + BESS + Heat Pump', icon: Zap, color: 'green', description: 'Maximum energy independence. Combined savings across all energy vectors.' },
]

const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string; badge: string }> = {
  amber:  { border: 'border-amber-400',  bg: 'bg-amber-50',  icon: 'text-amber-700',  iconBg: 'bg-amber-100', badge: 'bg-amber-600' },
  blue:   { border: 'border-blue-400',   bg: 'bg-blue-50',   icon: 'text-blue-700',   iconBg: 'bg-blue-100',  badge: 'bg-blue-600' },
  rose:   { border: 'border-rose-400',   bg: 'bg-rose-50',   icon: 'text-rose-700',   iconBg: 'bg-rose-100',  badge: 'bg-rose-600' },
  brand:  { border: 'border-brand-400',  bg: 'bg-brand-50',  icon: 'text-brand-700',  iconBg: 'bg-brand-100', badge: 'bg-brand-600' },
  purple: { border: 'border-purple-400', bg: 'bg-purple-50', icon: 'text-purple-700', iconBg: 'bg-purple-100',badge: 'bg-purple-600' },
  green:  { border: 'border-green-500',  bg: 'bg-green-50',  icon: 'text-green-700',  iconBg: 'bg-green-100', badge: 'bg-green-700' },
}

export function SolutionStep({ formData, updateFormData, onNext }: Props) {
  const selected = formData.selectedSolution ?? 'pv'

  const handleSelect = (id: SolutionType) => {
    updateFormData({ selectedSolution: id })
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">What would you like to evaluate?</h2>
        <p className="text-neutral-500">Select the energy solution or combination you want to analyse. You can model individual technologies or combined systems.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {solutions.map((sol) => {
          const Icon = sol.icon
          const c = colorMap[sol.color]
          const isSelected = selected === sol.id
          return (
            <button
              key={sol.id}
              type="button"
              onClick={() => handleSelect(sol.id)}
              className={`relative text-left p-5 rounded-xl border-2 transition-all duration-150 hover:shadow-md
                ${isSelected ? `${c.border} ${c.bg}` : 'border-neutral-200 bg-white hover:border-neutral-300'}
              `}
            >
              {sol.popular && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-brand-600 text-white text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${isSelected ? c.iconBg : 'bg-neutral-100'} flex items-center justify-center flex-shrink-0 transition-colors`}>
                  <Icon className={`w-5 h-5 ${isSelected ? c.icon : 'text-neutral-500'}`} />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-sm">{sol.label}</div>
                  <div className="text-xs text-neutral-500 mb-2">{sol.sublabel}</div>
                  <div className="text-xs text-neutral-600 leading-relaxed">{sol.description}</div>
                </div>
              </div>
              {isSelected && (
                <div className={`absolute bottom-3 right-3 w-5 h-5 ${c.badge} rounded-full flex items-center justify-center`}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
