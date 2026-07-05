import type { LeadSubmissionPayload, LeadSubmissionResponse } from '@/types'

export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResponse> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Lead submission error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// ── Integration stubs (configure via .env) ─────────────────────────────────

export async function submitToHubSpot(payload: LeadSubmissionPayload): Promise<void> {
  if (!process.env.HUBSPOT_API_KEY) return
  // TODO: POST to https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formId
  console.log('[HubSpot] Stub — configure HUBSPOT_API_KEY, HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID')
}

export async function submitToGoogleSheets(payload: LeadSubmissionPayload): Promise<void> {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) return
  console.log('[Google Sheets] Stub — configure service account credentials')
}

export async function submitToCRMWebhook(payload: LeadSubmissionPayload): Promise<void> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL
  if (!webhookUrl) return
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CRM_API_KEY ?? ''}`,
    },
    body: JSON.stringify(payload),
  })
}

// ── Brinoko Engine (primary CRM) ────────────────────────────────────────────
// Forwards calculator leads into the Brinoko Engine pipeline (scoring →
// nurture → partner routing). Configure BRINOKO_ENGINE_URL, e.g.
// http://localhost:3100 in dev, https://app.brinoko.ro in production.

const SOLUTION_TO_OFFERING: Record<string, string> = {
  pv: 'pv_b2b',
  bess: 'bess',
  heatpump: 'heat_pumps',
}

export async function submitToBrinokoEngine(payload: LeadSubmissionPayload): Promise<void> {
  const base = process.env.BRINOKO_ENGINE_URL
  if (!base) return

  const f = payload.formData
  const c = payload.results?.combined
  const summary = [
    `Calculator Brinowatt (${f.country})`,
    c?.totalAnnualSavings != null ? `economii anuale estimate ~€${Math.round(c.totalAnnualSavings)}` : null,
    c?.totalPaybackYears != null ? `payback estimat ~${c.totalPaybackYears.toFixed(1)} ani` : null,
    c?.totalCapexEUR != null ? `CAPEX estimat ~€${Math.round(c.totalCapexEUR)}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const utm: Record<string, string> = {}
  if (payload.metadata?.utmSource) utm.utm_source = payload.metadata.utmSource
  if (payload.metadata?.utmMedium) utm.utm_medium = payload.metadata.utmMedium
  if (payload.metadata?.utmCampaign) utm.utm_campaign = payload.metadata.utmCampaign

  const res = await fetch(`${base}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      offerSlug: 'brinowatt-roi',
      sourceKind: 'calculator',
      offering: SOLUTION_TO_OFFERING[f.selectedSolution] ?? 'energy_efficiency',
      company: f.companyName,
      contactName: f.contactName,
      email: f.email,
      phone: f.phone ?? '',
      message: summary.slice(0, 2000),
      // GDPR: the engine hard-rejects submissions without explicit consent.
      consent: f.gdprConsent === true,
      utm,
    }),
  })
  if (!res.ok) {
    throw new Error(`Brinoko Engine ${res.status}: ${await res.text()}`)
  }
}
