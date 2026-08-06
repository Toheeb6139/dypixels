import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";
import { SITE_URL } from "@/lib/site";

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
  weight: ["400", "500", "600"],
});

const title = "dypixels — brand & visual identity";
const description =
  "dypixels is the brand & visual identity studio of a Lagos-based designer. Branding, illustration, and social systems for people who want to be remembered.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "dypixels",
    images: [{ url: "/og-banner.png", width: 1500, height: 500 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint, so there's no flash of the wrong theme.
            Respects a saved choice first, falls back to the device's
            system preference. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('dypixels-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        {/* Adaptive favicon — light icon for light browser chrome, white
            icon for dark. Falls back to app/icon.png (the light/blue
            version) anywhere this isn't supported. */}
        <link rel="icon" href="/favicon-light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-body bg-paper text-ink antialiased">
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
