"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTiltEffect } from "@/components/MouseGlow";
import { Route, Sparkles, Users, Zap, Radio, Utensils, Clock, Shield, MapPin, ArrowRight, BarChart3, Activity } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Route, title: "Personalized Smart Itinerary", accent: "#EC4899",
    desc: "Your itinerary isn't generic. It's built around your group size, interests, pace, and travel dates — with day-by-day plans for every hour of your trip.",
    tag: "AI-Powered", type: "mega",
  },
  {
    icon: Users, title: "Live Crowd Intelligence", accent: "#3B82F6",
    desc: "Real-time crowd density tracking across all major sites. Know exactly when and where to go for peaceful, beautiful experiences.",
    tag: "Real-Time", type: "medium",
  },
  {
    icon: Sparkles, title: "Hidden Gems", accent: "#A855F7",
    desc: "40+ off-the-beaten-path spots, cultural dives, and experiences that only locals know about.",
    tag: "Exclusive", type: "small",
  },
  {
    icon: Utensils, title: "Food Intelligence", accent: "#EF4444",
    desc: "A curated food guide featuring iconic dhabas and hidden street food gems perfectly sequenced for your taste.",
    tag: "Curated", type: "medium",
  },
  {
    icon: Zap, title: "Route Optimization", accent: "#F59E0B",
    desc: "AI-optimized routes that minimize travel time and sequence visits for maximum efficiency.",
    tag: "Smart", type: "mega",
  },
  {
    icon: Radio, title: "Live Travel Alerts", accent: "#22C55E",
    desc: "Events, closures, and peak hours — you get real-time notifications so your trip adapts dynamically.",
    tag: "Live", type: "small",
  },
  {
    icon: Clock, title: "Timing Intelligence", accent: "#8B5CF6",
    desc: "Perfect timing for landmarks — sunrise at Golden Temple, ceremony at Wagah Border.",
    tag: "Optimized", type: "small",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function BentoCard({ feature, index, children }: { feature: typeof features[0]; index: number; children?: React.ReactNode }) {
  const tiltRef = useTiltEffect(feature.type === 'mega' ? 5 : 10);
  const Icon = feature.icon;

  const isMega = feature.type === 'mega';
  const isMedium = feature.type === 'medium';

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "white",
        borderRadius: "28px",
        padding: isMega ? "48px" : "32px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        gridColumn: isMega ? "span 2" : "span 1",
        gridRow: isMega ? "span 1" : "span 1",
        display: "flex",
        flexDirection: isMega ? "row" : "column",
        gap: isMega ? "40px" : "24px",
        alignItems: "flex-start",
      }}
    >
      {/* Background glow accent */}
      <div style={{
        position: "absolute", top: "-20%", right: "-20%",
        width: "60%", height: "60%", borderRadius: "50%",
        background: `radial-gradient(circle, ${feature.accent}08, transparent 70%)`,
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div style={{ flex: isMega ? "1 1 50%" : "none", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "16px",
            background: `${feature.accent}14`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={24} style={{ color: feature.accent }} />
          </div>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "100px",
            background: `${feature.accent}12`, color: feature.accent,
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            {feature.tag}
          </span>
        </div>

        <h3 style={{ fontSize: isMega ? "28px" : "20px", fontWeight: 900, color: "#1F1F24", marginBottom: "12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {feature.title}
        </h3>
        <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, marginBottom: isMega ? "0" : "0" }}>
          {feature.desc}
        </p>
      </div>

      {children && (
        <div style={{ flex: isMega ? "1 1 50%" : "none", width: isMega ? "auto" : "100%", position: "relative", zIndex: 1 }}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

// ── Interactive Sub-Elements ──────────────────────────────────────────────────

function ItineraryPreview() {
  return (
    <div style={{
      background: "#F9FAFB", borderRadius: "20px", padding: "20px",
      border: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "12px"
    }}>
      {[
        { t: "06:00", d: "Golden Temple Sunrise", c: "#EC4899" },
        { t: "09:30", d: "Kulcha Breakfast Run", c: "#F59E0B" },
        { t: "12:00", d: "Partition Museum", c: "#3B82F6" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", width: "35px" }}>{item.t}</span>
          <div style={{ width: "2px", height: "20px", background: `${item.c}30`, borderRadius: "1px" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F1F24" }}>{item.d}</span>
        </motion.div>
      ))}
      <div style={{ borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: "12px", marginTop: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#EC4899" }}>OPTIMIZED ROUTE READY</span>
        <Activity size={12} color="#EC4899" className="live-dot" />
      </div>
    </div>
  );
}

function CrowdStatus() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[
        { l: "Golden Temple", v: 30, c: "#22C55E" },
        { l: "Jallianwala Bagh", v: 85, c: "#EF4444" },
      ].map((s, i) => (
        <div key={i} style={{ background: "rgba(0,0,0,0.02)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#1F1F24" }}>{s.l}</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: s.c }}>{s.v}%</span>
          </div>
          <div style={{ height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.v}%` }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ height: "100%", background: s.c, borderRadius: "2px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FoodGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {[
        { n: "Kesar Dhaba", t: "Legendary" },
        { n: "Beera Chicken", t: "Local Secret" },
      ].map((f, i) => (
        <div key={i} style={{ background: "white", borderRadius: "14px", padding: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#1F1F24", marginBottom: "2px" }}>{f.n}</div>
          <div style={{ fontSize: "10px", color: "#6B7280" }}>{f.t}</div>
        </div>
      ))}
    </div>
  );
}

function RouteMap() {
  return (
    <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "140px", background: "#F3F4F6", border: "1px solid rgba(0,0,0,0.05)" }}>
      <img src="/map_static_light.png" alt="Route Map" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(245,158,11,0.1), transparent)" }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <motion.path
          d="M 40 100 Q 80 40 160 80 T 260 40"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle cx="40" cy="100" r="4" fill="#F59E0B" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
        <motion.circle cx="260" cy="40" r="4" fill="#F59E0B" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }} />
      </svg>
      <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "white", borderRadius: "8px", padding: "4px 10px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, color: "#1F1F24" }}>SAVING 45 MINS</span>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export default function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="features" style={{ backgroundColor: "white", position: "relative", overflow: "hidden" }} className="section-padding">
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div className="glow-orb" style={{ width: "800px", height: "800px", background: "rgba(236,72,153,0.04)", top: "20%", left: "-10%", transform: "translateY(-50%)" }} />
      <div className="glow-orb" style={{ width: "600px", height: "600px", background: "rgba(59,130,246,0.05)", bottom: "10%", right: "-5%", transform: "translateY(50%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)",
              marginBottom: "24px",
            }}
          >
            <Zap size={14} style={{ color: "#3B82F6" }} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1D4ED8" }}>Powerful Intelligence Inside</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900,
              color: "#1F1F24", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px",
            }}
          >
            The Ultimate <span className="gradient-text">Travel Tech</span>
            <br />
            Stack For <span style={{ color: "#9CA3AF" }}>Amritsar.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: "17px", color: "#6B7280", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}
          >
            Not just a guide. A real-time intelligence layer that ensures every minute of your trip is perfect.
          </motion.p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="bento-container">
          
          {/* Row 1: Mega (Itinerary) + Medium (Crowd) */}
          <BentoCard feature={features[0]} index={0}>
            <ItineraryPreview />
          </BentoCard>
          <BentoCard feature={features[1]} index={1}>
            <CrowdStatus />
          </BentoCard>

          {/* Row 2: Medium (Food) + Mega (Route) */}
          <BentoCard feature={features[3]} index={3}>
            <FoodGrid />
          </BentoCard>
          <BentoCard feature={features[4]} index={4}>
            <RouteMap />
          </BentoCard>

          {/* Row 3: Small Cards */}
          <BentoCard feature={features[2]} index={2} />
          <BentoCard feature={features[5]} index={5} />
          <BentoCard feature={features[6]} index={6} />

          {/* Bonus Final Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              background: "linear-gradient(135deg, #141420, #0F0F1A)",
              borderRadius: "28px", padding: "32px",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
              textAlign: "center", gridColumn: "span 3",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              And 12+ other pro features built for the modern traveler.
            </div>
            <motion.a
              href="#pricing"
              className="btn-primary"
              style={{ padding: "14px 32px", fontSize: "15px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Full Access Now <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-container { grid-template-columns: 1fr !important; }
          .bento-container > * { grid-column: span 1 !important; flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
