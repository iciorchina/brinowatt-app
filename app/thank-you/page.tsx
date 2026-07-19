import type { Metadata } from 'next'
import { ThankYouContent } from '@/components/thankyou/ThankYouContent'

export const metadata: Metadata = {
  title: 'Thank You | Brinowatt',
  description: 'Your energy analysis request has been received. Our specialists will be in touch within 24 hours.',
}

export default function ThankYouPage() {
  return <ThankYouContent />
}
