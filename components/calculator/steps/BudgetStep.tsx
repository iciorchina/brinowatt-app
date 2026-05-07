'use client'
import { useForm } from 'react-hook-form'
import type { FormData, FinancingPreference } from '@/types'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const budgetRanges = [
  { value: 'under_25k', label: 'Under €25,000' },
  { value: '25k_100k', label: '€25,000 – €100,000' },
  { value: '100k_500k', label: '€100,000 – €500,000' },
  { value: '500k_2m', label: '€500,000 – €2,000,000' },
  { value: 'over_2m', label: 'Over €2,000,000' },
  { value: 'not_sure', label: 'Not sure yet' },
]

const financingOptions: { value: FinancingPreference; label: string; desc: string }[] = [
  { value: 'cash', label: 'Outright Purchase', desc: 'Full CAPEX — maximises ROI' },
  { value: 'loan', label: 'Bank Loan', desc: 'Preserve capital, repay from savings' },
  { value: 'leasing', label: 'Leasing / Rental', desc: 'Low upfront, monthly payments' },
  { value: 'ppa', label: 'Power Purchase Agreement', desc: 'Zero CAPEX, pay per kWh generated' },
  { value: 'undecided', label: 'Not Decided Yet', desc: "Our specialists can advise" },
]

export function BudgetStep({ formData, updateFormData, onNext, onBack }: Props) {
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
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Budget & financing preferences</h2>
        <p className="text-neutral-500">Optional — helps our specialists tailor the proposal to your financial situation. You can skip and update later.</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Investment Budget Range (optional)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {budgetRanges.map(opt => (
              <label key={opt.value} className="cursor-pointer">
                <input type="radio" {...register('budgetRange')} value={opt.value} className="sr-only" />
                <div className={`p-3 text-center text-sm font-medium rounded-xl border-2 transition-all
                  ${watch('budgetRange') === opt.value
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}>
                  {opt.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Preferred Financing Approach (optional)</label>
          <div className="space-y-3">
            {financingOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-neutral-50
                data-[selected=true]:border-brand-500 data-[selected=true]:bg-brand-50"
                data-selected={watch('financingPreference') === opt.value}
              >
                <input type="radio" {...register('financingPreference')} value={opt.value} className="w-4 h-4 accent-brand-600" />
                <div>
                  <div className="font-medium text-neutral-900 text-sm">{opt.label}</div>
                  <div className="text-xs text-neutral-500">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
