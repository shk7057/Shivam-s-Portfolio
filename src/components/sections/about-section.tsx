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
  const { gsap } = useGsap();
  const cleanupScrollTriggers = useScrollTriggerCleanup(sectionRef);

  const [statsRevealed, setStatsRevealed] = useState(false);

  useEffect(() => {
    const scope = sectionRef.current;
    const container = containerRef.current;
    if (!scope || !container) return;

    cleanupScrollTriggers();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(container, { opacity: 1, y: 0 });
      setStatsRevealed(true);
      return;
    }

    const header = scope.querySelector('[data-about-reveal="header"]');
    const glassBox = scope.querySelector('[data-about-reveal="container"]');
    const photo = scope.querySelector('[data-about-reveal="photo"]');
    const content = scope.querySelector('[data-about-reveal="content"]');
    const stats = scope.querySelectorAll('[data-about-reveal="stat"]');

    gsap.set(container, { opacity: 0, y: 30 });
    if (header) gsap.set(header, { opacity: 0, y: 15 });
    if (glassBox) gsap.set(glassBox, { opacity: 0, y: 20, scale: 0.98 });
    if (photo) gsap.set(photo, { opacity: 0, x: -20 });
    if (content) gsap.set(content, { opacity: 0, x: 20 });
    if (stats.length > 0) gsap.set(stats, { opacity: 0, y: 15 });

    const tl = gsap.timeline({ paused: true });

    tl.to(container, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(header, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(glassBox, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .to(photo, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(content, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(
        stats,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          onStart: () => setStatsRevealed(true),
        },
        "-=0.2",
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

  const QUICK_STATS = [
    { label: "Projects Completed", numericValue: 12, suffix: "+" },
    { label: "AI Models Deployed", numericValue: 8, suffix: "+" },
    { label: "Research Papers", numericValue: 1, suffix: "" },
  ];

  const PERSONAL_INFO = [
    {
      icon: User,
      title: "Role",
      value: "AI & Full Stack Engineer",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Gurugram / Delhi NCR, India",
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
      className="section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] pb-16 px-6 sm:px-10 lg:px-16"
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

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10"
      >
        {/* Section Header */}
        <header data-about-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              ABOUT SHIVAM
            </span>
          </div>

          <h2
            id="about-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            BIOGRAPHY & PHILOSOPHY
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            AI Engineer & Full Stack Developer dedicated to building scalable, high-performance intelligent systems.
          </p>
        </header>

        {/* Centered Translucent Ice Glass Container */}
        <div
          data-about-reveal="container"
          className="w-full rounded-[32px] border border-[#C7A66B]/15 bg-[#0d0d0d]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-10 md:p-12"
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
            <div data-about-reveal="content" className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                Passionate AI Engineer and Full-Stack Developer with hands-on expertise in machine learning,
                natural language processing, and modern web architectures. Dedicated to building intelligent systems
                that seamlessly blend aesthetic beauty with robust technical execution.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PERSONAL_INFO.map((info) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={info.title}
                      className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-3.5"
                    >
                      <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                        <IconComponent className="size-4" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          {info.title}
                        </div>
                        <div className="mt-0.5 text-xs font-medium text-[#F5F3EF] sm:text-sm">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {QUICK_STATS.map((stat) => (
                  <div data-about-reveal="stat" key={stat.label}>
                    <StatCounter
                      numericValue={stat.numericValue}
                      suffix={stat.suffix}
                      label={stat.label}
                      isRevealed={statsRevealed}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
