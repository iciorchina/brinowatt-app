import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { Mail, Phone, MapPin, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | Brinowatt',
  description:
    'Get in touch with Brinowatt. Ask about the calculator, request a tailored proposal, or speak with an energy specialist about your project.',
}

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@brinowatt.com',
    href: 'mailto:hello@brinowatt.com',
    note: 'For general enquiries',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+40 XXX XXX XXX',
    href: 'tel:+40000000000',
    note: 'Mon–Fri, 09:00–18:00 CET',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Bucharest, Romania',
    href: null,
    note: 'European HQ',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white pt-24 lg:pt-32 pb-12 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            Contact us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
            Let's talk about your energy project.
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Whether you have a question about a calculation, want to discuss a specific
            site, or are ready for a tailored proposal — we're here.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-card-lg border border-neutral-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">Send us a message</h2>
                <p className="text-sm text-neutral-500 mb-6">
                  Fields marked with <span className="text-red-500">*</span> are required.
                  We typically respond within 24 business hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Side panel */}
            <div className="space-y-6">
              {/* Channels */}
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-6">
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                  Other ways to reach us
                </h3>
                <ul className="space-y-4">
                  {channels.map((c) => {
                    const Icon = c.icon
                    return (
                      <li key={c.label} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                            {c.label}
                          </div>
                          {c.href ? (
                            <a
                              href={c.href}
                              className="text-sm font-semibold text-neutral-900 hover:text-brand-700 transition-colors break-words"
                            >
                              {c.value}
                            </a>
                          ) : (
                            <div className="text-sm font-semibold text-neutral-900">
                              {c.value}
                            </div>
                          )}
                          <div className="text-xs text-neutral-500 mt-0.5">{c.note}</div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Response time */}
              <div className="bg-gradient-to-br from-brand-50 to-blue-50 rounded-2xl border border-brand-100 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white text-brand-700 flex items-center justify-center shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 mb-1">
                      Quick response, real specialist
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Most enquiries are answered within 24 business hours. Project
                      proposals typically arrive within 2–3 working days.
                    </p>
                  </div>
                </div>
              </div>

              {/* GDPR */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 mb-1">
                      Your data, your control
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      We process the information you submit only to respond to your
                      enquiry. No marketing emails, no data sold. Read our{' '}
                      <a
                        href="/privacy"
                        className="text-brand-700 underline underline-offset-2 hover:text-brand-800"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
