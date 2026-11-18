"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

// Horizontal scroll-snap row with the square prev/next buttons from the original.
export default function Scroller({ title, children, className = "" }) {
  const ref = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  useEffect(() => { update(); }, []);
  const go = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className={`section ${className}`}>
      <div className="section-head">
        <h2 className="h2 head">{title}</h2>
        <div className="arrows">
          <button className="arrow" disabled={atStart} onClick={() => go(-1)} aria-label="Previous"><ChevronLeft width={18} height={18} /></button>
          <button className="arrow" disabled={atEnd} onClick={() => go(1)} aria-label="Next"><ChevronRight width={18} height={18} /></button>
        </div>
      </div>
      <div className="scroller" ref={ref} onScroll={update}>{children}</div>
    </section>
  );
}
