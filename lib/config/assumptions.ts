import type { AssumptionsConfig } from '@/types'

/**
 * Central configuration for all calculation assumptions.
 * Edit these values to adjust estimations without touching calculation logic.
 * Country-specific overrides can be layered on top via CountryConfig.
 */
export const ASSUMPTIONS: AssumptionsConfig = {
  // ── Photovoltaic ──────────────────────────────────────────────────────────
  pvPanelEfficiencyPercent: 20,         // modern monocrystalline panels ~20%
  pvDegradationRatePercent: 0.5,        // 0.5% annual output degradation
  pvLifespanYears: 25,
  pvDefaultInstallCostPerKWp: 800,      // EUR/kWp all-in (client-set price)
  pvAreaPerKWp: 5.5,                    // m² per kWp (standard panels)
  pvInverterEfficiencyPercent: 97,
  pvSelfConsumptionBasePercent: 35,     // typical SME without battery
  pvSelfConsumptionWithBessPercent: 70, // with appropriately-sized battery
  pvMaintenanceCostPerKWpPerYear: 15,   // EUR — cleaning, inverter check
  pvSystemLossPercent: 14,              // soiling, shading, wiring, inverter losses

  // ── Battery Energy Storage ───────────────────────────────────────────────
  bessLifespanYears: 12,
  bessDefaultCostPerKWh: 300,           // EUR/kWh installed (client-set price)
  bessRoundTripEfficiencyPercent: 93,
  bessDepthOfDischargePct: 90,
  bessCyclesPerYear: 300,
  bessTypicalSizeRatioToDaily: 0.5,     // size battery at 50% of daily usage

  // ── Heat Pump ────────────────────────────────────────────────────────────
  hpCOPDefault: 3.5,                    // air-to-water, temperate climate
  hpSizingWperM2: 50,                   // W/m² for well-insulated commercial
  hpDefaultInstallCostPerKW: 800,       // EUR/kW installed (commercial grade)
  hpLifespanYears: 20,
  hpCO2FactorGas: 0.202,               // kg CO2/kWh natural gas (EU avg)
  hpCO2FactorOil: 0.267,               // kg CO2/kWh heating oil
  hpCO2FactorElectric: 0.0,            // replaced by grid factor

  // ── Economics ────────────────────────────────────────────────────────────
  discountRatePercent: 5,               // WACC assumption for NPV
  electricityPriceInflationPercent: 3,  // annual electricity price increase
  analysisHorizonYears: 20,
  gridCO2FactorDefault: 0.276,          // kg CO2/kWh EU electricity mix 2023

  // ── Scenario Multipliers ─────────────────────────────────────────────────
  scenarioMultipliers: {
    conservative: { capex: 1.15, savings: 0.80 },  // higher cost, lower savings
    standard:     { capex: 1.00, savings: 1.00 },  // base case
    optimistic:   { capex: 0.90, savings: 1.20 },  // better pricing, more savings
  },
}

// Default electricity tariff if user doesn't provide one
export const DEFAULT_ELECTRICITY_TARIFF = 0.22 // EUR/kWh

// Minimum viable system sizes
export const MIN_PV_SIZE_KWP = 3
export const MAX_PV_SIZE_KWP = 5000
export const MIN_BESS_SIZE_KWH = 5
export const MIN_HP_SIZE_KW = 5
