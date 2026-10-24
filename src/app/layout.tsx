import type { Metadata } from "next";
import { Caveat, Fraunces, Instrument_Sans } from "next/font/google";
import { LANGUAGE_ALTERNATES, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, structuredData } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

// Editorial identity: serif headlines, plain sans body, a handwritten accent
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"], axes: ["opsz", "SOFT"] });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // Both Vercel deployments serve this page; tell search engines which address is the real one
  alternates: { canonical: "/", languages: LANGUAGE_ALTERNATES },
  authors: [{ name: "Hevert Gelis", url: SITE_URL }],
  creator: "Hevert Gelis",
  // Social image comes from app/opengraph-image.png and app/twitter-image.png
  openGraph: {
    title: SITE_TITLE,
    description: "React · React Native · Next.js. Apps web y móviles en producción, de la idea a las tiendas.",
    url: "/",
    siteName: "Hevert Gelis",
    locale: "es_CO",
    type: "profile",
    firstName: "Hevert",
    lastName: "Gelis",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set by THEME_SCRIPT before React hydrates, so the attribute is expected to differ
    <html lang="es" className={`${fraunces.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          // JSON-LD built from our own static data, not from user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
