-- LifeXP community board (Reddit-style: posts + upvotes + comments).
-- Run once in the Supabase SQL editor for the project.
-- Posting is anonymous (display name only); safety is enforced by RLS
-- (insert + read only for anon), length checks, and client-side rate limiting.

-- ── Tables ──────────────────────────────────────────────────────────────────
create table if not exists public.community_posts (
  id            uuid primary key default gen_random_uuid(),
  author        text not null check (char_length(author) between 1 and 40),
  title         text not null check (char_length(title) between 1 and 140),
  body          text check (char_length(body) <= 2000),
  votes         int  not null default 0,
  comment_count int  not null default 0,
  -- Trust flag for the "Team" badge. Anon inserts can never set this true
  -- (enforced by RLS below); only service-role / SQL-editor inserts can.
  is_official   boolean not null default false,
  created_at    timestamptz not null default now()
);

create table if not exists public.community_comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.community_posts (id) on delete cascade,
  author      text not null check (char_length(author) between 1 and 40),
  body        text not null check (char_length(body) between 1 and 1000),
  created_at  timestamptz not null default now()
);

create index if not exists community_comments_post_idx
  on public.community_comments (post_id, created_at);

-- ── Keep comment_count in sync ───────────────────────────────────────────────
create or replace function public.bump_comment_count()
returns trigger language plpgsql security definer as $$
begin
  update public.community_posts
     set comment_count = comment_count + 1
   where id = new.post_id;
  return new;
end;
$$;

drop trigger if exists trg_bump_comment_count on public.community_comments;
create trigger trg_bump_comment_count
  after insert on public.community_comments
  for each row execute function public.bump_comment_count();

-- ── Atomic upvote (anon cannot UPDATE rows directly) ─────────────────────────
create or replace function public.upvote_post(p_id uuid)
returns int language plpgsql security definer as $$
declare v int;
begin
  update public.community_posts
     set votes = votes + 1
   where id = p_id
  returning votes into v;
  return v;
end;
$$;

grant execute on function public.upvote_post(uuid) to anon;

-- ── Row level security: anon may read + insert, nothing else ─────────────────
alter table public.community_posts    enable row level security;
alter table public.community_comments enable row level security;

-- A name is "reserved" if it could impersonate the brand, staff, or the system.
create or replace function public.is_reserved_name(n text)
returns boolean language sql immutable as $$
  select
    char_length(trim(n)) < 2
    or lower(trim(n)) like '%lifexp%'
    or lower(trim(n)) like '%life xp%'
    or lower(trim(n)) like '%welcome to%'
    or lower(trim(n)) ~* '\m(admin|administrator|moderator|mod|official|team|staff|support|system|bot)\M';
$$;

drop policy if exists "read posts"    on public.community_posts;
drop policy if exists "insert posts"  on public.community_posts;
create policy "read posts"   on public.community_posts for select to anon using (true);
-- Anon may insert ordinary posts only: cannot mark a post official, and cannot
-- use a reserved name. Service-role inserts bypass RLS (seeds, etc).
create policy "insert posts" on public.community_posts for insert to anon
  with check (is_official = false and not public.is_reserved_name(author));

drop policy if exists "read comments"   on public.community_comments;
drop policy if exists "insert comments" on public.community_comments;
create policy "read comments"   on public.community_comments for select to anon using (true);
create policy "insert comments" on public.community_comments for insert to anon
  with check (not public.is_reserved_name(author));

-- ── Realtime ─────────────────────────────────────────────────────────────────
alter publication supabase_realtime add table public.community_posts;
alter publication supabase_realtime add table public.community_comments;

-- ── Seed posts (comment_count is left at 0; the trigger fills it from the
--    seed comments below, so the counts always match real rows) ──────────────
insert into public.community_posts (author, title, body, votes, is_official)
values
  ('LifeXP Team', 'Welcome to the wall. What are you leveling up?',
   'Drop the one goal you are chasing right now. No vanity metrics, just real effort. We read every post.', 42, true),
  ('marathon_mira', 'Hit a 28-day running streak and my Energy aspect finally caught up to Physique',
   'Started at couch level in March. The XP split actually showed me I was neglecting recovery. Adjusted and the streak held.', 31, false),
  ('quietbuilder', 'Using LifeXP to stop doomscrolling, replacing it with 20 min of reading',
   'Logic XP is my favorite number to watch climb now. Small sessions but they stack.', 24, false),
  ('kenji.draws', 'Day 60 of daily sketching. Creativity mastery within reach',
   'The achievement timeline keeps me honest. I can see exactly what I finished vs what I just talked about.', 19, false);

-- Seed comments, attached by post title (trigger bumps comment_count to match).
insert into public.community_comments (post_id, author, body)
select p.id, c.author, c.body
from public.community_posts p
join (values
  ('Welcome to the wall. What are you leveling up?', 'runner_kate', 'Training for my first 10k. The streak view is keeping me honest.'),
  ('Welcome to the wall. What are you leveling up?', 'devon_w',     'Rebuilding a deep-work habit after burnout. Day 4 and counting.'),
  ('Welcome to the wall. What are you leveling up?', 'aria.codes',  'Learning Rust in public. Logic XP go brrr.'),
  ('Hit a 28-day running streak and my Energy aspect finally caught up to Physique', 'sam_lifts', 'Recovery is so underrated. Congrats on the streak.'),
  ('Hit a 28-day running streak and my Energy aspect finally caught up to Physique', 'mina.p',    'This is the nudge I needed to lace up today.'),
  ('Using LifeXP to stop doomscrolling, replacing it with 20 min of reading', 'bookwormbeck', 'Stealing this. 20 minutes feels doable.')
) as c(ptitle, author, body) on p.title = c.ptitle;
