"use client";

import React, { useEffect, useRef } from "react";
import { waapi, stagger } from "animejs";
import { splitTextToSpans, animePresets } from "@/lib/animeHelper";

interface AnimeTextRevealProps {
  text: string;
  mode?: "chars" | "words";
  active?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimeTextReveal({
  text,
  mode = "chars",
  active = true,
  delay = 0,
  duration = 800,
  className = "",
}: AnimeTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const selector = mode === "chars" ? ".anime-char-item" : ".anime-word-item";
    const targets = containerRef.current.querySelectorAll(selector);

    if (targets.length === 0) return;

    // Reset initial style to hidden to prevent FOUC (Flash of Unstyled Content)
    targets.forEach((el: any) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
    });

    if (!active) return;

    // Build staggered reveal using high-performance hardware-accelerated WAAPI engine
    const staggerTime = mode === "chars" ? animePresets.stagger.chars : animePresets.stagger.words;

    animRef.current = waapi.animate(targets, {
      opacity: [0, 1],
      translateY: ["16px", "0px"],
      duration: duration,
      delay: stagger(staggerTime, { start: delay }),
      ease: animePresets.easings.premiumOut,
    });

    return () => {
      if (animRef.current) {
        animRef.current.cancel();
      }
    };
  }, [active, text, mode, delay, duration]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {splitTextToSpans(text, mode)}
    </span>
  );
}
