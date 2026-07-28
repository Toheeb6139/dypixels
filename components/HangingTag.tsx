"use client";

import { useEffect, useRef } from "react";

/**
 * A small docket tag hanging off the nav wordmark, always visible, no
 * click required. Sways gently on its own, and leans toward the cursor
 * when it's nearby — spring physics, not a scripted animation, so it
 * never repeats the same way twice. Respects prefers-reduced-motion by
 * settling into a fixed, natural-looking tilt instead of animating.
 */
export function HangingTag() {
  const groupRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const mouseX = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      if (groupRef.current) groupRef.current.style.transform = "rotate(-4deg)";
      return;
    }

    function handleMove(e: MouseEvent) {
      mouseX.current = e.clientX;
    }
    window.addEventListener("mousemove", handleMove);

    let raf: number;
    let t = 0;

    function tick() {
      t += 0.016;
      const el = groupRef.current;

      if (el) {
        const rect = el.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;

        let target: number;
        const radius = 220;
        const dx = mouseX.current !== null ? mouseX.current - originX : null;

        if (dx !== null && Math.abs(dx) < radius) {
          const pull = (1 - Math.abs(dx) / radius) * Math.sign(dx) * 11;
          target = pull;
        } else {
          // idle sway when the cursor's out of range (or on touch)
          target = Math.sin(t * 0.6) * 2.5;
        }

        const stiffness = 0.055;
        const damping = 0.86;
        velocityRef.current += (target - angleRef.current) * stiffness;
        velocityRef.current *= damping;
        angleRef.current += velocityRef.current;

        el.style.transform = `rotate(${angleRef.current.toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={groupRef}
      aria-hidden="true"
      className="absolute left-1/2 top-full -translate-x-1/2 origin-top pointer-events-none"
      style={{ transform: "rotate(-4deg)" }}
    >
      <div className="w-px h-3 bg-ink/40 mx-auto" />
      <div className="docket w-4 h-5 bg-paper" />
    </div>
  );
}
