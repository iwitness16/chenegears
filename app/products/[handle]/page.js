import { getProductByHandle, getProductsByCollection } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: "Product Not Found — Chêne Gear" };
  return {
    title: `${product.title} — Chêne Gear`,
    description: product.bodyHtml?.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  // Fetch related products from same type
  const { products: related } = await getProductsByCollection(
    product.type?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ?? "waders",
    { sort: "best-selling" }
  );

  const relatedProducts = related
    .filter((p) => p.handle !== product.handle)
    .slice(0, 8);

  return <ProductClient product={product} related={relatedProducts} />;
}
