import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Brinowatt',
  description: 'How Brinowatt uses cookies and how you can manage your preferences.',
}

const cookieTypes = [
  {
    name: 'Strictly Necessary',
    required: true,
    description:
      'These cookies are essential for the website to function and cannot be disabled. They are set in response to actions you take, such as filling in forms and progressing through the calculator.',
    examples: ['Session state (calculator progress)', 'Security tokens', 'Load balancing'],
  },
  {
    name: 'Functional',
    required: false,
    description:
      'These cookies allow us to remember your preferences and improve your experience. For example, remembering your language or country settings.',
    examples: ['Saved calculator inputs (localStorage)', 'Cookie consent choice'],
  },
  {
    name: 'Analytics',
    required: false,
    description:
      'These cookies help us understand how visitors interact with our website, which pages are most popular, and where we can improve. All data is anonymised and aggregated.',
    examples: ['Google Analytics 4', 'Page view counts', 'User flow analysis'],
  },
  {
    name: 'Marketing',
    required: false,
    description:
      'These cookies are used to track the effectiveness of our advertising campaigns and to deliver relevant content to you on other platforms.',
    examples: ['Google Ads conversion tracking', 'LinkedIn Insight Tag', 'Retargeting pixels'],
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-16">
        <div className="mb-10 pb-8 border-b border-neutral-100">
          <Link href="/" className="text-sm text-brand-600 hover:underline mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Cookie Policy</h1>
          <p className="text-neutral-500 text-sm">Last updated: <strong>1 April 2024</strong></p>
        </div>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They allow websites to remember your actions and preferences over time, so you don't have to re-enter them whenever you visit the site or navigate between pages.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">How We Use Cookies</h2>
            <p className="mb-5">We use cookies and similar technologies (such as localStorage and sessionStorage) to operate our calculator, improve your experience, and understand how our Service is used. Below is a breakdown of the types of cookies we use:</p>

            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div key={type.name} className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-neutral-50">
                    <h3 className="font-semibold text-neutral-900">{type.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      type.required
                        ? 'bg-neutral-200 text-neutral-600'
                        : 'bg-brand-100 text-brand-700'
                    }`}>
                      {type.required ? 'Always Active' : 'Optional'}
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-neutral-600 mb-3">{type.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((ex) => (
                        <span key={ex} className="px-2.5 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-lg">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">Managing Your Preferences</h2>
            <p className="mb-3">You can manage or withdraw your consent to non-essential cookies at any time using the following options:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Cookie banner:</strong> Use the "Manage Preferences" option in the cookie banner at the bottom of our website.</li>
              <li><strong>Browser settings:</strong> Most browsers allow you to refuse cookies or delete existing cookies. Refer to your browser's help documentation for instructions.</li>
              <li><strong>Third-party opt-outs:</strong> For Google Analytics, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">tools.google.com/dlpage/gaoptout</a>.</li>
            </ul>
            <p className="mt-3 text-sm text-neutral-500">Note: Disabling strictly necessary cookies may affect the functionality of the calculator.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">Local Storage</h2>
            <p>In addition to cookies, we use your browser's <strong>localStorage</strong> to save your calculator progress between sessions (e.g., so you don't lose your inputs if you accidentally close the tab). This data is stored only on your device and is not transmitted to our servers unless you submit the lead form. You can clear this at any time by clearing your browser's site data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">Updates to This Policy</h2>
            <p>We may update this Cookie Policy from time to time. We will notify you of significant changes via the cookie banner or by posting an updated policy on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at <a href="mailto:privacy@brinowatt.com" className="text-brand-600 hover:underline">privacy@brinowatt.com</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100 flex gap-4 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">Home</Link>
          <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
