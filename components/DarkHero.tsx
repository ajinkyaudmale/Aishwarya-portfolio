"use client";

import { useRef, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/LenisProvider";
import { staggerContainer, fadeInUp } from "@/lib/variants";
import {
  ChevronDown,
  Code2,
  Download,
  Leaf,
} from "lucide-react";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  ssr: false,
});

const apiEndpoints = [
  "/api/v1/hello",
  "/api/v1/skills",
  "/api/v1/projects",
  "/api/v1/contact",
];

export default function DarkHero() {
  const { scrollTo } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [particleOpacity, setParticleOpacity] = useState(1);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 12,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <ParticleCanvas opacity={particleOpacity} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-space-black/20 to-space-black" />

      {/* Mobile poster */}
      <div className="relative lg:hidden">
        <div className="relative aspect-[9/16] max-h-[85vh] w-full sm:aspect-[3/4] sm:max-h-none">
          <Image
            src="/hero-portrait.png"
            alt="Aishwarya Ugale"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-space-black/30 via-transparent to-space-black" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-space-black via-space-black/90 to-transparent px-4 pb-10 pt-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="rounded-full border-2 border-neon-cyan/60 bg-neon-cyan/10 shadow-[0_0_25px_rgba(0,245,212,0.25)]"
              data-cursor
              onClick={() => scrollTo("#projects", -80)}
            >
              <Code2 size={18} />
              View Projects
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full border-2 border-neon-violet/50" data-cursor>
              <a href="/resume.pdf" download>
                <Download size={18} />
                Download Resume
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Desktop split */}
      <div className="relative hidden min-h-screen items-center section-padding lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col justify-center py-12"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 font-mono text-sm uppercase tracking-[0.35em] text-neon-cyan/80"
          >
            Karjat, Maharashtra
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Aishwarya <span className="text-gradient">Ugale</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="mb-8 flex min-h-[2.5rem] items-center font-mono text-[clamp(1rem,2vw,1.35rem)] text-neon-violet"
          >
            <TypeAnimation
              sequence={[
                "Java Backend Developer",
                2000,
                "Spring Boot Engineer",
                2000,
                "REST API Specialist",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p variants={fadeInUp} className="mb-10 max-w-xl text-white/60">
            Building robust backend systems with Java, Spring Boot, and clean
            architecture — turning complex problems into maintainable code.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Button size="lg" data-cursor onClick={() => scrollTo("#projects", -80)}>
              View Projects
            </Button>
            <Button asChild variant="ghost" size="lg" data-cursor>
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-center py-12"
        >
          <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,245,212,0.12)]">
            <Image
              src="/hero-headshot.png"
              alt="Aishwarya Ugale"
              fill
              priority
              className="object-cover object-center"
              sizes="50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent to-space-black/30" />
          </div>

          <div
            ref={(el) => { floatRefs.current[0] = el; }}
            className="absolute left-0 top-[20%] rounded-xl border border-neon-cyan/40 bg-space-black/85 px-4 py-3 shadow-[0_0_30px_rgba(0,245,212,0.25)] backdrop-blur-md xl:left-4"
          >
            <div className="flex items-center gap-2">
              <Leaf size={22} className="text-neon-cyan" />
              <span className="font-mono text-sm font-semibold text-neon-cyan">spring boot</span>
            </div>
          </div>

          <div
            ref={(el) => { floatRefs.current[1] = el; }}
            className="absolute bottom-[18%] right-0 w-56 rounded-xl border border-[#4cc9f0]/30 bg-space-black/90 p-4 backdrop-blur-md xl:right-4"
          >
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-white/50">
              <span>REST API</span>
              <span className="text-neon-cyan">→</span>
            </div>
            <ul className="space-y-2">
              {apiEndpoints.map((path) => (
                <li key={path} className="flex items-center gap-2 font-mono text-[11px] text-white/70">
                  <span className="rounded bg-neon-cyan/20 px-1.5 py-0.5 text-[9px] font-bold text-neon-cyan">GET</span>
                  {path}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 lg:flex"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-neon-cyan" />
      </div>
    </section>
  );
}
