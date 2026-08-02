"use client";

import { useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isGsapRegistered = false;

export function useGsap() {
  return useMemo(() => {
    if (!isGsapRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      isGsapRegistered = true;
    }

    return { gsap, ScrollTrigger };
  }, []);
}
