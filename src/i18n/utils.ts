import de from './de.json'
import en from './en.json'

export const languages = ['de', 'en'] as const
export type Lang = (typeof languages)[number]
export const defaultLang: Lang = 'de'

const dictionaries: Record<Lang, unknown> = { de, en }

/** Seiten-Slugs pro Sprache – Quelle für Navigation, Toggle und hreflang. */
export const routes = {
  home: { de: '/', en: '/en' },
  about: { de: '/about-us', en: '/en/about-us' },
  values: { de: '/werte', en: '/en/values' },
  impressum: { de: '/impressum', en: '/en/impressum' },
  datenschutz: { de: '/datenschutz', en: '/en/datenschutz' },
  welcome: { de: '/welcome', en: '/en/welcome' },
} as const satisfies Record<string, Record<Lang, string>>

export type RouteKey = keyof typeof routes

function lookup(dict: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>(
    (node, part) => (node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined),
    dict
  )
}

/** t('key.sub', { minutes: 5 }) – fällt auf Deutsch zurück, interpoliert {{var}}. */
export function useTranslations(lang: Lang) {
  return function t(key: string, vars: Record<string, string | number> = {}): string {
    const value = lookup(dictionaries[lang], key) ?? lookup(dictionaries[defaultLang], key)
    if (typeof value !== 'string') return key
    return value.replace(/\{\{(\w+)\}\}/g, (_, name: string) => String(vars[name] ?? ''))
  }
}

/** Ganzen Teilbaum holen, z. B. für Props an React-Islands. */
export function getMessages<T = Record<string, string>>(lang: Lang, key: string): T {
  return (lookup(dictionaries[lang], key) ?? lookup(dictionaries[defaultLang], key)) as T
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/')
  return first === 'en' ? 'en' : 'de'
}

export function localizePath(route: RouteKey, lang: Lang, hash?: string) {
  return routes[route][lang] + (hash ? `#${hash}` : '')
}

/** Passendes Gegenstück in der anderen Sprache für die aktuelle URL. */
export function alternatePath(pathname: string, target: Lang): string {
  const clean = pathname.replace(/\/$/, '') || '/'
  for (const route of Object.values(routes)) {
    if (route.de === clean || route.en === clean) return route[target]
  }
  return routes.home[target]
}

export interface TextPart {
  text: string
  bold: boolean
}

/** „**Flow**“-Markierungen in Teile zerlegen (ersetzt renderBold/renderGreen). */
export function splitBold(text: string): TextPart[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((text, i) => ({ text, bold: i % 2 === 1 }))
    .filter(part => part.text !== '')
}
