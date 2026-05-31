"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import LightHero from "@/components/LightHero";
import DarkHero from "@/components/DarkHero";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <LightHero />;
  }

  return resolvedTheme === "dark" ? <DarkHero /> : <LightHero />;
}
