// Renders the app clips (src/reel/clips.ts) from the raw recordings in public/reel/raw into
// small, silent MP4s in public/reel/clips, which the showreel plays on the site.
// Usage: npm run clips [-- chedraui pepeganga aludra]
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ids = process.argv.slice(2).length ? process.argv.slice(2) : ["chedraui", "pepeganga", "aludra"];
// Remotion can use a local Chromium instead of downloading its own
const browser = [
  process.env.BROWSER,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((p) => p && existsSync(p));

// Run the CLI through Node directly (no shell), so paths with spaces stay whole
const cli = fileURLToPath(new URL("../node_modules/@remotion/cli/remotion-cli.js", import.meta.url));

for (const id of ids) {
  const args = [cli, "render", `Clip-${id}`, `public/reel/clips/${id}.mp4`, "--codec=h264", "--crf=30", "--muted"];
  if (browser) args.push(`--browser-executable=${browser}`);
  const { status } = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (status !== 0) process.exit(status ?? 1);
}
