import Link from "next/link";

export const metadata = {
  title: "All Collections — Chêne Gear",
  description:
    "Browse all Chêne Gear collections: waders, jackets, boots, packs, and accessories built for the wild.",
};

const collections = [
  {
    title: "Waders",
    slug: "waders",
    desc: "Stockingfoot, bootfoot, and chest waders for every waterfowl hunter.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-BRN-2S_Wader-Hollowbody-03736.webp?v=1783021399",
  },
  {
    title: "Jackets",
    slug: "jackets",
    desc: "Waterproof shells, insulated layers, and waxed canvas for every condition.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11000-CYP-Hydro_Lok_Shell_Jacket-Hollowbody-00521.webp?v=1783014793",
  },
  {
    title: "Vests",
    slug: "vests",
    desc: "Wind-resistant and insulated vests for active hunting days.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN4000-MOTS-Scout_Vest-Hollowbody-00102.webp?v=1783013256",
  },
  {
    title: "Bibs",
    slug: "bibs",
    desc: "Waterproof field bibs that pair with Hydro-Lok shells.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11500-CYP-Hydro_lok_Field_Bib-Hollowbody-03523.webp?v=1783014863",
  },
  {
    title: "Pants",
    slug: "pants",
    desc: "Field pants and insulated wader pants for all-day mobility.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN3100-MOOB-Field_Pant-Hollowbody-04286.webp?v=1783013140",
  },
  {
    title: "Base Layers",
    slug: "base-layers",
    desc: "Technical fleece and merino wool for warmth without bulk.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN12100-MOFL-Sixty_Series_Technical_Fleece_Half_Zip_with_Hood-Hollowbody-01016.webp?v=1783014903",
  },
  {
    title: "Footwear",
    slug: "footwear",
    desc: "Rubber boots built for the marsh, the timber, and the field.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17010-BRN-Scout_Boot-Tabletop-00093.webp?v=1783016750",
  },
  {
    title: "T-Shirts",
    slug: "t-shirts",
    desc: "Garment-dyed graphic tees for life outside the blind.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN8002-IVY-Back.png?v=1728567115",
  },
  {
    title: "Hoodies",
    slug: "hoodies",
    desc: "Performance and lifestyle hoodies built to wear every day.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN2000-HBK-Performance_Hoodie-Hollowbody-01181_ab9fb5fd-4c98-4444-bc0f-95433241ded5.webp?v=1783012548",
  },
  {
    title: "Headwear",
    slug: "headwear",
    desc: "Waxed cotton, rope patch, and performance caps.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN7060-BUC-Front.png?v=1733941111",
  },
  {
    title: "Accessories",
    slug: "accessories",
    desc: "Bags, packs, socks, and gear built to match the rest of the system.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/delta-pack-cypress-three-quarter.png?v=1793205584",
  },
  {
    title: "Shop by Activity",
    slug: "waterfowl",
    desc: "Everything you need for the waterfowl blind — curated in one place.",
    img: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOBM-2S_Wader-Hollowbody-03736.webp?v=1783021399",
  },
];

export default function CollectionsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Collections</span>
          </nav>
          <h1 className="page-hero-title serif">All Collections</h1>
          <p className="page-hero-sub">
            Premium outdoor gear engineered for the wild.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="collections-index">
        <div className="container">
          <div className="coll-grid">
            {collections.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="coll-card"
                aria-label={`Shop ${col.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={col.img} alt={col.title} loading="lazy" />
                <div className="coll-card-overlay" aria-hidden="true" />
                <div className="coll-card-label">
                  <strong>{col.title}</strong>
                  <p>{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
