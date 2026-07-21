'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { CalculationResults, Scenario } from '@/types'
import { ResultsHeader } from './ResultsHeader'
import { ScenarioSwitcher } from './ScenarioSwitcher'
import { CashFlowChart } from './CashFlowChart'
import { SavingsBreakdownChart } from './SavingsBreakdownChart'
import { KPICards } from './KPICards'
import { SystemSummaryCards } from './SystemSummaryCards'
import { ROITimeline } from './ROITimeline'
import { LeadCapturePanel } from './LeadCapturePanel'
import { HybridUpsell } from './HybridUpsell'
import { useCalcT } from '@/lib/i18n/calc'

export function ResultsDashboard() {
  const ct = useCalcT()
  const [fullResults, setFullResults] = useState<CalculationResults | null>(null)
  const [activeScenario, setActiveScenario] = useState<Scenario>('standard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('energy_roi_results')
      if (raw) {
        const parsed = JSON.parse(raw)
        // Support both {results, formData} wrapper and direct results object
        const results: CalculationResults = parsed.results ?? parsed
        setFullResults(results)
      }
    } catch (e) {
      console.error('Failed to load results:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">{ct.results.loading}</p>
        </div>
      </div>
    )
  }

  if (!fullResults) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">{ct.results.noResultsTitle}</h2>
          <p className="text-neutral-500 mb-6">
            {ct.results.noResultsBody}
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
          >
            {ct.results.startCalculator}
          </Link>
        </div>
      </div>
    )
  }

  // Pick combined results for the active scenario
  const scenarioResults =
    activeScenario === 'standard'
      ? fullResults.combined
      : fullResults.scenarios[activeScenario]

  const solutionLabel =
    ct.results.solutionLabels[(fullResults.formData?.selectedSolution ?? 'pv') as keyof typeof ct.results.solutionLabels] ?? 'Energy System'

  return (
    <div className="min-h-screen bg-neutral-50 pt-16 lg:pt-20">
      {/* Results header */}
      <ResultsHeader
        results={scenarioResults}
        formData={fullResults.formData}
        solutionLabel={solutionLabel}
        fullResults={fullResults}
        activeScenario={activeScenario}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Scenario switcher */}
        <ScenarioSwitcher
          active={activeScenario}
          onChange={setActiveScenario}
          scenarios={fullResults.scenarios}
        />

        {/* KPI cards */}
        <KPICards
          results={scenarioResults}
          pvResults={fullResults.pv}
          bessResults={fullResults.bess}
          hpResults={fullResults.heatPump}
        />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CashFlowChart
              data={scenarioResults.cumulativeCashFlow}
              capex={scenarioResults.totalCapexEUR}
            />
          </div>
          <div>
            <SavingsBreakdownChart
              breakdown={scenarioResults.annualSavingsBreakdown}
              total={scenarioResults.totalAnnualSavings}
            />
          </div>
        </div>

        {/* ROI timeline */}
        <ROITimeline
          roi5={scenarioResults.roi5Years}
          roi10={scenarioResults.roi10Years}
          roi15={scenarioResults.roi15Years}
          capex={scenarioResults.totalCapexEUR}
          annualSavings={scenarioResults.totalAnnualSavings}
          payback={scenarioResults.totalPaybackYears}
        />

        {/* Per-system breakdown */}
        <SystemSummaryCards
          pvResults={fullResults.pv}
          bessResults={fullResults.bess}
          hpResults={fullResults.heatPump}
        />

        {/* Full-hybrid comparison (hidden when already viewing the hybrid) */}
        <HybridUpsell
          formData={fullResults.formData}
          currentStandardSavings={fullResults.scenarios.standard.totalAnnualSavings}
        />

        {/* Lead capture CTA */}
        <LeadCapturePanel
          formData={fullResults.formData}
          results={fullResults}
        />

        {/* Disclaimer */}
        <p className="text-center text-neutral-400 text-xs pb-4">
          {ct.results.disclaimerFooter}
        </p>
      </div>
    </div>
  )
}
