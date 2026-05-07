import Link from 'next/link'
import { CheckCircle, Clock, Mail, Phone, ArrowRight, BarChart2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Brinowatt',
  description: 'Your energy analysis request has been received. Our specialists will be in touch within 24 hours.',
}

const nextSteps = [
  {
    icon: Mail,
    color: 'bg-blue-100 text-blue-700',
    title: 'Confirmation email',
    description: "You'll receive a confirmation email with a summary of your analysis within the next few minutes.",
    time: 'Within 5 minutes',
  },
  {
    icon: Clock,
    color: 'bg-amber-100 text-amber-700',
    title: 'Specialist review',
    description: 'One of our certified energy specialists will review your data and refine the calculations for your specific site.',
    time: 'Within 4 business hours',
  },
  {
    icon: BarChart2,
    color: 'bg-brand-100 text-brand-700',
    title: 'Tailored proposal',
    description: "You'll receive a detailed proposal including system design, site-specific savings, available incentives, and financing options.",
    time: 'Within 24 business hours',
  },
  {
    icon: Phone,
    color: 'bg-purple-100 text-purple-700',
    title: 'Consultation call',
    description: "If you'd like, we'll schedule a brief call to walk through the proposal and answer any questions.",
    time: 'At your convenience',
  },
]

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-16 lg:pt-20">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          {/* Success icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-brand-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Your Request Has Been Received
            </h1>
            <p className="text-lg text-neutral-500 max-w-xl mx-auto">
              Thank you for submitting your energy analysis. Our specialists have been notified and will prepare a tailored proposal for your business.
            </p>
          </div>

          {/* What happens next */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-7 md:p-8 mb-7">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">What Happens Next</h2>
            <div className="space-y-5">
              {nextSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-semibold text-neutral-900">{step.title}</span>
                        <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold rounded-xl border border-neutral-200 transition-colors"
            >
              Run Another Calculation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-center text-neutral-400 text-sm mt-8">
            Questions? Email us at{' '}
            <a href="mailto:hello@brinowatt.com" className="text-brand-600 hover:underline">
              hello@brinowatt.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
