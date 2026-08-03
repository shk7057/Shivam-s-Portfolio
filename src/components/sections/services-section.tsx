"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BarChart3, Code2, Layers, Sparkles } from "lucide-react";

import { useGsap } from "@/hooks/use-gsap";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";

type ServiceItem = {
  id: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
};

const SERVICES: ServiceItem[] = [
  {
    id: "service-1",
    num: "01",
    title: "AI Applications",
    description:
      "Design and develop intelligent applications powered by machine learning, LLMs, RAG pipelines, AI agents and automation.",
    tags: ["Machine Learning", "LLMs", "RAG", "AI Agents"],
    icon: Sparkles,
  },
  {
    id: "service-2",
    num: "02",
    title: "Modern Web Development",
    description:
      "Build scalable, responsive and high-performance web applications using modern frontend and backend technologies.",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
    icon: Code2,
  },
  {
    id: "service-3",
    num: "03",
    title: "Data Analytics & Dashboards",
    description:
      "Transform raw data into interactive dashboards, business insights and decision-support systems.",
    tags: ["Power BI", "Tableau", "Python", "SQL"],
    icon: BarChart3,
  },
  {
    id: "service-4",
    num: "04",
    title: "UI Engineering",
    description:
      "Craft premium interfaces with smooth animations, clean architecture and exceptional user experience.",
    tags: ["Responsive UI", "Performance", "Animation", "Accessibility"],
    icon: Layers,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { gsap } = useGsap();
  const cleanupScrollTriggers = useScrollTriggerCleanup(sectionRef);

  useEffect(() => {
    const scope = sectionRef.current;
    const container = containerRef.current;
    if (!scope || !container) return;

    cleanupScrollTriggers();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    const header = scope.querySelector('[data-services-reveal="header"]');
    const cards = scope.querySelectorAll('[data-services-reveal="card"]');
    const watermarks = scope.querySelectorAll('[data-services-reveal="watermark"]');

    gsap.set(container, { opacity: 0, y: 30 });
    if (header) gsap.set(header, { opacity: 0, y: 15 });
    if (cards.length > 0) gsap.set(cards, { opacity: 0, y: 25, scale: 0.98 });
    if (watermarks.length > 0) gsap.set(watermarks, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(container, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(header, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .to(watermarks, { opacity: 1, duration: 0.8 }, "-=0.4");

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

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* Background Watermark Typography */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <span
          data-services-reveal="watermark"
          className="absolute top-[3%] left-[2%] font-serif text-7xl font-bold uppercase tracking-widest text-[#C7A66B]/[0.025] sm:text-9xl md:text-[12rem] lg:text-[16rem]"
        >
          BUILD
        </span>
        <span
          data-services-reveal="watermark"
          className="absolute top-[42%] right-[3%] hidden font-mono text-xs tracking-[0.4em] uppercase text-[#C7A66B]/[0.025] lg:block [writing-mode:vertical-rl]"
        >
          CREATE /// ENGINEER /// AI
        </span>
        <span
          data-services-reveal="watermark"
          className="absolute bottom-[-2%] left-[3%] font-serif text-7xl font-black tracking-[0.2em] uppercase text-[#C7A66B]/[0.025] sm:text-9xl lg:text-[12rem]"
        >
          ENGINEER
        </span>
      </div>

      {/* Floating Ambient Gold Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 z-0 size-80 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/4 z-0 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10"
      >
        {/* Section Header */}
        <header data-services-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              CAPABILITIES & IMPACT
            </span>
          </div>

          <h2
            id="services-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            SERVICES
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            Building intelligent digital products that combine AI, engineering, and exceptional
            user experience.
          </p>
        </header>

        {/* 2 x 2 Premium Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
          {SERVICES.map((item) => {
            const ServiceIcon = item.icon;
            return (
              <article
                key={item.id}
                data-services-reveal="card"
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#C7A66B]/15 bg-[#0d0d0d]/80 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#C7A66B]/40 hover:shadow-[0_0_30px_rgba(199,166,107,0.18)] sm:p-8"
              >
                {/* Large Card Background Watermark Number */}
                <span className="pointer-events-none absolute right-6 top-3 z-0 select-none font-serif text-7xl font-bold text-[#C7A66B]/[0.03] transition-opacity duration-300 group-hover:opacity-10 sm:text-8xl">
                  {item.num}
                </span>

                {/* Glass Reflection Highlight on Hover */}
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row: Service Icon & Top-Right Arrow */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-5">
                      <div className="grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                        <ServiceIcon className="size-6" />
                      </div>

                      <div className="grid size-9 place-items-center rounded-full border border-border/60 bg-background/50 text-muted-foreground/60 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="mt-5 font-serif text-2xl font-medium tracking-tight text-[#F5F3EF] transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 font-light leading-relaxed text-muted-foreground/90 text-xs sm:text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* Technology Tags / Chips */}
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-border/40 pt-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/60 bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground/90 transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
