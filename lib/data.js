// ALL editable content lives here. Rebrand by editing this file + public/images.
export const brand = { name: "Chêne" };

export const nav = [
  "Waders", "Tops & Layers", "Pants & Bibs", "Footwear",
  "Apparel", "Accessories", "Youth", "Shop by Activity",
];

export const navMenus = {
  "Waders": {
    columns: [
      {
        heading: "Adult",
        links: [
          { label: "2S Wader",      href: "/collections/waders" },
          { label: "2S Wading Pant",href: "/collections/pants" },
        ],
      },
      {
        heading: "Youth",
        links: [
          { label: "Youth 2S Wader", href: "/collections/youth", highlight: true },
        ],
      },
      {
        heading: "Care",
        links: [
          { label: "Wader Care Kit", href: "/collections/accessories" },
        ],
      },
      {
        heading: null,
        shopAll: { label: "Shop All Waders", href: "/collections/waders" },
        links: [],
      },
    ],
    featured: [
      {
        image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOBM-2S_Wader-On-Model-03694.webp?v=1783021400",
        title: "2S Wader",
        subtitle: "Waterproof, breathable, and mobile.",
        href: "/collections/waders",
      },
    ],
  },

  "Tops & Layers": {
    columns: [
      {
        heading: "Outerwear",
        links: [
          { label: "Jackets",   href: "/collections/jackets" },
          { label: "Vests",     href: "/collections/vests" },
          { label: "Hoodies",   href: "/collections/hoodies" },
          { label: "Sweaters",  href: "/collections/sweaters" },
        ],
        shopAll: { label: "Shop All Tops", href: "/collections/tops-layers" },
      },
      {
        heading: "Layers",
        links: [
          { label: "Mid Layers",         href: "/collections/base-layers" },
          { label: "Base Layers",        href: "/collections/base-layers" },
          { label: "Base Layer Tops",    href: "/collections/base-layers" },
          { label: "Base Layer Bottoms", href: "/collections/base-layers" },
        ],
      },
      {
        heading: "Shirts",
        links: [
          { label: "Long Sleeve",  href: "/collections/t-shirts" },
          { label: "Short Sleeve", href: "/collections/t-shirts" },
        ],
        shopAll: { label: "Shop All Shirts", href: "/collections/t-shirts" },
      },
      {
        heading: "Collections",
        links: [
          { label: "Sixty Series Fleece", href: "/collections/base-layers" },
          { label: "Scout",               href: "/collections/jackets" },
          { label: "Flyweigh Insulated",  href: "/collections/jackets" },
          { label: "Waxed Canvas",        href: "/collections/jackets" },
          { label: "Vale 105 Synthetic",  href: "/collections/base-layers" },
        ],
      },
    ],
    featured: [
      {
        image: "/images/hero-1.jpg",
        title: "All-New Forty Series Hooded Jacket",
        subtitle: "The go-to workhorse built to handle most of the season.",
        href: "/collections/jackets",
      },
      {
        image: "/images/hero-2.jpg",
        title: "All-New Flux Jacket",
        subtitle: "Warm when you need it breathable when you don't.",
        href: "/collections/jackets",
      },
    ],
  },

  "Pants & Bibs": {
    columns: [
      {
        heading: "Pants",
        links: [
          { label: "Hunting Pants",       href: "/collections/pants" },
          { label: "Wading Pants",        href: "/collections/pants" },
          { label: "Insulated Pants",     href: "/collections/pants" },
          { label: "Base Layer Bottoms",  href: "/collections/base-layers" },
        ],
        shopAll: { label: "Shop All Pants", href: "/collections/pants" },
      },
      {
        heading: "Bibs",
        links: [
          { label: "Hunting Bibs", href: "/collections/bibs" },
        ],
      },
      {
        heading: "Featured",
        links: [
          { label: "2S Wading Pant",           href: "/collections/pants",      highlight: true },
          { label: "Sherpa Fleece Wader Pant",  href: "/collections/pants",      highlight: true },
          { label: "Bonded Fleece Field Pant",  href: "/collections/pants",      highlight: true },
          { label: "Field Pant",                href: "/collections/pants",      highlight: true },
          { label: "Merino Bottoms",            href: "/collections/base-layers",highlight: true },
        ],
      },
    ],
    featured: [
      {
        image: "/images/hero-1.jpg",
        title: "All-New Scout Pant",
        subtitle: "Lightweight, stretch, all-season.",
        href: "/collections/pants",
      },
      {
        image: "/images/hero-2.jpg",
        title: "Hydro-Lok Field Bib",
        subtitle: "Waterproof where you sit. Tough where you walk.",
        href: "/collections/bibs",
      },
    ],
  },

  "Footwear": {
    columns: [
      {
        heading: "Boots",
        links: [
          { label: "Waterproof Boots", href: "/collections/footwear" },
          { label: "Insulated Boots",  href: "/collections/footwear", highlight: true },
          { label: "Leather Boots",    href: "/collections/footwear", highlight: true },
          { label: "Rubber Boots",     href: "/collections/footwear" },
        ],
      },
      {
        heading: "Base",
        links: [
          { label: "Socks", href: "/collections/accessories" },
        ],
      },
      {
        heading: null,
        shopAll: { label: "Shop All Footwear", href: "/collections/footwear" },
        links: [],
      },
    ],
    featured: [
      {
        image: "/images/hero-1.jpg",
        title: "Scout Deck Boot",
        subtitle: "Waterproof, easy on and off.",
        href: "/collections/footwear",
      },
      {
        image: "/images/hero-2.jpg",
        title: "Grove Boot",
        subtitle: "Leather boot that breaks in, not down.",
        href: "/collections/footwear",
      },
    ],
  },

  "Apparel": {
    columns: [
      {
        heading: "Hats",
        links: [
          { label: "Caps",    href: "/collections/headwear" },
          { label: "Beanies", href: "/collections/headwear" },
        ],
        shopAll: { label: "Shop All Hats", href: "/collections/headwear" },
      },
      {
        heading: "Tees",
        links: [
          { label: "Short Sleeve", href: "/collections/t-shirts" },
          { label: "Long Sleeve",  href: "/collections/t-shirts" },
        ],
        shopAll: { label: "Shop All Shirts", href: "/collections/t-shirts" },
      },
      {
        heading: "Hoodies & Sweatshirts",
        links: [
          { label: "Hoodies",   href: "/collections/hoodies" },
          { label: "Sweaters",  href: "/collections/sweaters" },
        ],
      },
      {
        heading: "Merch",
        links: [
          { label: "Stickers & Decals", href: "/collections/accessories" },
          { label: "License Plates",    href: "/collections/accessories" },
          { label: "Yeti",              href: "/collections/accessories" },
        ],
      },
    ],
    shopAllBottom: { label: "Shop All Apparel", href: "/collections/apparel" },
    featured: [
      {
        image: "/images/hero-1.jpg",
        title: "Your Go-To Staples",
        subtitle: "Everyday gear that carries the mark.",
        href: "/collections/apparel",
      },
      {
        image: "/images/hero-2.jpg",
        title: "All-New Crossover Hoodie",
        subtitle: "A classic layer made more capable.",
        href: "/collections/hoodies",
      },
    ],
  },

  "Accessories": {
    columns: [
      {
        heading: "Gloves",
        links: [
          { label: "Work Gloves",      href: "/collections/accessories" },
          { label: "Insulated Gloves", href: "/collections/accessories", highlight: true },
          { label: "Liner Gloves",     href: "/collections/accessories", highlight: true },
        ],
        shopAll: { label: "Shop All Gloves", href: "/collections/accessories" },
      },
      {
        heading: "Bags",
        links: [
          { label: "Bags & Backpacks", href: "/collections/accessories" },
        ],
      },
      {
        heading: "Storage",
        links: [
          { label: "Gun Storage", href: "/collections/accessories" },
        ],
      },
      {
        heading: "Face & Neck",
        links: [
          { label: "Gaiters & Face Coverings", href: "/collections/accessories" },
        ],
      },
      {
        heading: null,
        shopAll: { label: "Shop All Accessories", href: "/collections/accessories" },
        links: [],
      },
    ],
    featured: [
      {
        image: "/images/hero-1.jpg",
        title: "Bags & Backpacks",
        subtitle: "Holds the load. Takes the abuse.",
        href: "/collections/accessories",
      },
    ],
  },

  "Youth": {
    columns: [
      {
        heading: "Apparel",
        links: [
          { label: "Jackets",   href: "/collections/youth" },
          { label: "T-Shirts",  href: "/collections/youth" },
          { label: "Pants",     href: "/collections/youth" },
        ],
      },
      {
        heading: "Waders",
        links: [
          { label: "Youth 2S Wader", href: "/collections/youth" },
        ],
      },
      {
        heading: "Footwear",
        links: [
          { label: "Youth Footwear", href: "/collections/youth" },
        ],
      },
      {
        heading: null,
        shopAll: { label: "Shop All Youth", href: "/collections/youth" },
        links: [],
      },
    ],
    featured: [
      {
        image: "/images/hero-1.jpg",
        title: "Youth 2S Wader",
        subtitle: "Built like ours, sized for them.",
        href: "/collections/youth",
      },
      {
        image: "/images/hero-2.jpg",
        title: "Youth Wader Program",
        subtitle: "One pair now. Easy upgrades later.",
        href: "/collections/youth",
      },
    ],
  },

  "Shop by Activity": {
    activities: [
      {
        image: "/images/hero-1.jpg",
        title: "Waterfowl",
        links: [
          { label: "Outerwear",     href: "/collections/waterfowl" },
          { label: "Bottoms",       href: "/collections/waterfowl" },
          { label: "Hunting Boots", href: "/collections/waterfowl" },
        ],
      },
      {
        image: "/images/hero-2.jpg",
        title: "Turkey",
        links: [
          { label: "Outerwear",     href: "/collections/turkey" },
          { label: "Bottoms",       href: "/collections/turkey" },
          { label: "Hunting Boots", href: "/collections/turkey" },
        ],
      },
      {
        image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOBM-2S_Wader-On-Model-03694.webp?v=1783021400",
        title: "Apparel",
        links: [
          { label: "Hats",     href: "/collections/headwear",  highlight: true },
          { label: "T-Shirts", href: "/collections/t-shirts",  highlight: true },
          { label: "Hoodies",  href: "/collections/hoodies",   highlight: true },
        ],
      },
    ],
  },
};

export const announcements = [
  { text: "Just landed: all-new camp shoe", linkText: "Shop now", href: "#" },
  { text: "Free shipping on orders $100+" },
];

export const heroSlides = [
  {
    image: "/images/hero-1.jpg",
    eyebrow: "Chêne x GUNNER - Built Better, Together",
    title: "For the dogs that make it all worth it",
    buttons: [{ label: "Shop the collab", href: "#", style: "tan" }],
  },
  {
    image: "/images/hero-2.jpg",
    title: "Built for the hunts that break everything else",
    sub: "Waders, jackets, and boots built by waterfowl hunters.",
    buttons: [
      { label: "Shop waders", href: "#", style: "tan" },
      { label: "Shop best sellers", href: "#", style: "white" },
    ],
  },
];

export const trust = [
  { icon: "shield", label: "Lifetime wader warranty" },
  { icon: "wrench", label: "In-house wader repair" },
  { icon: "exchange", label: "Free exchanges for 90 days" },
  { icon: "truck", label: "Free shipping over $100" },
];

export const categories = [
  { label: "Waders",       image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOBM-2S_Wader-On-Model-03694.webp?v=1783021400",           href: "/collections/waders" },
  { label: "Jackets",      image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11000-CYP-Hydro_Lok_Shell_Jacket-Hollowbody-00521.webp?v=1783014793", href: "/collections/jackets" },
  { label: "Footwear",     image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17010-BRN-Scout_Boot-Tabletop-00093.webp?v=1783016750",             href: "/collections/footwear" },
  { label: "Pants & Bibs", image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11500-CYP-Hydro_lok_Field_Bib-Hollowbody-03523.webp?v=1783014863",  href: "/collections/pants" },
  { label: "Tees & Hats",  image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN8002-IVY-Back.png?v=1728567115",                                   href: "/collections/t-shirts" },
];

// swatches are CSS background colors
export const flagship = {
  eyebrow: "The Flagship",
  title: "The 2S Wader",
  tagline: "Waterproof, lightweight, and mobile.",
  text: "Lifetime warranty. Repaired in-house, with a goal of getting you back in the field within 7 business days.",
  image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOBM-2S_Wader-On-Model-03694.webp?v=1783021400",
  swatches: ["#474744", "#3f2a1f", "#8a7d62", "#6f6a52", "#8b7f55", "#59603f"],
  price: "$1,150",
  rating: 5,
  reviews: 229,
  cta: "Shop the 2S Wader",
  href: "#",
};

export const bestSellers = [
  { name: "Scout Deck Boot", desc: "Built for wet workdays", price: "$120.00", rating: 5, reviews: 343,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17010-BRN-Scout_Boot-Tabletop-00093.webp?v=1783016750",
    href: "/products/scout-deck-boot",
    swatches: ["#3f2a1f", "#474744", "#8a7d62", "#d8c9a8", "#59603f"], more: 3 },
  { name: "Grove Boot", desc: "Looks that are built to last", price: "$210.00", rating: 4, reviews: 152,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17200-SDL-Grove_Boot-Tabletop-01033.webp?v=1783015348",
    href: "/products/grove-boot",
    swatches: ["#a0601f", "#4a3020"] },
  { name: "Sixty Series Check Fleece Half Zip with Hood", desc: "Comfortable warmth that spans the season", price: "$160.00", rating: 5, reviews: 82,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN12100-MOFL-Sixty_Series_Technical_Fleece_Half_Zip_with_Hood-Hollowbody-01016.webp?v=1783014903",
    href: "/products/sixty-series-zip-with-hood",
    swatches: ["#8a8a8a", "#7d6b4a", "#3f2a1f", "#000", "#5c5a3a"] },
  { name: "Scout Vest", desc: "Windproof comfort with layering versatility", price: "$200.00", rating: 5, reviews: 98,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN4000-MOTS-Scout_Vest-Hollowbody-00102.webp?v=1783013256",
    href: "/products/scout-vest",
    swatches: ["#6b6a45", "#4f6b3a", "#8a7d62", "#000", "#7a7355"], more: 4 },
];

export const founders = {
  eyebrow: "New this season",
  title: "Founders' Reserve",
  paragraphs: [
    "Inspired by the traditions that shaped our founders and built with the world's finest waxed cotton canvas, Founders' Reserve is designed to wear in, not wear out.",
    "Four pieces built from 11 oz British Millerain waxed cotton canvas, produced in Northern England since 1880: the Waxed Wading Jacket, Waxed Down Vest, Waxed Field Bib, and Waxed Jac-Shirt. Built for flooded timber, pit blinds, and dry fields, and made to be rewaxed and repaired rather than replaced.",
  ],
  cta: "Shop Founders' Reserve",
  href: "/collections/jackets",
  image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15003-DKO-Founders__Reserve_Waxed_Wading_Jacket-Hollowbody-01235.webp?v=1783352237",
};

export const newArrivals = [
  { name: "Founders' Reserve Waxed Jac-Shirt",      image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15002-FKH-Founders__Reserve_Waxed_Jac-Shirt-Hollowbody-00755.webp?v=1789590079",      href: "/products/founders-reserve-waxed-jac-shirt" },
  { name: "Founders' Reserve Waxed Bib",             image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15001-DKO-Founders__Reserve_Waxed_Field_Bib-Hollowbody-02346.webp?v=1783352195",      href: "/products/founders-reserve-waxed-bib" },
  { name: "Founders' Reserve Waxed Down Vest",       image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15004-FKH-Founders__Reserve_Waxed_Down_Vest-Hollowbody-00419.webp?v=1783352260",      href: "/products/founders-reserve-waxed-down-vest" },
  { name: "Founders' Reserve Waxed Wading Jacket",   image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15003-DKO-Founders__Reserve_Waxed_Wading_Jacket-Hollowbody-01235.webp?v=1783352237",  href: "/products/founders-reserve-waxed-wading-jacket" },
];

export const fieldReviews = [
  { product: "2S Wader", rating: 5, name: "Tyler",
    text: "I’m 6’1 240 only complain it’s not even really a complain but the seem kinda rides up my rear end . But other than that I love these waders I have Sitka wader as well but Chene nailed it . We will see when cold season rolls around . Worth the money so far" },
  { product: "Scout Deck Boot", rating: 5, name: "Hannah",
    text: "The Chêne deck boots are my husband’s most favorite boots in the world. His 4th pair arrived quickly per usual. When his last pair wore out he went to a local outfitter and in a pinch bought a competitor’s brand, he will never make that mistake again. Chêne for life!!!!" },
  { product: "Over/Under Jacket", rating: 5, name: "Roy C.",
    text: "To warm to try out but definitely is comfortable and fits well" },
];

export const builtBetter = {
  eyebrow: "Since 2021",
  title: "Built Better®",
  text: "In 2021, Chêne was born out of the desire to build a better wader; one free of margin constraints and low-cost alternatives.",
  cta: "Read our story",
  href: "/about",
  stores: [
    {
      name: "Memphis HQ",
      image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-BRN-2S_Wader-Hollowbody-03736.webp?v=1783021399",
      address: ["1835 Nonconnah Blvd, Suite 173", "Memphis, TN 38132"],
      hours: ["Mon–Fri: 8 AM – 5 PM", "Sat: 10 AM – 4 PM", "Sun: Closed"],
    },
    {
      name: "Stuttgart Store",
      image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17010-BRN-Scout_Boot-Tabletop-00093.webp?v=1783016750",
      address: ["2303 Highway 63 N", "Stuttgart, AR 72160"],
      hours: ["Mon–Fri: 10 AM – 6 PM", "Sat: 10 AM – 4 PM", "Sun: Closed"],
    },
    {
      name: "Atlanta Store",
      image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11000-CYP-Hydro_Lok_Shell_Jacket-Hollowbody-00521.webp?v=1783014793",
      address: ["2391 Peachtree Road NE, Suite 203", "Atlanta, GA 30305"],
      hours: ["Mon–Sat: 10 AM – 7 PM", "Sun: 12 PM – 5 PM"],
    },
  ],
};

export const community = [
  { label: "Underground",  image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN12100-MOFL-Sixty_Series_Technical_Fleece_Half_Zip_with_Hood-Hollowbody-01016.webp?v=1783014903", href: "#" },
  { label: "Film Tour",    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15003-DKO-Founders__Reserve_Waxed_Wading_Jacket-Hollowbody-01235.webp?v=1783352237",             href: "#" },
  { label: "Chêne Cribs",  image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN4000-MOTS-Scout_Vest-Hollowbody-00102.webp?v=1783013256",                                        href: "#" },
];

export const footer = {
  joinTitle: "JOIN THE MOVEMENT",
  joinText: "Be among the first to learn about Chêne Gear news, stories from the field, future projects, and more.",
  columns: [
    {
      title: "Support",
      links: [
        { label: "Contact Us",          href: "/contact" },
        { label: "Shipping",            href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "Warranty",            href: "/warranty" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us",  href: "/about" },
        { label: "Contact",   href: "/contact" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "Waders",        href: "/collections/waders" },
        { label: "Jackets",       href: "/collections/jackets" },
        { label: "Footwear",      href: "/collections/footwear" },
        { label: "Tops & Layers", href: "/collections/tops-layers" },
        { label: "Youth",         href: "/collections/youth" },
        { label: "Accessories",   href: "/collections/accessories" },
      ],
    },
    {
      title: "Terms & Policies",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy",   href: "/privacy" },
        { label: "Refund Policy",    href: "/refund" },
      ],
    },
  ],
  copyright: "© 2026 · CHÊNE GEAR®",
  email: "chenegears@gmail.com",
  whatsapp: "https://wa.me/13312241929",
};

// ─── Product Catalog ──────────────────────────────────────────────────────────
// Sourced from Shopify CSV export. Each entry maps to a URL: /products/[id]
// "type" maps to a collection slug at /collections/[slug]

export const products = [
  // ── Waders ──
  {
    id: "2s-wader-brown",
    name: "Brown 2S Wader",
    type: "Waders",
    price: "1,150.00",
    badge: "Best Seller",
    rating: 5,
    reviewCount: 229,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-BRN-2S_Wader-Hollowbody-03736.webp?v=1783021399",
    tags: ["waterfowl", "mens", "breathable", "waterproof"],
    description: "The 2S Wader is built for the waterfowl hunter who demands the best. Waterproof, breathable, and lightweight with a lifetime warranty and in-house repair.",
    features: ["5-layer waterproof/breathable fabric", "Neoprene bootie", "Hand warmer pockets", "Lifetime warranty", "In-house repair within 7 business days"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Brown"],
  },
  {
    id: "2s-wader-mossy-oak-bottomland",
    name: "Mossy Oak Bottomland 2S Wader",
    type: "Waders",
    price: "1,150.00",
    badge: "Best Seller",
    rating: 5,
    reviewCount: 198,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOBM-2S_Wader-Hollowbody-03736.webp?v=1783021399",
    tags: ["waterfowl", "mens", "breathable", "waterproof"],
    description: "The 2S Wader in Mossy Oak Bottomland camo. Waterproof, breathable, and built for the blind or the timber.",
    features: ["5-layer waterproof/breathable fabric", "Mossy Oak Bottomland pattern", "Neoprene bootie", "Lifetime warranty"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Mossy Oak Bottomland"],
  },
  {
    id: "youth-2s-wader",
    name: "Youth 2S Wader",
    type: "Waders",
    price: "550.00",
    badge: null,
    rating: 5,
    reviewCount: 44,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN1500-MOSG-2S_Wader-Hollowbody-03736.webp?v=1783021399",
    tags: ["waterfowl", "youth", "waterproof"],
    description: "All the technology of the adult 2S Wader in a youth-sized fit. Built to last season after season.",
    features: ["5-layer waterproof/breathable fabric", "Youth sizing", "Neoprene bootie", "Lifetime warranty"],
    sizes: ["YSM", "YMD", "YLG"],
    colors: ["Mossy Oak Shadow Grass"],
  },

  // ── Jackets ──
  {
    id: "over-under-jacket",
    name: "Over/Under Jacket",
    type: "Jackets",
    price: "300.00",
    badge: null,
    rating: 5,
    reviewCount: 112,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN5000-CYP-Over_Under_Jacket-Hollowbody-00615.webp?v=1783013290",
    tags: ["lifestyle", "waterfowl", "mens", "insulated", "fleece"],
    description: "The Over/Under Jacket is a midlayer powerhouse. Fleece-lined and wind-resistant for cold-weather comfort in the blind or around camp.",
    features: ["Wind-resistant shell", "Fleece lining", "Zip-off sleeves", "Multiple pockets", "Available in extended sizes"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Cypress", "Black", "Mossy Oak Shadow Grass"],
  },
  {
    id: "hydro-lok-shell-jacket",
    name: "Hydro-Lok Shell Jacket",
    type: "Jackets",
    price: "400.00",
    badge: null,
    rating: 4.8,
    reviewCount: 87,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11000-CYP-Hydro_Lok_Shell_Jacket-Hollowbody-00521.webp?v=1783014793",
    tags: ["waterfowl", "mens", "waterproof", "shell"],
    description: "The Hydro-Lok Shell Jacket is a fully waterproof technical shell built for the most demanding waterfowl conditions.",
    features: ["Fully waterproof shell", "Taped seams", "Helmet-compatible hood", "Underarm vents", "Articulated patterning"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Cypress", "Mossy Oak Bottomland"],
  },
  {
    id: "chene-gear-wax-jacket",
    name: "Waxed Canvas Jacket",
    type: "Jackets",
    price: "450.00",
    badge: null,
    rating: 4.9,
    reviewCount: 63,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15000-BRN-Front.png?v=1721274607",
    tags: ["waterfowl", "mens", "waterproof", "wax-canvas"],
    description: "British Millerain waxed cotton canvas built for flooded timber and dry fields alike. Made to be rewaxed and repaired, not replaced.",
    features: ["11 oz British Millerain waxed canvas", "Water-resistant", "Corduroy collar", "Interior pockets", "Can be reproofed"],
    sizes: ["SM", "MD", "LG", "XL", "2XL"],
    colors: ["Brown", "Olive"],
  },
  {
    id: "chene-flyweigh-jacket",
    name: "Flyweigh Jacket",
    type: "Jackets",
    price: "400.00",
    badge: null,
    rating: 4.7,
    reviewCount: 55,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN5500-CYP-Flyweigh_Jacket-Hollowbody-00894.webp?v=1783012684",
    tags: ["lifestyle", "waterfowl", "insulated", "windproof"],
    description: "PrimaLoft-insulated and windproof, the Flyweigh Jacket packs incredible warmth into a lightweight, compressible package.",
    features: ["PrimaLoft insulation", "Wind-resistant", "Packable design", "Soft-touch shell", "Zippered pockets"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Cypress", "Black"],
  },
  {
    id: "founders-reserve-waxed-wading-jacket",
    name: "Founders' Reserve Waxed Wading Jacket",
    type: "Jackets",
    price: "380.00",
    badge: "New",
    rating: 5,
    reviewCount: 18,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15003-DKO-Founders__Reserve_Waxed_Wading_Jacket-Hollowbody-01235.webp?v=1783352237",
    tags: ["waterfowl", "mens", "insulated", "wax-canvas", "founders"],
    description: "Part of the Founders' Reserve collection. Waxed wading jacket built from 11 oz British Millerain canvas — made to rewax and repair.",
    features: ["11 oz British Millerain canvas", "Down insulation", "Wading-length cut", "Storm cuffs", "Reproofable"],
    sizes: ["SM", "MD", "LG", "XL", "2XL"],
    colors: ["Dark Olive", "Field Khaki"],
  },
  {
    id: "founders-reserve-waxed-jac-shirt",
    name: "Founders' Reserve Waxed Jac-Shirt",
    type: "Jackets",
    price: "275.00",
    badge: "New",
    rating: 5,
    reviewCount: 12,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN15002-FKH-Founders__Reserve_Waxed_Jac-Shirt-Hollowbody-00755.webp?v=1789590079",
    tags: ["waterfowl", "lifestyle", "mens", "wax-canvas", "founders"],
    description: "A shirt-weight waxed canvas layer that works as a mid-layer or a light shell. Part of the Founders' Reserve collection.",
    features: ["11 oz British Millerain canvas", "Shirt-weight construction", "Button front", "Chest pockets", "Reproofable"],
    sizes: ["SM", "MD", "LG", "XL", "2XL"],
    colors: ["Field Khaki", "Dark Olive"],
  },
  {
    id: "chene-gear-youth-hydro-lok",
    name: "Youth Hydro-Lok Shell Jacket",
    type: "Jackets",
    price: "300.00",
    badge: null,
    rating: 4.8,
    reviewCount: 29,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/youthhydrolokjacket.png?v=1689628140",
    tags: ["waterfowl", "youth", "waterproof", "shell"],
    description: "The youth version of the Hydro-Lok Shell. Fully waterproof and built to keep young hunters dry all day.",
    features: ["Fully waterproof shell", "Youth sizing", "Helmet-compatible hood", "Taped seams"],
    sizes: ["YSM", "YMD", "YLG"],
    colors: ["Cypress", "Mossy Oak Bottomland"],
  },

  // ── Vests ──
  {
    id: "scout-vest",
    name: "Scout Vest",
    type: "Vests",
    price: "200.00",
    badge: null,
    rating: 5,
    reviewCount: 98,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN4000-MOTS-Scout_Vest-Hollowbody-00102.webp?v=1783013256",
    tags: ["lifestyle", "turkey", "waterfowl", "mens", "windproof", "fleece"],
    description: "The Scout Vest is windproof and breathable with a fleece-backed shell — a versatile outer layer from the marsh to the mountains.",
    features: ["Wind-resistant shell", "Fleece-backed interior", "Zippered chest pockets", "Articulated design"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Mossy Oak Treestand", "Olive", "Black"],
  },
  {
    id: "flyweigh-vest",
    name: "Flyweigh Vest",
    type: "Vests",
    price: "200.00",
    badge: null,
    rating: 4.7,
    reviewCount: 61,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN4500-OLV-Flyweigh_Vest-Hollowbody-00161.webp?v=1783012640",
    tags: ["lifestyle", "waterfowl", "mens", "insulated", "windproof"],
    description: "PrimaLoft-insulated and packable, the Flyweigh Vest brings serious warmth without serious weight.",
    features: ["PrimaLoft insulation", "Wind-resistant", "Packable", "Soft-touch shell"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Olive", "Black", "Cypress"],
  },

  // ── Base Layers ──
  {
    id: "sixty-series-zip-with-hood",
    name: "Sixty Series Technical Fleece Half Zip with Hood",
    type: "Base Layers",
    price: "160.00",
    badge: null,
    rating: 5,
    reviewCount: 82,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN12100-MOFL-Sixty_Series_Technical_Fleece_Half_Zip_with_Hood-Hollowbody-01016.webp?v=1783014903",
    tags: ["turkey", "waterfowl", "mens", "fleece", "mid-layer"],
    description: "Technical fleece built for the blind. Quick-dry, anti-pill fabric with a hood for all-day warmth.",
    features: ["Quick-dry technical fleece", "Anti-pill finish", "Helmet-compatible hood", "Zippered pockets"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Mossy Oak Flooded Timber", "Black", "Olive"],
  },
  {
    id: "sixty-series-zip",
    name: "Sixty Series Technical Fleece Half Zip",
    type: "Base Layers",
    price: "150.00",
    badge: null,
    rating: 4.9,
    reviewCount: 74,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN12000-MOBM-Sixty_Series_Technical_Fleece_Half_Zip-Hollowbody-00070.webp?v=1783014885",
    tags: ["turkey", "waterfowl", "mens", "fleece", "mid-layer"],
    description: "The go-to mid-layer for cold mornings. Technical fleece construction with a classic half-zip design.",
    features: ["Quick-dry technical fleece", "Half-zip pullover", "Zippered pockets", "Thumbhole cuffs"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Mossy Oak Bottomland", "Black", "Olive"],
  },
  {
    id: "merino-wool-top",
    name: "Merino Mock Neck",
    type: "Base Layers",
    price: "110.00",
    badge: null,
    rating: 4.8,
    reviewCount: 43,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN14000-OLV-Merino_Mock_Neck-Hollowbody-01273.webp?v=1783014978",
    tags: ["turkey", "waterfowl", "merino"],
    description: "Lightweight merino wool base layer with a mock neck. Natural odor resistance and all-day comfort.",
    features: ["100% merino wool", "Natural odor resistance", "Moisture-wicking", "Mock neck collar"],
    sizes: ["SM", "MD", "LG", "XL", "2XL"],
    colors: ["Olive", "Brown"],
  },

  // ── Pants & Bibs ──
  {
    id: "chene-hydro-lok-bib",
    name: "Hydro-Lok Field Bib",
    type: "Bibs",
    price: "500.00",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 134,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN11500-CYP-Hydro_lok_Field_Bib-Hollowbody-03523.webp?v=1783014863",
    tags: ["waterfowl", "mens", "waterproof", "shell"],
    description: "Fully waterproof wading bib. Pairs with the Hydro-Lok Shell Jacket for a full sealed system in the worst weather.",
    features: ["Fully waterproof/breathable", "Adjustable suspenders", "Taped seams", "Front zip entry", "Ankle gussets"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Cypress", "Mossy Oak Bottomland"],
  },
  {
    id: "sherpa-fleece-wader-pant",
    name: "Sherpa Fleece Wader Pant",
    type: "Pants",
    price: "230.00",
    badge: null,
    rating: 4.8,
    reviewCount: 56,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN3000-MOSG-Sherpa_Fleece_Wader_Pant-Hollowbody-02489.webp?v=1783013117",
    tags: ["waterfowl", "mens", "insulated", "fleece"],
    description: "Sherpa-fleece lined wader pant for maximum warmth in the blind. Pull-on fit with an elastic waist.",
    features: ["Sherpa fleece lining", "Water-resistant outer shell", "Elastic waistband", "Boot-compatible hem"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Mossy Oak Shadow Grass", "Olive"],
  },
  {
    id: "field-stretch-pant",
    name: "Field Pant",
    type: "Pants",
    price: "160.00",
    badge: null,
    rating: 4.7,
    reviewCount: 89,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN3100-MOOB-Field_Pant-Hollowbody-04286.webp?v=1783013140",
    tags: ["lifestyle", "turkey", "waterfowl", "mens", "water-resistant"],
    description: "A versatile, 4-way stretch field pant built for active hunting days. Water-resistant and breathable.",
    features: ["4-way stretch fabric", "Water-resistant", "7 pockets", "Articulated knees", "Reinforced hem"],
    sizes: ["30x32", "32x32", "34x32", "36x32", "38x32", "40x32"],
    colors: ["Mossy Oak Original Bottomland", "Olive", "Black"],
  },

  // ── Footwear ──
  {
    id: "scout-deck-boot",
    name: "Scout Deck Boot",
    type: "Footwear",
    price: "120.00",
    badge: "Best Seller",
    rating: 5,
    reviewCount: 343,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17010-BRN-Scout_Boot-Tabletop-00093.webp?v=1783016750",
    tags: ["lifestyle", "turkey", "waterfowl", "mens", "waterproof", "rubber"],
    description: "The Scout Deck Boot is the most versatile boot in the lineup. Waterproof rubber construction, comfortable enough for all-day wear.",
    features: ["Waterproof rubber upper", "Neoprene lining", "Aggressive lug sole", "Pull-on design", "Available in multiple colors"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Brown", "Olive", "Black", "Sand"],
  },
  {
    id: "floodline-cornerstone-boot",
    name: "Floodline Midweight Cornerstone Boot",
    type: "Footwear",
    price: "200.00",
    badge: null,
    rating: 4.8,
    reviewCount: 72,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17000-OLV-Floodline_Cornerstone_Boot-Tabletop-00768.png?v=1783016665",
    tags: ["turkey", "waterfowl", "mens", "waterproof", "rubber"],
    description: "A midweight rubber boot built for the transitional season hunter. Waterproof with enough insulation for cool mornings.",
    features: ["Waterproof rubber upper", "400g insulation", "Comfort footbed", "Lug sole"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Olive", "Mossy Oak Shadow Grass"],
  },
  {
    id: "floodline-slough-boot",
    name: "Floodline Slough Boot",
    type: "Footwear",
    price: "300.00",
    badge: null,
    rating: 4.9,
    reviewCount: 51,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17100-MOGL-Floodline_Slough_Boot-Tabletop-01910.png?v=1783016857",
    tags: ["turkey", "waterfowl", "mens", "waterproof", "rubber"],
    description: "The Slough Boot is built for the deep-water hunter. Knee-high rubber construction keeps you dry when it gets serious.",
    features: ["Knee-high waterproof rubber", "1200g insulation", "Aggressive lug sole", "Stability shank"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Mossy Oak Shadow Grass", "Olive"],
  },
  {
    id: "womens-scout-boot",
    name: "Women's Scout Deck Boot",
    type: "Footwear",
    price: "120.00",
    badge: null,
    rating: 4.9,
    reviewCount: 61,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN17010-BRN-Scout_Boot-Tabletop-00093.webp?v=1783016750",
    tags: ["lifestyle", "turkey", "waterfowl", "womens", "waterproof", "rubber"],
    description: "Same waterproof rubber construction as the original Scout Deck Boot, now in a women's sizing.",
    features: ["Waterproof rubber upper", "Women's sizing", "Neoprene lining", "Pull-on design"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Brown", "Olive", "Black"],
  },

  // ── T-Shirts ──
  {
    id: "built-better-tee-ss",
    name: "Built Better Tee S/S",
    type: "T-Shirts",
    price: "35.00",
    badge: null,
    rating: 4.9,
    reviewCount: 215,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN8002-IVY-Back.png?v=1728567115",
    tags: ["lifestyle", "mens", "cotton"],
    description: "Heavyweight garment-dyed ringspun cotton from Comfort Colors®. Features two mallards in flight over an octagonal marsh background.",
    features: ["100% ringspun cotton", "Garment-dyed", "Front chest pocket", "Pre-shrunk"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Ivory", "Crimson", "Moss", "Navy"],
  },
  {
    id: "logo-tee-ss",
    name: "Logo Tee S/S",
    type: "T-Shirts",
    price: "35.00",
    badge: null,
    rating: 4.8,
    reviewCount: 187,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN8000-STB-Front.png?v=1710520168",
    tags: ["lifestyle", "mens", "cotton"],
    description: "The Logo Tee features the Chêne Gear sigil on the front chest. Tri-blend construction makes it ultra-lightweight and breathable.",
    features: ["50% polyester / 25% ringspun cotton / 25% rayon", "Tri-blend construction", "Ultra-lightweight", "Relaxed fit"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Black", "Denim", "Ivory", "Khaki", "Moss", "Navy"],
  },
  {
    id: "trademark-tee-ss",
    name: "Trademark Tee S/S",
    type: "T-Shirts",
    price: "35.00",
    badge: "New",
    rating: 4.9,
    reviewCount: 22,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN8048-GRP-Front.png?v=1785366679",
    tags: ["lifestyle", "mens", "cotton"],
    description: "A new-arrival graphic tee featuring the Chêne trademark mark. Garment-dyed Comfort Colors construction.",
    features: ["100% ringspun cotton", "Garment-dyed", "Pre-shrunk"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Granite", "Ivory", "Sage"],
  },
  {
    id: "mallard-curl-tee-ss",
    name: "Mallard Curl Tee S/S",
    type: "T-Shirts",
    price: "35.00",
    badge: "New",
    rating: 4.8,
    reviewCount: 14,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN8047-LTE-Front.png?v=1785366672",
    tags: ["lifestyle", "mens", "cotton"],
    description: "A vintage-inspired graphic tee with a mallard curl design. Garment-dyed Comfort Colors construction.",
    features: ["100% ringspun cotton", "Garment-dyed", "Vintage-washed feel"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Late Evening", "Ivory", "Sage"],
  },

  // ── Hoodies & Sweats ──
  {
    id: "performance-hoodie",
    name: "Performance Hoodie",
    type: "Hoodies",
    price: "80.00",
    badge: null,
    rating: 4.9,
    reviewCount: 143,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN2000-HBK-Performance_Hoodie-Hollowbody-01181_ab9fb5fd-4c98-4444-bc0f-95433241ded5.webp?v=1783012548",
    tags: ["lifestyle", "mens"],
    description: "A performance-cut hoodie with a smooth face and comfortable hand. Perfect for camp mornings or everyday wear.",
    features: ["Smooth-face construction", "Kangaroo pocket", "Adjustable hood", "Ribbed cuffs and hem"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Heather Black", "Olive", "Cypress"],
  },
  {
    id: "crew-neck",
    name: "Comfort Colors Sweatshirt",
    type: "Sweaters",
    price: "50.00",
    badge: null,
    rating: 4.8,
    reviewCount: 98,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN2060-BLJ-Comfort_Colors_Sweatshirt-Hollowbody-00912.webp?v=1783012608",
    tags: ["lifestyle", "mens", "cotton"],
    description: "Heavyweight garment-dyed crewneck from Comfort Colors®. Relaxed fit with a lived-in feel right out of the bag.",
    features: ["100% cotton", "Garment-dyed", "Relaxed fit", "Ribbed collar, cuffs, and hem"],
    sizes: ["SM", "MD", "LG", "XL", "2XL", "3XL"],
    colors: ["Blue Jean", "Ivory", "Sage", "Clay"],
  },

  // ── Headwear ──
  {
    id: "6-panel-waxed-cotton-cap",
    name: "6-Panel Waxed Cotton Cap",
    type: "Headwear",
    price: "35.00",
    badge: null,
    rating: 4.8,
    reviewCount: 112,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN7060-BUC-Front.png?v=1733941111",
    tags: ["lifestyle"],
    description: "Classic 6-panel waxed cotton cap with an embroidered Chêne logo. Reproofable for long-term wear.",
    features: ["Waxed cotton construction", "Pre-curved brim", "Adjustable closure", "Reproofable"],
    sizes: ["One Size"],
    colors: ["Buckskin", "Brown", "Olive"],
  },
  {
    id: "chene-patch-rope-hats",
    name: "Rope Patch Cap",
    type: "Headwear",
    price: "35.00",
    badge: null,
    rating: 4.7,
    reviewCount: 89,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN7600-VNY-Front_5f8aa644-40f6-4ec1-bb8a-cadb738e82ce.png?v=1784317132",
    tags: ["lifestyle"],
    description: "Classic rope cap with a woven Chêne patch. Snapback closure and structured front panels.",
    features: ["Structured front panels", "Rope accent", "Woven patch", "Snapback closure"],
    sizes: ["One Size"],
    colors: ["Vintage Navy", "Black", "Khaki"],
  },

  // ── Accessories ──
  {
    id: "wax-canvas-timber-bag",
    name: "Waxed Canvas Timber Bag",
    type: "Accessories",
    price: "350.00",
    badge: null,
    rating: 4.9,
    reviewCount: 38,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/wax-timber-bag-profile-w_strap-2.png?v=1688660119",
    tags: ["lifestyle", "waterfowl", "wax-canvas"],
    description: "A large waxed canvas timber bag for the decoy spreader who wants serious capacity with serious style.",
    features: ["Waxed canvas construction", "Large main compartment", "Interior pockets", "Padded shoulder strap"],
    sizes: ["One Size"],
    colors: ["Olive"],
  },
  {
    id: "delta-pack",
    name: "Delta Pack",
    type: "Accessories",
    price: "300.00",
    badge: "New",
    rating: 4.9,
    reviewCount: 11,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/delta-pack-cypress-three-quarter.png?v=1793205584",
    tags: ["waterfowl", "mens", "water-resistant"],
    description: "The Delta Pack is a purpose-built waterfowl pack with water-resistant construction and an intelligently organized interior.",
    features: ["Water-resistant fabric", "Padded laptop sleeve", "Multiple organization pockets", "Hydration compatible"],
    sizes: ["One Size"],
    colors: ["Cypress", "Black"],
  },
  {
    id: "alpaca-heavyweight-crew-sock",
    name: "Alpaca Heavyweight Crew Sock",
    type: "Accessories",
    price: "28.00",
    badge: null,
    rating: 4.9,
    reviewCount: 76,
    image: "https://cdn.shopify.com/s/files/1/0523/4835/4752/files/CHN0000.png?v=1625865761",
    tags: ["lifestyle", "turkey", "waterfowl", "mens", "womens", "alpaca"],
    description: "Heavyweight alpaca crew sock for cold-weather hunters. Naturally moisture-wicking and odor-resistant.",
    features: ["Alpaca wool blend", "Cushioned sole", "Reinforced heel and toe", "Moisture-wicking"],
    sizes: ["SM", "MD", "LG"],
    colors: ["Oatmeal", "Brown"],
  },
];

// ─── Lookup Functions ─────────────────────────────────────────────────────────

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

/** Returns all products whose `type` (lowercased, spaces→hyphens) matches the slug. */
export function getProductsByType(typeSlug) {
  return products.filter(
    (p) => p.type.toLowerCase().replace(/[^a-z0-9]+/g, "-") === typeSlug
  );
}

/** Returns products that include a given tag string (partial match). */
export function getProductsByTag(tag) {
  return products.filter((p) => p.tags.includes(tag));
}

/**
 * Resolves a URL slug to a list of products.
 * Handles both type-level slugs (e.g. "waders", "jackets") and
 * tag-level slugs (e.g. "waterfowl", "youth", "lifestyle").
 */
export function getProductsBySlug(slug) {
  // Direct type match first
  const byType = getProductsByType(slug);
  if (byType.length > 0) return byType;

  // Tag / activity match
  return getProductsByTag(slug);
}
