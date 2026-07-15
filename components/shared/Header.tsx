'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Leaf, Menu, X, Calculator } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'

export function Header() {
  const { t } = useLang()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t.nav.solutions, href: '/#solutions' },
    { label: t.nav.howItWorks, href: '/#how-it-works' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change / resize
  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Brinowatt home"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <Leaf className="w-5 h-5 text-white" strokeWidth={2.2} />
            </span>
            <span
              className={`text-xl font-bold tracking-tight transition-colors duration-200 ${
                isScrolled ? 'text-neutral-900' : 'text-neutral-900'
              }`}
            >
              Brino<span className="text-green-600">watt</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isScrolled
                    ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              {t.nav.startCalculator}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-b border-neutral-100 shadow-lg`}
        aria-hidden={!mobileOpen}
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-100 mt-1">
            <LanguageSwitcher variant="mobile" />
            <Link
              href="/calculator"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 mt-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              {t.nav.startCalculator}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
