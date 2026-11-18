"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { announcements } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const n = announcements.length;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);
  const a = announcements[i];
  return (
    <div className="announce">
      <div className="announce-left head">
        <Link href="/collections/waders">New Arrivals</Link>
        <Link href="/collections/waders">Best Sellers</Link>
      </div>
      <div className="announce-center head">
        <button aria-label="Previous" onClick={() => setI((i - 1 + n) % n)}><ChevronLeft width={20} height={20} /></button>
        <p>
          {a.text}{" "}
          {a.linkText && <Link href={a.href ?? "/"} className="underline">{a.linkText}</Link>}
        </p>
        <button aria-label="Next" onClick={() => setI((i + 1) % n)}><ChevronRight width={20} height={20} /></button>
      </div>
      <div className="announce-right head">
        <Link href="/contact">Visit a store</Link>
      </div>
    </div>
  );
}
