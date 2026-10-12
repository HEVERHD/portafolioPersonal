export type Lang = "es" | "en";
type T = Record<Lang, string>;

export const contact = {
  whatsapp: "573006176641",
  whatsappLabel: "+57 300 617 6641",
  email: "hever11.hdgd@gmail.com",
  linkedin: "https://www.linkedin.com/in/hever-gdesing/",
  github: "https://github.com/HEVERHD",
  // Put the final PDF in /public and set the path here. Empty string hides the button.
  cv: "",
};

export const ui = {
  nav: {
    experience: { es: "Experiencia", en: "Experience" },
    work: { es: "Proyectos", en: "Work" },
    services: { es: "Servicios", en: "Services" },
    about: { es: "Sobre mí", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
  },
  hero: {
    status: { es: "Disponible para nuevos proyectos", en: "Available for new projects" },
    role: { es: "Desarrollador Frontend · React · Next.js", en: "Frontend Developer · React · Next.js" },
    pitch: {
      es: "Construyo aplicaciones web y móviles para banca, retail y negocios que necesitan vender y agendar en línea. De la idea a producción, y después también.",
      en: "I build web and mobile apps for banking, retail and businesses that need to sell and take bookings online. From idea to production, and beyond.",
    },
    ctaPrimary: { es: "Hablemos por WhatsApp", en: "Message me on WhatsApp" },
    ctaSecondary: { es: "Ver proyectos", en: "See my work" },
    stats: [
      { value: "5+", label: { es: "años en producción", en: "years shipping" } },
      { value: "5M+", label: { es: "descargas en apps donde he trabajado", en: "downloads on apps I've worked on" } },
      { value: "10+", label: { es: "negocios en línea", en: "businesses online" } },
    ],
    brandsLabel: { es: "He construido producto para", en: "I've built product for" },
  },
  sections: {
    experience: { es: "Trayectoria", en: "Experience" },
    experienceTitle: { es: "Equipos de producto, clientes reales", en: "Product teams, real clients" },
    featured: { es: "Producto propio", en: "My own product" },
    work: { es: "Proyectos freelance", en: "Freelance work" },
    workTitle: { es: "Sitios que hoy están vendiendo", en: "Sites that are selling right now" },
    internal: { es: "Sistemas internos", en: "Internal systems" },
    services: { es: "Servicios", en: "Services" },
    servicesTitle: { es: "Qué puedo construir para ti", en: "What I can build for you" },
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
  visit: { es: "Ver sitio", en: "Visit site" },
  code: { es: "Código", en: "Code" },
  liveAt: { es: "En producción en", en: "Live at" },
  present: { es: "Actualidad", en: "Present" },
  liveApp: { es: "App en producción", en: "Live app" },
  googlePlay: { es: "Ver en Google Play", en: "View on Google Play" },
  downloadCv: { es: "Descargar CV", en: "Download CV" },
  whatsappMsg: {
    es: "Hola Hevert, vi tu portafolio y quiero hablar de un proyecto.",
    en: "Hi Hevert, I saw your portfolio and I'd like to talk about a project.",
  },
  footer: { es: "Diseñado y desarrollado por Hevert Gelis", en: "Designed and built by Hevert Gelis" },
} satisfies Record<string, unknown>;

export const brands = ["Cochez y Cía", "Bancolombia", "App Morado", "Chedraui", "Pepeganga", "Scanovate"];

export type Job = {
  role: T;
  company: string;
  client?: string;
  place: T;
  start: string;
  end?: string;
  points: T[];
  tags: string[];
  /** `cta` defaults to "View on Google Play". */
  highlights?: { name: string; meta: T; text: T; url: string; cta?: T }[];
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
        url: "https://play.google.com/store/apps/details?id=com.hnlappsales",
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
        url: "https://play.google.com/store/apps/details?id=com.planetmedia.paymentsloyalty.chedraui",
      },
      {
        name: "Pepe Ganga",
        meta: { es: "Colombia · 50K+ descargas", en: "Colombia · 50K+ downloads" },
        text: {
          es: "Integré los pagos en línea con la pasarela de pagos de la app de compras de la cadena de juguetes y hogar.",
          en: "Integrated online payments through the payment gateway in the toys and home retail chain's shopping app.",
        },
        url: "https://play.google.com/store/apps/details?id=com.pepeganga",
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

export const booking = {
  title: { es: "Sistema de reservas online", en: "Online booking system" },
  text: {
    es: "Un producto que construí y adapto para cada negocio: el cliente agenda en segundos y recibe la confirmación por WhatsApp. Sin llamadas, sin filas.",
    en: "A product I built and tailor for each business: customers book in seconds and get confirmed on WhatsApp. No calls, no queues.",
  },
  features: [
    { es: "Agenda en línea por servicio y horario", en: "Online booking by service and time slot" },
    { es: "Confirmación instantánea por WhatsApp", en: "Instant WhatsApp confirmation" },
    { es: "Panel de administración para el negocio", en: "Admin panel for the business" },
    { es: "Instalable como app (PWA)", en: "Installable as an app (PWA)" },
  ],
  image: "/projects/barber.jpg",
  live: [
    { name: "Frailin Studio", url: "https://frailinbarber.vercel.app" },
    { name: "Cecy D'Estética & Spa", url: "https://cecy-spa.vercel.app" },
    { name: "StyleCut (demo)", url: "https://barberia-demo-eta.vercel.app" },
  ],
  tags: ["Next.js", "TypeScript", "WhatsApp", "PWA"],
};

export type Project = { name: string; kind: T; text: T; image: string; url: string; tags: string[] };

export const projects: Project[] = [
  {
    name: "CataPlan",
    kind: { es: "Turismo · Cartagena", en: "Travel · Cartagena" },
    text: {
      es: "Experiencias gastronómicas, culturales y de aventura curadas por locales, con carrito de reservas.",
      en: "Food, culture and adventure experiences curated by locals, with a booking cart.",
    },
    image: "/projects/cataplan.jpg",
    url: "https://cataplan.vercel.app",
    tags: ["Next.js", "TypeScript"],
  },
  {
    name: "Masterpiece CTG",
    kind: { es: "Tienda de ropa", en: "Fashion store" },
    text: {
      es: "Catálogo con búsqueda y categorías, pedidos por WhatsApp y panel para que el dueño suba productos.",
      en: "Searchable catalog, WhatsApp ordering and an admin panel so the owner can manage products.",
    },
    image: "/projects/masterpiece.jpg",
    url: "https://masterpiece-brown.vercel.app",
    tags: ["Next.js", "TypeScript", "Admin"],
  },
  {
    name: "Majestic Luxe Jewels",
    kind: { es: "Joyería de lujo", en: "Luxury jewelry" },
    text: {
      es: "E-commerce con pagos en línea vía Wompi o contra entrega y envíos a toda Colombia.",
      en: "E-commerce with online payments via Wompi or cash on delivery, shipping nationwide.",
    },
    image: "/projects/majestic.jpg",
    url: "https://majesticluxejewels.vercel.app",
    tags: ["Next.js", "TypeScript", "Wompi"],
  },
  {
    name: "Jader Tremendo",
    kind: { es: "Artista · DJ", en: "Artist · DJ" },
    text: {
      es: "Sitio oficial de un DJ y productor de champeta: trayectoria, shows y contrataciones.",
      en: "Official site for a champeta DJ and producer: career, shows and bookings.",
    },
    image: "/projects/jader.jpg",
    url: "https://jadertremendo.vercel.app",
    tags: ["Next.js", "TypeScript"],
  },
];

export const internal: { name: string; text: T; url?: string }[] = [
  {
    name: "Taller JCA",
    text: {
      es: "Sistema de gestión para un taller de latonería y pintura.",
      en: "Management system for an auto body and paint shop.",
    },
  },
  {
    name: "Club Mercancías",
    text: {
      es: "Plataforma de clubes de clientes: beneficios, productos, pagos y reportes.",
      en: "Customer club platform: benefits, products, payments and reports.",
    },
    url: "https://github.com/HEVERHD/cmh",
  },
];

export const services: { title: T; text: T }[] = [
  {
    title: { es: "Sitios y tiendas para negocios", en: "Websites and stores for businesses" },
    text: {
      es: "Catálogo, pedidos por WhatsApp o pagos en línea, y un panel para que tú mismo actualices productos.",
      en: "Catalog, WhatsApp orders or online payments, plus a panel so you can update products yourself.",
    },
  },
  {
    title: { es: "Reservas y sistemas de gestión", en: "Booking and management systems" },
    text: {
      es: "Agenda de citas, inventario, clientes y reportes. Herramientas internas hechas a la medida de tu operación.",
      en: "Appointments, inventory, customers and reports. Internal tools shaped around how you work.",
    },
  },
  {
    title: { es: "Frontend para equipos de producto", en: "Frontend for product teams" },
    text: {
      es: "Me sumo a tu equipo con React, Next.js o React Native: componentes, rendimiento y entregas con Scrum.",
      en: "I join your team on React, Next.js or React Native: components, performance and Scrum delivery.",
    },
  },
];

export const stack: { group: T; items: string[] }[] = [
  { group: { es: "Frontend", en: "Frontend" }, items: ["React", "Next.js", "React Native", "TypeScript", "JavaScript", "Redux"] },
  { group: { es: "Estilos", en: "Styling" }, items: ["Tailwind", "MUI", "Chakra UI", "CSS"] },
  { group: { es: "Backend y datos", en: "Backend & data" }, items: ["Node.js", "NestJS", "Express", "PostgreSQL", "MySQL", "MongoDB"] },
  { group: { es: "Forma de trabajo", en: "Workflow" }, items: ["Git", "GitFlow", "Jira", "Scrum", "Docker"] },
];

export const about = {
  text: {
    es: "Soy de Cartagena y vivo en Bogotá. Empecé en el bootcamp de Henry en 2020 y desde entonces he trabajado en banca, retail e identidad digital. En paralelo construyo productos para negocios locales, donde veo de primera mano cómo una buena web cambia las ventas de alguien.",
    en: "I'm from Cartagena and live in Bogotá. I started at Henry's bootcamp in 2020 and have since worked in banking, retail and digital identity. On the side I build products for local businesses, where I see first-hand how a good website changes someone's sales.",
  },
  education: [
    { title: { es: "Ingeniería de Sistemas", en: "Systems Engineering" }, place: "Universidad de San Buenaventura, Cartagena" },
    { title: { es: "Full Stack Web Developer", en: "Full Stack Web Developer" }, place: "Henry · 2021" },
    { title: { es: "Técnico en Sistemas", en: "Systems Technician" }, place: "TECNAR" },
  ],
  languages: [
    { es: "Español: nativo", en: "Spanish: native" },
    { es: "Inglés: lectura y escritura técnica", en: "English: technical reading and writing" },
  ],
};
