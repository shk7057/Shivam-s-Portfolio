"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { Footer } from "@/components/layout/footer";
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

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const AVAILABILITY = ["AI Projects", "Freelance", "Research", "Internships"];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { gsap } = useGsap();
  const cleanupScrollTriggers = useScrollTriggerCleanup(sectionRef);

  const [copied, setCopied] = useState(false);
  const emailAddress = "shivam.singla.ai@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

    const header = scope.querySelector('[data-contact-reveal="header"]');
    const leftCol = scope.querySelector('[data-contact-reveal="left"]');
    const rightCol = scope.querySelector('[data-contact-reveal="right"]');
    const watermarks = scope.querySelectorAll('[data-contact-reveal="watermark"]');

    gsap.set(container, { opacity: 0, y: 30 });
    if (header) gsap.set(header, { opacity: 0, y: 15 });
    if (leftCol) gsap.set(leftCol, { opacity: 0, x: -25 });
    if (rightCol) gsap.set(rightCol, { opacity: 0, x: 25 });
    if (watermarks.length > 0) gsap.set(watermarks, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(container, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(header, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(leftCol, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .to(rightCol, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
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
      id="contact"
      aria-labelledby="contact-heading"
      className="section-viewport relative flex flex-col justify-between overflow-hidden border-b border-border/50 bg-background pt-[calc(var(--navbar-height)+2rem)] px-6 sm:px-10 lg:px-16"
    >
      {/* Background Watermark Typography */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <span
          data-contact-reveal="watermark"
          className="absolute top-[3%] left-[2%] font-serif text-7xl font-bold uppercase tracking-widest text-[#C7A66B]/[0.025] sm:text-9xl md:text-[12rem] lg:text-[16rem]"
        >
          CONNECT
        </span>
        <span
          data-contact-reveal="watermark"
          className="absolute top-[42%] right-[3%] hidden font-mono text-xs tracking-[0.4em] uppercase text-[#C7A66B]/[0.025] lg:block [writing-mode:vertical-rl]"
        >
          BUILD /// CREATE /// COLLABORATE
        </span>
      </div>

      {/* Subtle Animated Gold Ambient Light Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/3 z-0 size-96 rounded-full bg-primary/8 blur-3xl animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/3 right-1/3 z-0 size-80 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10 pb-12"
      >
        {/* Section Header */}
        <header data-contact-reveal="header" className="flex flex-col items-start max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-primary/60" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              LET&apos;S CONNECT
            </span>
          </div>

          <h2
            id="contact-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl"
          >
            LET&apos;S BUILD SOMETHING TOGETHER
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground/90 sm:text-sm">
            Whether it&apos;s AI, web applications or innovative ideas, I&apos;m always open to
            meaningful collaborations.
          </p>
        </header>

        {/* 2-Column Grid: Left CTA & Availability | Right Contact Details Card */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Availability Status & Large Editorial Statement */}
          <div data-contact-reveal="left" className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Availability Pulse Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN FOR COLLABORATION</span>
              </div>

              {/* Editorial Statement */}
              <h3 className="mt-6 font-serif text-3xl font-normal leading-tight text-[#F5F3EF] sm:text-4xl lg:text-5xl">
                Ready to transform intelligent concepts into{" "}
                <span className="font-serif italic font-normal text-primary">production reality.</span>
              </h3>

              <p className="mt-4 font-light leading-relaxed text-muted-foreground/90 text-xs sm:text-sm max-w-xl">
                I help teams and organizations design, build, and deploy machine learning models,
                AI applications, and high-performance web products.
              </p>
            </div>

            {/* Availability Chips Container */}
            <div className="mt-8">
              <div className="font-mono text-[11px] font-medium tracking-widest uppercase text-primary/90">
                OPEN FOR OPPORTUNITIES
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {AVAILABILITY.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-medium text-primary tracking-wider uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Card & Action Buttons */}
          <div data-contact-reveal="right" className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[28px] border border-[#C7A66B]/15 bg-[#0d0d0d]/80 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-8">
              {/* Glass Reflection Glow */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="border-b border-border/40 pb-4">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
                    CONTACT DETAILS
                  </span>
                  <h4 className="mt-1 font-serif text-2xl font-medium text-[#F5F3EF]">
                    Shivam Kumar Singla
                  </h4>
                </div>

                {/* Contact List Details */}
                <div className="flex flex-col gap-4 text-xs sm:text-sm">
                  {/* Email */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground/70">
                        Email Address
                      </div>
                      <a
                        href={`mailto:${emailAddress}`}
                        className="font-medium text-[#F5F3EF] transition-colors hover:text-primary"
                      >
                        {emailAddress}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground/70">
                        Phone / WhatsApp
                      </div>
                      <div className="font-medium text-[#F5F3EF]">+91 XXXXX XXXXX</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground/70">
                        Location
                      </div>
                      <div className="font-medium text-[#F5F3EF]">
                        Gurugram / Delhi NCR, India
                      </div>
                    </div>
                  </div>

                  {/* Social Profiles */}
                  <div className="flex items-center gap-3.5 pt-1">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
                    >
                      <GithubIcon className="size-3.5" />
                      <span>GitHub</span>
                      <ArrowUpRight className="size-3 text-primary transition-transform group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5" />
                    </a>

                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
                    >
                      <LinkedinIcon className="size-3.5" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="size-3 text-primary transition-transform group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/40 pt-5">
                  {/* Direct Mail CTA */}
                  <a
                    href={`mailto:${emailAddress}`}
                    className="group/btn flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-background transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(199,166,107,0.35)] active:scale-95"
                  >
                    <span>Let&apos;s Talk</span>
                    <Send className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>

                  {/* Copy Email Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-primary/20 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5 text-primary" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  {/* Download Resume Button */}
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary active:scale-95"
                  >
                    <Download className="size-3.5" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Footer Component Mount */}
      <Footer />
    </section>
  );
}
