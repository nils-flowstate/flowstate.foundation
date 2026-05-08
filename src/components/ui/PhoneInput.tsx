// Phone leads — writes to localStorage for now.
// When Supabase is ready: uncomment the supabase block and remove the localStorage block.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
// import { supabase } from '../../lib/supabase'
import { canSubmitPhone, markPhoneSubmitted, getPhoneCooldownMinutes } from '../../lib/rateLimit'
import { track } from '../../lib/analytics'

type Source = 'hero' | 'about' | 'grow-together' | 'cta'

const PHONE_REGEX = /^(\+49|0)[1-9][0-9]{9,12}$/
const LEADS_KEY = 'ff_phone_leads'

interface PhoneInputProps {
  source: Source
  darkMode?: boolean
}

export function PhoneInput({ source, darkMode = false }: PhoneInputProps) {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'ratelimit'>('idle')
  const [loading, setLoading] = useState(false)

  const isValid = PHONE_REGEX.test(value.replace(/\s/g, ''))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    if (!canSubmitPhone()) {
      setStatus('ratelimit')
      return
    }

    setLoading(true)
    try {
      const lead = {
        phone: value.trim(),
        source,
        language: i18n.language,
        created_at: new Date().toISOString(),
      }

      // LOCAL STORAGE — swap to Supabase when backend is ready
      const existing = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]') as unknown[]
      existing.push(lead)
      localStorage.setItem(LEADS_KEY, JSON.stringify(existing))

      // SUPABASE (enable when ready):
      // const { error } = await supabase.from('phone_leads').insert(lead)
      // if (error) throw error

      markPhoneSubmitted()
      track('form_submit', { element: `phone_form_${source}` })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = `w-full px-4 py-3 rounded-xl border font-sans text-base outline-none transition-colors ${
    darkMode
      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-orange'
      : 'bg-white border-gray-200 text-text placeholder-muted focus:border-ocean'
  }`

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 py-3"
      >
        <CheckCircle className="w-6 h-6 text-green shrink-0" />
        <span className={`font-sans font-medium ${darkMode ? 'text-white' : 'text-text'}`}>
          {t('forms.success')}
        </span>
      </motion.div>
    )
  }

  if (status === 'ratelimit') {
    return (
      <p className={`text-sm py-3 ${darkMode ? 'text-white/70' : 'text-muted'}`}>
        {t('forms.alreadySubmitted', { minutes: getPhoneCooldownMinutes() })}
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
        placeholder={t('forms.phonePlaceholder')}
        className={inputBase}
      />
      <AnimatePresence>
        {isValid && (
          <motion.button
            type="submit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            disabled={loading}
            className="shrink-0 bg-orange text-white p-3 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
      {status === 'error' && (
        <p className="text-sm text-fire mt-1">{t('forms.errorGeneric')}</p>
      )}
    </form>
  )
}
