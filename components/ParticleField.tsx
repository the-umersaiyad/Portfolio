"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";
import { scrollController } from "@/components/scrollState";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  opacity: number;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number; // 1.0 down to 0
  maxLife: number;
  opacity: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  force: number;
  life: number; // 1.0 down to 0
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trailParticlesRef = useRef<TrailParticle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    rawX: 0,
    rawY: 0,
    active: false,
  });

  const scrollProgressRef = useRef({ value: 0.0 });
  const scrollVelocityRef = useRef(0.0);
  const currentRotationRef = useRef({ x: 0, y: 0 });

  const PARTICLE_COUNT = 310; // Balanced density for smooth 60fps performance

  // Generates a thick, volumetric 3D spherical constellation galaxy shell
  const generateGalaxySphere = (count: number, width: number, height: number) => {
    const particles: Particle[] = [];
    // Majestic full-bleed radius spanning the screen bounds
    const radius = Math.max(width, height) * 0.44;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      // Volume thickness factor (0.65 to 1.35) to make a thick, rich 3D constellation galaxy
      const r = radius * (0.65 + Math.random() * 0.7);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        baseSize: Math.random() * 1.8 + 0.8, // Glowing stardust sizes
        opacity: 0.8,
      });
    }
    return particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize or regenerate galaxy sphere on resize to maintain correct proportions
      particlesRef.current = generateGalaxySphere(PARTICLE_COUNT, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracker & trailing particle spawn (throttled for performance)
    let lastTrailTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.rawX = e.clientX;
      mouseRef.current.rawY = e.clientY;
      mouseRef.current.active = true;

      // Throttle trail particle spawning to every 32ms (~30fps) for smoother main loop
      const now = performance.now();
      if (now - lastTrailTime > 32 && Math.random() < 0.4) {
        lastTrailTime = now;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.8 + 0.2;
        trailParticlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.2 + 1.0,
          life: 1.0,
          maxLife: Math.random() * 35 + 20,
          opacity: Math.random() * 0.5 + 0.4,
        });
      }

      // Constrain queue sizes
      if (trailParticlesRef.current.length > 60) {
        trailParticlesRef.current.shift();
      }
    };

    // Trigger gravity ripples on click anywhere on the page
    const handleMouseDown = (e: MouseEvent) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.38,
        speed: 8.5,
        force: 42,
        life: 1.0,
      });

      // Spawn stardust burst at click point
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;
        trailParticlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.0 + 1.2,
          life: 1.0,
          maxLife: Math.random() * 50 + 30,
          opacity: Math.random() * 0.6 + 0.4,
        });
      }
    };

    // Capture scrolling acceleration warp
    const handleWheel = (e: WheelEvent) => {
      scrollVelocityRef.current += Math.abs(e.deltaY) * 0.00075;
      if (scrollVelocityRef.current > 1.8) {
        scrollVelocityRef.current = 1.8; // Cap to keep starfield bounds realistic
      }
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mousedown", handleMouseDown, { passive: true });
    }
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Scroll-Linked smooth 3D Rotation trigger
    const unsubscribe = scrollController.subscribe(() => {
      const page = scrollController.currentPage;
      const totalPages = scrollController.totalPages - 1;
      const progress = totalPages > 0 ? page / totalPages : 0;

      // Boost scroll velocity instantly during page transition clicks
      scrollVelocityRef.current += 0.85;
      if (scrollVelocityRef.current > 1.8) {
        scrollVelocityRef.current = 1.8;
      }

      // Smoothly animate scroll rotation target progress using Anime.js v4 options
      animate(scrollProgressRef.current, {
        value: progress,
        duration: 1500,
        ease: "easeOutExpo",
      });
    });

    let currentAccent = "#10b981";
    const updateThemeColor = () => {
      const val = getComputedStyle(document.body).getPropertyValue('--color-accent').trim();
      if (val) currentAccent = val;
    };
    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Render Canvas Loop
    let time = 0;
    const render = () => {
      // Smooth decay of scroll velocity towards 0 (inertia friction)
      scrollVelocityRef.current *= 0.94;
      const warpScale = 1.0 + scrollVelocityRef.current * 0.65;
      const rotationSpeedFactor = 1.0 + scrollVelocityRef.current * 3.2;

      time += 0.003 * rotationSpeedFactor; // Cosmic slow rotation accelerated during scrolling
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 750; // Focal length for perfect 3D perspective mapping

      // Smooth mouse rotation drift
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const prog = scrollProgressRef.current.value;

      // Unified 3D rotation: rotates entire galaxy sphere based on page scroll progress + mouse movement + time
      currentRotationRef.current.y = prog * Math.PI * 0.65 + time * 0.12 + mouseRef.current.x * 0.16;
      currentRotationRef.current.x = prog * Math.PI * 0.45 + time * 0.04 + mouseRef.current.y * 0.16;

      const cosY = Math.cos(currentRotationRef.current.y);
      const sinY = Math.sin(currentRotationRef.current.y);
      const cosX = Math.cos(currentRotationRef.current.x);
      const sinX = Math.sin(currentRotationRef.current.x);

      // Update shockwaves
      shockwavesRef.current.forEach((sw) => {
        sw.radius += sw.speed;
        sw.life = 1.0 - sw.radius / sw.maxRadius;
      });

      // Filter out completed shockwaves
      shockwavesRef.current = shockwavesRef.current.filter((sw) => sw.life > 0);

      // Draw faint, expanding ripple rings representing the gravity distortion waves
      shockwavesRef.current.forEach((sw) => {
        ctx.globalAlpha = sw.life * 0.18;
        ctx.strokeStyle = currentAccent;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = sw.life * 0.06;
        ctx.lineWidth = 6.0;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1.0;

      // Mouse Screen coordinates for gravity interactive ripple physics
      const mX = mouseRef.current.rawX;
      const mY = mouseRef.current.rawY;

      // Check for skills gravity target well
      let skillsTarget: { x: number; y: number } | null = null;
      if (typeof window !== "undefined" && (window as any).skillsNebulaTarget) {
        skillsTarget = (window as any).skillsNebulaTarget;
      }

      // Map 3D to 2D
      const projectedParticles = particlesRef.current.map((p) => {
        // Apply hyperspace star-burst warp scale radially in 3D
        const px = p.x * warpScale;
        const py = p.y * warpScale;
        const pz = p.z * warpScale;

        // Rotate Y axis
        let x1 = px * cosY - pz * sinY;
        let z1 = pz * cosY + px * sinY;

        // Rotate X axis
        let y2 = py * cosX - z1 * sinX;
        let z2 = z1 * cosX + py * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 * 0.4 + 320); 
        let screenX = centerX + x1 * scale;
        let screenY = centerY + y2 * scale;
        const radius = p.baseSize * scale;

        // --- Shockwave Physics Displacement ---
        shockwavesRef.current.forEach((sw) => {
          const dx = screenX - sw.x;
          const dy = screenY - sw.y;
          const distSq = dx * dx + dy * dy;
          const dist = distSq > 0 ? Math.sqrt(distSq) : 0;
          const thickness = 130; // Shockwave impact thickness boundary
          const distFromWave = Math.abs(dist - sw.radius);

          if (distFromWave < thickness) {
            const waveForce = (1.0 - distFromWave / thickness) * sw.force * sw.life;
            if (dist > 0) {
              screenX += (dx / dist) * waveForce;
              screenY += (dy / dist) * waveForce;
            }
          }
        });

        // --- Active Gravity Follow Cursor Swirl & Repulsion Physics ---
        if (!isTouch && mouseRef.current.active) {
          const dx = screenX - mX;
          const dy = screenY - mY;
          const distSq = dx * dx + dy * dy;
          
          // Avoid expensive Math.sqrt/Math.hypot for particles outside interaction field (220px)
          if (distSq < 48400) { // 220^2 = 48400
            const dist = Math.sqrt(distSq);
            const force = (220 - dist) / 220;

            // 1. Swirl orbital tangent force around mouse position
            const swirlStrength = force * 14;
            screenX += (-dy / (dist || 1)) * swirlStrength;
            screenY += (dx / (dist || 1)) * swirlStrength;

            // 2. Gentle push repulsion force outwards
            screenX += (dx / (dist || 1)) * force * 35;
            screenY += (dy / (dist || 1)) * force * 35;
          }
        }

        // --- Skills Tag Gravity Nebula Attraction Physics ---
        if (skillsTarget) {
          const dx = skillsTarget.x - screenX;
          const dy = skillsTarget.y - screenY;
          const distSq = dx * dx + dy * dy;
          
          if (distSq > 25) { // 5^2 = 25
            const dist = Math.sqrt(distSq);
            const pullForce = Math.min(1.0, 150 / dist) * 2.8;
            screenX += (dx / dist) * pullForce * 4.0;
            screenY += (dy / dist) * pullForce * 4.0;
            
            const swirlStrength = Math.min(1.0, 150 / dist) * 1.5;
            screenX += (-dy / dist) * swirlStrength * 2.0;
            screenY += (dx / dist) * swirlStrength * 2.0;
          }
        }

        return { screenX, screenY, radius, zDepth: z2 };
      });

      // Draw Constellation connection lines (batched into single path for GPU efficiency)
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = currentAccent;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      
      for (let i = 0; i < projectedParticles.length; i++) {
        // Connect sequential ribbons
        if (i < projectedParticles.length - 1) {
          const pA = projectedParticles[i];
          const pB = projectedParticles[i + 1];
          const dx = pA.screenX - pB.screenX;
          const dy = pA.screenY - pB.screenY;
          const screenDistSq = dx * dx + dy * dy;
          
          if (
            screenDistSq < 15625 && // 125^2 — avoids Math.hypot
            pA.screenX > 0 && pA.screenX < canvas.width &&
            pA.screenY > 0 && pA.screenY < canvas.height
          ) {
            ctx.moveTo(pA.screenX, pA.screenY);
            ctx.lineTo(pB.screenX, pB.screenY);
          }
        }

        // Connect cross grids
        if (i < projectedParticles.length - 4) {
          const pA = projectedParticles[i];
          const pB = projectedParticles[i + 4];
          const dx = pA.screenX - pB.screenX;
          const dy = pA.screenY - pB.screenY;
          const screenDistSq = dx * dx + dy * dy;

          if (
            screenDistSq < 21025 && // 145^2 — avoids Math.hypot
            pA.screenX > 0 && pA.screenX < canvas.width &&
            pA.screenY > 0 && pA.screenY < canvas.height
          ) {
            ctx.moveTo(pA.screenX, pA.screenY);
            ctx.lineTo(pB.screenX, pB.screenY);
          }
        }
      }
      ctx.stroke();

      // --- Interactive Cursor Constellation Snapping Lines ---
      if (!isTouch && mouseRef.current.active) {
        const limitSq = 52900; // 230^2 = 52900
        const closest: { idx: number; dist: number }[] = [];
        
        // Filter elements in-place with O(N) loop and avoid square root for far particles
        for (let i = 0; i < projectedParticles.length; i++) {
          const p = projectedParticles[i];
          const dx = p.screenX - mX;
          const dy = p.screenY - mY;
          const distSq = dx * dx + dy * dy;
          if (distSq < limitSq) {
            closest.push({ idx: i, dist: Math.sqrt(distSq) });
          }
        }
        
        // Sort only the small subset of particles close to mouse
        closest.sort((a, b) => a.dist - b.dist);
        const topClosest = closest.slice(0, 6);

        topClosest.forEach((c) => {
          const p = projectedParticles[c.idx];
          const proximityRatio = 1.0 - c.dist / 230;
          const opacity = proximityRatio * 0.28;

          ctx.globalAlpha = opacity;
          ctx.strokeStyle = currentAccent;
          ctx.lineWidth = 0.95;
          ctx.beginPath();
          ctx.moveTo(mX, mY);
          ctx.lineTo(p.screenX, p.screenY);
          ctx.stroke();

          // Delicate stardust halos on snapped stars
          ctx.globalAlpha = opacity * 0.7;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, p.radius * 2.6, 0, Math.PI * 2);
          ctx.stroke();
        });
      }
      ctx.globalAlpha = 1.0;

      // Draw all stars with depth shading
      projectedParticles.forEach((p) => {
        const opacity = Math.max(0.12, Math.min(0.9, 1 - (p.zDepth + 150) / 400));
        ctx.globalAlpha = opacity * 0.78;
        ctx.fillStyle = currentAccent;

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Update and Draw Stardust Mouse Trails ---
      trailParticlesRef.current.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;
        t.life -= 1.0 / t.maxLife;

        if (t.life > 0) {
          ctx.globalAlpha = t.opacity * t.life * 0.65;
          ctx.fillStyle = currentAccent;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size * t.life, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Filter expired trail particles
      trailParticlesRef.current = trailParticlesRef.current.filter((t) => t.life > 0);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("wheel", handleWheel);
      unsubscribe();
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1] bg-transparent w-full h-full block"
    />
  );
}

export default ParticleField;
