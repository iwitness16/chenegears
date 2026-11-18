"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getProductsByCollection, getCollectionFilters } from "@/lib/products";
import Stars from "@/components/Stars";
import CollectionSEO from "./CollectionSEO";
import CollectionHero from "./CollectionHero";

// ── Icons ─────────────────────────────────────────────────────────────────────
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <rect x="0" y="0" width="8" height="8" /><rect x="10" y="0" width="8" height="8" />
      <rect x="0" y="10" width="8" height="8" /><rect x="10" y="10" width="8" height="8" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <rect x="0" y="0" width="18" height="4" /><rect x="0" y="7" width="18" height="4" />
      <rect x="0" y="14" width="18" height="4" />
    </svg>
  );
}
function PlusIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function MinusIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M0 6h12" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function CheckIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1.5 5l2.5 2.5 4.5-4.5" /></svg>;
}

// ── Filter accordion item ──────────────────────────────────────────────────────
function FilterGroup({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-group">
      <button className="filter-group-head" onClick={() => setOpen((v) => !v)}>
        <span>{title}</span>
        {open ? <MinusIcon /> : <PlusIcon />}
      </button>
      {open && <div className="filter-group-body">{children}</div>}
    </div>
  );
}

// ── Color swatch option ───────────────────────────────────────────────────────
const COLOR_HEX = {
  brown: "#6b4226", black: "#1a1a1a", olive: "#5a6132", cypress: "#3d4a2e",
  ivory: "#f5f0e8", crimson: "#a51c30", moss: "#4a5240", navy: "#1c2b4a",
  denim: "#4a6fa5", khaki: "#b5a67a", clay: "#9e6b4a", sage: "#7a8f6a",
  "field khaki": "#b5a67a", "dark olive": "#3d4a2e", oatmeal: "#d4c9a8",
  granite: "#7a7a7a", "blue jean": "#6a8db0", tan: "#c4ab83",
  "mossy oak bottomland": "#5a4a2a", "mossy oak shadow grass": "#4a5a3a",
  "mossy oak original bottomland": "#6a5a3a",
  "late evening": "#2a3040", sand: "#c8b89a",
};
function colorHex(c) {
  return COLOR_HEX[c?.toLowerCase()] ?? "#aaa";
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ product, layout }) {
  const [activeColor, setActiveColor] = useState(product.colors[0] ?? null);
  const displayImg = product.colorMap?.[activeColor] ?? product.image;

  if (layout === "list") {
    return (
      <Link href={`/products/${product.handle}`} className="product-card product-card--list">
        <div className="product-card-img">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          {displayImg && <img src={displayImg} alt={product.title} loading="lazy" />}
        </div>
        <div className="product-card-body">
          {activeColor && (
            <p className="product-color-label">Color: {activeColor}</p>
          )}
          <h3 className="product-card-title">{product.title.toUpperCase()}</h3>
          <p className="product-card-tagline">Less Seams. More Hunts.</p>
          {product.rating > 0 && (
            <div className="product-card-stars">
              <Stars rating={product.rating} />
              <span className="product-card-reviews">({product.reviewCount})</span>
            </div>
          )}
          <p className="product-card-price">${product.minPrice.toFixed(2)}</p>
          {product.colors.length > 0 && (
            <div className="product-card-swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`product-swatch${activeColor === c ? " active" : ""}`}
                  style={{ background: colorHex(c) }}
                  aria-label={c}
                  onClick={(e) => { e.preventDefault(); setActiveColor(c); }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      <div className="product-card-img">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {displayImg && <img src={displayImg} alt={product.title} loading="lazy" />}
      </div>
      {activeColor && (
        <p className="product-color-label">Color: {activeColor}</p>
      )}
      {product.colors.length > 0 && (
        <div className="product-card-swatches">
          {product.colors.map((c) => (
            <button
              key={c}
              className={`product-swatch${activeColor === c ? " active" : ""}`}
              style={{ background: colorHex(c) }}
              aria-label={c}
              onClick={(e) => { e.preventDefault(); setActiveColor(c); }}
            />
          ))}
        </div>
      )}
      <h3 className="product-card-title">{product.title.toUpperCase()}</h3>
      <p className="product-card-tagline">Less Seams. More Hunts.</p>
      {product.rating > 0 && (
        <div className="product-card-stars">
          <Stars rating={product.rating} />
          <span className="product-card-reviews">({product.reviewCount})</span>
        </div>
      )}
      <p className="product-card-price">${product.minPrice.toFixed(2)}</p>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CollectionClient({ slug, meta, initialSort }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("grid"); // "grid" | "list"
  const [sort, setSort] = useState(initialSort);
  const [filterOptions, setFilterOptions] = useState({ colors: [], types: [], priceRange: [0, 2000] });

  // Active filters
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  // Load filter options once
  useEffect(() => {
    getCollectionFilters(slug).then((opts) => {
      setFilterOptions(opts);
      setPriceRange(opts.priceRange);
    });
  }, [slug]);

  // Load products whenever filters/sort change
  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { products: p, total: t } = await getProductsByCollection(slug, {
      colors: selectedColors,
      inStock: inStockOnly || undefined,
      minPrice: priceRange[0] > filterOptions.priceRange[0] ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < filterOptions.priceRange[1] ? priceRange[1] : undefined,
      rating: minRating,
      sort,
    });
    setProducts(p);
    setTotal(t);
    setLoading(false);
  }, [slug, selectedColors, inStockOnly, priceRange, filterOptions.priceRange, minRating, sort]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  function toggleColor(c) {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function clearFilters() {
    setSelectedColors([]);
    setSelectedTypes([]);
    setInStockOnly(false);
    setMinRating(null);
    setPriceRange(filterOptions.priceRange);
  }

  const hasActiveFilters =
    selectedColors.length > 0 || inStockOnly || minRating != null ||
    priceRange[0] > filterOptions.priceRange[0] ||
    priceRange[1] < filterOptions.priceRange[1];

  return (
    <>
      {/* ── Collection hero banner ── */}
      <CollectionHero meta={meta} />

      {/* ── Top bar ── */}
      <div className="coll-topbar">
        <span className="coll-count">{total} Products</span>
        <div className="coll-topbar-right">
          <div className="coll-layout-toggle">
            <button
              className={layout === "grid" ? "active" : ""}
              onClick={() => setLayout("grid")}
              aria-label="Grid view"
            >
              <GridIcon />
            </button>
            <button
              className={layout === "list" ? "active" : ""}
              onClick={() => setLayout("list")}
              aria-label="List view"
            >
              <ListIcon />
            </button>
          </div>
          <div className="coll-sort">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="best-selling">Sort By: Best Selling</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="coll-layout">
        {/* ── Sidebar filters ── */}
        <aside className="coll-sidebar">
          <div className="filter-header">
            <span className="filter-title">FILTERS</span>
            {hasActiveFilters && (
              <button className="filter-clear" onClick={clearFilters}>Clear all</button>
            )}
          </div>

          {/* Product Type */}
          {filterOptions.types.length > 1 && (
            <FilterGroup title="PRODUCT TYPE" defaultOpen={false}>
              {filterOptions.types.map((t) => (
                <label key={t} className="filter-check">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(t)}
                    onChange={() =>
                      setSelectedTypes((prev) =>
                        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                      )
                    }
                  />
                  <span className="filter-check-box">
                    {selectedTypes.includes(t) && <CheckIcon />}
                  </span>
                  <span>{t}</span>
                  <span className="filter-count">({products.filter((p) => p.type === t).length})</span>
                </label>
              ))}
            </FilterGroup>
          )}

          {/* Color */}
          {filterOptions.colors.length > 0 && (
            <FilterGroup title="COLOR" defaultOpen={false}>
              <div className="filter-swatches">
                {filterOptions.colors.map((c) => (
                  <button
                    key={c}
                    title={c}
                    className={`filter-swatch${selectedColors.includes(c) ? " active" : ""}`}
                    style={{ background: colorHex(c) }}
                    onClick={() => toggleColor(c)}
                    aria-label={c}
                    aria-pressed={selectedColors.includes(c)}
                  />
                ))}
              </div>
            </FilterGroup>
          )}

          {/* Price */}
          <FilterGroup title="PRICE" defaultOpen={false}>
            <div className="filter-price-range">
              <input
                type="range"
                min={filterOptions.priceRange[0]}
                max={filterOptions.priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              />
              <input
                type="range"
                min={filterOptions.priceRange[0]}
                max={filterOptions.priceRange[1]}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              />
              <div className="filter-price-inputs">
                <span>$ <input type="number" value={priceRange[0]} readOnly /></span>
                <span>to</span>
                <span>$ <input type="number" value={priceRange[1]} readOnly /></span>
              </div>
            </div>
          </FilterGroup>

          {/* Availability */}
          <FilterGroup title="AVAILABILITY" defaultOpen={false}>
            <label className="filter-check">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly((v) => !v)}
              />
              <span className="filter-check-box">{inStockOnly && <CheckIcon />}</span>
              <span>In stock only</span>
            </label>
          </FilterGroup>

          {/* Rating */}
          <FilterGroup title="RATING" defaultOpen={false}>
            {[5, 4, 3].map((r) => (
              <label key={r} className="filter-check">
                <input
                  type="checkbox"
                  checked={minRating === r}
                  onChange={() => setMinRating((v) => (v === r ? null : r))}
                />
                <span className="filter-check-box">{minRating === r && <CheckIcon />}</span>
                <Stars rating={r} />
                <span className="filter-count">
                  ({products.filter((p) => Math.floor(p.rating) >= r).length})
                </span>
              </label>
            ))}
          </FilterGroup>
        </aside>

        {/* ── Product grid ── */}
        <main className="coll-main">
          {loading ? (
            <div className="coll-loading">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="product-skeleton" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="coll-empty">
              <p>No products found.</p>
              {hasActiveFilters && (
                <button className="btn btn-tan" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={`coll-grid${layout === "list" ? " coll-grid--list" : ""}`}>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} layout={layout} />
                ))}
              </div>
              <p className="coll-showing">
                Showing {products.length} of {total} products
              </p>
            </>
          )}
        </main>
      </div>

      {/* ── SEO / editorial section ── */}
      <CollectionSEO meta={meta} />
    </>
  );
}
