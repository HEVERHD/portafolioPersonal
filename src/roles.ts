import type { Lang, Skill } from "@/content";

type T = Record<Lang, string>;

export type RoleId = "vtex" | "react-native" | "frontend";

/**
 * A version of the portfolio aimed at one kind of job: its own headline and pitch, the projects
 * and specialties that fit it first, and the matching CV. Everything else is the same page.
 */
export type Role = {
  id: RoleId;
  /** Short name for the banner and the page title. */
  label: T;
  title: T;
  description: T;
  eyebrow: T;
  headline: T;
  headlineAccent: T;
  pitch: T;
  /** Projects shown first, in this order; the first one gets the large card. */
  projects: string[];
  skills: Skill["id"][];
  /** Companies whose experience fits this role, marked in the timeline. */
  jobs: string[];
  /** CV tailored to the role, built by cv/build.mjs; without it the page links the general CV. */
  cv?: T;
  /** Suggested questions for the assistant on this role's page. */
  questions?: T[];
  /** Bullets that replace a job's points (not its highlight lines) in the role's CV, keyed by company. */
  cvPoints?: Record<string, T[]>;
};

export const roles: Role[] = [
  {
    id: "vtex",
    label: { es: "VTEX y FastStore", en: "VTEX & FastStore" },
    title: {
      es: "Hevert Gelis · Desarrollador Frontend VTEX y FastStore",
      en: "Hevert Gelis · VTEX & FastStore Frontend Developer",
    },
    description: {
      es: "Desarrollador frontend VTEX en Colombia: tiendas de Chedraui y Pepe Ganga sobre VTEX IO, componentes custom en React y TypeScript, y una tienda de prueba en FastStore. Disponible para trabajo remoto.",
      en: "VTEX frontend developer in Colombia: Chedraui and Pepe Ganga stores on VTEX IO, custom React and TypeScript components, and a FastStore demo store. Available for remote work.",
    },
    eyebrow: { es: "Desarrollador frontend · VTEX IO y FastStore", en: "Frontend developer · VTEX IO and FastStore" },
    headline: { es: "Construyo tiendas VTEX que cargan rápido y", en: "I build VTEX stores that load fast and" },
    headlineAccent: { es: "venden todos los días.", en: "sell every single day." },
    pitch: {
      es: "En ITG Globers trabajé en las tiendas de Chedraui y Pepe Ganga sobre VTEX IO: componentes custom en React y TypeScript configurables desde el Site Editor, pagos en línea y foco en rendimiento. Hoy sigo de cerca FastStore, con una tienda de prueba propia que personaliza el tema, las tarjetas de producto y la regionalización.",
      en: "At ITG Globers I worked on the Chedraui and Pepe Ganga stores on VTEX IO: custom React and TypeScript components configurable from the Site Editor, online payments and a focus on performance. Today I keep up with FastStore through my own demo store that customizes the theme, product cards and regionalization.",
    },
    projects: ["faststore", "masterpiece", "majestic", "dulces"],
    skills: ["ecommerce", "frontend", "mobile", "backend"],
    jobs: ["ITG Globers"],
    cv: { es: "/cv/Hevert-Gelis-CV-ES-VTEX.pdf", en: "/cv/Hevert-Gelis-CV-EN-VTEX.pdf" },
    questions: [
      { es: "¿Qué hizo en las tiendas VTEX de Chedraui y Pepe Ganga?", en: "What did he do on the Chedraui and Pepe Ganga VTEX stores?" },
      { es: "¿Ha trabajado con FastStore?", en: "Has he worked with FastStore?" },
      { es: "¿Tiene experiencia con checkout y pagos?", en: "Does he have checkout and payments experience?" },
    ],
    cvPoints: {
      "ITG Globers": [
        {
          es: "Tiendas e-commerce de Chedraui y Pepe Ganga sobre VTEX IO Store Framework: componentes custom en React y TypeScript configurables desde el Site Editor, y maquetación responsive de home, PLP y PDP.",
          en: "Chedraui and Pepe Ganga e-commerce stores on VTEX IO Store Framework: custom React and TypeScript components configurable from the Site Editor, and responsive home, PLP and PDP layouts.",
        },
        {
          es: "Regionalización por tienda o región, con precios y disponibilidad según la ubicación del cliente.",
          en: "Regionalization by store or region, with prices and availability based on the customer's location.",
        },
        {
          es: "Personalizaciones de checkout (checkout-ui-custom) y consumo de APIs VTEX (Catalog, Intelligent Search, Checkout/OrderForm) y GraphQL.",
          en: "Checkout customizations (checkout-ui-custom) and VTEX APIs (Catalog, Intelligent Search, Checkout/OrderForm) and GraphQL.",
        },
        {
          es: "Contenido gestionado desde Headless CMS y optimización de rendimiento y Core Web Vitals.",
          en: "Content managed from the Headless CMS, and performance and Core Web Vitals optimization.",
        },
        {
          es: "Participé en Framework II, un framework interno sobre React Native para crear apps a partir de JSON declarativos (server-driven UI).",
          en: "Contributed to Framework II, an internal React Native framework for building apps from declarative JSON (server-driven UI).",
        },
        {
          es: "Funcionalidades web y móviles para Bancolombia y App Morado, consumiendo APIs REST con foco en rendimiento y experiencia de usuario.",
          en: "Web and mobile features for Bancolombia and App Morado on REST APIs, focused on performance and UX.",
        },
        {
          es: "Equipos ágiles multipaís con GitFlow, code review y Jira.",
          en: "Multi-country agile teams with GitFlow, code review and Jira.",
        },
      ],
    },
  },
  {
    id: "react-native",
    label: { es: "React Native", en: "React Native" },
    title: {
      es: "Hevert Gelis · Desarrollador React Native (iOS y Android)",
      en: "Hevert Gelis · React Native Developer (iOS & Android)",
    },
    description: {
      es: "Desarrollador React Native en Colombia: migré Aludra Ventas Asistidas de Java nativo a React Native y la publiqué en App Store y Google Play; login y home de Chedraui (5M+ descargas) y pagos en Pepe Ganga.",
      en: "React Native developer in Colombia: migrated Aludra Ventas Asistidas from native Java to React Native and shipped it to the App Store and Google Play; Chedraui's login and home (5M+ downloads) and Pepe Ganga's payments.",
    },
    eyebrow: { es: "Desarrollador React Native · iOS y Android", en: "React Native developer · iOS and Android" },
    headline: { es: "Llevo apps móviles a App Store y Google Play,", en: "I ship mobile apps to the App Store and Google Play," },
    headlineAccent: { es: "y las mantengo vivas.", en: "and keep them running." },
    pitch: {
      es: "Migré Aludra Ventas Asistidas de Java nativo a React Native, funcionalidad por funcionalidad, y la publiqué en ambas tiendas. Antes desarrollé el login y el home de la app de Chedraui, integré los pagos de Pepe Ganga y participé en Framework II, un framework para crear apps a partir de JSON declarativos.",
      en: "I migrated Aludra Ventas Asistidas from native Java to React Native, feature by feature, and shipped it to both stores. Before that I built the login and home of the Chedraui app, integrated Pepe Ganga's payments and contributed to Framework II, a framework for building apps from declarative JSON.",
    },
    projects: ["reservas", "faststore", "masterpiece"],
    skills: ["mobile", "frontend", "backend", "ecommerce"],
    jobs: ["Hypernova Labs", "ITG Globers"],
    questions: [
      { es: "¿Cómo fue la migración de Java a React Native?", en: "How did the Java to React Native migration go?" },
      { es: "¿Qué apps ha publicado en las tiendas?", en: "Which apps has he shipped to the stores?" },
      { es: "¿Qué es Framework II?", en: "What is Framework II?" },
    ],
  },
  {
    id: "frontend",
    label: { es: "Frontend React y Next.js", en: "React & Next.js frontend" },
    title: {
      es: "Hevert Gelis · Desarrollador Frontend React y Next.js",
      en: "Hevert Gelis · React & Next.js Frontend Developer",
    },
    description: {
      es: "Desarrollador frontend React, Next.js y TypeScript en Colombia: dashboards para banca y cumplimiento, el frontend completo de un SaaS de facturación y sitios en Next.js con métricas de Lighthouse reales.",
      en: "React, Next.js and TypeScript frontend developer in Colombia: dashboards for banking and compliance, the full frontend of an invoicing SaaS and Next.js sites with real Lighthouse scores.",
    },
    eyebrow: { es: "Desarrollador frontend · React, Next.js y TypeScript", en: "Frontend developer · React, Next.js and TypeScript" },
    headline: { es: "Interfaces en React y Next.js", en: "React and Next.js interfaces" },
    headlineAccent: { es: "listas para producción.", en: "ready for production." },
    pitch: {
      es: "Migré completo el dashboard de una plataforma de identidad digital para el sector financiero, construí de punta a punta el frontend de SIGEFI, un SaaS de facturación e inventarios, y hoy desarrollo sitios en Next.js cuyo rendimiento se puede medir aquí mismo con Lighthouse.",
      en: "I migrated the full dashboard of a digital identity platform for financial services, built the frontend of SIGEFI, an invoicing and inventory SaaS, end to end, and today I build Next.js sites whose performance you can check right here with Lighthouse.",
    },
    projects: ["reservas", "masterpiece", "faststore", "majestic"],
    skills: ["frontend", "ecommerce", "backend", "mobile"],
    jobs: ["ADO Technologies (Scanovate)", "Sigefi", "Hypernova Labs"],
    questions: [
      { es: "¿Qué dashboards ha construido?", en: "What dashboards has he built?" },
      { es: "¿Qué tan rápidos son sus sitios en Next.js?", en: "How fast are his Next.js sites?" },
      { es: "¿Tiene experiencia con backend?", en: "Does he have backend experience?" },
    ],
  },
];

export const ROLE_IDS = roles.map((r) => r.id);

export const getRole = (id: string) => roles.find((r) => r.id === id);

/** Address of a page: the general portfolio or a role, in either language. */
export const pagePath = (lang: Lang, role?: RoleId) => (lang === "en" ? "/en" : "") + (role ? `/${role}` : "") || "/";

/** Puts the role's items first, in its order, and keeps the rest after them. */
export function byRole<I>(items: I[], order: string[] | undefined, key: (i: I) => string) {
  if (!order) return items;
  const rank = (i: I) => {
    const n = order.indexOf(key(i));
    return n === -1 ? order.length : n;
  };
  return [...items].sort((a, b) => rank(a) - rank(b));
}
