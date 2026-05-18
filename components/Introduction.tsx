"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTiltEffect } from "@/components/MouseGlow";
import { Brain, Cpu, Layers, Zap, Radio, Map, ArrowRight, Sparkles } from "lucide-react";

const pillars = [
  { icon: Brain, label: "Personalized Intelligence", desc: "Your pace. Your preferences.", color: "#EC4899" },
  { icon: Map, label: "Real-Time Crowd Data", desc: "Know where to be — and when.", color: "#3B82F6" },
  { icon: Layers, label: "Hidden Gem Discovery", desc: "40+ experiences tourists never find.", color: "#A855F7" },
  { icon: Radio, label: "Live Travel Alerts", desc: "Always one step ahead.", color: "#22C55E" },
  { icon: Zap, label: "Dynamic Routing", desc: "Optimized paths. Zero waste.", color: "#F59E0B" },
  { icon: Cpu, label: "AI Travel Assistant", desc: "Expert guidance in your pocket.", color: "#06B6D4" },
];

function PillarNode({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const Icon = pillar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${pillar.color}20, 0 4px 12px rgba(0,0,0,0.06)`}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)"}
    >
      <div style={{
        width: "36px", height: "36px", borderRadius: "10px",
        backgroundColor: `${pillar.color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "10px",
      }}>
        <Icon size={17} style={{ color: pillar.color }} />
      </div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1F1F24", marginBottom: "3px", lineHeight: 1.3 }}>{pillar.label}</div>
      <div style={{ fontSize: "11px", color: "#6B7280" }}>{pillar.desc}</div>
    </motion.div>
  );
}

// Holographic dashboard panel
function HolographicDashboard() {
  const tiltRef = useTiltEffect(8);

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
    >
      {/* Main Dashboard */}
      <div style={{
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 40px 120px rgba(236,72,153,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
        background: "linear-gradient(135deg, #0F0F1A, #141420)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
      }}>
        <img
          src="/dashboard_ui.png"
          alt="Movodream Dashboard"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,15,26,0.6) 0%, transparent 50%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
        }} />
      </div>

      {/* Floating mini overlay card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-28px", left: "-32px",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(30px)",
          borderRadius: "20px", padding: "16px 20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
          border: "1px solid rgba(255,255,255,0.8)",
          width: "200px",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22C55E" }} className="live-dot" />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#374151" }}>Live Crowd Intel</span>
        </div>
        {[
          { label: "Golden Temple", pct: 25, color: "#22C55E" },
          { label: "Wagah Border", pct: 75, color: "#F59E0B" },
          { label: "Gobindgarh Fort", pct: 90, color: "#EF4444" },
        ].map(s => (
          <div key={s.label} style={{ marginBottom: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
              <span style={{ fontSize: "10px", color: "#6B7280" }}>{s.label}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, color: s.color }}>
                {s.pct < 40 ? "Low" : s.pct < 75 ? "Med" : "High"}
              </span>
            </div>
            <div style={{ height: "3px", borderRadius: "2px", background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: "2px", backgroundColor: s.color }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-24px", right: "-24px",
          background: "linear-gradient(135deg, #EC4899, #E11D8A)",
          borderRadius: "16px", padding: "12px 16px",
          boxShadow: "0 16px 40px rgba(236,72,153,0.4)",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>AI Score</div>
        <div style={{ fontSize: "22px", fontWeight: 900, color: "white", lineHeight: 1 }}>9.8/10</div>
      </motion.div>
    </motion.div>
  );
}

export default function Introduction() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      style={{ position: "relative", overflow: "hidden", backgroundColor: "#F5F5F7" }}
      className="section-padding"
    >
      {/* Animated mesh background */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgY, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(236,72,153,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 10% 70%, rgba(59,130,246,0.05) 0%, transparent 60%)",
        }} />
      </motion.div>

      {/* Dot grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }} className="intro-grid">

          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div ref={titleRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={titleInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "8px 18px", borderRadius: "100px",
                  background: "white", border: "1px solid rgba(236,72,153,0.15)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  marginBottom: "24px",
                }}
              >
                <Sparkles size={14} style={{ color: "#EC4899" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F1F24" }}>Introducing the Solution</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900,
                  color: "#1F1F24", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px",
                }}
              >
                Movodream Is Your{" "}
                <span className="gradient-text">Personal Travel</span>
                <br />
                <span style={{ color: "#9CA3AF" }}>Operating System.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, marginBottom: "40px" }}
              >
                We've spent months studying Amritsar — every hidden street, every legendary
                dhaba, every cultural experience, every crowd pattern. Built into a single premium
                travel intelligence system designed to give you the insider experience.
              </motion.p>
            </div>

            {/* Feature pillars — 2×3 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "36px" }}>
              {pillars.map((pillar, i) => <PillarNode key={pillar.label} pillar={pillar} index={i} />)}
            </div>

            <motion.a
              href="#features"
              className="btn-primary"
              style={{ padding: "14px 28px", fontSize: "14px", fontWeight: 700, borderRadius: "14px" }}
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See Everything Included
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>

          {/* RIGHT — Holographic Dashboard */}
          <div style={{ position: "relative", paddingTop: "40px", paddingBottom: "40px" }}>
            <HolographicDashboard />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .intro-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
}
