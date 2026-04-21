-- Enable extension for uuid generation (Supabase usually has pgcrypto enabled).
create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint unique not null,
  username text,
  first_name text,
  photo_url text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  status text not null default 'inactive',
  paid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_subscriptions_user_id on subscriptions(user_id);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  yookassa_payment_id text unique not null,
  amount integer not null,
  currency text not null default 'RUB',
  status text not null,
  created_at timestamptz not null default now(),
  payload jsonb
);

create index if not exists idx_payments_user_id on payments(user_id);

create table if not exists access_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  invite_link text,
  is_used boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_access_links_user_id on access_links(user_id);
