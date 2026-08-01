"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dypixels-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The inline script in layout.tsx already applied the right class
    // before paint — this just syncs React's own state to match, so
    // the toggle button shows the correct label immediately.
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  // Avoid rendering a possibly-wrong label before we've synced with
  // the actual applied class (prevents a one-frame flash of "Light"
  // for someone who's actually in dark mode).
  if (!mounted) {
    return <span className="inline-block w-[52px] h-[26px]" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="docket px-2.5 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider hover:text-flash transition-colors"
    >
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
