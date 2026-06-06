"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles, Sliders, Compass, FileText, Heart, Users,
  User, UsersRound, MapPin, Check, RefreshCw, Flag, BookOpen, Utensils, ShoppingBag, Landmark
} from "lucide-react";
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
    title: "Customise Itinerary",
    icon: Sparkles,
    color: "#3B82F6",
    desc: "Tell us what inspires you. We design personalized, flexible itineraries around your unique preferences so you can skip the generic routes and experience the journey your way."
  },
  {
    step: "03",
    title: "Get Offline PDF Itinerary",
    icon: FileText,
    color: "#22C55E",
    desc: "Download a beautifully formatted, offline-ready PDF itinerary containing curated recommendations, custom routes, time-slot optimization, food guides, and on-ground safety tips. On ground optimisation and if you wanna upgrade it on day 2 - it can be upgraded one more time."
  }
];

const mockPersonas = [
  { id: "couple", title: "Couples", icon: Heart, color: "#EC4899", desc: "Focuses on early morning spirituality, romantic heritage dinners, and relaxed walking speeds." },
  { id: "family", title: "Families", icon: Users, color: "#3B82F6", desc: "Optimizes for child-safe spots, minimal transit gaps, and interactive historic sites." },
  { id: "solo", title: "Solo Soul", icon: User, color: "#A855F7", desc: "Prioritizes narrow walled-city alleyways, local artisan meetups, and photo-walks." },
  { id: "friends", title: "Friend Squads", icon: UsersRound, color: "#22C55E", desc: "Highlights fast-paced food trails, Wagah ceremonies, and late-night spots." }
];

const mockInterests = [
  { id: "spiritual", title: "Spiritual", icon: Sparkles, color: "#F59E0B", desc: "Serenity at Golden Temple & historic Gurudwaras." },
  { id: "heritage", title: "Heritage", icon: Landmark, color: "#EC4899", desc: "Explore forts, palaces, and historic monuments." },
  { id: "cuisine", title: "Fine Local Cuisine", icon: Utensils, color: "#EF4444", desc: "Legendary street food and traditional local dining runs." },
  { id: "shopping", title: "Shopping & Markets", icon: ShoppingBag, color: "#A855F7", desc: "Phulkari, Juttis, local handicrafts & bustling bazaars." },
  { id: "gems", title: "Hidden Local Gems", icon: Compass, color: "#10B981", desc: "Offbeat spots and secret corners known only to locals." },
  { id: "cultural", title: "Cultural Experiences", icon: Flag, color: "#3B82F6", desc: "Wagah border, heritage walks, folk performances." }
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
        fontSize: "64px", fontWeight: 950, color: `${s.color}2e`,
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [simStep, setSimStep] = useState<"setup" | "process" | "dashboard">("setup");
  const [selectedPersona, setSelectedPersona] = useState("couple");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["spiritual"]);
  const [arrivalDate, setArrivalDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [startTime, setStartTime] = useState("Morning");
  const [budgetRange, setBudgetRange] = useState("Moderate (₹₹)");
  const [foodPref, setFoodPref] = useState("Explorer (All)");
  const [isProcessing, setIsProcessing] = useState(false);

  const [showLeadModal, setShowLeadModal] = useState(false);

  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "+91 " });

  const [leadError, setLeadError] = useState<string | null>(null);

  const activePersonaObj = mockPersonas.find(p => p.id === selectedPersona) || mockPersonas[0];
  const activeInterestsObjs = mockInterests.filter(i => selectedInterests.includes(i.id));

  const handleInterestToggle = (id: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter(item => item !== id);
        return next.length > 0 ? next : prev; // keep at least 1 selected
      } else {
        if (prev.length < 3) {
          return [...prev, id];
        }
        return prev;
      }
    });
  };

  const handleRunOptimization = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSimStep("dashboard");
    }, 1800);
  };

  const handleLeadSubmit = async () => {
    setLeadError(null);

    if (!leadData.name.trim() || !leadData.email.trim() || !leadData.phone.trim()) {
      setLeadError("Please fill in all fields before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email.trim())) {
      setLeadError("Please enter a valid email address.");
      return;
    }

    // Strip whitespaces/dashes and validate Indian mobile format
    const rawPhone = leadData.phone.replace(/[\s-]/g, "");
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(rawPhone)) {
      setLeadError("Please enter a valid 10-digit mobile number with +91 prefix.");
      return;
    }

    const payload = {
      ...leadData,
      preferences: {
        selectedPersona,
        selectedInterest: selectedInterests.join(", "),
        selectedInterests,
        arrivalDate,
        startTime,
        budgetRange,
        foodPref
      }
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("[handleLeadSubmit] API error:", json);
        setLeadError(json?.error || "Something went wrong. Please try again.");
        return;
      }

      setShowLeadModal(false);
      handleRunOptimization();

    } catch (error) {
      console.error("[handleLeadSubmit] Network error:", error);
      setLeadError("Network error — please check your connection and try again.");
    }
  };


  const getSimulatedStop = (interests: string[]) => {
    const primary = interests[0] || "spiritual";
    switch (primary) {
      case "spiritual":
        return { title: "Golden Temple Morning Darshan", desc: "Optimal window for spiritual serenity." };
      case "heritage":
        return { title: "Gobindgarh Fort Exploration", desc: "Sound & light show on Sikh empire history." };
      case "cultural":
        return { title: "Wagah Border Parade", desc: "Reserved tricolor gallery seating sync." };
      case "cuisine":
        return { title: "Bhai Kulwant Singh Kulcha", desc: "Butter-dripping authentic breakfast stop." };
      case "shopping":
        return { title: "Heritage Bazar Walk", desc: "Traditional Phulkari and Jutti craft exploration." };
      case "gems":
        return { title: "Pul Kanjari Historic Ruins", desc: "Unexplored peace corner and history site." };
      default:
        return { title: "Harmandir Sahib Gate", desc: "Local advisor routes." };
    }
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease",
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
            overflow: "hidden",
            scrollMarginTop: "100px"
          }}
          id="simulator"
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
                Try our personalized itinerary generator. Set up your vibe profile, customize your interests, answer a few logistics questions, and preview your custom plan instantly.
              </p>

              {/* Progress Stepper Tabs */}
              <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px", marginBottom: "32px" }}>
                {[
                  { id: "setup", label: "1. Vibe Preference" },
                  { id: "process", label: "2. Customisation" },
                  { id: "dashboard", label: "3. PDF Itinerary" }
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

                    {/* Select Vibe Row */}
                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>1. Traveler Profile</label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                        {mockPersonas.map(p => {
                          const PIcon = p.icon;
                          const isSelected = selectedPersona === p.id;
                          return (
                            <button
                              key={p.id}
                              onClick={() => setSelectedPersona(p.id)}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                padding: "10px 4px",
                                borderRadius: "12px",
                                border: "1px solid",
                                borderColor: isSelected ? p.color : "rgba(255,255,255,0.06)",
                                background: isSelected ? `${p.color}15` : "rgba(255,255,255,0.02)",
                                color: "white",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                              }}
                            >
                              <PIcon size={14} color={isSelected ? "white" : p.color} />
                              <span style={{ fontSize: "10px", fontWeight: 700 }}>{p.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Select Interest Row */}
                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>2. Focus Interests (Select up to 3)</label>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)",
                        gap: "8px"
                      }}>
                        {mockInterests.map(i => {
                          const IIcon = i.icon;
                          const isSelected = selectedInterests.includes(i.id);
                          return (
                            <button
                              key={i.id}
                              onClick={() => handleInterestToggle(i.id)}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                padding: "10px 8px",
                                borderRadius: "12px",
                                border: "1px solid",
                                borderColor: isSelected ? i.color : "rgba(255,255,255,0.06)",
                                background: isSelected ? `${i.color}15` : "rgba(255,255,255,0.02)",
                                color: "white",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                gridColumn: "auto"
                              }}
                            >
                              <IIcon size={14} color={isSelected ? "white" : i.color} />
                              <span style={{ fontSize: "10px", fontWeight: 700, textAlign: "center" }}>{i.title}</span>
                            </button>
                          );
                        })}
                      </div>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginTop: "8px", minHeight: "16px" }}>
                        &ldquo;{selectedInterests.map(id => mockInterests.find(i => i.id === id)?.desc).filter(Boolean).join(" • ")}&rdquo;
                      </p>
                    </div>

                    {/* Logistics Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.5)", marginBottom: "6px", textTransform: "uppercase" }}>Arrival Date</label>
                        <input
                          type="date"
                          value={arrivalDate}
                          onChange={e => setArrivalDate(e.target.value)}
                          style={{
                            ...selectStyle,
                            colorScheme: "dark",
                            fontFamily: "inherit",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.5)", marginBottom: "6px", textTransform: "uppercase" }}>Arrival Time</label>
                        <select
                          value={startTime}
                          onChange={e => setStartTime(e.target.value)}
                          style={selectStyle}
                        >
                          <option value="Morning" style={{ background: "#141420" }}>Morning</option>
                          <option value="Afternoon" style={{ background: "#141420" }}>Afternoon</option>
                          <option value="Evening" style={{ background: "#141420" }}>Evening</option>
                          <option value="Night" style={{ background: "#141420" }}>Night</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.5)", marginBottom: "6px", textTransform: "uppercase" }}>Budget Level</label>
                        <select
                          value={budgetRange}
                          onChange={e => setBudgetRange(e.target.value)}
                          style={selectStyle}
                        >
                          <option value="Budget (₹)" style={{ background: "#141420" }}>Budget (₹)</option>
                          <option value="Standard (₹₹)" style={{ background: "#141420" }}>Standard (₹₹)</option>
                          <option value="Luxury (₹₹₹)" style={{ background: "#141420" }}>Luxury (₹₹₹)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.5)", marginBottom: "6px", textTransform: "uppercase" }}>Food Vibe</label>
                        <select
                          value={foodPref}
                          onChange={e => setFoodPref(e.target.value)}
                          style={selectStyle}
                        >
                          <option value="Pure Veg" style={{ background: "#141420" }}>Pure Veg</option>
                          <option value="Explorer (All)" style={{ background: "#141420" }}>Explorer (All)</option>
                          <option value="Street Food Trail" style={{ background: "#141420" }}>Street Food Trail</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="btn-primary"
                      style={{ padding: "14px 28px", fontSize: "14px", fontWeight: 800 }}
                    >
                      Customise Itinerary
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
                      <span style={{ fontSize: "14px", color: "#22C55E", fontWeight: 700 }}>we have saved your details , our team will contact you shortly</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.6 }}>
                      Your customized offline PDF itinerary has been generated with optimized routes and timing for your selected profile.
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
                <div style={{ padding: "30px 16px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "12px", overflowY: "hidden" }}>

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
                        <div style={{ fontSize: "14px", fontWeight: 900, color: "white" }}>Configure Itinerary</div>
                        <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                          <div style={{ width: "33%", height: "100%", background: "#EC4899" }} />
                        </div>

                        {/* Setup Fields Summary */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>PROFILE</div>
                            <div style={{ fontSize: "10px", fontWeight: 800, color: activePersonaObj.color }}>
                              {activePersonaObj.title}
                            </div>
                          </div>

                          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "8px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>INTERESTS</div>
                            <div style={{ fontSize: "9px", fontWeight: 800, color: activeInterestsObjs[0]?.color || "#F59E0B", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                              {activeInterestsObjs.map(i => i.title.split(" ")[0]).join(", ")}
                            </div>
                          </div>
                        </div>

                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "8px 10px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>ARRIVAL</span>
                            <span style={{ fontSize: "9px", fontWeight: 700, color: "white" }}>
                              {isNaN(Date.parse(arrivalDate)) ? arrivalDate : new Date(arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>ARRIVAL TIME</span>
                            <span style={{ fontSize: "9px", fontWeight: 700, color: "white" }}>{startTime}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>BUDGET</span>
                            <span style={{ fontSize: "9px", fontWeight: 700, color: "white" }}>{budgetRange.split(" ")[0]}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>FOOD VIBE</span>
                            <span style={{ fontSize: "9px", fontWeight: 700, color: "white" }}>{foodPref}</span>
                          </div>
                        </div>

                        {/* Interactive prompt to action */}
                        <div style={{ background: "rgba(236,72,153,0.06)", borderRadius: "12px", padding: "10px", border: "1px dashed #EC4899", textAlign: "center", fontSize: "9px", color: "#EC4899", fontWeight: 700, marginTop: "10px" }}>
                          Click &ldquo;Customise Itinerary&rdquo; on the left to calculate.
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
                          <span style={{ fontSize: "12px", fontWeight: 900, color: "white" }}>PDF Itinerary</span>
                          <span style={{ fontSize: "8px", color: "#C084FC", padding: "2px 6px", background: "rgba(192,132,252,0.15)", borderRadius: "40px", fontWeight: 800 }}>PDF READY</span>
                        </div>

                        {/* Profile Setup details pill */}
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "7px", color: activePersonaObj.color, background: `${activePersonaObj.color}15`, padding: "2px 6px", borderRadius: "4px", fontWeight: 800 }}>{activePersonaObj.title.toUpperCase()}</span>
                          {activeInterestsObjs.map(i => (
                            <span key={i.id} style={{ fontSize: "7px", color: i.color, background: `${i.color}15`, padding: "2px 6px", borderRadius: "4px", fontWeight: 800 }}>{i.title.toUpperCase()}</span>
                          ))}
                          <span style={{ fontSize: "7px", color: "#E0E0E0", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", fontWeight: 800 }}>{budgetRange.split(" ")[0].toUpperCase()}</span>
                        </div>

                        {/* Crowd Alert Card */}
                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "14px", padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }} />
                            <span style={{ fontSize: "9px", fontWeight: 800, color: "white" }}>CROWD FORECAST</span>
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: 800, color: "white", marginBottom: "2px" }}>Optimal Hours Configured</div>
                          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>We selected best-timing windows for {activePersonaObj.title}.</div>
                        </div>

                        {/* Next Stop Card */}
                        <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.15) 100%)", borderRadius: "14px", padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <div style={{ fontSize: "8px", fontWeight: 800, color: "#93C5FD", marginBottom: "4px" }}>CUSTOM INSIDER STOP</div>
                          <div style={{ fontSize: "12px", fontWeight: 900, color: "white", marginBottom: "2px" }}>{getSimulatedStop(selectedInterests).title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "rgba(255,255,255,0.6)", fontWeight: 650 }}>
                            <MapPin size={10} /> {getSimulatedStop(selectedInterests).desc}
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
      {showLeadModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      backdropFilter: "blur(8px)"
    }}
  >
    <div
      style={{
        width: "90%",
        maxWidth: "420px",
        background: "#141420",
        borderRadius: "24px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)"
      }}
    >
      <h3
        style={{
          color: "white",
          fontSize: "28px",
          fontWeight: 900,
          marginBottom: "12px"
        }}
      >
        Unlock Your Itinerary
      </h3>

      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "14px",
          lineHeight: 1.6,
          marginBottom: "24px"
        }}
      >
        Enter your details to generate your personalized travel experience.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={leadData.name}
          onChange={(e) =>
            setLeadData({
              ...leadData,
              name: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            fontSize: "14px",
            outline: "none"
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={leadData.email}
          onChange={(e) =>
            setLeadData({
              ...leadData,
              email: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            fontSize: "14px",
            outline: "none"
          }}
        />

        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={leadData.phone}
          onChange={(e) => {
            let val = e.target.value;
            // Always ensure value starts with "+91"
            if (!val.startsWith("+91")) {
              const digits = val.replace(/\D/g, "");
              if (digits.startsWith("91")) {
                val = "+91 " + digits.slice(2);
              } else {
                val = "+91 " + digits;
              }
            }
            setLeadData({
              ...leadData,
              phone: val
            });
          }}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            fontSize: "14px",
            outline: "none"
          }}
        />

        <button
          onClick={handleLeadSubmit}
          style={{
            marginTop: "10px",
            background:
              "linear-gradient(135deg, #EC4899, #8B5CF6)",
            border: "none",
            padding: "14px",
            borderRadius: "14px",
            color: "white",
            fontWeight: 800,
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          Generate My Itinerary
        </button>

        {leadError && (
          <div style={{
            padding: "10px 14px",
            borderRadius: "10px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#FCA5A5",
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: 1.5,
          }}>
            ⚠️ {leadError}
          </div>
        )}

        <button
          onClick={() => { setShowLeadModal(false); setLeadError(null); }}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
}
