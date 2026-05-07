import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Energy ROI Calculator | Brinowatt',
  description:
    'Calculate your solar PV, battery storage, and heat pump investment returns. Free, instant, and tailored to your European business.',
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
