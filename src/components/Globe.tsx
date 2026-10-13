"use client";

import createGlobe, { type Arc, type Marker } from "cobe";
import { useEffect, useRef } from "react";

export type GlobePlace = {
  id: string;
  location: [lat: number, lng: number];
  label: string;
  detail: string;
};

type Props = {
  places: GlobePlace[];
  /** Arcs start here; must be one of `places`. */
  homeId: string;
  /** Place to rotate to and highlight; null = gentle sway around the Americas. */
  focusId: string | null;
  className?: string;
};

const NEON: [number, number, number] = [0.24, 0.78, 1];
const DIM: [number, number, number] = [0.32, 0.36, 0.6];
const CENTER_LNG = -80;
const SWAY = 0.55;
const TAU = Math.PI * 2;

// cobe's phi that puts a longitude facing the viewer
const toPhi = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);
// Shortest signed angle from a to b, so easing never unwinds extra turns after a long drag
const angleDelta = (a: number, b: number) => ((((b - a + Math.PI) % TAU) + TAU) % TAU) - Math.PI;

function markersAndArcs(places: GlobePlace[], homeId: string, focusId: string | null) {
  const home = places.find((p) => p.id === homeId)!;
  // Focusing home keeps every route lit; focusing elsewhere dims the other routes
  const dimOthers = focusId !== null && focusId !== homeId;
  const markers: Marker[] = places.map((p) => ({
    id: p.id,
    location: p.location,
    size: p.id === focusId ? 0.09 : p.id === homeId ? 0.07 : 0.05,
    color: dimOthers && p.id !== focusId && p.id !== homeId ? DIM : NEON,
  }));
  const arcs: Arc[] = places
    .filter((p) => p.id !== homeId)
    .map((p) => ({
      id: `${homeId}-${p.id}`,
      from: home.location,
      to: p.location,
      color: dimOthers && p.id !== focusId ? DIM : NEON,
    }));
  return { markers, arcs };
}

/**
 * Dotted WebGL globe (cobe). Labels ride on the markers through CSS Anchor Positioning and fade
 * out behind the globe; it can be dragged with inertia, and `focusId` rotates it to a place.
 * Renders only while on screen; no sway for prefers-reduced-motion.
 */
export function Globe({ places, homeId, focusId, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const focusRef = useRef(focusId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = canvas.offsetWidth;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const basePhi = toPhi(CENTER_LNG);
    let phi = basePhi;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta: 0.28,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.02,
      baseColor: [0.16, 0.18, 0.42],
      markerColor: NEON,
      glowColor: [0.25, 0.22, 0.7],
      ...markersAndArcs(places, homeId, focusRef.current),
      arcColor: NEON,
      arcWidth: 0.6,
      arcHeight: 0.25,
      markerElevation: 0.02,
    });
    globeRef.current = globe;
    globe.update({ phi });
    canvas.style.opacity = "1";

    // Drag to rotate, with inertia on release
    let dragging = false;
    let lastX = 0;
    let velocity = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity = dx * 0.006;
      phi += velocity;
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    let frame = 0;
    let visible = false;
    const t0 = performance.now();
    const tick = (now: number) => {
      if (!dragging) {
        if (Math.abs(velocity) > 0.0004) {
          phi += velocity; // coast after a fling
          velocity *= 0.94;
        } else {
          const focus = places.find((p) => p.id === focusRef.current);
          const target = focus
            ? toPhi(focus.location[1])
            : basePhi + (reduced ? 0 : Math.sin((now - t0) / 6000) * SWAY);
          phi += angleDelta(phi, target) * (focus ? 0.08 : 0.04);
        }
      }
      globe.update({ phi });
      frame = visible ? requestAnimationFrame(tick) : 0;
    };
    function start() {
      if (!frame) frame = requestAnimationFrame(tick);
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      globe.destroy();
      globeRef.current = null;
    };
    // places/homeId are static for the lifetime of the globe
  }, []);

  // Highlight the focused place and dim the rest
  useEffect(() => {
    focusRef.current = focusId;
    globeRef.current?.update(markersAndArcs(places, homeId, focusId));
  }, [focusId, places, homeId]);

  // Per-place label styles, anchored to cobe's --cobe-{id} anchors (hidden where unsupported).
  // cobe 2.0.1 sets --cobe-visible-{id} to a literal "N" while a marker faces the viewer and removes
  // it when the marker goes behind the globe. "N" is invalid for opacity/filter, so those fall back
  // to their initial values (fully visible, no blur); once removed, the `0` fallback hides the label.
  // Net effect: a clean show/hide with the CSS transition.
  const labelCss = places
    .map(
      (p) => `.globe-label-${p.id}{position-anchor:--cobe-${p.id};bottom:anchor(top);left:anchor(center);` +
        `opacity:var(--cobe-visible-${p.id},0);filter:blur(calc((1 - var(--cobe-visible-${p.id},0)) * 8px));}`,
    )
    .join("");

  return (
    <div className={`relative ${className}`}>
      <style>{`.globe-label{display:none}@supports (position-anchor: --a){.globe-label{display:block}${labelCss}}`}</style>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="aspect-square w-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-1000"
      />
      {places.map((p) => (
        <div
          key={p.id}
          aria-hidden
          className={`globe-label globe-label-${p.id} pointer-events-none absolute -translate-x-1/2 -translate-y-2 rounded-full border px-2.5 py-1 text-[11px] leading-none whitespace-nowrap backdrop-blur transition-[opacity,filter,background-color,border-color] duration-300 ${
            p.id === focusId ? "border-neon bg-neon/20 text-ink" : "border-white/15 bg-bg/70 text-ink/90"
          }`}
        >
          <span className="font-semibold">{p.label}</span>
          <span className="ml-1.5 text-muted">{p.detail}</span>
        </div>
      ))}
    </div>
  );
}
