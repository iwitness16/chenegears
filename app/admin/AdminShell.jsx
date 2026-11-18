"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin",          label: "Dashboard",  icon: "⊞" },
  { href: "/admin/products", label: "Products",   icon: "▤"  },
];

function logout(router) {
  document.cookie = "chene_admin_auth=; path=/; max-age=0";
  router.push("/admin/login");
  router.refresh();
}

export default function AdminShell({ children }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page gets no shell
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar${sidebarOpen ? " admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar-top">
          <Link href="/admin" className="admin-sidebar-brand">
            <span className="admin-sidebar-logo">CHÊNE</span>
            <span className="admin-sidebar-portal">Admin</span>
          </Link>
          <button
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${active ? " admin-nav-link--active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-link admin-nav-link--muted" target="_blank">
            <span className="admin-nav-icon">↗</span>View site
          </Link>
          <button
            className="admin-nav-link admin-nav-link--muted admin-logout-btn"
            onClick={() => logout(router)}
          >
            <span className="admin-nav-icon">⎋</span>Log out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main area ── */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="admin-topbar-title">
            {NAV.find((n) =>
              n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)
            )?.label ?? "Admin"}
          </div>
          <button
            className="admin-topbar-logout"
            onClick={() => logout(router)}
          >
            Log out
          </button>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
