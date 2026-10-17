import { HeartHandshake, Gem, Flame } from 'lucide-react'

/** Die drei Werte – Reihenfolge, Icon und Farbe. Texte liegen unter values.items.<key> in de/en.json. */
export const VALUES = [
  { key: 'connection', Icon: HeartHandshake, iconColor: 'text-navy', hoverBorder: 'hover:border-navy' },
  { key: 'quality', Icon: Gem, iconColor: 'text-orange', hoverBorder: 'hover:border-orange' },
  { key: 'empowerment', Icon: Flame, iconColor: 'text-fire', hoverBorder: 'hover:border-fire' },
] as const

export type ValueKey = (typeof VALUES)[number]['key']
