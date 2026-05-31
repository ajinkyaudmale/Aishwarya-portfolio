"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { useActiveSection } from "@/lib/useActiveSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const handleActive = useCallback((id: string) => setActiveSection(id), []);

  useActiveSection(handleActive);

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar activeSection={activeSection} />

      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
