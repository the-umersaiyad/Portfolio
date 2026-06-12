"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectDeckProps {
  projects: Project[];
}

export function ProjectDeck({ projects }: ProjectDeckProps) {
  // Store the active index layout cycle: e.g. [0, 1, 2]
  const [deck, setDeck] = useState(projects.map((_, i) => i));
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for swipe tracker
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-25, 25]);
  const opacity = useTransform(dragX, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 130;
    const velocityThreshold = 400;

    // Determine if user swiped far or fast enough to throw it off the deck
    if (
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > velocityThreshold
    ) {
      // Swipe away animation direction
      const direction = info.offset.x > 0 ? 1 : -1;

      // Cycle front card to bottom after delay to complete swipe animation
      setTimeout(() => {
        setDeck((prev) => {
          const next = [...prev];
          const first = next.shift()!;
          next.push(first);
          return next;
        });
        dragX.set(0);
        dragY.set(0);
      }, 250);
    }
  };

  const handleNext = () => {
    setDeck((prev) => {
      const next = [...prev];
      const first = next.shift()!;
      next.push(first);
      return next;
    });
  };

  return (
    <div className="relative w-full max-w-[700px] min-h-[420px] sm:min-h-[460px] mx-auto flex flex-col items-center justify-center">
      {/* 3D Stack/Deck Wrap */}
      <div
        className="relative w-full max-w-[400px] h-[320px] sm:h-[350px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {deck.map((projectIdx, stackPosition) => {
            const project = projects[projectIdx];
            const isTop = stackPosition === 0;

            // Layout states based on position in stack
            // If hovered, we trigger the fan layout outwards
            let xOffset = 0;
            let yOffset = 0;
            let scale = 1;
            let rotateAngle = 0;
            let zIndex = 30 - stackPosition * 10;
            let opacityVal = 1 - stackPosition * 0.18;

            if (isHovered && !isTop) {
              // Fan outward layout
              if (stackPosition === 1) {
                xOffset = 110;
                yOffset = 4;
                rotateAngle = 5;
                scale = 0.96;
              } else if (stackPosition === 2) {
                xOffset = -110;
                yOffset = 4;
                rotateAngle = -5;
                scale = 0.96;
              }
            } else if (!isTop) {
              // Standard tidy overlay stack
              yOffset = stackPosition * 15;
              scale = 1 - stackPosition * 0.05;
              rotateAngle = stackPosition % 2 === 0 ? 2 : -2;
            }

            return (
              <motion.div
                key={project.title}
                drag={isTop}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.8}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  handleDragEnd(e, info);
                }}
                style={{
                  x: isTop ? dragX : undefined,
                  y: isTop ? dragY : undefined,
                  rotate: isTop ? rotate : undefined,
                  opacity: isTop ? opacity : opacityVal,
                  zIndex,
                  transformOrigin: "center bottom",
                  willChange: "transform",
                }}
                animate={{
                  x: isTop ? 0 : xOffset,
                  y: isTop ? 0 : yOffset,
                  rotate: isTop ? 0 : rotateAngle,
                  scale,
                  opacity: opacityVal,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                }}
                className={`absolute w-full max-w-[380px] h-full bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl p-0 cursor-grab active:cursor-grabbing select-none ${
                  isDragging && isTop ? "pointer-events-none" : ""
                }`}
              >
                {/* Image Wrap */}
                <div
                  className="relative w-full h-[58%] overflow-hidden bg-card pointer-events-none"
                  data-cursor="view"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    sizes="380px"
                    className="object-cover pointer-events-none select-none"
                  />
                  {/* Neon glare overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-90 pointer-events-none" />
                </div>

                {/* Info Text */}
                <div className={`px-4 py-3 sm:p-6 h-[42%] flex flex-col justify-between ${isDragging && isTop ? "pointer-events-none" : ""}`}>
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-display font-semibold text-lg text-text leading-tight select-none">
                        {project.title}
                      </h3>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-accent-subtle border border-accent/20 text-accent hover:bg-accent/20 hover:border-accent/40 transition-colors z-30"
                        data-cursor="magnetic"
                        onClick={(e) => {
                          // Prevent triggering cycle on link click
                          e.stopPropagation();
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4 select-none">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 select-none">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/10 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Stack instructions & Navigation */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <span className="text-xs text-text-muted font-mono tracking-widest uppercase">
          {isHovered ? "Hover to fan out • Drag front to swipe away" : "Drag top card to throw away • Cycle stack"}
        </span>

        {/* Floating cycle navigation buttons */}
        <button
          onClick={handleNext}
          className="px-5 py-2 text-xs font-semibold rounded-full bg-accent-subtle hover:bg-accent/20 text-accent border border-accent/20 transition-all duration-300 shadow-md active:scale-95"
          data-cursor="magnetic"
        >
          Cycle Stack
        </button>
      </div>
    </div>
  );
}
