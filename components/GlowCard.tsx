"use client";

import React, { type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] shadow-2xl border-2 border-border/40 hover:border-accent/35 bg-surface/90 transition-colors duration-200 mt-10 sm:mt-12 lg:mt-16 ${className}`}
      style={{
        minHeight: "65vh",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        // Promote to own GPU composite layer — isolates paint from rest of page
        willChange: "transform",
        // Contain layout/style/paint so hover changes don't affect outside elements
        contain: "layout style paint",
      }}
    >
      {/* ═══ TOP-RIGHT GLOW — opacity-only transition, GPU-composited ═══ */}
      <div
        className="pointer-events-none absolute -top-[120px] -right-[120px] w-[400px] h-[400px] rounded-full z-0"
        style={{
          background: "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 35%, transparent) 0%, color-mix(in srgb, var(--color-accent) 10%, transparent) 45%, transparent 75%)",
          // Static layer — never changes, always GPU composited
          willChange: "transform",
        }}
      />

      {/* ═══ BOTTOM-LEFT GLOW ═══ */}
      <div
        className="pointer-events-none absolute -bottom-[100px] -left-[100px] w-[360px] h-[360px] rounded-full z-0"
        style={{
          background: "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 25%, transparent) 0%, color-mix(in srgb, var(--color-accent) 8%, transparent) 45%, transparent 75%)",
          willChange: "transform",
        }}
      />

      {/* ═══ GLASS OVERLAY ═══ */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.01) 100%)",
        }}
      />

      {/* ═══ GRAIN TEXTURE — static CSS class, promoted GPU layer, never re-rasterizes ═══ */}
      <div className="glowcard-grain" />

      {/* Content */}
      <style>{`
        /* Shrink internal elements to fit the default 75vh GlowCard on smaller screen heights, 
           preventing it from clipping content. */
        @media (max-height: 800px) {
          .glow-content-wrapper .lg\\:p-14 { padding: 1.25rem !important; }
          .glow-content-wrapper .mb-12 { margin-bottom: 1.25rem !important; }
          .glow-content-wrapper .md\\:h-\\[340px\\] { height: 260px !important; min-height: 260px !important; }
          .glow-content-wrapper .md\\:h-\\[340px\\] > div { min-height: auto !important; }
        }
        @media (max-height: 650px) {
          .glow-content-wrapper .lg\\:p-14, .glow-content-wrapper .sm\\:p-10 { padding: 1rem !important; }
          .glow-content-wrapper .mb-12 { margin-bottom: 1rem !important; }
          .glow-content-wrapper .md\\:h-\\[340px\\] { height: 220px !important; min-height: 220px !important; }
        }
        @media (max-height: 550px) {
          .glow-content-wrapper .lg\\:p-14, .glow-content-wrapper .sm\\:p-10, .glow-content-wrapper .p-6 { padding: 0.75rem !important; }
          .glow-content-wrapper .mb-12 { margin-bottom: 0.75rem !important; }
          .glow-content-wrapper .md\\:h-\\[340px\\] { height: 180px !important; min-height: 180px !important; }
        }
      `}</style>
      <div className="relative z-10 w-full h-full glow-content-wrapper">
        {children}
      </div>
    </div>
  );
}
