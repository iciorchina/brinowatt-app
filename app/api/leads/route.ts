import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import type { LeadSubmissionPayload, LeadSubmissionResponse, Lead } from '@/types'
import { submitToHubSpot, submitToGoogleSheets, submitToCRMWebhook } from '@/lib/services/leadService'

// In-memory dev store — replace with DB (Postgres/Supabase/PlanetScale) in production
const leads: Lead[] = []

export async function POST(req: NextRequest): Promise<NextResponse<LeadSubmissionResponse>> {
  try {
    const payload: LeadSubmissionPayload = await req.json()

    if (!payload.formData?.email || !payload.formData?.contactName) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const leadId = uuidv4()
    const now = new Date().toISOString()

    const lead: Lead = {
      id: leadId,
      createdAt: now,
      updatedAt: now,
      formData: payload.formData,
      results: payload.results,
      status: 'new',
      source: payload.metadata?.utmSource ?? 'organic',
    }

    leads.push(lead)

    // Fire integrations non-blocking
    void Promise.allSettled([
      submitToHubSpot(payload),
      submitToGoogleSheets(payload),
      submitToCRMWebhook(payload),
    ])

    console.log(`[Leads] New lead ${leadId}: ${payload.formData.email} (${payload.formData.selectedSolution})`)

    return NextResponse.json({ success: true, leadId, message: 'Lead submitted successfully' })
  } catch (err) {
    console.error('[Leads API] Error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = process.env.LEAD_STORAGE_SECRET
  const auth = req.headers.get('authorization')
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({
    total: leads.length,
    leads: leads.map(l => ({
      id: l.id,
      email: l.formData.email,
      company: l.formData.companyName,
      solution: l.formData.selectedSolution,
      country: l.formData.country,
      status: l.status,
      createdAt: l.createdAt,
    })),
  })
}
