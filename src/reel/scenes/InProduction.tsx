import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Phone } from "../components/Phone";
import { copy, type ReelLang } from "../copy";
import { colors, fonts } from "../theme";

// Each clip is 7.6 s (228 frames); the last phone enters at frame 20
export const IN_PRODUCTION_DURATION = 250;

const PHONES = [
  { video: "chedraui.mp4", delay: 8, tilt: -2 },
  { video: "pepeganga.mp4", delay: 14, tilt: 0 },
  { video: "aludra.mp4", delay: 20, tilt: 2 },
];

/** Client apps in production, playing side by side: Chedraui, Pepe Ganga and Aludra. */
export const InProduction = ({ lang = "es" }: { readonly lang?: ReelLang }) => {
  const frame = useCurrentFrame();
  const text = copy[lang].production;
  const enter = (start: number) => ({
    opacity: interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    translate: interpolate(frame, [start, start + 24], ["0px 24px", "0px 0px"], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }),
  });

  return (
    <AbsoluteFill style={{ padding: "70px 140px 0", alignItems: "center" }}>
      <div style={{ alignSelf: "stretch", display: "flex", alignItems: "baseline", gap: 32, borderTop: `3px solid ${colors.ink}`, paddingTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: fonts.sans, fontSize: 30, color: colors.muted, ...enter(2) }}>
          <span style={{ width: 56, height: 3, background: colors.accent }} />
          {text.eyebrow}
        </div>
        <div style={{ fontFamily: fonts.serif, fontWeight: 500, fontSize: 76, letterSpacing: -1.5, color: colors.ink, ...enter(6) }}>
          {text.title}
        </div>
      </div>

      <div style={{ display: "flex", gap: 90, marginTop: 44 }}>
        {PHONES.map((phone, i) => (
          <div key={phone.video} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Phone video={phone.video} width={300} delay={phone.delay} until={IN_PRODUCTION_DURATION} tilt={phone.tilt} />
            <div style={{ marginTop: 26, textAlign: "center", ...enter(phone.delay + 10) }}>
              <div style={{ fontFamily: fonts.serif, fontWeight: 500, fontSize: 40, color: colors.ink }}>{text.apps[i].name}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 24, color: colors.muted, marginTop: 6 }}>{text.apps[i].detail}</div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
