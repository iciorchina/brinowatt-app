import type { FormData, HeatPumpResults, HeatingType } from '@/types'
import { ASSUMPTIONS } from '@/lib/config/assumptions'
import { getCountryConfig } from '@/lib/config/countries'

const HEATING_COST_PER_KWH: Record<HeatingType, number> = {
  gas: 0.085,
  oil: 0.092,
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

export function calculateHeatPump(formData: Partial<FormData>): HeatPumpResults {
  const country = getCountryConfig(formData.country ?? 'OTHER')
  const A = ASSUMPTIONS

  const buildingSize = formData.buildingSize ?? 500
  const heatingType: HeatingType = formData.currentHeatingType ?? 'gas'
  const electricityTariff = formData.electricityTariff ?? country.electricityPrice

  const heatLoadW = buildingSize * A.hpSizingWperM2
  const heatPumpSizeKW = Math.max(5, Math.ceil(heatLoadW / 1000))

  const annualHeatingDemand =
    formData.annualHeatingDemand ?? buildingSize * 80

  const heatingCostPerKWh = HEATING_COST_PER_KWH[heatingType]
  const annualCurrentEnergyCost =
    formData.annualHeatingCost ?? annualHeatingDemand * heatingCostPerKWh

  const cop = A.hpCOPDefault
  const annualHeatPumpElectricityKWh = annualHeatingDemand / cop
  const annualHeatPumpEnergyCost = annualHeatPumpElectricityKWh * electricityTariff

  const annualSavings = annualCurrentEnergyCost - annualHeatPumpEnergyCost

  const currentCO2Tonnes = (annualHeatingDemand * HEATING_CO2_FACTOR[heatingType]) / 1000
  const hpCO2Tonnes = (annualHeatPumpElectricityKWh * country.co2GridFactor) / 1000
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
    annualSavings: Math.round(annualSavings),
    co2ReductionTonnes: Math.round(co2ReductionTonnes * 10) / 10,
    capexEUR: Math.round(capexEUR),
    paybackYears: Math.round(paybackYears * 10) / 10,
    roiPercent: Math.round(roiPercent),
  }
}
