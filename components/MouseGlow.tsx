"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ── Global Mouse Glow + Magnetic Hook ─────────────────────────────────────────

export function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0px, 0px)";
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    const handleMouseEnter = () => {
      el.style.transition = "transform 0.15s ease";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength]);

  return ref;
}

// ── 3D Tilt Card Hook ─────────────────────────────────────────────────────────
export function useTiltEffect(maxTilt = 12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = -y * maxTilt;
      const rotY = x * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      el.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 60px rgba(0,0,0,0.15), 0 30px 80px rgba(0,0,0,0.1)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      el.style.boxShadow = "";
      el.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    const handleMouseEnter = () => {
      el.style.transition = "none";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [maxTilt]);

  return ref;
}

// ── Global Mouse Glow Component ───────────────────────────────────────────────
export default function MouseGlow() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 0.5 });

  const trailX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 1 });
  const trailY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 1 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      {/* Primary spotlight — tight, sharp */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: smoothX,
          translateY: smoothY,
          x: "-50%",
          y: "-50%",
          mixBlendMode: "screen",
        }}
      />

      {/* Secondary glow — wide, soft, lagging */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9998,
          translateX: trailX,
          translateY: trailY,
          x: "-50%",
          y: "-50%",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
