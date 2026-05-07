import type { CountryConfig } from '@/types'

/**
 * Country-specific parameters for energy calculations.
 * Values are indicative 2024 estimates for SME customers.
 * Replace with real-time data feed for production accuracy.
 */
export const COUNTRIES: CountryConfig[] = [
  {
    code: 'DE', name: 'Germany', flag: '🇩🇪',
    electricityPrice: 0.31, solarIrradiance: 1050, feedInTariff: 0.082,
    pvInstallationCostPerKWp: 1100, bessCostPerKWh: 600, heatPumpCostPerKW: 850,
    currency: 'EUR', vatRate: 19, co2GridFactor: 0.380,
    gasPricePerKWh: 0.085, oilPricePerKWh: 0.092,
  },
  {
    code: 'FR', name: 'France', flag: '🇫🇷',
    electricityPrice: 0.23, solarIrradiance: 1350, feedInTariff: 0.06,
    pvInstallationCostPerKWp: 1050, bessCostPerKWh: 580, heatPumpCostPerKW: 800,
    currency: 'EUR', vatRate: 20, co2GridFactor: 0.052,
    gasPricePerKWh: 0.072, oilPricePerKWh: 0.088,
  },
  {
    code: 'IT', name: 'Italy', flag: '🇮🇹',
    electricityPrice: 0.28, solarIrradiance: 1550, feedInTariff: 0.05,
    pvInstallationCostPerKWp: 1000, bessCostPerKWh: 560, heatPumpCostPerKW: 780,
    currency: 'EUR', vatRate: 22, co2GridFactor: 0.280,
    gasPricePerKWh: 0.095, oilPricePerKWh: 0.098,
  },
  {
    code: 'ES', name: 'Spain', flag: '🇪🇸',
    electricityPrice: 0.26, solarIrradiance: 1650, feedInTariff: 0.04,
    pvInstallationCostPerKWp: 950, bessCostPerKWh: 550, heatPumpCostPerKW: 750,
    currency: 'EUR', vatRate: 21, co2GridFactor: 0.195,
    gasPricePerKWh: 0.078, oilPricePerKWh: 0.085,
  },
  {
    code: 'NL', name: 'Netherlands', flag: '🇳🇱',
    electricityPrice: 0.34, solarIrradiance: 950, feedInTariff: 0.09,
    pvInstallationCostPerKWp: 1150, bessCostPerKWh: 620, heatPumpCostPerKW: 870,
    currency: 'EUR', vatRate: 21, co2GridFactor: 0.350,
    gasPricePerKWh: 0.12, oilPricePerKWh: 0.105,
  },
  {
    code: 'BE', name: 'Belgium', flag: '🇧🇪',
    electricityPrice: 0.33, solarIrradiance: 980, feedInTariff: 0.055,
    pvInstallationCostPerKWp: 1100, bessCostPerKWh: 610, heatPumpCostPerKW: 860,
    currency: 'EUR', vatRate: 21, co2GridFactor: 0.165,
    gasPricePerKWh: 0.105, oilPricePerKWh: 0.098,
  },
  {
    code: 'AT', name: 'Austria', flag: '🇦🇹',
    electricityPrice: 0.25, solarIrradiance: 1150, feedInTariff: 0.082,
    pvInstallationCostPerKWp: 1080, bessCostPerKWh: 580, heatPumpCostPerKW: 820,
    currency: 'EUR', vatRate: 20, co2GridFactor: 0.108,
    gasPricePerKWh: 0.082, oilPricePerKWh: 0.089,
  },
  {
    code: 'PL', name: 'Poland', flag: '🇵🇱',
    electricityPrice: 0.21, solarIrradiance: 1100, feedInTariff: 0.04,
    pvInstallationCostPerKWp: 900, bessCostPerKWh: 520, heatPumpCostPerKW: 700,
    currency: 'PLN', vatRate: 23, co2GridFactor: 0.700,
    gasPricePerKWh: 0.065, oilPricePerKWh: 0.082,
  },
  {
    code: 'CZ', name: 'Czech Republic', flag: '🇨🇿',
    electricityPrice: 0.22, solarIrradiance: 1100, feedInTariff: 0.045,
    pvInstallationCostPerKWp: 950, bessCostPerKWh: 540, heatPumpCostPerKW: 720,
    currency: 'CZK', vatRate: 21, co2GridFactor: 0.480,
    gasPricePerKWh: 0.07, oilPricePerKWh: 0.085,
  },
  {
    code: 'SE', name: 'Sweden', flag: '🇸🇪',
    electricityPrice: 0.19, solarIrradiance: 900, feedInTariff: 0.06,
    pvInstallationCostPerKWp: 1100, bessCostPerKWh: 580, heatPumpCostPerKW: 800,
    currency: 'SEK', vatRate: 25, co2GridFactor: 0.045,
    gasPricePerKWh: 0.095, oilPricePerKWh: 0.102,
  },
  {
    code: 'DK', name: 'Denmark', flag: '🇩🇰',
    electricityPrice: 0.38, solarIrradiance: 950, feedInTariff: 0.07,
    pvInstallationCostPerKWp: 1150, bessCostPerKWh: 620, heatPumpCostPerKW: 880,
    currency: 'DKK', vatRate: 25, co2GridFactor: 0.120,
    gasPricePerKWh: 0.105, oilPricePerKWh: 0.112,
  },
  {
    code: 'PT', name: 'Portugal', flag: '🇵🇹',
    electricityPrice: 0.22, solarIrradiance: 1750, feedInTariff: 0.047,
    pvInstallationCostPerKWp: 950, bessCostPerKWh: 540, heatPumpCostPerKW: 740,
    currency: 'EUR', vatRate: 23, co2GridFactor: 0.210,
    gasPricePerKWh: 0.075, oilPricePerKWh: 0.088,
  },
  {
    code: 'OTHER', name: 'Other European Country', flag: '🇪🇺',
    electricityPrice: 0.25, solarIrradiance: 1200, feedInTariff: 0.06,
    pvInstallationCostPerKWp: 1050, bessCostPerKWh: 580, heatPumpCostPerKW: 800,
    currency: 'EUR', vatRate: 20, co2GridFactor: 0.276,
    gasPricePerKWh: 0.085, oilPricePerKWh: 0.092,
  },
]

export function getCountryConfig(code: string): CountryConfig {
  return COUNTRIES.find(c => c.code === code) ?? COUNTRIES[COUNTRIES.length - 1]
}

export const COUNTRY_OPTIONS = COUNTRIES.map(c => ({
  value: c.code,
  label: `${c.flag} ${c.name}`,
}))
