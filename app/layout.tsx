import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { StickyConsultCTA } from '@/components/shared/StickyConsultCTA'
import { CookieBanner } from '@/components/shared/CookieBanner'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://brinowatt-app.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Brinowatt — Calculate Your Energy Investment Returns',
  description:
    'Free ROI calculator for solar PV, battery storage, and heat pump investments. Designed for European businesses. Get a tailored offer in minutes.',
  keywords:
    'solar PV calculator, battery storage ROI, heat pump savings, energy investment, B2B energy, Europe energy solutions',
  openGraph: {
    title: 'Brinowatt — Energy Investment Calculator for Businesses',
    description:
      'Calculate your savings from solar, batteries & heat pumps. Get a tailored offer.',
    url: SITE_URL,
    siteName: 'Brinowatt',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brinowatt — Energy Investment Calculator',
    description:
      'Calculate your savings from solar, batteries & heat pumps in minutes.',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brinowatt',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    'Independent energy intelligence platform helping European businesses calculate ROI on solar, battery storage, and heat pump investments.',
  email: 'hello@brinowatt.com',
  areaServed: 'EU',
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brinowatt',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/calculator?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyConsultCTA />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
