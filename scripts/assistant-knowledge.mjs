// Writes assistant/knowledge.md: everything the portfolio says about Hevert, in plain text, for the
// assistant's system prompt. Built from src/content.ts and src/roles.ts so the chat never drifts
// from the site. Usage: npm run assistant:knowledge
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { about, contact, jobs, projects, skills, stack, ui } from "../src/content.ts";
import { roles } from "../src/roles.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.hevertdavid.com";
// Spanish is the source of truth; English copy is the same facts, so including it would only double the prompt
const t = (s) => s.es;
const list = (items) => items.map((i) => `- ${i}`).join("\n");

const sections = [
  `# Hevert Gelis (Hevert David Gelis Díaz)

${t(ui.hero.eyebrow)}. ${t(ui.hero.location)}.

${t(ui.hero.pitch)}

${t(about.text)}

Cifras: ${ui.hero.stats.map((s) => `${s.value} ${t(s.label)}`).join("; ")}.`,

  `## Contacto
${list([
  `WhatsApp: ${contact.whatsappLabel} (https://wa.me/${contact.whatsapp})`,
  `Email: ${contact.email}`,
  `LinkedIn: ${contact.linkedin}`,
  `GitHub: ${contact.github}`,
  `Portafolio: ${SITE}`,
  `CV: ${SITE}${contact.cv.es} (español), ${SITE}${contact.cv.en} (inglés)`,
])}`,

  `## Experiencia laboral (de la más reciente a la más antigua)

${jobs
  .map((j) => {
    const head = `### ${t(j.role)} · ${j.company}${j.client ? ` (cliente: ${j.client})` : ""} · ${t(j.place)} · ${j.start} a ${j.end ?? "hoy"}`;
    const highlights = (j.highlights ?? []).map((h) => {
      const links = [h.android && `Google Play: ${h.android}`, h.ios && `App Store: ${h.ios}`, h.url].filter(Boolean).join(" · ");
      return `- ${h.name} (${t(h.meta)}): ${t(h.text)}${links ? ` Enlaces: ${links}` : ""}`;
    });
    return [head, list(j.points.map(t)), ...highlights, `Tecnologías: ${j.tags.join(", ")}`].join("\n");
  })
  .join("\n\n")}`,

  `## Proyectos

${projects
  .map((p) => {
    const links = [p.url && `Sitio: ${p.url}`, p.codeUrl && `Código: ${p.codeUrl}`, ...(p.live ?? []).map((l) => `${l.name}: ${l.url}`)].filter(Boolean);
    return [
      `### ${p.name} (${t(p.kind)})`,
      t(p.summary),
      p.features.length ? list(p.features.map(t)) : "",
      `Tecnologías: ${p.tags.join(", ")}`,
      links.length ? `Enlaces: ${links.join(" · ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n\n")}`,

  `## Especialidades
${skills.map((s) => `### ${t(s.title)} (${s.tech})\n${t(s.text)} Trabajo que lo respalda: ${s.proof.join(", ")}.`).join("\n\n")}`,

  `## Stack
${list(stack.map((g) => `${t(g.group)}: ${g.items.map((i) => i.name).join(", ")}`))}`,

  `## Formación e idiomas
${list([...about.education.map((e) => `${t(e.title)}, ${e.place}${e.status ? ` (${t(e.status)})` : ""}`), ...about.languages.map(t)])}`,

  `## Versiones del portafolio por rol
${roles
  .map((r) => {
    const detail = Object.entries(r.cvPoints ?? {}).map(([company, points]) => `Detalle de ${company} para este rol:\n${list(points.map(t))}`);
    return [`### ${t(r.label)}: ${SITE}/${r.id}`, t(r.pitch), r.cv ? `CV para este rol: ${SITE}${r.cv.es}` : "", ...detail].filter(Boolean).join("\n");
  })
  .join("\n\n")}`,
];

const file = join(root, "assistant", "knowledge.md");
writeFileSync(file, sections.join("\n\n") + "\n");
console.log(`knowledge: ${file}`);
