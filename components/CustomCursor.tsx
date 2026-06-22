"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  // All mutable state stored in refs to avoid re-renders and effect re-creation
  const stateRef = useRef({
    hoveredType: null as string | null,
    cursorText: "",
    isClicked: false,
    magneticElement: null as HTMLElement | null,
  });

  // Core coordinates
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect hover zones only when entering new elements
      const cursorEl = target.closest("[data-cursor]") as HTMLElement;
      const magneticEl = target.closest("[data-magnetic]") as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button']") as HTMLElement;

      if (cursorEl) {
        const type = cursorEl.getAttribute("data-cursor") || "view";
        stateRef.current.hoveredType = type;
        stateRef.current.cursorText = type.toUpperCase();
      } else if (magneticEl || interactiveEl) {
        stateRef.current.hoveredType = "magnetic";
        stateRef.current.cursorText = "";
      } else {
        stateRef.current.hoveredType = null;
        stateRef.current.cursorText = "";
      }

      if (magneticEl) {
        stateRef.current.magneticElement = magneticEl;
      } else if (interactiveEl && stateRef.current.hoveredType === "magnetic") {
        stateRef.current.magneticElement = interactiveEl;
      } else {
        stateRef.current.magneticElement = null;
      }
    };

    const onMouseDown = () => { stateRef.current.isClicked = true; };
    const onMouseUp = () => { stateRef.current.isClicked = false; };
    const onMouseLeaveDoc = () => setIsVisible(false);
    const onMouseEnterDoc = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("mouseenter", onMouseEnterDoc);

    // Single animation loop — never recreated
    let frameId: number;
    const update = () => {
      const { hoveredType, isClicked, magneticElement, cursorText } = stateRef.current;
      const magneticRect = magneticElement ? magneticElement.getBoundingClientRect() : null;

      // 1. Core Dot: tight, immediate spring
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.4;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.4;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 5}px, ${dotPos.current.y - 5}px, 0) rotate(45deg)`;
      }

      // 2. Fluid Ring: smooth elastic lag, or snapped onto magnetic target
      if (ringRef.current) {
        if (magneticRect) {
          const pad = 6;
          const targetW = magneticRect.width + pad * 2;
          const targetH = magneticRect.height + pad * 2;
          const targetX = magneticRect.left - pad;
          const targetY = magneticRect.top - pad;

          ringPos.current.x += (targetX - ringPos.current.x) * 0.45;
          ringPos.current.y += (targetY - ringPos.current.y) * 0.45;

          ringRef.current.style.width = `${targetW}px`;
          ringRef.current.style.height = `${targetH}px`;
          ringRef.current.style.borderRadius = "12px";
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
          ringRef.current.style.borderColor = "var(--color-accent)";
          ringRef.current.style.backgroundColor = "color-mix(in srgb, var(--color-accent) 6%, transparent)";
          ringRef.current.style.boxShadow = "0 0 15px color-mix(in srgb, var(--color-accent) 25%, transparent)";
        } else {
          const defaultSize = hoveredType === "view" || hoveredType === "visit" ? 85 : 44;
          const targetX = mousePos.current.x - defaultSize / 2;
          const targetY = mousePos.current.y - defaultSize / 2;

          ringPos.current.x += (targetX - ringPos.current.x) * 0.28;
          ringPos.current.y += (targetY - ringPos.current.y) * 0.28;

          ringRef.current.style.width = `${defaultSize}px`;
          ringRef.current.style.height = `${defaultSize}px`;
          ringRef.current.style.borderRadius = "50%";
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${isClicked ? 0.85 : 1})`;
          ringRef.current.style.borderColor = hoveredType ? "var(--color-accent)" : "color-mix(in srgb, var(--color-accent) 38%, transparent)";
          ringRef.current.style.backgroundColor = hoveredType ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "transparent";
          ringRef.current.style.boxShadow = hoveredType ? "0 0 10px color-mix(in srgb, var(--color-accent) 15%, transparent)" : "none";
        }

        // Update text content directly via DOM (avoids React re-render)
        if (textRef.current) {
          const showText = hoveredType === "view" || hoveredType === "visit";
          textRef.current.style.display = showText ? "block" : "none";
          if (showText) {
            textRef.current.textContent = cursorText;
          }
        }
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("mouseenter", onMouseEnterDoc);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* ═══ CORE DIAMOND DOT ═══ */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "var(--color-accent)",
          boxShadow: "0 0 6px var(--color-accent)",
          transform: "rotate(45deg)",
          willChange: "transform",
        }}
      />

      {/* ═══ FLUID OUTER BUBBLE ═══ */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 border border-solid pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{
          willChange: "transform, width, height",
          transition: "border-radius 0.15s ease, border-color 0.1s ease, background-color 0.1s ease",
        }}
      >
        {/* Glow Action Text inside custom bubble */}
        <span
          ref={textRef}
          className="text-[10px] font-bold font-mono tracking-widest text-accent"
          style={{
            textShadow: "0 0 6px color-mix(in srgb, var(--color-accent) 80%, transparent)",
            display: "none",
          }}
        />
      </div>
    </>
  );
}
