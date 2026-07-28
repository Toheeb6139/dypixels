import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SpecModeOverlay } from "@/components/SpecMode";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "dypixels — brand & visual identity",
  description:
    "dypixels is the brand & visual identity studio of a Lagos-based designer. Branding, illustration, and social systems for people who want to be remembered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-paper text-ink antialiased">
        <SpecModeOverlay />
        {children}
      </body>
    </html>
  );
}
