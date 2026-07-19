'use client'

import type { FormData, SolutionType } from '@/types'
import { Sun, Battery, Thermometer, Zap, ArrowRight } from 'lucide-react'
import { useCalcT } from '@/lib/i18n/calc'

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const SOLUTION_META: { id: SolutionType; icon: React.ElementType; popular?: boolean; color: string }[] = [
  { id: 'pv', icon: Sun, color: 'amber' },
  { id: 'bess', icon: Battery, color: 'blue' },
  { id: 'heatpump', icon: Thermometer, color: 'rose' },
  { id: 'pv_bess', icon: Zap, color: 'brand', popular: true },
  { id: 'pv_heatpump', icon: Sun, color: 'purple' },
  { id: 'full_hybrid', icon: Zap, color: 'green' },
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
  const ct = useCalcT()
  const s = ct.wizard.solution
  const selected = formData.selectedSolution ?? 'pv'

  const handleSelect = (id: SolutionType) => {
    updateFormData({ selectedSolution: id })
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{s.title}</h2>
        <p className="text-neutral-500">{s.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {SOLUTION_META.map((meta) => {
          const Icon = meta.icon
          const c = colorMap[meta.color]
          const text = s.options[meta.id]
          const isSelected = selected === meta.id
          return (
            <button
              key={meta.id}
              type="button"
              onClick={() => handleSelect(meta.id)}
              className={`relative text-left p-5 rounded-xl border-2 transition-all duration-150 hover:shadow-md
                ${isSelected ? `${c.border} ${c.bg}` : 'border-neutral-200 bg-white hover:border-neutral-300'}
              `}
            >
              {meta.popular && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-brand-600 text-white text-xs font-semibold rounded-full">
                  {s.popular}
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${isSelected ? c.iconBg : 'bg-neutral-100'} flex items-center justify-center flex-shrink-0 transition-colors`}>
                  <Icon className={`w-5 h-5 ${isSelected ? c.icon : 'text-neutral-500'}`} />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-sm">{text.label}</div>
                  <div className="text-xs text-neutral-500 mb-2">{text.sublabel}</div>
                  <div className="text-xs text-neutral-600 leading-relaxed">{text.description}</div>
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
          {ct.wizard.continue} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
