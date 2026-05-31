"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/lib/variants";

const skills = [
  { name: "Java", level: "Advanced" },
  { name: "Spring Boot", level: "Intermediate" },
  { name: "MySQL", level: "Intermediate" },
  { name: "JDBC", level: "Intermediate" },
  { name: "REST APIs", level: "Intermediate" },
  { name: "Postman", level: "Intermediate" },
  { name: "OOPs", level: "Advanced" },
  { name: "DSA", level: "Intermediate" },
  { name: "HTML", level: "Intermediate" },
  { name: "CSS", level: "Intermediate" },
  { name: "JavaScript", level: "Beginner" },
  { name: "Git", level: "Intermediate" },
  { name: "GitHub", level: "Intermediate" },
];

const levelVariant = (level: string) => {
  if (level === "Advanced") return "default" as const;
  if (level === "Intermediate") return "secondary" as const;
  return "amber" as const;
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding mx-auto max-w-7xl">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-title mb-4"
      >
        Tech{" "}
        <span className="accent-brand dark:hidden">Skills</span>
        <span className="accent-brand-alt hidden dark:inline">Arsenal</span>
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-12 max-w-xl text-muted-foreground dark:font-mono dark:text-sm dark:text-white/50"
      >
        <span className="dark:hidden">Tools and technologies I work with</span>
        <span className="hidden dark:inline">{"// tools & technologies I work with"}</span>
      </motion.p>

      {/* Light mode cards */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 dark:hidden">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="light-card flex h-28 w-28 flex-col items-center justify-center gap-2 md:h-32 md:w-32"
          >
            <span className="text-sm font-semibold text-foreground">{skill.name}</span>
            <Badge variant={levelVariant(skill.level)} className="text-[10px]">
              {skill.level}
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Dark mode hex grid */}
      <div className="hidden flex-wrap items-center justify-center gap-4 md:gap-6 dark:flex">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.15 }}
            className="group relative flex h-28 w-28 flex-col items-center justify-center md:h-32 md:w-32"
          >
            <div className="hex-clip absolute inset-0 border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-neon-cyan group-hover:bg-neon-cyan/10 group-hover:shadow-[0_0_30px_rgba(0,245,212,0.3)]" />
            <div className="relative z-10 flex flex-col items-center gap-2 px-2 text-center">
              <span className="font-mono text-xs font-bold text-white md:text-sm">{skill.name}</span>
              <Badge variant={levelVariant(skill.level)} className="text-[10px]">
                {skill.level}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
