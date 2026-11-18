"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nav, navMenus } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { UserIcon, SearchIcon, BagIcon, MenuIcon, CloseIcon } from "./Icons";

/* ── Mega-menu portal ─────────────────────────────────────────────────────── */
function MegaMenuPortal({ menu, anchorRef, onClose }) {
  const [top, setTop] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (anchorRef.current) {
      setTop(anchorRef.current.getBoundingClientRect().bottom);
    }
  }, [anchorRef]);

  if (!mounted) return null;

  const isActivity = Boolean(menu.activities);

  const content = isActivity ? (
    <div
      className="mega-menu mega-menu--activity"
      style={{ top }}
      onMouseLeave={onClose}
    >
      <div className="mega-inner">
        {menu.activities.map((act) => (
          <div key={act.title} className="activity-col">
            <div className="activity-img-wrap">
              <img src={act.image} alt={act.title} />
            </div>
            <p className="activity-title">{act.title}</p>
            <ul>
              {act.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={l.highlight ? "mega-link--highlight" : ""}
                    onClick={onClose}
                    prefetch={false}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div
      className="mega-menu"
      style={{ top }}
      onMouseLeave={onClose}
    >
      <div className="mega-inner">
        {/* Link columns */}
        <div className="mega-cols">
          {menu.columns.map((col, i) => (
            <div key={i} className="mega-col">
              {col.heading && <p className="mega-heading">{col.heading}</p>}

              {/* Shop-all at top (headingless column) */}
              {!col.heading && col.shopAll && (
                <Link
                  href={col.shopAll.href}
                  className="mega-shop-all"
                  onClick={onClose}
                  prefetch={false}
                >
                  {col.shopAll.label} →
                </Link>
              )}

              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={l.highlight ? "mega-link--highlight" : ""}
                      onClick={onClose}
                      prefetch={false}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Shop-all at bottom (column has a heading) */}
              {col.heading && col.shopAll && (
                <Link
                  href={col.shopAll.href}
                  className="mega-shop-all mega-shop-all--bottom"
                  onClick={onClose}
                  prefetch={false}
                >
                  {col.shopAll.label} →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom standalone shop-all (Apparel) */}
        {menu.shopAllBottom && (
          <Link
            href={menu.shopAllBottom.href}
            className="mega-shop-all mega-shop-all--standalone"
            onClick={onClose}
            prefetch={false}
          >
            {menu.shopAllBottom.label} ›
          </Link>
        )}

        {/* Featured image cards */}
        {menu.featured?.length > 0 && (
          <div className="mega-featured">
            {menu.featured.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="mega-feat-card"
                onClick={onClose}
                prefetch={false}
              >
                <div className="mega-feat-img">
                  <img src={f.image} alt={f.title} />
                </div>
                <p className="mega-feat-title">{f.title}</p>
                {f.subtitle && <p className="mega-feat-sub">{f.subtitle}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

/* ── Nav item ─────────────────────────────────────────────────────────────── */
function NavItem({ label }) {
  const menu = navMenus[label];
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const leaveTimer = useRef(null);

  function openMenu() {
    clearTimeout(leaveTimer.current);
    setOpen(true);
  }
  function closeMenu() {
    leaveTimer.current = setTimeout(() => setOpen(false), 150);
  }
  function cancelClose() {
    clearTimeout(leaveTimer.current);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e) {
      // The portal content is outside wrapRef, so we check the mega-menu too
      const portal = document.querySelector(".mega-menu");
      if (
        wrapRef.current && !wrapRef.current.contains(e.target) &&
        (!portal || !portal.contains(e.target))
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // No dropdown for this label
  if (!menu) {
    return (
      <Link href="#" className="nav-trigger-link">
        {label}
      </Link>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`nav-item${open ? " nav-item--open" : ""}`}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        className="nav-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>

      {open && (
        <MegaMenuPortal
          menu={menu}
          anchorRef={wrapRef}
          onClose={() => setOpen(false)}
        />
      )}

      {/* Invisible bridge fills the gap between header bottom and panel top */}
      {open && (
        <div className="mega-bridge" onMouseEnter={cancelClose} />
      )}
    </div>
  );
}

/* ── Header ───────────────────────────────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalQty } = useCart();

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button
            className="menu-btn"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <Logo />
          <nav className={`nav head${mobileOpen ? " open" : ""}`}>
            {nav.map((label) => (
              <NavItem key={label} label={label} />
            ))}
          </nav>
          <div className="header-icons">
            <Link href="#" aria-label="Account"><UserIcon /></Link>
            <button
              className="header-search-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>
            <Link href="/cart" aria-label={`Cart (${totalQty} items)`} className="header-cart-link">
              <BagIcon />
              {totalQty > 0 && (
                <span className="header-cart-badge">{totalQty}</span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
