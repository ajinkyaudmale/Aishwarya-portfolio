"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { fadeInUp } from "@/lib/variants";

gsap.registerPlugin(ScrollTrigger);

const bio =
  "I'm a passionate Java Backend Developer from Karjat, Maharashtra. Currently interning at iStudio (remote), I build robust REST APIs and data-driven applications using Spring Boot, JDBC, and MySQL. I love solving algorithmic challenges and turning complex problems into clean, maintainable code.";

const stats = [
  { label: "Projects", value: 3, suffix: "+" },
  { label: "Internship", value: 1, suffix: "" },
  { label: "Months Experience", value: 6, suffix: "" },
];

const quickFacts = [
  { icon: MapPin, text: "Karjat, Maharashtra, India" },
  { icon: Briefcase, text: "Java Backend Developer (Fresher)" },
  { icon: GraduationCap, text: "B.Sc Computer Science — SPPU" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (bioRef.current && !prefersReducedMotion) {
        const words = bio.split(" ");
        bioRef.current.innerHTML = words
          .map((word) => `<span class="inline-block opacity-30">${word}&nbsp;</span>`)
          .join("");

        gsap.to(bioRef.current.querySelectorAll("span"), {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        });
      } else if (bioRef.current) {
        bioRef.current.textContent = bio;
      }

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;

        if (prefersReducedMotion) {
          el.textContent = String(target);
          return;
        }

        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
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
        About <span className="accent-brand">Me</span>
      </motion.h2>

      <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto lg:mx-0"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl shadow-card dark:border dark:border-neon-violet/30 dark:shadow-[0_0_40px_rgba(155,93,229,0.2)] lg:h-[420px] lg:w-[320px]">
            <Image
              src="/hero-headshot.png"
              alt="Aishwarya Ugale"
              fill
              className="object-cover object-top dark:hidden"
              sizes="(max-width: 1024px) 320px, 320px"
            />
            <Image
              src="/about-photo.png"
              alt="Aishwarya Ugale working on her laptop"
              fill
              className="hidden object-cover object-center dark:block"
              sizes="(max-width: 1024px) 320px, 320px"
            />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-space-black/50 via-transparent to-neon-violet/5 dark:block" />
          </div>
        </motion.div>

        <div>
          <p
            ref={bioRef}
            className="mb-8 text-[clamp(1rem,2vw,1.1rem)] leading-relaxed text-muted-foreground"
          >
            {bio}
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            {quickFacts.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:font-mono dark:shadow-none"
              >
                <Icon size={16} className="text-brand dark:text-neon-cyan" />
                {text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="light-card p-6 text-center dark:border-neon-cyan/20 dark:bg-neon-cyan/5"
              >
                <div className="text-[clamp(2rem,5vw,2.75rem)] font-bold text-brand dark:text-neon-cyan">
                  <span ref={(el) => { statRefs.current[i] = el; }}>0</span>
                  {stat.suffix}
                </div>
                <div className="mt-1 text-sm text-muted-foreground dark:font-mono dark:text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
