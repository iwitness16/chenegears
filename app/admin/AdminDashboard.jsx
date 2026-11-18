"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, types: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("products")
        .select("id, handle, title, type, status, min_price, created_at, product_images(src, position)")
        .order("created_at", { ascending: false })
        .limit(6);

      const products = data ?? [];
      const types = new Set(products.map((p) => p.type).filter(Boolean));

      // Full count
      const { count } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });

      const { count: activeCount } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("status", "active");

      setStats({ total: count ?? 0, active: activeCount ?? 0, types: types.size });
      setRecent(
        products.map((p) => ({
          ...p,
          image: (p.product_images ?? []).sort((a, b) => a.position - b.position)[0]?.src ?? null,
        }))
      );
      setLoading(false);
    }
    load();
  }, []);

  const statCards = [
    { label: "Total Products",  value: stats.total,  color: "#c4ab83" },
    { label: "Active Products", value: stats.active, color: "#2d7a2d" },
    { label: "Product Types",   value: stats.types,  color: "#4a6fa5" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <Link href="/admin/products/new" className="admin-btn admin-btn--primary">
          + Add Product
        </Link>
      </div>

      {/* Stat cards */}
      <div className="admin-stat-grid">
        {statCards.map((s) => (
          <div key={s.label} className="admin-stat-card">
            <p className="admin-stat-label">{s.label}</p>
            <p className="admin-stat-value" style={{ color: s.color }}>
              {loading ? "—" : s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent products */}
      <div className="admin-section">
        <div className="admin-section-head">
          <h2 className="admin-section-title">Recent Products</h2>
          <Link href="/admin/products" className="admin-link">View all →</Link>
        </div>
        {loading ? (
          <div className="admin-table-skeleton">
            {[1,2,3].map((i) => <div key={i} className="admin-row-skeleton" />)}
          </div>
        ) : (
          <div className="admin-product-grid">
            {recent.map((p) => (
              <Link key={p.id} href={`/admin/products/${p.id}`} className="admin-product-thumb">
                <div className="admin-product-thumb-img">
                  {p.image
                    ? <img src={p.image} alt={p.title} />
                    : <span className="admin-product-thumb-placeholder">No image</span>
                  }
                </div>
                <div className="admin-product-thumb-info">
                  <p className="admin-product-thumb-title">{p.title}</p>
                  <p className="admin-product-thumb-meta">{p.type}</p>
                  {p.min_price != null && (
                    <p className="admin-product-thumb-price">${parseFloat(p.min_price).toFixed(2)}</p>
                  )}
                </div>
                <span className={`admin-status-badge admin-status-badge--${p.status}`}>
                  {p.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
