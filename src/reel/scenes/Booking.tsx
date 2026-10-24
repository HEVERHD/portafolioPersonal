import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Phone } from "../components/Phone";
import { copy, type ReelLang } from "../copy";

export const BOOKING_DURATION = 165;

export const Booking = ({ lang = "es" }: { readonly lang?: ReelLang }) => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 140px", gap: 40 }}>
    <Caption {...copy[lang].booking} />
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 48 }}>
      <Phone screen="frailin.jpg" width={360} scroll={1500} delay={4} until={BOOKING_DURATION} tilt={-3} />
      <Phone screen="stylecut.jpg" width={360} scroll={0} delay={14} until={BOOKING_DURATION} tilt={3} />
    </div>
  </AbsoluteFill>
);
