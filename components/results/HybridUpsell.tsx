'use client'

import { useMemo, useState } from 'react'
import { Zap, ArrowRight, Loader2 } from 'lucide-react'
import type { FormData } from '@/types'
import { calculateResults } from '@/lib/calculations'
import { formatCurrency } from '@/lib/utils/formatters'
import { useCalcT, tpl } from '@/lib/i18n/calc'

interface Props {
  formData: Partial<FormData>
  /** Standard-scenario annual savings of the currently displayed solution */
  currentStandardSavings: number
}

/**
 * Shown when the visitor calculated anything other than the full hybrid:
 * an honest, same-inputs comparison against PV + BESS + heat pump, with a
 * one-click switch. Hidden if the hybrid would not actually save more.
 */
export function HybridUpsell({ formData, currentStandardSavings }: Props) {
  const ct = useCalcT()
  const u = ct.results.hybridUpsell
  const [switching, setSwitching] = useState(false)

  const hybrid = useMemo(() => {
    if (formData.selectedSolution === 'full_hybrid') return null
    try {
      return calculateResults({ ...formData, selectedSolution: 'full_hybrid' }, 'standard')
    } catch {
      return null
    }
  }, [formData])

  if (!hybrid) return null
  const hybridSavings = hybrid.scenarios.standard.totalAnnualSavings
  const extra = hybridSavings - currentStandardSavings
  if (extra <= 0) return null

  const showHybrid = () => {
    setSwitching(true)
    try {
      sessionStorage.setItem(
        'energy_roi_results',
        JSON.stringify({ results: hybrid, formData: hybrid.formData })
      )
      window.location.reload()
    } catch {
      setSwitching(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="flex-shrink-0 w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="inline-block px-2 py-0.5 bg-green-600/10 text-green-800 text-xs font-semibold rounded-full mb-1.5">
              {u.badge}
            </div>
            <h3 className="font-bold text-neutral-900">{u.title}</h3>
            <p className="text-sm text-neutral-600 mt-1">
              {tpl(u.body, {
                amount: formatCurrency(hybridSavings),
                extra: formatCurrency(extra),
              })}
            </p>
          </div>
        </div>
        <button
          onClick={showHybrid}
          disabled={switching}
          className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {switching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {u.cta}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
