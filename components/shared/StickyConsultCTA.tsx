'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PhoneCall } from 'lucide-react'

export function StickyConsultCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/calculator"
        tabIndex={visible ? 0 : -1}
        className="group flex items-center gap-2.5 px-5 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 ring-2 ring-white/20"
        aria-label="Get a free quote"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
          <PhoneCall className="w-4 h-4" />
        </span>
        <span>Get Free Quote</span>
      </Link>
    </div>
  )
}
