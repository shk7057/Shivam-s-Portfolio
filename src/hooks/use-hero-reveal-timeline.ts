"use client";

import { useEffect, type RefObject } from "react";
import { useGsap } from "@/hooks/use-gsap";

export function useHeroRevealTimeline(scopeRef: RefObject<HTMLElement | null>) {
  const { gsap } = useGsap();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const greeting = scope.querySelector('[data-reveal="hero-greeting"]');
    const name = scope.querySelector('[data-reveal="hero-name"]');
    const signature = scope.querySelector('[data-reveal="hero-signature"]');
    const signaturePaths = scope.querySelectorAll('[data-signature-path]');
    const portrait = scope.querySelector('[data-reveal="hero-portrait"]');
    const header = scope.querySelector('[data-reveal="hero-header"]');
    const typography = scope.querySelector('[data-reveal="hero-typography"]');
    const particles = scope.querySelector('[data-reveal="hero-particles"]');
    const about = scope.querySelector('[data-reveal="hero-about"]');
    const cta = scope.querySelector('[data-reveal="hero-cta"]');
    const navbar = document.querySelector('[data-reveal="navbar"]');

    // Initial states setup
    gsap.set(scope, { opacity: 0 });
    if (typography) gsap.set(typography, { opacity: 0 });
    if (portrait) gsap.set(portrait, { opacity: 0, scale: isMobile ? 0.98 : 0.96, y: isMobile ? 12 : 24 });
    if (greeting) gsap.set(greeting, { opacity: 0, y: isMobile ? 6 : 10 });
    if (name) gsap.set(name, { opacity: 0, y: isMobile ? 12 : 20 });
    if (header) gsap.set(header, { opacity: 0, y: isMobile ? 10 : 15 });
    if (signature) gsap.set(signature, { opacity: 0, scale: 0.94 });
    if (about) gsap.set(about, { opacity: 0, y: isMobile ? 10 : 15 });
    if (cta) gsap.set(cta, { opacity: 0, y: isMobile ? 8 : 12 });
    if (particles) gsap.set(particles, { opacity: 0 });
    if (navbar) gsap.set(navbar, { opacity: 0, y: isMobile ? -5 : -10 });

    // Prepare SVG path stroke drawing
    signaturePaths.forEach((path) => {
      if (path instanceof SVGPathElement) {
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      }
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    // 0.0s → Background fades in
    tl.to(scope, { opacity: 1, duration: 0.35 }, 0.0);

    // 0.2s → Background typography appears
    if (typography) {
      tl.to(typography, { opacity: 1, duration: 0.6 }, 0.2);
    }

    // 0.5s → Subject / portrait fades upward
    if (portrait) {
      tl.to(
        portrait,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: isMobile ? 0.6 : 0.8,
          ease: "power3.out",
        },
        0.5,
      );
    }

    // 0.8s → Heading & Identity Block appears
    if (greeting) {
      tl.to(greeting, { opacity: 1, y: 0, duration: 0.4 }, 0.78);
    }
    if (name) {
      tl.to(name, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.82);
    }
    if (header) {
      tl.to(header, { opacity: 1, y: 0, duration: 0.5 }, 0.86);
    }

    // 1.0s → Signature draws itself
    if (signature) {
      tl.to(signature, { opacity: 1, scale: 1, duration: 0.4 }, 0.95);
    }
    if (signaturePaths.length > 0) {
      tl.to(
        signaturePaths,
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut",
        },
        1.0,
      );
    }

    // 1.3s → CTA & About appears
    if (about) {
      tl.to(about, { opacity: 1, y: 0, duration: 0.5 }, 1.25);
    }
    if (cta) {
      tl.to(cta, { opacity: 1, y: 0, duration: 0.5 }, 1.3);
    }

    // 1.5s → Particles become visible
    if (particles) {
      tl.to(particles, { opacity: 1, duration: 0.8 }, 1.5);
    }

    // Navbar
    if (navbar) {
      tl.to(navbar, { opacity: 1, y: 0, duration: 0.5 }, 1.6);
    }

    return () => {
      tl.kill();
    };
  }, [gsap, scopeRef]);
}
