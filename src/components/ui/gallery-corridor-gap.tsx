"use client";

import { cn } from "@/lib/utils";

type GalleryCorridorGapProps = {
  number: string;
  label: string;
  className?: string;
};

export function GalleryCorridorGap({
  number,
  label,
  className,
}: GalleryCorridorGapProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "hidden md:flex flex-col items-center justify-center h-screen w-[10vw] shrink-0 pointer-events-none select-none relative overflow-hidden",
        className,
      )}
    >
      {/* Soft Ambient Gold Corridor Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,166,107,0.06)_0%,transparent_70%)]" />

      {/* Corridor Section Number & Editorial Label */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="font-serif text-5xl lg:text-7xl font-bold tracking-widest uppercase text-[#C7A66B]/[0.035] leading-none">
          {number}
        </span>
        <span className="mt-2 font-mono text-[10px] tracking-[0.35em] uppercase text-[#C7A66B]/[0.035]">
          {label}
        </span>
      </div>
    </div>
  );
}
