"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Waders",        href: "/collections/waders" },
  { label: "Jackets",       href: "/collections/jackets" },
  { label: "Footwear",      href: "/collections/footwear" },
  { label: "Pants & Bibs",  href: "/collections/pants" },
  { label: "T-Shirts",      href: "/collections/t-shirts" },
  { label: "Accessories",   href: "/collections/accessories" },
];

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 280);

  useEffect(() => setMounted(true), []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Search Supabase
  const search = useCallback(async (q) => {
    if (!q || q.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id, handle, title, type, badge, min_price,
          product_images ( src, position )
        `)
        .eq("status", "active")
        .ilike("title", `%${q.trim()}%`)
        .order("sort_order", { ascending: true })
        .limit(8);

      if (error) throw error;

      setResults(
        (data ?? []).map((p) => {
          const imgs = (p.product_images ?? []).sort((a, b) => a.position - b.position);
          return {
            handle: p.handle,
            title: p.title,
            type: p.type,
            badge: p.badge,
            price: p.min_price,
            image: imgs[0]?.src ?? null,
          };
        })
      );
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { search(debouncedQuery); }, [debouncedQuery, search]);

  function handleResultClick() {
    onClose();
    setQuery("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  if (!mounted || !open) return null;

  const modal = (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      {/* Backdrop */}
      <div className="search-backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="search-panel">
        {/* Input row */}
        <form className="search-form" onSubmit={handleSubmit}>
          <span className="search-form-icon"><SearchIcon /></span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="search-input"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button type="button" className="search-clear" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear">
              <CloseIcon />
            </button>
          )}
          <button type="button" className="search-close-btn" onClick={onClose} aria-label="Close search">
            Close
          </button>
        </form>

        <div className="search-body">
          {/* No query — show quick links */}
          {!query && (
            <div className="search-quick">
              <p className="search-section-label">POPULAR CATEGORIES</p>
              <div className="search-quick-links">
                {QUICK_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="search-quick-link" onClick={handleResultClick}>
                    {l.label} <ArrowIcon />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {query && loading && (
            <div className="search-status">
              <div className="search-spinner" />
              <span>Searching…</span>
            </div>
          )}

          {/* No results */}
          {query && !loading && debouncedQuery === query && results.length === 0 && (
            <div className="search-status">
              <p className="search-no-results">No products found for "<strong>{query}</strong>"</p>
              <p className="search-no-results-sub">Try a different term or browse a category above.</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="search-results">
              <p className="search-section-label">{results.length} PRODUCT{results.length !== 1 ? "S" : ""}</p>
              <ul className="search-result-list">
                {results.map((r) => (
                  <li key={r.handle}>
                    <Link
                      href={`/products/${r.handle}`}
                      className="search-result-item"
                      onClick={handleResultClick}
                    >
                      <div className="search-result-img">
                        {r.image
                          ? <img src={r.image} alt={r.title} loading="lazy" />
                          : <div className="search-result-img-placeholder" />
                        }
                      </div>
                      <div className="search-result-info">
                        {r.badge && <span className="search-result-badge">{r.badge}</span>}
                        <p className="search-result-title">{r.title}</p>
                        <p className="search-result-type">{r.type}</p>
                      </div>
                      <div className="search-result-right">
                        {r.price != null && (
                          <p className="search-result-price">${parseFloat(r.price).toFixed(2)}</p>
                        )}
                        <ArrowIcon />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* View all */}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="search-view-all"
                onClick={handleResultClick}
              >
                View all results for "{query}" →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
