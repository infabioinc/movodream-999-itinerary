"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, Check, MapPin, Quote, Users } from "lucide-react";
import { useTiltEffect } from "@/components/MouseGlow";

// ── Components ────────────────────────────────────────────────────────────────

function CountUp({ value, duration = 2 }: { value: number | string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const strValue = value.toString();
  const numValue = typeof value === "string" ? parseFloat(strValue.replace(/[^0-9.]/g, "")) : value;
  
  // Extract characters at start as prefix (e.g. ₹)
  const prefixMatch = strValue.match(/^[^0-9.]+/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  
  // Extract characters at end as suffix (e.g. +)
  const suffixMatch = strValue.match(/[^0-9.]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";

  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });

  useEffect(() => {
    count.set(numValue);
  }, [numValue, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      const val = latest.toFixed(strValue.includes('.') ? 1 : 0);
      setDisplayValue(prefix + val + suffix);
    });
  }, [rounded, prefix, suffix, strValue]);

  return <span>{displayValue}</span>;
}

const testimonials = [
  {
    name: "Rahul Sharma", origin: "Delhi", rating: 5, color: "#EC4899",
    text: "I've visited Amritsar twice before and felt like a tourist both times. With Movodream, I finally experienced the real city.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Priya & Ankit", origin: "Mumbai", rating: 5, color: "#A855F7",
    text: "Attending the early morning Darshan at Golden Temple with no crowds was deeply spiritual. The itinerary was so thoughtful.",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Meena Iyer", origin: "Bangalore", rating: 5, color: "#3B82F6",
    text: "Traveled with 3 kids. The family-optimized route was brilliant — educational, fun, and manageable.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Vikram Nair", origin: "Pune", rating: 5, color: "#F59E0B",
    text: "The hidden gems section blew my mind. Places I'd never have found on my own — forgotten havelis.",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Deepika", origin: "Chennai", rating: 5, color: "#EC4899",
    text: "₹999 for something this premium? Felt like we had a local guide with us the entire time. Live updates are a lifesaver.",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
];

function TestimonialCard({ t, index, rotate }: { t: typeof testimonials[0]; index: number; rotate: number }) {
  const tiltRef = useTiltEffect(10);
  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      className="testimonial-card"
      style={{
        background: "white", borderRadius: "24px",
        border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        width: "min(380px, calc(100vw - 40px))", flexShrink: 0, rotate: `${rotate}deg`,
        position: "relative", overflow: "hidden", transformStyle: "preserve-3d"
      }}
    >
      <div style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.1 }}>
        <Quote size={40} color={t.color} />
      </div>
      <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />)}
      </div>
      <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.7, marginBottom: "24px", fontWeight: 500 }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={t.avatar}
          alt={t.name}
          style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${t.color}` }}
        />
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F1F24" }}>{t.name}</div>
          <div style={{ fontSize: "12px", color: "#6B7280" }}>{t.origin}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section id="social-proof" ref={sectionRef} style={{ backgroundColor: "#F9F9FB", position: "relative", overflow: "hidden" }} className="section-padding">
      {/* Cinematic Background */}
      <div className="grid-overlay-light" style={{ opacity: 0.3 }} />
      <motion.div style={{ position: "absolute", top: "10%", right: "5%", opacity: 0.1, color: "#FBBF24" }} animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        <Star size={120} strokeWidth={0.5} />
      </motion.div>

      <div className="container" style={{ position: "relative", zIndex: 10, marginBottom: "80px" }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "white", border: "1px solid rgba(245,158,11,0.2)",
              marginBottom: "24px",
            }}
          >
            <Users size={14} color="#FBBF24" />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1F1F24" }}>2,487+ TRAVELERS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900,
              color: "#1F1F24", letterSpacing: "-0.03em", lineHeight: 1.1,
            }}
          >
            Trusted By <span className="gradient-text">Explorers</span>
            <br />
            From Around The <span style={{ color: "#D1D5DB" }}>World.</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee Tracks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "100px" }}>
        <div className="marquee-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} rotate={i % 2 === 0 ? 1 : -1} />
          ))}
        </div>
        <div className="marquee-track-reverse">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} rotate={i % 2 === 0 ? -1 : 1} />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", maxWidth: "900px", margin: "0 auto" }} className="stats-grid">
          {[
            { v: "2487+", l: "Happy Travelers", c: "#EC4899" },
            { v: "4.9", l: "Average Rating", c: "#FBBF24" },
            { v: "₹999", l: "Complete Access", c: "#22C55E" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              style={{
                background: "white", borderRadius: "24px", padding: "40px",
                textAlign: "center", border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ fontSize: "48px", fontWeight: 950, color: s.c, marginBottom: "8px", letterSpacing: "-0.05em" }}>
                {statsInView ? <CountUp value={s.v} /> : "0"}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card {
          padding: 24px !important;
        }
        @media (min-width: 768px) {
          .testimonial-card {
            padding: 32px !important;
          }
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
