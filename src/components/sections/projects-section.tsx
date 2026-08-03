"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, FileText } from "lucide-react";

import { useGsap } from "@/hooks/use-gsap";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type Project = {
  num: string;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "AI Resume Analyzer & Job Match Portal",
    category: "AI & FULL STACK",
    status: "FEATURED",
    description:
      "An AI-powered platform that analyzes resumes, extracts technical skills using NLP, scores candidate profiles and recommends relevant jobs with personalized career insights.",
    technologies: [
      "React.js",
      "Next.js",
      "FastAPI",
      "Python",
      "MongoDB",
      "TF-IDF",
      "NLP",
      "Machine Learning",
    ],
    links: {
      demo: "https://github.com",
      github: "https://github.com",
      caseStudy: "#projects",
    },
  },
  {
    num: "02",
    title: "SkillPath AI",
    category: "CAREER & AI",
    status: "FEATURED",
    description:
      "An intelligent career roadmap platform that evaluates student skills and generates personalized learning paths using AI-powered recommendations.",
    technologies: ["Next.js", "Supabase", "AI", "React", "TypeScript"],
    links: {
      demo: "https://github.com",
      github: "https://github.com",
      caseStudy: "#projects",
    },
  },
  {
    num: "03",
    title: "EcoLearn AI",
    category: "SAMSUNG HACKATHON WINNER",
    status: "FEATURED",
    description:
      "An AI-based educational platform developed for the Samsung Innovation Campus Hackathon, focused on interactive environmental learning and sustainability awareness.",
    technologies: ["AI", "React", "Machine Learning", "Firebase"],
    links: {
      demo: "https://github.com",
      github: "https://github.com",
      caseStudy: "#projects",
    },
  },
];

export function ProjectsSection() {
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

    const header = scope.querySelector('[data-projects-reveal="header"]');
    const cards = scope.querySelectorAll('[data-projects-reveal="card"]');
    const watermarks = scope.querySelectorAll('[data-projects-reveal="watermark"]');

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
          stagger: 0.12,
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
      id="projects"
      aria-labelledby="projects-heading"
      className="section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* Background Watermark Typography */}
      <span
        data-projects-reveal="watermark"
        className="pointer-events-none absolute top-[4%] left-[2%] z-0 select-none font-serif text-7xl font-bold uppercase tracking-widest text-[#C7A66B]/[0.03] sm:text-9xl md:text-[12rem] lg:text-[16rem]"
      >
        PROJECTS
      </span>

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
        <header data-projects-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              SELECTED WORK
            </span>
          </div>

          <h2
            id="projects-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            PROJECTS
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            Selected work showcasing AI, full-stack engineering, and intelligent product design.
          </p>
        </header>

        {/* 3 Premium Project Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {PROJECTS.map((proj) => (
            <article
              key={proj.num}
              data-projects-reveal="card"
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#C7A66B]/15 bg-[#0d0d0d]/80 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#C7A66B]/40 hover:shadow-[0_0_30px_rgba(199,166,107,0.2)] sm:p-8"
            >
              {/* Large Card Background Watermark Number (2% Opacity) */}
              <span className="pointer-events-none absolute right-4 top-2 z-0 select-none font-serif text-8xl font-bold text-[#C7A66B]/[0.03] transition-opacity duration-300 group-hover:opacity-10 sm:text-9xl">
                {proj.num}
              </span>

              {/* Glass Reflection Highlight on Hover */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Top Badges: Category & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] font-medium tracking-widest text-primary uppercase">
                      {proj.category}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-medium tracking-widest text-emerald-400/90 uppercase">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {proj.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="mt-4 font-serif text-2xl font-medium tracking-tight text-[#F5F3EF] transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {proj.title}
                  </h3>

                  {/* Project Description */}
                  <p className="mt-3 font-light leading-relaxed text-muted-foreground/90 text-xs sm:text-sm">
                    {proj.description}
                  </p>

                  {/* Technology Chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/90 transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons Footer */}
                <div className="mt-8 flex items-center gap-3 border-t border-border/40 pt-5">
                  {proj.links.demo ? (
                    <a
                      href={proj.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-[11px] font-medium tracking-wider text-foreground uppercase transition-all duration-300 hover:border-primary/80 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(199,166,107,0.25)] active:scale-95"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="size-3.5 text-primary transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border/40 bg-background/30 px-4 py-2 font-mono text-[11px] text-muted-foreground/50 opacity-50 uppercase">
                      Live Demo
                    </span>
                  )}

                  {proj.links.github ? (
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-4 py-2 font-mono text-[11px] font-medium tracking-wider text-muted-foreground/90 uppercase transition-all duration-300 hover:border-primary/50 hover:text-primary active:scale-95"
                    >
                      <GithubIcon className="size-3.5" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <span className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border/40 bg-background/30 px-4 py-2 font-mono text-[11px] text-muted-foreground/50 opacity-50 uppercase">
                      GitHub
                    </span>
                  )}

                  {proj.links.caseStudy ? (
                    <a
                      href={proj.links.caseStudy}
                      className="group/btn hidden items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-3.5 py-2 font-mono text-[11px] font-medium tracking-wider text-muted-foreground/90 uppercase transition-all duration-300 hover:border-primary/50 hover:text-primary sm:flex active:scale-95"
                    >
                      <FileText className="size-3.5" />
                      <span>Case Study</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
