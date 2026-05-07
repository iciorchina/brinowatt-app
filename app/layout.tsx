import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { StickyConsultCTA } from '@/components/shared/StickyConsultCTA'
import { CookieBanner } from '@/components/shared/CookieBanner'

export const metadata: Metadata = {
  title: 'Brinowatt — Calculate Your Energy Investment Returns',
  description:
    'Free ROI calculator for solar PV, battery storage, and heat pump investments. Designed for European businesses. Get a tailored offer in minutes.',
  keywords:
    'solar PV calculator, battery storage ROI, heat pump savings, energy investment, B2B energy, Europe energy solutions',
  openGraph: {
    title: 'Brinowatt — Energy Investment Calculator for Businesses',
    description:
      'Calculate your savings from solar, batteries & heat pumps. Get a tailored offer.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyConsultCTA />
        <CookieBanner />
      </body>
    </html>
  )
}
