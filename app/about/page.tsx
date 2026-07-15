import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About | Brinowatt',
  description:
    'Brinowatt is an energy intelligence platform helping European businesses make confident, data-driven decisions about solar, battery storage, and heat pump investments.',
}

export default function AboutPage() {
  return <AboutContent />
}
