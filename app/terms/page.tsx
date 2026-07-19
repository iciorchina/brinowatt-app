import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Brinowatt',
  description: 'Terms and conditions for using the Brinowatt energy investment calculator.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-16">
        <div className="mb-10 pb-8 border-b border-neutral-100">
          <Link href="/" className="text-sm text-brand-600 hover:underline mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Terms of Service</h1>
          <p className="text-neutral-500 text-sm">Last updated: <strong>19 July 2026</strong></p>
          <div className="mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            <strong>Note:</strong> This is a placeholder Terms of Service page. Please replace with a legally reviewed document before launching your application.
          </div>
        </div>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Brinowatt calculator and website ("<strong>Service</strong>"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">2. Nature of the Service</h2>
            <p>Brinowatt provides indicative financial modelling tools for energy investment planning. All results, estimates, and projections are:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li>For informational purposes only</li>
              <li>Based on publicly available data and standard industry assumptions</li>
              <li>Not a guarantee of financial performance or return</li>
              <li>Not a substitute for professional engineering or financial advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">3. No Investment Advice</h2>
            <p>Nothing on this Service constitutes investment, financial, legal, or engineering advice. You should obtain independent professional advice before making any investment decisions based on information from this Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">4. Accuracy of Information</h2>
            <p>Whilst we endeavour to keep the assumptions and data used in our calculator up to date, we make no representations or warranties as to the accuracy, completeness, or suitability of any information provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">5. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, Brinowatt shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service, including reliance on any estimates or calculations provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">6. Intellectual Property</h2>
            <p>All content, branding, calculation methodologies, and software on this Service are the intellectual property of Brinowatt and may not be reproduced without written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">7. Privacy</h2>
            <p>Your use of the Service is also governed by our <Link href="/privacy" className="text-brand-600 underline hover:text-brand-700">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">8. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of Romania (EU). Any disputes shall be subject to the exclusive jurisdiction of the courts of Romania (EU).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">9. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">10. Contact</h2>
            <p>For questions about these Terms, please contact us at <a href="mailto:legal@brinowatt.com" className="text-brand-600 hover:underline">legal@brinowatt.com</a></p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100 flex gap-4 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">Home</Link>
          <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
          <Link href="/cookies" className="text-brand-600 hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </div>
  )
}
