"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/variants";

const projects = [
  {
    title: "Code Hub Blog Platform",
    description:
      "Full-stack blog platform with user authentication, CRUD operations, and RESTful API endpoints built with Spring Boot.",
    tags: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    github: "https://github.com/aishwaryaugale",
    comingSoon: false,
  },
  {
    title: "Digital Blood Bank & Donor Matcher",
    description:
      "Blood donation management system with donor-recipient matching logic using JDBC and MySQL database operations.",
    tags: ["Java", "JDBC", "MySQL"],
    github: "https://github.com/aishwaryaugale",
    comingSoon: false,
  },
  {
    title: "Employee Management System",
    description:
      "CRUD-based employee records management with search, filter, and data persistence using Java and JDBC.",
    tags: ["Java", "JDBC", "MySQL"],
    github: "https://github.com/aishwaryaugale",
    comingSoon: false,
  },
  {
    title: "Coming Soon",
    description:
      "Next project in the pipeline — stay tuned for more backend engineering work.",
    tags: ["TBD"],
    github: null,
    comingSoon: true,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="group h-72 cursor-pointer [perspective:1000px] md:h-80"
      onClick={() => setFlipped(!flipped)}
      data-cursor
    >
      <div
        className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card [backface-visibility:hidden] dark:border-white/10 dark:bg-gradient-to-br dark:from-white/[0.05] dark:to-white/[0.02] dark:shadow-none">
          <div>
            <h3 className="mb-3 text-xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={project.comingSoon ? "outline" : "default"}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-xs text-brand/60 dark:font-mono dark:text-neon-cyan/60">Click to flip →</p>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-brand/20 bg-brand/5 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-neon-violet/30 dark:bg-gradient-to-br dark:from-neon-violet/10 dark:to-neon-cyan/5">
          {project.comingSoon ? (
            <div className="text-center">
              <div className="mb-4 text-4xl">🚀</div>
              <p className="font-medium text-brand dark:font-mono dark:text-neon-amber">Launching soon...</p>
            </div>
          ) : (
            <>
              <ExternalLink size={32} className="mb-4 text-brand dark:text-neon-cyan" />
              <p className="mb-6 text-center text-sm text-muted-foreground dark:text-white/70">
                View source code on GitHub
              </p>
              <Button asChild variant="outline" size="sm">
                <a
                  href={project.github!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding mx-auto max-w-7xl">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-title mb-4"
      >
        Featured <span className="accent-brand">Projects</span>
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-12 text-muted-foreground dark:font-mono dark:text-sm dark:text-white/50"
      >
        <span className="dark:hidden">Click cards to see more details</span>
        <span className="hidden dark:inline">{"// click cards to flip"}</span>
      </motion.p>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
