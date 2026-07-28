"use client";

import { useEffect, useState } from "react";

/**
 * Editorial treatment for the word "brands".
 * Cycles through distinct type styles to suggest different brand personalities.
 * Settles to a single strong style when prefers-reduced-motion is on.
 */
const styles = [
  { className: "font-display font-extrabold tracking-tight", label: "bold" },
  { className: "font-display font-medium italic tracking-normal", label: "italic" },
  { className: "font-mono font-medium uppercase tracking-widest text-[0.85em]", label: "mono" },
  { className: "font-display font-bold tracking-tighter", label: "tight" },
];

export function BrandsWord() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % styles.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  if (reduced) {
    return (
      <span className="font-display font-extrabold tracking-tight text-flash">
        brands
      </span>
    );
  }

  return (
    <span className="relative inline-block">
      {styles.map((s, i) => (
        <span
          key={s.label}
          aria-hidden={i !== index}
          className={`absolute left-0 top-0 transition-all duration-500 ease-out ${
            s.className
          } ${
            i === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          brands
        </span>
      ))}
      {/* Invisible spacer so layout doesn't collapse */}
      <span className="invisible font-display font-extrabold tracking-tight">
        brands
      </span>
    </span>
  );
}
