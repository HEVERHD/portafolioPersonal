/**
 * Screen recordings of client apps, cut into short clips for the "In production" scene.
 * The raw recordings live in public/reel/raw (git-ignored); `npm run clips` renders each clip
 * below into public/reel/clips, which is what the site ships.
 */

/** [x, y, width, height] in the recording's own pixels. */
export type Box = readonly [number, number, number, number];

export type Segment = {
  /** Start and end in the recording, in seconds. */
  readonly from: number;
  readonly to: number;
  /** Areas blurred for the whole segment (internal client figures). */
  readonly blur?: readonly Box[];
};

export type Clip = {
  readonly id: "chedraui" | "pepeganga" | "aludra";
  /** Recording size, for placing blur boxes. */
  readonly width: number;
  readonly height: number;
  readonly segments: readonly Segment[];
};

export const CLIP_FPS = 30;
/** Rendered clip size: the phone screen's aspect (390 × 844), small enough for the web. */
export const CLIP_WIDTH = 360;
export const CLIP_HEIGHT = 780;

export const clips: readonly Clip[] = [
  {
    id: "chedraui",
    width: 384,
    height: 832,
    // Home scrolling, a product page, back home; the login screen at the end is left out
    segments: [
      { from: 0, to: 4 },
      { from: 6.1, to: 8.6 },
      { from: 9.2, to: 10.3 },
    ],
  },
  {
    id: "pepeganga",
    width: 720,
    height: 1600,
    // Home, listing and product page. Skips ~12 s (price still loading) and the end, where
    // the recording shows the phone's notification shade.
    segments: [
      { from: 0, to: 2.4 },
      { from: 8.6, to: 10.4 },
      { from: 14.2, to: 17.6 },
    ],
  },
  {
    id: "aludra",
    width: 384,
    height: 832,
    // Cochez's daily figures and stock levels are internal, so they're blurred
    segments: [
      // Dashboard: clients created, open quotes, own quotes
      { from: 0, to: 1.8, blur: [[10, 264, 364, 32], [10, 363, 364, 32]] },
      // Product list: store / total stock per row (still loading here, blurred anyway)
      { from: 6.8, to: 9, blur: [[138, 286, 134, 30], [138, 453, 134, 30], [138, 608, 134, 30], [138, 763, 134, 30]] },
      // Product page: store and total stock
      { from: 13, to: 15.2, blur: [[190, 603, 152, 42]] },
      // Choosing the customer for a quote
      { from: 17.2, to: 18.6 },
    ],
  },
];

export const clipFrames = (clip: Clip) =>
  clip.segments.reduce((sum, s) => sum + Math.round((s.to - s.from) * CLIP_FPS), 0);
