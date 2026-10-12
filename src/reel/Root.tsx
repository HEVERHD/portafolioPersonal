import { Composition, Folder } from "remotion";
import { Booking } from "./scenes/Booking";
import { Brands } from "./scenes/Brands";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Stores } from "./scenes/Stores";
import { Showreel } from "./Showreel";

export const RemotionRoot = () => (
  <>
    <Composition id="Showreel" component={Showreel} durationInFrames={585} fps={30} width={1920} height={1080} />
    <Folder name="Showreel-Scenes">
      <Composition id="Intro" component={Intro} durationInFrames={75} fps={30} width={1920} height={1080} />
      <Composition id="Booking" component={Booking} durationInFrames={165} fps={30} width={1920} height={1080} />
      <Composition id="Stores" component={Stores} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="Brands" component={Brands} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="Outro" component={Outro} durationInFrames={105} fps={30} width={1920} height={1080} />
    </Folder>
  </>
);
