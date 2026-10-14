import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Bauplan 6.0: Collections fuer kundenwebsites, nachweise, reviews. Heute ohne sichtbaren Eintrag.
const kundenwebsites = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/kundenwebsites' }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    kurzbeschreibung: z.string().optional(),
    cloudflare: z.boolean(),
    freigegeben: z.boolean(),
  }),
});

export const collections = { kundenwebsites };
