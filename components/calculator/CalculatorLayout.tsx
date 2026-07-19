'use client'

import type { CalculatorStep } from '@/components/calculator/CalculatorClient'
import { CheckCircle2 } from 'lucide-react'
import { useCalcT, tpl } from '@/lib/i18n/calc'

interface Props {
  currentStep: CalculatorStep
  steps: CalculatorStep[]
  stepTitles: Record<CalculatorStep, string>
  progress: number
  children: React.ReactNode
}

export function CalculatorLayout({ currentStep, steps, stepTitles, progress, children }: Props) {
  const ct = useCalcT()
  const currentIndex = steps.indexOf(currentStep)

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">{ct.wizard.title}</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {tpl(ct.wizard.stepOf, { current: currentIndex + 1, total: steps.length, title: stepTitles[currentStep] })}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {steps.map((step, idx) => {
              const isComplete = idx < currentIndex
              const isCurrent = idx === currentIndex
              return (
                <div key={step} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${isComplete ? 'bg-brand-600 text-white' : ''}
                      ${isCurrent ? 'bg-brand-600 text-white ring-4 ring-brand-100' : ''}
                      ${!isComplete && !isCurrent ? 'bg-neutral-200 text-neutral-500' : ''}
                    `}
                  >
                    {isComplete ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${isCurrent ? 'text-brand-700 font-medium' : 'text-neutral-400'}`}>
                    {stepTitles[step]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step content card */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card-lg p-6 md:p-8">
          {children}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-neutral-400 text-xs mt-6">
          {ct.wizard.disclaimer}
        </p>
      </div>
    </div>
  )
}
