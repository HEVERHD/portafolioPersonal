"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { SHOWREEL_DURATION, Showreel } from "@/reel/Showreel";

/** Plays the Remotion showreel live in the browser, in the page's language; pauses while off-screen. */
export default function ReelPlayer() {
  const { lang } = useLang();
  const inputProps = useMemo(() => ({ lang }), [lang]);
  const playerRef = useRef<PlayerRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      const player = playerRef.current;
      if (!player) return;
      if (entry.isIntersecting) player.play();
      else player.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      <Player
        ref={playerRef}
        component={Showreel}
        inputProps={inputProps}
        durationInFrames={SHOWREEL_DURATION}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        autoPlay
        loop
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
        style={{ width: "100%", aspectRatio: "16 / 9" }}
      />
    </div>
  );
}
