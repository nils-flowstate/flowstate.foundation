import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'

interface Event {
  id: string
  title: string
  category: string
  location: string
  event_date: string
  event_end_date: string | null
  ticket_url: string | null
  is_past: boolean
}

const categoryColors: Record<string, string> = {
  music: 'bg-ocean/10 text-ocean',
  yoga: 'bg-green/10 text-green',
  wellness: 'bg-green/10 text-green',
  festival: 'bg-orange/10 text-orange',
  art: 'bg-fire/10 text-fire',
  other: 'bg-muted/10 text-muted',
}

interface EventsListProps {
  compact?: boolean
}

export function EventsList({ compact = false }: EventsListProps) {
  const { t } = useTranslation()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showPast, setShowPast] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const today = new Date().toISOString().split('T')[0]
      let query = supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: !showPast })

      if (showPast) {
        query = query.lt('event_date', today)
      } else {
        query = query.gte('event_date', today)
      }

      if (compact) {
        query = query.limit(3)
      }

      const { data } = await query
      setEvents(data || [])
      setLoading(false)
    }

    fetchEvents()
  }, [showPast, compact])

  const filtered = categoryFilter === 'all'
    ? events
    : events.filter(e => e.category === categoryFilter)

  const categories = ['all', 'music', 'yoga', 'wellness', 'festival', 'art']
  const categoryLabels: Record<string, string> = {
    all: t('events.filterAll'),
    music: t('events.filterMusic'),
    yoga: t('events.filterYoga'),
    wellness: t('events.filterWellness'),
    festival: t('events.filterFestival'),
    art: t('events.filterArt'),
  }

  if (loading) {
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
                onClick={() => setShowPast(past)}
                className={`px-4 py-2 rounded-xl font-sans text-sm font-medium transition-colors ${
                  showPast === past
                    ? 'bg-navy text-white'
                    : 'bg-surface text-muted hover:bg-navy/10'
                }`}
              >
                {past ? t('events.pastTab') : t('events.upcomingTab')}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-ocean text-white'
                    : 'bg-surface text-muted hover:bg-ocean/10'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="font-sans text-muted text-lg">{t('events.emptyState')}</p>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-sans font-semibold text-text">{event.title}</h3>
                {event.category && (
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[event.category] || categoryColors.other}`}>
                    {categoryLabels[event.category] || event.category}
                  </span>
                )}
              </div>
              <div className="space-y-1.5 mb-4">
                {event.location && (
                  <div className="flex items-center gap-2 font-sans text-sm text-muted">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {event.location}
                  </div>
                )}
                <div className="flex items-center gap-2 font-sans text-sm text-muted">
                  <Calendar className="w-4 h-4 shrink-0" />
                  {new Date(event.event_date).toLocaleDateString('de-DE', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })}
                </div>
              </div>
              {event.ticket_url && (
                <a
                  href={event.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-orange hover:underline"
                >
                  {t('events.ticketButton')}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
