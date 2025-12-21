create table if not exists about_paragraphs (
  id serial primary key,
  content text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
