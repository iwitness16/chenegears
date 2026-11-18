"use client";
import { useState } from "react";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 1v12M1 7h12" />
    </svg>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{q}</span>
        <span className={`faq-icon${open ? " open" : ""}`}><PlusIcon /></span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

export default function CollectionSEO({ meta }) {
  if (!meta.description && (!meta.faqs || meta.faqs.length === 0)) return null;

  return (
    <section className="coll-seo">
      <div className="coll-seo-inner">
        {/* Left: editorial image */}
        <div className="coll-seo-img">
          <img src={meta.image} alt={meta.heading} />
        </div>

        {/* Right: editorial copy + FAQs */}
        <div className="coll-seo-copy">
          <h2 className="coll-seo-heading">{meta.heading}</h2>

          {meta.description && <p className="coll-seo-text">{meta.description}</p>}
          {meta.description2 && <p className="coll-seo-text">{meta.description2}</p>}
          {meta.description3 && <p className="coll-seo-text">{meta.description3}</p>}

          {meta.faqs?.length > 0 && (
            <>
              <h3 className="coll-seo-faq-title">{meta.faqTitle}</h3>
              <div className="faq-list">
                {meta.faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
