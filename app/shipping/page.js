export const metadata = { title: "Shipping — Chêne Gear" };

export default function ShippingPage() {
  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <h1 className="static-heading">Shipping</h1>
          <p className="static-text static-text--max">Everything you need to know about how your gear gets to you.</p>
        </div>
      </section>
      <section className="static-section">
        <div className="static-section-inner static-prose">
          <h2>Domestic shipping (United States)</h2>
          <table className="static-table">
            <thead><tr><th>Method</th><th>Estimated delivery</th><th>Cost</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>5–7 business days</td><td>Free on orders over $150 · $9.99 otherwise</td></tr>
              <tr><td>Express</td><td>2–3 business days</td><td>$19.99</td></tr>
            </tbody>
          </table>

          <h2>Processing time</h2>
          <p>Orders are processed Monday–Friday, excluding US federal holidays. Most orders ship within 1–2 business days of placement. During peak season (October–January) processing may take up to 3 business days.</p>

          <h2>Tracking</h2>
          <p>A tracking number will be emailed to you once your order ships. Allow up to 24 hours for tracking information to update after you receive the notification.</p>

          <h2>International shipping</h2>
          <p>We currently ship to the contiguous United States only. International shipping is not available at this time. Check back — we're working on it.</p>

          <h2>Questions?</h2>
          <p>Email <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a> or message us on <a href="https://wa.me/13312241929">WhatsApp</a>.</p>
        </div>
      </section>
    </div>
  );
}
