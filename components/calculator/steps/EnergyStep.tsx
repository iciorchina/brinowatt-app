'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import type { FormData } from '@/types'
import { ArrowRight, ArrowLeft, HelpCircle, Lightbulb } from 'lucide-react'
import { getCountryConfig } from '@/lib/config/countries'

const schema = z.object({
  annualElectricityConsumption: z.coerce.number().min(1000, 'Min 1,000 kWh').max(100_000_000),
  monthlyElectricityBill: z.coerce.number().min(10, 'Required'),
  electricityTariff: z.coerce.number().min(0.01).max(2),
  operatingHoursPerDay: z.coerce.number().min(1).max(24),
})
type FormValues = z.infer<typeof schema>

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function EnergyStep({ formData, updateFormData, onNext, onBack }: Props) {
  const countryConfig = getCountryConfig(formData.country ?? 'DE')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      annualElectricityConsumption: formData.annualElectricityConsumption ?? 50000,
      monthlyElectricityBill: formData.monthlyElectricityBill ?? Math.round((formData.annualElectricityConsumption ?? 50000) * countryConfig.electricityPrice / 12),
      electricityTariff: formData.electricityTariff ?? countryConfig.electricityPrice,
      operatingHoursPerDay: formData.operatingHoursPerDay ?? 10,
    },
  })

  const watchConsumption = watch('annualElectricityConsumption')
  const watchTariff = watch('electricityTariff')

  // Auto-compute monthly bill from consumption × tariff
  useEffect(() => {
    if (watchConsumption && watchTariff) {
      const monthly = Math.round((watchConsumption * watchTariff) / 12)
      setValue('monthlyElectricityBill', monthly)
    }
  }, [watchConsumption, watchTariff, setValue])

  const onSubmit = (values: FormValues) => {
    updateFormData(values)
    onNext()
  }

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <HelpCircle className="w-4 h-4 text-neutral-400 cursor-help" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-neutral-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
        {text}
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your energy profile</h2>
        <p className="text-neutral-500">This data drives all savings calculations. Use your most recent annual electricity bill for best accuracy.</p>
      </div>

      {/* Country default hint */}
      <div className="mb-6 p-4 bg-brand-50 border border-brand-100 rounded-xl flex gap-3">
        <Lightbulb className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-brand-800">
          <strong>Using {countryConfig.name} defaults:</strong> Electricity price {countryConfig.electricityPrice} EUR/kWh, solar yield {countryConfig.solarIrradiance} kWh/kWp/year. You can override these below.
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-sm font-medium text-neutral-700">Annual Electricity Consumption *</label>
            <Tooltip text="Found on your annual electricity bill or energy invoice. Typically expressed as kWh/year." />
          </div>
          <div className="relative">
            <input
              {...register('annualElectricityConsumption')}
              type="number" placeholder="50000"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">kWh/year</span>
          </div>
          {errors.annualElectricityConsumption && <p className="text-red-500 text-sm mt-1">{errors.annualElectricityConsumption.message}</p>}
          <p className="text-xs text-neutral-400 mt-1">Typical SME: 20,000–200,000 kWh/year</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label className="text-sm font-medium text-neutral-700">Electricity Tariff</label>
              <Tooltip text="Your price per kWh including all taxes and levies. Check your electricity bill." />
            </div>
            <div className="relative">
              <input
                {...register('electricityTariff')}
                type="number" step="0.001" placeholder="0.25"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">EUR/kWh</span>
            </div>
            {errors.electricityTariff && <p className="text-red-500 text-sm mt-1">{errors.electricityTariff.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label className="text-sm font-medium text-neutral-700">Monthly Electricity Bill</label>
              <Tooltip text="Auto-calculated from consumption × tariff. Override if you know the exact figure." />
            </div>
            <div className="relative">
              <input
                {...register('monthlyElectricityBill')}
                type="number" placeholder="1000"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900 placeholder-neutral-400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">EUR/mo</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-sm font-medium text-neutral-700">Typical Operating Hours per Day</label>
            <Tooltip text="Average hours per day your facility is operational and consuming electricity." />
          </div>
          <div className="flex items-center gap-4">
            <input
              {...register('operatingHoursPerDay')}
              type="range" min={1} max={24} step={1}
              className="flex-1 h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-brand-600"
            />
            <div className="w-16 text-center">
              <span className="text-lg font-bold text-brand-600">{watch('operatingHoursPerDay')}</span>
              <span className="text-neutral-400 text-xs"> h/day</span>
            </div>
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
