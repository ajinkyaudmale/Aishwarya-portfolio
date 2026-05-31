"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fadeInUp } from "@/lib/variants";

export default function Education() {
  return (
    <section id="education" className="section-padding mx-auto max-w-7xl section-alt">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-title mb-12"
      >
        <span className="accent-brand-alt">Education</span>
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="mx-auto max-w-2xl"
      >
        <Card className="relative overflow-hidden dark:border-neon-cyan/20">
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
            <div className="absolute inset-x-0 h-[2px] animate-scan-line bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60" />
          </div>

          <CardHeader className="flex flex-row items-start gap-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 dark:bg-transparent"
            >
              <GraduationCap size={28} className="text-brand dark:text-neon-amber" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl text-foreground">B.Sc Computer Science</CardTitle>
              <CardDescription className="mt-2 text-base font-medium text-brand dark:font-mono dark:text-neon-cyan">
                Dada Patil College Mahavidyalay
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl bg-muted p-4 dark:border dark:border-white/10 dark:bg-white/[0.02]">
              <p className="text-sm text-muted-foreground dark:font-mono">
                <span className="font-semibold text-foreground dark:text-neon-cyan">university:</span>{" "}
                Savitribai Phule Pune University (SPPU)
              </p>
              <p className="mt-2 text-sm text-muted-foreground dark:font-mono">
                <span className="font-semibold text-foreground dark:text-neon-violet">degree:</span>{" "}
                Bachelor of Science in Computer Science
              </p>
            </div>
          </CardContent>

          <div
            className="pointer-events-none absolute inset-0 hidden opacity-[0.03] dark:block"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(0,245,212,0.4) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />
        </Card>
      </motion.div>
    </section>
  );
}
