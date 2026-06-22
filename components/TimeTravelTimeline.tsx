"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { journeyData } from "./PortfolioApp";

interface Milestone {
  year: string;
  title: string;
  company: string;
  desc: string;
  tags: string[];
  icon: any;
}

const defaultMilestones: Milestone[] = [
  {
    year: "2025 - Present",
    title: "Full Stack Web Developer Intern",
    company: "EnactOn Technologies",
    desc: "Actively developing and optimizing production-grade MERN stack pipelines. Built responsive user interfaces, structured RESTful API microservices, engineered type-safe Drizzle ORM PostgreSQL modules, and optimized MongoDB schemas.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Drizzle ORM"],
    icon: Briefcase,
  },
  {
    year: "2024 - 2026",
    title: "Master of Computer Applications (MCA)",
    company: "Uka Tarsadia University",
    desc: "Advanced training in full stack architectures, scalable backend services, relational database normalization, security protocols, and advanced web technologies. Practiced system designs and data modelling.",
    tags: ["Next.js", "PostgreSQL", "Data Science", "System Design"],
    icon: GraduationCap,
  },
  {
    year: "2021 - 2024",
    title: "Bachelor of Computer Applications (BCA)",
    company: "Uka Tarsadia University",
    desc: "Acquired solid foundational computer application concepts. Formed deep skills in object-oriented programming, logical database operations, algorithm design, and core software structures.",
    tags: ["C++", "Java", "SQL", "Data Structures", "HTML/CSS"],
    icon: GraduationCap,
  },
];

export function TimeTravelTimeline({ active }: { active?: boolean }) {
  const baseDelay = active ? 0.6 : 0;
  
  const data = journeyData && journeyData.length > 0 ? journeyData : defaultMilestones;
  const milestones = data.map((item: any) => ({
    year: item.startDate ? `${item.startDate} - ${item.endDate}` : item.year,
    title: item.title,
    company: item.organization || item.company,
    desc: item.description || item.desc,
    tags: item.tags ? (typeof item.tags === "string" ? item.tags.split(",").map((s: string) => s.trim()) : item.tags) : ["Drizzle", "PostgreSQL", "Next.js"],
    icon: item.type === "education" ? GraduationCap : Briefcase,
  }));

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 select-none">
      {/* ═══ VERTICAL PIPELINE TRACK ═══ */}
      {/* Desktop: Center track, Mobile: Left track */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-border/40 -translate-x-1/2 z-0">
        {/* Neon glowing center progress line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={active !== undefined ? { scaleY: active ? 1 : 0 } : undefined}
          whileInView={active === undefined ? { scaleY: 1 } : undefined}
          viewport={active === undefined ? { once: false, amount: 0.05 } : undefined}
          transition={{ 
            duration: active ? 1.2 : 0, 
            ease: "easeInOut", 
            delay: active ? baseDelay : 0 
          }}
          className="absolute top-0 left-0 w-full h-full bg-accent"
          style={{
            boxShadow: "0 0 10px var(--color-accent), 0 0 20px var(--color-accent)",
            originY: 0,
            willChange: "transform",
          }}
        />
      </div>

      {/* ═══ MILESTONE LIST ═══ */}
      <div className="space-y-12 relative z-10">
        {milestones.map((item, index) => {
          const Icon = item.icon;
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start md:items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Left/Right Card Panel - sliding spring transitions */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                animate={
                  active !== undefined
                    ? {
                        opacity: active ? 1 : 0,
                        x: active ? 0 : isEven ? 50 : -50,
                      }
                    : undefined
                }
                whileInView={active === undefined ? { opacity: 1, x: 0 } : undefined}
                viewport={active === undefined ? { once: false, amount: 0.05 } : undefined}
                transition={
                  active !== undefined && !active
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 140,
                        damping: 18,
                        delay: active ? baseDelay + index * 0.15 : 0,
                      }
                }
                style={{ willChange: "transform, opacity" }}
                className={`w-full md:w-[calc(50%-28px)] pl-12 md:pl-0 ${
                  isEven ? "md:pr-10 text-left md:text-right" : "md:pl-10 text-left"
                }`}
              >
                <div
                  className="bg-surface/60 border border-border/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-accent/40 transition-colors duration-300 relative group overflow-hidden"
                  data-cursor="magnetic"
                >
                  {/* Neon light corner glare */}
                  <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-accent/4 rounded-full blur-2xl group-hover:bg-accent/8 transition-colors pointer-events-none" />

                  {/* Year Tag */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-subtle border border-accent/20 text-[10px] font-semibold tracking-wider text-accent uppercase mb-3 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    {item.year}
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="font-display font-bold text-base text-text tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-accent font-semibold mb-3">
                    {item.company}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-[11px] text-text-secondary leading-relaxed mb-4 max-w-lg ${
                      isEven ? "md:ml-auto" : ""
                    }`}
                  >
                    {item.desc}
                  </p>

                  {/* Badges */}
                  <div
                    className={`flex flex-wrap gap-1.5 ${
                      isEven ? "md:justify-end" : "justify-start"
                    }`}
                  >
                    {item.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[9px] px-2.5 py-0.5 rounded-full bg-border/30 text-text-secondary border border-border/10 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ═══ CENTRAL NEON TIMELINE NODE ═══ */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={active !== undefined ? { scale: active ? 1 : 0 } : undefined}
                  whileInView={active === undefined ? { scale: 1 } : undefined}
                  viewport={active === undefined ? { once: false, amount: 0.05 } : undefined}
                  transition={
                    active !== undefined && !active
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 220,
                          damping: 15,
                          delay: active ? baseDelay + index * 0.15 : 0,
                        }
                  }
                  className="w-9 h-9 rounded-full bg-surface border border-accent flex items-center justify-center shadow-lg relative group cursor-pointer"
                  data-cursor="magnetic"
                  style={{
                    boxShadow: "0 0 12px color-mix(in srgb, var(--color-accent) 40%, transparent)",
                    willChange: "transform",
                  }}
                >
                  {/* Central Icon */}
                  <Icon className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />

                  {/* Secondary orbit halo glow (pulse animation) */}
                  <div className="absolute inset-0 rounded-full border border-accent/25 scale-120 animate-pulse pointer-events-none" />
                </motion.div>
              </div>

              {/* Spacing spacer column for desktop layout */}
              <div className="hidden md:block w-[calc(50%-28px)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
