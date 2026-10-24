import { about, contact, jobs, projects, skills, stack, ui, type Lang } from "@/content";
import { roles } from "@/roles";

/**
 * Tinta's offline brain: answers questions by searching the portfolio's own data, entirely in the
 * browser (no AI, no server, no cost). Each topic below is a small "document" built from
 * content.ts; a question is matched against them by keyword overlap and the best ones are
 * turned into a short answer with the site's real text.
 */

type Doc = {
  id: string;
  /** Extra words people use for this topic that the text itself may not contain. */
  keywords: string;
  title: (lang: Lang) => string;
  text: (lang: Lang) => string;
  answer: (lang: Lang) => string;
};

const SITE = "https://www.hevertdavid.com";
const tr = (es: string, en: string) => (lang: Lang) => (lang === "es" ? es : en);

// Words that carry no meaning for matching, in both languages
const STOP = new Set(
  `a al algo alguna alguno algun como con cual cuales cuando de del donde el ella ellos en es esa ese eso esta este esto estos fue ha han hace hay he la las le les lo los mas me mi mis muy no o para pero por porque puede que quien se sea ser si sin sobre su sus tambien te tiene tienen tu un una uno y ya hevert gelis david
   about an and are as at be been but by can could do does did for from had has have he his how i in is it its me my of on or so that the their them there they this to was we what when where which who why will with would you your tell know
   knows worked work working experience built build done ever trabaja trabajado trabajar experiencia hecho hace hizo sabe conoce maneja usado usa tenido`.split(/\s+/),
);

/** Lowercase, no accents, no punctuation, light plural stripping. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/next\.js/g, "nextjs")
    .replace(/node\.js/g, "nodejs")
    .replace(/e-commerce/g, "ecommerce")
    .split(/[^a-z0-9ñ+]+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => (w.length > 4 ? w.replace(/(es|s)$/, "") : w));
}

// Names inside a job's bullets that people ask about directly
const JOB_WORDS: Record<string, string> = {
  "Hypernova Labs": "aludra ventas asistidas cochez migracion java panama",
  "ITG Globers": "framework ii server driven json chedraui pepe ganga bancolombia morado login home pasarela",
  "ADO Technologies (Scanovate)": "scanovate dashboard identidad fraude financiero banca compliance",
  Sigefi: "sigefi saas facturacion inventario dian",
};

/** When scores tie, the more specific kind of topic answers. */
const PRIORITY = ["role", "job", "project", "skill", "remote", "education", "stack", "contact", "profile"];
const priority = (id: string) => PRIORITY.indexOf(id.split("-")[0]);

const dates = (lang: Lang, start: string, end?: string) =>
  `${start.slice(0, 4)}–${end ? end.slice(0, 4) : lang === "es" ? "hoy" : "today"}`;

function buildDocs(): Doc[] {
  const docs: Doc[] = [];

  docs.push({
    id: "contact",
    keywords:
      "contacto contactar contratar contratarlo contrato disponible disponibilidad tarifa precio cobra costo presupuesto cotizar whatsapp correo email mail linkedin github cv hoja vida curriculum entrevista llamar escribir hire hiring contact rate rates price available availability resume interview call reach",
    title: tr("Contacto", "Contact"),
    text: tr("contacto whatsapp correo", "contact whatsapp email"),
    answer: (lang) =>
      lang === "es"
        ? `Puedes escribirle a Hevert por WhatsApp al ${contact.whatsappLabel} (https://wa.me/${contact.whatsapp}) o al correo ${contact.email}. Para disponibilidad, tarifas o una entrevista, lo mejor es hablar con él directamente.\nSu CV: ${SITE}${contact.cv.es}\nLinkedIn: ${contact.linkedin}`
        : `You can reach Hevert on WhatsApp at ${contact.whatsappLabel} (https://wa.me/${contact.whatsapp}) or by email at ${contact.email}. For availability, rates or an interview, it's best to talk to him directly.\nHis CV: ${SITE}${contact.cv.en}\nLinkedIn: ${contact.linkedin}`,
  });

  docs.push({
    id: "profile",
    keywords:
      "quien perfil resumen presentate años cuantos trayectoria seniority senior nivel who profile summary yourself experience years background",
    title: tr("Su perfil", "His profile"),
    text: (lang) => `${ui.hero.pitch[lang]} ${about.text[lang]}`,
    answer: (lang) =>
      `${lang === "es" ? "En palabras de Hevert" : "In Hevert's words"}: «${ui.hero.pitch[lang]}»\n${ui.hero.stats.map((s) => `${s.value} ${s.label[lang]}`).join(" · ")}.`,
  });

  docs.push({
    id: "remote",
    keywords:
      "remoto remota remote equipo equipos zona horaria horario huso distribuido internacional cliente extranjero comunicacion plazos team teams timezone time zone distributed communication deadlines abroad",
    title: (lang) => ui.remote.eyebrow[lang],
    text: (lang) => `${ui.remote.lead[lang]} ${ui.remote.title[lang]}`,
    // The site's copy is in first person; Tinta talks about Hevert, so it quotes him
    answer: (lang) =>
      `${ui.remote.lead[lang]} ${lang === "es" ? "En palabras de Hevert" : "In Hevert's words"}: «${ui.remote.title[lang]}»\n${lang === "es" ? "Ha trabajado para clientes en" : "He has worked for clients in"} ${ui.remote.places.map((p) => `${p.country[lang]} (${p.detail[lang]})`).join(", ")}.`,
  });

  for (const j of jobs) {
    const highlights = j.highlights ?? [];
    docs.push({
      id: `job-${j.company}`,
      keywords: `${j.company} ${j.client ?? ""} ${j.tags.join(" ")} ${highlights.map((h) => h.name).join(" ")} ${JOB_WORDS[j.company] ?? ""} empleo empresa job company`,
      title: (lang) => `${j.role[lang]} · ${j.company}${j.client ? ` → ${j.client}` : ""}`,
      text: (lang) => [...j.points.map((p) => p[lang]), ...highlights.map((h) => `${h.name} ${h.meta[lang]} ${h.text[lang]}`)].join(" "),
      answer: (lang) => {
        const head =
          lang === "es"
            ? `En ${j.company}${j.client ? ` (para ${j.client})` : ""}, ${dates(lang, j.start, j.end)}, como ${j.role.es}:`
            : `At ${j.company}${j.client ? ` (for ${j.client})` : ""}, ${dates(lang, j.start, j.end)}, as ${j.role.en}:`;
        const points = j.points.slice(0, 3).map((p) => `• ${p[lang]}`);
        const hl = highlights.map((h) => {
          const link = h.url ?? h.android ?? h.ios;
          return `• ${h.name} (${h.meta[lang]}): ${h.text[lang]}${link ? ` ${link}` : ""}`;
        });
        return [head, ...points, ...hl].join("\n");
      },
    });
  }

  for (const p of projects) {
    docs.push({
      id: `project-${p.id}`,
      keywords: `${p.name} ${p.tags.join(" ")} ${(p.live ?? []).map((l) => l.name).join(" ")} proyecto freelance sitio web pagina project site website`,
      title: (lang) => `${p.name} (${p.kind[lang]})`,
      text: (lang) => `${p.kind[lang]} ${p.summary[lang]} ${p.features.map((f) => f[lang]).join(" ")}`,
      answer: (lang) => {
        const links = [p.url, p.codeUrl && `${lang === "es" ? "Código" : "Code"}: ${p.codeUrl}`].filter(Boolean).join("\n");
        const features = p.features.slice(0, 4).map((f) => `• ${f[lang]}`);
        return [`${p.name}, ${p.kind[lang].toLowerCase()}: ${p.summary[lang]}`, ...features, `${lang === "es" ? "Tecnologías" : "Tech"}: ${p.tags.join(", ")}`, links]
          .filter(Boolean)
          .join("\n");
      },
    });
  }

  const skillWords: Record<string, string> = {
    frontend: "frontend front interfaces web ui componentes rendimiento performance react nextjs",
    mobile: "movil moviles mobile app apps ios android tiendas store stores play publicar",
    ecommerce: "ecommerce comercio tienda tiendas online carrito checkout pago pagos pasarela vender store shop payments",
    backend: "backend api apis servidor base datos database sql nosql",
  };
  for (const s of skills) {
    docs.push({
      id: `skill-${s.id}`,
      keywords: `${skillWords[s.id]} ${s.tech} ${s.proof.join(" ")}`,
      title: (lang) => s.title[lang],
      text: (lang) => s.text[lang],
      answer: (lang) =>
        `${s.title[lang]} (${s.tech}): ${s.text[lang]}\n${lang === "es" ? "Trabajo que lo respalda" : "Work that backs it up"}: ${s.proof.join(", ")}.`,
    });
  }

  docs.push({
    id: "stack",
    keywords: "stack tecnologia tecnologias herramientas lenguajes frameworks librerias sabe maneja domina technologies tools languages libraries",
    title: tr("Stack", "Stack"),
    text: () => stack.flatMap((g) => g.items.map((i) => i.name)).join(" "),
    answer: (lang) => stack.map((g) => `• ${g.group[lang]}: ${g.items.map((i) => i.name).join(", ")}`).join("\n"),
  });

  docs.push({
    id: "education",
    keywords:
      "estudio estudios universidad titulo carrera formacion ingenieria academico idioma idiomas ingles español certificacion education degree university study languages english spanish",
    title: (lang) => ui.sections.education[lang],
    text: (lang) => [...about.education.map((e) => `${e.title[lang]} ${e.place}`), ...about.languages.map((l) => l[lang])].join(" "),
    answer: (lang) =>
      [
        ...about.education.map((e) => `• ${e.title[lang]}, ${e.place}${e.status ? ` (${e.status[lang]})` : ""}`),
        ...about.languages.map((l) => `• ${l[lang]}`),
      ].join("\n"),
  });

  // Role pages carry the most detailed version of some jobs (e.g. the VTEX work)
  for (const r of roles) {
    for (const [company, points] of Object.entries(r.cvPoints ?? {})) {
      docs.push({
        id: `role-${r.id}`,
        keywords: `${r.id} ${r.label.es} ${company} storefront store framework site editor regionalizacion checkout`,
        title: (lang) => `${r.label[lang]} · ${company}`,
        text: (lang) => `${r.pitch[lang]} ${points.map((p) => p[lang]).join(" ")}`,
        answer: (lang) =>
          [`${lang === "es" ? "En palabras de Hevert" : "In Hevert's words"}: «${r.pitch[lang]}»`, ...points.slice(0, 4).map((p) => `• ${p[lang]}`), `${lang === "es" ? "Más" : "More"}: ${SITE}/${r.id}`].join("\n"),
      });
    }
  }

  return docs;
}

type Indexed = { doc: Doc; strong: Set<string>; body: Record<Lang, Set<string>> };
let index: Indexed[] | null = null;
let df: Map<string, number>;

function getIndex() {
  if (index) return index;
  index = buildDocs().map((doc) => ({
    doc,
    strong: new Set(tokenize(`${doc.keywords} ${doc.title("es")} ${doc.title("en")}`)),
    body: { es: new Set(tokenize(doc.text("es"))), en: new Set(tokenize(doc.text("en"))) },
  }));
  df = new Map();
  for (const d of index) for (const w of new Set([...d.strong, ...d.body.es, ...d.body.en])) df.set(w, (df.get(w) ?? 0) + 1);
  return index;
}

const has = (set: Set<string>, word: string) => {
  if (set.has(word)) return true;
  // "migracion" should find "migre", "pago" should find "pagos": compare long word stems
  if (word.length < 5) return false;
  const stem = word.slice(0, 5);
  for (const w of set) if (w.length >= 5 && w.startsWith(stem)) return true;
  return false;
};

/** Best matching topics for a question, highest score first. */
export function search(question: string, lang: Lang) {
  const idx = getIndex();
  const words = [...new Set(tokenize(question))];
  return idx
    .map(({ doc, strong, body }) => {
      let score = 0;
      for (const w of words) {
        const idf = Math.log(1 + idx.length / (df.get(w) ?? idx.length));
        score += ((has(strong, w) ? 3 : 0) + (has(body[lang], w) ? 1 : 0)) * idf;
      }
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || priority(a.doc.id) - priority(b.doc.id));
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/next\.js/g, "nextjs").replace(/node\.js/g, "nodejs");

/** Stack technologies named in the question, longest first ("React Native" wins over "React"). */
function techsIn(question: string) {
  const q = ` ${normalize(question).replace(/[^a-z0-9ñ+]+/g, " ")} `;
  const names = [...new Set(stack.flatMap((g) => g.items.map((i) => i.name)))].sort((a, b) => b.length - a.length);
  const found: string[] = [];
  let rest = q;
  for (const name of names) {
    const n = ` ${normalize(name).replace(/[^a-z0-9ñ+]+/g, " ")} `;
    if (rest.includes(n)) {
      found.push(name);
      rest = rest.replace(n, " ");
    }
  }
  return found;
}

/** "Where has he used X": jobs and projects tagged with it. */
function techUse(tech: string, lang: Lang) {
  const group = stack.find((g) => g.items.some((i) => i.name === tech));
  const norm = normalize(tech);
  const where = [
    ...jobs.filter((j) => j.tags.some((t) => normalize(t) === norm)).map((j) => j.company + (j.client ? ` → ${j.client}` : "")),
    ...projects.filter((p) => p.tags.some((t) => normalize(t) === norm)).map((p) => p.name),
  ];
  const head = lang === "es" ? `${tech} está en su stack (${group?.group.es}).` : `${tech} is in his stack (${group?.group.en}).`;
  return where.length ? `${head} ${lang === "es" ? "Lo ha usado en" : "He has used it at"}: ${where.join(", ")}.` : head;
}

/** Words of the question that appear nowhere in the portfolio (e.g. a technology he doesn't list). */
function unknownWords(question: string) {
  const idx = getIndex();
  return tokenize(question).filter((w) => !idx.some((d) => has(d.strong, w) || has(d.body.es, w) || has(d.body.en, w)));
}

const GREETING = /^(hola|buenas|buenos dias|buenas tardes|hey|hi|hello|good (morning|afternoon))\b/;
const THANKS = /\b(gracias|thank)/;
const MIN_SCORE = 1.2;

/** Tinta's answer to a question, in the page's language. */
export function answer(question: string, lang: Lang): string {
  const plain = question.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  const words = tokenize(question);
  if (THANKS.test(plain) && words.length <= 3) return lang === "es" ? "¡Con gusto! Si quieres hablar con Hevert, escríbele por WhatsApp o al correo." : "You're welcome! If you'd like to talk to Hevert, message him on WhatsApp or by email.";
  if (GREETING.test(plain) && words.length <= 2) return ui.assistant.intro[lang];

  const techs = techsIn(question);
  // "¿Sabe TypeScript?": the technology is the whole question, so say where he has used it
  const techWords = new Set(tokenize(techs.join(" ")));
  if (techs.length && words.every((w) => techWords.has(w))) {
    const skill = skills.find((s) => techs.some((tech) => s.tech.split(" · ").includes(tech)));
    const skillLine = skill && `${skill.title[lang]}: ${skill.text[lang]} ${lang === "es" ? "Trabajo que lo respalda" : "Work that backs it up"}: ${skill.proof.join(", ")}.`;
    return [...techs.map((tech) => techUse(tech, lang)), skillLine, lang === "es" ? "Pregúntame por cualquiera de ellos para más detalle." : "Ask me about any of them for more detail."]
      .filter(Boolean)
      .join("\n");
  }

  const results = search(question, lang);
  const [best, second] = results;
  const missing = unknownWords(question);
  if (!best || best.score < MIN_SCORE || (missing.length && !techs.length && best.score < 3 * MIN_SCORE)) {
    const what = missing.length ? `«${missing.join(" ")}»` : lang === "es" ? "eso" : "that";
    return lang === "es"
      ? `No encontré ${what} en el portafolio. Puedo contarte sobre su experiencia (Cochez, Chedraui, Pepe Ganga…), sus proyectos, su stack, el trabajo remoto o cómo contactarlo. Para algo más específico, escríbele a Hevert: https://wa.me/${contact.whatsapp}`
      : `I couldn't find ${what} in the portfolio. I can tell you about his experience (Cochez, Chedraui, Pepe Ganga…), projects, stack, remote work or how to reach him. For anything more specific, message Hevert: https://wa.me/${contact.whatsapp}`;
  }
  const parts = [best.doc.answer(lang), ...techs.map((tech) => techUse(tech, lang))];
  if (second && second.score >= best.score * 0.6 && second.doc.id !== best.doc.id) {
    parts.push(`${lang === "es" ? "También relacionado" : "Also related"}: ${second.doc.title(lang)}.`);
  }
  return parts.join("\n\n");
}
