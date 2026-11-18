"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nav, navMenus } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { UserIcon, SearchIcon, BagIcon, MenuIcon, CloseIcon, ChevronRight } from "./Icons";

/* ── Mega-menu portal (desktop) ───────────────────────────────────────────── */
function MegaMenuPortal({ menu, anchorRef, onClose }) {
  const [top, setTop] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (anchorRef.current) setTop(anchorRef.current.getBoundingClientRect().bottom);
  }, [anchorRef]);

  if (!mounted) return null;

  const isActivity = Boolean(menu.activities);

  const content = isActivity ? (
    <div className="mega-menu mega-menu--activity" style={{ top }} onMouseLeave={onClose}>
      <div className="mega-inner">
        {menu.activities.map((act) => (
          <div key={act.title} className="activity-col">
            <div className="activity-img-wrap"><img src={act.image} alt={act.title} /></div>
            <p className="activity-title">{act.title}</p>
            <ul>
              {act.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={l.highlight ? "mega-link--highlight" : ""} onClick={onClose} prefetch={false}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="mega-menu" style={{ top }} onMouseLeave={onClose}>
      <div className="mega-inner">
        <div className="mega-cols">
          {menu.columns.map((col, i) => (
            <div key={i} className="mega-col">
              {col.heading && <p className="mega-heading">{col.heading}</p>}
              {!col.heading && col.shopAll && (
                <Link href={col.shopAll.href} className="mega-shop-all" onClick={onClose} prefetch={false}>
                  {col.shopAll.label} →
                </Link>
              )}
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={l.highlight ? "mega-link--highlight" : ""} onClick={onClose} prefetch={false}>{l.label}</Link>
                  </li>
                ))}
              </ul>
              {col.heading && col.shopAll && (
                <Link href={col.shopAll.href} className="mega-shop-all mega-shop-all--bottom" onClick={onClose} prefetch={false}>
                  {col.shopAll.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
        {menu.shopAllBottom && (
          <Link href={menu.shopAllBottom.href} className="mega-shop-all mega-shop-all--standalone" onClick={onClose} prefetch={false}>
            {menu.shopAllBottom.label} ›
          </Link>
        )}
        {menu.featured?.length > 0 && (
          <div className="mega-featured">
            {menu.featured.map((f) => (
              <Link key={f.title} href={f.href} className="mega-feat-card" onClick={onClose} prefetch={false}>
                <div className="mega-feat-img"><img src={f.image} alt={f.title} /></div>
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

/* ── Desktop nav item ─────────────────────────────────────────────────────── */
function NavItem({ label }) {
  const menu = navMenus[label];
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const leaveTimer = useRef(null);

  function openMenu()   { clearTimeout(leaveTimer.current); setOpen(true); }
  function closeMenu()  { leaveTimer.current = setTimeout(() => setOpen(false), 150); }
  function cancelClose(){ clearTimeout(leaveTimer.current); }

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      const portal = document.querySelector(".mega-menu");
      if (wrapRef.current && !wrapRef.current.contains(e.target) && (!portal || !portal.contains(e.target)))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!menu) return <Link href="#" className="nav-trigger-link">{label}</Link>;

  return (
    <div ref={wrapRef} className={`nav-item${open ? " nav-item--open" : ""}`} onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button className="nav-trigger" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}>
        {label}
      </button>
      {open && <MegaMenuPortal menu={menu} anchorRef={wrapRef} onClose={() => setOpen(false)} />}
      {open && <div className="mega-bridge" onMouseEnter={cancelClose} />}
    </div>
  );
}

/* ── Mobile menu ──────────────────────────────────────────────────────────── */
function MobileMenu({ onClose, onSearchOpen }) {
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  function toggleItem(label) {
    setExpandedItem((prev) => (prev === label ? null : label));
  }

  const secondaryLinks = [
    { label: "NEW ARRIVALS",   href: "/collections/waders" },
    { label: "BEST SELLERS",   href: "/collections/waders" },
    { label: "GIFT GUIDE",     href: "/collections/accessories" },
    { label: "VISIT A STORE",  href: "/contact" },
  ];

  return (
    <div className="mobile-menu" role="dialog" aria-label="Navigation menu" aria-modal="true">
      {/* Close button row */}
      <div className="mobile-menu-topbar">
        <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
          <CloseIcon width={22} height={22} />
        </button>
      </div>

      {/* Search bar */}
      <form className="mobile-search-form" onSubmit={handleSearch}>
        <span className="mobile-search-icon">
          <SearchIcon width={16} height={16} />
        </span>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="mobile-search-input"
          autoComplete="off"
        />
      </form>

      {/* White section — primary nav */}
      <div className="mobile-menu-primary">
        {nav.map((label) => {
          const menu = navMenus[label];
          const isExpanded = expandedItem === label;
          return (
            <div key={label} className="mobile-nav-item">
              {menu ? (
                <>
                  <button
                    className="mobile-nav-trigger"
                    onClick={() => toggleItem(label)}
                    aria-expanded={isExpanded}
                  >
                    <span>{label.toUpperCase()}</span>
                    <span className={`mobile-nav-chevron${isExpanded ? " mobile-nav-chevron--open" : ""}`}>
                      <ChevronRight width={16} height={16} />
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="mobile-submenu">
                      {!menu.activities && menu.columns?.map((col, i) => (
                        <div key={i} className="mobile-submenu-col">
                          {col.heading && <p className="mobile-submenu-heading">{col.heading}</p>}
                          {col.links.map((l) => (
                            <Link key={l.label} href={l.href} className={`mobile-submenu-link${l.highlight ? " mobile-submenu-link--highlight" : ""}`} onClick={onClose}>
                              {l.label}
                            </Link>
                          ))}
                          {col.shopAll && (
                            <Link href={col.shopAll.href} className="mobile-submenu-shopall" onClick={onClose}>
                              {col.shopAll.label} →
                            </Link>
                          )}
                        </div>
                      ))}
                      {menu.activities?.map((act) => (
                        <div key={act.title} className="mobile-submenu-col">
                          <p className="mobile-submenu-heading">{act.title}</p>
                          {act.links.map((l) => (
                            <Link key={l.label} href={l.href} className="mobile-submenu-link" onClick={onClose}>{l.label}</Link>
                          ))}
                        </div>
                      ))}
                      {menu.shopAllBottom && (
                        <Link href={menu.shopAllBottom.href} className="mobile-submenu-shopall" onClick={onClose}>
                          {menu.shopAllBottom.label} ›
                        </Link>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link href="#" className="mobile-nav-trigger" onClick={onClose}>
                  <span>{label.toUpperCase()}</span>
                  <ChevronRight width={16} height={16} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Black section — secondary links */}
      <div className="mobile-menu-secondary">
        {secondaryLinks.map((l) => (
          <Link key={l.label} href={l.href} className="mobile-secondary-link" onClick={onClose}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Header ───────────────────────────────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [mounted, setMounted]         = useState(false);
  const { totalQty } = useCart();

  useEffect(() => setMounted(true), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button className="menu-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </button>
          <Logo />
          <nav className="nav head">
            {nav.map((label) => <NavItem key={label} label={label} />)}
          </nav>
          <div className="header-icons">
            <Link href="#" aria-label="Account"><UserIcon /></Link>
            <button className="header-search-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <Link href="/cart" aria-label={`Cart (${totalQty} items)`} className="header-cart-link">
              <BagIcon />
              {totalQty > 0 && <span className="header-cart-badge">{totalQty}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Desktop search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu portal */}
      {mounted && mobileOpen && createPortal(
        <>
          <div className="mobile-menu-backdrop" onClick={() => setMobileOpen(false)} />
          <MobileMenu
            onClose={() => setMobileOpen(false)}
            onSearchOpen={() => { setMobileOpen(false); setSearchOpen(true); }}
          />
        </>,
        document.body
      )}
    </>
  );
}
