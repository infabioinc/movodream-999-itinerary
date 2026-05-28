"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTiltEffect } from "@/components/MouseGlow";
import { AlertTriangle, TrendingDown, Clock, MapPin, Frown, XCircle, ArrowRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const frustrations = [
  {
    icon: MapPin,
    title: "Wasted Hours at Crowded Spots",
    desc: "Thousands of tourists. Long queues. No peaceful moment. No memory worth keeping.",
    stat: "3hrs", statLabel: "avg wait time", color: "#EF4444", accent: "rgba(239,68,68,0.12)",
    bgImage: "https://images.unsplash.com/photo-1760262492325-96e00b9f4f8d?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Frown,
    title: "Generic Tourist Trap Routes",
    desc: "Google Maps sends everyone to the same 5 places. You miss multiple hidden gems.",
    statLabel: "gems missed", color: "#F97316", accent: "rgba(249,115,22,0.12)",
    bgImage: "1.webp",
  },
  {
    icon: TrendingDown,
    title: "Overpriced & Underwhelming Food",
    desc: "Tourist-facing restaurants charge 3× prices for half the experience.",
    stat: "3×", statLabel: "inflated prices", color: "#EAB308", accent: "rgba(234,179,8,0.1)",
    bgImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
  },
  {
    icon: Clock,
    title: "No Timing Intelligence",
    desc: "Visiting Wagah Border without knowing the ceremony schedule. Missing magic moments.",
    stat: "60%", statLabel: "poorly timed", color: "#3B82F6", accent: "rgba(59,130,246,0.1)",
    bgImage: "https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?q=80&w=1044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: AlertTriangle,
    title: "No Travel Updates",
    desc: "Events. Closures. Rush hours. Festival crowds. Zero awareness.",
    stat: "0", statLabel: "Personalized alerts", color: "#A855F7", accent: "rgba(168,85,247,0.1)",
    bgImage: "/partition-museum-townhall.jpg",
  },
  {
    icon: XCircle,
    title: "Exhaustion Without Memories",
    desc: "2 days on your feet seeing what every tourist sees — you come home feeling empty.",
    stat: "89%", statLabel: "feel they missed out", color: "#EC4899", accent: "rgba(236,72,153,0.1)",
    bgImage: "https://www.trawell.in/admin/images/upload/294499336Partition_Museum.jpg",
  },
];

// ── Tilt Card ─────────────────────────────────────────────────────────────────

function TiltFrustrationCard({ item, index }: { item: typeof frustrations[0]; index: number }) {
  const tiltRef = useTiltEffect(10);
  const Icon = item.icon;

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "linear-gradient(135deg, #0C0C14 0%, #141422 100%)",
        borderRadius: "28px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Image */}
      {item.bgImage && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: "28px",
          backgroundImage: `url(${item.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.95, // Fully crisp and clear
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      {/* Dark Text protection overlay - Fading to show image clearly at bottom */}
      {item.bgImage && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: "28px",
          background: "linear-gradient(to bottom, rgba(12,12,20,0.92) 0%, rgba(12,12,20,0.72) 50%, rgba(12,12,20,0.2) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      {/* Ambient tint - gradient at the bottom rather than an overall film */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "28px",
        background: `linear-gradient(to bottom, transparent, ${item.color}12)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Floating accent orb */}
      <div style={{
        position: "absolute", top: "-20px", right: "-20px",
        width: "100px", height: "100px", borderRadius: "50%",
        background: `radial-gradient(circle, ${item.color}25, transparent 70%)`,
        filter: "blur(20px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "16px",
            backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={22} style={{ color: item.color }} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "30px", fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.stat}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px", fontWeight: 500 }}>{item.statLabel}</div>
          </div>
        </div>

        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "white", marginBottom: "10px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 500, lineHeight: 1.7 }}>
          {item.desc}
        </p>

        {/* Bottom accent bar */}
        <div style={{
          position: "absolute", bottom: 0, left: "32px", right: "32px", height: "1px",
          background: `linear-gradient(to right, transparent, ${item.color}30, transparent)`,
        }} />
      </div>
    </motion.div>
  );
}

// ── Hero Stat Card (large) ────────────────────────────────────────────────────

function HeroStatCard() {
  const tiltRef = useTiltEffect(6);

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: -60, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "linear-gradient(135deg, #0F0F1A 0%, #1a0a2e 50%, #0a1628 100%)",
        borderRadius: "32px",
        padding: "48px",
        border: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
        gridColumn: "span 2",
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        boxShadow: "0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Glow effects */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", left: "-40px",
        width: "200px", height: "200px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div className="grid-overlay" style={{ opacity: 0.4, zIndex: 0 }} />

      {/* Background Image Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/gobindgarh-fort.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.95, // Clear and visible
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Text protection overlay for dark card */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(15,15,26,0.85) 0%, rgba(15,15,26,0.4) 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
          marginBottom: "24px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#EF4444" }} className="live-dot" />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#FCA5A5", letterSpacing: "0.05em" }}>THE REALITY</span>
        </div>

        <h2 style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900,
          color: "white", lineHeight: 1.05, letterSpacing: "-0.03em",
          marginBottom: "16px",
        }}>
          89% of Amritsar<br />
          visitors feel they<br />
          <span style={{
            background: "linear-gradient(135deg, #EC4899, #FF4FA3)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>missed the real city.</span>
        </h2>

        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "400px" }}>
          Here's why — and why Movodream exists to change that forever.
        </p>
      </div>

      <div style={{ display: "flex", gap: "24px", position: "relative", zIndex: 1 }}>
        {[{ n: "2,487+", l: "Travelers saved" }].map(s => (
          <div key={s.l}>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "white" }}>{s.n}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{ position: "relative", overflow: "hidden", backgroundColor: "#FAFAFA" }}
      className="section-padding"
    >
      {/* Animated mesh background */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgY, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(239,68,68,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 80% 70%, rgba(168,85,247,0.04) 0%, transparent 60%)",
        }} />
      </motion.div>

      <div className="grid-overlay-light" />

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
              background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)",
              marginBottom: "24px",
            }}
          >
            <AlertTriangle size={14} style={{ color: "#EF4444" }} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#DC2626" }}>The Problem Every Visitor Faces</span>
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
            Most Amritsar Trips Are{" "}
            <span className="gradient-text">Disappointingly</span>
            <br />
            <span style={{ color: "#D1D5DB" }}>Ordinary.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: "17px", color: "#6B7280", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}
          >
            Lakhs of Devotees and tourists visit Amritsar every month — and most return feeling they only scratched the surface.
          </motion.p>
        </div>

        {/* Asymmetric Broken-Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="problem-grid">

          {/* Hero stat card — spans 2 cols */}
          <HeroStatCard />

          {/* Card 3 — top right single */}
          <TiltFrustrationCard item={frustrations[0]} index={0} />

          {/* Row 2 — 3 cards */}
          {frustrations.slice(1, 4).map((item, i) => (
            <TiltFrustrationCard key={item.title} item={item} index={i + 1} />
          ))}

          {/* Wide card — last 2 frustrations side by side */}
          {frustrations.slice(4).map((item, i) => (
            <TiltFrustrationCard key={item.title} item={item} index={i + 4} />
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(135deg, #EC4899, #E11D8A)",
              borderRadius: "28px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div style={{
              position: "absolute", top: "-20px", right: "-20px",
              width: "120px", height: "120px", borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0,
            }} />

            {/* Background Image Overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url(https://images.unsplash.com/photo-1659763344736-7ea8ed3d1f5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FnYWglMjBib3JkZXJ8ZW58MHwwfDB8fHww)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.95, // Clear and visible
              mixBlendMode: "overlay",
              pointerEvents: "none",
              zIndex: 0,
            }} />

            {/* Text protection overlay for dark pink CTA */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(236,72,153,0.6), rgba(225,29,138,0.95))",
              pointerEvents: "none",
              zIndex: 0,
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>The Fix</div>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "white", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                Movodream changes all of this.
              </div>
            </div>
            <a href="#introduction" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px",
              padding: "10px 20px", fontSize: "13px", fontWeight: 700, color: "white",
              marginTop: "24px", width: "fit-content", position: "relative", zIndex: 1,
            }}>
              See How <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .problem-grid > div[style*="span 2"] { grid-column: span 1 !important; }
        }
        @media (min-width: 900px) and (max-width: 1100px) {
          .problem-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
