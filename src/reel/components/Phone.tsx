import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const VIEWPORT_W = 390;
const VIEWPORT_H = 844;
const BEZEL = 14;

type Props = {
  /** File in public/screens, captured at a 390px-wide mobile viewport. */
  readonly screen: string;
  /** Rendered width of the whole device, bezel included. */
  readonly width: number;
  /** How far to scroll the page, in CSS pixels of the original 390px viewport. */
  readonly scroll: number;
  /** Frame at which the phone starts entering. */
  readonly delay: number;
  /** Frame at which scrolling ends; usually the scene length. */
  readonly until: number;
  readonly tilt?: number;
};

/**
 * A phone mockup showing a full-page mobile screenshot that scrolls slowly,
 * as if someone were browsing the live site.
 */
export const Phone = ({ screen, width, scroll, delay, until, tilt = 0 }: Props) => {
  const frame = useCurrentFrame();
  const screenW = width - BEZEL * 2;
  const screenH = (screenW * VIEWPORT_H) / VIEWPORT_W;
  const scale = screenW / VIEWPORT_W;

  return (
    <div
      style={{
        width,
        height: screenH + BEZEL * 2,
        padding: BEZEL,
        borderRadius: 64,
        // A real black phone on paper: soft drop shadow, no glow
        background: "linear-gradient(145deg, #2b2a27, #121110 60%)",
        boxShadow: "0 30px 70px rgba(28,26,22,0.28), 0 6px 18px rgba(28,26,22,0.18)",
        opacity: interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [delay, delay + 30], ["0px 140px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        rotate: `${tilt}deg`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: screenW,
          height: screenH,
          borderRadius: 50,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Img
          src={staticFile(`reel/screens/${screen}`)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: screenW,
            translate: interpolate(
              frame,
              [delay + 30, until - 10],
              ["0px 0px", `0px ${-scroll * scale}px`],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.45, 0, 0.25, 1),
              },
            ),
          }}
        />
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            translate: "-50% 0px",
            width: screenW * 0.3,
            height: 30,
            borderRadius: 20,
            background: "#000",
          }}
        />
      </div>
    </div>
  );
};
