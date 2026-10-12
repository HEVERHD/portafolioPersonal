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
    "Desarrollador Frontend con React, Next.js y React Native. Producto para Cochez y Cía, Bancolombia, Chedraui y Pepeganga, y sitios para negocios en Colombia.",
  openGraph: {
    title: "Hevert Gelis · Desarrollador Frontend",
    description: "React · Next.js · React Native. Aplicaciones web y móviles de la idea a producción.",
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
