import type { FormData, HeatPumpResults, HeatingType } from '@/types'
import { ASSUMPTIONS } from '@/lib/config/assumptions'
import { getCountryConfig } from '@/lib/config/countries'

// Fallback prices for fuels without per-country data. Gas and oil use the
// country config; electric resistance uses the user's own electricity tariff.
const FALLBACK_FUEL_PRICE: Record<HeatingType, number> = {
  gas: 0.10,
  oil: 0.105,
  electric: 0.25,
  district: 0.07,
  biomass: 0.045,
  other: 0.09,
}

const HEATING_CO2_FACTOR: Record<HeatingType, number> = {
  gas: 0.202,
  oil: 0.267,
  electric: 0.276,
  district: 0.12,
  biomass: 0.03,
  other: 0.20,
}

export interface HpSynergyInput {
  /** Annual PV surplus (grid export) available to feed the heat pump, kWh */
  pvExportKWh: number
}

export function calculateHeatPump(
  formData: Partial<FormData>,
  synergy?: HpSynergyInput
): HeatPumpResults {
  const country = getCountryConfig(formData.country ?? 'OTHER')
  const A = ASSUMPTIONS

  const buildingSize = Number(formData.buildingSize) || 500
  const heatingType: HeatingType = formData.currentHeatingType ?? 'gas'
  const electricityTariff = Number(formData.electricityTariff) || country.electricityPrice

  const heatLoadW = buildingSize * A.hpSizingWperM2
  const heatPumpSizeKW = Math.max(5, Math.ceil(heatLoadW / 1000))

  // Number() handles react-hook-form string values; || treats 0/'' (the form
  // defaults for these optional fields) as "not provided" and falls back to
  // the building-size estimate — 0 heating demand is never a real input here.
  const annualHeatingDemand =
    Number(formData.annualHeatingDemand) || buildingSize * 80

  const fuelPrice =
    heatingType === 'gas' ? country.gasPricePerKWh
    : heatingType === 'oil' ? country.oilPricePerKWh
    : heatingType === 'electric' ? electricityTariff
    : FALLBACK_FUEL_PRICE[heatingType]

  const annualCurrentEnergyCost =
    Number(formData.annualHeatingCost) || annualHeatingDemand * fuelPrice

  const cop = A.hpCOPDefault
  const annualHeatPumpElectricityKWh = annualHeatingDemand / cop
  const annualHeatPumpEnergyCost = annualHeatPumpElectricityKWh * electricityTariff

  // ── PV synergy ─────────────────────────────────────────────────────────
  // A share of the HP's electricity can be covered by surplus PV that would
  // otherwise be exported. The share is capped by seasonal mismatch (winter
  // heating vs. summer surplus) and by the surplus actually available.
  // Accounting: that energy would have earned only the feed-in tariff as
  // export, so the net system benefit is (tariff − feed-in) per kWh — the PV
  // side keeps its export revenue as computed, so nothing is double-counted.
  const coverageShare = A.hpSolarCoverageSharePercent / 100
  const solarCoveredKWh = synergy
    ? Math.round(Math.min(
        annualHeatPumpElectricityKWh * coverageShare,
        Math.max(0, synergy.pvExportKWh)
      ))
    : 0
  const solarSynergySavings = Math.round(
    solarCoveredKWh * Math.max(0, electricityTariff - country.feedInTariff)
  )

  const annualSavings =
    annualCurrentEnergyCost - annualHeatPumpEnergyCost + solarSynergySavings

  // Solar-covered consumption carries no grid CO2
  const currentCO2Tonnes = (annualHeatingDemand * HEATING_CO2_FACTOR[heatingType]) / 1000
  const hpCO2Tonnes =
    ((annualHeatPumpElectricityKWh - solarCoveredKWh) * country.co2GridFactor) / 1000
  const co2ReductionTonnes = Math.max(0, currentCO2Tonnes - hpCO2Tonnes)

  const capexEUR = heatPumpSizeKW * country.heatPumpCostPerKW
  const paybackYears = annualSavings > 0 ? capexEUR / annualSavings : 999
  const totalSavings = annualSavings * A.hpLifespanYears
  const roiPercent = totalSavings > 0 ? ((totalSavings - capexEUR) / capexEUR) * 100 : 0

  return {
    heatPumpSizeKW,
    cop,
    annualHeatPumpElectricityKWh: Math.round(annualHeatPumpElectricityKWh),
    annualCurrentEnergyCost: Math.round(annualCurrentEnergyCost),
    annualHeatPumpEnergyCost: Math.round(annualHeatPumpEnergyCost),
    solarCoveredKWh,
    solarSynergySavings,
    annualSavings: Math.round(annualSavings),
    co2ReductionTonnes: Math.round(co2ReductionTonnes * 10) / 10,
    capexEUR: Math.round(capexEUR),
    paybackYears: Math.round(paybackYears * 10) / 10,
    roiPercent: Math.round(roiPercent),
  }
}
