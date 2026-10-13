import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Phone } from "../components/Phone";

export const BRANDS_DURATION = 150;

export const Brands = () => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 120px", gap: 40 }}>
    <Caption
      eyebrow="TURISMO"
      title="Experiencias en Cartagena"
      detail="Catálogo de experiencias curadas por locales, con carrito y reservas por WhatsApp."
    />
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Phone screen="cataplan.jpg" width={380} scroll={1900} delay={4} until={BRANDS_DURATION} tilt={-2} />
    </div>
  </AbsoluteFill>
);
