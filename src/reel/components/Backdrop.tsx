import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

/** Paper background with a thin printed frame, like the site's photo frames. */
export const Backdrop = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <div style={{ position: "absolute", inset: 40, border: `2px solid ${colors.line}` }} />
  </AbsoluteFill>
);
