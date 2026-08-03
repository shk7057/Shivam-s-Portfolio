"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroDepthEngineProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function HeroDepthEngine({
  src,
  alt,
  priority = true,
  sizes,
  className,
}: HeroDepthEngineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const animFrameId = useRef<number | null>(null);
  const [maxTilt, setMaxTilt] = useState(0);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateTiltLimit = () => {
      if (reducedMotionQuery.matches) {
        setMaxTilt(0);
      } else if (desktopQuery.matches) {
        setMaxTilt(3.5);
      } else if (tabletQuery.matches) {
        setMaxTilt(1.5);
      } else {
        setMaxTilt(0);
      }
    };

    updateTiltLimit();

    desktopQuery.addEventListener("change", updateTiltLimit);
    tabletQuery.addEventListener("change", updateTiltLimit);
    reducedMotionQuery.addEventListener("change", updateTiltLimit);

    return () => {
      desktopQuery.removeEventListener("change", updateTiltLimit);
      tabletQuery.removeEventListener("change", updateTiltLimit);
      reducedMotionQuery.removeEventListener("change", updateTiltLimit);
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const render = () => {
      if (!isActive) return;

      const ease = 0.08;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * ease;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * ease;

      if (cardRef.current) {
        const { x, y } = currentRotation.current;
        cardRef.current.style.transform = `rotateX(${x.toFixed(3)}deg) rotateY(${y.toFixed(3)}deg)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (animFrameId.current !== null) cancelAnimationFrame(animFrameId.current);
      } else {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActive = false;
      if (animFrameId.current !== null) cancelAnimationFrame(animFrameId.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maxTilt === 0 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const normX = mouseX / (rect.width / 2);
    const normY = mouseY / (rect.height / 2);

    targetRotation.current.x = -normY * maxTilt;
    targetRotation.current.y = normX * maxTilt;
  };

  const handleMouseLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("perspective-[1000px] w-full h-full select-none relative", className)}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-300 ease-out transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Soft Shadow Layer behind Subject for Depth Separation */}
        <div
          className="absolute inset-[5%] rounded-full opacity-40 blur-2xl bg-black/70 pointer-events-none"
          style={{ transform: "translateZ(-25px)" }}
        />

        {/* Ambient Gold Rim Glow behind Subject */}
        <div
          className="absolute inset-[0%] rounded-full opacity-20 blur-xl pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(199,166,107,0.18)_0%,transparent_70%)]"
          style={{ transform: "translateZ(-15px)" }}
        />

        {/* Main Sharp PNG Subject with Soft Drop Shadow */}
        <div className="relative w-full h-full" style={{ transform: "translateZ(0px)" }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-center pointer-events-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </div>
  );
}
