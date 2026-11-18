import { trust } from "@/lib/data";
import { icons } from "./Icons";

export default function TrustBar() {
  return (
    <section className="trust">
      {trust.map((t) => {
        const Icon = icons[t.icon];
        return (
          <div key={t.label} className="trust-item head">
            <Icon width={28} height={28} />
            <span>{t.label}</span>
          </div>
        );
      })}
    </section>
  );
}
