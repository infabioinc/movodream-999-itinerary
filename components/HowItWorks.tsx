"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Sliders, Cpu, Compass, LayoutDashboard, Heart, Users, User, UsersRound, MapPin, Check, RefreshCw } from "lucide-react";
import { useTiltEffect } from "@/components/MouseGlow";

const steps = [
  {
    step: "01",
    title: "Tailor Your Preferences",
    icon: Sliders,
    color: "#EC4899",
    desc: "Input your dates, group size, and select your travel persona (Couple, Family, Solo, or Friends). Define your preferred pace—from relaxed wandering to action-packed exploring."
  },
  {
    step: "02",
    title: "AI Engine Optimization",
    icon: Cpu,
    color: "#3B82F6",
    desc: "Our travel intelligence engine instantly computes optimal day schedules, cross-referencing real-time crowd density patterns, live weather, and peak time statistics."
  },
  {
    step: "03",
    title: "Access Your Dashboard",
    icon: LayoutDashboard,
    color: "#22C55E",
    desc: "Unlock your offline-ready interactive portal. Get smart food lists, custom navigation paths, transit optimizations, budget tips, and priority on-ground emergency support."
  }
];

const mockPersonas = [
  { id: "couple", title: "Couples", icon: Heart, color: "#EC4899", desc: "Focuses on quiet sunrises, romantic heritage dinners, and relaxed walking speeds." },
  { id: "family", title: "Families", icon: Users, color: "#3B82F6", desc: "Optimizes for child-safe spots, minimal transit gaps, and interactive historic sites." },
  { id: "solo", title: "Solo Soul", icon: User, color: "#A855F7", desc: "Prioritizes narrow walled-city alleyways, local artisan meetups, and photo-walks." },
  { id: "friends", title: "Friend Squads", icon: UsersRound, color: "#22C55E", desc: "Highlights fast-paced food trails, Wagah ceremonies, and late-night spots." }
];

function StepCard({ s, index }: { s: typeof steps[0]; index: number }) {
  const tiltRef = useTiltEffect(10);
  const Icon = s.icon;

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: "white",
        borderRadius: "28px",
        padding: "40px",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        flex: "1 1 300px",
        transformStyle: "preserve-3d",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${s.color}15, 0 4px 12px rgba(0,0,0,0.02)`}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)"}
    >
      {/* Background Accent Glow */}
      <div style={{
        position: "absolute", top: "-10%", right: "-10%",
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${s.color}10, transparent 70%)`,
        filter: "blur(20px)", pointerEvents: "none", zIndex: 0
      }} />

      {/* Number Badge */}
      <div style={{
        fontSize: "64px", fontWeight: 950, color: `${s.color}12`,
        position: "absolute", top: "10px", right: "20px",
        userSelect: "none", fontFamily: "monospace", letterSpacing: "-0.05em",
        zIndex: 0
      }}>
        {s.step}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "18px",
          background: `${s.color}12`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "28px",
        }}>
          <Icon size={24} style={{ color: s.color }} />
        </div>

        <h3 style={{
          fontSize: "22px", fontWeight: 900, color: "#1F1F24",
          marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.2
        }}>
          {s.title}
        </h3>

        <p style={{
          fontSize: "15px", color: "#4B5563",
          lineHeight: 1.7, fontWeight: 500
        }}>
          {s.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  // Simulator State
  const [simStep, setSimStep] = useState<"setup" | "process" | "dashboard">("setup");
  const [selectedPersona, setSelectedPersona] = useState("couple");
  const [isProcessing, setIsProcessing] = useState(false);

  const activePersonaObj = mockPersonas.find(p => p.id === selectedPersona) || mockPersonas[0];

  const handleRunOptimization = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSimStep("dashboard");
    }, 1800);
  };

  return (
    <section id="how-it-works" style={{ backgroundColor: "#FFFFFF", position: "relative", overflow: "hidden" }} className="section-padding">
      {/* Background elements */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.02,
        backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)",
        backgroundSize: "30px 30px", pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)",
              marginBottom: "24px",
            }}
          >
            <Compass size={14} style={{ color: "#3B82F6" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1D4ED8" }}>ONBOARDING JOURNEY</span>
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
            How Movodream <span className="gradient-text">Works.</span>
            <br />
            <span style={{ color: "#9CA3AF" }}>Simple. Fast. Intelligent.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: "18px", color: "#6B7280", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}
          >
            From configuring your specific travel style to navigating Amritsar with real-time on-ground intelligence.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
          position: "relative",
          marginBottom: "100px"
        }} className="steps-container">

          {/* Animated Connecting Line (on desktop) */}
          <div className="steps-connecting-line" style={{
            position: "absolute",
            top: "50%",
            left: "10%",
            right: "10%",
            height: "2px",
            background: "linear-gradient(90deg, #EC4899 0%, #3B82F6 50%, #22C55E 100%)",
            opacity: 0.25,
            zIndex: 0,
            transform: "translateY(-50%)",
            pointerEvents: "none"
          }} />

          {steps.map((s, i) => (
            <StepCard key={s.step} s={s} index={i} />
          ))}
        </div>

        {/* Interactive Live Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(135deg, #0F0F1A, #141420)",
            borderRadius: "40px",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
            padding: "50px",
            position: "relative",
            overflow: "hidden"
          }}
          className="simulator-container"
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 10% 10%, rgba(236,72,153,0.05), transparent 60%)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }} className="sim-grid">
            {/* Left Column: Interactive Controls */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Sparkles size={16} color="#EC4899" />
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#EC4899", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Interactive Simulator
                </span>
              </div>
              <h3 style={{ fontSize: "36px", fontWeight: 950, color: "white", marginBottom: "16px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                Experience Your Setup
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "40px" }}>
                Try our real-time portal generator. Select a persona below, run the optimization algorithm, and preview the live dashboard layout instantly.
              </p>

              {/* Progress Stepper Tabs */}
              <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px", marginBottom: "32px" }}>
                {[
                  { id: "setup", label: "1. Vibe Preference" },
                  { id: "process", label: "2. AI Optimization" },
                  { id: "dashboard", label: "3. Live Dashboard" }
                ].map(stepper => (
                  <button
                    key={stepper.id}
                    disabled={stepper.id === "process" || (stepper.id === "dashboard" && simStep === "setup")}
                    onClick={() => setSimStep(stepper.id as any)}
                    style={{
                      padding: "8px 16px",
                      background: "none",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: 800,
                      color: simStep === stepper.id ? "#EC4899" : "rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      borderBottom: simStep === stepper.id ? "2px solid #EC4899" : "none",
                      marginBottom: "-18px",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {stepper.label}
                  </button>
                ))}
              </div>

              {/* Step Dynamic Controls */}
              <div style={{ minHeight: "180px" }}>
                {simStep === "setup" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                      {mockPersonas.map(p => {
                        const PIcon = p.icon;
                        const isSelected = selectedPersona === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPersona(p.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "16px",
                              borderRadius: "16px",
                              border: "1px solid",
                              borderColor: isSelected ? p.color : "rgba(255,255,255,0.08)",
                              background: isSelected ? `${p.color}15` : "rgba(255,255,255,0.02)",
                              color: "white",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "all 0.3s ease"
                            }}
                          >
                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: isSelected ? p.color : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <PIcon size={16} color={isSelected ? "white" : p.color} />
                            </div>
                            <span style={{ fontSize: "14px", fontWeight: 700 }}>{p.title}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "24px" }}>
                      &ldquo;{activePersonaObj.desc}&rdquo;
                    </p>
                    <button
                      onClick={handleRunOptimization}
                      className="btn-primary"
                      style={{ padding: "14px 28px", fontSize: "14px", fontWeight: 800 }}
                    >
                      Run AI Optimization
                    </button>
                  </motion.div>
                )}

                {simStep === "process" && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <p style={{ color: "white" }}>Optimizing...</p>
                  </div>
                )}

                {simStep === "dashboard" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={12} color="white" />
                      </div>
                      <span style={{ fontSize: "14px", color: "#22C55E", fontWeight: 700 }}>Portal Optimization Complete!</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.6 }}>
                      Your customized itinerary dashboard has been configured to target low-crowd hours for your selected group profile.
                    </p>
                    <button
                      onClick={() => setSimStep("setup")}
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <RefreshCw size={14} /> Start Over
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Sleek Simulated Viewport */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{
                width: "280px",
                height: "500px",
                borderRadius: "36px",
                border: "8px solid #2A2A38",
                background: "#080810",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column"
              }}>
                {/* Mobile Camera Notch */}
                <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: "110px", height: "18px", background: "#2A2A38", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", zIndex: 10 }} />

                {/* Simulated Content Body */}
                <div style={{ padding: "30px 16px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "14px", overflowY: "hidden" }}>
                  
                  {/* Status Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: "4px" }}>
                    <span>09:41</span>
                    <span>5G LTE</span>
                  </div>

                  {/* Simulator Screen Rendering */}
                  <AnimatePresence mode="wait">
                    {/* Setup Screen Mock */}
                    {simStep === "setup" && !isProcessing && (
                      <motion.div
                        key="setup-screen"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: 900, color: "white" }}>Configure Portal</div>
                        <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                          <div style={{ width: "33%", height: "100%", background: "#EC4899" }} />
                        </div>

                        {/* Setup Fields */}
                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>SELECTED PERSONA</div>
                          <div style={{ fontSize: "12px", fontWeight: 800, color: activePersonaObj.color, display: "flex", alignItems: "center", gap: "6px" }}>
                            {activePersonaObj.title}
                          </div>
                        </div>

                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>TRIP DURATION</div>
                          <div style={{ fontSize: "11px", fontWeight: 700, color: "white" }}>3-Day Curated Route</div>
                        </div>

                        {/* Interactive prompt to action */}
                        <div style={{ background: "rgba(236,72,153,0.06)", borderRadius: "12px", padding: "12px", border: "1px dashed #EC4899", textAlign: "center", fontSize: "10px", color: "#EC4899", fontWeight: 700, marginTop: "20px" }}>
                          Click &ldquo;Run AI Optimization&rdquo; on the left to calculate.
                        </div>
                      </motion.div>
                    )}

                    {/* Processing loading screen Mock */}
                    {isProcessing && (
                      <motion.div
                        key="processing-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: "16px", paddingTop: "60px" }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{
                            width: "36px", height: "36px", borderRadius: "50%",
                            border: "3px solid rgba(59,130,246,0.2)",
                            borderTopColor: "#3B82F6"
                          }}
                        />
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 700, letterSpacing: "0.05em" }}>
                          SYNCHRONIZING MAPS...
                        </div>
                      </motion.div>
                    )}

                    {/* Dashboard Screen Mock */}
                    {simStep === "dashboard" && !isProcessing && (
                      <motion.div
                        key="dashboard-screen"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", fontWeight: 900, color: "white" }}>Live Dashboard</span>
                          <span style={{ fontSize: "8px", color: "#22C55E", padding: "2px 6px", background: "rgba(34,197,94,0.15)", borderRadius: "40px", fontWeight: 800 }}>LIVE SYNC</span>
                        </div>

                        {/* Crowd Alert Card */}
                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "14px", padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }} />
                            <span style={{ fontSize: "9px", fontWeight: 800, color: "white" }}>CROWD FORECAST</span>
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: 800, color: "white", marginBottom: "2px" }}>Golden Temple: LOW wait</div>
                          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>Optimal window is open for next 2 hours.</div>
                        </div>

                        {/* Next Stop Card */}
                        <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.15) 100%)", borderRadius: "14px", padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <div style={{ fontSize: "8px", fontWeight: 800, color: "#93C5FD", marginBottom: "4px" }}>UPCOMING INSIDER STOP</div>
                          <div style={{ fontSize: "12px", fontWeight: 900, color: "white", marginBottom: "2px" }}>Bhai Kulwant Singh</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "rgba(255,255,255,0.6)", fontWeight: 650 }}>
                            <MapPin size={10} /> 12 mins away (optimized transit)
                          </div>
                        </div>

                        {/* Support Banner */}
                        <div style={{ background: "rgba(236,72,153,0.1)", borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(236,72,153,0.15)", fontSize: "9px", color: "#F472B6", fontWeight: 700 }}>
                          Emergency? Press for Ground Support
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-connecting-line { display: none !important; }
          .steps-container { flex-direction: column !important; align-items: stretch !important; }
          .sim-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .simulator-container { padding: 30px !important; }
        }
      `}</style>
    </section>
  );
}
