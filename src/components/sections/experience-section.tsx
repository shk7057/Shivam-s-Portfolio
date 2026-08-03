"use client";

import { useEffect, useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";

import { useGsap } from "@/hooks/use-gsap";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";

type ExperienceCard = {
  id: string;
  duration: string;
  position: string;
  org: string;
  status: string;
  statusColor?: "emerald" | "amber" | "primary";
  icon: React.ElementType;
  description: string;
  skills: string[];
};

const EXPERIENCES: ExperienceCard[] = [
  {
    id: "exp-1",
    duration: "2024 — PRESENT",
    position: "Machine Learning Intern",
    org: "YBI Foundation",
    status: "INTERNSHIP",
    statusColor: "emerald",
    icon: Briefcase,
    description:
      "Worked on practical Machine Learning workflows including data preprocessing, model training, evaluation metrics, feature engineering, and deployment concepts.",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
  },
  {
    id: "exp-2",
    duration: "2022 — 2026",
    position: "B.Tech — Artificial Intelligence & Machine Learning",
    org: "St. Andrews Institute of Technology & Management",
    status: "CURRENTLY PURSUING",
    statusColor: "primary",
    icon: GraduationCap,
    description:
      "Building deep technical foundations across AI engineering, software development algorithms, data structures, machine learning architectures, and full stack web development.",
    skills: [
      "AI Engineering",
      "Software Development",
      "Data Structures",
      "Machine Learning",
      "Full Stack Development",
    ],
  },
  {
    id: "exp-3",
    duration: "2023 — PRESENT",
    position: "Class Representative",
    org: "AI & ML Department",
    status: "LEADERSHIP",
    statusColor: "amber",
    icon: Users,
    description:
      "Represented the class, coordinated with faculty and students, and managed academic communication, student mentoring, event coordination, and departmental leadership responsibilities.",
    skills: [
      "Leadership",
      "Academic Coordination",
      "Team Mentoring",
      "Communication",
    ],
  },
];

export function ExperienceSection() {
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

    const header = scope.querySelector('[data-exp-reveal="header"]');
    const line = scope.querySelector('[data-exp-reveal="line"]');
    const cards = scope.querySelectorAll('[data-exp-reveal="card"]');
    const watermarks = scope.querySelectorAll('[data-exp-reveal="watermark"]');

    gsap.set(container, { opacity: 0, y: 30 });
    if (header) gsap.set(header, { opacity: 0, y: 15 });
    if (line) gsap.set(line, { opacity: 0, scaleY: 0 });
    if (cards.length > 0) gsap.set(cards, { opacity: 0, y: 25, scale: 0.98 });
    if (watermarks.length > 0) gsap.set(watermarks, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(container, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(header, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(line, { opacity: 1, scaleY: 1, duration: 0.8, ease: "power2.out" }, "-=0.2")
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.6",
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
      id="experience"
      aria-labelledby="experience-heading"
      className="section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* Background Watermark Typography */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <span
          data-exp-reveal="watermark"
          className="absolute top-[3%] left-[2%] font-serif text-7xl font-bold uppercase tracking-widest text-[#C7A66B]/[0.025] sm:text-9xl md:text-[12rem] lg:text-[16rem]"
        >
          EXPERIENCE
        </span>
        <span
          data-exp-reveal="watermark"
          className="absolute top-[40%] right-[3%] hidden font-mono text-xs tracking-[0.4em] uppercase text-[#C7A66B]/[0.025] lg:block [writing-mode:vertical-rl]"
        >
          LEADERSHIP /// ENGINEERING /// INNOVATION
        </span>
      </div>

      {/* Ambient Gold Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/3 z-0 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10"
      >
        {/* Section Header */}
        <header data-exp-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              PROFESSIONAL JOURNEY
            </span>
          </div>

          <h2
            id="experience-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            EXPERIENCE
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            Transforming ideas into intelligent digital products through continuous learning and
            real-world execution.
          </p>
        </header>

        {/* Timeline Container */}
        <div className="relative mt-4">
          {/* Central Vertical Gold Timeline Line (Desktop) */}
          <div
            data-exp-reveal="line"
            className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 origin-top bg-gradient-to-b from-primary/70 via-primary/30 to-primary/70 lg:block"
          />

          {/* Left Vertical Gold Timeline Line (Mobile/Tablet) */}
          <div
            data-exp-reveal="line"
            className="absolute left-4 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-primary/70 via-primary/30 to-primary/70 sm:left-6 lg:hidden"
          />

          {/* Experience Cards Vertical List */}
          <div className="flex flex-col gap-8 sm:gap-12">
            {EXPERIENCES.map((item, idx) => {
              const IconComp = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  data-exp-reveal="card"
                  className="relative grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center"
                >
                  {/* Connector Pulsing Node */}
                  <div className="absolute left-4 top-6 z-20 size-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_12px_rgba(199,166,107,0.6)] sm:left-6 lg:left-1/2" />

                  {/* Card Content (Alternating Left/Right on Desktop) */}
                  <div
                    className={`pl-10 sm:pl-12 lg:pl-0 ${
                      isEven
                        ? "lg:col-span-5 lg:col-start-1 lg:text-right"
                        : "lg:col-span-5 lg:col-start-7 lg:text-left"
                    }`}
                  >
                    <article className="group relative overflow-hidden rounded-[24px] border border-[#C7A66B]/15 bg-[#0d0d0d]/80 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C7A66B]/40 hover:shadow-[0_0_25px_rgba(199,166,107,0.15)] sm:p-7">
                      {/* Glass Reflection Highlight on Hover */}
                      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative z-10">
                        {/* Top Row: Duration & Status Badge */}
                        <div
                          className={`flex flex-wrap items-center gap-2 ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          <span className="font-mono text-xs font-semibold tracking-wider text-primary">
                            {item.duration}
                          </span>

                          <span
                            className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest ${
                              item.statusColor === "emerald"
                                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : item.statusColor === "amber"
                                ? "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                                : "border border-primary/30 bg-primary/10 text-primary"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        {/* Position Title & Organization */}
                        <div
                          className={`mt-4 flex items-center gap-3 ${
                            isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                          }`}
                        >
                          <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                            <IconComp className="size-4" />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl font-medium tracking-tight text-[#F5F3EF] sm:text-2xl">
                              {item.position}
                            </h3>
                            <div className="font-mono text-xs text-muted-foreground/80">
                              {item.org}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-3 font-light leading-relaxed text-muted-foreground/90 text-xs sm:text-sm">
                          {item.description}
                        </p>

                        {/* Technology Chips */}
                        <div
                          className={`mt-5 flex flex-wrap gap-2 ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/90 transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
