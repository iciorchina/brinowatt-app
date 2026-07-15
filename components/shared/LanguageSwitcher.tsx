'use client'

import { useEffect, useRef, useState } from 'react'
import { Globe, Check, ExternalLink, ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { LANGS, type Lang } from '@/lib/i18n/dictionaries'

/**
 * Other European languages served via Google's translation proxy
 * (translate.goog). Hostname rule: "-" -> "--", "." -> "-".
 */
const PROXY_HOST = 'brinowatt--app-vercel-app.translate.goog'

const EU_LANGS: { code: string; label: string }[] = [
  { code: 'bg', label: 'Български' },
  { code: 'cs', label: 'Čeština' },
  { code: 'da', label: 'Dansk' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'es', label: 'Español' },
  { code: 'et', label: 'Eesti' },
  { code: 'fi', label: 'Suomi' },
  { code: 'fr', label: 'Français' },
  { code: 'ga', label: 'Gaeilge' },
  { code: 'hr', label: 'Hrvatski' },
  { code: 'hu', label: 'Magyar' },
  { code: 'lt', label: 'Lietuvių' },
  { code: 'lv', label: 'Latviešu' },
  { code: 'mt', label: 'Malti' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'no', label: 'Norsk' },
  { code: 'pl', label: 'Polski' },
  { code: 'pt', label: 'Português' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'sl', label: 'Slovenščina' },
  { code: 'sv', label: 'Svenska' },
  { code: 'uk', label: 'Українська' },
]

function proxyUrl(code: string): string {
  return `https://${PROXY_HOST}/?_x_tr_sl=en&_x_tr_tl=${code}&_x_tr_hl=en`
}

export function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setShowAll(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0]

  const pick = (code: Lang) => {
    setLang(code)
    setOpen(false)
    setShowAll(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={`inline-flex items-center gap-1.5 rounded-xl text-sm font-medium transition-colors ${
          variant === 'mobile'
            ? 'px-4 py-3 w-full justify-between text-neutral-700 hover:bg-neutral-50'
            : 'px-3 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe className="w-4 h-4" />
          <span>{current.flag} {current.code.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute z-50 mt-2 w-64 bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden ${
            variant === 'mobile' ? 'left-0' : 'right-0'
          }`}
        >
          {/* First-class languages */}
          <div className="p-1.5">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => pick(l.code)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  l.code === lang
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>{l.flag} {l.label}</span>
                {l.code === lang && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* All European languages via Google Translate proxy */}
          <div className="border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:bg-neutral-50 transition-colors"
            >
              <span>🌍 All European languages</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
            {showAll && (
              <div className="max-h-56 overflow-y-auto p-1.5 pt-0">
                <p className="px-3 py-1.5 text-[11px] text-neutral-400 leading-snug">
                  Machine-translated by Google — opens in a new tab.
                </p>
                {EU_LANGS.map((l) => (
                  <a
                    key={l.code}
                    href={proxyUrl(l.code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                  >
                    <span>{l.label}</span>
                    <ExternalLink className="w-3 h-3 text-neutral-300" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
