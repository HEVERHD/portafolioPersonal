// Remotion Studio for the showreel (`npm run reel`). The same composition is
// played live on the site through @remotion/player (src/components/Showreel.tsx).
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("src/reel/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setPublicLicenseKey("free-license");
