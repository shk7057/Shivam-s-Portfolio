"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteNavigation } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const mouseNearTop = useRef(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && siteNavigation.some((item) => item.id === hash)) {
        setActiveSection((prev) => (prev === hash ? prev : hash));
      }
    };

    let rAfId: number | null = null;

    const updateActiveSection = () => {
      const isDesktop =
        window.innerWidth >= 768 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      for (let i = siteNavigation.length - 1; i >= 0; i--) {
        const id = siteNavigation[i].id;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (isDesktop) {
            if (rect.left <= viewportCenterX + 120 && rect.right >= viewportCenterX - 120) {
              setActiveSection((prev) => (prev === id ? prev : id));
              break;
            }
          } else {
            if (rect.top <= viewportCenterY + 120) {
              setActiveSection((prev) => (prev === id ? prev : id));
              break;
            }
          }
        }
      }
    };

    const handleScroll = () => {
      if (rAfId !== null) cancelAnimationFrame(rAfId);
      rAfId = requestAnimationFrame(updateActiveSection);

      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10 && !mouseNearTop.current) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) return;

      if (e.clientY <= 90) {
        mouseNearTop.current = true;
        setIsVisible(true);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      } else {
        mouseNearTop.current = false;
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
          if (!mouseNearTop.current && window.scrollY > 50) {
            setIsVisible(false);
          }
        }, 3500);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rAfId !== null) cancelAnimationFrame(rAfId);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
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
    setActiveSection((prev) => (prev === id ? prev : id));
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        data-reveal="navbar"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[82px] w-full border-b border-[#C7A66B]/15 bg-[#0d0d0d]/92 backdrop-blur-md transition-transform duration-300 ease-out transform-gpu",
          isVisible ? "translate-y-0" : "-translate-y-[70px]",
        )}
      >
        <div className="container flex h-[#82px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo: SHK7057. */}
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
                      ? "font-semibold text-primary"
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
              className="group hidden items-center gap-2 rounded-full border border-primary/35 bg-background/40 px-5 py-2 text-xs font-medium tracking-widest uppercase text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-primary/80 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(199,166,107,0.25)] active:scale-[0.98] sm:inline-flex"
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
          <div className="fixed top-0 bottom-0 right-0 z-50 flex w-[82vw] max-w-sm flex-col justify-between border-l border-[#C7A66B]/20 bg-[#0d0d0d]/96 p-8 shadow-2xl backdrop-blur-xl transform-gpu">
            {/* Drawer Top: Logo & Close */}
            <div className="flex items-center justify-between border-b border-border/40 pb-6">
              <Link
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="inline-flex items-baseline font-serif text-2xl font-semibold tracking-wide transition-opacity duration-300 hover:opacity-90"
              >
                <span className="text-[#F5F5F5]">SHK</span>
                <span className="text-primary">7057</span>
                <span className="font-sans text-primary">.</span>
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
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3.5 text-xs font-medium tracking-widest uppercase text-foreground shadow-[0_0_20px_rgba(199,166,107,0.2)] transition-all hover:bg-primary/20"
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
