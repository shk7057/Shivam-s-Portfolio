"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { EditorialBackgroundTypography } from "@/components/ui/editorial-background-typography";
import { HeroAmbientGlow } from "@/components/ui/hero-ambient-glow";
import { HeroDepthEngine } from "@/components/ui/hero-depth-engine";
import { HeroParticles } from "@/components/ui/hero-particles";
import { useHeroRevealTimeline } from "@/hooks/use-hero-reveal-timeline";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function HomeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useHeroRevealTimeline(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="home-heading"
      className="section-viewport relative overflow-hidden border-b border-border/50 bg-background"
    >
      {/* 1. Global Hero Ambient Light */}
      <HeroAmbientGlow containerRef={sectionRef} />

      {/* 2. Soft Upper-Left Studio Gold Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[65vw] h-[65vh] z-[1] bg-[radial-gradient(circle_at_15%_15%,rgba(199,166,107,0.12)_0%,rgba(199,166,107,0.025)_45%,transparent_70%)] select-none"
      />

      {/* 3. Subtle Floating Dust Particles */}
      <HeroParticles data-reveal="hero-particles" />

      {/* 4. Refined Background Watermark Typography */}
      <EditorialBackgroundTypography data-reveal="hero-typography" className="z-[2]" />

      {/* 5. Cinematic Edge Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)] select-none"
      />

      {/* Right Edge Vertical Tagline */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
        <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-muted-foreground/25 [writing-mode:vertical-rl] rotate-180">
          FULL STACK DEVELOPER
        </span>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-16 xl:px-24">
        {/* Top / Center Section Grid */}
        <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_minmax(18rem,32rem)_1fr] lg:grid-cols-[1.2fr_minmax(24rem,38rem)_1fr] xl:grid-cols-[1.2fr_minmax(28rem,44rem)_1fr]">
          
          {/* Left Column: Hero Identity Block & Heading */}
          <header data-reveal="hero-header" className="flex flex-col items-start self-center">
            {/* Hero Identity Block */}
            <div className="flex flex-col items-start mb-3">
              {/* Greeting */}
              <div data-reveal="hero-greeting" className="flex items-center gap-2 mb-1">
                <span className="h-px w-4 bg-primary/70" />
                <span className="text-xs sm:text-sm font-mono tracking-widest text-primary/90 font-light">
                  Hello, I&apos;m
                </span>
              </div>

              {/* Large Serif Name "Shivam" & Overlapping Self-Drawing Signature */}
              <div className="relative inline-block mt-0.5">
                <span
                  data-reveal="hero-name"
                  className="block font-serif text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#F5F3EF] tracking-tight leading-[0.92] select-none"
                >
                  Shivam
                </span>

                {/* Overlapping Self-Drawing Golden Signature "Kumar Singla" */}
                <div
                  data-reveal="hero-signature"
                  className="absolute -bottom-2 -right-6 sm:-bottom-3 sm:-right-10 w-36 sm:w-44 md:w-52 z-10 pointer-events-none -rotate-2 origin-bottom-left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-auto text-primary filter drop-shadow-[0_2px_10px_rgba(199,166,107,0.4)] opacity-95"
                  >
                    <path
                      data-signature-path
                      d="M30 75 C 50 20, 70 20, 85 65 C 95 95, 110 30, 130 50 C 145 65, 160 55, 175 45 C 190 35, 205 60, 220 70 C 230 75, 240 60, 255 50 C 270 40, 290 80, 310 60 C 325 45, 340 70, 370 55"
                    />
                    <path
                      data-signature-path
                      d="M70 85 C 120 95, 200 90, 330 75"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* AI Engineer Badge */}
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary/80 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary/90 font-medium">
                AI ENGINEER
              </span>
            </div>

            {/* Heading */}
            <h1
              id="home-heading"
              className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium uppercase text-foreground leading-[1.1] tracking-tight"
            >
              Crafting Digital{" "}
              <span className="font-serif italic font-normal text-primary/90 block sm:inline-block sm:ml-2 capitalize tracking-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Solutions
              </span>
            </h1>

            <p className="mt-3.5 max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground/90 font-light tracking-wide">
              Engineering intelligent systems and high-craft digital experiences at the intersection of artificial intelligence, modern code, and human-centered design.
            </p>

            {/* Premium CTA Button Container */}
            <div className="mt-6 sm:mt-7 flex items-center gap-4">
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-3 rounded-full border border-primary/40 bg-background/40 px-6 py-3 text-xs font-medium uppercase tracking-widest text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-primary/80 hover:bg-primary/10 hover:shadow-[0_0_25px_rgba(199,166,107,0.25)] active:scale-[0.98]"
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          {/* Center Column: Hero Portrait */}
          <figure
            data-reveal="hero-portrait"
            aria-label="Hero portrait"
            className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] sm:max-w-[19rem] md:max-w-none"
          >
            <HeroDepthEngine
              src="/images/hero.png"
              alt="Official portrait"
              priority
              sizes="(max-width: 640px) 224px, (max-width: 768px) 304px, (max-width: 1024px) 480px, (max-width: 1280px) 600px, 720px"
            />
          </figure>

          {/* Right Column: About Me & Golden Signature */}
          <aside
            data-reveal="hero-about"
            aria-labelledby="home-about-preview-heading"
            className="max-w-xs flex flex-col justify-center self-center md:justify-self-end"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-primary/40" />
              <h2
                id="home-about-preview-heading"
                className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground/90 font-medium"
              >
                ABOUT ME
              </h2>
            </div>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground/80 font-light">
              Full-stack technologist focused on creating responsive web architectures, autonomous AI agents, and intuitive user interfaces built with precision.
            </p>

            {/* Golden Handwritten Signature */}
            <div className="mt-4 w-32 sm:w-40 opacity-85 hover:opacity-100 transition-opacity">
              <Image
                src="/signature/signature.svg"
                alt="Golden signature"
                width={170}
                height={50}
                className="w-full h-auto text-primary filter drop-shadow-[0_0_8px_rgba(199,166,107,0.3)]"
              />
            </div>
          </aside>
        </div>

        {/* Dedicated Bottom Controls Bar Container */}
        <div
          data-reveal="hero-cta"
          className="mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/40 pt-5 pb-1"
        >
          {/* Scroll To Explore Indicator */}
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground/75 select-none">
            <div className="relative flex items-center justify-center size-2.5">
              <span className="absolute size-2.5 rounded-full bg-primary/40 animate-ping" />
              <span className="relative size-1.5 rounded-full bg-primary" />
            </div>
            <span className="h-px w-6 bg-border/80 shrink-0" />
            <span className="whitespace-nowrap">SCROLL TO EXPLORE</span>
          </div>

          {/* Social Icons & Page Counter */}
          <div className="flex items-center gap-6 self-start sm:self-auto">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="size-8 sm:size-9 rounded-md border border-border/80 bg-background/50 text-muted-foreground hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5 grid place-items-center"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="size-8 sm:size-9 rounded-md border border-border/80 bg-background/50 text-muted-foreground hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5 grid place-items-center"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="size-8 sm:size-9 rounded-md border border-border/80 bg-background/50 text-muted-foreground hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5 grid place-items-center"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href="mailto:contact@example.com"
                aria-label="Send Email"
                className="size-8 sm:size-9 rounded-md border border-border/80 bg-background/50 text-muted-foreground hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5 grid place-items-center"
              >
                <Mail className="size-4" />
              </a>
            </div>

            {/* Divider */}
            <div className="h-4 w-px bg-border/60" />

            {/* Page Counter */}
            <div className="flex items-baseline gap-1 font-mono text-xs text-muted-foreground/70">
              <span className="font-semibold text-primary">01</span>
              <span className="text-muted-foreground/30">/</span>
              <span className="text-muted-foreground/50">08</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
