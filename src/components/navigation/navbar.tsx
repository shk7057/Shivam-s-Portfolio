"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteNavigation } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      }
    };

    const handleScroll = () => {
      const sections = siteNavigation.map((item) => item.id);
      const isDesktopHorizontal =
        window.innerWidth >= 768 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isDesktopHorizontal) {
        const track = document.querySelector(".horizontal-scroll-track");
        if (track) {
          const sectionCount = track.children.length;
          const totalDistance = (sectionCount - 1) * window.innerWidth;
          const currentScroll = window.scrollY;
          const progress = Math.min(1, Math.max(0, currentScroll / (totalDistance || 1)));
          const activeIdx = Math.min(sectionCount - 1, Math.floor(progress * sectionCount + 0.3));
          const activeSecId = track.children[activeIdx]?.id;
          if (activeSecId) {
            setActiveSection(activeSecId);
          }
        }
      } else {
        const scrollPosition = window.scrollY + 120;
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionEl = document.getElementById(sections[i]);
          if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
      const track = document.querySelector(".horizontal-scroll-track");
      if (track) {
        const sections = Array.from(track.children);
        const index = sections.findIndex((sec) => sec.id === id);
        if (index !== -1) {
          const targetScroll = index * window.innerWidth;
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });
        }
      }
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

    window.history.pushState(null, "", `#${id}`);
    setActiveSection(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        data-reveal="navbar"
        className="sticky top-0 z-50 h-[82px] w-full border-b border-[#C7A66B]/12 bg-[#0d0d0d]/92 backdrop-blur-md transition-all duration-300"
      >
        <div className="container flex h-full items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo: Shivam. */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="group inline-flex items-center gap-0.5 text-2xl font-serif font-medium tracking-tight text-[#F5F3EF] transition-all duration-300 hover:scale-[1.02] hover:drop-shadow-[0_0_12px_rgba(199,166,107,0.35)]"
            aria-label="Shivam Portfolio Home"
          >
            <span>SHK7057</span>
            <span className="font-sans font-bold text-primary">.</span>
          </Link>

          {/* Desktop & Tablet Primary Navigation */}
          <nav
            className="hidden items-center gap-5 lg:flex xl:gap-8"
            aria-label="Primary navigation"
          >
            {siteNavigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "group relative py-1 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-250",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground/75 hover:text-foreground",
                  )}
                >
                  <span>{item.label}</span>
                  {/* Underline Indicator */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2 bg-primary transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Controls: Resume CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full border border-primary/35 bg-background/40 px-5 py-2 text-xs font-medium tracking-widest text-foreground uppercase transition-all duration-300 hover:scale-[1.03] hover:border-primary/80 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(199,166,107,0.25)] active:scale-[0.98] sm:inline-flex"
            >
              <span>Resume</span>
              <ArrowUpRight className="size-3.5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative grid size-10 place-items-center rounded-full border border-primary/30 bg-background/50 text-foreground transition-all duration-300 hover:border-primary hover:text-primary lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="size-5 text-primary" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Slide-In Glass Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Glass Drawer */}
          <div className="fixed top-0 bottom-0 right-0 z-50 flex w-[82vw] max-w-sm flex-col justify-between border-l border-[#C7A66B]/20 bg-[#0d0d0d]/96 p-8 shadow-2xl backdrop-blur-xl">
            {/* Drawer Top: Logo & Close */}
            <div className="flex items-center justify-between border-b border-border/40 pb-6">
              <Link
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="text-2xl font-serif font-medium tracking-tight text-[#F5F3EF]"
              >
                Shivam<span className="font-sans font-bold text-primary">.</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex flex-col gap-5 py-6">
              {siteNavigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "flex items-center justify-between py-1.5 text-sm font-medium tracking-[0.2em] uppercase transition-colors",
                      isActive
                        ? "font-semibold text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer: Resume CTA */}
            <div className="border-t border-border/40 pt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3.5 text-xs font-medium tracking-widest text-foreground uppercase shadow-[0_0_20px_rgba(199,166,107,0.2)] transition-all hover:bg-primary/20"
              >
                <span>Resume</span>
                <ArrowUpRight className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
