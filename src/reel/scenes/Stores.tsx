import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Phone } from "../components/Phone";

export const STORES_DURATION = 150;

export const Stores = () => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 120px", gap: 40 }}>
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 48 }}>
      <Phone screen="masterpiece.jpg" width={360} scroll={380} delay={4} until={STORES_DURATION} tilt={-3} />
      <Phone screen="majestic.jpg" width={360} scroll={1300} delay={14} until={STORES_DURATION} tilt={3} />
    </div>
    <Caption
      eyebrow="E-COMMERCE"
      title="Tiendas online"
      detail="Catálogo, pedidos por WhatsApp, pagos con Wompi y un panel para que el dueño suba productos."
    />
  </AbsoluteFill>
);
