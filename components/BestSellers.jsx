import Link from "next/link";
import { bestSellers } from "@/lib/data";
import Media from "./Media";
import Stars from "./Stars";

export default function BestSellers() {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="h2 head">Where most hunters start</h2>
        <Link href="/collections/waders" className="link-underline head">
          Shop best sellers
        </Link>
      </div>
      <div className="grid-4">
        {bestSellers.map((p) => (
          <Link key={p.name} href={p.href ?? `/products/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="product">
            <div className="product-img">
              <span className="badge head">Best seller</span>
              <Media src={p.image} alt={p.name} fit="contain" />
            </div>
            <div className="swatches">
              {p.swatches.map((c, i) => (
                <span key={i} className="swatch" style={{ background: c }} />
              ))}
              {p.more && <span className="swatch-more">+{p.more}</span>}
            </div>
            <h3 className="product-name head">{p.name}</h3>
            <p className="product-desc">{p.desc}</p>
            <Stars rating={p.rating} count={p.reviews} />
            <p className="product-price">{p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
