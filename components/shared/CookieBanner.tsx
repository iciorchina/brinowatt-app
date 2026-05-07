'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

const COOKIE_KEY = 'brinowatt_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_KEY)
      if (!consent) setVisible(true)
    } catch {
      // localStorage unavailable (e.g. SSR guard — safe to ignore)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_KEY, 'accepted')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  const dismiss = () => setVisible(false)

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 inset-x-0 z-50 bg-neutral-900/97 backdrop-blur-sm border-t border-neutral-700 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Icon + text */}
          <div className="flex items-start gap-3 flex-1">
            <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 text-green-400">
              <Cookie className="w-4 h-4" />
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed">
              We use cookies to improve your experience and analyse site performance. By continuing
              to use this site, you agree to our use of cookies.{' '}
              <Link
                href="/cookies"
                className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors"
              >
                Learn more
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-11 sm:ml-0">
            <button
              onClick={dismiss}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-xl transition-colors"
            >
              Manage Preferences
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 text-sm font-semibold bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors active:scale-95"
            >
              Accept All
            </button>
            <button
              onClick={dismiss}
              className="p-2 text-neutral-500 hover:text-neutral-300 transition-colors rounded-lg hover:bg-neutral-800"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
