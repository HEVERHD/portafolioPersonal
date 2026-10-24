import { loadFont as loadSerif } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";

// Same editorial palette as the portfolio (src/app/globals.css)
export const colors = {
  bg: "#f3efe6",
  surface: "#e9e3d6",
  line: "#d6cfbf",
  ink: "#1c1a16",
  muted: "#6b665c",
  accent: "#c4471d",
};

const serif = loadSerif("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily;
loadSerif("italic", { weights: ["400"], subsets: ["latin"] });

export const fonts = {
  serif,
  sans: loadSans("normal", { weights: ["400", "600"], subsets: ["latin"] }).fontFamily,
};

/** Terracotta italic, the accent used in the site's headlines. */
export const accentText = {
  fontStyle: "italic",
  fontWeight: 400,
  color: colors.accent,
} as const;
