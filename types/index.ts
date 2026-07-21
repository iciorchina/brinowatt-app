// ─── Solution Types ─────────────────────────────────────────────────────────

export type SolutionType =
  | 'pv'
  | 'bess'
  | 'heatpump'
  | 'pv_bess'
  | 'pv_heatpump'
  | 'full_hybrid'

export type Scenario = 'conservative' | 'standard' | 'optimistic'

export type RoofType = 'flat' | 'pitched' | 'ground_mounted'

export type HeatingType = 'gas' | 'oil' | 'electric' | 'district' | 'biomass' | 'other'

export type FinancingPreference = 'cash' | 'loan' | 'leasing' | 'ppa' | 'undecided'

// ─── Form Data ───────────────────────────────────────────────────────────────

export interface FormData {
  // Step 1: Solution Selection
  selectedSolution: SolutionType

  // Step 2: Location & Company
  country: string
  city: string
  companyName: string
  businessSector: string
  buildingSize: number // m²

  // Step 3: Energy Profile
  annualElectricityConsumption: number // kWh/year
  monthlyElectricityBill: number // EUR/month
  electricityTariff: number // EUR/kWh
  operatingHoursPerDay: number // hours/day

  // Step 4a: PV Config
  roofType: RoofType
  availableRoofArea: number // m²
  selfConsumptionPriority: boolean
  gridExportAllowed: boolean

  // Step 4b: BESS Config
  peakShavingInterest: boolean
  backupPowerInterest: boolean
  preferredStorageHours: number // hours of backup

  // Step 4c: Heat Pump Config
  currentHeatingType: HeatingType
  annualHeatingCost: number // EUR/year
  annualHeatingDemand: number // kWh/year

  // Step 5: Budget & Financing
  budgetRange: string
  financingPreference: FinancingPreference

  // Step 6: Contact & Consent
  contactName: string
  email: string
  phone: string
  contactConsent: boolean
  gdprConsent: boolean

  // UTM / Tracking
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
}

// ─── Calculation Results ─────────────────────────────────────────────────────

export interface PVResults {
  systemSizeKWp: number
  annualProductionKWh: number
  selfConsumptionKWh: number
  gridExportKWh: number
  selfConsumptionRate: number // %
  annualSavings: number // EUR
  gridExportRevenue: number // EUR
  totalAnnualBenefit: number // EUR
  capexEUR: number
  paybackYears: number
  roiPercent: number
  co2ReductionTonnes: number
}

export interface BESSResults {
  storageSizeKWh: number
  powerKW: number
  selfConsumptionIncrease: number // percentage points
  additionalSelfConsumptionKWh: number
  peakShavingSavings: number // EUR
  annualSavings: number // EUR
  capexEUR: number
  paybackYears: number
  roiPercent: number
}

export interface HeatPumpResults {
  heatPumpSizeKW: number
  cop: number
  annualHeatPumpElectricityKWh: number
  annualCurrentEnergyCost: number // EUR
  annualHeatPumpEnergyCost: number // EUR (at full grid tariff, before solar synergy)
  solarCoveredKWh: number // HP electricity covered by surplus PV (0 without PV)
  solarSynergySavings: number // EUR/yr net benefit of solar-covered HP consumption
  annualSavings: number // EUR (includes solar synergy)
  co2ReductionTonnes: number
  capexEUR: number
  paybackYears: number
  roiPercent: number
}

export interface CombinedResults {
  totalCapexEUR: number
  totalAnnualSavings: number // EUR
  totalPaybackYears: number
  totalCo2ReductionTonnes: number
  roi5Years: number // %
  roi10Years: number // %
  roi15Years: number // %
  cumulativeCashFlow: CashFlowPoint[] // 20 years
  annualSavingsBreakdown: {
    pv?: number
    bess?: number
    heatPump?: number
  }
  npv: number
  energyCostReductionPercent: number
}

export interface CashFlowPoint {
  year: number
  annualSavings: number
  cumulativeSavings: number
  cumulativeCashFlow: number // after subtracting CAPEX
}

export interface ScenarioResults {
  conservative: CombinedResults
  standard: CombinedResults
  optimistic: CombinedResults
}

export interface CalculationResults {
  scenario: Scenario
  pv?: PVResults
  bess?: BESSResults
  heatPump?: HeatPumpResults
  combined: CombinedResults
  scenarios: ScenarioResults
  formData: Partial<FormData>
  calculatedAt: string
}

// ─── Lead / CRM ──────────────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface Lead {
  id: string
  createdAt: string
  updatedAt: string
  formData: FormData
  results: CalculationResults
  status: LeadStatus
  source: string
  notes?: string
}

export interface LeadSubmissionPayload {
  formData: FormData
  results: CalculationResults
  metadata: {
    submittedAt: string
    userAgent?: string
    ipAddress?: string
    pageUrl?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }
}

export interface LeadSubmissionResponse {
  success: boolean
  leadId?: string
  message?: string
  error?: string
}

// ─── Country / Config ────────────────────────────────────────────────────────

export interface CountryConfig {
  code: string
  name: string
  flag: string
  electricityPrice: number // EUR/kWh (default residential/SME)
  solarIrradiance: number // kWh/kWp/year (full yield)
  feedInTariff: number // EUR/kWh
  pvInstallationCostPerKWp: number // EUR/kWp (all-in)
  bessCostPerKWh: number // EUR/kWh (installed)
  heatPumpCostPerKW: number // EUR/kW (installed)
  currency: string
  vatRate: number // %
  co2GridFactor: number // kg CO2/kWh
  gasPricePerKWh: number
  oilPricePerKWh: number
}

export interface AssumptionsConfig {
  // PV
  pvPanelEfficiencyPercent: number
  pvDegradationRatePercent: number // per year
  pvLifespanYears: number
  pvDefaultInstallCostPerKWp: number // EUR/kWp Europe avg
  pvAreaPerKWp: number // m² needed per kWp
  pvInverterEfficiencyPercent: number
  pvSelfConsumptionBasePercent: number // without BESS
  pvSelfConsumptionWithBessPercent: number // with BESS
  pvMaintenanceCostPerKWpPerYear: number // EUR
  pvSystemLossPercent: number // soiling, wiring, etc.

  // BESS
  bessLifespanYears: number
  bessDefaultCostPerKWh: number // EUR/kWh Europe avg
  bessRoundTripEfficiencyPercent: number
  bessDepthOfDischargePct: number
  bessCyclesPerYear: number
  bessTypicalSizeRatioToDaily: number // kWh per kWh daily usage

  // Heat Pump
  hpCOPDefault: number // coefficient of performance (air-to-water)
  hpSizingWperM2: number // W/m² of conditioned building area
  hpDefaultInstallCostPerKW: number // EUR/kW
  hpLifespanYears: number
  hpCO2FactorGas: number // kg CO2/kWh
  hpCO2FactorOil: number // kg CO2/kWh
  hpCO2FactorElectric: number // kg CO2/kWh
  hpSolarCoverageSharePercent: number // share of HP electricity coverable by surplus PV

  // Economics
  discountRatePercent: number // for NPV
  electricityPriceInflationPercent: number // per year
  analysisHorizonYears: number
  gridCO2FactorDefault: number // kg CO2/kWh (EU mix)

  // Scenarios multipliers (applied to CAPEX and savings)
  scenarioMultipliers: {
    conservative: { capex: number; savings: number }
    standard: { capex: number; savings: number }
    optimistic: { capex: number; savings: number }
  }
}

