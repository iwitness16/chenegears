import { getCollectionMeta } from "@/lib/products";
import CollectionClient from "./CollectionClient";

export async function generateMetadata({ params }) {
  const meta = getCollectionMeta(params.slug);
  return {
    title: `${meta.title} — Chêne Gear`,
    description: meta.description,
  };
}

export default function CollectionPage({ params, searchParams }) {
  const meta = getCollectionMeta(params.slug);
  return (
    <CollectionClient
      slug={params.slug}
      meta={meta}
      initialSort={searchParams?.sort ?? "best-selling"}
    />
  );
}
