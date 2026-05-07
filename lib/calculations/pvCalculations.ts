import type { FormData, PVResults } from '@/types'
import { ASSUMPTIONS } from '@/lib/config/assumptions'
import { getCountryConfig } from '@/lib/config/countries'

/**
 * Calculates PV system sizing, production, savings, and financials.
 * All monetary values in EUR. Uses country-specific or user-provided tariffs.
 */
export function calculatePV(formData: Partial<FormData>, hasBESS = false): PVResults {
  const country = getCountryConfig(formData.country ?? 'OTHER')
  const A = ASSUMPTIONS

  // ── System Sizing ──────────────────────────────────────────────────────────
  // Size PV system based on available area OR annual consumption (whichever is limiting)
  const area = formData.availableRoofArea ?? 100
  const maxKWpFromArea = area / A.pvAreaPerKWp

  const annualConsumption = formData.annualElectricityConsumption ?? 50000
  // Target covering ~80% of annual consumption with PV (overproduction gives buffer)
  const irradiance = country.solarIrradiance
  const systemEfficiency = (1 - A.pvSystemLossPercent / 100) * (A.pvInverterEfficiencyPercent / 100)
  const targetKWpFromConsumption = (annualConsumption * 0.8) / (irradiance * systemEfficiency)

  // Take the smaller of the two (area-constrained or consumption-based)
  const rawSystemSize = Math.min(maxKWpFromArea, targetKWpFromConsumption)
  const systemSizeKWp = Math.max(3, Math.round(rawSystemSize * 2) / 2) // round to 0.5 kWp, min 3 kWp

  // ── Annual Production ──────────────────────────────────────────────────────
  // Production = system size × irradiance × overall efficiency
  const annualProductionKWh = systemSizeKWp * irradiance * systemEfficiency

  // ── Self-Consumption ───────────────────────────────────────────────────────
  const selfConsumptionRate = hasBESS
    ? A.pvSelfConsumptionWithBessPercent / 100
    : A.pvSelfConsumptionBasePercent / 100

  const selfConsumptionKWh = Math.min(
    annualProductionKWh * selfConsumptionRate,
    annualConsumption
  )
  const gridExportKWh = annualProductionKWh - selfConsumptionKWh

  // ── Financial Calculations ─────────────────────────────────────────────────
  const electricityTariff = formData.electricityTariff ?? country.electricityPrice
  const feedInTariff = country.feedInTariff

  // Savings from avoided grid purchase
  const annualSavings = selfConsumptionKWh * electricityTariff

  // Revenue from grid export (feed-in tariff)
  const gridExportRevenue = gridExportKWh * feedInTariff

  const totalAnnualBenefit = annualSavings + gridExportRevenue

  // Maintenance cost
  const annualMaintenance = systemSizeKWp * A.pvMaintenanceCostPerKWpPerYear

  const netAnnualBenefit = totalAnnualBenefit - annualMaintenance

  // CapEx
  const capexEUR = systemSizeKWp * country.pvInstallationCostPerKWp

  // Simple payback
  const paybackYears = netAnnualBenefit > 0 ? capexEUR / netAnnualBenefit : 999

  // ROI over lifespan
  const totalBenefit = netAnnualBenefit * A.pvLifespanYears
  const roiPercent = ((totalBenefit - capexEUR) / capexEUR) * 100

  // ── CO2 Reduction ──────────────────────────────────────────────────────────
  const co2ReductionTonnes = (annualProductionKWh * country.co2GridFactor) / 1000

  return {
    systemSizeKWp: Math.round(systemSizeKWp * 10) / 10,
    annualProductionKWh: Math.round(annualProductionKWh),
    selfConsumptionKWh: Math.round(selfConsumptionKWh),
    gridExportKWh: Math.round(gridExportKWh),
    selfConsumptionRate: Math.round(selfConsumptionRate * 100),
    annualSavings: Math.round(annualSavings),
    gridExportRevenue: Math.round(gridExportRevenue),
    totalAnnualBenefit: Math.round(netAnnualBenefit),
    capexEUR: Math.round(capexEUR),
    paybackYears: Math.round(paybackYears * 10) / 10,
    roiPercent: Math.round(roiPercent),
    co2ReductionTonnes: Math.round(co2ReductionTonnes * 10) / 10,
  }
}
