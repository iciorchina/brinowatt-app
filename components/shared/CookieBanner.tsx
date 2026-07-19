'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

const COOKIE_KEY = 'brinowatt_cookie_consent'

export function CookieBanner() {
  const { t } = useLang()
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
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-50 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-2xl shadow-2xl"
    >
      <div className="px-4 py-3.5">
        <div className="flex items-start gap-2.5 mb-3">
          <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-neutral-800 text-green-400">
            <Cookie className="w-3.5 h-3.5" />
          </span>
          <p className="text-xs text-neutral-300 leading-relaxed flex-1">
            {t.cookie.message}{' '}
            <Link
              href="/cookies"
              className="text-green-400 hover:text-green-300 underline underline-offset-2"
            >
              {t.cookie.learnMore}
            </Link>
          </p>
          <button
            onClick={dismiss}
            className="flex-shrink-0 -mt-0.5 -mr-1 p-1 text-neutral-500 hover:text-neutral-300 rounded transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/cookies"
            className="flex-1 px-3 py-1.5 text-xs text-center text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors"
          >
            {t.cookie.manage}
          </Link>
          <button
            onClick={accept}
            className="flex-1 px-3 py-1.5 text-xs font-semibold bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors active:scale-95"
          >
            {t.cookie.acceptAll}
          </button>
        </div>
      </div>
    </div>
  )
}
