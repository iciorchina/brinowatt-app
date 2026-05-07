'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { FormData } from '@/types'
import { COUNTRY_OPTIONS } from '@/lib/config/countries'
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'

const schema = z.object({
  country: z.string().min(1, 'Required'),
  city: z.string().min(2, 'Required'),
  companyName: z.string().min(2, 'Required'),
  businessSector: z.string().min(1, 'Required'),
  buildingSize: z.coerce.number().min(10).max(500000),
})
type FormValues = z.infer<typeof schema>

const SECTORS = [
  'Manufacturing', 'Logistics & Warehousing', 'Retail & Hospitality',
  'Office / Professional Services', 'Agriculture & Food Processing',
  'Healthcare & Education', 'Construction & Real Estate', 'Other',
]

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function LocationStep({ formData, updateFormData, onNext, onBack }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: formData.country ?? 'DE',
      city: formData.city ?? '',
      companyName: formData.companyName ?? '',
      businessSector: formData.businessSector ?? '',
      buildingSize: formData.buildingSize ?? 500,
    },
  })

  const onSubmit = (values: FormValues) => {
    updateFormData(values)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tell us about your company</h2>
        <p className="text-neutral-500">We use your location to apply country-specific electricity prices, solar yield data, and installation costs.</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Country *</label>
            <select {...register('country')} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-neutral-900">
              {COUNTRY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">City / Region *</label>
            <input {...register('city')} placeholder="e.g. Munich" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400" />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company Name *</label>
          <input {...register('companyName')} placeholder="Your company name" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400" />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Business Sector *</label>
          <select {...register('businessSector')} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-neutral-900">
            <option value="">Select your sector</option>
            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.businessSector && <p className="text-red-500 text-sm mt-1">{errors.businessSector.message}</p>}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="block text-sm font-medium text-neutral-700">Building / Site Size (m²) *</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-neutral-400 cursor-help" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-neutral-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Total conditioned floor area. Used for heat pump sizing.
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              {...register('buildingSize')}
              type="number"
              min={10}
              placeholder="500"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">m²</span>
          </div>
          {errors.buildingSize && <p className="text-red-500 text-sm mt-1">{errors.buildingSize.message}</p>}
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
