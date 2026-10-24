import type { Metadata } from "next";
import { contact, stack, type Lang } from "@/content";
import { pagePath, type Role } from "@/roles";

/** Canonical address of the portfolio; every other deployment points search engines here. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hevertdavid.com").replace(/\/$/, "");

export const SITE_TITLE = "Hevert Gelis · Desarrollador Frontend";
export const SITE_DESCRIPTION =
  "Hevert Gelis, desarrollador frontend en Colombia: React, React Native, Next.js y e-commerce en VTEX. Apps en App Store y Google Play y producto para Cochez y Cía, Bancolombia, Chedraui y Pepe Ganga.";

export const SITE_TITLE_EN = "Hevert Gelis · Frontend Developer";
export const SITE_DESCRIPTION_EN =
  "Hevert Gelis, frontend developer in Colombia working remotely: React, React Native, Next.js and VTEX e-commerce. Apps on the App Store and Google Play and product for Cochez y Cía, Bancolombia, Chedraui and Pepe Ganga.";

/** hreflang links: Spanish at /, English at /en, Spanish as the default for other languages. */
export const LANGUAGE_ALTERNATES = { es: "/", en: "/en", "x-default": "/" };

/** Title, description, canonical and hreflang for a role page (/vtex, /en/vtex…). */
export function roleMetadata(lang: Lang, role: Role): Metadata {
  const url = pagePath(lang, role.id);
  return {
    title: role.title[lang],
    description: role.description[lang],
    alternates: {
      canonical: url,
      languages: { es: pagePath("es", role.id), en: pagePath("en", role.id), "x-default": pagePath("es", role.id) },
    },
    openGraph: {
      title: role.title[lang],
      description: role.description[lang],
      url,
      siteName: "Hevert Gelis",
      locale: lang === "es" ? "es_CO" : "en_US",
      type: "profile",
      firstName: "Hevert",
      lastName: "Gelis",
    },
    twitter: { card: "summary_large_image", title: role.title[lang] },
  };
}

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
