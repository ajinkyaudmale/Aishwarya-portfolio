"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Mail, Linkedin, Github, CheckCheck, Copy } from "lucide-react";
import { toast } from "sonner";
import { fadeInUp } from "@/lib/variants";

const contacts = [
  { label: "Email", value: "aishwaryaugale10@gmail.com", icon: Mail, glow: "cyan" as const },
  { label: "LinkedIn", value: "linkedin.com/in/aishwarya-ugale", icon: Linkedin, glow: "violet" as const },
  { label: "GitHub", value: "github.com/aishwaryaugale", icon: Github, glow: "amber" as const },
];

const darkGlow = {
  cyan: "dark:border-neon-cyan/30 dark:hover:shadow-[0_0_30px_rgba(0,245,212,0.25)] dark:hover:border-neon-cyan/60",
  violet: "dark:border-neon-violet/30 dark:hover:shadow-[0_0_30px_rgba(155,93,229,0.25)] dark:hover:border-neon-violet/60",
  amber: "dark:border-neon-amber/30 dark:hover:shadow-[0_0_30px_rgba(247,183,49,0.25)] dark:hover:border-neon-amber/60",
};

const darkIcon = {
  cyan: "dark:text-neon-cyan",
  violet: "dark:text-neon-violet",
  amber: "dark:text-neon-amber",
};

export default function Contact() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      toast.success("Copied to clipboard!", {
        icon: <CheckCheck size={16} className="text-brand dark:text-neon-cyan" />,
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <section id="contact" className="section-padding mx-auto max-w-7xl pb-20">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="section-title mb-4"
      >
        Get In <span className="accent-brand">Touch</span>
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-12 text-muted-foreground dark:hidden"
      >
        Feel free to reach out — I&apos;d love to connect!
      </motion.p>

      {/* Dark terminal block */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-12 hidden rounded-xl border border-white/10 bg-black/40 p-6 font-mono text-sm md:p-8 dark:block"
      >
        <div className="mb-2 text-neon-cyan/60">~/aishwarya/contact</div>
        <TypeAnimation
          sequence={["> reach_out --method=email", 1000, ""]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-neon-cyan"
        />
        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-neon-cyan" />
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {contacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <motion.button
              key={contact.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleCopy(contact.value, i)}
              className={`light-card group flex flex-col items-start gap-4 p-6 text-left transition-all duration-300 hover:shadow-card-hover ${darkGlow[contact.glow]}`}
              data-cursor
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 dark:bg-transparent">
                  <Icon size={22} className={`text-brand ${darkIcon[contact.glow]}`} />
                </div>
                {copiedIndex === i ? (
                  <CheckCheck size={18} className="text-brand dark:text-neon-cyan" />
                ) : (
                  <Copy
                    size={18}
                    className="text-muted-foreground/50 transition-colors group-hover:text-muted-foreground dark:text-white/30 dark:group-hover:text-white/60"
                  />
                )}
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:font-mono dark:text-white/40">
                  {contact.label}
                </div>
                <div className="break-all text-sm text-foreground dark:font-mono dark:text-white/80">
                  {contact.value}
                </div>
              </div>
              <span className="text-xs text-muted-foreground dark:font-mono dark:text-white/30">
                click to copy
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground dark:font-mono dark:text-white/30"
      >
        © {new Date().getFullYear()} Aishwarya Ugale · Built with Next.js
      </motion.footer>
    </section>
  );
}
