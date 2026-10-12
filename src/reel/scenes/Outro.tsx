import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, gradientText } from "../theme";

export const Outro = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 120,
          lineHeight: 1.05,
          letterSpacing: -3,
          color: colors.ink,
          opacity: interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0, 30], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Del primer commit
        <br />
        <span style={gradientText}>a producción.</span>
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 32,
          color: colors.muted,
          marginTop: 48,
          letterSpacing: 2,
          opacity: interpolate(frame, [20, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        React · Next.js · React Native
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 44,
          color: colors.ink,
          marginTop: 28,
          opacity: interpolate(frame, [30, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        hevert<span style={{ color: colors.neon }}>.</span>dev
      </div>
    </AbsoluteFill>
  );
};
