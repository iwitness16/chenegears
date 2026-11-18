import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export const metadata = {
  title: "Search — Chêne Gear",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page-loading-full" />}>
      <SearchPageClient />
    </Suspense>
  );
}
