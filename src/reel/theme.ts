import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Same palette as the portfolio (src/app/globals.css)
export const colors = {
  bg: "#07070c",
  surface: "#0e0e17",
  line: "rgba(255,255,255,0.08)",
  ink: "#ededf3",
  muted: "#9b9bb2",
  accent: "#7c6cff",
  neon: "#3ec7ff",
};

export const fonts = {
  display: loadDisplay("normal", { weights: ["500", "700"], subsets: ["latin"] }).fontFamily,
  mono: loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily,
};

export const gradientText = {
  backgroundImage: `linear-gradient(100deg, ${colors.ink} 15%, ${colors.neon} 55%, ${colors.accent})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;
