'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { FormData } from '@/types'
import { ArrowLeft, Calculator, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  contactName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  contactConsent: z.boolean().refine(v => v === true, { message: 'Required' }),
  gdprConsent: z.boolean().refine(v => v === true, { message: 'Required' }),
})
type FormValues = z.infer<typeof schema>

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onBack: () => void
  onNext: () => void
  onCalculate: (data: Partial<FormData>) => void
  isCalculating: boolean
}

export function ContactStep({ formData, onBack, onCalculate, isCalculating }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactName: formData.contactName ?? '',
      email: formData.email ?? '',
      phone: formData.phone ?? '',
      contactConsent: formData.contactConsent ?? false,
      gdprConsent: formData.gdprConsent ?? false,
    },
  })

  const onSubmit = (values: FormValues) => {
    onCalculate(values)
  }

  const benefits = [
    'Instant ROI estimate and payback calculation',
    'Conservative, standard & optimistic scenarios',
    'Cumulative 20-year cash flow chart',
    'CO₂ reduction and sustainability metrics',
    'Tailored offer from certified energy specialists',
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Almost there — get your results</h2>
        <p className="text-neutral-500">Enter your contact details to receive your personalised ROI estimate and unlock a tailored offer from our energy specialists.</p>
      </div>

      {/* Value summary */}
      <div className="mb-6 p-5 bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl border border-brand-100">
        <div className="text-sm font-semibold text-neutral-800 mb-3">Your results will include:</div>
        <ul className="space-y-2">
          {benefits.map(b => (
            <li key={b} className="flex items-center gap-2 text-sm text-neutral-700">
              <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
          <input
            {...register('contactName')}
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
          />
          {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Business Email *</label>
            <input
              {...register('email')}
              type="email" placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number *</label>
            <input
              {...register('phone')}
              type="tel" placeholder="+49 ..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register('contactConsent')}
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-brand-600 rounded flex-shrink-0"
            />
            <span className="text-sm text-neutral-600">
              I agree to be contacted by Brinowatt and its specialist partners regarding my energy analysis and tailored offer. *
            </span>
          </label>
          {errors.contactConsent && <p className="text-red-500 text-sm">{errors.contactConsent.message}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register('gdprConsent')}
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-brand-600 rounded flex-shrink-0"
            />
            <span className="text-sm text-neutral-600">
              I have read and agree to the{' '}
              <Link href="/privacy" target="_blank" className="text-brand-600 underline hover:text-brand-700">
                Privacy Policy
              </Link>
              . I understand my data will be used to prepare my energy analysis and a tailored commercial offer. *
            </span>
          </label>
          {errors.gdprConsent && <p className="text-red-500 text-sm">{errors.gdprConsent.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 p-3 bg-neutral-50 rounded-xl">
        <Lock className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        <p className="text-xs text-neutral-500">
          Your data is protected under GDPR. We never sell or share your information with third parties for marketing purposes.
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="submit"
          disabled={isCalculating}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          {isCalculating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4" /> Calculate My ROI
            </>
          )}
        </button>
      </div>
    </form>
  )
}
