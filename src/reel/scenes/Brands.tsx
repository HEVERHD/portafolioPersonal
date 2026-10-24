import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Phone } from "../components/Phone";
import { copy, type ReelLang } from "../copy";

export const BRANDS_DURATION = 150;

export const Brands = ({ lang = "es" }: { readonly lang?: ReelLang }) => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 140px", gap: 40 }}>
    <Caption {...copy[lang].brands} />
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Phone screen="cataplan.jpg" width={380} scroll={1900} delay={4} until={BRANDS_DURATION} tilt={-2} />
    </div>
  </AbsoluteFill>
);
