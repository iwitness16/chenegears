"use client";
import { useState } from "react";
import Link from "next/link";
import { footer as f } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        {/* ── Column 1: Newsletter ── */}
        <div className="sf-join">
          <h4 className="sf-col-title">{f.joinTitle}</h4>
          <p className="sf-join-text">{f.joinText}</p>
          {submitted ? (
            <p className="sf-join-thanks">Thanks for subscribing!</p>
          ) : (
            <form className="sf-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                aria-label="E-mail address"
                className="sf-input"
                required
              />
              <button type="submit" className="sf-subscribe-btn">
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>

        {/* ── Columns 2-5: Link columns ── */}
        {f.columns.map((col) => (
          <div key={col.title} className="sf-col">
            <h4 className="sf-col-title">{col.title}</h4>
            <ul className="sf-links">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="sf-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* ── Bottom bar ── */}
      <div className="sf-bottom">
        <p className="sf-copyright">{f.copyright}</p>
      </div>
    </footer>
  );
}
