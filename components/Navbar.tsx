"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/LenisProvider";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lenis, scrollTo } = useLenis();

  useEffect(() => {
    const updateScrolled = (scrollY: number) => setScrolled(scrollY > 20);

    if (lenis) {
      updateScrolled(lenis.scroll);
      const onScroll = ({ scroll }: { scroll: number }) => updateScrolled(scroll);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onScroll = () => updateScrolled(window.scrollY);
    updateScrolled(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollTo(href, -80);
      setIsOpen(false);
    },
    [scrollTo]
  );

  const linkClass = (isActive: boolean) =>
    cn(
      "relative py-1 text-sm font-medium transition-colors",
      "dark:font-mono dark:rounded-md dark:px-3 dark:py-2",
      isActive
        ? "text-brand dark:bg-neon-cyan/10 dark:text-neon-cyan"
        : "text-muted-foreground hover:text-brand dark:text-white/60 dark:hover:text-neon-cyan"
    );

  return (
    <nav
      data-navbar
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-background/80 py-5 backdrop-blur-sm dark:bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 text-brand dark:text-neon-cyan"
          data-cursor
        >
          <Code2 size={28} strokeWidth={2.5} className="dark:hidden" />
          <span className="hidden h-9 w-9 items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 font-mono text-sm font-bold dark:flex">
            AU
          </span>
          <span className="hidden font-mono text-lg font-bold sm:inline dark:inline">Aishwarya</span>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-2 dark:gap-1 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={linkClass(isActive)}
                    data-cursor
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand dark:hidden" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground dark:border-white/10 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-cursor
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-background dark:bg-space-black/95 dark:backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-5 dark:border-white/10">
              <span className="font-mono text-lg font-bold text-brand dark:text-neon-cyan">AU</span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border dark:border-white/10"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="flex flex-col gap-2 px-6 pt-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-lg font-medium transition-colors dark:font-mono",
                      activeSection === link.href.slice(1)
                        ? "bg-brand/10 text-brand dark:bg-neon-cyan/10 dark:text-neon-cyan"
                        : "text-muted-foreground hover:bg-muted hover:text-brand dark:text-white/70 dark:hover:text-neon-cyan"
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
