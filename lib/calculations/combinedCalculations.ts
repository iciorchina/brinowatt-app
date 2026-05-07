import type {
  FormData, CalculationResults, CombinedResults, CashFlowPoint,
  ScenarioResults, Scenario, PVResults, BESSResults, HeatPumpResults,
} from '@/types'
import { ASSUMPTIONS } from '@/lib/config/assumptions'
import { calculatePV } from './pvCalculations'
import { calculateBESS } from './bessCalculations'
import { calculateHeatPump } from './heatPumpCalculations'

export function calculateResults(
  formData: Partial<FormData>,
  scenario: Scenario = 'standard'
): CalculationResults {
  const solution = formData.selectedSolution ?? 'pv'
  const A = ASSUMPTIONS
  const mult = A.scenarioMultipliers[scenario]

  const hasPV = ['pv', 'pv_bess', 'pv_heatpump', 'full_hybrid'].includes(solution)
  const hasBESS = ['bess', 'pv_bess', 'full_hybrid'].includes(solution)
  const hasHP = ['heatpump', 'pv_heatpump', 'full_hybrid'].includes(solution)

  let pvResults: PVResults | undefined
  let bessResults: BESSResults | undefined
  let hpResults: HeatPumpResults | undefined

  if (hasPV) {
    pvResults = calculatePV(formData, hasBESS)
    applyMultiplier(pvResults, mult)
  }
  if (hasBESS) {
    bessResults = calculateBESS(formData, pvResults?.annualProductionKWh)
    applyMultiplier(bessResults, mult)
  }
  if (hasHP) {
    hpResults = calculateHeatPump(formData)
    applyMultiplier(hpResults, mult)
  }

  const combined = buildCombined(pvResults, bessResults, hpResults, formData)
  const scenarios = buildScenarios(formData, hasPV, hasBESS, hasHP)

  return {
    scenario,
    pv: pvResults,
    bess: bessResults,
    heatPump: hpResults,
    combined,
    scenarios,
    formData,
    calculatedAt: new Date().toISOString(),
  }
}

function buildCombined(
  pv?: PVResults,
  bess?: BESSResults,
  hp?: HeatPumpResults,
  formData?: Partial<FormData>
): CombinedResults {
  const A = ASSUMPTIONS
  const totalCapexEUR = (pv?.capexEUR ?? 0) + (bess?.capexEUR ?? 0) + (hp?.capexEUR ?? 0)

  const pvSavings = pv?.totalAnnualBenefit ?? 0
  const bessSavings = bess ? (pv ? bess.peakShavingSavings : bess.annualSavings) : 0
  const hpSavings = hp?.annualSavings ?? 0
  const totalAnnualSavings = pvSavings + bessSavings + hpSavings

  const totalPaybackYears =
    totalAnnualSavings > 0 ? Math.round((totalCapexEUR / totalAnnualSavings) * 10) / 10 : 999

  const totalCo2 = (pv?.co2ReductionTonnes ?? 0) + (hp?.co2ReductionTonnes ?? 0)

  const inflation = A.electricityPriceInflationPercent / 100
  const cumulativeCashFlow: CashFlowPoint[] = []
  let cumSavings = 0

  for (let year = 1; year <= A.analysisHorizonYears; year++) {
    const inflationFactor = Math.pow(1 + inflation, year - 1)
    const yearSavings = totalAnnualSavings * inflationFactor
    cumSavings += yearSavings
    cumulativeCashFlow.push({
      year,
      annualSavings: Math.round(yearSavings),
      cumulativeSavings: Math.round(cumSavings),
      cumulativeCashFlow: Math.round(cumSavings - totalCapexEUR),
    })
  }

  const roi5 = totalCapexEUR > 0
    ? ((cumulativeCashFlow[4]?.cumulativeSavings ?? 0) / totalCapexEUR - 1) * 100 : 0
  const roi10 = totalCapexEUR > 0
    ? ((cumulativeCashFlow[9]?.cumulativeSavings ?? 0) / totalCapexEUR - 1) * 100 : 0
  const roi15 = totalCapexEUR > 0
    ? ((cumulativeCashFlow[14]?.cumulativeSavings ?? 0) / totalCapexEUR - 1) * 100 : 0

  const discountRate = A.discountRatePercent / 100
  let npv = -totalCapexEUR
  for (let year = 1; year <= A.analysisHorizonYears; year++) {
    const inflationFactor = Math.pow(1 + inflation, year - 1)
    npv += (totalAnnualSavings * inflationFactor) / Math.pow(1 + discountRate, year)
  }

  const annualElectricityCost =
    (formData?.annualElectricityConsumption ?? 50000) * (formData?.electricityTariff ?? 0.22)
  const annualHeatingCost = formData?.annualHeatingCost ?? 0
  const totalCurrentEnergyCost = annualElectricityCost + annualHeatingCost
  const energyCostReductionPercent = totalCurrentEnergyCost > 0
    ? Math.min(99, Math.round((totalAnnualSavings / totalCurrentEnergyCost) * 100))
    : 0

  return {
    totalCapexEUR: Math.round(totalCapexEUR),
    totalAnnualSavings: Math.round(totalAnnualSavings),
    totalPaybackYears,
    totalCo2ReductionTonnes: Math.round(totalCo2 * 10) / 10,
    roi5Years: Math.round(roi5),
    roi10Years: Math.round(roi10),
    roi15Years: Math.round(roi15),
    cumulativeCashFlow,
    annualSavingsBreakdown: {
      pv: pv ? Math.round(pvSavings) : undefined,
      bess: bess ? Math.round(bessSavings) : undefined,
      heatPump: hp ? Math.round(hpSavings) : undefined,
    },
    npv: Math.round(npv),
    energyCostReductionPercent,
  }
}

function buildScenarios(
  formData: Partial<FormData>,
  hasPV: boolean, hasBESS: boolean, hasHP: boolean
): ScenarioResults {
  const buildScenario = (scenario: Scenario): CombinedResults => {
    const mult = ASSUMPTIONS.scenarioMultipliers[scenario]
    let pv = hasPV ? calculatePV(formData, hasBESS) : undefined
    let bess = hasBESS ? calculateBESS(formData, pv?.annualProductionKWh) : undefined
    let hp = hasHP ? calculateHeatPump(formData) : undefined
    if (pv) applyMultiplier(pv, mult)
    if (bess) applyMultiplier(bess, mult)
    if (hp) applyMultiplier(hp, mult)
    return buildCombined(pv, bess, hp, formData)
  }
  return {
    conservative: buildScenario('conservative'),
    standard: buildScenario('standard'),
    optimistic: buildScenario('optimistic'),
  }
}

function applyMultiplier(
  result: PVResults | BESSResults | HeatPumpResults,
  mult: { capex: number; savings: number }
) {
  result.capexEUR = Math.round(result.capexEUR * mult.capex)
  if ('totalAnnualBenefit' in result) {
    const r = result as PVResults
    r.annualSavings = Math.round(r.annualSavings * mult.savings)
    r.totalAnnualBenefit = Math.round(r.totalAnnualBenefit * mult.savings)
    r.gridExportRevenue = Math.round(r.gridExportRevenue * mult.savings)
  }
  if ('peakShavingSavings' in result) {
    const r = result as BESSResults
    r.annualSavings = Math.round(r.annualSavings * mult.savings)
    r.peakShavingSavings = Math.round(r.peakShavingSavings * mult.savings)
  }
  if ('annualCurrentEnergyCost' in result) {
    const r = result as HeatPumpResults
    r.annualSavings = Math.round(r.annualSavings * mult.savings)
  }
  if (result.capexEUR > 0 && result.annualSavings > 0) {
    result.paybackYears = Math.round((result.capexEUR / result.annualSavings) * 10) / 10
  }
}
