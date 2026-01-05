create table if not exists recipes (
  id text primary key,
  title text not null,
  image text not null,
  tag text not null,
  summary text not null,
  vidid text not null,
  story jsonb not null,
  ingredients jsonb not null,
  steps jsonb not null,
  created_at timestamptz not null default now()
);
