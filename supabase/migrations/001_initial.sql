-- Phone leads collected from landing page forms
create table phone_leads (
  id          uuid default gen_random_uuid() primary key,
  phone       text not null,
  source      text default 'hero',
  language    text default 'de',
  created_at  timestamptz default now()
);

-- Privacy-first analytics (no PII stored)
create table analytics_events (
  id             uuid default gen_random_uuid() primary key,
  event_type     text not null,
  page           text,
  element        text,
  scroll_percent int,
  session_id     text,
  device_type    text,
  referrer       text,
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  language       text,
  created_at     timestamptz default now()
);

-- Events calendar (populated in Phase 2 via n8n + Google Calendar)
create table events (
  id             uuid default gen_random_uuid() primary key,
  title          text not null,
  category       text,
  location       text,
  event_date     date not null,
  event_end_date date,
  ticket_url     text,
  referral_url   text,
  is_past        boolean default false,
  is_active      boolean default true,
  created_at     timestamptz default now()
);

-- Partners (Phase 2 structure — do not render yet)
create table partners (
  id           uuid default gen_random_uuid() primary key,
  name         text not null,
  logo_url     text,
  category     text,
  description  text,
  website_url  text,
  referral_url text,
  is_active    boolean default true,
  sort_order   int default 0,
  created_at   timestamptz default now()
);

alter table phone_leads enable row level security;
alter table analytics_events enable row level security;
alter table events enable row level security;
alter table partners enable row level security;

create policy "anon_insert_phone_leads"
  on phone_leads for insert to anon with check (true);

create policy "anon_insert_analytics"
  on analytics_events for insert to anon with check (true);

create policy "public_read_events"
  on events for select to anon using (is_active = true);
