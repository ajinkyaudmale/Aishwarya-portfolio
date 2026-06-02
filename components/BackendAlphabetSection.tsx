"use client";

import { motion } from "framer-motion";
import AlphabetKeyboard from "@/components/AlphabetKeyboard";
import { fadeInUp } from "@/lib/variants";

export default function BackendAlphabetSection() {
  return (
    <section id="backend-alphabet" className="section-padding mx-auto max-w-7xl section-alt">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-title mb-3"
      >
        Concepts <span className="accent-brand dark:text-neon-cyan">I Can Handle</span>
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-8 max-w-3xl text-muted-foreground dark:font-mono dark:text-sm dark:text-white/60"
      >
        <span className="dark:hidden">
          A quick concept map of backend topics I work with in real projects.
        </span>
        <span className="hidden dark:inline">
          {"// my backend concepts and practical understanding"}
        </span>
      </motion.p>

      <AlphabetKeyboard
        title="My Backend Concept Keys"
        subtitle="Hover or tap any key to see the concept I can handle."
        initialLetter="S"
      />
    </section>
  );
}
