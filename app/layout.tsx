import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import ThemeChrome from "@/components/ThemeChrome";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aishwarya Ugale | Java Backend Developer",
  description:
    "Portfolio of Aishwarya Ugale — Java Backend Developer from Karjat, Maharashtra. Spring Boot, REST APIs, MySQL.",
  keywords: [
    "Aishwarya Ugale",
    "Java Backend Developer",
    "Spring Boot",
    "REST APIs",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LenisProvider>
            <TooltipProvider delayDuration={200}>
              <ThemeChrome />
              <CustomCursor />
              {children}
              <Toaster position="bottom-right" />
            </TooltipProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
