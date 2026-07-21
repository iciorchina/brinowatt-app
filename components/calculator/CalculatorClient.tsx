'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { SolutionType, FormData } from '@/types'
import { calculateResults } from '@/lib/calculations'
import { saveFormData, loadFormData } from '@/lib/utils/localStorage'
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout'
import { useCalcT } from '@/lib/i18n/calc'
import { SolutionStep } from '@/components/calculator/steps/SolutionStep'
import { LocationStep } from '@/components/calculator/steps/LocationStep'
import { EnergyStep } from '@/components/calculator/steps/EnergyStep'
import { ConfigStep } from '@/components/calculator/steps/ConfigStep'
import { BudgetStep } from '@/components/calculator/steps/BudgetStep'
import { ContactStep } from '@/components/calculator/steps/ContactStep'

export type CalculatorStep = 'solution' | 'location' | 'energy' | 'config' | 'budget' | 'contact'

const STEPS: CalculatorStep[] = ['solution', 'location', 'energy', 'config', 'budget', 'contact']

const defaultFormData: Partial<FormData> = {
  selectedSolution: 'full_hybrid',
  country: 'DE',
  electricityTariff: 0.28,
  operatingHoursPerDay: 10,
  roofType: 'flat',
  availableRoofArea: 200,
  selfConsumptionPriority: true,
  gridExportAllowed: true,
  peakShavingInterest: false,
  backupPowerInterest: false,
  preferredStorageHours: 4,
  currentHeatingType: 'gas',
  financingPreference: 'undecided',
  budgetRange: '',
  buildingSize: 500,
  annualElectricityConsumption: 50000,
  monthlyElectricityBill: 1000,
  annualHeatingCost: 0,
  annualHeatingDemand: 0,
}

export function CalculatorClient() {
  const ct = useCalcT()
  const searchParams = useSearchParams()
  const router = useRouter()
  const stepTitles = ct.wizard.stepTitles as Record<CalculatorStep, string>
  const [currentStep, setCurrentStep] = useState<CalculatorStep>('solution')
  const [formData, setFormData] = useState<Partial<FormData>>(defaultFormData)
  const [isCalculating, setIsCalculating] = useState(false)

  // Prefill solution from URL param and restore saved form data on mount
  useEffect(() => {
    const saved = loadFormData()
    if (saved) {
      setFormData(prev => ({ ...prev, ...(saved as Partial<FormData>) }))
    }
    const solution = searchParams.get('solution') as SolutionType | null
    if (solution) {
      setFormData(prev => ({ ...prev, selectedSolution: solution }))
    }
  }, [searchParams])

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => {
      const next = { ...prev, ...updates }
      saveFormData(next as Record<string, unknown>)
      return next
    })
  }, [])

  const currentStepIndex = STEPS.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  const goNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCalculate = async (contactData: Partial<FormData>) => {
    setIsCalculating(true)
    const finalData = { ...formData, ...contactData }
    updateFormData(contactData)

    try {
      const results = calculateResults(finalData, 'standard')
      // Store results in sessionStorage for the results page to read
      sessionStorage.setItem(
        'energy_roi_results',
        JSON.stringify({ results, formData: finalData })
      )
      router.push('/calculator/results')
    } catch (err) {
      console.error('Calculation error:', err)
      setIsCalculating(false)
    }
  }

  const stepProps = {
    formData,
    updateFormData,
    onNext: goNext,
    onBack: goBack,
  }

  return (
    <CalculatorLayout
      currentStep={currentStep}
      steps={STEPS}
      stepTitles={stepTitles}
      progress={progress}
    >
      {currentStep === 'solution' && <SolutionStep {...stepProps} />}
      {currentStep === 'location' && <LocationStep {...stepProps} />}
      {currentStep === 'energy' && <EnergyStep {...stepProps} />}
      {currentStep === 'config' && <ConfigStep {...stepProps} />}
      {currentStep === 'budget' && <BudgetStep {...stepProps} />}
      {currentStep === 'contact' && (
        <ContactStep
          {...stepProps}
          onCalculate={handleCalculate}
          isCalculating={isCalculating}
        />
      )}
    </CalculatorLayout>
  )
}
