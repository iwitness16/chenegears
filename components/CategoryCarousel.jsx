import { categories } from "@/lib/data";
import Scroller from "./Scroller";
import Media from "./Media";

export default function CategoryCarousel() {
  return (
    <Scroller title="Shop by category">
      {categories.map((c) => (
        <a key={c.label} href={c.href} className="cat-card">
          <Media src={c.image} alt={c.label} className="cat-img" />
          <span className="cat-label head">{c.label}</span>
        </a>
      ))}
    </Scroller>
  );
}
