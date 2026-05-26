"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Sparkles, Navigation, Map,
  Users, Zap, Shield, Route, Activity
} from "lucide-react";
import { useMagneticEffect, useTiltEffect } from "@/components/MouseGlow";

// ── Floating HUD Elements ───────────────────────────────────────────────────

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
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero.avif"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
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
              display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px"
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
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 950, color: "white",
              lineHeight: 1.1, letterSpacing: "-0.05em", marginBottom: "32px"
            }}
          >
            Explore Amritsar<br></br><span className="gradient-text">Like An Insider</span><br />
            Not Like A Tourist.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "rgba(255, 255, 255, 1)", maxWidth: "800px", lineHeight: 1.6, marginBottom: "48px" }}
          >
            The first premium AI system built to enhance the tourist <span style={{ color: "#EC4899", fontWeight: 700 }}>experience</span>.<br />
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
              href="#trust"
              className="btn-primary"
              style={{ padding: "22px 54px", fontSize: "18px", fontWeight: 900, borderRadius: "20px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Unlock Amritsar Plan<ArrowRight size={20} strokeWidth={3} />
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
              {[1, 2, 3].map(i => (
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
