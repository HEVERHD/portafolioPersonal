import type { Metadata } from "next";
import { Caveat, Fraunces, Instrument_Sans } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

// Editorial identity: serif headlines, plain sans body, a handwritten accent
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"], axes: ["opsz", "SOFT"] });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hevertgelis.vercel.app"),
  title: "Hevert Gelis · Desarrollador Frontend",
  description:
    "Desarrollador Frontend con React, React Native y Next.js, y conocimientos de backend con Node.js. Producto para Cochez y Cía, Bancolombia, Chedraui y Pepeganga, y sistemas para negocios en Colombia.",
  openGraph: {
    title: "Hevert Gelis · Desarrollador Frontend",
    description: "React · React Native · Next.js. Apps web y móviles en producción, de la idea a las tiendas.",
    images: ["/hevert-studio.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${instrument.variable} ${caveat.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
