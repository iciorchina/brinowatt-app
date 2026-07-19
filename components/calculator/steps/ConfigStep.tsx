'use client'
import { useForm } from 'react-hook-form'
import type { FormData } from '@/types'
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'
import { useCalcT } from '@/lib/i18n/calc'

interface Props {
  formData: Partial<FormData>
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function ConfigStep({ formData, updateFormData, onNext, onBack }: Props) {
  const ct = useCalcT()
  const c = ct.wizard.config
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
    const value = watch(name as never)
    return (
      <label className="flex items-start gap-4 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
        <div className="relative flex-shrink-0 mt-0.5">
          <input type="checkbox" {...register(name as never)} className="sr-only" />
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

  const roofOptions = [
    { value: 'flat', label: c.flat },
    { value: 'pitched', label: c.pitched },
    { value: 'ground_mounted', label: c.ground },
  ]

  const heatingKeys = ['gas', 'oil', 'electric', 'district', 'biomass', 'other'] as const

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{c.title}</h2>
        <p className="text-neutral-500">{c.subtitle}</p>
      </div>

      <div className="space-y-8">
        {/* PV Configuration */}
        {hasPV && (
          <div>
            <h3 className="text-base font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">{c.pvSection}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">{c.installType}</label>
                <div className="grid grid-cols-3 gap-3">
                  {roofOptions.map(opt => (
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
                  <label className="text-sm font-medium text-neutral-700">{c.area}</label>
                  <Tooltip text={c.areaTooltip} />
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
                <Toggle name="selfConsumptionPriority" label={c.selfConsumption} description={c.selfConsumptionDesc} />
                <Toggle name="gridExportAllowed" label={c.gridExport} description={c.gridExportDesc} />
              </div>
            </div>
          </div>
        )}

        {/* BESS Configuration */}
        {hasBESS && (
          <div>
            <h3 className="text-base font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">{c.bessSection}</h3>
            <div className="space-y-3">
              <Toggle name="peakShavingInterest" label={c.peakShaving} description={c.peakShavingDesc} />
              <Toggle name="backupPowerInterest" label={c.backup} description={c.backupDesc} />
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-sm font-medium text-neutral-700">{c.backupDuration}</label>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    {...register('preferredStorageHours')}
                    type="range" min={1} max={12} step={1}
                    className="flex-1 h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="w-20 text-center">
                    <span className="text-lg font-bold text-brand-600">{watch('preferredStorageHours')}</span>
                    <span className="text-neutral-400 text-xs"> {ct.units.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Heat Pump Configuration */}
        {hasHP && (
          <div>
            <h3 className="text-base font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">{c.hpSection}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">{c.heatingSystem}</label>
                <select
                  {...register('currentHeatingType')}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-neutral-900"
                >
                  {heatingKeys.map(key => (
                    <option key={key} value={key}>{c.heatingOptions[key]}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-sm font-medium text-neutral-700">{c.heatingCost}</label>
                    <Tooltip text={c.heatingCostTooltip} />
                  </div>
                  <div className="relative">
                    <input
                      {...register('annualHeatingCost')}
                      type="number" placeholder="8000"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">EUR{ct.units.perYr}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-sm font-medium text-neutral-700">{c.heatingDemand}</label>
                    <Tooltip text={c.heatingDemandTooltip} />
                  </div>
                  <div className="relative">
                    <input
                      {...register('annualHeatingDemand')}
                      type="number" placeholder="40000"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-neutral-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">kWh{ct.units.perYr}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
