"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 1.6, opacity: 0.45, duration: 0.25 });
      gsap.to(dot, { scale: 0.6, duration: 0.25 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest(
        "a, button, [data-cursor], input, textarea, select, label"
      );
      if (target) onEnter();
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = (e.relatedTarget as Element)?.closest(
        "a, button, [data-cursor], input, textarea, select, label"
      );
      if (!related) onLeave();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 dark:bg-neon-cyan md:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900/35 dark:border-neon-cyan/50 md:block"
        aria-hidden="true"
      />
    </>
  );
}
