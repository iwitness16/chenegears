import { community } from "@/lib/data";
import Media from "./Media";

export default function Community() {
  return (
    <section className="community">
      {community.map((c) => (
        <a key={c.label} href={c.href} className="community-card">
          <Media src={c.image} alt={c.label} className="community-img" />
          <span className="community-label head">{c.label}</span>
        </a>
      ))}
    </section>
  );
}
