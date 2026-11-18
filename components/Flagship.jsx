import { flagship as f } from "@/lib/data";
import Media from "./Media";
import Stars from "./Stars";

export default function Flagship() {
  return (
    <section className="flagship">
      <div className="flagship-img"><Media src={f.image} alt={f.title} fit="contain" /></div>
      <div className="flagship-copy">
        <p className="eyebrow head">{f.eyebrow}</p>
        <h2 className="flagship-title head">{f.title}</h2>
        <p className="flagship-tag">{f.tagline}</p>
        <p className="flagship-text">{f.text}</p>
        <div className="swatches lg">
          {f.swatches.map((c, i) => (
            <span key={i} className={`swatch ${i === 0 ? "selected" : ""}`} style={{ background: c }} />
          ))}
        </div>
        <div className="flagship-price">
          <strong>{f.price}</strong>
          <Stars rating={f.rating} count={f.reviews} />
        </div>
        <a href={f.href} className="btn btn-tan head">{f.cta}</a>
      </div>
    </section>
  );
}
