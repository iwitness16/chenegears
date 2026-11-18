/**
 * lib/products.js
 *
 * All Supabase product queries live here.
 *
 * Database schema (created by supabase/schema.sql):
 *
 *   products          – one row per unique handle (the "parent" product)
 *   product_variants  – one row per SKU variant (size × color)
 *   product_images    – one row per image URL with its position
 *
 * Query helpers return plain JS objects ready to pass as props.
 */

import { supabase } from "./supabase";

// ─── Type helpers ────────────────────────────────────────────────────────────

/**
 * Normalise a Shopify "Type" string into a URL slug.
 * "T-Shirts" → "t-shirts",  "Base Layers" → "base-layers"
 */
export function typeToSlug(type) {
  return type.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

/**
 * Map a URL collection slug to the exact Type string stored in the DB.
 * This covers both direct types and "activity" aliases used in the nav.
 */
export const SLUG_TO_TYPE = {
  waders: "Waders",
  "tops-layers": "Tops & Layers",
  jackets: "Jackets",
  vests: "Vests",
  "base-layers": "Base Layers",
  "pants-bibs": "Pants & Bibs",
  pants: "Pants",
  bibs: "Bibs",
  footwear: "Footwear",
  apparel: null, // multi-type — handled specially
  "t-shirts": "T-Shirts",
  hoodies: "Hoodies",
  sweaters: "Sweaters",
  headwear: "Headwear",
  accessories: "Accessories",
  youth: null, // tag-based
  "shop-by-activity": null,
  waterfowl: null,
  turkey: null,
};

/** Apparel = all "lifestyle" softgoods types */
const APPAREL_TYPES = ["T-Shirts", "Hoodies", "Sweaters", "Headwear"];

// ─── Collection metadata ─────────────────────────────────────────────────────

export const COLLECTION_META = {
  waders: {
    title: "2S Waders",
    eyebrow: "Waterproof waders built for waterfowl hunters",
    heading: "Chêne Gear 2S Waders",
    tagline: "Less Seams. More Hunts.",
    heroImage: "/images/hero-1.jpg",
    description: "When you're out before sunrise, battling ice, wind, and mud, the last thing you need is waders that let you down. At Chêne Gear, we've got you covered with the 2S Waders, designed for waterfowlers who demand gear that delivers in the toughest conditions. Made with top-quality materials and built for performance, these waders are engineered to keep you dry, warm, and comfortable all season long.",
    description2: "Every pair of 2S Waders is field-tested to handle the roughest environments. Reinforced seams and rugged construction ensure they hold up to the abuse of flooded timber, marshes, and everything in between. With a design focused on mobility, these waders let you move freely while still providing superior waterproofing and protection.",
    description3: "Serious hunters know the details matter. That's why the 2S Waders come equipped with features you'll appreciate in the field: accessible storage pockets for your gear, adjustable straps for a dialed-in fit, and a no-frills design that prioritizes durability and functionality.",
    faqTitle: "Chêne Gear 2S Waders FAQs",
    faqs: [
      { q: "What are the warmest waders for duck hunting?", a: "The 2S Wader paired with the Sherpa Fleece Wader Pant provides maximum warmth for cold-weather duck hunting." },
      { q: "What's the difference between neoprene and breathable waders?", a: "Neoprene waders provide more warmth through insulation, while breathable waders (like the 2S) use waterproof/breathable fabric to prevent moisture buildup during active use." },
      { q: "Are the 2S Waders good for flooded timber or marsh hunts?", a: "Yes — the 2S Wader is built specifically for the demands of flooded timber and marsh environments, with reinforced seams and a durable 5-layer shell." },
    ],
    image: "/images/hero-1.jpg",
    filterGroups: ["Product Type", "Color", "Camo Pattern", "Price", "Availability", "Rating", "Body Size", "Boot Size"],
  },
  footwear: {
    title: "Footwear",
    eyebrow: "Built for the marsh, the timber, and the field",
    heading: "Chêne Gear Footwear",
    tagline: "Rubber boots, leather boots, and socks built to handle everything the season throws at you.",
    heroImage: "/images/hero-2.jpg",
    description: "Rubber boots, leather boots, and socks built to handle everything the season throws at you.",
    faqTitle: "Chêne Gear Footwear FAQs",
    faqs: [
      { q: "What are the best boots for duck hunting?", a: "The Scout Deck Boot offers waterproof rubber construction with enough warmth and grip for the blind." },
      { q: "How do I size hunting boots?", a: "We recommend sizing up half a size when wearing thick hunting socks." },
    ],
    image: "/images/hero-2.jpg",
    filterGroups: ["Product Type", "Color", "Price", "Availability", "Rating", "Boot Size"],
  },
  "waterproof-boots": {
    title: "Waterproof Boots",
    eyebrow: "Waterproof boots that keep you hunting",
    heading: "Chêne Gear Waterproof Boots",
    tagline: "Fully waterproof rubber hunting boots across the Scout and Floodline lines, insulated and lightweight builds for wherever the water is.",
    heroImage: "/images/hero-1.jpg",
    description: "Fully waterproof rubber hunting boots built for the blind and the timber.",
    faqTitle: "Waterproof Boots FAQs",
    faqs: [],
    image: "/images/hero-1.jpg",
    filterGroups: ["Product Type", "Color", "Price", "Availability", "Rating", "Boot Size"],
  },
  "leather-boots": {
    title: "Leather Workwear Boots",
    eyebrow: "Leather boots built for work and field",
    heading: "Chêne Gear Leather Boots",
    tagline: "The Grove and Fieldstone, leather workwear boots for property days, farm work, and travel, built to the same standard as the hunt line.",
    heroImage: "/images/hero-2.jpg",
    description: "The Grove and Fieldstone leather workwear boots — built for property days, farm work, and travel.",
    faqTitle: "Leather Boots FAQs",
    faqs: [],
    image: "/images/hero-2.jpg",
    filterGroups: ["Color", "Price", "Availability", "Rating", "Boot Size"],
  },
  jackets: {
    title: "Jackets",
    eyebrow: "Outerwear built for the blind and beyond",
    heading: "Chêne Gear Jackets",
    tagline: "Built for the blind and beyond.",
    heroImage: "/images/hero-2.jpg",
    description: "From waterproof shells to waxed canvas classics, Chêne jackets are engineered for performance in the field and comfort around camp.",
    faqTitle: "Chêne Gear Jackets FAQs",
    faqs: [
      { q: "What is the best waterproof hunting jacket?", a: "The Hydro-Lok Shell Jacket offers fully taped seams and a waterproof/breathable shell purpose-built for the waterfowl blind." },
      { q: "Are waxed canvas jackets waterproof?", a: "Waxed canvas is water-resistant, not fully waterproof. It sheds light rain and moisture extremely well and can be reproofed over time." },
    ],
    image: "/images/hero-2.jpg",
    filterGroups: ["Product Type", "Color", "Price", "Availability", "Rating"],
  },
  "t-shirts": {
    title: "T-Shirts",
    eyebrow: "For when your mind is in the woods",
    heading: "Chêne Gear T-Shirts",
    tagline: "For when your mind is in the woods.",
    heroImage: "/images/hero-1.jpg",
    description: "Heavyweight garment-dyed ringspun cotton from Comfort Colors®. Built to wear in, not wear out.",
    faqTitle: "Chêne Gear Tees FAQs",
    faqs: [
      { q: "What material are Chêne t-shirts made from?", a: "Most Chêne tees are made from 100% ringspun cotton, garment-dyed for a lived-in feel right out of the bag." },
    ],
    image: "/images/hero-1.jpg",
    filterGroups: ["Color", "Size", "Price", "Availability"],
  },
  accessories: {
    title: "Accessories",
    eyebrow: "Gear that completes the system",
    heading: "Chêne Gear Accessories",
    tagline: "Holds the load. Takes the abuse.",
    heroImage: "/images/hero-1.jpg",
    description: "Bags, packs, gloves, face coverings, and storage built to complete the system.",
    faqTitle: "Chêne Accessories FAQs",
    faqs: [
      { q: "What bags does Chêne make?", a: "The Delta Pack and Waxed Canvas Timber Bag are purpose-built for waterfowl hunters who need capacity and durability." },
    ],
    image: "/images/hero-1.jpg",
    filterGroups: ["Product Type", "Price", "Availability"],
  },
};

// Default meta for slugs not explicitly listed
function defaultMeta(slug) {
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title,
    eyebrow: `Chêne Gear ${title}`,
    heading: `Chêne Gear ${title}`,
    tagline: "Built better.",
    heroImage: "/images/hero-1.jpg",
    description: `Shop the full Chêne Gear ${title} collection.`,
    faqTitle: `${title} FAQs`,
    faqs: [],
    image: "/images/hero-1.jpg",
    filterGroups: ["Product Type", "Color", "Price", "Availability"],
  };
}

export function getCollectionMeta(slug) {
  return COLLECTION_META[slug] ?? defaultMeta(slug);
}

// ─── Supabase queries ─────────────────────────────────────────────────────────

/**
 * Fetch all products for a collection slug.
 * Returns an array of product objects with their images and aggregated
 * variant options (colors, sizes).
 *
 * @param {string} slug  e.g. "waders", "t-shirts", "apparel"
 * @param {object} filters
 *   filters.colors    string[]  — exact color values
 *   filters.minPrice  number
 *   filters.maxPrice  number
 *   filters.inStock   boolean
 *   filters.rating    number    — minimum rating
 *   filters.sort      "price-asc"|"price-desc"|"newest"|"best-selling"
 * @returns {Promise<{ products: object[], total: number }>}
 */
export async function getProductsByCollection(slug, filters = {}) {
  const type = SLUG_TO_TYPE[slug];

  // Build base product query
  let query = supabase
    .from("products")
    .select(`
      id,
      handle,
      title,
      type,
      tags,
      rating,
      review_count,
      badge,
      product_variants ( price, compare_at_price, color, size, inventory_qty, sku ),
      product_images ( src, position, alt )
    `)
    .eq("status", "active");

  // Type filtering
  if (slug === "apparel") {
    query = query.in("type", APPAREL_TYPES);
  } else if (slug === "youth") {
    query = query.contains("tags", ["audience:youth"]);
  } else if (slug === "waterfowl") {
    query = query.contains("tags", ["activity:waterfowl"]);
  } else if (slug === "turkey") {
    query = query.contains("tags", ["activity:turkey"]);
  } else if (type) {
    query = query.eq("type", type);
  }

  // Color filter — filter at product level via variants
  if (filters.colors?.length) {
    // We filter client-side after fetch since Supabase doesn't support
    // nested relation filtering in the free tier easily
  }

  // Sort
  switch (filters.sort) {
    case "price-asc":
      query = query.order("min_price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("min_price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("sort_order", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return { products: [], total: 0 };
  }

  // Normalise and enrich each product
  let products = (data ?? []).map(normaliseProduct);

  // Client-side filters that need variant data
  if (filters.colors?.length) {
    products = products.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c))
    );
  }
  if (filters.inStock) {
    products = products.filter((p) => p.inStock);
  }
  if (filters.minPrice != null) {
    products = products.filter((p) => p.minPrice >= filters.minPrice);
  }
  if (filters.maxPrice != null) {
    products = products.filter((p) => p.minPrice <= filters.maxPrice);
  }
  if (filters.rating != null) {
    products = products.filter((p) => (p.rating ?? 0) >= filters.rating);
  }

  return { products, total: products.length };
}

/**
 * Fetch a single product by handle with all variants and images.
 */
export async function getProductByHandle(handle) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      handle,
      title,
      body_html,
      type,
      tags,
      rating,
      review_count,
      badge,
      product_variants ( price, compare_at_price, color, size, inventory_qty, sku ),
      product_images ( src, position, alt )
    `)
    .eq("handle", handle)
    .eq("status", "active")
    .single();

  if (error || !data) return null;
  return normaliseProduct(data);
}

/**
 * Fetch the distinct filter options available for a collection.
 * Returns colors, price range, camo patterns, etc.
 */
export async function getCollectionFilters(slug) {
  const type = SLUG_TO_TYPE[slug];

  let query = supabase
    .from("products")
    .select("type, product_variants ( color, price, inventory_qty )")
    .eq("status", "active");

  if (slug === "apparel") {
    query = query.in("type", APPAREL_TYPES);
  } else if (type) {
    query = query.eq("type", type);
  }

  const { data } = await query;
  if (!data) return { colors: [], types: [], priceRange: [0, 2000] };

  const colorsSet = new Set();
  const typesSet = new Set();
  let minPrice = Infinity;
  let maxPrice = 0;

  for (const p of data) {
    typesSet.add(p.type);
    for (const v of p.product_variants ?? []) {
      if (v.color) colorsSet.add(v.color);
      const price = parseFloat(v.price);
      if (price < minPrice) minPrice = price;
      if (price > maxPrice) maxPrice = price;
    }
  }

  return {
    colors: [...colorsSet].sort(),
    types: [...typesSet].sort(),
    priceRange: [Math.floor(minPrice || 0), Math.ceil(maxPrice || 2000)],
  };
}

// ─── Normaliser ───────────────────────────────────────────────────────────────

function normaliseProduct(raw) {
  const variants = raw.product_variants ?? [];
  const images = (raw.product_images ?? []).sort((a, b) => a.position - b.position);

  // Collect unique colors and their representative image
  const colorMap = {}; // color → first image src for that color
  for (const v of variants) {
    if (v.color && !colorMap[v.color]) {
      // Find variant image (image whose alt matches color, or position image)
      const img = images.find(
        (i) => i.alt?.toLowerCase().includes(v.color.toLowerCase())
      ) ?? images[0];
      colorMap[v.color] = img?.src ?? null;
    }
  }

  const colors = Object.keys(colorMap);
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
  const prices = variants.map((v) => parseFloat(v.price)).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const inStock = variants.some((v) => (v.inventory_qty ?? 0) > 0);

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    bodyHtml: raw.body_html ?? "",
    type: raw.type,
    tags: raw.tags ?? [],
    rating: raw.rating ?? 0,
    reviewCount: raw.review_count ?? 0,
    badge: raw.badge ?? null,
    image: images[0]?.src ?? null,
    images: images.map((i) => i.src),
    colors,
    colorMap,
    sizes,
    minPrice,
    maxPrice,
    inStock,
    variants,
  };
}
