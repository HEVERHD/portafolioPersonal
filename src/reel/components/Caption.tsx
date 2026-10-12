import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

type Props = {
  readonly eyebrow: string;
  readonly title: string;
  readonly detail: string;
};

/** Left-aligned text block used by the project scenes. */
export const Caption = ({ eyebrow, title, detail }: Props) => {
  const frame = useCurrentFrame();
  const enter = (start: number) => ({
    opacity: interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    translate: interpolate(frame, [start, start + 24], ["0px 30px", "0px 0px"], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }),
  });

  return (
    <div style={{ width: 720 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 26, letterSpacing: 6, color: colors.neon, ...enter(4) }}>
        {eyebrow}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 96,
          lineHeight: 1,
          letterSpacing: -2,
          color: colors.ink,
          marginTop: 24,
          ...enter(10),
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: fonts.display, fontSize: 36, lineHeight: 1.35, color: colors.muted, marginTop: 32, ...enter(18) }}>
        {detail}
      </div>
    </div>
  );
};
