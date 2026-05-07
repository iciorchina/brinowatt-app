import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Brinowatt',
  description: 'How Brinowatt collects, uses, and protects your personal data in accordance with GDPR.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-16">
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-neutral-100">
          <Link href="/" className="text-sm text-brand-600 hover:underline mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Privacy Policy</h1>
          <p className="text-neutral-500 text-sm">
            Last updated: <strong>1 April 2024</strong> · Effective date: <strong>1 April 2024</strong>
          </p>
          <div className="mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            <strong>Note:</strong> This is a template privacy policy for development purposes. Before launching your application, please replace this with a legally reviewed privacy policy prepared by a qualified legal professional in your jurisdiction.
          </div>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed">

          {/* 1. Controller */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">1. Data Controller</h2>
            <p>
              Brinowatt ("<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>") is the data controller responsible for your personal data collected through this website and the energy ROI calculator at <strong>[your-domain.com]</strong>.
            </p>
            <p className="mt-3">
              Contact us regarding data privacy matters at:<br />
              <strong>Email:</strong> privacy@brinowatt.com<br />
              <strong>Address:</strong> [Company Address], [City], [Country]<br />
              <strong>Data Protection Officer:</strong> [DPO Name or "Not required" if applicable]
            </p>
          </section>

          {/* 2. What data */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">2. Personal Data We Collect</h2>
            <p>We collect the following categories of personal data when you use our calculator and submit your contact details:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li><strong>Identity data:</strong> Full name</li>
              <li><strong>Contact data:</strong> Business email address, telephone number</li>
              <li><strong>Business data:</strong> Company name, business sector, country, city</li>
              <li><strong>Energy consumption data:</strong> Electricity consumption, tariff, building size, heating type (as provided by you in the calculator)</li>
              <li><strong>Technical data:</strong> IP address, browser type, pages visited, referring URL (collected automatically)</li>
              <li><strong>Marketing data:</strong> UTM source, medium, campaign (if arriving via a marketing link)</li>
              <li><strong>Communication preferences:</strong> Consent records and timestamp</li>
            </ul>
          </section>

          {/* 3. How we use */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">3. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li>To run the energy ROI calculation and provide you with personalised results</li>
              <li>To prepare and deliver a tailored energy investment proposal</li>
              <li>To contact you by email or telephone in response to your request</li>
              <li>To provide follow-up support and answer your questions</li>
              <li>To improve our calculator methodology and user experience (aggregated, anonymised)</li>
              <li>To comply with legal and regulatory obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal data to third parties. We do not use your data for automated individual decision-making that produces legal or similarly significant effects without human involvement.
            </p>
          </section>

          {/* 4. Legal basis */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <p>We process your personal data on the following legal bases under the General Data Protection Regulation (GDPR):</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li><strong>Consent (Art. 6(1)(a)):</strong> When you tick the consent checkbox, you consent to us contacting you and processing your data to prepare a tailored energy offer. You may withdraw consent at any time.</li>
              <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> For analytics, improving our service, and fraud prevention — where these interests are not overridden by your rights.</li>
              <li><strong>Legal obligation (Art. 6(1)(c)):</strong> Where we are required to retain certain records for tax, accounting, or regulatory compliance purposes.</li>
            </ul>
          </section>

          {/* 5. Retention */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">5. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by law:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li><strong>Active leads:</strong> For up to 24 months from your last interaction, unless you request deletion earlier</li>
              <li><strong>Customers:</strong> For the duration of the business relationship and up to 7 years thereafter for legal/tax purposes</li>
              <li><strong>Calculator data only (no contact submitted):</strong> Session data is stored locally in your browser and is not transmitted to our servers</li>
            </ul>
          </section>

          {/* 6. Your rights */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">6. Your Rights Under GDPR</h2>
            <p>As a data subject in the EU/EEA, you have the following rights:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li><strong>Right to access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to erasure ("right to be forgotten"):</strong> Request deletion of your data, subject to legal retention requirements</li>
              <li><strong>Right to restriction:</strong> Request that we restrict processing of your data in certain circumstances</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time without affecting the lawfulness of processing before withdrawal</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at <strong>privacy@brinowatt.com</strong>. We will respond within 30 days. You also have the right to lodge a complaint with your national data protection supervisory authority.
            </p>
          </section>

          {/* 7. Sharing */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">7. Data Sharing and Third Parties</h2>
            <p>We may share your data with the following categories of third parties, all subject to appropriate data processing agreements:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li><strong>CRM providers</strong> (e.g. HubSpot) — for lead management and follow-up</li>
              <li><strong>Email service providers</strong> — to send confirmation and proposal emails</li>
              <li><strong>Hosting and infrastructure providers</strong> — for secure data storage and processing</li>
              <li><strong>Analytics providers</strong> — for aggregated, anonymised usage analytics</li>
            </ul>
            <p className="mt-3">All sub-processors are located in the EU/EEA or subject to appropriate transfer safeguards (Standard Contractual Clauses or adequacy decisions).</p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">8. Cookies and Tracking</h2>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5">
              <li><strong>Strictly necessary:</strong> Session cookies required for the calculator to function (no consent required)</li>
              <li><strong>Analytics:</strong> [e.g. Google Analytics] to understand usage patterns — requires your consent</li>
              <li><strong>Marketing:</strong> [e.g. Google Ads, LinkedIn Insight Tag] to measure campaign performance — requires your consent</li>
            </ul>
            <p className="mt-3">You can manage your cookie preferences via the cookie banner on our website, or through your browser settings.</p>
          </section>

          {/* 9. Security */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">9. Data Security</h2>
            <p>
              We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, loss, destruction, or alteration. These include TLS encryption in transit, access controls, and regular security reviews. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">10. Contact and Complaints</h2>
            <p>
              For any privacy-related questions, requests, or complaints, please contact us at:<br />
              <strong>Email:</strong> privacy@brinowatt.com<br />
              <strong>Post:</strong> [Company Name], [Address], [City], [Country]
            </p>
            <p className="mt-3">
              If you are not satisfied with our response, you have the right to complain to your local data protection authority. A list of EU supervisory authorities is available at:{' '}
              <a
                href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                edpb.europa.eu
              </a>
            </p>
          </section>

          {/* 11. Changes */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated effective date. We encourage you to review this policy periodically.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <p className="text-sm text-neutral-400">© 2024 Brinowatt. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="text-brand-600 hover:underline">Home</Link>
            <Link href="/calculator" className="text-brand-600 hover:underline">Calculator</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
