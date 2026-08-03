"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type HeroAmbientGlowProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
};

export function HeroAmbientGlow({ containerRef, className }: HeroAmbientGlowProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const targetIntensity = useRef(1);
  const currentIntensity = useRef(1);

  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const getGlowRadius = () => {
      if (desktopQuery.matches) return 750;
      if (tabletQuery.matches) return 500;
      return 350;
    };

    const rect = container.getBoundingClientRect();
    targetPos.current = { x: rect.width / 2, y: rect.height * 0.4 };
    currentPos.current = { x: rect.width / 2, y: rect.height * 0.4 };

    let isActive = true;
    let lastX = -1;
    let lastY = -1;
    let lastAlpha = -1;

    const render = () => {
      if (!isActive) return;

      const isReducedMotion = reducedMotionQuery.matches;
      const isMobile = !desktopQuery.matches && !tabletQuery.matches;

      const ease = 0.07;
      const nextX = currentPos.current.x + (targetPos.current.x - currentPos.current.x) * ease;
      const nextY = currentPos.current.y + (targetPos.current.y - currentPos.current.y) * ease;
      const nextIntensity =
        currentIntensity.current + (targetIntensity.current - currentIntensity.current) * ease;

      currentPos.current.x = nextX;
      currentPos.current.y = nextY;
      currentIntensity.current = nextIntensity;

      const dx = Math.abs(nextX - lastX);
      const dy = Math.abs(nextY - lastY);
      const di = Math.abs(nextIntensity - lastAlpha);

      // Only mutate DOM background string when position or intensity has meaningfully changed
      if (glowRef.current && (dx > 0.1 || dy > 0.1 || di > 0.002)) {
        lastX = nextX;
        lastY = nextY;
        lastAlpha = nextIntensity;

        const radius = getGlowRadius();
        const curX = nextX.toFixed(1);
        const curY = nextY.toFixed(1);

        const mult = nextIntensity;
        const coreAlpha = (0.22 * mult).toFixed(3);
        const midAlpha1 = (0.09 * mult).toFixed(3);
        const midAlpha2 = (0.035 * mult).toFixed(3);
        const outerAlpha = (0.01 * mult).toFixed(3);

        if (isReducedMotion || isMobile) {
          glowRef.current.style.background = `radial-gradient(circle ${radius}px at 50% 40%, rgba(199, 166, 107, 0.18) 0%, rgba(199, 166, 107, 0.06) 40%, rgba(199, 166, 107, 0.02) 65%, transparent 85%)`;
        } else {
          glowRef.current.style.background = `radial-gradient(circle ${radius}px at ${curX}px ${curY}px, rgba(199, 166, 107, ${coreAlpha}) 0%, rgba(199, 166, 107, ${midAlpha1}) 32%, rgba(199, 166, 107, ${midAlpha2}) 58%, rgba(199, 166, 107, ${outerAlpha}) 78%, transparent 92%)`;
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotionQuery.matches || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const relX = e.clientX - containerRect.left;
      const relY = e.clientY - containerRect.top;

      targetPos.current = { x: relX, y: relY };

      const portraitEl = containerRef.current.querySelector<HTMLElement>(
        '[data-reveal="hero-portrait"]',
      );

      if (portraitEl) {
        const pRect = portraitEl.getBoundingClientRect();
        const isOverPortrait =
          e.clientX >= pRect.left &&
          e.clientX <= pRect.right &&
          e.clientY >= pRect.top &&
          e.clientY <= pRect.bottom;

        targetIntensity.current = isOverPortrait ? 1.2 : 1.0;
      } else {
        targetIntensity.current = 1.0;
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        targetPos.current = {
          x: containerRect.width / 2,
          y: containerRect.height * 0.4,
        };
      }
      targetIntensity.current = 1.0;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (animFrameId.current !== null) cancelAnimationFrame(animFrameId.current);
      } else {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActive = false;
      if (animFrameId.current !== null) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [containerRef]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 transform-gpu",
        className,
      )}
    />
  );
}
