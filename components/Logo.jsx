"use client";
import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="Chêne home">
      <svg className="logo-mark" viewBox="0 0 30 16" aria-hidden="true">
        <path d="M2 14L15 3l13 11" fill="none" stroke="#c4ab83" strokeWidth="2" />
        <path d="M8 14L15 8l7 6" fill="none" stroke="#c4ab83" strokeWidth="2" />
      </svg>
      <span className="logo-word">CHÊNE</span>
    </Link>
  );
}
