"use client";

export default function ThemeChrome() {
  return (
    <div className="hidden dark:contents">
      <div className="grid-bg fixed inset-0 -z-20 pointer-events-none" aria-hidden />
      <div className="noise-overlay" aria-hidden />
    </div>
  );
}
