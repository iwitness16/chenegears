export default function Stars({ rating = 5, count }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      <span className="stars-row">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= rating ? "on" : "off"}>★</span>
        ))}
      </span>
      {count != null && <span className="stars-count">({count})</span>}
    </span>
  );
}
