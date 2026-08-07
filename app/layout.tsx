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
        {/* One favicon everywhere — the adaptive light/dark version
            wasn't reliably respected on mobile Chrome, so this is the
            white icon (same one used in dark mode) regardless of
            device theme. Worth knowing: on a light browser tab bar,
            a white icon has low contrast — flag if that's an issue. */}
        <link rel="icon" href="/favicon-dark.png" />
      </head>
      <body className="font-body bg-paper text-ink antialiased">
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
