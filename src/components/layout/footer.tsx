"use client";

import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { siteNavigation } from "@/config/site";

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const isDesktopHorizontal =
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isDesktopHorizontal) {
      const track = document.querySelector<HTMLElement>(".horizontal-scroll-track");
      let targetScroll = element.offsetLeft;

      if (id !== "home" && targetScroll === 0 && track) {
        const elemRect = element.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        targetScroll = Math.max(0, elemRect.left - trackRect.left);
      }

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      const navbarHeight = 82;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <footer className="relative w-full border-t border-[#C7A66B]/15 bg-[#0a0a0a]/90 pt-10 pb-8 backdrop-blur-md transform-gpu">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 sm:px-10 lg:px-12">
        {/* Top Row: Logo, Navigation, Social Links & Back To Top */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-start gap-1">
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="group inline-flex items-baseline font-serif text-2xl font-semibold tracking-wide transition-opacity duration-300 hover:opacity-90"
              aria-label="SHK7057 Portfolio Home"
            >
              <span className="text-[#F5F5F5]">SHK</span>
              <span className="text-primary">7057</span>
              <span className="font-sans text-primary">.</span>
            </Link>
            <p className="font-mono text-xs text-muted-foreground/70 tracking-wider uppercase">
              AI Engineer & Full Stack Developer
            </p>
          </div>

          {/* Center Navigation Links */}
          <nav
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground/80"
            aria-label="Footer Navigation"
          >
            {siteNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="transition-colors duration-250 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Links & Back To Top Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="grid size-9 place-items-center rounded-md border border-border/80 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="grid size-9 place-items-center rounded-md border border-border/80 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href="mailto:shivam.singla.ai@gmail.com"
                aria-label="Send Email"
                className="grid size-9 place-items-center rounded-md border border-border/80 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_rgba(199,166,107,0.2)] hover:-translate-y-0.5"
              >
                <Mail className="size-4" />
              </a>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border/60" />

            {/* Back To Top Button */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="group flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-[11px] font-medium tracking-wider uppercase text-primary transition-all duration-300 hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(199,166,107,0.25)] active:scale-95"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="size-3.5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/40" />

        {/* Bottom Row: Copyright */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground/70 font-mono">
          <div>
            © {currentYear} Shivam Kumar Singla. All rights reserved.
          </div>
          <div>
            Designed & Developed by <span className="text-primary font-medium">Shivam</span> with precision.
          </div>
        </div>
      </div>
    </footer>
  );
}
