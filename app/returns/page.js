export const metadata = { title: "Returns & Exchanges — Chêne Gear" };

export default function ReturnsPage() {
  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <h1 className="static-heading">Returns & Exchanges</h1>
          <p className="static-text static-text--max">We stand behind what we build. If something isn't right, we'll make it right.</p>
        </div>
      </section>
      <section className="static-section">
        <div className="static-section-inner static-prose">
          <h2>Return window</h2>
          <p>Items may be returned within <strong>30 days</strong> of delivery for a full refund, provided they are unworn, unwashed, and in original packaging with all tags attached.</p>

          <h2>How to start a return</h2>
          <ol>
            <li>Email <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a> with your order number and reason for return.</li>
            <li>We'll send a prepaid return label within 1 business day.</li>
            <li>Drop the package at any UPS location.</li>
            <li>Refunds are issued within 5 business days of receiving the item.</li>
          </ol>

          <h2>Exchanges</h2>
          <p>Need a different size or color? We process exchanges the same way as returns. Just note the item you'd like in your email and we'll hold it while your return is in transit.</p>

          <h2>Wader repairs</h2>
          <p>Waders covered by our lifetime warranty are repaired, not returned. Email us or start a warranty claim and we'll arrange everything. Our in-house repair team targets a 7-business-day turnaround.</p>

          <h2>Non-returnable items</h2>
          <p>Final sale items, gift cards, and items marked "non-returnable" at the time of purchase cannot be returned.</p>
        </div>
      </section>
    </div>
  );
}
