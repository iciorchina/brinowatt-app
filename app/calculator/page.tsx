import { Suspense } from 'react'
import { CalculatorClient } from '@/components/calculator/CalculatorClient'

// Wrap the client component in Suspense so useSearchParams() doesn't break SSG
export default function CalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">Loading calculator…</p>
          </div>
        </div>
      }
    >
      <CalculatorClient />
    </Suspense>
  )
}
