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
