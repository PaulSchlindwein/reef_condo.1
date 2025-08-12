This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Admin + Supabase setup

1) Create a Supabase project, then run this SQL in the SQL editor:

```
create extension if not exists pgcrypto;

-- content blocks
create table if not exists public.content_blocks (
  id text primary key,
  value text,
  updated_at timestamptz default now()
);

-- collections and items
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text,
  description text
);

create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references public.collections(id) on delete cascade,
  position int not null default 0,
  data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.content_blocks enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;

create policy if not exists content_blocks_public_read on public.content_blocks for select using (true);
create policy if not exists collections_public_read on public.collections for select using (true);
create policy if not exists collection_items_public_read on public.collection_items for select using (true);

-- seed collections so the admin can add items immediately
insert into public.collections (slug, name) values
  ('resort_restaurants', 'Resort Restaurants'),
  ('resort_activities', 'Resort Activities'),
  ('resort_amenities', 'Resort Amenities'),
  ('area_nassau_attractions', 'Nassau Attractions'),
  ('area_local_restaurants', 'Local Restaurants'),
  ('area_transportation', 'Transportation Options'),
  ('site_stats', 'Site Stats')
on conflict (slug) do nothing;
```

2) Add the following env vars to `frontend/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=your-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=choose-a-strong-password
SESSION_SECRET=generate-a-long-random-string
```

3) Restart the dev server. Visit `/admin` to log in and edit content.
