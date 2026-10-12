import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Phone } from "../components/Phone";

export const BRANDS_DURATION = 150;

export const Brands = () => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 120px", gap: 40 }}>
    <Caption
      eyebrow="TURISMO · ARTISTAS"
      title="Marcas con identidad"
      detail="Experiencias en Cartagena con carrito de reservas, y el sitio oficial de un DJ de champeta."
    />
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 48 }}>
      <Phone screen="cataplan.jpg" width={360} scroll={1900} delay={4} until={BRANDS_DURATION} tilt={-3} />
      <Phone screen="jader.jpg" width={360} scroll={0} delay={14} until={BRANDS_DURATION} tilt={3} />
    </div>
  </AbsoluteFill>
);
