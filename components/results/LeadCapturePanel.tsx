'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Loader2, FileText, Phone, Shield, Clock } from 'lucide-react'
import type { FormData, CalculationResults, LeadSubmissionPayload } from '@/types'
import { submitLead } from '@/lib/services/leadService'

interface Props {
  formData: Partial<FormData>
  results: CalculationResults
}

const OFFER_INCLUDES = [
  'Detailed system design and equipment specifications',
  'Site-specific yield and savings calculations',
  'Available grants and incentive programmes',
  'Financing options and payment structures',
  'Implementation timeline and next steps',
]

export function LeadCapturePanel({ formData, results }: Props) {
  const [name, setName] = useState(formData.contactName ?? '')
  const [email, setEmail] = useState(formData.email ?? '')
  const [phone, setPhone] = useState(formData.phone ?? '')
  const [gdprConsent, setGdprConsent] = useState(formData.gdprConsent ?? false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gdprConsent) {
      setError('Please accept the privacy policy to continue.')
      return
    }
    setLoading(true)
    setError(null)

    const payload: LeadSubmissionPayload = {
      formData: {
        ...formData,
        contactName: name,
        email,
        phone,
        gdprConsent,
        contactConsent: true,
      } as FormData,
      results,
      metadata: {
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        utmSource: formData.utmSource,
        utmMedium: formData.utmMedium,
        utmCampaign: formData.utmCampaign,
      },
    }

    const res = await submitLead(payload)
    setLoading(false)

    if (res.success) {
      setSubmitted(true)
    } else {
      setError(res.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left — value proposition */}
        <div className="p-7 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-600/20 border border-brand-500/30 rounded-full text-brand-400 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            Free tailored offer
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
            Want a More Accurate,<br />Site-Specific Analysis?
          </h2>

          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            Our certified energy specialists will review your inputs, refine the calculations for your exact site, and prepare a detailed proposal — including equipment specs, permits, and financing options.
          </p>

          <ul className="space-y-3 mb-8">
            {OFFER_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-300">
                <CheckCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Response within 24h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>No obligation</span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white p-7 md:p-10 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Request Sent!</h3>
              <p className="text-neutral-500 text-sm mb-5">
                Thank you! Our team will review your analysis and be in touch within 24 business hours.
              </p>
              <Link
                href="/thank-you"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                View Next Steps <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <h3 className="text-lg font-bold text-neutral-900">Request Your Tailored Offer</h3>
                <p className="text-sm text-neutral-500 mt-1">Free · No obligation · Response within 24h</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-neutral-900 placeholder-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-neutral-900 placeholder-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 30 1234 5678"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-neutral-900 placeholder-neutral-400"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="gdpr-panel"
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-brand-600 cursor-pointer"
                  />
                  <label htmlFor="gdpr-panel" className="text-xs text-neutral-500 leading-relaxed cursor-pointer">
                    I accept the{' '}
                    <Link href="/privacy" target="_blank" className="text-brand-600 underline hover:text-brand-700">
                      Privacy Policy
                    </Link>{' '}
                    and consent to being contacted by an energy specialist about this analysis. *
                  </label>
                </div>

                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" /> Request My Tailored Offer
                    </>
                  )}
                </button>

                <p className="text-xs text-neutral-400 text-center">
                  Your data is processed in accordance with GDPR. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
