"use client";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import Media from "./Media";

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      {heroSlides.map((s, idx) => (
        <div key={idx} className={`hero-slide ${idx === i ? "active" : ""}`} aria-hidden={idx !== i}>
          <Media src={s.image} alt="" className="hero-media" />
          <div className="hero-shade" />
          <div className="hero-content">
            {s.eyebrow && <p className="hero-eyebrow">{s.eyebrow}</p>}
            <h1 className="hero-title head">{s.title}</h1>
            {s.sub && <p className="hero-sub">{s.sub}</p>}
            <div className="hero-btns">
              {s.buttons.map((b) => (
                <a key={b.label} href={b.href} className={`btn btn-${b.style} head`}>{b.label}</a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
