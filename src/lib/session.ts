// Client-Session-Id + Device-Detection — geteilt von analytics.ts und consentLog.ts.
// Die session_id entspricht serverseitig sessions.id (Spec §4.3).

const SESSION_KEY = 'ff_session_id'

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}
