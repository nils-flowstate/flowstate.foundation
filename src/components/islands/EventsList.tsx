import { useEffect, useMemo, useState } from 'react'
import { MapPin, Calendar, ExternalLink, UserRound } from 'lucide-react'

type Lang = 'de' | 'en'

export interface EventItem {
  id: string
  category: string
  title: Record<Lang, string>
  role?: Record<Lang, string>
  location: string
  event_date: string
  event_end_date: string | null
  ticket_url: string | null
}

const categoryColors: Record<string, string> = {
  business: 'bg-ocean/10 text-ocean',
  sport: 'bg-green/10 text-green',
  music: 'bg-ocean/10 text-ocean',
  yoga: 'bg-green/10 text-green',
  wellness: 'bg-green/10 text-green',
  festival: 'bg-orange/10 text-orange',
  art: 'bg-fire/10 text-fire',
  other: 'bg-muted/10 text-muted',
}

const categories = ['all', 'business', 'sport', 'music', 'yoga', 'wellness', 'festival', 'art'] as const

const filterKeys: Record<string, string> = {
  all: 'filterAll',
  business: 'filterBusiness',
  sport: 'filterSport',
  music: 'filterMusic',
  yoga: 'filterYoga',
  wellness: 'filterWellness',
  festival: 'filterFestival',
  art: 'filterArt',
}

interface EventsListProps {
  events: EventItem[]
  lang: Lang
  messages: Record<string, string>
  compact?: boolean
}

/** Lokales Datum als YYYY-MM-DD – Vergleich ohne Zeitzonen-Verschiebung. */
function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function toDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export default function EventsList({ events, lang, messages, compact = false }: EventsListProps) {
  // Vergangen/kommend wird im Browser entschieden, damit die Liste ohne neuen Build aktuell bleibt.
  const [today, setToday] = useState<string | null>(null)
  const [showPast, setShowPast] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => setToday(todayIso()), [])

  const formatter = useMemo(
    () => new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    [lang]
  )

  const formatRange = (start: string, end: string | null) =>
    end && end !== start ? formatter.formatRange(toDate(start), toDate(end)) : formatter.format(toDate(start))

  const visible = useMemo(() => {
    if (!today) return []
    return events
      .filter(e => ((e.event_end_date ?? e.event_date) < today) === showPast)
      .filter(e => categoryFilter === 'all' || e.category === categoryFilter)
      .sort((a, b) => (showPast ? b.event_date.localeCompare(a.event_date) : a.event_date.localeCompare(b.event_date)))
  }, [events, today, showPast, categoryFilter])

  if (!today) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-ocean/30 border-t-ocean rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {!compact && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {[false, true].map(past => (
              <button
                key={String(past)}
                type="button"
                onClick={() => setShowPast(past)}
                aria-pressed={showPast === past}
                className={`px-4 py-2 rounded-xl font-sans text-sm font-medium transition-colors ${
                  showPast === past
                    ? 'bg-navy text-white'
                    : 'bg-surface text-muted hover:bg-navy/10'
                }`}
              >
                {past ? messages.pastTab : messages.upcomingTab}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                aria-pressed={categoryFilter === cat}
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-ocean text-white'
                    : 'bg-surface text-muted hover:bg-ocean/10'
                }`}
              >
                {messages[filterKeys[cat]]}
              </button>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="enter text-center py-12" style={{ ['--y' as string]: '10px' }}>
          <p className="font-sans text-muted text-lg">{messages.emptyState}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event, i) => (
            <div
              key={event.id}
              className="enter bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
              style={{ ['--delay' as string]: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-sans font-semibold text-text">{event.title[lang]}</h3>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[event.category] || categoryColors.other}`}>
                  {messages[filterKeys[event.category]] || event.category}
                </span>
              </div>
              <div className="space-y-1.5 mb-4">
                {event.role && (
                  <div className="flex items-center gap-2 font-sans text-sm text-navy font-medium">
                    <UserRound className="w-4 h-4 shrink-0" />
                    {event.role[lang]}
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2 font-sans text-sm text-muted">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {event.location}
                  </div>
                )}
                <div className="flex items-center gap-2 font-sans text-sm text-muted">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <time dateTime={event.event_date}>{formatRange(event.event_date, event.event_end_date)}</time>
                </div>
              </div>
              {event.ticket_url && (
                <a
                  href={event.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-orange hover:underline"
                >
                  {messages.ticketButton}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
