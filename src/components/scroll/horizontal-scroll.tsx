"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useGsap } from "@/hooks/use-gsap";
import { useLenis } from "@/hooks/use-lenis";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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

    // Keep the engine disabled for mobile and users who request reduced motion.
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

    // Distance is derived from section count, so new sections do not need engine edits.
    const getScrollDistance = () =>
      Math.max(0, track.children.length - 1) * window.innerWidth;

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

    let resizeFrame: number | null = null;

    // ResizeObserver plus a rAF debounce keeps large viewport changes stable.
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
      ScrollTrigger.refresh();
    };
  }, [cleanupScrollTriggers, gsap, isHorizontalEnabled, ScrollTrigger]);

  return (
    <div
      ref={containerRef}
      className={cn("horizontal-scroll relative w-full", className)}
    >
      <div ref={trackRef} className="horizontal-scroll-track flex flex-col">
        {children}
      </div>
    </div>
  );
}
