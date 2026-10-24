// Builds the CV from the portfolio's own data (src/content.ts and src/roles.ts), so both stay in sync.
// Only what the site doesn't show lives here: section labels, location line and certifications.
import { about, brands, contact, jobs, projects, skills, stack, ui } from "../src/content.ts";
import { byRole, getRole } from "../src/roles.ts";

const LABELS = {
  es: { contact: "Contacto", skills: "Stack técnico", education: "Formación", languages: "Idiomas", experience: "Experiencia", projects: "Proyectos independientes", certs: "Certificaciones", phone: "Teléfono", email: "Email", location: "Ubicación", web: "Portafolio", present: "Actualidad" },
  en: { contact: "Contact", skills: "Tech stack", education: "Education", languages: "Languages", experience: "Experience", projects: "Independent projects", certs: "Certifications", phone: "Phone", email: "Email", location: "Location", web: "Portfolio", present: "Present" },
};
const LOCATION = { es: "Bogotá, Colombia", en: "Bogotá, Colombia · open to remote" };
const CERTS = {
  es: [["React Native: iOS y Android", "Udemy · 2023"], ["React: Hooks y MERN", "Udemy · 2022"], ["HTML5 y CSS avanzado", "Udemy · 2022"], ["React Profesional", "Códigofacilito · 2021"]],
  en: [["React Native: iOS & Android", "Udemy · 2023"], ["React: Hooks & MERN", "Udemy · 2022"], ["Advanced HTML5 & CSS", "Udemy · 2022"], ["Professional React", "Códigofacilito · 2021"]],
};
const MONTHS = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
const SITE = "https://www.hevertdavid.com";

// Names a recruiter scans for are set in bold wherever they appear in a bullet
const BOLD = [...brands.map((b) => b.name), "Pepe Ganga", "Aludra Ventas Asistidas", "SIGEFI", "Framework II", "React Native", "VTEX IO", "App Store", "Google Play", "dashboard"];
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const boldRe = new RegExp(`(${BOLD.sort((a, b) => b.length - a.length).map(escapeRe).join("|")})`, "g");
const emphasize = (s) => escapeHtml(s).replace(boldRe, "<b>$1</b>");

const host = (url) => new URL(url).host;

/** The data cv.html renders for one language, optionally tailored to a role from src/roles.ts. */
export function cvData(lang, roleId) {
  const t = (s) => s[lang];
  const role = roleId ? getRole(roleId) : undefined;
  const date = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    return `${MONTHS[lang][m - 1]} ${y}`;
  };

  const mobile = skills.find((s) => s.id === "mobile");
  const showcase = byRole(projects.filter((p) => p.category !== "internal"), role?.projects, (p) => p.id);
  const internal = projects.filter((p) => p.category === "internal");

  return {
    htmlLang: lang,
    role: role ? t(role.eyebrow) : t(ui.hero.role),
    summary: emphasize(t(role?.pitch ?? ui.hero.pitch)),
    labels: LABELS[lang],
    location: LOCATION[lang],
    contact: {
      phone: contact.whatsappLabel,
      whatsapp: `https://wa.me/${contact.whatsapp}`,
      email: contact.email,
      linkedin: contact.linkedin,
      github: contact.github,
      site: SITE,
    },
    skills: [
      ...stack.filter((g) => g.id !== "design").map((g) => [t(g.group), g.items.map((i) => i.name).join(" · ")]),
      [t(mobile.title), `${mobile.tech} · App Store · Google Play`],
      ...stack.filter((g) => g.id === "design").map((g) => [t(g.group), g.items.map((i) => i.name).join(" · ")]),
    ],
    education: about.education.map((e) => [t(e.title), e.status ? `${e.place} · ${t(e.status)}` : e.place]),
    languages: about.languages.map((l) => t(l).split(": ")),
    jobs: jobs.map((j) => {
      const highlights = j.highlights ?? [];
      // A role can swap a job's bullets; the highlight lines (Chedraui, Pepe Ganga…) always stay first
      const points = [...highlights.filter((h) => h.cv).map((h) => h.cv), ...(role?.cvPoints?.[j.company] ?? j.points)];
      const store = highlights.find((h) => h.android || h.ios);
      const web = highlights.find((h) => h.url);
      return {
        role: t(j.role),
        org: [j.company, j.client].filter(Boolean).join(" → ") + ` · ${t(j.place)}`,
        dates: `${date(j.start)} – ${j.end ? date(j.end) : LABELS[lang].present}`,
        points: points.map((p) => emphasize(t(p))),
        app: store ? `${[store.ios && "App Store", store.android && "Google Play"].filter(Boolean).join(" · ")}: ${store.name}` : web ? host(web.url) : undefined,
      };
    }),
    projects: [
      ...showcase.map((p) => [p.name, t(p.summary), p.url ? host(p.url) : p.codeUrl ? host(p.codeUrl) + new URL(p.codeUrl).pathname : ""]),
      [t(ui.sections.internal), internal.map((p) => `${p.name}: ${t(p.summary)}`).join(" "), ""],
    ],
    certs: CERTS[lang],
    photo: lang === "es",
  };
}

/** Every CV the site links: the general one in both languages plus each role that has its own file. */
export function allCvs() {
  const out = [{ name: "ES", lang: "es" }, { name: "EN", lang: "en" }];
  for (const id of ["vtex", "react-native", "frontend"]) {
    const role = getRole(id);
    if (!role?.cv) continue;
    for (const lang of ["es", "en"]) out.push({ name: `${lang}-${id}`.toUpperCase(), lang, role: id });
  }
  return out;
}
