"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/lib/variants";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Improved daily operational efficiency through structured task management",
  "Conducted team project research and contributed to planning sessions",
  "Collaborated cross-functionally with diverse team members",
  "Completed industry tool training to stay current with modern workflows",
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding mx-auto max-w-7xl section-alt"
    >
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-title mb-12"
      >
        Work <span className="accent-brand-warm">Experience</span>
      </motion.h2>

      <div className="relative ml-4 md:ml-8">
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-0.5 origin-top bg-brand/30 dark:w-[2px] dark:bg-gradient-to-b dark:from-neon-cyan dark:via-neon-violet dark:to-neon-amber dark:shadow-[0_0_15px_rgba(0,245,212,0.5)]"
        />

        <div className="relative pl-10 md:pl-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute -left-[2.65rem] top-2 h-4 w-4 rounded-full border-2 border-brand bg-card dark:border-neon-cyan dark:bg-space-black dark:shadow-[0_0_12px_rgba(0,245,212,0.6)] md:-left-[3.65rem]" />

            <div className="light-card p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  Intern — iStudio
                </h3>
                <Badge variant="secondary">Remote</Badge>
              </div>

              <p className="mb-6 text-sm font-medium text-brand dark:font-mono dark:text-neon-cyan">
                Nov 2025 – Present
              </p>

              <ul className="space-y-3">
                {bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 text-muted-foreground dark:text-white/70"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-neon-violet" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
