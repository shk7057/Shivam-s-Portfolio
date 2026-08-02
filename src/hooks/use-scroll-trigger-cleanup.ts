"use client";

import { useCallback, useEffect, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollTriggerCleanup(scopeRef: RefObject<HTMLElement | null>) {
  const cleanupScrollTriggers = useCallback(() => {
    const scope = scopeRef.current;

    ScrollTrigger.getAll().forEach((trigger) => {
      const triggerElement = trigger.trigger;
      const isScopedTrigger =
        scope && triggerElement instanceof Node && scope.contains(triggerElement);

      if (isScopedTrigger) {
        trigger.kill();
      }
    });
  }, [scopeRef]);

  useEffect(() => cleanupScrollTriggers, [cleanupScrollTriggers]);

  return cleanupScrollTriggers;
}
