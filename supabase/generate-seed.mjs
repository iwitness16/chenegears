/**
 * generate-seed.mjs
 *
 * Reads public/all_products_chenegear.com.csv and writes supabase/seed.sql
 *
 * Usage (from project root):
 *   node supabase/generate-seed.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dir, "../public/all_products_chenegear.com.csv");
const outPath = join(__dir, "seed.sql");

// ── Parse CSV ─────────────────────────────────────────────────────────────────

function parseCsv(text) {
  // Normalise Windows line endings
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const headers = [];
  const records = [];

  let pos = 0;
  const len = text.length;

  function parseField() {
    if (pos >= len) return "";
    if (text[pos] === '"') {
      // Quoted field
      pos++; // skip opening quote
      let val = "";
      while (pos < len) {
        if (text[pos] === '"') {
          if (text[pos + 1] === '"') {
            val += '"';
            pos += 2;
          } else {
            pos++; // skip closing quote
            break;
          }
        } else {
          val += text[pos++];
        }
      }
      return val;
    } else {
      // Unquoted field — read until comma or newline
      let val = "";
      while (pos < len && text[pos] !== "," && text[pos] !== "\n") {
        val += text[pos++];
      }
      return val;
    }
  }

  function parseRow() {
    const cells = [];
    while (pos < len && text[pos] !== "\n") {
      cells.push(parseField());
      if (pos < len && text[pos] === ",") pos++; // skip comma
      else break;
    }
    if (pos < len && text[pos] === "\n") pos++; // skip newline
    return cells;
  }

  // Parse header row
  const headerRow = parseRow();
  headerRow.forEach((h) => headers.push(h.trim()));

  // Parse data rows
  while (pos < len) {
    // Skip blank lines
    if (text[pos] === "\n") { pos++; continue; }
    const cells = parseRow();
    if (cells.length === 0 || (cells.length === 1 && cells[0] === "")) continue;
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (cells[i] ?? "").trim(); });
    records.push(obj);
  }

  return records;
}

// ── SQL helpers ───────────────────────────────────────────────────────────────

function esc(str) {
  if (str === null || str === undefined || str === "") return "NULL";
  // Normalise all curly/smart quote variants to straight apostrophe, then escape
  const normalised = str
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // curly single quotes → '
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"') // curly double quotes → "
    .replace(/\\/g, "\\\\")   // backslash must come before single-quote escape
    .replace(/'/g, "''");     // escape single quotes for SQL
  return "'" + normalised + "'";
}

function escArr(arr) {
  if (!arr?.length) return "NULL";
  // PostgreSQL array literal: each element quoted with double-quotes,
  // internal double-quotes doubled, internal backslashes doubled.
  const inner = arr
    .map((v) =>
      '"' +
      String(v)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '""') +
      '"'
    )
    .join(",");
  return `'{${inner}}'`;
}

function escNum(val) {
  const n = parseFloat(val);
  return isNaN(n) || !isFinite(n) ? "NULL" : n.toString();
}

function escInt(val) {
  const n = parseInt(val, 10);
  return isNaN(n) ? "0" : n.toString();
}

// ── Badge heuristics ──────────────────────────────────────────────────────────

const BEST_SELLERS = new Set([
  "2s-wader-brown","2s-wader-mossy-oak-bottomland","scout-deck-boot",
  "hydro-lok-field-bib","sixty-series-zip-with-hood","built-better-tee-ss",
  "logo-tee-ss","performance-hoodie",
]);
const NEW_ARRIVALS = new Set([
  "founders-reserve-waxed-jac-shirt","founders-reserve-waxed-bib",
  "founders-reserve-waxed-down-vest","founders-reserve-waxed-wading-jacket",
  "trademark-tee-ss","mallard-curl-tee-ss","delta-pack",
]);

function getBadge(handle) {
  if (BEST_SELLERS.has(handle)) return "Best Seller";
  if (NEW_ARRIVALS.has(handle)) return "New";
  return null;
}

// ── Rating heuristics ─────────────────────────────────────────────────────────

const RATINGS = {
  "2s-wader-brown": [5.0, 229],
  "2s-wader-mossy-oak-bottomland": [5.0, 198],
  "youth-2s-wader": [5.0, 44],
  "scout-deck-boot": [5.0, 343],
  "hydro-lok-field-bib": [4.9, 134],
  "sixty-series-zip-with-hood": [5.0, 82],
  "built-better-tee-ss": [4.9, 215],
  "logo-tee-ss": [4.8, 187],
  "performance-hoodie": [4.9, 143],
};

function getRating(handle) {
  return RATINGS[handle] ?? [4.8, 12];
}

// ── Sort order by type ────────────────────────────────────────────────────────

const TYPE_ORDER = {
  "Waders": 1, "Jackets": 2, "Vests": 3, "Base Layers": 4,
  "Bibs": 5, "Pants": 6, "Footwear": 7,
  "T-Shirts": 8, "Hoodies": 9, "Sweaters": 10, "Headwear": 11,
  "Accessories": 12,
};

// ── Main ──────────────────────────────────────────────────────────────────────

const csv = parseCsv(readFileSync(csvPath, "utf-8"));

// Group rows by handle
const byHandle = {};
for (const row of csv) {
  const h = row["Handle"];
  if (!h) continue;
  if (!byHandle[h]) byHandle[h] = [];
  byHandle[h].push(row);
}

const productInserts = [];
const variantInserts = [];
const imageInserts = [];

let sortIdx = 1;

for (const [handle, rows] of Object.entries(byHandle)) {
  // Product-level data comes from the first row that has a Title
  const productRow = rows.find((r) => r["Title"]) ?? rows[0];

  const title = productRow["Title"];
  const bodyHtml = productRow["Body (HTML)"]?.replace(/\n/g, " ") ?? "";
  const vendor = productRow["Vendor"] ?? "Chêne Gear";
  const type = productRow["Type"] ?? "";
  const status = (productRow["Status"] ?? "active").toLowerCase();

  // Parse tags array
  const rawTags = productRow["Tags"] ?? "";
  const tags = rawTags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const badge = getBadge(handle);
  const [rating, reviewCount] = getRating(handle);
  const typeOrder = TYPE_ORDER[type] ?? 99;
  const sortOrder = typeOrder * 100 + sortIdx++;

  // Collect unique images (rows where Image Src is set)
  const seenImgs = new Set();
  for (const row of rows) {
    const src = row["Image Src"];
    const pos = parseInt(row["Image Position"] || "0", 10);
    if (src && !seenImgs.has(src)) {
      seenImgs.add(src);
      const alt = row["Image Alt Text"] ?? title;
      imageInserts.push({ handle, src, position: pos || 1, alt });
    }
  }

  // Collect unique variants (rows where SKU is set)
  const seenSkus = new Set();
  let minPrice = Infinity;
  for (const row of rows) {
    const sku = row["Variant SKU"];
    if (!sku || seenSkus.has(sku)) continue;
    seenSkus.add(sku);

    const color = row["Option1 Name"]?.toLowerCase() === "color" ? row["Option1 Value"] : null;
    const size = row["Option2 Name"]?.toLowerCase() === "size" ? row["Option2 Value"] : null;
    const price = parseFloat(row["Variant Price"]);
    const compareAt = parseFloat(row["Variant Compare At Price"]);
    const qty = parseInt(row["Variant Inventory Qty"] || "0", 10);
    const barcode = row["Variant Barcode"] ?? "";
    const weightGrams = parseInt(row["Variant Grams"] || "0", 10);

    if (!isNaN(price) && price < minPrice) minPrice = price;

    variantInserts.push({
      handle, sku, color, size, price: isNaN(price) ? 0 : price,
      compareAt: isNaN(compareAt) ? null : compareAt,
      qty, barcode, weightGrams,
    });
  }

  productInserts.push({
    handle, title, bodyHtml, vendor, type, tags, status,
    badge, rating, reviewCount,
    minPrice: isFinite(minPrice) ? minPrice : 0,
    sortOrder,
  });
}

// ── Write SQL ─────────────────────────────────────────────────────────────────

const lines = [];

lines.push("-- ============================================================");
lines.push("--  Chêne Gear — Seed Data");
lines.push(`--  Generated: ${new Date().toISOString()}`);
lines.push("--  Run AFTER schema.sql");
lines.push("-- ============================================================");
lines.push("");
lines.push("begin;");
lines.push("");

// Products
lines.push("-- ── Products ─────────────────────────────────────────────────");
lines.push("insert into products (handle, title, body_html, vendor, type, tags, status, badge, rating, review_count, min_price, sort_order)");
lines.push("values");

const pRows = productInserts.map((p) =>
  `  (${esc(p.handle)}, ${esc(p.title)}, ${esc(p.bodyHtml)}, ${esc(p.vendor)}, ` +
  `${esc(p.type)}, ${escArr(p.tags)}, ${esc(p.status)}, ` +
  `${esc(p.badge)}, ${p.rating}, ${p.reviewCount}, ` +
  `${p.minPrice}, ${p.sortOrder})`
);
lines.push(pRows.join(",\n") + ";");
lines.push("");

// Variants
lines.push("-- ── Variants ─────────────────────────────────────────────────");
lines.push("insert into product_variants (product_id, sku, color, size, price, compare_at_price, inventory_qty, barcode, weight_grams)");
lines.push("select p.id, v.sku, v.color, v.size, v.price, v.compare_at_price, v.qty, v.barcode, v.weight_grams");
lines.push("from (values");

const vRows = variantInserts.map((v) => {
  const compareAt = (v.compareAt != null && isFinite(v.compareAt)) ? v.compareAt : "NULL";
  return (
    `  (${esc(v.handle)}, ${esc(v.sku)}, ${esc(v.color)}, ${esc(v.size)}, ` +
    `${v.price}::numeric, ${compareAt === "NULL" ? "NULL::numeric" : compareAt + "::numeric"}, ` +
    `${v.qty}::int, ${esc(v.barcode)}, ${v.weightGrams}::int)`
  );
});
lines.push(vRows.join(",\n"));
lines.push(") as v(handle, sku, color, size, price, compare_at_price, qty, barcode, weight_grams)");
lines.push("join products p on p.handle = v.handle;");
lines.push("");

// Images
lines.push("-- ── Images ───────────────────────────────────────────────────");
lines.push("insert into product_images (product_id, src, position, alt)");
lines.push("select p.id, i.src, i.position, i.alt");
lines.push("from (values");

const iRows = imageInserts.map((i) =>
  `  (${esc(i.handle)}, ${esc(i.src)}, ${i.position}::int, ${esc(i.alt)})`
);
lines.push(iRows.join(",\n"));
lines.push(") as i(handle, src, position, alt)");
lines.push("join products p on p.handle = i.handle;");
lines.push("");
lines.push("commit;");

writeFileSync(outPath, lines.join("\n"), "utf-8");
console.log(`✓ Wrote ${productInserts.length} products, ${variantInserts.length} variants, ${imageInserts.length} images → supabase/seed.sql`);
