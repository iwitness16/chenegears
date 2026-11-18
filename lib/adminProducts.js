/**
 * lib/adminProducts.js
 * Supabase queries used exclusively by the admin dashboard.
 * These run from client components (browser) using the anon key.
 * Full CRUD — make sure RLS allows writes for anon in your project,
 * or swap in a service-role key via a Next.js Route Handler.
 */

import { supabase } from "./supabase";

// ── List ──────────────────────────────────────────────────────────────────────

export async function adminListProducts({ search = "", type = "", status = "", page = 1, pageSize = 20 } = {}) {
  let query = supabase
    .from("products")
    .select(`id, handle, title, type, status, badge, min_price, sort_order, created_at,
             product_images ( src, position )`, { count: "exact" });

  if (search) query = query.ilike("title", `%${search}%`);
  if (type)   query = query.eq("type", type);
  if (status) query = query.eq("status", status);

  const from = (page - 1) * pageSize;
  query = query.order("sort_order", { ascending: true }).range(from, from + pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  const products = (data ?? []).map((p) => ({
    ...p,
    image: (p.product_images ?? []).sort((a, b) => a.position - b.position)[0]?.src ?? null,
  }));

  return { products, total: count ?? 0 };
}

// ── Get single ────────────────────────────────────────────────────────────────

export async function adminGetProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select(`*, product_variants ( * ), product_images ( * )`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function adminCreateProduct(fields) {
  const { images = [], variants = [], ...productFields } = fields;

  // Insert product
  const { data: product, error: pErr } = await supabase
    .from("products")
    .insert([productFields])
    .select()
    .single();
  if (pErr) throw pErr;

  // Insert images
  if (images.length) {
    const rows = images.map((src, i) => ({
      product_id: product.id,
      src,
      position: i + 1,
      alt: productFields.title,
    }));
    const { error: iErr } = await supabase.from("product_images").insert(rows);
    if (iErr) throw iErr;
  }

  // Insert variants
  if (variants.length) {
    const rows = variants.map((v) => ({ ...v, product_id: product.id }));
    const { error: vErr } = await supabase.from("product_variants").insert(rows);
    if (vErr) throw vErr;
  }

  return product;
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function adminUpdateProduct(id, fields) {
  const { images, variants, ...productFields } = fields;

  const { data: product, error: pErr } = await supabase
    .from("products")
    .update(productFields)
    .eq("id", id)
    .select()
    .single();
  if (pErr) throw pErr;

  // Replace images if provided
  if (images !== undefined) {
    await supabase.from("product_images").delete().eq("product_id", id);
    if (images.length) {
      const rows = images.map((src, i) => ({
        product_id: id,
        src,
        position: i + 1,
        alt: productFields.title,
      }));
      const { error: iErr } = await supabase.from("product_images").insert(rows);
      if (iErr) throw iErr;
    }
  }

  // Replace variants if provided
  if (variants !== undefined) {
    await supabase.from("product_variants").delete().eq("product_id", id);
    if (variants.length) {
      const rows = variants.map((v) => ({ ...v, product_id: id }));
      const { error: vErr } = await supabase.from("product_variants").insert(rows);
      if (vErr) throw vErr;
    }
  }

  return product;
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function adminDeleteProduct(id) {
  // Cascade deletes variants + images via FK ON DELETE CASCADE in schema
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

// ── Toggle status ─────────────────────────────────────────────────────────────

export async function adminToggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "active" ? "draft" : "active";
  const { error } = await supabase.from("products").update({ status: newStatus }).eq("id", id);
  if (error) throw error;
  return newStatus;
}

// ── Distinct types ────────────────────────────────────────────────────────────

export async function adminGetTypes() {
  const { data } = await supabase
    .from("products")
    .select("type")
    .neq("type", null)
    .order("type");
  const types = [...new Set((data ?? []).map((r) => r.type).filter(Boolean))];
  return types;
}
