"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  ArrowRight, Sparkles, Navigation, Map, 
  Users, Zap, Shield, Route, Activity
} from "lucide-react";
import { useMagneticEffect, useTiltEffect } from "@/components/MouseGlow";

// ── Floating HUD Elements ───────────────────────────────────────────────────

function FloatingHUD({ children, index, initialPos }: { children: React.ReactNode, index: number, initialPos: { top?: string, left?: string, right?: string, bottom?: string } }) {
  const tiltRef = useTiltEffect(15);
  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1 + index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        ...initialPos,
        zIndex: 20,
        pointerEvents: "auto",
        transformStyle: "preserve-3d",
      }}
      className="hidden lg:block"
    >
      <div className="glass-dark" style={{ padding: "20px", width: "240px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
        {children}
      </div>
    </motion.div>
  );
}

// ── Main Hero ────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const magneticCTA = useMagneticEffect(0.3);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);

  return (
    <section
      ref={sectionRef}
      id="overview"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#060608",
      }}
    >
      {/* Cinematic Background Layer */}
      <motion.div style={{ position: "absolute", inset: 0, zIndex: 0, y, scale, filter: `blur(${blur})` }}>
        <img src="/hero_map.png" alt="Golden Temple Night" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, rgba(6,6,8,0.8) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #060608 100%)" }} />
      </motion.div>

      {/* Spatial Atmosphere */}
      <div className="grid-overlay" style={{ opacity: 0.15 }} />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ position: "absolute", top: "30%", left: "20%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        
        {/* Floating AI HUDs */}
        <FloatingHUD index={0} initialPos={{ top: "15%", left: "5%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <Activity size={16} color="#EC4899" className="live-dot" />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "white", letterSpacing: "0.1em" }}>LIVE CROWD DATA</span>
          </div>
          {[
            { n: "Temple", v: 32, c: "#22C55E" },
            { n: "Border", v: 78, c: "#EF4444" }
          ].map(s => (
            <div key={s.n} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
                <span>{s.n}</span>
                <span style={{ color: s.c, fontWeight: 800 }}>{s.v}%</span>
              </div>
              <div style={{ height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "1px", overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.v}%` }} transition={{ duration: 1, delay: 1.5 }} style={{ height: "100%", background: s.c }} />
              </div>
            </div>
          ))}
        </FloatingHUD>

        <FloatingHUD index={1} initialPos={{ bottom: "20%", right: "5%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <Navigation size={16} color="#3B82F6" />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "white" }}>SMART ROUTING</span>
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            Optimal sequence calculated.<br />
            <span style={{ color: "#3B82F6", fontWeight: 700 }}>45 mins saved today.</span>
          </div>
          <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px", display: "flex", gap: "8px" }}>
             <Zap size={12} color="#F59E0B" />
             <span style={{ fontSize: "9px", color: "#F59E0B", fontWeight: 800 }}>AI OPTIMIZED</span>
          </div>
        </FloatingHUD>

        {/* ── Main Content ── */}
        <motion.div 
          style={{ opacity, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              padding: "8px 20px", borderRadius: "100px", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)",
              display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px"
            }}
          >
            <div className="live-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EC4899" }} />
            <span style={{ fontSize: "12px", fontWeight: 800, color: "white", letterSpacing: "0.05em" }}>AI TRAVEL OPERATING SYSTEM</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)", fontWeight: 950, color: "white",
              lineHeight: 0.9, letterSpacing: "-0.05em", marginBottom: "32px"
            }}
          >
            Explore <span className="gradient-text">Insider</span><br />
            Amritsar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "rgba(255,255,255,0.5)", maxWidth: "700px", lineHeight: 1.6, marginBottom: "48px" }}
          >
            The first premium AI system built to eliminate the tourist experience.<br />
            Personalized itineraries. Real-time crowd data. Hidden gems.
          </motion.p>

          {/* Magnetic CTA */}
          <motion.div
            ref={magneticCTA as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#problem"
              className="btn-primary"
              style={{ padding: "22px 54px", fontSize: "18px", fontWeight: 900, borderRadius: "20px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Royal Access <ArrowRight size={20} strokeWidth={3} />
            </motion.a>
          </motion.div>

          {/* Social Proof Mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "12px" }}
          >
             <div style={{ display: "flex" }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1F1F24", border: "2px solid #060608", marginLeft: i === 1 ? 0 : "-12px", overflow: "hidden" }}>
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" />
                  </div>
                ))}
             </div>
             <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Trusted by 2,400+ explorers</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: "40px", left: "50%", x: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.3 }}
        >
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(transparent, white)" }} />
          <span style={{ fontSize: "10px", fontWeight: 800, color: "white", letterSpacing: "0.2em" }}>SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
}
