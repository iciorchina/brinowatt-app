export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatKWh(value: number): string {
  if (value >= 1_000_000) return `${formatNumber(value / 1_000_000, 1)} GWh`
  if (value >= 1_000) return `${formatNumber(value / 1_000, 1)} MWh`
  return `${formatNumber(value, 0)} kWh`
}

export function formatKWp(value: number): string {
  return `${formatNumber(value, 1)} kWp`
}

export function formatPercent(value: number, decimals = 0): string {
  return `${formatNumber(value, decimals)}%`
}

export function formatYears(years: number): string {
  if (years >= 100) return '> 30 yrs'
  if (years === Math.floor(years)) return `${years} yrs`
  return `${years.toFixed(1)} yrs`
}

export function formatTonnesCO2(tonnes: number): string {
  return `${formatNumber(tonnes, 1)} t CO₂/yr`
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
