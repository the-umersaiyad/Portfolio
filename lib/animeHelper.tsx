import React, { useEffect, useState, RefObject } from "react";

/**
 * Custom hook to manage active states for animations on both desktop page slides
 * and mobile/responsive scroll-linked intersections.
 */
export function useAnimateActive(ref: RefObject<HTMLElement | null>, manualActive?: boolean) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (manualActive !== undefined) {
      setIsActive(manualActive);
      return;
    }

    if (typeof window === "undefined" || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, manualActive]);

  return isActive;
}

/**
 * Splits text into a series of staggered React span elements.
 * Generates the identical structure on SSR and client, ensuring ZERO hydration mismatches.
 */
export function splitTextToSpans(text: string, mode: "chars" | "words" = "chars") {
  if (!text) return [];

  if (mode === "words") {
    return text.split(" ").map((word, idx) => {
      // Add a space span after each word (except the last one) to maintain natural text wrapping
      return (
        <span key={`w-grp-${idx}`} className="inline-block">
          <span className="inline-block anime-word-item origin-bottom select-none">
            {word}
          </span>
          {idx < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      );
    });
  }

  // Split into characters, keeping words grouped to allow natural wrap behavior
  const words = text.split(" ");
  let overallCharIdx = 0;

  return words.map((word, wIdx) => {
    return (
      <span key={`w-grp-${wIdx}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char) => {
          const key = `c-${overallCharIdx++}`;
          return (
            <span
              key={key}
              className="inline-block anime-char-item origin-bottom select-none"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          );
        })}
        {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    );
  });
}

/**
 * Common Anime.js / WAAPI configuration presets for consistent branding aesthetics.
 */
export const animePresets = {
  // Ultra smooth premium spring/elastic feel easing curves
  easings: {
    premiumOut: "cubic-bezier(0.25, 1, 0.5, 1)", // Elegant smooth decelerate
    premiumInOut: "cubic-bezier(0.76, 0, 0.24, 1)", // Expressive dynamic shift
    springSoft: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Micro-bounce elastic curves
  },
  
  // Stagger intervals (in milliseconds)
  stagger: {
    chars: 20,
    words: 40,
    cards: 100,
  }
};
