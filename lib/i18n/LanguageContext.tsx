'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { dictionaries, type Dictionary, type Lang } from './dictionaries'

const STORAGE_KEY = 'brinowatt_lang'
const VALID: Lang[] = ['en', 'ro', 'it', 'de']

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: dictionaries.en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  // On mount: restore saved choice, else auto-detect browser language
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (saved && VALID.includes(saved)) {
        setLangState(saved)
        document.documentElement.lang = saved
        return
      }
      const browser = navigator.language.slice(0, 2).toLowerCase() as Lang
      if (VALID.includes(browser) && browser !== 'en') {
        setLangState(browser)
        document.documentElement.lang = browser
      }
    } catch {
      // localStorage unavailable — stay on default
    }
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    document.documentElement.lang = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext)
}
