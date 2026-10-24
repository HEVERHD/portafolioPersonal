import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

type Props = {
  readonly eyebrow: string;
  readonly title: string;
  readonly detail: string;
};

/** Left-aligned text block used by the project scenes, set like the site's section headings. */
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
    <div style={{ width: 720, borderTop: `3px solid ${colors.ink}`, paddingTop: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: fonts.sans, fontSize: 30, color: colors.muted, ...enter(4) }}>
        <span style={{ width: 56, height: 3, background: colors.accent }} />
        {eyebrow}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontWeight: 500,
          fontSize: 104,
          lineHeight: 1,
          letterSpacing: -2,
          color: colors.ink,
          marginTop: 28,
          ...enter(10),
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 36, lineHeight: 1.4, color: colors.muted, marginTop: 32, ...enter(18) }}>
        {detail}
      </div>
    </div>
  );
};
