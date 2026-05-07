'use client'
import { useForm } from 'react-hook-form'
import type { FormData, SolutionType, RoofType, HeatingType } from '@/types'
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function ConfigStep({ formData, updateFormData, onNext, onBack }: Props) {
  const solution = formData.selectedSolution ?? 'pv'
  const hasPV = ['pv', 'pv_bess', 'pv_heatpump', 'full_hybrid'].includes(solution)
  const hasBESS = ['bess', 'pv_bess', 'full_hybrid'].includes(solution)
  const hasHP = ['heatpump', 'pv_heatpump', 'full_hybrid'].includes(solution)

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      roofType: formData.roofType ?? 'flat',
      availableRoofArea: formData.availableRoofArea ?? 200,
      selfConsumptionPriority: formData.selfConsumptionPriority ?? true,
      gridExportAllowed: formData.gridExportAllowed ?? true,
      peakShavingInterest: formData.peakShavingInterest ?? false,
      backupPowerInterest: formData.backupPowerInterest ?? false,
      preferredStorageHours: formData.preferredStorageHours ?? 4,
      currentHeatingType: formData.currentHeatingType ?? 'gas',
      annualHeatingCost: formData.annualHeatingCost ?? 0,
      annualHeatingDemand: formData.annualHeatingDemand ?? 0,
    },
  })

  const onSubmit = (values: Record<string, unknown>) => {
    updateFormData(values as Partial<FormData>)
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

  const Toggle = ({ name, label, description }: { name: string; label: string; description?: string }) => {
    const value = watch(name as any)
    return (
      <label className="flex items-start gap-4 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
        <div className="relative flex-shrink-0 mt-0.5">
          <input type="checkbox" {...register(name as any)} className="sr-only" />
          <div className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-brand-600' : 'bg-neutral-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-1 transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </div>
        <div>
          <div className="font-medium text-neutral-900 text-sm">{label}</div>
          {description && <div className="text-xs text-neutral-500 mt-0.5">{description}</div>}
        </div>
      </label>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">System configuration</h2>
        <p className="text-neutral-500">Tell us a bit more about your site and preferences so we can size the system accurately.</p>
      </div>

      <div className="space-y-8">
        {/* PV Configuration */}
        {hasPV && (
          <div>
            <h3 className="text-base font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">☀️ Solar PV Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Installation Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'flat', label: 'Flat Roof' },
                    { value: 'pitched', label: 'Pitched Roof' },
                    { value: 'ground_mounted', label: 'Ground Mount' },
                  ].map(opt => (
                    <label key={opt.value} className="cursor-pointer">
                      <input type="radio" {...register('roofType')} value={opt.value} className="sr-only" />
                      <div className={`p-3 text-center text-sm font-medium rounded-xl border-2 transition-all
                        ${watch('roofType') === opt.value
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
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-sm font-medium text-neutral-700">Available Area</label>
                  <Tooltip text="Total roof or ground area available for panel installation. We calculate the optimal system size from this." />
                </div>
                <div className="relative">
                  <input
                    {...register('availableRoofArea')}
                    type="number" placeholder="200"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">m²</span>
                </div>
              </div>
              <div className="space-y-3">
                <Toggle name="selfConsumptionPriority" label="Prioritise self-consumption" description="Size the system to maximise own-use rather than export." />
                <Toggle name="gridExportAllowed" label="Grid export allowed" description="We can assume surplus energy is exported at the feed-in tariff." />
              </div>
            </div>
          </div>
        )}

        {/* BESS Configuration */}
        {hasBESS && (
          <div>
            <h3 className="text-base font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">🔋 Battery Storage Configuration</h3>
            <div className="space-y-3">
              <Toggle name="peakShavingInterest" label="Peak demand shaving" description="Use the battery to reduce peak demand charges on your electricity tariff." />
              <Toggle name="backupPowerInterest" label="Backup power capability" description="Include backup power as a priority — keeps critical loads running during outages." />
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-sm font-medium text-neutral-700">Preferred Backup Duration</label>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    {...register('preferredStorageHours')}
                    type="range" min={1} max={12} step={1}
                    className="flex-1 h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="w-20 text-center">
                    <span className="text-lg font-bold text-brand-600">{watch('preferredStorageHours')}</span>
                    <span className="text-neutral-400 text-xs"> hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Heat Pump Configuration */}
        {hasHP && (
          <div>
            <h3 className="text-base font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">🌡️ Heat Pump Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Current Heating System</label>
                <select
                  {...register('currentHeatingType')}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-neutral-900"
                >
                  <option value="gas">Natural Gas Boiler</option>
                  <option value="oil">Oil Boiler</option>
                  <option value="electric">Electric Resistance Heating</option>
                  <option value="district">District Heating</option>
                  <option value="biomass">Biomass / Wood Pellets</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-sm font-medium text-neutral-700">Annual Heating Cost</label>
                    <Tooltip text="Your total annual spend on heating fuel (gas, oil, etc.) — from your utility invoices." />
                  </div>
                  <div className="relative">
                    <input
                      {...register('annualHeatingCost')}
                      type="number" placeholder="8000"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">EUR/yr</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-sm font-medium text-neutral-700">Annual Heating Demand</label>
                    <Tooltip text="Optional — kWh of heat consumed per year. Leave at 0 and we'll estimate from building size." />
                  </div>
                  <div className="relative">
                    <input
                      {...register('annualHeatingDemand')}
                      type="number" placeholder="40000"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">kWh/yr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
