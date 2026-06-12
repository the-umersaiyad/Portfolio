"use client";

import React, { useEffect, useState, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  active?: boolean;
  className?: string;
  triggerOnHover?: boolean;
}

const GLYPHS = "0101<>[]{}_+*&%$#@!XΞΨΩ";

export function ScrambleText({
  text,
  active = true,
  className = "",
  triggerOnHover = false,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Trigger scramble animation
  const triggerScramble = (targetText: string) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setIsScrambling(true);

    const length = targetText.length;
    let frame = 0;
    const maxFrames = 40; // Total duration of scramble reveal

    const tick = () => {
      frame++;
      const progress = frame / maxFrames;
      const revealIndex = Math.floor(progress * length);
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealIndex) {
            return targetText[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame < maxFrames) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    // Standard mount or change of active triggers scramble
    if (active) {
      triggerScramble(text);
    } else {
      setDisplayText(text);
      setIsScrambling(false);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      triggerScramble(text);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block select-none cursor-default font-display ${className}`}
      data-cursor="magnetic"
    >
      {displayText}
      
      {/* Glitch sweep scanline bar */}
      {isScrambling && (
        <span
          className="absolute inset-x-0 h-[2px] bg-accent/60 blur-[1px] pointer-events-none animate-scanline-sweep"
          style={{
            boxShadow: "0 0 8px var(--color-accent)",
          }}
        />
      )}
    </span>
  );
}
