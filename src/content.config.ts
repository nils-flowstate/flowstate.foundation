import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

export const EVENT_CATEGORIES = ['business', 'sport', 'music', 'yoga', 'wellness', 'festival', 'art', 'other'] as const

const localized = z.object({ de: z.string(), en: z.string() })
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum als YYYY-MM-DD')

const events = defineCollection({
  loader: file('src/content/events.json'),
  schema: z.object({
    category: z.enum(EVENT_CATEGORIES),
    title: localized,
    role: localized.optional(),
    client: z.string().optional(),
    location: z.string(),
    event_date: isoDate,
    event_end_date: isoDate.nullable(),
    ticket_url: z.url().nullable(),
  }),
})

export const collections = { events }
