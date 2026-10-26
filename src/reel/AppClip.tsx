import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { CLIP_FPS, type Clip } from "./clips";

/**
 * Renders one clip from its raw recording: the segments back to back, with blur boxes drawn
 * by a second, blurred copy of the video clipped to each box. Only used to render the files in
 * public/reel/clips; the showreel itself plays those rendered clips. OffthreadVideo extracts
 * frames with Remotion's own ffmpeg, which is reliable for these phone recordings when rendering.
 */
export const AppClip = ({ clip }: { readonly clip: Clip }) => {
  const src = staticFile(`reel/raw/${clip.id}.mp4`);
  let start = 0;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {clip.segments.map((segment) => {
        const length = Math.round((segment.to - segment.from) * CLIP_FPS);
        const from = start;
        start += length;
        const trim = { trimBefore: Math.round(segment.from * CLIP_FPS), trimAfter: Math.round(segment.to * CLIP_FPS) };

        return (
          <Sequence key={segment.from} from={from} durationInFrames={length}>
            <OffthreadVideo src={src} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} {...trim} />
            {segment.blur?.map(([x, y, w, h]) => {
              // clip-path in percentages of the recording, so it holds at any render size
              const top = (y / clip.height) * 100;
              const left = (x / clip.width) * 100;
              const bottom = 100 - ((y + h) / clip.height) * 100;
              const right = 100 - ((x + w) / clip.width) * 100;
              return (
                <AbsoluteFill key={`${x}-${y}`} style={{ clipPath: `inset(${top}% ${right}% ${bottom}% ${left}% round 6px)` }}>
                  <OffthreadVideo src={src} muted style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(7px)", scale: "1.04" }} {...trim} />
                </AbsoluteFill>
              );
            })}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
