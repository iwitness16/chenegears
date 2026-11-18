import { founders as f } from "@/lib/data";
import Media from "./Media";

export default function FoundersReserve() {
  return (
    <section className="founders">
      <div className="founders-copy">
        <p className="eyebrow head">{f.eyebrow}</p>
        <h2 className="founders-title head">{f.title}</h2>
        {f.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
        <a href={f.href} className="btn btn-tan head">{f.cta}</a>
      </div>
      <Media src={f.image} alt={f.title} className="founders-img" />
    </section>
  );
}
