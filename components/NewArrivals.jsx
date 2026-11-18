import { newArrivals } from "@/lib/data";
import Media from "./Media";

export default function NewArrivals() {
  return (
    <section className="arrivals">
      <h2 className="arrivals-title head">New arrivals</h2>
      <div className="grid-4">
        {newArrivals.map((p) => (
          <a key={p.name} href={p.href} className="arrival">
            <div className="arrival-img">
              <span className="badge head">New</span>
              <Media src={p.image} alt={p.name} fit="contain" />
            </div>
            <h3 className="arrival-name head">{p.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
