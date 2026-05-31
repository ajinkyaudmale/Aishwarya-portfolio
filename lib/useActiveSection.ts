"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/LenisProvider";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
];

export function useActiveSection(onChange: (id: string) => void) {
  const { lenis } = useLenis();

  useLayoutEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const setup = () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => onChange(id),
            onEnterBack: () => onChange(id),
          })
        );
      });
    };

    // Wait for Lenis + scrollerProxy before creating triggers
    if (lenis) {
      ScrollTrigger.refresh();
      setup();
    } else {
      setup();
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [lenis, onChange]);
}
