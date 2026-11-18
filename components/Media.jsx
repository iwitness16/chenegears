"use client";
import { useState } from "react";

// Image that fails gracefully: if the file isn't in /public yet, you just see the empty placeholder box.
export default function Media({ src, alt = "", className = "", fit = "cover" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`media ${className}`} data-src={src}>
      {!failed && (
        <img src={src} alt={alt} loading="lazy" style={{ objectFit: fit }} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
