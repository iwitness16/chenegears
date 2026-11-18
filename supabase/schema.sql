-- ============================================================
--  Chêne Gear — Supabase Database Schema
--  Run this entire file in the Supabase SQL Editor once.
--  Then run seed.sql to populate with product data.
-- ============================================================

-- ── Enable UUID extension ─────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Drop existing tables (safe re-run) ───────────────────────
drop table if exists product_images   cascade;
drop table if exists product_variants cascade;
drop table if exists products         cascade;

-- ── products ─────────────────────────────────────────────────
-- One row per unique Shopify product handle.
create table products (
  id            uuid primary key default uuid_generate_v4(),
  handle        text not null unique,
  title         text not null,
  body_html     text,
  vendor        text,
  type          text,
  tags          text[],           -- e.g. {"activity:waterfowl","audience:mens"}
  status        text default 'active',   -- active | draft | archived
  badge         text,             -- "Best Seller" | "New" | null
  rating        numeric(3,1),
  review_count  int default 0,
  min_price     numeric(10,2),    -- denormalised for fast sorting
  sort_order    int default 999,
  created_at    timestamptz default now()
);

create index products_type_idx   on products(type);
create index products_status_idx on products(status);
create index products_tags_idx   on products using gin(tags);

-- ── product_variants ──────────────────────────────────────────
-- One row per SKU (each size × color combination).
create table product_variants (
  id                uuid primary key default uuid_generate_v4(),
  product_id        uuid not null references products(id) on delete cascade,
  sku               text,
  color             text,
  size              text,
  price             numeric(10,2) not null,
  compare_at_price  numeric(10,2),
  inventory_qty     int default 0,
  barcode           text,
  weight_grams      int,
  created_at        timestamptz default now()
);

create index variants_product_idx on product_variants(product_id);
create index variants_color_idx   on product_variants(color);

-- ── product_images ────────────────────────────────────────────
-- One row per image URL for a product.
create table product_images (
  id          uuid primary key default uuid_generate_v4(),
  product_id  uuid not null references products(id) on delete cascade,
  src         text not null,
  position    int default 1,
  alt         text,
  created_at  timestamptz default now()
);

create index images_product_idx on product_images(product_id);
create index images_position_idx on product_images(product_id, position);

-- ── Row Level Security ────────────────────────────────────────
-- Public read access; writes are restricted to service role only.
alter table products          enable row level security;
alter table product_variants  enable row level security;
alter table product_images    enable row level security;

create policy "Public read products"
  on products for select using (status = 'active');

create policy "Public read variants"
  on product_variants for select using (true);

create policy "Public read images"
  on product_images for select using (true);

-- ── Helper view: collection_products ─────────────────────────
-- Convenience view that pre-joins the first image and min price.
create or replace view collection_products as
select
  p.id,
  p.handle,
  p.title,
  p.type,
  p.tags,
  p.badge,
  p.rating,
  p.review_count,
  p.sort_order,
  min(v.price)                              as min_price,
  max(v.price)                              as max_price,
  bool_or(v.inventory_qty > 0)             as in_stock,
  array_agg(distinct v.color)
    filter (where v.color is not null)      as colors,
  array_agg(distinct v.size)
    filter (where v.size is not null)       as sizes,
  (select i.src from product_images i
   where i.product_id = p.id
   order by i.position limit 1)            as image
from products p
left join product_variants v on v.product_id = p.id
where p.status = 'active'
group by p.id;
