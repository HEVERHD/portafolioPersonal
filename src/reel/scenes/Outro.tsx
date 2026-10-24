import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { copy, SITE, STACK, type ReelLang } from "../copy";
import { accentText, colors, fonts } from "../theme";

export const Outro = ({ lang = "es" }: { readonly lang?: ReelLang }) => {
  const frame = useCurrentFrame();
  const text = copy[lang].outro;
  const fadeIn = (start: number) =>
    interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          fontFamily: fonts.serif,
          fontWeight: 500,
          fontSize: 140,
          lineHeight: 1.05,
          letterSpacing: -4,
          color: colors.ink,
          opacity: fadeIn(0),
          translate: interpolate(frame, [0, 30], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {text.lead}
        <br />
        <span style={accentText}>{text.accent}</span>
      </div>
      <div style={{ width: 120, height: 3, background: colors.ink, marginTop: 56, opacity: fadeIn(18) }} />
      <div style={{ fontFamily: fonts.sans, fontSize: 34, color: colors.muted, marginTop: 36, opacity: fadeIn(20) }}>{STACK}</div>
      <div style={{ fontFamily: fonts.serif, fontWeight: 500, fontSize: 52, color: colors.ink, marginTop: 20, opacity: fadeIn(30) }}>
        {SITE}
      </div>
    </AbsoluteFill>
  );
};
