// Prints cv/cv.html to public/cv/*.pdf (Spanish, English and role variants) with headless Edge or Chrome.
// Usage: node cv/build.mjs   (set BROWSER=/path/to/chrome to use another Chromium)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "cv");
const candidates = [
  process.env.BROWSER,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);
const browserPath = candidates.find((p) => existsSync(p));
if (!browserPath) throw new Error("No Chromium browser found; set BROWSER=/path/to/chrome");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = 9335;
const profile = mkdtempSync(join(tmpdir(), "cv-print-"));
const browser = spawn(browserPath, ["--headless=new", "--disable-gpu", "--allow-file-access-from-files", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

try {
  for (let i = 0; i < 50; i++) {
    try { await fetch(`http://127.0.0.1:${PORT}/json/version`); break; } catch { await sleep(200); }
  }
  const page = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });

  mkdirSync(outDir, { recursive: true });
  const src = pathToFileURL(join(root, "cv", "cv.html")).href;
  // General CV in both languages, plus the role variants the role pages link to (src/roles.ts)
  const prints = [["es"], ["en"], ["es", "vtex"]];
  for (const [lang, variant] of prints) {
    await send("Page.navigate", { url: `${src}?lang=${lang}${variant ? `&variant=${variant}` : ""}` });
    await sleep(3000); // web fonts and photo
    const { data } = await send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    });
    const name = [lang, variant].filter(Boolean).join("-").toUpperCase();
    const file = join(outDir, `Hevert-Gelis-CV-${name}.pdf`);
    writeFileSync(file, Buffer.from(data, "base64"));
    console.log(`${name}: ${file}`);
  }
  ws.close();
} finally {
  browser.kill();
}
