"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { adminListProducts, adminDeleteProduct, adminToggleStatus, adminGetTypes } from "@/lib/adminProducts";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal admin-modal--sm">
        <p className="admin-modal-message">{message}</p>
        <div className="admin-modal-actions">
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn admin-btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsClient() {
  const [products, setProducts]   = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [types, setTypes]         = useState([]);
  const [search, setSearch]       = useState("");
  const [typeFilter, setType]     = useState("");
  const [statusFilter, setStatus] = useState("");
  const [page, setPage]           = useState(1);
  const PAGE_SIZE = 20;

  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast]         = useState(null);

  function showToast(msg, kind = "success") {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3000);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { products: p, total: t } = await adminListProducts({
        search, type: typeFilter, status: statusFilter, page, pageSize: PAGE_SIZE,
      });
      setProducts(p);
      setTotal(t);
    } catch {
      showToast("Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, statusFilter, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { adminGetTypes().then(setTypes); }, []);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, typeFilter, statusFilter]);

  async function handleDelete(id) {
    try {
      await adminDeleteProduct(id);
      showToast("Product deleted.");
      load();
    } catch {
      showToast("Failed to delete product.", "error");
    } finally {
      setConfirmId(null);
    }
  }

  async function handleToggle(id, status) {
    try {
      const newStatus = await adminToggleStatus(id, status);
      setProducts((prev) =>
        prev.map((p) => p.id === id ? { ...p, status: newStatus } : p)
      );
      showToast(`Product set to ${newStatus}.`);
    } catch {
      showToast("Failed to update status.", "error");
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="admin-products">
      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.kind}`}>{toast.msg}</div>
      )}

      {/* Confirm delete */}
      {confirmId && (
        <ConfirmModal
          message="Permanently delete this product and all its variants and images?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">{total} total products</p>
        </div>
        <Link href="/admin/products/new" className="admin-btn admin-btn--primary">
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input
          type="search"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search-input"
        />
        <select
          value={typeFilter}
          onChange={(e) => setType(e.target.value)}
          className="admin-select"
        >
          <option value="">All types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatus(e.target.value)}
          className="admin-select"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th admin-th--img" />
              <th className="admin-th">Title</th>
              <th className="admin-th">Type</th>
              <th className="admin-th">Price</th>
              <th className="admin-th">Status</th>
              <th className="admin-th admin-th--actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j}><div className="admin-cell-skeleton" /></td>
                  ))}
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-empty-row">
                  No products found.{" "}
                  <Link href="/admin/products/new" className="admin-link">Add one →</Link>
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="admin-tr">
                  <td className="admin-td admin-td--img">
                    <div className="admin-table-thumb">
                      {p.image
                        ? <img src={p.image} alt={p.title} />
                        : <span className="admin-table-thumb-empty">?</span>
                      }
                    </div>
                  </td>
                  <td className="admin-td">
                    <Link href={`/admin/products/${p.id}`} className="admin-product-link">
                      {p.title}
                    </Link>
                    <p className="admin-product-handle">/{p.handle}</p>
                  </td>
                  <td className="admin-td admin-td--muted">{p.type ?? "—"}</td>
                  <td className="admin-td">
                    {p.min_price != null ? `$${parseFloat(p.min_price).toFixed(2)}` : "—"}
                  </td>
                  <td className="admin-td">
                    <button
                      className={`admin-status-badge admin-status-badge--${p.status} admin-status-toggle`}
                      onClick={() => handleToggle(p.id, p.status)}
                      title="Click to toggle status"
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="admin-td admin-td--actions">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="admin-action-btn admin-action-btn--edit"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/products/${p.handle}`}
                      target="_blank"
                      className="admin-action-btn admin-action-btn--view"
                    >
                      View
                    </Link>
                    <button
                      className="admin-action-btn admin-action-btn--delete"
                      onClick={() => setConfirmId(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-btn admin-btn--ghost admin-btn--sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          <span className="admin-pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="admin-btn admin-btn--ghost admin-btn--sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
