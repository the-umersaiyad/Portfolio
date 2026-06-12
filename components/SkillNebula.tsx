"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal, Code2, Database, Settings, Sparkles, Star, ShieldCheck } from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";

interface Skill {
  name: string;
  proficiency: number;
  level: "Advanced" | "Proficient" | "Intermediate";
  years: string;
  description: string;
  terminalLogs: string[];
}

const skillsData: Record<string, Skill[]> = {
  "Frontend & Core": [
    {
      name: "React.js",
      proficiency: 95,
      level: "Advanced",
      years: "1+ Years",
      description: "Building fast reactive views, custom hooks pipelines, state stores, and dynamic components.",
      terminalLogs: [
        "npm run test --suite=React",
        "✔ Virtual DOM Tree Reconciliation: PASS",
        "✔ State Hook Store Synchronization: PASS",
        "✔ Fiber Reconciliation Engine: STABLE",
        "STATUS: SUCCESS (React loaded 100%)"
      ]
    },
    {
      name: "Next.js",
      proficiency: 90,
      level: "Advanced",
      years: "1+ Years",
      description: "Developing production-grade SSR, static generation, app directory routers, and server actions.",
      terminalLogs: [
        "next build --optimize-static",
        "✔ Server Actions Pipeline: COMPILING",
        "✔ Incremental Static Regeneration: COMPLETED",
        "✔ Turbopack Build Optimizer: SUCCESS",
        "STATUS: COMPILED (Next.js optimized)"
      ]
    },
    {
      name: "TypeScript",
      proficiency: 88,
      level: "Proficient",
      years: "1+ Years",
      description: "Structuring type-safe components, strict generic interfaces, and comprehensive compile safety.",
      terminalLogs: [
        "tsc --noEmit --strict",
        "✔ Structuring strict generic interfaces: OK",
        "✔ Strict Compiler Null Verification: OK",
        "✔ Complete Type Compilation: SAFE",
        "STATUS: STABLE (0 errors found)"
      ]
    },
    {
      name: "JavaScript",
      proficiency: 92,
      level: "Advanced",
      years: "2+ Years",
      description: "Developing modern ES6+, high-fidelity interactive DOM flows, async patterns, and custom events.",
      terminalLogs: [
        "node run-spec corejs",
        "✔ Asynchronous Promises Event Loop: RUNNING",
        "✔ ES6 Module Resolvers: PARSED",
        "✔ Direct DOM Interpolation Engine: OPTIMIZED",
        "STATUS: CORE LOOPS ACTIVE"
      ]
    }
  ],
  "Backend & APIs": [
    {
      name: "Node.js",
      proficiency: 90,
      level: "Advanced",
      years: "1+ Years",
      description: "Engineering high-performance RESTful APIs, cluster workers, stream processing pipelines, and event emitters.",
      terminalLogs: [
        "node --expose-gc server.js",
        "✔ V8 Memory Allocation: SECURE",
        "✔ High-Performance REST Core APIs: LISTENING",
        "✔ Cluster Worker Process Pool: ACTIVE",
        "STATUS: SERVER READY"
      ]
    },
    {
      name: "Express.js",
      proficiency: 92,
      level: "Advanced",
      years: "1+ Years",
      description: "Structuring robust microservices architectures, custom middleware pipelines, and scalable route guards.",
      terminalLogs: [
        "express init --router=v1",
        "✔ Route Router Map Construction: PARSED",
        "✔ Custom Route Guards & Middleware: LOADED",
        "✔ Request-Response Cycle Hook: ACTIVE",
        "STATUS: ROUTES SECURED"
      ]
    },
    {
      name: "Python",
      proficiency: 78,
      level: "Intermediate",
      years: "1 Year",
      description: "Writing automation scripts, server integrations, and basic machine learning/data pipelines.",
      terminalLogs: [
        "python script.py --analyze",
        "✔ Async System Automation Hooks: READY",
        "✔ Volumetric Data Processing: OK",
        "✔ Pandas Array Mapping: COMPILED",
        "STATUS: PROCESS ENDED"
      ]
    }
  ],
  "Databases & DevOps": [
    {
      name: "PostgreSQL",
      proficiency: 85,
      level: "Proficient",
      years: "1+ Years",
      description: "Designing relational database schemas, complex join queries, and indexing transactions.",
      terminalLogs: [
        "psql -d production_db",
        "✔ Relational Indexing Transactions: OK",
        "✔ Database Connection Pool size=20: CONNECTED",
        "✔ Dynamic View Joins Query: EXECUTED",
        "STATUS: PG DATABASE READY"
      ]
    },
    {
      name: "Drizzle ORM",
      proficiency: 88,
      level: "Proficient",
      years: "6+ Months",
      description: "Constructing type-safe SQL relational mappings and database schema migration workflows.",
      terminalLogs: [
        "drizzle-kit push:pg",
        "✔ Schema Migration DDL: APPLIED",
        "✔ Strict Typescript Database Mapping: SYNCED",
        "✔ Relational Query Engine: ACTIVE",
        "STATUS: DRIZZLE ONLINE"
      ]
    },
    {
      name: "MongoDB",
      proficiency: 82,
      level: "Proficient",
      years: "1+ Years",
      description: "Developing unstructured document schemas, aggregation pipelines, and high-frequency indexing.",
      terminalLogs: [
        "mongosh --host cluster0",
        "✔ Document Collection Validation: PASSED",
        "✔ High-Frequency DB Index Map: LOADED",
        "✔ Schema Aggregation Pipelines: ACTIVE",
        "STATUS: MONGO CONSTRUCTED"
      ]
    },
    {
      name: "Docker",
      proficiency: 75,
      level: "Intermediate",
      years: "6+ Months",
      description: "Containerizing MERN/PostgreSQL microservices and maintaining modular compose multi-container layers.",
      terminalLogs: [
        "docker-compose up --build",
        "✔ Multi-container Compose Orchestrator: ACTIVE",
        "✔ Sandbox Production Container Isolation: OK",
        "✔ Port Binding & Volumes Mapping: BOUND",
        "STATUS: CONTAINER UP"
      ]
    }
  ],
  "Tools & Design": [
    {
      name: "Git",
      proficiency: 90,
      level: "Advanced",
      years: "2+ Years",
      description: "Command line git version control, branch merging rebases, and clean pull request workflows.",
      terminalLogs: [
        "git status && git log -n 1",
        "✔ Branch Tracking rebase check: SYNCED",
        "✔ Commits Integrity Signatures: VERIFIED",
        "✔ Working Tree Status: CLEAN",
        "STATUS: VERSION SECURE"
      ]
    },
    {
      name: "Figma",
      proficiency: 80,
      level: "Proficient",
      years: "1 Year",
      description: "Creating UX wireframes, modern dashboard layouts, typography styles, and interactive prototypes.",
      terminalLogs: [
        "figma-sync --get-tokens",
        "✔ Design System Global CSS Variables: OK",
        "✔ Layout Wireframe Vector Grids: LOADED",
        "✔ Interactive Flow Prototypes: CACHED",
        "STATUS: DESIGNS SYNCED"
      ]
    },
    {
      name: "Tailwind CSS",
      proficiency: 95,
      level: "Advanced",
      years: "2+ Years",
      description: "Developing fluid responsive utilities, dark mode variables, and rich custom animation classes.",
      terminalLogs: [
        "npx tailwindcss -i input.css",
        "✔ Class Token Tree-Shaking: OPTIMIZED",
        "✔ Utility Grid/Flex Map Engine: PARSED",
        "✔ Hardware-Accelerated Variables: READY",
        "STATUS: STYLES BUILD SUCCESS"
      ]
    }
  ]
};

const categoryIcons: Record<string, any> = {
  "Frontend & Core": Code2,
  "Backend & APIs": Settings,
  "Databases & DevOps": Database,
  "Tools & Design": Sparkles,
};

// ─── HIGH-PERFORMANCE STANDALONE SUB-COMPONENTS (Isolates renders completely!) ───

interface TerminalConsoleProps {
  skill: Skill;
}

// 1. ISOLATED TERMINAL CARD (Only re-renders locally on typewriter ticks!)
function TerminalConsole({ skill }: TerminalConsoleProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const typewriterTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typewriterTimer.current) clearInterval(typewriterTimer.current);
    
    setTerminalLines([]);
    let lineIdx = 0;
    
    // Initial trigger line
    setTerminalLines([`$ ${skill.terminalLogs[0]}`]);

    typewriterTimer.current = setInterval(() => {
      lineIdx++;
      if (lineIdx < skill.terminalLogs.length) {
        setTerminalLines((prev) => [...prev, skill.terminalLogs[lineIdx]]);
      } else {
        if (typewriterTimer.current) clearInterval(typewriterTimer.current);
      }
    }, 90);

    return () => {
      if (typewriterTimer.current) clearInterval(typewriterTimer.current);
    };
  }, [skill]);

  return (
    <div className="lg:col-span-4 bg-surface/60 border border-border/30 rounded-2xl p-4 shadow-xl flex flex-col min-h-[190px] font-mono select-text relative overflow-hidden group">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="flex items-center justify-between border-b border-border/10 pb-1.5 mb-2.5">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[9px] text-accent/70 font-semibold tracking-wider">sh - sys_log</span>
      </div>

      <div className="flex-grow text-[9px] leading-normal text-emerald-400 space-y-1 overflow-hidden">
        {terminalLines.map((line, idx) => {
          const isCommand = line.startsWith("$");
          const isSuccess = line.startsWith("✔") || line.startsWith("STATUS:");
          
          let colorClass = "text-text-secondary/75";
          if (isCommand) colorClass = "text-cyan-400 font-semibold";
          else if (isSuccess) colorClass = "text-accent font-semibold";

          return (
            <div key={idx} className={`${colorClass} flex items-start gap-1`}>
              {isCommand ? "" : "  "}
              <span>{line}</span>
            </div>
          );
        })}
        
        {terminalLines.length < skill.terminalLogs.length && (
          <span className="inline-block w-1 h-3 bg-accent ml-0.5 animate-pulse" />
        )}
      </div>

      <div className="absolute top-2 right-3 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <Terminal className="w-20 h-20 text-text-muted" />
      </div>
    </div>
  );
}

// 2. ISOLATED PROGRESS RING (Spacious layout, no clipping, hardware-accelerated!)
function SkillProgressRing({ proficiency }: { proficiency: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  return (
    <div className="relative w-[76px] h-[76px] flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 80 80">
        {/* Unfilled track background */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-border/10 fill-none"
          strokeWidth="4.5"
        />
        {/* Dynamic, fully visible progress ring (CSS hardware-accelerated transitions) */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-accent fill-none"
          strokeWidth="4.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.55))",
            transition: "stroke-dashoffset 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        />
      </svg>
      {/* Centered percentage text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[12px] font-display font-black text-text leading-none">
          {proficiency}%
        </span>
      </div>
    </div>
  );
}

// ─── MAIN SKILLS DASHBOARD COMPONENT ───

export function SkillNebula({ active }: { active?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend & Core");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skillsData["Frontend & Core"][0]);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Set selected skill when active category changes
  useEffect(() => {
    const firstSkill = skillsData[activeCategory][0];
    setSelectedSkill(firstSkill);
  }, [activeCategory]);

  // High-Performance 85ms Hover Debounce to eliminate lag completely during mouse sweeps
  const handleSkillHover = (skill: Skill) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    
    hoverTimeout.current = setTimeout(() => {
      setSelectedSkill(skill);
    }, 85);
  };

  const handleSkillLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  const categories = Object.keys(skillsData);
  const currentSkills = skillsData[activeCategory] || [];

  return (
    <div className="w-full select-none text-left">
      {/* 🍱 STREAMLINED SLICK COMPACT BENTO GRID 🍱 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full max-w-5xl mx-auto">
        
        {/* ─── CARD 1: COMPACT CATEGORY DECK (lg:col-span-3) ─── */}
        <div className="lg:col-span-3 bg-surface/30 backdrop-blur-md border border-border/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg min-h-[190px]">
          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-accent uppercase mb-3 flex items-center gap-1.5 opacity-80">
              <Star className="w-3 h-3" /> DOMAINS
            </h4>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat];
                const isSelected = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-left transition-all duration-300 relative group cursor-pointer border ${
                      isSelected
                      ? "bg-accent border-accent/10 text-white shadow-md shadow-accent/10"
                        : "bg-surface/40 border-border/10 text-text-secondary hover:text-accent hover:bg-surface/85"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white animate-pulse" : "text-text-muted group-hover:text-accent"}`} />
                    <span>{cat}</span>
                    {isSelected && (
                      <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="hidden lg:block pt-3 border-t border-border/10 mt-3">
            <span className="text-[9px] text-text-muted flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-accent" /> Select category above
            </span>
          </div>
        </div>

        {/* ─── CARD 2: INTEGRATED CHIPS & METRICS (lg:col-span-5) ─── */}
        {/* We use flex-col gap-3 with mt-auto to completely eliminate the black gap layout clutter! */}
        <div className="lg:col-span-5 bg-surface/30 backdrop-blur-md border border-border/40 rounded-2xl p-4 shadow-lg flex flex-col gap-3 min-h-[190px]">
          {/* Top segment: Skill matrix chips */}
          <div className="flex-grow">
            <h4 className="text-[10px] font-bold tracking-widest text-accent uppercase mb-3 flex items-center gap-1.5 opacity-80">
              <Code2 className="w-3 h-3" /> SKILL MATRIX
            </h4>
            
            <div className="flex flex-wrap gap-1.5">
              {currentSkills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onMouseEnter={() => handleSkillHover(skill)}
                    onMouseLeave={handleSkillLeave}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-medium transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-accent-subtle border-accent/70 text-accent shadow-sm"
                        : "bg-surface/20 border-border/10 text-text-secondary hover:border-accent/30 hover:text-accent"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-accent" : "bg-text-muted/60"}`} />
                    {skill.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom segment: Integrated progress ring & metrics (glued with mt-auto, no dead gap!) */}
          <div className="flex items-center gap-4 pt-3 border-t border-border/10 mt-auto">
            {selectedSkill && <SkillProgressRing proficiency={selectedSkill.proficiency} />}

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <h3 className="font-display font-extrabold text-sm text-text tracking-tight leading-none min-h-[15px] truncate">
                  {selectedSkill && <ScrambleText text={selectedSkill.name} className="font-display font-extrabold text-sm" />}
                </h3>
                <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-accent-subtle text-accent border border-accent/20 font-bold uppercase tracking-wider scale-90 origin-left">
                  {selectedSkill?.level}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-text-secondary/80">
                {selectedSkill?.description}
              </p>
            </div>
          </div>
        </div>

        {/* ─── CARD 3: HIGH-PERFORMANCE RETRO DEV CONSOLE (lg:col-span-4) ─── */}
        {selectedSkill && <TerminalConsole skill={selectedSkill} />}

      </div>
    </div>
  );
}
