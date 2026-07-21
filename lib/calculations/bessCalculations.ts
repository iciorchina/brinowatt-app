import type { FormData, BESSResults } from '@/types'
import { ASSUMPTIONS } from '@/lib/config/assumptions'
import { getCountryConfig } from '@/lib/config/countries'

/**
 * Calculates BESS system sizing, self-consumption boost, savings, and financials.
 * All monetary values in EUR.
 *
 * @param formData    Partial form data from the calculator wizard
 * @param pvExportKWh Optional: annual PV surplus (grid export) actually available
 *                    to the battery — already net of any heat-pump synergy draw.
 */
export function calculateBESS(
  formData: Partial<FormData>,
  pvExportKWh?: number
): BESSResults {
  const country = getCountryConfig(formData.country ?? 'OTHER')
  const A = ASSUMPTIONS

  const annualConsumption = formData.annualElectricityConsumption ?? 50_000
  const dailyConsumption = annualConsumption / 365

  // ── System Sizing ──────────────────────────────────────────────────────────
  let storageSizeKWh: number

  if (pvExportKWh && pvExportKWh > 0) {
    // When paired with PV: size battery to capture the available daily surplus
    const dailySurplus = pvExportKWh / 365
    // Size at 1.5× the average daily surplus — gives buffer for cloudy-day variation
    storageSizeKWh = Math.max(dailySurplus * 1.5, 5)
  } else {
    // Standalone: size at ASSUMPTIONS ratio of daily consumption
    storageSizeKWh = dailyConsumption * A.bessTypicalSizeRatioToDaily
    storageSizeKWh = Math.max(storageSizeKWh, 5)
  }

  // Round to nearest 0.5 kWh
  storageSizeKWh = Math.round(storageSizeKWh * 2) / 2

  // Power rating: 0.5C rate (kW = 0.5 × kWh capacity)
  const powerKW = Math.round(storageSizeKWh * 0.5 * 10) / 10

  // ── Additional Self-Consumption ───────────────────────────────────────────
  const roundTripEff = A.bessRoundTripEfficiencyPercent / 100
  const dod = A.bessDepthOfDischargePct / 100
  const usablePerCycle = storageSizeKWh * dod * roundTripEff

  let additionalSelfConsumptionKWh: number

  if (pvExportKWh && pvExportKWh > 0) {
    // PV surplus that would be exported can instead be captured by the battery
    const maxAnnualCapture = usablePerCycle * A.bessCyclesPerYear
    // Battery captures up to 85% of the available surplus (timing mismatch / losses)
    additionalSelfConsumptionKWh = Math.min(pvExportKWh * 0.85, maxAnnualCapture)
  } else {
    // Standalone: time-of-use arbitrage — shifts ~30% of load to off-peak charging
    const shiftableLoad = dailyConsumption * 0.30
    const dailyCapturable = Math.min(shiftableLoad, storageSizeKWh * roundTripEff)
    additionalSelfConsumptionKWh = dailyCapturable * 280 // ~280 effective operating days
  }

  additionalSelfConsumptionKWh = Math.round(additionalSelfConsumptionKWh)

  // Self-consumption improvement as % of total annual consumption
  const selfConsumptionIncrease = Math.round(
    (additionalSelfConsumptionKWh / annualConsumption) * 100
  )

  // ── Financial Calculations ─────────────────────────────────────────────────
  const electricityTariff = formData.electricityTariff ?? country.electricityPrice

  // Savings from additional self-consumed energy (avoided grid purchase)
  const selfConsumptionSavings = Math.round(additionalSelfConsumptionKWh * electricityTariff)

  // Peak shaving demand charge savings (only if user indicated interest)
  const peakShavingSavings = formData.peakShavingInterest
    ? Math.round(powerKW * 150) // ~€150/kW/yr demand charge reduction (EU commercial avg)
    : 0

  const annualSavings = selfConsumptionSavings + peakShavingSavings

  // ── CapEx ──────────────────────────────────────────────────────────────────
  const costPerKWh = country.bessCostPerKWh ?? A.bessDefaultCostPerKWh
  const capexEUR = Math.round(storageSizeKWh * costPerKWh)

  // ── Payback & ROI ─────────────────────────────────────────────────────────
  const paybackYears =
    annualSavings > 0
      ? Math.round((capexEUR / annualSavings) * 10) / 10
      : 99

  const inflation = A.electricityPriceInflationPercent / 100
  let cumulativeBenefit = -capexEUR
  for (let year = 1; year <= A.bessLifespanYears; year++) {
    cumulativeBenefit += annualSavings * Math.pow(1 + inflation, year - 1)
  }
  const roiPercent =
    capexEUR > 0 ? Math.round((cumulativeBenefit / capexEUR) * 100) : 0

  return {
    storageSizeKWh,
    powerKW,
    selfConsumptionIncrease,
    additionalSelfConsumptionKWh,
    peakShavingSavings,
    annualSavings,
    capexEUR,
    paybackYears,
    roiPercent,
  }
}
