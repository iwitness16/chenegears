export const metadata = { title: "Privacy Policy — Chêne Gear" };

export default function PrivacyPage() {
  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <h1 className="static-heading">Privacy Policy</h1>
          <p className="static-text">Last updated: November 2026</p>
        </div>
      </section>
      <section className="static-section">
        <div className="static-section-inner static-prose">
          <p>Chêne Gear ("we", "us", "our") operates chenegear.com. This policy explains what information we collect, how we use it, and your rights regarding it.</p>
          <h2>Information we collect</h2>
          <ul>
            <li><strong>Order information</strong> — name, email, phone, shipping address, payment method type. We do not store full payment card numbers.</li>
            <li><strong>Usage data</strong> — pages visited, browser type, referring URL. Collected via analytics tools.</li>
            <li><strong>Communications</strong> — emails or messages you send us.</li>
          </ul>
          <h2>How we use your information</h2>
          <ul>
            <li>Process and fulfil your orders</li>
            <li>Send order confirmation and shipping updates</li>
            <li>Respond to customer support inquiries</li>
            <li>Send marketing emails (you can unsubscribe at any time)</li>
            <li>Improve our website and product range</li>
          </ul>
          <h2>Sharing</h2>
          <p>We do not sell your personal information. We share data only with service providers necessary to operate our business (e.g. shipping carriers, email providers). All third parties are bound by confidentiality agreements.</p>
          <h2>Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a>.</p>
          <h2>Contact</h2>
          <p>Questions about this policy? Email <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a>.</p>
        </div>
      </section>
    </div>
  );
}
