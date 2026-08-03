import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type EditorialBackgroundTypographyProps = ComponentPropsWithoutRef<"div">;

export function EditorialBackgroundTypography({
  className,
  ...props
}: EditorialBackgroundTypographyProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden z-0",
        className,
      )}
      {...props}
    >
      <style>{`
        @keyframes editorialFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes editorialFloatReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }

        .animate-editorial-float {
          animation: editorialFloat 28s ease-in-out infinite;
        }

        .animate-editorial-float-reverse {
          animation: editorialFloatReverse 34s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-editorial-float,
          .animate-editorial-float-reverse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Top-Left: CREATIVE & TECHNOLOGIST */}
      <div className="absolute top-[2.5%] left-[1.5%] animate-editorial-float">
        <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extralight tracking-[0.25em] uppercase text-[#C7A66B]/[0.022] leading-none">
          CREATIVE
        </span>
        <span className="block text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-[#C7A66B]/[0.02] ml-4 mt-2">
          TECHNOLOGIST
        </span>
      </div>

      {/* Center-Right: PROBLEM SOLVER */}
      <div className="absolute top-[42%] right-[2%] hidden md:block animate-editorial-float-reverse">
        <span className="block text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-[#C7A66B]/[0.022] [writing-mode:vertical-rl]">
          PROBLEM SOLVER
        </span>
      </div>

      {/* Bottom-Left: AI ENGINEER */}
      <div className="absolute bottom-[-1%] left-[1%] animate-editorial-float">
        <span className="block text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black tracking-[0.2em] uppercase text-[#C7A66B]/[0.022] leading-none">
          AI ENGINEER
        </span>
      </div>

      {/* Mobile Subtle Watermark */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 block md:hidden text-center w-full px-4 animate-editorial-float">
        <span className="text-xl sm:text-2xl font-extralight tracking-[0.3em] uppercase text-[#C7A66B]/[0.022]">
          CREATIVE TECHNOLOGIST
        </span>
      </div>
    </div>
  );
}
