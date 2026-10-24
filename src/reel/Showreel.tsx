import { AbsoluteFill } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Backdrop } from "./components/Backdrop";
import type { ReelLang } from "./copy";
import { BOOKING_DURATION, Booking } from "./scenes/Booking";
import { BRANDS_DURATION, Brands } from "./scenes/Brands";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { STORES_DURATION, Stores } from "./scenes/Stores";

// 75 + 165 + 150 + 150 + 105 - 4 transitions × 15 = 585 frames (19.5 s at 30 fps)
export const SHOWREEL_DURATION = 585;

export type ShowreelProps = { readonly lang?: ReelLang };

export const Showreel = ({ lang = "es" }: ShowreelProps) => (
  <AbsoluteFill>
    <Backdrop />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Intro" durationInFrames={75}>
        <Intro lang={lang} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence name="Booking" durationInFrames={BOOKING_DURATION}>
        <Booking lang={lang} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence name="Stores" durationInFrames={STORES_DURATION}>
        <Stores lang={lang} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence name="Brands" durationInFrames={BRANDS_DURATION}>
        <Brands lang={lang} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={105}>
        <Outro lang={lang} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
