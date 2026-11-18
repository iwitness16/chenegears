export const metadata = { title: "Warranty — Chêne Gear" };

export default function WarrantyPage() {
  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <p className="static-label">Built to last</p>
          <h1 className="static-heading">Lifetime Warranty</h1>
          <p className="static-text static-text--max">Every 2S Wader ships with a lifetime warranty against manufacturer defects — repaired in-house, not shipped to a third party.</p>
        </div>
      </section>
      <section className="static-section">
        <div className="static-section-inner static-prose">
          <h2>What's covered</h2>
          <ul>
            <li>Delamination of the waterproof/breathable membrane</li>
            <li>Seam failures on taped or stitched seams</li>
            <li>Zipper failures under normal use</li>
            <li>Bootie separation or sole delamination</li>
            <li>Hardware failures (buckles, D-rings, suspender clips)</li>
          </ul>

          <h2>What's not covered</h2>
          <ul>
            <li>Damage from improper care (machine washing, bleach, high heat)</li>
            <li>Punctures, cuts, or abrasion damage from field use</li>
            <li>Normal wear over extended use</li>
            <li>Modifications made by anyone other than Chêne Gear</li>
          </ul>

          <h2>How to file a claim</h2>
          <ol>
            <li>Email <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a> with photos and your original order number.</li>
            <li>We'll assess the damage and confirm coverage within 2 business days.</li>
            <li>Ship your waders to our Memphis facility using the prepaid label we provide.</li>
            <li>We'll repair and return them within <strong>7 business days</strong> of receipt.</li>
          </ol>

          <h2>Non-wader products</h2>
          <p>All other Chêne Gear products carry a <strong>1-year warranty</strong> against manufacturer defects. Same process — email us with photos and your order number.</p>
        </div>
      </section>
    </div>
  );
}
