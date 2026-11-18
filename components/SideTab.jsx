"use client";
import { useState } from "react";

// The vertical "Be the first to know" tab on the left edge.
export default function SideTab() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="sidetab">
      <button className="sidetab-close" aria-label="Dismiss" onClick={() => setOpen(false)}>×</button>
      <button className="sidetab-label head">Be the first to know</button>
    </div>
  );
}
