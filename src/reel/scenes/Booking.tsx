import { AbsoluteFill } from "remotion";
import { Caption } from "../components/Caption";
import { Phone } from "../components/Phone";

export const BOOKING_DURATION = 165;

export const Booking = () => (
  <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 120px", gap: 40 }}>
    <Caption
      eyebrow="PRODUCTO PROPIO"
      title="Sistema de reservas"
      detail="Agenda en segundos, confirmación por WhatsApp. En producción para 3 negocios."
    />
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 48 }}>
      <Phone screen="frailin.jpg" width={360} scroll={1500} delay={4} until={BOOKING_DURATION} tilt={-3} />
      <Phone screen="stylecut.jpg" width={360} scroll={0} delay={14} until={BOOKING_DURATION} tilt={3} />
    </div>
  </AbsoluteFill>
);
