import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Choose Your Solution',
    description: 'Select from solar PV, battery storage, heat pumps, or a combination. Tell us what you\'re considering and we\'ll tailor the analysis.',
    color: 'brand',
  },
  {
    number: '02',
    title: 'Enter Your Details',
    description: 'Provide your energy consumption, building data, and location using our guided form. Smart defaults mean it takes less than 5 minutes.',
    color: 'blue',
  },
  {
    number: '03',
    title: 'Get Your ROI Estimate',
    description: 'Our engine instantly calculates projected savings, payback period, and 10-year returns — with conservative, standard, and optimistic scenarios.',
    color: 'purple',
  },
  {
    number: '04',
    title: 'Receive a Tailored Offer',
    description: 'Submit your contact details and our certified energy specialists will review your data and send a customised proposal within 24 hours.',
    color: 'amber',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  brand:  { bg: 'bg-brand-100',  text: 'text-brand-700',  border: 'border-brand-200',  dot: 'bg-brand-500' },
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200',   dot: 'bg-blue-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200',  dot: 'bg-amber-500' },
}

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            From Data to Decision in 4 Steps
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            No engineering degree required. Our guided calculator turns your business data into actionable investment intelligence.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const c = colorMap[step.color]
              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-full ${c.bg} border-4 ${c.border} flex flex-col items-center justify-center mb-5 bg-white shadow-sm`}>
                    <span className={`text-xs font-bold ${c.text} uppercase tracking-widest`}>Step</span>
                    <span className={`text-2xl font-black ${c.text}`}>{String(idx + 1)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-sm hover:shadow-lg"
          >
            Start Your Calculation <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-neutral-400 text-sm mt-3">Free · No registration required · Results in 5 minutes</p>
        </div>
      </div>
    </section>
  )
}
