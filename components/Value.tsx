"use client";

import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { XCircle, Check, ArrowRight, TrendingUp, Wallet, ShieldCheck, Sparkles } from "lucide-react";

// ── Components ────────────────────────────────────────────────────────────────

function CountUp({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });

  useEffect(() => {
    count.set(value);
  }, [value, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [rounded]);

  return <span>{displayValue.toLocaleString()}</span>;
}

const comparisonData = {
  without: [
    "Arrive at wrong times — miss the magic",
    "Pay inflated tourist prices everywhere",
    "Miss 90% of Amritsar's hidden beauty",
    "Exhausted and confused by Day 2",
    "No idea where to eat — pick badly",
  ],
  with: [
    "Perfect timing at every spot — crowd-free",
    "Know exactly where to spend vs save",
    "Discover 40+ exclusive hidden gems",
    "Efficient routes & smart pacing",
    "Legendary food spots perfectly curated",
  ]
};

export default function Value() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="pricing" ref={sectionRef} style={{ backgroundColor: "#060608", position: "relative", overflow: "hidden" }} className="section-padding">
      {/* Background Cinematic Atmosphere */}
      <div className="grid-overlay" style={{ opacity: 0.1 }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ position: "absolute", top: "20%", left: "50%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)", filter: "blur(100px)", transform: "translate(-50%, -50%)" }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "24px",
            }}
          >
            <Wallet size={14} style={{ color: "#EC4899" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>THE INVESTMENT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900,
              color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px",
            }}
          >
            ₹999 Saves You <span className="gradient-text">₹10,000+</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>In Costly Mistakes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}
          >
            Bad travel decisions — tourist traps, poor timing, and wasted routes — have a hidden cost. MovoDream pays for itself by Day 1.
          </motion.p>
        </div>

        {/* Asymmetrical Overlapping Cards */}
        <div style={{ position: "relative", marginBottom: "120px", minHeight: "500px" }} className="comparison-container">
          {/* Without Card */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", top: "0", left: "0", width: "55%",
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
              borderRadius: "32px", padding: "48px",
              border: "1px solid rgba(255,255,255,0.06)",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <XCircle size={20} color="#EF4444" />
              </div>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "rgba(255,255,255,0.4)" }}>Without Intelligence</span>
            </div>
            {comparisonData.without.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", opacity: 0.6 }}>
                <XCircle size={14} color="#EF4444" />
                <span style={{ fontSize: "15px", color: "white" }}>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* With Card (Overlapping) */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 1 }}
            whileInView={{ opacity: 1, x: 0, rotate: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", top: "60px", right: "0", width: "55%",
              background: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(59,130,246,0.1) 100%)",
              backdropFilter: "blur(40px)",
              borderRadius: "32px", padding: "48px",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.4), 0 0 80px rgba(236,72,153,0.1)",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={20} color="#22C55E" />
              </div>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "white" }}>With MovoDream</span>
            </div>
            {comparisonData.with.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <Check size={14} color="#22C55E" />
                <span style={{ fontSize: "15px", color: "white", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
            {/* Value Badge */}
            <div style={{
              position: "absolute", bottom: "-20px", right: "40px",
              background: "#22C55E", color: "white", padding: "8px 20px",
              borderRadius: "100px", fontSize: "12px", fontWeight: 900,
              boxShadow: "0 10px 30px rgba(34,197,94,0.4)"
            }}>
              INSIDER STATUS UNLOCKED
            </div>
          </motion.div>
        </div>

        {/* Pricing Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "40px", padding: "80px",
            textAlign: "center", border: "1px solid rgba(255,255,255,0.06)",
            position: "relative", overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(236,72,153,0.05), transparent)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", marginBottom: "32px" }}>
              LIFETIME ACCESS TRIPPASS
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "40px" }}>
              <div style={{ fontSize: "clamp(5rem, 10vw, 8rem)", fontWeight: 950, color: "white", letterSpacing: "-0.05em", lineHeight: 0.9 }}>
                ₹<CountUp value={999} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontWeight: 700 }}>₹4,999</div>
                <div style={{ fontSize: "16px", color: "#22C55E", fontWeight: 800 }}>80% OFF LIMITED LAUNCH</div>
              </div>
            </div>

            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7 }}>
              One payment. Zero hidden fees. Lifetime travel intelligence for your entire trip to Amritsar.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <motion.a
                href="#cta"
                className="btn-primary"
                style={{ padding: "20px 48px", fontSize: "18px", fontWeight: 900 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Access for ₹999 <ArrowRight size={20} />
              </motion.a>
              <div style={{ width: "100%", marginTop: "24px", display: "flex", justifyContent: "center", gap: "24px" }}>
                {[{ i: ShieldCheck, l: "Secured" }, { i: Sparkles, l: "AI Powered" }, { i: TrendingUp, l: "80% Off" }].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <feat.i size={16} color="rgba(255,255,255,0.3)" />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>{feat.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .comparison-container { height: auto !important; display: flex !important; flex-direction: column !important; gap: 24px !important; }
          .comparison-container > div { position: relative !important; width: 100% !important; top: 0 !important; rotate: 0deg !important; }
        }
      `}</style>
    </section>
  );
}
