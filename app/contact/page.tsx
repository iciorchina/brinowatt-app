import type { Metadata } from 'next'
import { ContactContent } from '@/components/contact/ContactContent'

export const metadata: Metadata = {
  title: 'Contact | Brinowatt',
  description:
    'Get in touch with Brinowatt. Ask about the calculator, request a tailored proposal, or speak with an energy specialist about your project.',
}

export default function ContactPage() {
  return <ContactContent />
}
