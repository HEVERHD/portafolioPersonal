import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { copy, type ReelLang } from "../copy";
import { accentText, colors, fonts } from "../theme";

export const Intro = ({ lang = "es" }: { readonly lang?: ReelLang }) => {
  const frame = useCurrentFrame();
  const text = copy[lang].intro;
  const rise = (start: number) => ({
    opacity: interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    translate: interpolate(frame, [start, start + 28], ["0px 50px", "0px 0px"], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 180px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          fontFamily: fonts.sans,
          fontSize: 34,
          color: colors.muted,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ width: 64, height: 3, background: colors.accent }} />
        {text.eyebrow}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontWeight: 500,
          fontSize: 190,
          lineHeight: 1,
          letterSpacing: -5,
          marginTop: 44,
          color: colors.ink,
          ...rise(8),
        }}
      >
        {text.lead}
      </div>
      <div style={{ fontFamily: fonts.serif, fontSize: 190, lineHeight: 1.1, letterSpacing: -5, ...accentText, ...rise(22) }}>
        {text.accent}
      </div>
    </AbsoluteFill>
  );
};
