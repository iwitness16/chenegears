import { builtBetter as b } from "@/lib/data";
import Media from "./Media";

export default function BuiltBetter() {
  return (
    <section className="built">
      <div className="built-copy">
        <p className="eyebrow head">{b.eyebrow}</p>
        <h2 className="built-title head">{b.title}</h2>
        <p>{b.text}</p>
        <a href={b.href} className="btn btn-outline head">{b.cta}</a>
      </div>
      <div className="stores">
        {b.stores.map((s) => (
          <div key={s.name} className="store">
            <Media src={s.image} alt={s.name} className="store-img" />
            <div className="store-body">
              <h3 className="store-name head">{s.name}</h3>
              <p>{s.address.map((l) => (<span key={l}>{l}<br /></span>))}</p>
              <p>{s.hours.map((l) => (<span key={l}>{l}<br /></span>))}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
