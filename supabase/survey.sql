-- Post-onboarding product validation survey results.
-- Run once in the Supabase SQL editor.
-- user_id is an anonymous browser UUID stored in localStorage (no auth required).

-- ── Table ────────────────────────────────────────────────────────────────────

create table if not exists public.survey_results (
  id                           uuid        primary key default gen_random_uuid(),
  user_id                      text        not null,
  motivation_loss_time         text        check (char_length(motivation_loss_time) <= 120),
  abandonment_reason           text        check (char_length(abandonment_reason) <= 1000),
  progress_visibility_score    smallint    check (progress_visibility_score between 1 and 5),
  accountability_score         smallint    check (accountability_score between 1 and 5),
  progress_visualization_score smallint    check (progress_visualization_score between 1 and 5),
  age_range                    text        check (age_range in ('Under 18', '18–24', '25–34', '35–44', '45+')),
  gender                       text        check (char_length(gender) <= 60),
  -- Passively collected from browser APIs — no user prompt.
  timezone                     text        check (char_length(timezone) <= 80),
  device_type                  text        check (device_type in ('iphone', 'android', 'ipad', 'tablet', 'desktop')),
  created_at                   timestamptz not null default now()
);

-- If the table already exists, add every column idempotently.
alter table public.survey_results
  add column if not exists age_range    text     check (age_range in ('Under 18', '18–24', '25–34', '35–44', '45+')),
  add column if not exists gender       text     check (char_length(gender) <= 60),
  add column if not exists timezone     text     check (char_length(timezone) <= 80),
  add column if not exists device_type  text     check (device_type in ('iphone', 'android', 'ipad', 'tablet', 'desktop'));

-- Index for looking up responses by visitor (admin analytics, dedup checks).
create index if not exists survey_results_user_idx
  on public.survey_results (user_id, created_at);

-- ── Row level security ───────────────────────────────────────────────────────

alter table public.survey_results enable row level security;

-- Anon visitors may insert their own response.
-- They cannot read, update, or delete any rows (service-role only).
drop policy if exists "insert survey" on public.survey_results;
create policy "insert survey" on public.survey_results
  for insert to anon
  with check (true);

-- No select policy for anon — responses are private; read via service-role only.
