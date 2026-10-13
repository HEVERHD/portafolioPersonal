export type Lang = "es" | "en";
type T = Record<Lang, string>;

export const contact = {
  whatsapp: "573006176641",
  whatsappLabel: "+57 300 617 6641",
  email: "hever11.hdgd@gmail.com",
  linkedin: "https://www.linkedin.com/in/hever-gdesing/",
  github: "https://github.com/HEVERHD",
  // PDFs generated from cv/cv.html with `node cv/build.mjs`; the button serves the active language.
  cv: { es: "/cv/Hevert-Gelis-CV-ES.pdf", en: "/cv/Hevert-Gelis-CV-EN.pdf" },
};

export const ui = {
  nav: {
    experience: { es: "Experiencia", en: "Experience" },
    work: { es: "Proyectos", en: "Work" },
    services: { es: "Habilidades", en: "Skills" },
    about: { es: "Sobre mí", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
  },
  hero: {
    role: {
      es: "Desarrollador Frontend · React · React Native · Next.js",
      en: "Frontend Developer · React · React Native · Next.js",
    },
    pitch: {
      es: "Llevo apps de producción al siguiente nivel: migré productos completos a React Native y los publiqué en App Store y Google Play. He trabajado en apps que usan millones de personas, y tengo una base sólida en backend con Node.js, NestJS y bases de datos.",
      en: "I take production apps to the next level: I've migrated full products to React Native and shipped them to the App Store and Google Play. I've worked on apps used by millions of people, and I have a solid backend foundation with Node.js, NestJS and databases.",
    },
    ctaPrimary: { es: "Hablemos por WhatsApp", en: "Message me on WhatsApp" },
    ctaSecondary: { es: "Ver proyectos", en: "See my work" },
    stats: [
      { value: "5+", label: { es: "años en producción", en: "years shipping" } },
      { value: "5M+", label: { es: "descargas en apps donde he trabajado", en: "downloads on apps I've worked on" } },
      { value: "10+", label: { es: "negocios en línea", en: "businesses online" } },
    ],
    brandsLabel: { es: "He construido producto para", en: "I've built product for" },
    location: { es: "Bogotá · Cartagena · Panamá (remoto)", en: "Bogotá · Cartagena · Panama (remote)" },
  },
  sections: {
    experience: { es: "Trayectoria", en: "Experience" },
    experienceTitle: { es: "Equipos de producto, clientes reales", en: "Product teams, real clients" },
    featured: { es: "Producto propio", en: "My own product" },
    work: { es: "Proyectos freelance", en: "Freelance work" },
    workTitle: { es: "Sitios que hoy están vendiendo", en: "Sites that are selling right now" },
    internal: { es: "Sistemas internos", en: "Internal systems" },
    services: { es: "Especialidades", en: "Specialties" },
    servicesTitle: { es: "Lo que hago mejor", en: "What I do best" },
    stack: { es: "Stack", en: "Stack" },
    about: { es: "Sobre mí", en: "About me" },
    education: { es: "Formación", en: "Education" },
    languages: { es: "Idiomas", en: "Languages" },
    contact: { es: "Contacto", en: "Contact" },
    contactTitle: { es: "¿Tienes un proyecto en mente?", en: "Got a project in mind?" },
    contactText: {
      es: "Cuéntame qué necesitas. Respondo el mismo día, normalmente por WhatsApp.",
      en: "Tell me what you need. I usually reply the same day, often on WhatsApp.",
    },
  },
  showreel: {
    caption: {
      es: "Animado con Remotion y React, corriendo en vivo en tu navegador",
      en: "Animated with Remotion and React, running live in your browser",
    },
    alt: {
      es: "Showreel: sistema de reservas, tiendas online y sitios de marca en celulares",
      en: "Showreel: booking system, online stores and brand sites on phones",
    },
  },
  work: {
    details: { es: "Ver detalles", en: "View details" },
    features: { es: "Qué construí", en: "What I built" },
    stack: { es: "Stack", en: "Stack" },
    mobileHint: { es: "Haz scroll dentro del celular para recorrer el sitio", en: "Scroll inside the phone to browse the site" },
    prev: { es: "Proyecto anterior", en: "Previous project" },
    next: { es: "Proyecto siguiente", en: "Next project" },
    prevShort: { es: "Anterior", en: "Previous" },
    nextShort: { es: "Siguiente", en: "Next" },
    close: { es: "Cerrar", en: "Close" },
    privateNote: {
      es: "Sistema privado del cliente: sin capturas públicas.",
      en: "Client's private system: no public screenshots.",
    },
  },
  visit: { es: "Ver sitio", en: "Visit site" },
  code: { es: "Código", en: "Code" },
  liveAt: { es: "En producción en", en: "Live at" },
  present: { es: "Actualidad", en: "Present" },
  careerOf: { es: "de mi carrera", en: "of my career" },
  liveApp: { es: "App en producción", en: "Live app" },
  remote: {
    eyebrow: { es: "Trabajo remoto", en: "Remote work" },
    lead: { es: "Zonas horarias distintas, mismo ritmo.", en: "Different time zones, same pace." },
    title: {
      es: "Me integro rápido a equipos remotos: entiendo el negocio, me comunico claro y entrego a tiempo, esté donde esté el cliente.",
      en: "I ramp up fast on remote teams: I understand the business, communicate clearly and deliver on time, wherever the client is.",
    },
    // Country cards; hovering or tapping one rotates the globe to its `focus` marker
    places: [
      { focus: "bog", country: { es: "Colombia", en: "Colombia" }, detail: { es: "Bogotá · Cartagena · base", en: "Bogotá · Cartagena · home base" } },
      { focus: "pty", country: { es: "Panamá", en: "Panama" }, detail: { es: "Cochez y Cía · actual", en: "Cochez y Cía · current" } },
      { focus: "mex", country: { es: "México", en: "Mexico" }, detail: { es: "Chedraui", en: "Chedraui" } },
    ],
    // Globe markers and their floating labels; arcs run from "bog" to the rest
    globe: [
      { id: "bog", location: [4.711, -74.0721], label: { es: "Bogotá", en: "Bogotá" }, detail: { es: "base", en: "home base" } },
      { id: "pty", location: [8.9824, -79.5199], label: { es: "Panamá", en: "Panama" }, detail: { es: "Cochez y Cía", en: "Cochez y Cía" } },
      { id: "mex", location: [19.4326, -99.1332], label: { es: "CDMX", en: "Mexico City" }, detail: { es: "Chedraui", en: "Chedraui" } },
    ] as { id: string; location: [number, number]; label: T; detail: T }[],
  },
  stackCard: {
    core: { es: "Mi fuerte", en: "Core" },
    mobile: { es: "Apps en producción en App Store y Google Play", en: "Apps live on the App Store and Google Play" },
  },
  stores: {
    getItOn: { es: "Disponible en", en: "Get it on" },
    downloadOn: { es: "Descárgala en", en: "Download on the" },
  },
  downloadCv: { es: "Descargar CV", en: "Download CV" },
  whatsappMsg: {
    es: "Hola Hevert, vi tu portafolio y quiero hablar de un proyecto.",
    en: "Hi Hevert, I saw your portfolio and I'd like to talk about a project.",
  },
  footer: { es: "Diseñado y desarrollado por Hevert Gelis", en: "Designed and built by Hevert Gelis" },
} satisfies Record<string, unknown>;

/**
 * White logo silhouettes in /public/brands (120px tall, trimmed). `scale` evens out their
 * optical size: wide one-line wordmarks need less height than stacked logos to look equal.
 */
export const brands = [
  { name: "Cochez y Cía", logo: "/brands/cochez.png", scale: 1 },
  { name: "Aludra", logo: "/brands/aludra.png", scale: 1 },
  { name: "Bancolombia", logo: "/brands/bancolombia.png", scale: 0.95 },
  { name: "App Morado", logo: "/brands/morado.png", scale: 0.95 },
  { name: "Chedraui", logo: "/brands/chedraui.png", scale: 1 },
  { name: "Pepe Ganga", logo: "/brands/pepeganga.png", scale: 1.25 },
  { name: "Scanovate", logo: "/brands/scanovate.png", scale: 0.85 },
];

export type Job = {
  role: T;
  company: string;
  client?: string;
  place: T;
  start: string;
  end?: string;
  points: T[];
  tags: string[];
  /** Store links render as Google Play / App Store badges; `url` + `cta` is for web products. */
  highlights?: { name: string; meta: T; text: T; android?: string; ios?: string; url?: string; cta?: T }[];
};

export const jobs: Job[] = [
  {
    role: { es: "Analista Programador Frontend", en: "Frontend Developer Analyst" },
    company: "Hypernova Labs",
    client: "Cochez y Cía",
    place: { es: "Panamá · remoto", en: "Panama · remote" },
    start: "2024-11",
    points: [
      {
        es: "Asignado a Cochez y Cía, empresa panameña con más de 100 años, líder en materiales de construcción, acabados y ferretería.",
        en: "Assigned to Cochez y Cía, a 100+ year-old Panamanian leader in construction materials, finishes and hardware.",
      },
      {
        es: "Migración de Aludra Ventas Asistidas de Java nativo (componentes de clase) a React Native: la app con la que los vendedores atienden en tienda, con catálogo, búsqueda por voz y cámara, cotizaciones y entintado de pintura.",
        en: "Migrated Aludra Ventas Asistidas from native Java (class-based components) to React Native: the app sales staff use on the store floor, with catalog, voice and camera search, quotes and paint tinting.",
      },
      {
        es: "Despliegue en App Store y Google Play, con soporte y evolutivos junto a producto y diseño.",
        en: "Shipped to the App Store and Google Play, with ongoing support and new features alongside product and design.",
      },
    ],
    tags: ["React Native", "React", "Next.js", "TypeScript"],
    highlights: [
      {
        name: "Aludra Ventas Asistidas",
        meta: { es: "Cochez y Cía · Panamá · iOS y Android", en: "Cochez y Cía · Panama · iOS & Android" },
        text: {
          es: "Migré la app completa de Java nativo a React Native, funcionalidad por funcionalidad, y la publiqué en App Store y Google Play.",
          en: "Migrated the entire app from native Java to React Native, feature by feature, and shipped it to the App Store and Google Play.",
        },
        android: "https://play.google.com/store/apps/details?id=com.hnlappsales",
        ios: "https://apps.apple.com/co/app/aludra-ventas-asistidas/id1525609760",
      },
    ],
  },
  {
    role: { es: "Desarrollador Front End Semi Senior", en: "Semi-Senior Frontend Developer" },
    company: "ADO Technologies (Scanovate)",
    place: { es: "Bogotá", en: "Bogotá" },
    start: "2024-05",
    end: "2024-10",
    points: [
      {
        es: "Migración completa del dashboard de una plataforma de identidad digital y cumplimiento para el sector financiero: enrolamiento de clientes, validación de identidad y detección de fraude.",
        en: "Full migration of the dashboard for a digital identity and compliance platform for financial services: customer enrollment, identity verification and fraud detection.",
      },
      {
        es: "Proyecto de 6 meses, entregado completo y en producción.",
        en: "Six-month project, delivered in full and live in production.",
      },
      {
        es: "Componentes reutilizables y mejoras de UI/UX con diseño y backend.",
        en: "Reusable components and UI/UX improvements with design and backend teams.",
      },
    ],
    tags: ["React", "TypeScript", "Dashboard", "UI/UX"],
  },
  {
    role: { es: "Desarrollador Front End Mid", en: "Mid Frontend Developer" },
    company: "ITG Globers",
    place: { es: "Bogotá", en: "Bogotá" },
    start: "2022-10",
    end: "2024-05",
    points: [
      {
        es: "Funcionalidades web y móviles para Bancolombia, App Morado, Chedraui (México) y Pepeganga.",
        en: "Web and mobile features for Bancolombia, App Morado, Chedraui (Mexico) and Pepeganga.",
      },
      {
        es: "Participé en el desarrollo de Framework II, un framework interno sobre React Native para crear apps a partir de JSON declarativos (server-driven UI) y lanzarlas mucho más rápido.",
        en: "Contributed to Framework II, an internal React Native framework for building apps from declarative JSON (server-driven UI) and launching them much faster.",
      },
      {
        es: "Tiendas de Chedraui y Pepe Ganga sobre VTEX IO: componentes custom en React y TypeScript, configurables desde el Site Editor.",
        en: "Chedraui and Pepe Ganga stores on VTEX IO: custom React and TypeScript components, configurable from the Site Editor.",
      },
      {
        es: "E-commerce y banca digital sobre APIs REST, con foco en rendimiento y experiencia de usuario.",
        en: "E-commerce and digital banking interfaces on REST APIs, focused on performance and UX.",
      },
      {
        es: "Equipos ágiles multipaís con GitFlow, code review y Jira.",
        en: "Multi-country agile teams with GitFlow, code review and Jira.",
      },
    ],
    tags: ["React", "React Native", "VTEX IO", "REST"],
    highlights: [
      {
        name: "Chedraui · Tienda en línea",
        meta: { es: "México · 5M+ descargas · 4.2★", en: "Mexico · 5M+ downloads · 4.2★" },
        text: {
          es: "Desarrollé el login y el home de la app de supermercado: la puerta de entrada y la primera pantalla que ven millones de usuarios.",
          en: "I built the login and home screens of the supermarket app: the entry point and first screen millions of users see.",
        },
        android: "https://play.google.com/store/apps/details?id=com.planetmedia.paymentsloyalty.chedraui",
        ios: "https://apps.apple.com/co/app/chedraui-tienda-en-l%C3%ADnea/id1239945600",
      },
      {
        name: "Pepe Ganga",
        meta: { es: "Colombia · 50K+ descargas", en: "Colombia · 50K+ downloads" },
        text: {
          es: "Integré los pagos en línea con la pasarela de pagos de la app de compras de la cadena de juguetes y hogar.",
          en: "Integrated online payments through the payment gateway in the toys and home retail chain's shopping app.",
        },
        android: "https://play.google.com/store/apps/details?id=com.pepeganga",
      },
    ],
  },
  {
    role: { es: "Desarrollador Frontend", en: "Frontend Developer" },
    company: "Sigefi",
    place: { es: "Colombia", en: "Colombia" },
    start: "2021-02",
    end: "2022-10",
    points: [
      {
        es: "Desarrollé todo el frontend de SIGEFI, un SaaS de facturación e inventarios para negocios en Colombia.",
        en: "Built the entire frontend of SIGEFI, an invoicing and inventory SaaS for businesses in Colombia.",
      },
      {
        es: "Módulos de facturación electrónica (DIAN), cajas y arqueos, clientes, proveedores, inventario con kárdex, reportes, sucursales y bodegas.",
        en: "Modules for e-invoicing (DIAN), cash registers and audits, customers, suppliers, inventory ledger, reports, branches and warehouses.",
      },
      {
        es: "Integración con APIs, despliegue y soporte en producción.",
        en: "API integration, deployment and production support.",
      },
    ],
    tags: ["React", "JavaScript", "SaaS", "APIs"],
    highlights: [
      {
        name: "SIGEFI",
        meta: { es: "SaaS · Facturación e inventarios", en: "SaaS · Invoicing & inventory" },
        text: {
          es: "Software de gestión con facturación electrónica, inventario y ventas en una sola aplicación. Frontend construido por mí de punta a punta.",
          en: "Business software with e-invoicing, inventory and sales in a single app. Frontend built end to end by me.",
        },
        url: "https://sigefi.app/",
        cta: { es: "Ver producto", en: "View product" },
      },
    ],
  },
];

export type Category = "booking" | "store" | "brand" | "internal";

export const categories: { id: Category | "all"; label: T }[] = [
  { id: "all", label: { es: "Todos", en: "All" } },
  { id: "booking", label: { es: "Reservas", en: "Booking" } },
  { id: "store", label: { es: "E-commerce", en: "E-commerce" } },
  { id: "brand", label: { es: "Turismo", en: "Travel" } },
  { id: "internal", label: { es: "Sistemas internos", en: "Internal systems" } },
];

export type Project = {
  id: string;
  name: string;
  category: Category;
  kind: T;
  summary: T;
  features: T[];
  tags: string[];
  /** 1200px-wide desktop capture in /public/projects. */
  desktop?: string;
  /** 390px-wide full-page mobile capture in /public/reel/screens. */
  mobile?: string;
  url?: string;
  /** Extra live deployments, e.g. the booking system running for several businesses. */
  live?: { name: string; url: string }[];
  codeUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "reservas",
    name: "Sistema de reservas online",
    category: "booking",
    kind: { es: "Producto propio · 3 negocios", en: "My own product · 3 businesses" },
    summary: {
      es: "Un producto que construí y adapto para cada negocio: el cliente agenda en segundos y recibe la confirmación por WhatsApp. Sin llamadas, sin filas.",
      en: "A product I built and tailor for each business: customers book in seconds and get confirmed on WhatsApp. No calls, no queues.",
    },
    features: [
      { es: "Agenda en línea por servicio, profesional y horario", en: "Online booking by service, staff and time slot" },
      { es: "Confirmación instantánea por WhatsApp", en: "Instant WhatsApp confirmation" },
      { es: "Catálogo de servicios con precios y duración", en: "Service catalog with prices and duration" },
      { es: "Panel de administración para el negocio", en: "Admin panel for the business" },
      { es: "Instalable como app en el celular (PWA)", en: "Installable as a phone app (PWA)" },
    ],
    tags: ["Next.js", "TypeScript", "WhatsApp", "PWA"],
    desktop: "/projects/barber.jpg",
    mobile: "/reel/screens/frailin.jpg",
    url: "https://frailinstudio.com",
    live: [
      { name: "Frailin Studio", url: "https://frailinstudio.com" },
      { name: "Cecy D'Estética & Spa", url: "https://cecy-spa.vercel.app" },
      { name: "StyleCut (demo)", url: "https://barberia-demo-eta.vercel.app" },
    ],
    featured: true,
  },
  {
    id: "masterpiece",
    name: "Masterpiece CTG",
    category: "store",
    kind: { es: "Tienda de ropa · Cartagena", en: "Fashion store · Cartagena" },
    summary: {
      es: "Tienda de ropa y accesorios con más de 100 productos, pedidos por WhatsApp y un panel para que el dueño administre su catálogo.",
      en: "Clothing and accessories store with 100+ products, WhatsApp ordering and a panel for the owner to manage the catalog.",
    },
    features: [
      { es: "Catálogo con búsqueda, categorías y orden", en: "Catalog with search, categories and sorting" },
      { es: "Carrusel de productos destacados", en: "Featured products carousel" },
      { es: "Pedidos y carrito por WhatsApp", en: "Cart and orders via WhatsApp" },
      { es: "Panel de administración de productos", en: "Product admin panel" },
    ],
    tags: ["Next.js", "TypeScript", "Admin"],
    desktop: "/projects/masterpiece.jpg",
    mobile: "/reel/screens/masterpiece.jpg",
    url: "https://www.masterpiecectg.com",
  },
  {
    id: "majestic",
    name: "Majestic Luxe Jewels",
    category: "store",
    kind: { es: "Joyería de lujo", en: "Luxury jewelry" },
    summary: {
      es: "E-commerce de joyería artesanal con pagos en línea, envíos a todo Colombia y una estética editorial de lujo.",
      en: "Handmade jewelry e-commerce with online payments, nationwide shipping and an editorial luxury look.",
    },
    features: [
      { es: "Pagos en línea con Wompi o contra entrega", en: "Online payments via Wompi or cash on delivery" },
      { es: "Catálogo por categorías y piezas destacadas", en: "Catalog by category and featured pieces" },
      { es: "Carrito de compras", en: "Shopping cart" },
      { es: "Envío nacional con umbral de envío gratis", en: "Nationwide shipping with a free-shipping threshold" },
    ],
    tags: ["Next.js", "TypeScript", "Wompi"],
    desktop: "/projects/majestic.jpg",
    mobile: "/reel/screens/majestic.jpg",
    url: "https://majesticluxejewels.vercel.app",
  },
  {
    id: "dulces",
    name: "Dulces Detalles ER",
    category: "store",
    kind: { es: "Regalos personalizados · Cartagena", en: "Custom gifts · Cartagena" },
    summary: {
      es: "Tienda de arreglos y regalos personalizados para cumpleaños, aniversarios y fechas especiales, con pedidos a dos sucursales y catálogo administrable.",
      en: "Store for custom gift arrangements for birthdays, anniversaries and special dates, with orders to two branches and a manageable catalog.",
    },
    features: [
      { es: "Catálogo con búsqueda y filtros por precio, ocasión y disponibilidad", en: "Catalog with search and filters by price, occasion and availability" },
      { es: "Carrito y pedidos por WhatsApp a cada sucursal", en: "Cart and WhatsApp orders routed to each branch" },
      { es: "Sucursales con mapa (Google Maps)", en: "Branch locator with Google Maps" },
      { es: "Favoritos, modo claro/oscuro y banners administrables", en: "Favorites, light/dark mode and manageable banners" },
      { es: "Base de datos con Prisma", en: "Database with Prisma" },
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "Google Maps"],
    desktop: "/projects/dulces.jpg",
    mobile: "/reel/screens/dulces.jpg",
    url: "https://www.dulcesdetallescartagenaer.com/",
  },
  {
    id: "cataplan",
    name: "CataPlan",
    category: "brand",
    kind: { es: "Turismo · Cartagena", en: "Travel · Cartagena" },
    summary: {
      es: "Experiencias gastronómicas, culturales y de aventura en Cartagena, curadas por locales y reservables desde el celular.",
      en: "Food, culture and adventure experiences in Cartagena, curated by locals and bookable from your phone.",
    },
    features: [
      { es: "Catálogo de experiencias con precios y detalles", en: "Experience catalog with prices and details" },
      { es: "Carrito de reservas", en: "Booking cart" },
      { es: "Reservas por WhatsApp", en: "Bookings via WhatsApp" },
    ],
    tags: ["Next.js", "TypeScript"],
    desktop: "/projects/cataplan.jpg",
    mobile: "/reel/screens/cataplan.jpg",
    url: "https://cataplan.vercel.app",
  },
  {
    id: "taller-jca",
    name: "Taller JCA",
    category: "internal",
    kind: { es: "Sistema de gestión", en: "Management system" },
    summary: {
      es: "Sistema de gestión para un taller de latonería y pintura.",
      en: "Management system for an auto body and paint shop.",
    },
    features: [],
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "club-mercancias",
    name: "Club Mercancías",
    category: "internal",
    kind: { es: "Plataforma web", en: "Web platform" },
    summary: {
      es: "Plataforma de clubes de clientes: beneficios, productos, pagos y reportes.",
      en: "Customer club platform: benefits, products, payments and reports.",
    },
    features: [],
    tags: ["TypeScript"],
    codeUrl: "https://github.com/HEVERHD/cmh",
  },
];

/** Specialty cards: what I do, the core tech, and real work that backs it up. */
export type Skill = { id: "frontend" | "mobile" | "ecommerce" | "backend"; title: T; tech: string; text: T; proof: string[] };

export const skills: Skill[] = [
  {
    id: "frontend",
    title: { es: "Desarrollo Frontend", en: "Frontend Development" },
    tech: "React · Next.js · TypeScript",
    text: {
      es: "Interfaces rápidas y escalables, con componentes reutilizables y foco en rendimiento, para productos de banca, retail y SaaS en producción.",
      en: "Fast, scalable interfaces built from reusable components and tuned for performance, for banking, retail and SaaS products in production.",
    },
    proof: ["Bancolombia", "SIGEFI", "ADO Technologies"],
  },
  {
    id: "mobile",
    title: { es: "Apps móviles", en: "Mobile Apps" },
    tech: "React Native · Expo",
    text: {
      es: "Apps iOS y Android integradas con APIs, desde la migración de productos completos hasta su publicación en App Store y Google Play.",
      en: "iOS and Android apps wired to APIs, from migrating full products to shipping them on the App Store and Google Play.",
    },
    proof: ["Aludra", "Chedraui · 5M+", "Framework II"],
  },
  {
    id: "ecommerce",
    title: { es: "E-commerce", en: "E-commerce" },
    tech: "VTEX IO · Next.js · Pagos",
    text: {
      es: "Tiendas que venden: catálogos, carritos, pasarelas de pago y pedidos por WhatsApp, para cadenas de retail y negocios locales.",
      en: "Stores that sell: catalogs, carts, payment gateways and WhatsApp orders, for retail chains and local businesses.",
    },
    proof: ["Pepe Ganga", "Masterpiece", "Dulces Detalles"],
  },
  {
    id: "backend",
    title: { es: "Backend y APIs", en: "Backend & APIs" },
    tech: "Node.js · NestJS · GraphQL",
    text: {
      es: "APIs REST y GraphQL, bases de datos SQL y NoSQL, caché con Redis y sistemas de gestión a la medida para operar el negocio.",
      en: "REST and GraphQL APIs, SQL and NoSQL databases, Redis caching and custom management systems to run the business.",
    },
    proof: ["Reservas", "Taller JCA", "Club Mercancías"],
  },
];

/**
 * A technology chip: `icon` is a Simple Icons SVG in /public/tech tinted with `color`;
 * `badge` draws an Adobe-style two-letter tile instead (Simple Icons dropped Adobe's logos).
 * With neither, the chip shows a colored dot.
 */
export type Tech = { name: string; color: string; icon?: string; badge?: { text: string; bg: string } };

export type StackGroup = { id: "frontend" | "backend" | "styling" | "design" | "workflow"; group: T; items: Tech[] };

export const stack: StackGroup[] = [
  {
    id: "frontend",
    group: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "React Native", icon: "react", color: "#61DAFB" },
      { name: "Expo", icon: "expo", color: "#FFFFFF" },
      { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
      { name: "VTEX IO", icon: "vtex", color: "#F71963" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
      { name: "Redux", icon: "redux", color: "#9B72E0" },
      { name: "Zustand", color: "#C89B6D" },
      { name: "TanStack Query", icon: "tanstack", color: "#FF4154" },
    ],
  },
  {
    id: "backend",
    group: { es: "Backend y datos", en: "Backend & data" },
    items: [
      { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
      { name: "NestJS", icon: "nestjs", color: "#E0234E" },
      { name: "Express", icon: "express", color: "#FFFFFF" },
      { name: "GraphQL", icon: "graphql", color: "#E10098" },
      { name: "PostgreSQL", icon: "postgresql", color: "#6B8CFF" },
      { name: "MySQL", icon: "mysql", color: "#5D9BD1" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "Redis", icon: "redis", color: "#FF4438" },
    ],
  },
  {
    id: "styling",
    group: { es: "Estilos", en: "Styling" },
    items: [
      { name: "Tailwind", icon: "tailwindcss", color: "#06B6D4" },
      { name: "MUI", icon: "mui", color: "#007FFF" },
      { name: "Chakra UI", icon: "chakraui", color: "#319795" },
      { name: "CSS", icon: "css", color: "#8E5CD9" },
    ],
  },
  {
    id: "design",
    group: { es: "Diseño gráfico", en: "Graphic design" },
    items: [
      { name: "Figma", icon: "figma", color: "#F24E1E" },
      { name: "Photoshop", color: "#31A8FF", badge: { text: "Ps", bg: "#001E36" } },
      { name: "Illustrator", color: "#FF9A00", badge: { text: "Ai", bg: "#330000" } },
      { name: "After Effects", color: "#D291FF", badge: { text: "Ae", bg: "#00005B" } },
      { name: "Premiere Pro", color: "#9999FF", badge: { text: "Pr", bg: "#00005B" } },
      { name: "Adobe XD", color: "#FF61F6", badge: { text: "Xd", bg: "#470137" } },
    ],
  },
  {
    id: "workflow",
    group: { es: "Forma de trabajo", en: "Workflow" },
    items: [
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "GitFlow", icon: "git", color: "#F05032" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "Jira", icon: "jira", color: "#2684FF" },
      { name: "Scrum", color: "#3EC7FF" },
      { name: "Remotion", color: "#7C6CFF" },
    ],
  },
];

export const about = {
  text: {
    es: "Frontend con 5+ años en producción, React Native en App Store y Google Play, apps con millones de usuarios y base sólida en backend. Lo que mejor hago: tomar un producto que funciona a medias y dejarlo listo para escalar.",
    en: "Frontend developer with 5+ years in production, React Native apps on the App Store and Google Play, products used by millions and a solid backend foundation. What I do best: take a product that half works and make it ready to scale.",
  },
  education: [
    {
      title: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
      place: "Universidad de San Buenaventura, Cartagena",
      status: { es: "En curso", en: "In progress" },
    },
    { title: { es: "Full Stack Web Developer", en: "Full Stack Web Developer" }, place: "Henry · 2021" },
    { title: { es: "Técnico en Sistemas", en: "Systems Technician" }, place: "TECNAR" },
  ],
  languages: [
    { es: "Español: nativo", en: "Spanish: native" },
    { es: "Inglés: lectura y escritura técnica", en: "English: technical reading and writing" },
  ],
};
