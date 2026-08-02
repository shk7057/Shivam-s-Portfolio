"use client";

import {
  Children,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { GalleryCorridorGap } from "@/components/ui/gallery-corridor-gap";
import { useGsap } from "@/hooks/use-gsap";
import { useLenis } from "@/hooks/use-lenis";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const CORRIDOR_METADATA = [
  { num: "02", label: "ABOUT" },
  { num: "03", label: "SKILLS" },
  { num: "04", label: "PROJECTS" },
  { num: "05", label: "EXPERIENCE" },
  { num: "06", label: "SERVICES" },
  { num: "07", label: "CERTIFICATES" },
  { num: "08", label: "CONTACT" },
];

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isHorizontalEnabled, setIsHorizontalEnabled] = useState(false);
  const { gsap, ScrollTrigger } = useGsap();
  const cleanupScrollTriggers = useScrollTriggerCleanup(containerRef);

  useLenis({ enabled: isHorizontalEnabled });

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const syncScrollMode = () => {
      setIsHorizontalEnabled(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    syncScrollMode();
    desktopQuery.addEventListener("change", syncScrollMode);
    reducedMotionQuery.addEventListener("change", syncScrollMode);

    return () => {
      desktopQuery.removeEventListener("change", syncScrollMode);
      reducedMotionQuery.removeEventListener("change", syncScrollMode);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    cleanupScrollTriggers();

    if (!container || !track || !isHorizontalEnabled) {
      if (track) {
        gsap.set(track, { clearProps: "transform" });
      }
      ScrollTrigger.refresh();
      return;
    }

    // Scroll distance equals full horizontal scrollWidth minus viewport width
    const getScrollDistance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth);

    const horizontalTween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        id: "portfolio-horizontal-scroll",
        trigger: container,
        pin: true,
        scrub: 1.1,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      },
    });

    // Camera Feel: Section entry scale (0.985 -> 1.00), opacity (0.85 -> 1.00), and subtle translate (80px -> 0px)
    const sections = Array.from(track.querySelectorAll<HTMLElement>("section"));
    sections.forEach((sec, idx) => {
      if (idx === 0) return; // Hero starts at 1.00

      gsap.fromTo(
        sec,
        {
          scale: 0.985,
          opacity: 0.85,
          x: 80,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            containerAnimation: horizontalTween,
            start: "left 96%",
            end: "left 35%",
            scrub: 1.1,
          },
        },
      );
    });

    let resizeFrame: number | null = null;

    const scheduleRefresh = () => {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        ScrollTrigger.refresh();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(container);
    resizeObserver.observe(track);
    window.addEventListener("resize", scheduleRefresh, { passive: true });
    ScrollTrigger.refresh();

    return () => {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
      window.removeEventListener("resize", scheduleRefresh);
      resizeObserver.disconnect();
      horizontalTween.scrollTrigger?.kill();
      horizontalTween.kill();
      gsap.set(track, { clearProps: "transform" });
      sections.forEach((sec) => gsap.set(sec, { clearProps: "transform,opacity" }));
      ScrollTrigger.refresh();
    };
  }, [cleanupScrollTriggers, gsap, isHorizontalEnabled, ScrollTrigger]);

  const childrenArray = Children.toArray(children);

  return (
    <div
      ref={containerRef}
      className={cn("horizontal-scroll relative w-full", className)}
    >
      <div ref={trackRef} className="horizontal-scroll-track flex flex-col md:flex-row">
        {childrenArray.map((child, idx) => {
          const corridorMeta = CORRIDOR_METADATA[idx];
          return (
            <div key={idx} className="contents">
              {child}
              {isHorizontalEnabled && corridorMeta && (
                <GalleryCorridorGap
                  number={corridorMeta.num}
                  label={corridorMeta.label}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
