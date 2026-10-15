// Phone leads → Edge Function /capture-lead (Data Hub), nur mit lead_capture-Einwilligung.

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { canSubmitPhone, markPhoneSubmitted, getPhoneCooldownMinutes } from '../../lib/rateLimit'
import { track } from '../../lib/analytics'
import { getSessionId } from '../../lib/session'
import { isGranted, CONSENT_TEXT_ID } from '../../lib/consentLog'

// Klaro greift beim Import auf `self` zu → erst im Browser laden (Island wird auch serverseitig gerendert).
const openConsentManager = () => import('../../lib/klaro').then(m => m.openConsentManager())

type Source = 'hero' | 'about' | 'grow-together' | 'cta'

const PHONE_REGEX = /^(\+49|0)[1-9][0-9]{9,12}$/

const FN = import.meta.env.VITE_SUPABASE_FN_URL
const SOURCE_APP = import.meta.env.VITE_FLOWSTATE_APP ?? 'foundation'
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

interface PhoneInputProps {
  source: Source
  lang: 'de' | 'en'
  messages: Record<string, string>
  darkMode?: boolean
}

export default function PhoneInput({ source, lang, messages, darkMode = false }: PhoneInputProps) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'ratelimit' | 'consent'>('idle')
  const [loading, setLoading] = useState(false)

  const isValid = PHONE_REGEX.test(value.replace(/\s/g, ''))

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    if (!isValid) return

    if (!canSubmitPhone()) {
      setStatus('ratelimit')
      return
    }

    // DSGVO Art. 7 / Spec §6.3: ohne lead_capture-Einwilligung keine PII-Erfassung.
    if (!isGranted('lead_capture')) {
      openConsentManager()
      setStatus('consent')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${FN}/capture-lead`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-flowstate-app': SOURCE_APP,
          ...(ANON ? { apikey: ANON, authorization: `Bearer ${ANON}` } : {}),
        },
        body: JSON.stringify({
          phone: value.trim(),
          source_app: SOURCE_APP,
          source_detail: `${source}_form`,
          session_id: getSessionId(),
          consent_text_id: CONSENT_TEXT_ID,
          language: lang,
        }),
      })
      if (!res.ok) throw new Error(`capture-lead ${res.status}`)

      markPhoneSubmitted()
      track('form_submit', { element: `phone_form_${source}` })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = `w-full px-4 py-3 rounded-xl border font-sans text-base outline-hidden transition-colors ${
    darkMode
      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-orange'
      : 'bg-white border-gray-200 text-text placeholder-muted focus:border-ocean'
  }`

  if (status === 'success') {
    return (
      <div className="enter flex items-center gap-3 py-3" style={{ ['--y' as string]: '8px', ['--dur' as string]: '0.4s' }}>
        <CheckCircle className="w-6 h-6 text-green shrink-0" />
        <span className={`font-sans font-medium ${darkMode ? 'text-white' : 'text-text'}`}>
          {messages.success}
        </span>
      </div>
    )
  }

  if (status === 'consent') {
    return (
      <button
        type="button"
        onClick={() => { openConsentManager(); setStatus('idle') }}
        className={`text-sm py-3 text-left underline underline-offset-2 ${darkMode ? 'text-white/80 hover:text-white' : 'text-muted hover:text-text'}`}
      >
        {messages.consentHint}
      </button>
    )
  }

  if (status === 'ratelimit') {
    return (
      <p className={`text-sm py-3 ${darkMode ? 'text-white/70' : 'text-muted'}`}>
        {messages.alreadySubmitted.replace('{{minutes}}', String(getPhoneCooldownMinutes()))}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="tel"
        autoComplete="tel"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={messages.phonePlaceholder}
        aria-label={messages.phonePlaceholder}
        className={inputBase}
      />
      {isValid && (
        <button
          type="submit"
          disabled={loading}
          aria-label={messages.sendButton}
          className="enter shrink-0 bg-orange text-white p-3 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-60"
          style={{ ['--y' as string]: '0px', ['--scale' as string]: '0.8', ['--dur' as string]: '0.2s' }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      )}
      {status === 'error' && (
        <p className="text-sm text-fire mt-1">{messages.errorGeneric}</p>
      )}
    </form>
  )
}
