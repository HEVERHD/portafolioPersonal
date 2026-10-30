// On-screen text of the showreel in both languages; the portfolio passes the active one.
export type ReelLang = "es" | "en";

export const copy = {
  es: {
    intro: { eyebrow: "Hevert Gelis · Desarrollador de software", lead: "Apps reales.", accent: "Negocios reales." },
    production: {
      eyebrow: "En producción",
      title: "Apps que se usan a diario",
      apps: [
        { name: "Chedraui", detail: "México · login y home · 5M+ descargas" },
        { name: "Pepe Ganga", detail: "Colombia · pagos en línea" },
        { name: "Aludra", detail: "Panamá · de Java a React Native" },
      ],
    },
    booking: {
      eyebrow: "Producto propio",
      title: "Sistema de reservas",
      detail: "Agenda en segundos, confirmación por WhatsApp. En producción para 3 negocios.",
    },
    stores: {
      eyebrow: "E-commerce",
      title: "Tiendas online",
      detail: "Catálogo, pedidos por WhatsApp, pagos con Wompi y un panel para que el dueño suba productos.",
    },
    brands: {
      eyebrow: "Turismo",
      title: "Experiencias en Cartagena",
      detail: "Catálogo de experiencias curadas por locales, con carrito y reservas por WhatsApp.",
    },
    outro: { lead: "Del primer commit", accent: "a producción." },
  },
  en: {
    intro: { eyebrow: "Hevert Gelis · Software developer", lead: "Real apps.", accent: "Real businesses." },
    production: {
      eyebrow: "In production",
      title: "Apps people use every day",
      apps: [
        { name: "Chedraui", detail: "Mexico · login and home · 5M+ downloads" },
        { name: "Pepe Ganga", detail: "Colombia · online payments" },
        { name: "Aludra", detail: "Panama · from Java to React Native" },
      ],
    },
    booking: {
      eyebrow: "My own product",
      title: "Booking system",
      detail: "Book in seconds, confirmed on WhatsApp. Live for 3 businesses.",
    },
    stores: {
      eyebrow: "E-commerce",
      title: "Online stores",
      detail: "Catalog, WhatsApp orders, Wompi payments and a panel for the owner to add products.",
    },
    brands: {
      eyebrow: "Travel",
      title: "Experiences in Cartagena",
      detail: "Experiences curated by locals, with a cart and WhatsApp bookings.",
    },
    outro: { lead: "From the first commit", accent: "to production." },
  },
} as const;

export const STACK = "React · Next.js · React Native · VTEX";
export const SITE = "hevertdavid.com";
