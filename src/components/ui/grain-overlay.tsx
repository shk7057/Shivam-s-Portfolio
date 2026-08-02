"use client";

import { cn } from "@/lib/utils";

type GrainOverlayProps = {
  className?: string;
};

export function GrainOverlay({ className }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] select-none opacity-[0.025]",
        className,
      )}
    >
      <svg className="h-full w-full opacity-100">
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-noise)" />
      </svg>
    </div>
  );
}
