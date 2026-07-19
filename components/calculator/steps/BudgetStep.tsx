'use client'
import { useForm } from 'react-hook-form'
import type { FormData } from '@/types'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useCalcT } from '@/lib/i18n/calc'

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const RANGE_KEYS = ['under_25k', '25k_100k', '100k_500k', '500k_2m', 'over_2m', 'not_sure'] as const
const FINANCING_KEYS = ['cash', 'loan', 'leasing', 'ppa', 'undecided'] as const

export function BudgetStep({ formData, updateFormData, onNext, onBack }: Props) {
  const ct = useCalcT()
  const b = ct.wizard.budget

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      budgetRange: formData.budgetRange ?? '',
      financingPreference: formData.financingPreference ?? 'undecided',
    },
  })

  const onSubmit = (values: Record<string, unknown>) => {
    updateFormData(values as Partial<FormData>)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{b.title}</h2>
        <p className="text-neutral-500">{b.subtitle}</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">{b.budgetLabel}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RANGE_KEYS.map(key => (
              <label key={key} className="cursor-pointer">
                <input type="radio" {...register('budgetRange')} value={key} className="sr-only" />
                <div className={`p-3 text-center text-sm font-medium rounded-xl border-2 transition-all
                  ${watch('budgetRange') === key
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}>
                  {b.ranges[key]}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">{b.financingLabel}</label>
          <div className="space-y-3">
            {FINANCING_KEYS.map(key => (
              <label key={key} className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-neutral-50
                data-[selected=true]:border-brand-500 data-[selected=true]:bg-brand-50"
                data-selected={watch('financingPreference') === key}
              >
                <input type="radio" {...register('financingPreference')} value={key} className="w-4 h-4 accent-brand-600" />
                <div>
                  <div className="font-medium text-neutral-900 text-sm">{b.financing[key].label}</div>
                  <div className="text-xs text-neutral-500">{b.financing[key].desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all">
          <ArrowLeft className="w-4 h-4" /> {ct.wizard.back}
        </button>
        <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all">
          {ct.wizard.continue} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
