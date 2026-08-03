"use client";

import { useEffect, useRef } from "react";
import { Award, BookOpen, Briefcase, Trophy } from "lucide-react";

import { useGsap } from "@/hooks/use-gsap";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";

type CertificateCard = {
  id: string;
  num: string;
  title: string;
  org: string;
  status: string;
  statusColor?: "emerald" | "amber" | "primary";
  icon: React.ElementType;
  description: string;
};

const CERTIFICATES: CertificateCard[] = [
  {
    id: "cert-1",
    num: "01",
    title: "AI Agent Architecture",
    org: "IBM SkillsBuild",
    status: "VERIFIED CREDENTIAL",
    statusColor: "primary",
    icon: Award,
    description:
      "Specialized domain certification in autonomous AI agents, multi-agent orchestrations, tool invocation patterns, and LLM architecture.",
  },
  {
    id: "cert-2",
    num: "02",
    title: "Machine Learning Internship",
    org: "YBI Foundation",
    status: "COMPLETED",
    statusColor: "emerald",
    icon: Briefcase,
    description:
      "Hands-on internship certificate focusing on real-world ML workflows, data preprocessing, feature engineering, and model evaluation.",
  },
  {
    id: "cert-3",
    num: "03",
    title: "Research Publication",
    org: "ICNGWCET 2026",
    status: "ACCEPTED WITH REVISIONS",
    statusColor: "amber",
    icon: BookOpen,
    description:
      'Author of "AI Skill Gap Analyzer for Students: A Machine Learning-Based Framework for Career Readiness Enhancement" presented at ICNGWCET 2026.',
  },
  {
    id: "cert-4",
    num: "04",
    title: "Leadership & Innovation",
    org: "Samsung Innovation Campus / SAITM",
    status: "HACKATHON & LEADERSHIP",
    statusColor: "emerald",
    icon: Trophy,
    description:
      "Samsung Innovation Campus Hackathon participant & Class Representative for the AI & ML Department managing academic leadership and student mentoring.",
  },
];

export function CertificatesSection() {
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

    const header = scope.querySelector('[data-certs-reveal="header"]');
    const cards = scope.querySelectorAll('[data-certs-reveal="card"]');
    const watermarks = scope.querySelectorAll('[data-certs-reveal="watermark"]');

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
      id="certificates"
      aria-labelledby="certificates-heading"
      className="section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* Background Watermark Typography */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <span
          data-certs-reveal="watermark"
          className="absolute top-[3%] left-[2%] font-serif text-7xl font-bold uppercase tracking-widest text-[#C7A66B]/[0.025] sm:text-9xl md:text-[12rem] lg:text-[16rem]"
        >
          RECOGNITION
        </span>
        <span
          data-certs-reveal="watermark"
          className="absolute top-[42%] right-[3%] hidden font-mono text-xs tracking-[0.4em] uppercase text-[#C7A66B]/[0.025] lg:block [writing-mode:vertical-rl]"
        >
          ACCREDITATIONS /// RESEARCH /// LEADERSHIP
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
        <header data-certs-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              ACCREDITATIONS & IMPACT
            </span>
          </div>

          <h2
            id="certificates-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            Recognition earned through continuous learning and real-world execution.
          </p>
        </header>

        {/* 2 x 2 Premium Achievement Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
          {CERTIFICATES.map((item) => {
            const CertIcon = item.icon;
            return (
              <article
                key={item.id}
                data-certs-reveal="card"
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
                    {/* Top Row: Icon & Status Badge */}
                    <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-5">
                      <div className="grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                        <CertIcon className="size-6" />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest ${
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

                    {/* Title */}
                    <h3 className="mt-5 font-serif text-2xl font-medium tracking-tight text-[#F5F3EF] transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                      {item.title}
                    </h3>

                    {/* Organization */}
                    <div className="mt-1.5 font-mono text-xs font-medium text-primary/90">
                      {item.org}
                    </div>

                    {/* Description */}
                    <p className="mt-3.5 font-light leading-relaxed text-muted-foreground/90 text-xs sm:text-sm">
                      {item.description}
                    </p>
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
