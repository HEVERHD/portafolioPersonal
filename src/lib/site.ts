import { contact, stack } from "@/content";

/** Canonical address of the portfolio; every other deployment points search engines here. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hevertdavid.com").replace(/\/$/, "");

export const SITE_TITLE = "Hevert Gelis · Desarrollador Frontend";
export const SITE_DESCRIPTION =
  "Hevert Gelis, desarrollador frontend en Colombia: React, React Native, Next.js y e-commerce en VTEX. Apps en App Store y Google Play y producto para Cochez y Cía, Bancolombia, Chedraui y Pepe Ganga.";

/** schema.org Person + WebSite, rendered as JSON-LD in the root layout. */
export function structuredData() {
  const knowsAbout = stack
    .filter((g) => g.id === "frontend" || g.id === "backend")
    .flatMap((g) => g.items.map((i) => i.name));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Hevert Gelis",
        alternateName: "Hevert David Gelis Díaz",
        jobTitle: "Desarrollador Frontend",
        url: SITE_URL,
        image: `${SITE_URL}/hevert-pro.jpg`,
        email: `mailto:${contact.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
        sameAs: [contact.linkedin, contact.github],
        knowsAbout,
        knowsLanguage: ["es", "en"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Hevert Gelis",
        inLanguage: "es",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}
