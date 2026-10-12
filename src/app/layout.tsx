import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

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
    <html lang="es" className={`${inter.variable} ${space.variable} ${jetbrains.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
