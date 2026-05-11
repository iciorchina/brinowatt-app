/**
 * Lightweight email forwarder for lead and contact submissions.
 *
 * Uses the Resend HTTP API directly (no SDK dependency). When RESEND_API_KEY is
 * not set, all functions become no-ops so the app continues to work in dev and
 * for users who haven't yet configured email delivery.
 *
 * Setup (production):
 *   1. Sign up at https://resend.com (free tier: 3k emails/month)
 *   2. Generate an API key
 *   3. Set environment variables in Vercel:
 *        RESEND_API_KEY  = re_xxx...
 *        LEAD_EMAIL_TO   = leads@yourcompany.com
 *        LEAD_EMAIL_FROM = "Brinowatt <onboarding@resend.dev>"  (or your verified domain)
 */

import type { LeadSubmissionPayload } from '@/types'

interface ResendPayload {
  from: string
  to: string | string[]
  subject: string
  html: string
  reply_to?: string
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

async function sendViaResend(body: ResendPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[Email] Skipped — RESEND_API_KEY not configured')
    return
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Resend API error ${res.status}: ${text}`)
  }
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: unknown): string {
  if (value === undefined || value === null || value === '') return ''
  return `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">${escapeHtml(
    label
  )}</td><td style="padding:6px 12px;font-size:14px;color:#0f172a;font-weight:500;">${escapeHtml(
    value
  )}</td></tr>`
}

const FROM_DEFAULT = 'Brinowatt <onboarding@resend.dev>'

// ── Lead notification ──────────────────────────────────────────────────────

export async function sendLeadEmail(
  leadId: string,
  payload: LeadSubmissionPayload
): Promise<void> {
  const to = process.env.LEAD_EMAIL_TO
  if (!to) {
    console.log('[Email] Skipped — LEAD_EMAIL_TO not configured')
    return
  }

  const f = payload.formData
  const r = payload.results
  const c = r?.combined

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0f172a;">
    <div style="background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <h1 style="margin:0;font-size:20px;">New lead — Brinowatt</h1>
      <p style="margin:6px 0 0 0;font-size:13px;opacity:0.85;">${escapeHtml(
        f.companyName ?? f.contactName
      )} · ${escapeHtml(f.country)}</p>
    </div>
    <div style="background:#fff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Lead ID', leadId)}
        ${row('Contact', f.contactName)}
        ${row('Email', f.email)}
        ${row('Phone', f.phone)}
        ${row('Company', f.companyName)}
        ${row('Sector', f.businessSector)}
        ${row('Country', f.country)}
        ${row('City', f.city)}
        ${row('Solution', f.selectedSolution)}
        ${row('Building size', f.buildingSize ? `${f.buildingSize} m²` : '')}
        ${row('Annual consumption', f.annualElectricityConsumption ? `${f.annualElectricityConsumption.toLocaleString()} kWh` : '')}
        ${row('Budget range', f.budgetRange)}
        ${row('Financing', f.financingPreference)}
      </table>
      ${
        c
          ? `
      <div style="margin:16px 12px;padding:14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
        <div style="font-size:12px;color:#166534;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-bottom:8px;">Calculated estimate</div>
        <div style="font-size:14px;color:#0f172a;line-height:1.7;">
          <strong>CAPEX:</strong> €${c.totalCapexEUR?.toLocaleString() ?? '—'}<br/>
          <strong>Annual savings:</strong> €${c.totalAnnualSavings?.toLocaleString() ?? '—'}<br/>
          <strong>Payback:</strong> ${c.totalPaybackYears ?? '—'} years<br/>
          <strong>10-yr ROI:</strong> ${c.roi10Years ?? '—'}%
        </div>
      </div>`
          : ''
      }
      <div style="padding:14px 24px;border-top:1px solid #f1f5f9;font-size:11px;color:#94a3b8;">
        Source: ${escapeHtml(payload.metadata?.utmSource ?? 'organic')} · Submitted ${escapeHtml(payload.metadata?.submittedAt ?? '')}
      </div>
    </div>
  </div>`

  await sendViaResend({
    from: process.env.LEAD_EMAIL_FROM ?? FROM_DEFAULT,
    to,
    subject: `[Brinowatt] New lead: ${f.contactName}${f.companyName ? ` — ${f.companyName}` : ''}`,
    html,
    reply_to: f.email,
  })
}

// ── Contact form notification ──────────────────────────────────────────────

interface ContactPayload {
  id: string
  name: string
  company?: string
  email: string
  phone?: string
  reason: string
  message: string
  receivedAt?: string
  pageUrl?: string
}

const REASON_LABEL: Record<string, string> = {
  proposal: 'Tailored proposal request',
  question: 'Calculator question',
  partnership: 'Partnership / referral',
  press: 'Press / media',
  other: 'Other',
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const to = process.env.LEAD_EMAIL_TO
  if (!to) {
    console.log('[Email] Skipped — LEAD_EMAIL_TO not configured')
    return
  }

  const reasonLabel = REASON_LABEL[payload.reason] ?? payload.reason

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0f172a;">
    <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <h1 style="margin:0;font-size:20px;">New contact message — Brinowatt</h1>
      <p style="margin:6px 0 0 0;font-size:13px;opacity:0.85;">${escapeHtml(reasonLabel)}</p>
    </div>
    <div style="background:#fff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('From', payload.name)}
        ${row('Company', payload.company)}
        ${row('Email', payload.email)}
        ${row('Phone', payload.phone)}
        ${row('Reason', reasonLabel)}
      </table>
      <div style="margin:16px 12px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
        <div style="font-size:12px;color:#475569;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-bottom:8px;">Message</div>
        <div style="font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
      </div>
      <div style="padding:14px 24px;border-top:1px solid #f1f5f9;font-size:11px;color:#94a3b8;">
        Received ${escapeHtml(payload.receivedAt ?? '')} · ${escapeHtml(payload.pageUrl ?? '')}
      </div>
    </div>
  </div>`

  await sendViaResend({
    from: process.env.LEAD_EMAIL_FROM ?? FROM_DEFAULT,
    to,
    subject: `[Brinowatt] Contact: ${payload.name} — ${reasonLabel}`,
    html,
    reply_to: payload.email,
  })
}
