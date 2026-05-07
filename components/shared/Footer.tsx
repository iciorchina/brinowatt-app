'use client'

import Link from 'next/link'
import { Leaf, Mail, Linkedin, ArrowRight } from 'lucide-react'

const solutionsLinks = [
  { label: 'Solar PV', href: '#solutions' },
  { label: 'Battery Storage (BESS)', href: '#solutions' },
  { label: 'Heat Pumps', href: '#solutions' },
  { label: 'Combined Systems', href: '#solutions' },
]

const companyLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Calculator', href: '/calculator' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'GDPR Information', href: '/privacy' },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-xl font-bold tracking-tight">
                Brino<span className="text-green-400">watt</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mb-6">
              Empowering European businesses with energy intelligence. Brinowatt helps you calculate
              your ROI, understand your options, and make confident energy investments.
            </p>

            {/* Social / contact icons */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@brinowatt.com"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5">
              {solutionsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-10 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Stay ahead of energy market trends
              </h3>
              <p className="text-sm text-neutral-400">
                Monthly insights on energy prices, policy changes, and ROI opportunities in Europe.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 w-full md:w-auto"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap active:scale-95"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>© 2024 Brinowatt. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-neutral-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
