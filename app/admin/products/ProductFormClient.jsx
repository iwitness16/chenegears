"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { adminGetProduct, adminCreateProduct, adminUpdateProduct } from "@/lib/adminProducts";

const MAX_IMAGES = 4;
const BUCKET = "product-images";

const PRODUCT_TYPES = [
  "Waders","Jackets","Vests","Base Layers","Bibs","Pants",
  "Footwear","T-Shirts","Hoodies","Sweaters","Headwear","Accessories","Drinkware",
];
const BADGE_OPTIONS = ["", "Best Seller", "New", "Sale"];
const STATUS_OPTIONS = ["active", "draft", "archived"];

// ── Upload a single File to Supabase Storage → returns public URL ─────────────
async function uploadToSupabase(file, folder) {
  const ext  = file.name.split(".").pop();
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(name, file, { upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
  return data.publicUrl;
}

// ── Single image slot ─────────────────────────────────────────────────────────
function ImageSlot({ slot, index, onUpload, onUrlChange, onRemove, uploading }) {
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please select an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { alert("Max file size is 10 MB."); return; }
    onUpload(index, file);
  }

  return (
    <div className={`img-slot${slot.src ? " img-slot--filled" : ""}${uploading ? " img-slot--uploading" : ""}`}>
      <div className="img-slot-num">{index + 1}</div>

      {/* Preview */}
      <div className="img-slot-preview">
        {slot.src ? (
          <img src={slot.src} alt={`Image ${index + 1}`} />
        ) : uploading ? (
          <div className="img-slot-spinner"><div className="admin-spinner" /></div>
        ) : (
          <div className="img-slot-empty">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            <span>No image</span>
          </div>
        )}
        {slot.src && (
          <button
            type="button"
            className="img-slot-remove"
            onClick={() => onRemove(index)}
            aria-label="Remove image"
          >
            ✕
          </button>
        )}
      </div>

      {/* Controls */}
      {!slot.src && !uploading && (
        <div className="img-slot-controls">
          {/* File upload button */}
          <button
            type="button"
            className="img-upload-btn"
            onClick={() => inputRef.current?.click()}
          >
            ↑ Upload file
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="img-hidden-input"
            onChange={handleFile}
          />

          {/* Divider */}
          <span className="img-or">or</span>

          {/* URL input */}
          <input
            type="url"
            value={slot.url ?? ""}
            onChange={(e) => onUrlChange(index, e.target.value)}
            placeholder="Paste image URL…"
            className="admin-input admin-input--url-sm"
          />
        </div>
      )}

      {slot.src && (
        <p className="img-slot-source">
          {slot.isUpload ? "📁 Uploaded file" : "🔗 External URL"}
        </p>
      )}
    </div>
  );
}

// ── Variant row ───────────────────────────────────────────────────────────────
function VariantRow({ variant, index, onChange, onRemove }) {
  function field(key, val) { onChange(index, { ...variant, [key]: val }); }
  return (
    <div className="admin-variant-row">
      <input className="admin-input" placeholder="Color" value={variant.color ?? ""} onChange={(e) => field("color", e.target.value)} />
      <input className="admin-input" placeholder="Size"  value={variant.size  ?? ""} onChange={(e) => field("size",  e.target.value)} />
      <input className="admin-input admin-input--price" type="number" placeholder="Price" value={variant.price ?? ""} onChange={(e) => field("price", parseFloat(e.target.value) || 0)} />
      <input className="admin-input admin-input--price" type="number" placeholder="Qty"   value={variant.inventory_qty ?? 0} onChange={(e) => field("inventory_qty", parseInt(e.target.value, 10) || 0)} />
      <button type="button" className="admin-action-btn admin-action-btn--delete" onClick={() => onRemove(index)}>✕</button>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────
export default function ProductFormClient({ mode, productId }) {
  const router  = useRouter();
  const isEdit  = mode === "edit";

  const [loading,  setLoading]  = useState(isEdit);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

  // Core fields
  const [title,     setTitle]     = useState("");
  const [handle,    setHandle]    = useState("");
  const [type,      setType]      = useState("");
  const [status,    setStatus]    = useState("active");
  const [badge,     setBadge]     = useState("");
  const [bodyHtml,  setBodyHtml]  = useState("");
  const [tags,      setTags]      = useState("");
  const [minPrice,  setMinPrice]  = useState("");
  const [sortOrder, setSortOrder] = useState(999);

  // Images — array of { src: string|null, url: string, isUpload: bool }
  // Always exactly MAX_IMAGES slots
  const emptySlots = () =>
    Array.from({ length: MAX_IMAGES }, () => ({ src: null, url: "", isUpload: false }));

  const [slots, setSlots]         = useState(emptySlots);
  const [uploading, setUploading] = useState({}); // index → bool

  // Variants
  const [variants, setVariants] = useState([{ color: "", size: "", price: "", inventory_qty: 0 }]);

  // Auto-handle from title
  useEffect(() => {
    if (!isEdit && title) {
      setHandle(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  }, [title, isEdit]);

  // Load product for edit
  useEffect(() => {
    if (!isEdit || !productId) return;
    adminGetProduct(productId).then((p) => {
      if (!p) { setError("Product not found."); setLoading(false); return; }
      setTitle(p.title ?? "");
      setHandle(p.handle ?? "");
      setType(p.type ?? "");
      setStatus(p.status ?? "active");
      setBadge(p.badge ?? "");
      setBodyHtml(p.body_html ?? "");
      setTags((p.tags ?? []).join(", "));
      setMinPrice(p.min_price ?? "");
      setSortOrder(p.sort_order ?? 999);

      const sortedImgs = (p.product_images ?? [])
        .sort((a, b) => a.position - b.position)
        .slice(0, MAX_IMAGES);

      const filled = sortedImgs.map((i) => ({
        src: i.src,
        url: i.src,
        isUpload: i.src?.includes("supabase") && i.src?.includes(BUCKET),
      }));
      // Pad to MAX_IMAGES
      while (filled.length < MAX_IMAGES) filled.push({ src: null, url: "", isUpload: false });
      setSlots(filled);

      const v = p.product_variants ?? [];
      setVariants(v.length
        ? v.map((v) => ({ color: v.color ?? "", size: v.size ?? "", price: v.price ?? "", inventory_qty: v.inventory_qty ?? 0 }))
        : [{ color: "", size: "", price: "", inventory_qty: 0 }]
      );
      setLoading(false);
    }).catch(() => { setError("Failed to load product."); setLoading(false); });
  }, [isEdit, productId]);

  // Handle file picked — upload immediately so preview shows
  async function handleUpload(index, file) {
    const folder = handle.trim() || "uploads";
    setUploading((u) => ({ ...u, [index]: true }));
    try {
      const url = await uploadToSupabase(file, folder);
      setSlots((prev) => prev.map((s, i) =>
        i === index ? { src: url, url, isUpload: true } : s
      ));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading((u) => ({ ...u, [index]: false }));
    }
  }

  // Handle URL typed — update src when user finishes typing
  function handleUrlChange(index, val) {
    setSlots((prev) => prev.map((s, i) =>
      i === index ? { src: val.trim() || null, url: val, isUpload: false } : s
    ));
  }

  function removeSlot(index) {
    setSlots((prev) => prev.map((s, i) =>
      i === index ? { src: null, url: "", isUpload: false } : s
    ));
  }

  function handleVariantChange(i, val) { setVariants((prev) => prev.map((v, idx) => idx === i ? val : v)); }
  function removeVariant(i) { setVariants((prev) => prev.filter((_, idx) => idx !== i)); }
  function addVariant()     { setVariants((prev) => [...prev, { color: "", size: "", price: "", inventory_qty: 0 }]); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!title.trim()) { setError("Title is required."); return; }
    if (!handle.trim()) { setError("Handle is required."); return; }

    const anyUploading = Object.values(uploading).some(Boolean);
    if (anyUploading) { setError("Please wait for images to finish uploading."); return; }

    setSaving(true);

    const cleanImages = slots.map((s) => s.src).filter(Boolean);
    const cleanVariants = variants
      .filter((v) => v.price || v.color || v.size)
      .map((v) => ({
        color: v.color || null,
        size:  v.size  || null,
        price: parseFloat(v.price) || 0,
        inventory_qty: parseInt(v.inventory_qty, 10) || 0,
      }));

    const payload = {
      title:      title.trim(),
      handle:     handle.trim(),
      type:       type   || null,
      status,
      badge:      badge  || null,
      body_html:  bodyHtml.trim() || null,
      tags:       tags.split(",").map((t) => t.trim()).filter(Boolean),
      min_price:  parseFloat(minPrice) || null,
      sort_order: parseInt(sortOrder, 10) || 999,
      images:     cleanImages,
      variants:   cleanVariants,
    };

    try {
      if (isEdit) {
        await adminUpdateProduct(productId, payload);
        setSuccess("Product updated successfully.");
      } else {
        const created = await adminCreateProduct(payload);
        setSuccess("Product created successfully.");
        setTimeout(() => router.push(`/admin/products/${created.id}`), 800);
      }
    } catch (err) {
      setError(err?.message ?? "Save failed. Check Supabase RLS policies.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-form-loading">
        <div className="admin-spinner" />
        <p>Loading product…</p>
      </div>
    );
  }

  const filledCount = slots.filter((s) => s.src).length;

  return (
    <div className="admin-form-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <Link href="/admin/products" className="admin-back-link">← Back to products</Link>
          <h1 className="admin-page-title">{isEdit ? "Edit Product" : "Add Product"}</h1>
        </div>
        <div className="admin-header-actions">
          {isEdit && (
            <Link href={`/products/${handle}`} target="_blank" className="admin-btn admin-btn--ghost">
              View on site ↗
            </Link>
          )}
          <button type="submit" form="product-form" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>

      {error   && <div className="admin-alert admin-alert--error">{error}</div>}
      {success && <div className="admin-alert admin-alert--success">{success}</div>}

      <form id="product-form" onSubmit={handleSubmit} noValidate>
        <div className="admin-form-grid">

          {/* ── Left ── */}
          <div className="admin-form-main">

            {/* Basic info */}
            <div className="admin-card">
              <h2 className="admin-card-title">Basic information</h2>
              <div className="admin-field">
                <label className="admin-label">Title *</label>
                <input className="admin-input" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Brown 2S Wader" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Handle (URL slug) *</label>
                <div className="admin-input-prefix">
                  <span>/products/</span>
                  <input className="admin-input" value={handle} onChange={(e) => setHandle(e.target.value)} required placeholder="brown-2s-wader" />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-label">Description (HTML)</label>
                <textarea className="admin-textarea" value={bodyHtml} onChange={(e) => setBodyHtml(e.target.value)} rows={5} placeholder="<p>Product description…</p>" />
              </div>
            </div>

            {/* Images */}
            <div className="admin-card">
              <div className="admin-card-head">
                <h2 className="admin-card-title">
                  Images
                  <span className="admin-card-title-count">{filledCount}/{MAX_IMAGES}</span>
                </h2>
              </div>
              <p className="admin-card-hint">
                Upload image files (JPG, PNG, WebP — max 10 MB each), or paste a URL. First image is the thumbnail shown in collections.
              </p>

              <div className="img-slots-grid">
                {slots.map((slot, i) => (
                  <ImageSlot
                    key={i}
                    slot={slot}
                    index={i}
                    onUpload={handleUpload}
                    onUrlChange={handleUrlChange}
                    onRemove={removeSlot}
                    uploading={!!uploading[i]}
                  />
                ))}
              </div>
            </div>

            {/* Variants */}
            <div className="admin-card">
              <div className="admin-card-head">
                <h2 className="admin-card-title">Variants</h2>
                <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addVariant}>
                  + Add variant
                </button>
              </div>
              <div className="admin-variant-labels">
                <span>Color</span><span>Size</span><span>Price ($)</span><span>Stock Qty</span><span />
              </div>
              {variants.map((v, i) => (
                <VariantRow key={i} variant={v} index={i} onChange={handleVariantChange} onRemove={removeVariant} />
              ))}
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="admin-form-sidebar">
            <div className="admin-card">
              <h2 className="admin-card-title">Status</h2>
              <div className="admin-field">
                <select className="admin-select admin-select--full" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-card">
              <h2 className="admin-card-title">Organisation</h2>
              <div className="admin-field">
                <label className="admin-label">Product type</label>
                <select className="admin-select admin-select--full" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">— Select type —</option>
                  {PRODUCT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label">Badge</label>
                <select className="admin-select admin-select--full" value={badge} onChange={(e) => setBadge(e.target.value)}>
                  {BADGE_OPTIONS.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label">Tags (comma-separated)</label>
                <input className="admin-input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="waterfowl, mens, waterproof" />
              </div>
            </div>

            <div className="admin-card">
              <h2 className="admin-card-title">Pricing & sort</h2>
              <div className="admin-field">
                <label className="admin-label">Min price ($)</label>
                <input className="admin-input" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0.00" step="0.01" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Sort order</label>
                <input className="admin-input" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom save */}
        <div className="admin-form-footer">
          <Link href="/admin/products" className="admin-btn admin-btn--ghost">Cancel</Link>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}
