"use client";

import { useEffect, useRef } from "react";
import {
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  Layers,
  Sparkles,
  Wrench,
} from "lucide-react";

import { useGsap } from "@/hooks/use-gsap";
import { useScrollTriggerCleanup } from "@/hooks/use-scroll-trigger-cleanup";

type SkillCategory = {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: string[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    icon: Code2,
    skills: [
      "Python",
      "SQL",
      "Java",
      "C++",
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "React.js",
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Regression",
      "Classification",
      "Clustering",
      "Neural Networks",
      "CNN",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics & BI",
    icon: BarChart3,
    skills: [
      "Power BI",
      "Tableau",
      "MS Excel",
      "EDA",
      "Data Preprocessing",
      "Statistical Analysis",
      "Data Visualization",
    ],
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    icon: Sparkles,
    skills: [
      "LLMs",
      "Prompt Engineering",
      "AI Agents",
      "RAG",
      "Vector Databases",
      "Function Calling",
    ],
  },
  {
    id: "libraries-frameworks",
    title: "Libraries & Frameworks",
    icon: Layers,
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "Matplotlib",
      "Seaborn",
      "FastAPI",
    ],
  },
  {
    id: "databases-cloud-apis",
    title: "Databases, Cloud & APIs",
    icon: Database,
    skills: [
      "MySQL",
      "MS SQL Server",
      "MongoDB",
      "Firebase",
      "Supabase",
      "Gemini API",
      "OpenAI API",
      "REST APIs",
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Google Colab",
    ],
  },
];

function TechBadgeIcon({ name }: { name: string }) {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-md border border-primary/30 bg-primary/10 text-[10px] font-mono font-bold text-primary transition-transform duration-300 group-hover:scale-110">
      {name.substring(0, 2).toUpperCase()}
    </span>
  );
}

export function SkillsSection() {
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

    const header = scope.querySelector('[data-skills-reveal="header"]');
    const panels = scope.querySelectorAll('[data-skills-reveal="panel"]');
    const watermarks = scope.querySelectorAll('[data-skills-reveal="watermark"]');

    gsap.set(container, { opacity: 0, y: 30 });
    if (header) gsap.set(header, { opacity: 0, y: 15 });
    if (panels.length > 0) gsap.set(panels, { opacity: 0, y: 20, scale: 0.98 });
    if (watermarks.length > 0) gsap.set(watermarks, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(container, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(header, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(
        panels,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(watermarks, { opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.4");

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
      id="skills"
      aria-labelledby="skills-heading"
      className="section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* Background Floating Technology Watermark Words (Subtle 2.5% opacity) */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <span
          data-skills-reveal="watermark"
          className="absolute top-[4%] left-[2%] font-serif text-6xl font-extralight tracking-[0.25em] uppercase text-[#C7A66B]/[0.03] sm:text-8xl lg:text-[10rem]"
        >
          GENERATIVE AI
        </span>
        <span
          data-skills-reveal="watermark"
          className="absolute top-[45%] right-[2%] hidden font-mono text-xs tracking-[0.4em] uppercase text-[#C7A66B]/[0.03] lg:block [writing-mode:vertical-rl]"
        >
          MACHINE LEARNING /// PYTHON /// REACT
        </span>
        <span
          data-skills-reveal="watermark"
          className="absolute bottom-[-1%] left-[3%] font-serif text-7xl font-black tracking-[0.2em] uppercase text-[#C7A66B]/[0.03] sm:text-9xl lg:text-[12rem]"
        >
          DATA SCIENCE
        </span>
      </div>

      {/* Floating Ambient Gold Light Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 z-0 size-80 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/3 right-1/4 z-0 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Main Section Content Wrapper */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10"
      >
        {/* Section Header */}
        <header data-skills-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              TECHNICAL SHOWCASE
            </span>
          </div>

          <h2
            id="skills-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            SKILLS
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            Building intelligent digital experiences through software engineering, artificial
            intelligence, and data-driven solutions.
          </p>
        </header>

        {/* 7 Premium Glass Panels Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {SKILL_CATEGORIES.map((cat) => {
            const CategoryIcon = cat.icon;
            return (
              <div
                key={cat.id}
                data-skills-reveal="panel"
                className="group relative flex flex-col justify-between rounded-[24px] border border-[#C7A66B]/15 bg-[#0d0d0d]/75 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-[#C7A66B]/40 hover:shadow-[0_0_25px_rgba(199,166,107,0.15)] sm:p-6"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                        <CategoryIcon className="size-4" />
                      </div>
                      <h3 className="font-serif text-base font-medium tracking-tight text-[#F5F3EF] sm:text-lg">
                        {cat.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-border/60 bg-background/50 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground/80">
                      {cat.skills.length}
                    </span>
                  </div>

                  {/* Skills Chips Flex Grid */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="group/chip flex cursor-default items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-all duration-300 hover:scale-[1.02] hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5"
                      >
                        <TechBadgeIcon name={skill} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
