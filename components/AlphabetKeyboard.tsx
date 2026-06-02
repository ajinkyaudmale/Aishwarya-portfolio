"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { alphabetData, type AlphabetItem } from "@/lib/alphabetData";
import { fadeInUp } from "@/lib/variants";

type AlphabetKeyboardProps = {
  title: string;
  subtitle?: string;
  initialLetter?: string;
};

function splitRows(data: AlphabetItem[]) {
  return [data.slice(0, 10), data.slice(10, 19), data.slice(19, 26)];
}

const [row1Data, row2Data, row3Data] = splitRows(alphabetData);

export default function AlphabetKeyboard({
  title,
  subtitle,
  initialLetter = "A",
}: AlphabetKeyboardProps) {
  const [activeItem, setActiveItem] = useState<AlphabetItem>(
    alphabetData.find((item) => item.letter === initialLetter) ?? alphabetData[0]
  );
  const [typedText, setTypedText] = useState("");

  const [row1, row2, row3] = useMemo(() => [row1Data, row2Data, row3Data], []);

  useEffect(() => {
    const fullText = activeItem.text;
    setTypedText("");

    let index = 0;
    const speed = 2;
    const timer = window.setInterval(() => {
      index += speed;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [activeItem]);

  const keyBaseClass =
    "group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border text-sm font-semibold transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 md:h-12 md:w-12";
  const keyThemeClass =
    "border-zinc-300/80 bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200 text-zinc-800 shadow-[inset_1px_1px_0_rgba(255,255,255,0.95),inset_-1px_-2px_0_rgba(0,0,0,0.05),0_7px_10px_rgba(0,0,0,0.12)] hover:border-zinc-500/50 hover:text-zinc-900 hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.95),inset_-1px_-2px_0_rgba(0,0,0,0.06),0_9px_14px_rgba(0,0,0,0.16)] dark:border-zinc-700/90 dark:bg-gradient-to-b dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 dark:font-mono dark:text-zinc-100 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-1px_-2px_0_rgba(0,0,0,0.55),0_8px_16px_rgba(0,0,0,0.45)] dark:hover:border-zinc-400/70 dark:hover:text-white dark:hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.12),inset_-1px_-2px_0_rgba(0,0,0,0.6),0_10px_18px_rgba(0,0,0,0.55)]";
  const activeKeyClass =
    "-translate-x-0.5 -translate-y-0.5 border-zinc-500/70 bg-gradient-to-b from-zinc-100 to-zinc-200 text-zinc-900 shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-2px_0_rgba(0,0,0,0.08),0_10px_14px_rgba(0,0,0,0.16)] dark:border-zinc-400/80 dark:from-zinc-600 dark:to-zinc-800 dark:text-white dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.14),inset_-1px_-2px_0_rgba(0,0,0,0.62),0_12px_18px_rgba(0,0,0,0.62)]";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="light-card mt-10 border-zinc-300/70 bg-zinc-100/80 p-5 dark:border-zinc-700 dark:bg-zinc-900/70 md:p-7"
    >
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-foreground dark:font-mono dark:text-neon-cyan md:text-2xl">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground dark:font-mono dark:text-white/60">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mb-6 min-h-[64px] rounded-xl border border-zinc-400/30 bg-zinc-200/55 px-4 py-3 font-medium text-zinc-800 leading-relaxed dark:border-zinc-600 dark:bg-zinc-800/60 dark:font-mono dark:text-zinc-100 md:text-base">
        {typedText}
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-zinc-700 align-middle dark:bg-zinc-200" />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {row1.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${keyBaseClass} ${keyThemeClass} ${
                activeItem.letter === item.letter ? activeKeyClass : ""
              }`}
              onMouseEnter={() => setActiveItem(item)}
              onFocus={() => setActiveItem(item)}
              onClick={() => setActiveItem(item)}
              aria-label={`Show meaning of ${item.letter}`}
            >
              <span className="pointer-events-none absolute inset-x-1 top-1 h-1 rounded-full bg-white/65 dark:bg-white/15" />
              {item.letter}
            </button>
          ))}
        </div>

        <div className="ml-4 flex flex-wrap justify-center gap-2 md:ml-8 md:gap-3">
          {row2.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${keyBaseClass} ${keyThemeClass} ${
                activeItem.letter === item.letter ? activeKeyClass : ""
              }`}
              onMouseEnter={() => setActiveItem(item)}
              onFocus={() => setActiveItem(item)}
              onClick={() => setActiveItem(item)}
              aria-label={`Show meaning of ${item.letter}`}
            >
              <span className="pointer-events-none absolute inset-x-1 top-1 h-1 rounded-full bg-white/65 dark:bg-white/15" />
              {item.letter}
            </button>
          ))}
        </div>

        <div className="ml-8 flex flex-wrap justify-center gap-2 md:ml-16 md:gap-3">
          {row3.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${keyBaseClass} ${keyThemeClass} ${
                activeItem.letter === item.letter ? activeKeyClass : ""
              }`}
              onMouseEnter={() => setActiveItem(item)}
              onFocus={() => setActiveItem(item)}
              onClick={() => setActiveItem(item)}
              aria-label={`Show meaning of ${item.letter}`}
            >
              <span className="pointer-events-none absolute inset-x-1 top-1 h-1 rounded-full bg-white/65 dark:bg-white/15" />
              {item.letter}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
