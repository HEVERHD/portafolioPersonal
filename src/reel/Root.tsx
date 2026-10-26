import { Composition, Folder } from "remotion";
import { AppClip } from "./AppClip";
import { CLIP_FPS, CLIP_HEIGHT, CLIP_WIDTH, clipFrames, clips } from "./clips";
import { Booking } from "./scenes/Booking";
import { Brands } from "./scenes/Brands";
import { IN_PRODUCTION_DURATION, InProduction } from "./scenes/InProduction";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Stores } from "./scenes/Stores";
import { SHOWREEL_DURATION, Showreel } from "./Showreel";

// `lang` can be switched in Remotion Studio's props panel to preview the English version
const props = { lang: "es" as const };

export const RemotionRoot = () => (
  <>
    <Composition id="Showreel" component={Showreel} durationInFrames={SHOWREEL_DURATION} fps={30} width={1920} height={1080} defaultProps={props} />
    <Folder name="Showreel-Scenes">
      <Composition id="Intro" component={Intro} durationInFrames={75} fps={30} width={1920} height={1080} defaultProps={props} />
      <Composition id="InProduction" component={InProduction} durationInFrames={IN_PRODUCTION_DURATION} fps={30} width={1920} height={1080} defaultProps={props} />
      <Composition id="Booking" component={Booking} durationInFrames={165} fps={30} width={1920} height={1080} defaultProps={props} />
      <Composition id="Stores" component={Stores} durationInFrames={150} fps={30} width={1920} height={1080} defaultProps={props} />
      <Composition id="Brands" component={Brands} durationInFrames={150} fps={30} width={1920} height={1080} defaultProps={props} />
      <Composition id="Outro" component={Outro} durationInFrames={105} fps={30} width={1920} height={1080} defaultProps={props} />
    </Folder>
    {/* Source for public/reel/clips: rendered with `npm run clips`, never shown on the site */}
    <Folder name="Clips">
      {clips.map((clip) => (
        <Composition
          key={clip.id}
          id={`Clip-${clip.id}`}
          component={AppClip}
          durationInFrames={clipFrames(clip)}
          fps={CLIP_FPS}
          width={CLIP_WIDTH}
          height={CLIP_HEIGHT}
          defaultProps={{ clip }}
        />
      ))}
    </Folder>
  </>
);
