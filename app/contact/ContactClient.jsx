"use client";
import { useState } from "react";

export default function ContactClient() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <p className="static-label">We're here to help</p>
          <h1 className="static-heading">Contact Us</h1>
          <p className="static-text static-text--max">
            Questions about an order, a product, or your warranty? Reach out — we respond
            within one business day.
          </p>
        </div>
      </section>

      <section className="static-section">
        <div className="static-section-inner static-section-inner--split">

          {/* Contact methods */}
          <div className="static-contact-methods">
            {[
              { icon: "✉",  title: "Email",    detail: "chenegears@gmail.com",  href: "mailto:chenegears@gmail.com", note: "We reply within 1 business day" },
              { icon: "💬", title: "WhatsApp", detail: "+1 (331) 224-1929",     href: "https://wa.me/13312241929",   note: "Chat with us on WhatsApp" },
              { icon: "📍", title: "Memphis HQ",detail: "1835 Nonconnah Blvd, Suite 173\nMemphis, TN 38132", href: null, note: "Mon–Fri 8–5 · Sat 10–4" },
            ].map((c) => (
              <div key={c.title} className="static-contact-card">
                <span className="static-contact-icon">{c.icon}</span>
                <div>
                  <p className="static-contact-title">{c.title}</p>
                  {c.href
                    ? <a href={c.href} className="static-contact-detail static-contact-link">{c.detail}</a>
                    : <p className="static-contact-detail">{c.detail}</p>
                  }
                  <p className="static-contact-note">{c.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="static-contact-form-wrap">
            <h2 className="static-subheading">Send us a message</h2>
            {sent ? (
              <div className="static-form-success">
                <p>✓ Message sent! We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form className="static-contact-form" onSubmit={handleSubmit}>
                <div className="static-field">
                  <label className="static-label-sm">Name *</label>
                  <input type="text" required placeholder="Your name" className="static-input" />
                </div>
                <div className="static-field">
                  <label className="static-label-sm">Email *</label>
                  <input type="email" required placeholder="your@email.com" className="static-input" />
                </div>
                <div className="static-field">
                  <label className="static-label-sm">Subject</label>
                  <select className="static-input static-select">
                    <option>Order question</option>
                    <option>Product question</option>
                    <option>Warranty / repair</option>
                    <option>Returns & exchanges</option>
                    <option>General enquiry</option>
                  </select>
                </div>
                <div className="static-field">
                  <label className="static-label-sm">Message *</label>
                  <textarea required rows={5} placeholder="How can we help?" className="static-input static-textarea" />
                </div>
                <button type="submit" className="btn btn-tan static-submit-btn">SEND MESSAGE</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
