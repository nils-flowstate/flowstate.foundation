const PHONE_KEY = 'ff_phone_ts'
const COOLDOWN = 60 * 60 * 1000 // 1 hour

export function canSubmitPhone(): boolean {
  const ts = localStorage.getItem(PHONE_KEY)
  if (!ts) return true
  return Date.now() - parseInt(ts) > COOLDOWN
}

export function markPhoneSubmitted() {
  localStorage.setItem(PHONE_KEY, Date.now().toString())
}

export function getPhoneCooldownMinutes(): number {
  const ts = localStorage.getItem(PHONE_KEY)
  if (!ts) return 0
  const remaining = COOLDOWN - (Date.now() - parseInt(ts))
  return Math.ceil(remaining / 60000)
}
