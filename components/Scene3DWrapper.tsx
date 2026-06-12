"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleField = dynamic(
  () => import("@/components/ParticleField").then((m) => m.ParticleField),
  { ssr: false, loading: () => null }
);

export function Scene3DWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer 3D scene until after LCP and main-thread idle with safe fallback for iOS/Safari
    const requestIdle = (cb: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        return (window as any).requestIdleCallback(cb, { timeout: 3000 });
      }
      return setTimeout(cb, 1);
    };

    const cancelIdle = (id: any) => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        return (window as any).cancelIdleCallback(id);
      }
      clearTimeout(id);
    };

    const id = requestIdle(() => setShouldLoad(true));
    return () => cancelIdle(id);
  }, []);

  if (!shouldLoad) return null;
  return <ParticleField />;
}
