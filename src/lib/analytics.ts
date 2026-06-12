// Analytics — primärer Schreibpfad ist die Edge Function /track-event (Spec §6.4).
// localStorage dient als Offline-Queue (Fallback). Getrackt wird nur nach
// erteilter analytics-Einwilligung (TTDSG §25, Spec §8). Die track()-Signatur
// bleibt unverändert, damit bestehende Call-Sites nicht angefasst werden müssen.

import { getSessionId, detectDeviceType } from './session'
import { isGranted } from './consentLog'

const SUPABASE_FN = import.meta.env.VITE_SUPABASE_FN_URL
const SOURCE_APP = import.meta.env.VITE_FLOWSTATE_APP ?? 'foundation'
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const QUEUE_KEY = 'ff_analytics_queue'

// Erlaubte event_type-Werte laut events-CHECK-Constraint (Migration §5).
const ALLOWED_EVENT_TYPES = new Set([
  'pageview', 'scroll_depth', 'cta_click', 'form_submit', 'form_abandon',
  'error_404', 'lead_captured', 'opt_in', 'sequence_advance', 'conversion',
  'churn_trigger', 'custom',
])

// Legacy-Strings der bestehenden Call-Sites → Schema-Werte (Spec §6.1).
const EVENT_TYPE_ALIASES: Record<string, string> = {
  '404': 'error_404',
}

interface TrackPayload {
  session_id: string
  event_type: string
  properties: Record<string, unknown>
  referrer: string | null
  language: string | null
  device_type: string
  occurred_at: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

function normalizeEventType(raw: string, properties: Record<string, unknown>) {
  const mapped = EVENT_TYPE_ALIASES[raw] ?? raw
  if (ALLOWED_EVENT_TYPES.has(mapped)) return { event_type: mapped, properties }
  // Unbekannter Typ → 'custom' mit Original in properties.subtype (Spec §4.4).
  return { event_type: 'custom', properties: { subtype: raw, ...properties } }
}

async function send(payload: TrackPayload): Promise<boolean> {
  if (!SUPABASE_FN) return false
  try {
    const res = await fetch(`${SUPABASE_FN}/track-event`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-flowstate-app': SOURCE_APP,
        ...(ANON ? { apikey: ANON, authorization: `Bearer ${ANON}` } : {}),
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    return res.ok
  } catch {
    return false
  }
}

function queueOffline(payload: TrackPayload) {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]') as TrackPayload[]
    q.push(payload)
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-500)))
  } catch {
    // ignore
  }
}

/** Versucht, zwischengespeicherte Events nachzusenden. */
export async function flushOfflineQueue() {
  if (!SUPABASE_FN || !isGranted('analytics')) return
  let q: TrackPayload[]
  try {
    q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]') as TrackPayload[]
  } catch {
    return
  }
  if (!q.length) return
  const remaining: TrackPayload[] = []
  for (const p of q) {
    if (!(await send(p))) remaining.push(p)
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining))
}

export async function track(event_type: string, data: Record<string, unknown> = {}) {
  // TTDSG: ohne analytics-Consent kein Tracking (kein Netz, kein Speicher).
  if (!isGranted('analytics')) return

  try {
    const params = new URLSearchParams(window.location.search)
    const baseProps = { page: window.location.pathname, ...data }
    const { event_type: type, properties } = normalizeEventType(event_type, baseProps)

    const payload: TrackPayload = {
      session_id: getSessionId(),
      event_type: type,
      properties,
      referrer: document.referrer || null,
      language: document.documentElement.lang || localStorage.getItem('ff_lang') || 'de',
      device_type: detectDeviceType(),
      occurred_at: new Date().toISOString(),
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
    }

    void flushOfflineQueue()
    const ok = await send(payload)
    if (!ok) queueOffline(payload)
  } catch {
    // Fail silently — analytics must never break UX
  }
}

export function initScrollTracking() {
  const thresholds = [25, 50, 75, 100]
  const fired = new Set<number>()

  const handler = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const percent = Math.round((window.scrollY / scrollable) * 100)
    thresholds.forEach(t => {
      if (percent >= t && !fired.has(t)) {
        fired.add(t)
        track('scroll_depth', { scroll_percent: t })
      }
    })
  }

  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}
