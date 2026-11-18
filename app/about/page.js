export const metadata = {
  title: "About Us — Chêne Gear",
  description: "Born on the water, built in the field. The story behind Chêne Gear.",
};

export default function AboutPage() {
  return (
    <div className="static-page">

      {/* Hero */}
      <section className="static-hero static-hero--dark">
        <div className="static-hero-inner">
          <p className="static-eyebrow">Since 2021</p>
          <h1 className="static-hero-title">BUILT BETTER®</h1>
          <p className="static-hero-sub">
            Born on the water. Built in the field. Chêne Gear exists because serious hunters
            deserve gear built without compromise.
          </p>
        </div>
        <div className="static-hero-img">
          <img
            src="https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-BRN-2S_Wader-Hollowbody-03736.webp?v=1783021399"
            alt="Waterfowl hunter in flooded timber"
          />
        </div>
      </section>

      {/* Origin story */}
      <section className="static-section static-section--light">
        <div className="static-section-inner static-section-inner--split">
          <div className="static-copy">
            <p className="static-label">Our story</p>
            <h2 className="static-heading">Started with a wader that wasn't good enough</h2>
            <p className="static-text">
              In 2021, Chêne was born out of a single frustration: every wader on the market
              was either overpriced for the quality or under-built for the conditions. We set
              out to build the one we always wanted — a 5-layer waterproof/breathable wader
              with a lifetime warranty, repaired in-house with a goal of returning it to the
              field within 7 business days.
            </p>
            <p className="static-text">
              The 2S Wader became the foundation. Everything we've built since — jackets,
              boots, fleece, apparel — follows the same standard: fewer seams, better
              materials, real durability.
            </p>
          </div>
          <div className="static-img-block">
            <img
              src="https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11000-CYP-Hydro_Lok_Shell_Jacket-Hollowbody-00521.webp?v=1783014793"
              alt="Chêne Gear jacket in the field"
            />
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="static-section">
        <div className="static-section-inner">
          <p className="static-label static-label--center">What we stand for</p>
          <h2 className="static-heading static-heading--center">The Chêne standard</h2>
          <div className="static-values-grid">
            {[
              { icon: "◈", title: "No compromises on materials", text: "We source the best fabrics available — 5-layer shells, British Millerain waxed canvas, Comfort Colors cotton. If it doesn't hold up in the field, it doesn't ship." },
              { icon: "⟳", title: "Lifetime warranty, in-house repair", text: "Every wader ships with a lifetime warranty. When something goes wrong, we fix it ourselves — not by a third party — with a 7 business-day turnaround goal." },
              { icon: "▲", title: "Built for the hunt, not the shelf", text: "Every piece is designed with actual hunters. We test in flooded timber, marsh blinds, and open fields before anything goes live." },
              { icon: "○", title: "Direct relationship with hunters", text: "No retail markup, no distributor margin. We sell direct so the savings stay where they belong — in the quality of the gear." },
            ].map((v) => (
              <div key={v.title} className="static-value-card">
                <span className="static-value-icon">{v.icon}</span>
                <h3 className="static-value-title">{v.title}</h3>
                <p className="static-value-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="static-section static-section--dark">
        <div className="static-section-inner">
          <p className="static-label static-label--tan">Find us in the field</p>
          <h2 className="static-heading static-heading--white">Our locations</h2>
          <div className="static-locations-grid">
            {[
              { name: "Memphis HQ",     address: "1835 Nonconnah Blvd, Suite 173\nMemphis, TN 38132",   hours: "Mon–Fri 8–5 · Sat 10–4" },
              { name: "Stuttgart Store",address: "2303 Highway 63 N\nStuttgart, AR 72160",              hours: "Mon–Fri 10–6 · Sat 10–4" },
              { name: "Atlanta Store",  address: "2391 Peachtree Road NE, Suite 203\nAtlanta, GA 30305",hours: "Mon–Sat 10–7 · Sun 12–5" },
            ].map((l) => (
              <div key={l.name} className="static-location-card">
                <h3 className="static-location-name">{l.name}</h3>
                <p className="static-location-address">{l.address}</p>
                <p className="static-location-hours">{l.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="static-cta">
        <div className="static-cta-inner">
          <h2 className="static-cta-heading">Ready to gear up?</h2>
          <p className="static-cta-sub">Start with the wader that started it all.</p>
          <div className="static-cta-btns">
            <a href="/collections/waders" className="btn btn-tan">SHOP WADERS</a>
            <a href="/contact" className="btn btn-outline">CONTACT US</a>
          </div>
        </div>
      </section>

    </div>
  );
}
