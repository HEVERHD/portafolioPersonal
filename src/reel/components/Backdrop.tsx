import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

/** Dark background with a faint grid and two slowly drifting glows. */
export const Backdrop = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 25%, transparent 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: colors.accent,
          opacity: 0.22,
          filter: "blur(160px)",
          top: -300,
          right: -150,
          translate: interpolate(frame, [0, durationInFrames], ["0px 0px", "-120px 80px"]),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: colors.neon,
          opacity: 0.12,
          filter: "blur(160px)",
          bottom: -250,
          left: -200,
          translate: interpolate(frame, [0, durationInFrames], ["0px 0px", "140px -60px"]),
        }}
      />
    </AbsoluteFill>
  );
};
