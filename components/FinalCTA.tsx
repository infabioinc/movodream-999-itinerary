"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, Sparkles, Shield, Clock, Zap, Star } from "lucide-react";
import { useMagneticEffect } from "@/components/MouseGlow";

const benefits = [
  "Smart Itinerary",
  "Hidden Gems",
  "Crowd Data",
  "Route Optimization",
  "Food Guide",
  "Travel Alerts",
  "Priority Support",
  "Booking Support",
  "Authentic and verified recommendations",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });
  const magneticCTA = useMagneticEffect(0.3);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "160px 0",
        background: "#060608",
      }}
    >
      {/* Dramatic Atmosphere */}
      <div className="grid-overlay" style={{ opacity: 0.1 }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ position: "absolute", top: "50%", left: "50%", width: "1000px", height: "1000px", background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)", filter: "blur(100px)", transform: "translate(-50%, -50%)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #060608 0%, transparent 50%, #060608 100%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>

        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} style={{ position: "absolute", top: "-40px", left: "10%", opacity: 0.2 }}>
          <Sparkles size={60} color="#EC4899" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 20px", borderRadius: "100px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: "32px",
          }}
        >
          <Zap size={14} color="#EC4899" className="live-dot" />
          <span style={{ fontSize: "13px", fontWeight: 800, color: "white", letterSpacing: "0.1em" }}>LIMITED SLOTS FOR MAY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 950,
            color: "white", letterSpacing: "-0.05em",
            lineHeight: 1, marginBottom: "32px",
          }}
        >
          Beat the Rush.<br />
          <span className="gradient-text">Discover the Magic.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontSize: "20px", color: "rgba(255,255,255,0.4)", maxWidth: "600px", margin: "0 auto 60px", lineHeight: 1.6 }}
        >
          Join 2,487+ smart travelers who swapped the tourist trap for the royal insider experience.
        </motion.p>

        {/* Benefits Horizontal */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "60px" }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 20px", borderRadius: "100px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Check size={14} color="#22C55E" strokeWidth={3} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>{b}</span>
            </motion.div>
          ))}
        </div>

        {/* Big CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span style={{ fontSize: "80px", fontWeight: 950, color: "white", letterSpacing: "-0.05em", lineHeight: 1 }}>₹999</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontWeight: 800 }}>₹4,999</div>
              <div style={{ fontSize: "14px", color: "#22C55E", fontWeight: 900 }}>80% OFF — ACCESS REVEALED</div>
            </div>
          </div>

          <motion.div ref={magneticCTA as React.RefObject<HTMLDivElement>}>
            <motion.a
              href="#simulator"
              className="btn-primary btn-cta-final"
              style={{ fontWeight: 950, borderRadius: "24px", boxShadow: "0 20px 80px rgba(236,72,153,0.4)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET INSTANT ACCESS <ArrowRight size={24} strokeWidth={3} />
            </motion.a>
          </motion.div>

          <div style={{ display: "flex", gap: "24px", opacity: 0.4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 700, color: "white" }}>
              <Shield size={14} /> SECURE PAYMENT
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 700, color: "white" }}>
              <Shield size={14} /> PRIORITY SUPPORT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
