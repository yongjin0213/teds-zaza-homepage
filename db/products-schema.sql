create table if not exists products (
  id text primary key,
  name text not null,
  price text not null,
  image text not null,
  link text not null,
  badge text not null,
  created_at timestamptz not null default now()
);
