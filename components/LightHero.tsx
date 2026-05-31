"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/LenisProvider";
import { staggerContainer, fadeInUp } from "@/lib/variants";
import {
  ArrowRight,
  Download,
  Coffee,
  Leaf,
  Database,
  Braces,
} from "lucide-react";

const techStack = [
  { icon: Coffee, label: "Java" },
  { icon: Leaf, label: "Spring Boot" },
  { icon: Database, label: "MySQL" },
  { icon: Braces, label: "REST APIs" },
];

export default function LightHero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      className="section-padding mx-auto flex min-h-screen max-w-7xl items-center pt-24"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1"
        >
          <motion.p variants={fadeInUp} className="mb-2 text-lg font-medium text-brand">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="mb-3 font-sans font-bold leading-tight text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Aishwarya Ugale
          </motion.h1>

          <motion.p variants={fadeInUp} className="mb-6 text-xl font-semibold text-brand md:text-2xl">
            Java Backend Developer
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I build robust, scalable and secure backend applications using{" "}
            <span className="font-semibold text-brand">Java</span>,{" "}
            <span className="font-semibold text-brand">Spring Boot</span>,{" "}
            <span className="font-semibold text-brand">REST APIs</span> and{" "}
            <span className="font-semibold text-brand">MySQL</span>.
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-xl px-6 shadow-card hover:shadow-card-hover"
              onClick={() => scrollTo("#projects", -80)}
            >
              View My Work
              <ArrowRight size={18} />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-6">
              <a href="/resume.pdf" download>
                <Download size={18} />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            {techStack.map(({ icon: Icon, label }) => (
              <div key={label} className="skill-card min-w-[100px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
                  <Icon size={20} className="text-brand" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-card">
            <Image
              src="/about-photo.png"
              alt="Aishwarya Ugale"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 540px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
