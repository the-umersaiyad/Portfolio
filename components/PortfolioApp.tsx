"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { GlowCard as GlowCardWrapper } from "@/components/GlowCard";
import { scrollController } from "@/components/scrollState";
import { AnimeTextReveal } from "@/components/AnimeTextReveal";
import { useAnimateActive } from "@/lib/animeHelper";
import { animate, cubicBezier } from "animejs";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrambleText } from "@/components/ScrambleText";
import { SkillNebula } from "@/components/SkillNebula";
import { ProjectDeck } from "@/components/ProjectDeck";
import { TimeTravelTimeline } from "@/components/TimeTravelTimeline";

import {
  MonitorSmartphone,
  Code2,
  Layers3,
  Palette,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

// ─── Brand Icons ─────────────────────────────────────────────────────────────

function BrandIcon({ name, className }: { name: string; className?: string }) {
  if (name === "github") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  return null;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export let profile: any = {
  name: "Umer Saiyad",
  title: "Full Stack Developer",
  tagline: "Building modern web experiences.",
  location: "Surat,Gujarat, India",
  email: "umersaiyad76@gmail.com",
  phone: "+91 9510131599",
  experience: "6+ Months",
  education: "BCA & MCA — Uka Tarsadia University",
  availability: "Available for freelance",
  heroImage: "/umer-hero-bg.png",
};

export let desktopSections: any[] = [];
export let mobileSections: any[] = [];
export let firstDesktopSection: any = null;
export let lastDesktopSection: any = null;
export let middleDesktopSections: any[] = [];
export let navItems: any[] = [];

export let projects: any[] = [
  {
    title: "LawAssist",
    description:
      "A smart FIR filing system that simplifies legal documentation, case tracking, and citizen-police interaction.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "#",
  },
  {
    title: "HomeFixCare",
    description:
      "A home service management system for booking repairs, maintenance, and trusted service providers on demand.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop",
    tags: ["Next.js", "Express", "Stripe", "PostgreSQL"],
    link: "#",
  },
  {
    title: "RadioPlugger",
    description:
      "A song streaming platform for independent artists to upload, promote, and distribute music to radio stations.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop",
    tags: ["React", "Firebase", "Tailwind", "Node.js"],
    link: "#",
  },
];

// Social media feeds and updates loaded dynamically inside the Socials component.

export let socialLinks: any[] = [
  { name: "github", href: "https://github.com/Umer-Enacton", label: "GitHub" },
  { name: "linkedin", href: "https://www.linkedin.com/in/umer-saiyad-741710254/", label: "LinkedIn" },
  { name: "instagram", href: "https://www.instagram.com/the_umersaiyad/", label: "Instagram" },
];

export let journeyData: any[] = [];
export let skillsData: any[] = [];
export let dbSections: any[] = [];


// ─── Utility Components ──────────────────────────────────────────────────────

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="w-4 h-4 text-accent" />
      <span className="text-sm font-medium text-accent tracking-wide uppercase">{children}</span>
    </div>
  );
}

function PremiumButton({
  children,
  variant = "primary",
  href,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  icon?: "arrow" | "download";
}) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = (clientX - (rect.left + rect.width / 2)) * 0.38;
      const y = (clientY - (rect.top + rect.height / 2)) * 0.38;
      // Direct DOM update — zero re-renders
      btnRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      btnRef.current.style.transition = "none";
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate3d(0px, 0px, 0)";
    btnRef.current.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  };

  const baseClasses =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-accent/40",
    secondary: "border border-border text-text hover:border-accent hover:text-accent",
  };

  const iconEl =
    icon === "arrow" ? <ArrowRight className="w-4 h-4" /> : icon === "download" ? <Download className="w-4 h-4" /> : null;

  const classes = `${baseClasses} ${variants[variant]}`;

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-magnetic
      >
        {children}
        {iconEl}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-magnetic
    >
      {children}
      {iconEl}
    </button>
  );
}


function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight ${className}`}>
      {children}
    </h2>
  );
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

function GlassCard({
  children,
  className = "",
  hover = true,
  style = {},
  onMouseMove,
  onMouseLeave,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover || !cardRef.current || !glareRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!cardRef.current || !glareRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const gX = ((clientX - rect.left) / rect.width) * 100;
      const gY = ((clientY - rect.top) / rect.height) * 100;

      // Direct DOM update — zero React re-renders
      glareRef.current.style.opacity = "0.08";
      glareRef.current.style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgba(255, 255, 255, 0.75) 0%, transparent 60%)`;
      cardRef.current.style.boxShadow = "0 20px 45px rgba(16, 185, 129, 0.05)";
    });

    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
    if (cardRef.current) cardRef.current.style.boxShadow = "none";
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rounded-2xl border border-border bg-card backdrop-blur-sm p-6 relative overflow-hidden transition-all duration-300 ${className}`}
      style={{ ...style }}
      {...props}
    >
      {/* Glare Shine Overlay — updated via ref, no re-renders */}
      {hover && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ opacity: 0, transition: "opacity 0.2s ease" }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}



// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    // Disable all transitions for one paint frame to prevent a janky
    // full-page repaint cascade (especially bad on mobile with backdrop-blur).
    document.documentElement.classList.add("no-transition");
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light");
    document.documentElement.classList.toggle("dark");
    // Re-enable transitions after the browser has painted the new theme
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("no-transition");
      });
    });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // On mobile: normal page uses anchor-based smooth scroll
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const id = href.replace("#", "");
      // Small delay so the mobile menu can close before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return;
    }

    // On desktop: fullpage scroll controller
    const map: Record<string, number> = {};
    navItems.forEach((item, idx) => {
      map[item.href] = item.pageIndex;
    });

    const page = map[href];
    if (page !== undefined) {
      scrollController.goTo(page);
    } else {
      scrollController.goTo(0);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border"
    >
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.button
            onClick={() => scrollController.goTo(0)}
            className="font-display font-bold text-xl text-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            data-magnetic
          >
            US<span className="text-accent">.</span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer"
                data-magnetic
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border hover:border-accent transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              data-magnetic
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <PremiumButton variant="primary" onClick={() => scrollController.goTo(7)} icon="arrow">
              <span className="hidden sm:inline">Let&apos;s Talk</span>
              <span className="sm:hidden">Talk</span>
            </PremiumButton>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-border"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu — CSS grid-rows height animation, no JS/Framer needed */}
      <div
        className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
        style={{
          display: "grid",
          gridTemplateRows: isMobileMenuOpen ? "1fr" : "0fr",
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: "grid-template-rows 0.3s ease, opacity 0.25s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <Container>
            <nav className="py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm text-text-secondary hover:text-accent transition-colors py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </Container>
        </div>
      </div>
    </motion.header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      hasAnimated.current = true;

      animate(".hero-fade-item", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: (_el: Element, i: number) => i * 120,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      });

      animate(".hero-image-wrap", {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 800,
        delay: 300,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      });
    }
  }, [isActive]);

  return (
    <section ref={sectionRef} id="home" className="relative h-full flex items-center md:pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px] dark:opacity-100 opacity-30" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px] dark:opacity-100 opacity-20" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div
              className="hero-fade-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-subtle border border-accent/20 mb-6"
              style={{ opacity: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">{profile.availability}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6">
              <ScrambleText
                text="Umer Saiyad — Building modern web experiences."
                active={isActive}
              />
            </h1>

            <p
              className="hero-fade-item text-lg text-text-secondary max-w-lg mb-8"
              style={{ opacity: 0 }}
            >
              Hi, I&apos;m {profile.name}. A passionate {profile.title.toLowerCase()} crafting
              elegant digital solutions with clean code and thoughtful design.
            </p>

            <div
              className="hero-fade-item flex flex-wrap gap-4 mb-12"
              style={{ opacity: 0 }}
            >
              <PremiumButton variant="primary" onClick={() => scrollController.goTo(3)} icon="arrow">
                View Projects
              </PremiumButton>
              <PremiumButton 
                variant="secondary" 
                onClick={() => {
                  // @ts-ignore (Assuming cvUrl is dynamically attached to profile data now)
                  if (profile.cvUrl) {
                    // @ts-ignore
                    window.open(profile.cvUrl, '_blank');
                  } else {
                    scrollController.goTo(scrollController.totalPages - 1);
                  }
                }} 
                icon="download"
              >
                Download CV
              </PremiumButton>
            </div>

            {/* Stats */}
            <div
              className="hero-fade-item flex gap-8"
              style={{ opacity: 0 }}
            >
              {[
                { value: "6 Months+", label: "Exp." },
                { value: "10+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Image */}
          <div
            className="hero-image-wrap relative hidden lg:block"
            style={{ opacity: 0 }}
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent rounded-3xl dark:block hidden" />
              <Image
                src={profile.heroImage}
                alt={profile.heroImageAlt || "Portfolio Hero Image"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top rounded-3xl"
              />
              {/* Floating cards */}
              <div className="animate-float-up absolute -left-8 top-[45%] bg-surface/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium">{profile.availability}</span>
                </div>
              </div>

              <div className="animate-float-down absolute -right-8 bottom-1/3 bg-surface/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


// ─── About ───────────────────────────────────────────────────────────────────

function About({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);

  return (
    <section ref={sectionRef} id="about">
      <Container>
        <SectionLabel>About Me</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading>
              <AnimeTextReveal
                text="Passionate about creating impactful digital experiences"
                active={isActive}
                mode="words"
              />
            </SectionHeading>
          </div>
          <div>
            <p className="text-text-secondary mb-6 leading-relaxed">
              I&apos;m a full-stack developer with {profile.experience} of experience building web applications
              that are both beautiful and functional. I specialize in React, Next.js, and Node.js ecosystems.
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Currently pursuing my {profile.education}, I combine academic knowledge with hands-on
              project experience to deliver solutions that make a real difference.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: profile.location },
                { icon: Mail, label: profile.email },
                { icon: Phone, label: profile.phone },
                { icon: Calendar, label: profile.experience },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-subtle flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

const servicesData = [
  {
    step: "01",
    shortTitle: "FRONTEND",
    title: "Frontend Engineering",
    description: "Crafting high-performance, accessible, and hyper-interactive user interfaces using modern web technologies.",
    icon: Code2,
    accentColor: "#00ffcc",
    widget: (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"].map((t) => (
          <span key={t} className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border border-accent/30 text-accent bg-accent/5 tracking-wide">
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    step: "02",
    shortTitle: "BACKEND",
    title: "Backend Architecture",
    description: "Designing scalable microservices, secure RESTful APIs, and optimizing complex database queries.",
    icon: Layers3,
    accentColor: "#a78bfa",
    widget: (
      <div className="flex flex-col gap-1.5 mt-1">
        {[
          { method: "GET", path: "/api/users", status: "200", ms: "12ms" },
          { method: "POST", path: "/api/auth/login", status: "201", ms: "45ms" },
          { method: "GET", path: "/api/projects", status: "200", ms: "8ms" },
        ].map((ep) => (
          <div key={ep.path} className="flex items-center gap-2 font-mono text-[9px]">
            <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-accent/15 text-accent tracking-wider">{ep.method}</span>
            <span className="text-text-secondary flex-1 truncate">{ep.path}</span>
            <span className="text-green-400 font-bold">{ep.status}</span>
            <span className="text-text-muted">{ep.ms}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    step: "03",
    shortTitle: "UI/UX DESIGN",
    title: "UI/UX Design",
    description: "Translating user needs into beautiful, intuitive, and highly functional wireframes and design systems.",
    icon: Palette,
    accentColor: "#f472b6",
    widget: (
      <div className="mt-1 space-y-2 w-full">
        <div className="flex gap-3 justify-center w-full">
          {["#0d0d12", "#1a1a2e", "#00ffcc", "#a78bfa", "#f472b6", "#ffffff"].map((c) => (
            <div
              key={c}
              className="w-6 h-6 rounded-md border border-white/10 transition-transform hover:scale-110"
              style={{ background: c }}
              title={c}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-accent via-purple-400 to-pink-400 opacity-60" />
          <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Design Tokens</span>
        </div>
      </div>
    ),
  },
  {
    step: "04",
    shortTitle: "DEVOPS",
    title: "Cloud & DevOps",
    description: "Automating CI/CD pipelines and orchestrating containerized deployments across AWS and Vercel.",
    icon: MonitorSmartphone,
    accentColor: "#facc15",
    widget: (
      <div className="flex items-center gap-1 mt-1 overflow-hidden">
        {["Build", "Test", "Stage", "Deploy"].map((stage, i) => (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-0.5 w-full">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-[9px] font-black font-mono border ${
                i <= 2 ? "border-green-400/40 bg-green-400/10 text-green-400" : "border-accent/40 bg-accent/10 text-accent animate-pulse"
              }`}>
                {i <= 2 ? "✓" : "▸"}
              </div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{stage}</span>
            </div>
            {i < 3 && <div className={`w-4 h-px mt-[-10px] ${i <= 1 ? "bg-green-400/40" : "bg-border"}`} />}
          </React.Fragment>
        ))}
      </div>
    ),
  },
];

function Services({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  useEffect(() => {
    if (active) {
      const container = sectionRef.current?.closest(".section-scroll-container");
      if (container) {
        container.scrollTop = 0;
      }
    }
  }, [active]);



  return (
    <section ref={sectionRef} id="services">
      <Container>
        <div className="text-center mb-12">
          <SectionLabel>What I Do</SectionLabel>
          <SectionHeading className="mx-auto">
            <AnimeTextReveal
              text="Services & Expertise"
              active={isActive}
              mode="words"
            />
          </SectionHeading>
        </div>

        {/* 🍱 DYNAMIC HORIZONTAL BLADE SLIDER 🍱 */}
        <div className="flex flex-col md:flex-row gap-3 w-full max-w-5xl mx-auto text-left h-auto md:h-[340px]">
          {servicesData.map((item, idx) => {
            const Icon = item.icon;
            const isExpanded = hoveredIdx === idx;

            return (
              <GlassCard
                key={item.step}
                className="relative overflow-hidden cursor-pointer flex flex-col p-0 transition-all duration-300 group border-border/40 hover:border-accent/40"
                style={{
                  flex: isExpanded ? 5 : 1,
                  minHeight: isExpanded ? "260px" : "64px",
                  transition: "flex 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.05), min-height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.05), background-color 0.4s ease, border-color 0.4s ease",
                  backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.015)",
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(idx)}
              >
                {/* ═══ Desktop: Collapsed Blade — Vertical icon + title ═══ */}
                <div
                  className="absolute inset-0 hidden md:flex flex-col items-center justify-center gap-4 transition-all duration-300 pointer-events-none select-none z-10"
                  style={{
                    opacity: isExpanded ? 0 : 1,
                  }}
                >
                  <div className="w-9 h-9 rounded-xl bg-accent-subtle flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-accent/70" />
                  </div>
                  <span
                    className="font-display font-bold tracking-[0.25em] text-[10px] uppercase text-text-muted whitespace-nowrap flex-shrink-0"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {item.shortTitle}
                  </span>
                </div>

                {/* ═══ Mobile: Collapsed header ═══ */}
                {!isExpanded && (
                  <div className="flex md:hidden items-center justify-between w-full px-4 absolute inset-0 z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <h3 className="font-display font-bold text-[13px] text-text tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono font-bold text-[10px] text-accent/50">{item.step}</span>
                  </div>
                )}

                {/* ═══ Expanded Contents ═══ */}
                <div
                  className={`p-5 md:p-6 flex flex-col justify-center gap-2 h-full w-full ${!isExpanded ? "hidden md:flex" : "flex"}`}
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? "translateY(0)" : "translateY(16px)",
                    pointerEvents: isExpanded ? "auto" : "none",
                    transition: "opacity 0.4s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.05)",
                    transitionDelay: isExpanded ? "0.15s" : "0s",
                  }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xl md:text-2xl text-text leading-none">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[10px] text-accent/50 tracking-widest">{item.step}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                  
                  {/* Unique per-blade visual widget */}
                  {item.widget}
                </div>

              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function Projects({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);

  return (
    <section ref={sectionRef} id="projects">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between  gap-4">
          <div>
            <SectionLabel>My Work</SectionLabel>
            <SectionHeading>
              <AnimeTextReveal
                text="Featured Projects"
                active={isActive}
                mode="words"
              />
            </SectionHeading>
          </div>
          <PremiumButton variant="secondary" href="#" icon="arrow">
            View All
          </PremiumButton>
        </div>

        <div className="flex items-center justify-center mt-6 sm:mt-0">
          <ProjectDeck projects={projects} />
        </div>
      </Container>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

function Skills({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);

  return (
    <section ref={sectionRef} id="skills" className="w-full">
      <Container className="py-4">
        <div>
          <div className="text-center mb-6">
            <SectionLabel>Tech Stack</SectionLabel>
            <SectionHeading>
              <AnimeTextReveal
                text="Skills & Technologies"
                active={isActive}
                mode="words"
              />
            </SectionHeading>
          </div>

          <div className="flex items-center justify-center w-full">
            {/* On mobile, render bento dashboard inline */}
            <div className="w-full max-w-[760px] md:hidden">
              <SkillNebula active={active} />
            </div>
            {/* On desktop, render bento dashboard with spacious layout */}
            <div className="hidden md:block w-full max-w-5xl">
              <SkillNebula active={active} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Instagram carousel data (also used by SocialsSEO server component) ────────

const instaAltTexts: Record<string, string> = {
  "DXBwaGAjEDZ": "Umer Saiyad, Full Stack Developer from Surat, holding a flower bouquet in a white shirt and blue jeans.",
  "DWJ1lq5DKS2": "Umer Saiyad, Full Stack Developer from Surat, wearing a black traditional kurta and glasses outdoors by a road.",
  "DT-CmqdjKJ-": "Umer Saiyad, Full Stack Developer from Surat, wearing a red sweatshirt, glasses, and a white prayer cap, leaning on a motorcycle.",
  "DNW6bFEI2qs": "Umer Saiyad, a Full Stack developer from India, posing outdoor next to a clean, polished car under bright daylight.",
  "DEkiJrHSFJD": "Umer Saiyad, Full Stack Developer from Surat, wearing a purple formal suit, a white dress shirt, and clear glasses, posing against a purple draped background with floral arrangements.",
};

const instagramShortcodes = [
  "DXBwaGAjEDZ",
  "DWJ1lq5DKS2",
  "DT-CmqdjKJ-",
  "DNW6bFEI2qs",
  "DEkiJrHSFJD",
];

// ─── Socials (LinkedIn & Instagram — Split Layout with AnimeJS) ──────────────

function Socials({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      hasAnimated.current = true;

      // LinkedIn card slides in from left
      animate(".social-linkedin-card", {
        opacity: [0, 1],
        translateX: [-60, 0],
        duration: 700,
        delay: 200,
        ease: cubicBezier(0.25, 1, 0.5, 1),
      });

      // Instagram cards staggered entrance
      animate(".social-insta-card", {
        opacity: [0, 1],
        scale: [0.85, 1],
        translateY: [40, 0],
        duration: 600,
        delay: (_el: Element, i: number) => 300 + i * 100,
        ease: cubicBezier(0.34, 1.56, 0.64, 1),
      });

      // Bottom CTA fades up last
      animate(".social-cta-pill", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: 900,
        ease: cubicBezier(0.25, 1, 0.5, 1),
      });
    }
  }, [isActive]);

  return (
    <section ref={sectionRef} id="socials" className="w-full h-full flex flex-col justify-center py-2">
      <Container className="flex flex-col h-full justify-center max-h-[62vh]">
        {/* Header */}
        <div className="text-center mb-4">
          <SectionLabel>Social Buzz</SectionLabel>
          <SectionHeading className="mx-auto text-xl sm:text-2xl">
            <AnimeTextReveal
              text="My Socials & Updates"
              active={isActive}
              mode="words"
            />
          </SectionHeading>
        </div>

        {/* Split Layout: LinkedIn (left) + Instagram Grid (right) */}
        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-4xl mx-auto flex-grow min-h-0">

          {/* ─── LinkedIn Quote Card ─── */}
          <div className="social-linkedin-card w-full lg:w-[38%] flex-shrink-0 opacity-0">
            <GlassCard className="h-full flex flex-col justify-between p-4 border-border/40 hover:border-accent/30">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-accent/30 overflow-hidden bg-accent-subtle flex-shrink-0 relative">
                    <Image src="/umer-avatar.png" alt="Umer Saiyad" fill sizes="48px" className="object-cover object-top" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-text">Umer Saiyad</h4>
                    <p className="text-[11px] text-text-secondary">Full Stack Developer</p>
                  </div>
                </div>

                <blockquote className="text-sm text-text-secondary leading-relaxed mb-4 border-l-2 border-accent/40 pl-4 italic">
                  &ldquo;Driven by building scalable web applications and seamless user experiences. Bridging clean frontend interfaces with robust backend architecture.&rdquo;
                </blockquote>

                {/* LinkedIn Post Image */}
                <div className="w-full rounded-xl overflow-hidden border border-border/50 mb-4">
                  <Image
                    src="/Umer_Saiyad_techstack.png"
                    alt="Umer Saiyad, Full Stack Developer from Surat, smiling in a white dress shirt with arms crossed, next to glowing digital panels showcasing Next.js, PostgreSQL, Drizzle ORM, and Node.js."
                    width={800}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"].map((tech) => (
                    <span key={tech} className="text-[9px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/umer-saiyad-741710254/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors duration-300 shadow-md"
              >
                <BrandIcon name="linkedin" className="w-4 h-4" />
                Connect on LinkedIn
                <ExternalLink className="w-3 h-3" />
              </a>
            </GlassCard>
          </div>

          {/* ─── Instagram Masonry Grid ─── */}
          <div className="w-full lg:w-[62%] flex-grow min-h-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-full auto-rows-fr">
              {instagramShortcodes.map((code, idx) => (
                <a
                  key={code}
                  href={`https://www.instagram.com/p/${code}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-insta-card opacity-0 relative rounded-xl overflow-hidden border border-border/40 hover:border-accent/40 group transition-all duration-300 shadow-lg hover:shadow-accent/10 ${
                    idx === 0 ? "row-span-2" : ""
                  }`}
                  style={{ minHeight: idx === 0 ? "100%" : "120px" }}
                >
                  <Image
                    src={`/insta-${code}.jpg`}
                    alt={instaAltTexts[code] || "Umer Saiyad Instagram Post"}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <BrandIcon name="instagram" className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom CTA Pill ─── */}
        <div className="social-cta-pill opacity-0 flex justify-center mt-3">
          <a
            href="https://www.instagram.com/the_umersaiyad/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface border border-border/50 hover:border-accent/40 text-sm text-text-secondary hover:text-accent transition-all duration-300 shadow-md hover:shadow-accent/10"
          >
            <BrandIcon name="instagram" className="w-4 h-4" />
            <span className="font-medium">@the_umersaiyad</span>
            <span className="text-text-muted">•</span>
            <span className="text-accent font-semibold text-xs">Follow on Instagram →</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

function Process({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isActive = useAnimateActive(sectionRef, active);

  useEffect(() => {
    if (active) {
      // Immediately reset scroll to top
      const container = sectionRef.current?.closest(".section-scroll-container") as HTMLElement | null;
      if (container) {
        container.scrollTop = 0;
      }
      // Also reset after a frame in case layout hasn't settled
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = 0;
        }
      });
    }
  }, [active]);

  return (
    <div ref={sectionRef} id="process">
      <Container>
        <div className="text-center mb-10 py-4">
          <SectionLabel>My Journey</SectionLabel>
          <SectionHeading className="mx-auto">
            <AnimeTextReveal
              text="Education & Experience"
              active={isActive}
              mode="words"
            />
          </SectionHeading>
        </div>

        <TimeTravelTimeline active={active} />
      </Container>
    </div>
  );
}


// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact({ active }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isActive = useAnimateActive(sectionRef, active);

  return (
    <section ref={sectionRef} id="contact" className="h-full flex items-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Get In Touch</SectionLabel>
            <SectionHeading>
              <AnimeTextReveal
                text="Let's work together"
                active={isActive}
                mode="words"
              />
            </SectionHeading>
            <p className="text-text-secondary mt-6 mb-8 max-w-md">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can
              bring your ideas to life.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
                { icon: MapPin, label: profile.location, href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-text-secondary group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <BrandIcon name={link.name} className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Workspace Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop"
                alt="Modern developer workspace with laptop showing code editor"
                fill
                sizes="(max-width: 1024px) 0vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-bg/80" />
              <div className="absolute bottom-6 left-6 right-6">
                <GlassCard hover={false} className="bg-surface/90">
                  <p className="text-sm font-medium">Ready to start your next project?</p>
                  <p className="text-xs text-text-muted mt-1">
                    Let&apos;s create something amazing together.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Scroll To Top (Mobile) ─────────────────────────────────────────────────

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 z-50 w-11 h-11 rounded-full bg-accent text-white shadow-lg shadow-accent/30 flex items-center justify-center md:hidden"
          aria-label="Scroll to top"
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function FooterSection() {
  return (
    <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-border bg-bg/50 backdrop-blur-sm z-20">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg">
              US<span className="text-accent">.</span>
            </span>
            <span className="text-sm text-text-muted">
              © {new Date().getFullYear()} {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label={link.label}
              >
                <BrandIcon name={link.name} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = "scaleX(0)";
    }

    const unsubscribe = scrollController.subscribe(() => {
      const targetProgress = scrollController.currentPage / (scrollController.totalPages - 1);
      if (barRef.current) {
        animate(barRef.current, {
          scaleX: targetProgress,
          duration: 350,
          ease: cubicBezier(0.32, 0.72, 0, 1),
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-border z-[100]">
      <div
        ref={barRef}
        className="h-full origin-left w-full"
        style={{
          background: "linear-gradient(to right, #10b981, #06b6d4, #3b82f6)",
          boxShadow: "0 0 8px rgba(16, 185, 129, 0.5), 0 0 15px rgba(6, 182, 212, 0.3)",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

function MobileScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-border z-[100]">
      <div
        ref={barRef}
        className="h-full origin-left w-full"
        style={{
          background: "linear-gradient(to right, #10b981, #06b6d4, #3b82f6)",
          boxShadow: "0 0 8px rgba(16, 185, 129, 0.5), 0 0 15px rgba(6, 182, 212, 0.3)",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

// ─── Section Dots Navigation (Liquid Goo Effect) ─────────────────────────────

function SectionDots() {
  const sectionIds = desktopSections.map(s => s.id);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollController.subscribe(() => {
      setActive(scrollController.currentPage);
    });
    return unsubscribe;
  }, []);

  const handleClick = (index: number) => {
    scrollController.goTo(index);
  };

  const dotSize = 12;
  const gap = 28;
  const totalHeight = (sectionIds.length - 1) * gap + dotSize;
  const svgWidth = 36;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <svg
        width={svgWidth}
        height={totalHeight + 10}
        viewBox={`0 0 ${svgWidth} ${totalHeight + 10}`}
        className="overflow-visible"
      >
        {/* Goo filter for liquid merging effect */}
        <defs>
          <filter id="goo-dots">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>

        {/* Inactive dots */}
        {sectionIds.map((_, index) => (
          <circle
            key={`bg-${index}`}
            cx={svgWidth / 2}
            cy={5 + index * gap + dotSize / 2}
            r={5}
            fill="rgba(148, 163, 184, 0.5)"
          />
        ))}

        {/* Group with goo filter applied — liquid blob */}
        <g filter="url(#goo-dots)">
          <motion.circle
            cx={svgWidth / 2}
            r={7}
            fill="#10b981"
            initial={{ cy: 5 + active * gap + dotSize / 2 }}
            animate={{ cy: 5 + active * gap + dotSize / 2 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          />
          <motion.circle
            cx={svgWidth / 2}
            r={6}
            fill="#10b981"
            initial={{ cy: 5 + active * gap + dotSize / 2 }}
            animate={{ cy: 5 + active * gap + dotSize / 2 }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.circle
            cx={svgWidth / 2}
            r={7}
            fill="#10b981"
            initial={{ cy: 5 + active * gap + dotSize / 2 }}
            animate={{ cy: 5 + active * gap + dotSize / 2 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </g>

        {/* Clickable hit areas */}
        {sectionIds.map((id, index) => (
          <circle
            key={`hit-${id}`}
            cx={svgWidth / 2}
            cy={5 + index * gap + dotSize / 2}
            r={10}
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <title>{id.charAt(0).toUpperCase() + id.slice(1)}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}


// ─── Card Sections Array ─────────────────────────────────────────────────────


export function PortfolioApp({ dbData }: { dbData?: any }) {
  if (dbData) {
    if (dbData.profile) profile = dbData.profile;
    if (dbData.projects && dbData.projects.length > 0) projects = dbData.projects;
    if (dbData.socials && dbData.socials.length > 0) {
      socialLinks = dbData.socials.map((s: any) => ({
        name: s.platform || s.name,
        href: s.url || s.href,
        label: (s.platform || s.name || "").charAt(0).toUpperCase() + (s.platform || s.name || "").slice(1)
      }));
    }
    if (dbData.journey) journeyData = dbData.journey;
    if (dbData.skills) skillsData = dbData.skills;
    if (dbData.sections) {
      const COMP_MAP: any = {
        hero: { comp: Hero, label: "Home", href: "#home" },
        about: { comp: About, label: "About", href: "#about" },
        services: { comp: Services, label: "Services", href: "#services" },
        projects: { comp: Projects, label: "Projects", href: "#projects" },
        skills: { comp: Skills, label: "Skills", href: "#skills" },
        journey: { comp: Process, label: "Journey", href: "#process" },
        socials: { comp: Socials, label: "Socials", href: "#socials" },
        contact: { comp: Contact, label: "Contact", href: "#contact" }
      };

      const sorted = [...dbData.sections].sort((a: any, b: any) => a.order - b.order);
      
      desktopSections = sorted
        .filter((s: any) => s.isVisible)
        .map((s: any) => ({ id: s.sectionId, ...COMP_MAP[s.sectionId] }))
        .filter((s: any) => s.comp);
        
      mobileSections = sorted
        .filter((s: any) => s.isMobileVisible)
        .map((s: any) => ({ id: s.sectionId, ...COMP_MAP[s.sectionId] }))
        .filter((s: any) => s.comp);

      if (desktopSections.length > 0) {
        firstDesktopSection = desktopSections[0];
        lastDesktopSection = desktopSections.length > 1 ? desktopSections[desktopSections.length - 1] : null;
        middleDesktopSections = desktopSections.slice(1, -1);
      } else {
        firstDesktopSection = { id: 'hero', ...COMP_MAP['hero'] };
        lastDesktopSection = null;
        middleDesktopSections = [];
        desktopSections = [firstDesktopSection];
      }

      navItems = desktopSections.map((s, idx) => ({
        label: s.label,
        href: s.href,
        pageIndex: idx
      })).filter(item => item.label !== "Home"); // Hide home from nav bar text

      scrollController.totalPages = desktopSections.length;
    }
  }
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const wheelEndTimer = useRef<NodeJS.Timeout | null>(null);
  const accumulatedDelta = useRef(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Subscribe to scroll controller
  useEffect(() => {
    const unsubscribe = scrollController.subscribe(() => {
      setCurrentPage(scrollController.currentPage);
    });
    return unsubscribe;
  }, []);

  // Reset scroll containers to top whenever page changes on desktop
  useEffect(() => {
    if (isMobile) return;
    const containers = document.querySelectorAll(".section-scroll-container");
    containers.forEach((container) => {
      (container as HTMLElement).scrollTop = 0;
    });
    // Double rAF to ensure layout is settled before final reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        containers.forEach((container) => {
          (container as HTMLElement).scrollTop = 0;
        });
      });
    });
  }, [currentPage, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    let hasTransitionedThisSwipe = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const container = document.querySelector(".active-scroll-container") as HTMLElement;

      if (wheelEndTimer.current) clearTimeout(wheelEndTimer.current);
      wheelEndTimer.current = setTimeout(() => {
        accumulatedDelta.current = 0;
        hasTransitionedThisSwipe = false;
      }, 150);

      if (hasTransitionedThisSwipe) {
        return;
      }

      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isScrollable = scrollHeight > clientHeight + 10;

        if (isScrollable) {
          if (e.deltaY > 0) {
            // User scrolls down: if there is more content underneath, scroll inside container
            if (scrollTop + clientHeight < scrollHeight - 5) {
              container.scrollTop += e.deltaY;
              accumulatedDelta.current = 0;
              return;
            } else {
              // At bottom boundary: accumulate delta to prevent trackpad getting stuck
              accumulatedDelta.current += e.deltaY;
              if (accumulatedDelta.current > 60) {
                accumulatedDelta.current = 0;
                hasTransitionedThisSwipe = true;
                scrollController.next();
              } else {
                container.scrollTop = scrollHeight - clientHeight;
              }
              return;
            }
          } else if (e.deltaY < 0) {
            // User scrolls up: if we are not at the absolute top, scroll inside container
            if (scrollTop > 5) {
              container.scrollTop += e.deltaY;
              accumulatedDelta.current = 0;
              return;
            } else {
              // At top boundary
              accumulatedDelta.current += e.deltaY;
              if (accumulatedDelta.current < -60) {
                accumulatedDelta.current = 0;
                hasTransitionedThisSwipe = true;
                scrollController.prev();
              } else {
                container.scrollTop = 0;
              }
              return;
            }
          }
        }
      }

      // If container is not scrollable (or doesn't exist), transition based on accumulated delta
      if (e.deltaY > 0) {
        accumulatedDelta.current += e.deltaY;
        if (accumulatedDelta.current > 60) {
          accumulatedDelta.current = 0;
          hasTransitionedThisSwipe = true;
          scrollController.next();
        }
      } else if (e.deltaY < 0) {
        accumulatedDelta.current += e.deltaY;
        if (accumulatedDelta.current < -60) {
          accumulatedDelta.current = 0;
          hasTransitionedThisSwipe = true;
          scrollController.prev();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelEndTimer.current) clearTimeout(wheelEndTimer.current);
    };
  }, [isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = document.querySelector(".active-scroll-container") as HTMLElement;
      const step = 50; // Speed of keyboard scroll

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (container) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          if (scrollTop + clientHeight < scrollHeight - 15) {
            container.scrollTop += step;
            e.preventDefault();
            return;
          }
        }
        e.preventDefault();
        scrollController.next();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (container) {
          const { scrollTop } = container;
          if (scrollTop > 15) {
            container.scrollTop -= step;
            e.preventDefault();
            return;
          }
        }
        e.preventDefault();
        scrollController.prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollController.goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollController.goTo(scrollController.totalPages - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch support — disabled on mobile (normal scroll instead)
  useEffect(() => {
    if (isMobile) return;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollController.next();
        } else {
          scrollController.prev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Determine what to show
  const isHero = currentPage === 0;
  const isContact = currentPage === desktopSections.length - 1;

  // Mobile: normal scrollable layout (no fullpage controller)
  if (isMobile) {
    return (
      <div className="overflow-x-hidden">
        <CustomCursor />
        <MobileScrollProgress />
        <Header />
        <main className="pt-25">
          {mobileSections.map((Section, idx) => (
            <div key={Section.id} className={idx === 0 ? "pb-8" : idx === mobileSections.length - 1 ? "py-16" : "px-4 py-12"}>
              <Section.comp />
            </div>
          ))}
        </main>
        <footer className="border-t border-border py-6 px-4 text-center text-sm text-text-muted">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-3">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent" aria-label={link.label}>
                <BrandIcon name={link.name} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </footer>
        <ScrollToTopButton />
      </div>
    );
  }

  // Card wrapper offset
  let cardWrapperY = 0;
  if (currentPage === 0) {
    cardWrapperY = 100;
  } else if (currentPage === desktopSections.length - 1) {
    cardWrapperY = -100;
  }

  // Contact offset
  const contactY = currentPage === desktopSections.length - 1 ? 0 : 100;

  // Hero offset
  const heroY = currentPage === 0 ? 0 : -100;

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <SectionDots />
      <Header />
      <div className="h-screen h-dvh overflow-hidden relative pointer-events-none">
        {/* Hero */}
        <div
          className={`absolute inset-0 ${isHero ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{
            transform: `translateY(${heroY}%)`,
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {firstDesktopSection && <firstDesktopSection.comp active={isHero} />}
        </div>

        {/* Card with sections */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 ${!isHero && !isContact ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{
            transform: `translateY(${cardWrapperY}%)`,
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          <GlowCardWrapper className="w-full max-w-7xl relative hide-scrollbar">
            <div className="relative overflow-hidden hide-scrollbar" style={{ height: "75vh" }}>
              {middleDesktopSections.map((SectionInfo, index) => { const Section = SectionInfo.comp;
                const targetCardIndex = currentPage - 1;
                const offset = index - targetCardIndex;

                  // Render active + neighbors for a smooth sliding transition
                if (Math.abs(offset) > 1.2) return null;
                const opacity = index === targetCardIndex ? 1 : 0;

                return (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 lg:p-14"
                    style={{
                      transform: `translateY(${offset * 100}%)`,
                      opacity: opacity,
                      transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className={`w-full overflow-y-auto max-h-full hide-scrollbar section-scroll-container ${index === targetCardIndex ? "active-scroll-container" : ""}`}>
                      <Section active={index === targetCardIndex} />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlowCardWrapper>
        </div>

        {/* Contact */}
        <div
          className={`absolute inset-0 ${isContact ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{
            transform: `translateY(${contactY}%)`,
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {lastDesktopSection && <lastDesktopSection.comp active={isContact} />}
          <FooterSection />
        </div>
      </div>
    </>
  );
}
