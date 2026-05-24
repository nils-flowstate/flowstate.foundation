# Markdown1

## Supabase Schema

Create as `supabase/migrations/001_initial.sql`:

```sql
-- Phone leads collected from landing page forms
create table phone_leads (
  id          uuid default gen_random_uuid() primary key,
  phone       text not null,
  source      text default 'hero', -- 'hero' | 'about' | 'grow-together' | 'cta'
  language    text default 'de',
  created_at  timestamptz default now()
);

-- Privacy-first analytics (no PII stored)
create table analytics_events (
  id             uuid default gen_random_uuid() primary key,
  event_type     text not null,  -- 'pageview' | 'cta_click' | 'scroll_depth' | 'form_submit' | 'form_abandon'
  page           text,
  element        text,           -- e.g. 'wa_hero_button' | 'cal_grow_together'
  scroll_percent int,
  session_id     text,
  device_type    text,           -- 'mobile' | 'tablet' | 'desktop'
  referrer       text,
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  language       text,
  created_at     timestamptz default now()
);

-- Events calendar (structure ready, populated in Phase 2 via n8n + Google Calendar)
create table events (
  id            uuid default gen_random_uuid() primary key,
  title         text not null,
  category      text,            -- 'music' | 'yoga' | 'wellness' | 'festival' | 'art' | 'other'
  location      text,
  event_date    date not null,
  event_end_date date,
  ticket_url    text,
  referral_url  text,
  is_past       boolean default false,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

-- Partners (Phase 2 structure — do not render yet)
create table partners (
  id           uuid default gen_random_uuid() primary key,
  name         text not null,
  logo_url     text,
  category     text,             -- 'nutrition' | 'clothing' | 'events' | 'wellness' | 'tech' | 'fashion'
  description  text,
  website_url  text,
  referral_url text,
  is_active    boolean default true,
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- Row Level Security
alter table phone_leads enable row level security;
alter table analytics_events enable row level security;
alter table events enable row level security;
alter table partners enable row level security;

-- Allow anonymous inserts for leads and analytics (no reads from client)
create policy "anon_insert_phone_leads"
  on phone_leads for insert to anon with check (true);

create policy "anon_insert_analytics"
  on analytics_events for insert to anon with check (true);

-- Public read for events (populated server-side via n8n)
create policy "public_read_events"
  on events for select to anon using (is_active = true);
```

---


# Markdown2

## Supabase – Tabellen

```sql
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  ip_hash TEXT,
  referrer TEXT,
  user_agent TEXT,
  lang TEXT,                  -- ← aktive Sprache beim Besuch
  page TEXT DEFAULT '/',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  source TEXT NOT NULL,
  event_type TEXT DEFAULT 'button_click',
  lang TEXT,                  -- ← aktive Sprache beim Klick
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE time_on_page (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  seconds INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  source TEXT,
  lang TEXT,                  -- ← in welcher Sprache kam der Lead rein
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

> `lang`-Feld in allen relevanten Tabellen: wichtig um später zu sehen,
> ob DE oder EN-Besucher eher konvertieren.

---

## Resend – E-Mail bei neuem Lead

```ts
// supabase/functions/send-lead-email/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { phone, source, lang } = await req.json();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: Deno.env.get("RESEND_FROM"),
      to: Deno.env.get("RESEND_TO"),
      subject: `🌊 Neue Anfrage: ${source}`,
      text: `Neue Telefonnummer eingegangen:\n\n📱 ${phone}\n📍 Quelle: ${source}\n🌐 Sprache: ${lang}`,
    }),
  });

  return new Response(res.ok ? "ok" : "error", { status: res.ok ? 200 : 500 });
});
```

---
