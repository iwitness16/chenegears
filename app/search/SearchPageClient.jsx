"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Stars from "@/components/Stars";

const COLOR_HEX = {
  brown: "#6b4226", black: "#1a1a1a", olive: "#5a6132", cypress: "#3d4a2e",
  ivory: "#f5f0e8", crimson: "#a51c30", moss: "#4a5240", navy: "#1c2b4a",
  denim: "#4a6fa5", khaki: "#b5a67a", clay: "#9e6b4a",
  "mossy oak bottomland": "#5a4a2a", saddle: "#8b5e3c",
};
function colorHex(c) { return COLOR_HEX[c?.toLowerCase()] ?? "#aaa"; }

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") ?? "";

  const [inputVal, setInputVal] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setInputVal(q);
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);

    supabase
      .from("products")
      .select(`id, handle, title, type, badge, min_price, rating, review_count,
               product_images ( src, position ),
               product_variants ( color )`)
      .eq("status", "active")
      .ilike("title", `%${q.trim()}%`)
      .order("sort_order", { ascending: true })
      .limit(48)
      .then(({ data }) => {
        setResults(
          (data ?? []).map((p) => {
            const imgs = (p.product_images ?? []).sort((a, b) => a.position - b.position);
            const colors = [...new Set((p.product_variants ?? []).map((v) => v.color).filter(Boolean))];
            return {
              handle: p.handle, title: p.title, type: p.type, badge: p.badge,
              price: p.min_price, rating: p.rating, reviewCount: p.review_count,
              image: imgs[0]?.src ?? null, colors,
            };
          })
        );
        setLoading(false);
      });
  }, [q]);

  function handleSearch(e) {
    e.preventDefault();
    if (!inputVal.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
  }

  return (
    <div className="search-page">
      <div className="search-page-header">
        <Link href="/" className="search-page-back">← Back to home</Link>
        <form onSubmit={handleSearch} className="search-page-form">
          <input
            type="search"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search all products…"
            className="search-page-input"
            autoFocus
          />
          <button type="submit" className="btn btn-tan search-page-btn">SEARCH</button>
        </form>
        {searched && !loading && (
          <p className="search-page-count">
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${q}"`
              : `No results for "${q}"`}
          </p>
        )}
      </div>

      <div className="search-page-body">
        {loading && (
          <div className="search-page-loading">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="product-skeleton" />)}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="coll-grid">
            {results.map((p) => (
              <Link key={p.handle} href={`/products/${p.handle}`} className="product-card">
                <div className="product-card-img">
                  {p.badge && <span className="product-badge">{p.badge}</span>}
                  {p.image && <img src={p.image} alt={p.title} loading="lazy" />}
                </div>
                {p.colors.length > 0 && (
                  <div className="product-card-swatches">
                    {p.colors.slice(0, 6).map((c) => (
                      <span key={c} className="product-swatch" style={{ background: colorHex(c) }} />
                    ))}
                  </div>
                )}
                <h3 className="product-card-title">{p.title.toUpperCase()}</h3>
                <p className="product-card-tagline">{p.type}</p>
                {p.rating > 0 && (
                  <div className="product-card-stars">
                    <Stars rating={p.rating} />
                    <span className="product-card-reviews">({p.reviewCount})</span>
                  </div>
                )}
                {p.price != null && (
                  <p className="product-card-price">${parseFloat(p.price).toFixed(2)}</p>
                )}
              </Link>
            ))}
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="search-page-empty">
            <p>No products matched "<strong>{q}</strong>".</p>
            <p>Try searching for waders, boots, jackets, or fleece.</p>
            <div className="search-page-suggestions">
              {["waders", "jackets", "footwear", "t-shirts"].map((s) => (
                <Link key={s} href={`/collections/${s}`} className="search-suggestion-pill">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
