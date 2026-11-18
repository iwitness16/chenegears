import { fieldReviews } from "@/lib/data";
import Scroller from "./Scroller";
import Stars from "./Stars";
import { CheckIcon } from "./Icons";

export default function FromTheField() {
  return (
    <Scroller title="From the field">
      {fieldReviews.map((r) => (
        <article key={r.name} className="review">
          <h3 className="review-product head">{r.product}</h3>
          <Stars rating={r.rating} />
          <p className="review-text">“{r.text}”</p>
          <div className="review-foot">
            <strong>{r.name}</strong>
            <span className="verified"><CheckIcon width={18} height={18} /> Verified buyer</span>
          </div>
        </article>
      ))}
    </Scroller>
  );
}
