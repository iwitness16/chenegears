"use client";
import Link from "next/link";

export default function CollectionHero({ meta }) {
  return (
    <div className="coll-hero">
      {/* Left — black panel with text */}
      <div className="coll-hero-left">
        {/* Breadcrumb */}
        <nav className="coll-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/collections/shop">Shop</Link>
          <span>/</span>
          <span>{meta.title}</span>
        </nav>

        {meta.eyebrow && (
          <p className="coll-hero-eyebrow">{meta.eyebrow}</p>
        )}
        <h1 className="coll-hero-title">{meta.title.toUpperCase()}</h1>
        {meta.tagline && (
          <p className="coll-hero-tagline">{meta.tagline}</p>
        )}
      </div>

      {/* Right — hero image */}
      <div className="coll-hero-right">
        <img
          src={meta.heroImage ?? meta.image}
          alt={meta.title}
          className="coll-hero-img"
        />
      </div>
    </div>
  );
}
