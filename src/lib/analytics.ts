// Analytics — writes to localStorage for now.
// When Supabase is ready: uncomment the supabase block and remove the localStorage block.

// import { supabase } from './supabase'

const SESSION_KEY = 'ff_session_id'
const ANALYTICS_KEY = 'ff_analytics_log'

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

function getDevice(): string {
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export async function track(event_type: string, data: Record<string, unknown> = {}) {
  try {
    const params = new URLSearchParams(window.location.search)
    const event = {
      event_type,
      page: window.location.pathname,
      session_id: getSessionId(),
      device_type: getDevice(),
      referrer: document.referrer || null,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      language: localStorage.getItem('ff_lang') || 'de',
      created_at: new Date().toISOString(),
      ...data,
    }

    // LOCAL STORAGE — swap to Supabase when backend is ready
    const existing = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]') as unknown[]
    existing.push(event)
    // Keep last 500 events to avoid localStorage bloat
    const trimmed = existing.slice(-500)
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed))

    // SUPABASE (enable when ready):
    // await supabase.from('analytics_events').insert(event)
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
