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

const SOLUTION_LABELS: Record<string, string> = {
  pv: 'Solar PV System',
  bess: 'Battery Storage System',
  heatpump: 'Heat Pump System',
  pv_bess: 'Solar PV + Battery Storage',
  pv_heatpump: 'Solar PV + Heat Pump',
  full_hybrid: 'Full Hybrid Energy System',
}

export function ResultsDashboard() {
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
          <p className="text-neutral-500">Loading your results…</p>
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
          <h2 className="text-xl font-bold text-neutral-900 mb-2">No Results Found</h2>
          <p className="text-neutral-500 mb-6">
            It looks like your calculation results weren't saved. Please run the calculator again.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
          >
            Start Calculator
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
    SOLUTION_LABELS[fullResults.formData?.selectedSolution ?? 'pv'] ?? 'Energy System'

  return (
    <div className="min-h-screen bg-neutral-50 pt-16 lg:pt-20">
      {/* Results header */}
      <ResultsHeader
        results={scenarioResults}
        formData={fullResults.formData}
        solutionLabel={solutionLabel}
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

        {/* Lead capture CTA */}
        <LeadCapturePanel
          formData={fullResults.formData}
          results={fullResults}
        />

        {/* Disclaimer */}
        <p className="text-center text-neutral-400 text-xs pb-4">
          ⚠ These estimates are indicative and based on publicly available data and standard assumptions. Actual results will vary based on site-specific conditions, equipment specifications, local regulations, and market prices. A detailed site assessment is required for precise calculations.
        </p>
      </div>
    </div>
  )
}
