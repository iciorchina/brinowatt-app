// localStorage / sessionStorage helpers — browser-only
// All functions guard against SSR with typeof window checks

const FORM_KEY = 'energy_roi_form_data'
const RESULTS_KEY = 'energy_roi_results'

export function saveFormData(data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FORM_KEY, JSON.stringify(data))
  } catch {
    // Ignore — private browsing, quota exceeded, etc.
  }
}

export function loadFormData(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(FORM_KEY)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export function saveResults(results: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  } catch {
    // Ignore
  }
}

export function loadResults(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(RESULTS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export function clearSavedData(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(FORM_KEY)
    sessionStorage.removeItem(RESULTS_KEY)
  } catch {
    // Ignore
  }
}
