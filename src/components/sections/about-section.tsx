"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cpu, GraduationCap, MapPin, User } from "lucide-react";

import { useGsap } from "@/hooks/use-gsap";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";

type StatItemProps = {
  numericValue: number;
  suffix: string;
  label: string;
  isRevealed: boolean;
};

function StatCounter({ numericValue, suffix, label, isRevealed }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRevealed) return;

    let start = 0;
    const duration = 1400; // ms
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = numericValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isRevealed, numericValue]);

  return (
    <div className="group relative rounded-[24px] border border-[#C7A66B]/15 bg-[#0d0d0d]/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C7A66B]/50 hover:shadow-[0_0_25px_rgba(199,166,107,0.2)]">
      <div className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        {count}
        {suffix}
      </div>
      <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground/80">
        {label}
      </div>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const { gsap } = useGsap();
  const cleanupScrollTriggers = useScrollTriggerCleanup(sectionRef);

  useEffect(() => {
    const scope = sectionRef.current;
    const container = containerRef.current;
    if (!scope || !container) return;

    cleanupScrollTriggers();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(container, { opacity: 1, y: 0, scale: 1 });
      setIsRevealed(true);
      return;
    }

    const heading = scope.querySelector('[data-about-reveal="heading"]');
    const photo = scope.querySelector('[data-about-reveal="photo"]');
    const info = scope.querySelector('[data-about-reveal="info"]');
    const paragraph = scope.querySelector('[data-about-reveal="paragraph"]');
    const stats = scope.querySelector('[data-about-reveal="stats"]');

    // Initial states
    gsap.set(container, { opacity: 0, y: 30, scale: 0.98 });
    if (heading) gsap.set(heading, { opacity: 0, y: 15 });
    if (photo) gsap.set(photo, { opacity: 0, scale: 0.95, y: 15 });
    if (info) gsap.set(info, { opacity: 0, y: 15 });
    if (paragraph) gsap.set(paragraph, { opacity: 0, y: 15 });
    if (stats) gsap.set(stats, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ paused: true });

    // Staggered reveal timeline
    tl.to(container, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(heading, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(photo, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .to(info, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(paragraph, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(stats, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");

    // IntersectionObserver triggers reveal reliably on both horizontal and vertical viewports
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            tl.play();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(scope);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, [cleanupScrollTriggers, gsap]);

  const infoBlocks = [
    {
      icon: User,
      title: "Name",
      value: "Shivam Kumar Singla",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "India",
    },
    {
      icon: GraduationCap,
      title: "Education",
      value: "B.Tech in Computer Science",
    },
    {
      icon: Cpu,
      title: "Specialization",
      value: "Artificial Intelligence & Machine Learning",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="section-viewport relative flex items-center justify-center overflow-hidden border-b border-border/50 bg-background py-16 px-4 sm:px-8"
    >
      {/* Background Watermark Typography */}
      <span className="pointer-events-none absolute top-[5%] left-[2%] z-0 select-none font-serif text-7xl font-bold uppercase tracking-widest text-[#C7A66B]/[0.03] sm:text-9xl md:text-[12rem] lg:text-[16rem]">
        ABOUT
      </span>

      {/* Floating Blurred Ambient Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/12 z-0 size-72 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/12 z-0 size-80 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Centered Translucent Ice Glass Container */}
      <div
        ref={containerRef}
        data-about-reveal="container"
        className="relative z-10 w-[94%] max-w-6xl rounded-[32px] border border-[#C7A66B]/15 bg-[#0d0d0d]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-10 md:p-12 lg:w-[88%]"
      >
        {/* Main Grid: Left Photo (40%) + Right Info (60%) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Portrait Thumbnail & Titles */}
          <div
            data-about-reveal="photo"
            className="flex flex-col items-center justify-center lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-2xl border border-[#C7A66B]/20 shadow-[0_0_30px_rgba(199,166,107,0.15)] sm:max-w-[17rem]">
              <Image
                src="/images/hero.png"
                alt="Shivam Kumar Singla"
                fill
                sizes="(max-width: 640px) 240px, 280px"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg font-medium text-[#F5F3EF]">
                Shivam Kumar Singla
              </h3>
              <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary/90">
                AI&ML Engineer /// Full Stack Developer
              </p>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <header data-about-reveal="heading">
              <div className="flex items-center gap-2">
                <span className="h-px w-4 bg-primary/60" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
                  ABOUT ME
                </span>
              </div>

              <h2
                id="about-heading"
                className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
              >
                Architecting{" "}
                <span className="font-normal italic text-primary">Intelligent</span>{" "}
                Futures
              </h2>

              <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
                Passionate AI engineer and full-stack technologist dedicated to crafting
                high-performance digital products, neural architectures, and refined user
                experiences.
              </p>
            </header>

            {/* 4 Info Blocks */}
            <div
              data-about-reveal="info"
              className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2"
            >
              {infoBlocks.map((block) => {
                const IconComp = block.icon;
                return (
                  <div
                    key={block.title}
                    className="flex items-center gap-3.5 rounded-xl border border-border/50 bg-background/40 p-3.5 backdrop-blur-sm transition-colors hover:border-primary/40"
                  >
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <IconComp className="size-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                        {block.title}
                      </div>
                      <div className="text-xs font-medium text-[#F5F3EF]">
                        {block.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Philosophy Paragraph */}
            <div
              data-about-reveal="paragraph"
              className="mt-6 border-t border-border/40 pt-4 font-light leading-relaxed text-muted-foreground/80 text-xs sm:text-sm"
            >
              I believe the best software lives at the intersection of mathematical
              elegance, robust architecture, and human intuition. My mission is to build
              intelligent AI-driven applications that simplify complexity while delivering
              flawless aesthetics.
            </div>
          </div>
        </div>

        {/* Bottom Row: 4 Statistic Cards */}
        <div
          data-about-reveal="stats"
          className="mt-8 grid grid-cols-2 gap-4 border-t border-border/40 pt-6 md:grid-cols-4 sm:gap-6"
        >
          <StatCounter
            numericValue={20}
            suffix="+"
            label="Projects Delivered"
            isRevealed={isRevealed}
          />
          <StatCounter
            numericValue={3}
            suffix="+"
            label="Years Exp"
            isRevealed={isRevealed}
          />
          <StatCounter
            numericValue={15}
            suffix="+"
            label="Tech Stack"
            isRevealed={isRevealed}
          />
          <StatCounter
            numericValue={5}
            suffix="+"
            label="AI Models"
            isRevealed={isRevealed}
          />
        </div>
      </div>
    </section>
  );
}
