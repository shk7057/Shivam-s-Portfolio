"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

import { useGsap } from "@/hooks/use-gsap";

type LenisConfig = NonNullable<ConstructorParameters<typeof Lenis>[0]>;

type UseLenisOptions = {
  enabled: boolean;
  options?: Partial<LenisConfig>;
};

export function useLenis({ enabled, options }: UseLenisOptions) {
  const lenisRef = useRef<Lenis | null>(null);
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      ...options,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    // GSAP owns the render loop so Lenis and ScrollTrigger stay in sync.
    lenisRef.current = lenis;
    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.update();
    };
  }, [enabled, gsap, options, ScrollTrigger]);

  return lenisRef;
}
