export const metadata = { title: "Refund Policy — Chêne Gear" };

export default function RefundPage() {
  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <h1 className="static-heading">Refund Policy</h1>
        </div>
      </section>
      <section className="static-section">
        <div className="static-section-inner static-prose">
          <h2>Eligibility</h2>
          <p>Refunds are available on unworn, unwashed items returned within 30 days of delivery in original condition with tags attached.</p>
          <h2>Refund method</h2>
          <p>Refunds are issued to the original payment method within 5 business days of us receiving the returned item. Shipping costs are non-refundable unless the return is due to our error.</p>
          <h2>Partial refunds</h2>
          <p>Items returned in a condition that prevents resale may receive a partial refund at our discretion.</p>
          <h2>Defective items</h2>
          <p>If you receive a defective item, contact us within 7 days of delivery for a full refund or replacement at no additional cost.</p>
          <h2>How to request</h2>
          <p>Email <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a> with your order number and a description of the issue. We'll respond within 1 business day.</p>
        </div>
      </section>
    </div>
  );
}
