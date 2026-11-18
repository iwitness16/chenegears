export const metadata = { title: "Terms of Service — Chêne Gear" };

export default function TermsPage() {
  return (
    <div className="static-page">
      <section className="static-section-header">
        <div className="static-section-inner">
          <h1 className="static-heading">Terms of Service</h1>
          <p className="static-text">Last updated: November 2026</p>
        </div>
      </section>
      <section className="static-section">
        <div className="static-section-inner static-prose">
          <p>By accessing chenegear.com and placing an order, you agree to these terms.</p>
          <h2>Orders</h2>
          <p>All orders are subject to acceptance and product availability. We reserve the right to cancel any order and issue a full refund at our discretion.</p>
          <h2>Pricing</h2>
          <p>Prices are listed in USD. We reserve the right to change prices at any time. The price at the time of your order is final.</p>
          <h2>Intellectual property</h2>
          <p>All content on this site — text, images, logos, designs — is the property of Chêne Gear and may not be reproduced without written permission.</p>
          <h2>Limitation of liability</h2>
          <p>Chêne Gear is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website beyond the value of the product purchased.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Tennessee, USA.</p>
          <h2>Contact</h2>
          <p>Questions? Email <a href="mailto:chenegears@gmail.com">chenegears@gmail.com</a>.</p>
        </div>
      </section>
    </div>
  );
}
