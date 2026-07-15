'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import type { Dictionary } from '@/lib/i18n/dictionaries'

function makeSchema(c: Dictionary['contact']) {
  return z.object({
    name: z.string().min(2, c.vName),
    company: z.string().optional(),
    email: z.string().email(c.vEmail),
    phone: z.string().optional(),
    reason: z.string().min(1, c.vReason),
    message: z.string().min(10, c.vMessage),
    consent: z.boolean().refine((v) => v === true, { message: c.vConsent }),
  })
}

type FormValues = z.infer<ReturnType<typeof makeSchema>>

export function ContactForm() {
  const { t, lang } = useLang()
  const c = t.contact
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const schema = useMemo(() => makeSchema(c), [c])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', company: '', email: '', phone: '', reason: '', message: '', consent: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    setStatus('sending')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          language: lang,
          submittedAt: new Date().toISOString(),
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      const data = await res.json()
      if (!res.ok || !data?.success) {
        throw new Error(data?.error ?? `Request failed (HTTP ${res.status})`)
      }
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-700 mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{c.successTitle}</h3>
        <p className="text-neutral-600 max-w-md mx-auto mb-6">
          {c.successBody}{' '}
          <a href="mailto:hello@brinowatt.com" className="text-brand-700 underline underline-offset-2">
            hello@brinowatt.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm text-brand-700 hover:text-brand-800 font-semibold"
        >
          {c.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {c.fullName} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Jane Cooper"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-neutral-900 placeholder-neutral-400 transition-colors"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{c.company}</label>
          <input
            {...register('company')}
            placeholder="Acme GmbH"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {c.email} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-neutral-900 placeholder-neutral-400 transition-colors"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{c.phone}</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+40 ..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {c.reasonLabel} <span className="text-red-500">*</span>
        </label>
        <select
          {...register('reason')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-neutral-900 bg-white transition-colors"
        >
          <option value="">{c.reasonPlaceholder}</option>
          {c.reasons.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {c.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder={c.messagePlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-neutral-900 placeholder-neutral-400 transition-colors resize-y"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-brand-600 rounded flex-shrink-0"
          />
          <span className="text-sm text-neutral-600 leading-relaxed">
            {c.consent}{' '}
            <a href="/privacy" target="_blank" className="text-brand-700 underline underline-offset-2">
              {c.privacyPolicy}
            </a>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-xs mt-1 ml-7">{errors.consent.message}</p>}
      </div>

      {status === 'error' && errorMsg && (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-800 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>{c.errorTitle}</strong>
            <div className="text-xs mt-0.5">{errorMsg}</div>
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {c.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {c.send}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
