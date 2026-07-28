"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dypixels-spec-mode";

export function SpecModeToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "on") {
      setOn(true);
      document.documentElement.dataset.spec = "on";
    }
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.spec = next ? "on" : "off";
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className="docket inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider hover:text-flash transition-colors"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors ${
          on ? "bg-flash" : "bg-mute"
        }`}
      />
      Spec mode — {on ? "on" : "off"}
    </button>
  );
}

// Fixed, site-wide grid overlay. Inert (opacity 0, pointer-events none)
// until spec mode is switched on. Render once in the root layout.
export function SpecModeOverlay() {
  return <div className="spec-grid-overlay" aria-hidden="true" />;
}
