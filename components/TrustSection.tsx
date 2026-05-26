"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, X, Shield, Clock, MapPin, Eye, Sparkles, HelpCircle, FileText, BarChart } from "lucide-react";
import { useTiltEffect } from "@/components/MouseGlow";

// ── Types & Data ──────────────────────────────────────────────────────────────

interface CompareRow {
  name: string;
  t199: string | boolean;
  t499: string | boolean;
  t999: string | boolean;
  highlighted?: boolean;
}

const comparisonTable: CompareRow[] = [
  { name: "City Attractions", t199: true, t499: true, t999: true },
  { name: "Personalized Itinerary Builder", t199: false, t499: true, t999: true },
  { name: "Multi-Day Journeys", t199: true, t499: true, t999: true },
  { name: "Hidden Gems", t199: false, t499: true, t999: true },
  { name: "Handpicked Experiences", t199: false, t499: true, t999: true },
  { name: "Local Guru Recommendations", t199: false, t499: true, t999: true },
  { name: "Food Recommendations", t199: "Basic", t499: "Curated", t999: "Premium + Niche + Reservations" },
  { name: "Smart Shopping Guide", t199: false, t499: true, t999: true },
  { name: "Transit + Route Optimization", t199: "Basic", t499: "Smart routes", t999: "Dynamic optimization" },
  { name: "Best Entry/Exit Strategy (IRN Layer)", t199: false, t499: true, t999: true, highlighted: true },
  { name: "Live Alerts (Closures / Rush / Events)", t199: false, t499: false, t999: true },
  { name: "Festivals & Celebrations", t199: false, t499: true, t999: true },
  { name: "Safe Travel Companion", t199: "Basic", t499: "Detailed", t999: "Advanced + Alerts" },
  { name: "Time-Slot Optimization", t199: false, t499: true, t999: true },
  { name: "Budget Optimization Tips", t199: "Basic", t499: true, t999: true },
  { name: "Premium Dining Recommendations", t199: false, t499: true, t999: "Yes (with reservations)" },
  { name: "Nightlife", t199: false, t499: true, t999: true },
  { name: "Booking Support", t199: false, t499: "Provided on request", t999: "Full integration" },
  { name: "Offline Access (Downloadable)", t199: true, t499: true, t999: true, highlighted: true },
  { name: "Priority Support / Chat Assistance", t199: false, t499: "Limited", t999: "Priority support during journey" },
];

const previewTimeline = [
  {
    time: "05:00 AM",
    title: "Sunrise at Golden Temple",
    location: "Harmandir Sahib",
    tag: "Spiritual",
    desc: "Arrive before dawn when the crowd density is at its lowest (approx. 15%). Experience absolute serene chants reflected on the holy waters as the first rays hit the gilded domes.",
    intel: "AI Optimization: Saves 1.5 hours of queue wait compared to arriving at 10:00 AM."
  },
  {
    time: "08:30 AM",
    title: "Amritsari Kulcha Breakfast",
    location: "Bhai Kulchant Singh (Maqbool Road)",
    tag: "Food Gem",
    desc: "A handpicked local spot. Feast on layered, clay-baked flatbreads stuffed with spiced potatoes and cauliflower, baked till golden-crisp and drenched in pure butter.",
    intel: "Guru Rec: Avoid main-street tourist trap restaurants; get the authentic street recipe here."
  },
  {
    time: "11:00 AM",
    title: "Partition Museum Tour",
    location: "Town Hall",
    tag: "Heritage",
    desc: "A deeply moving walk through newspapers, letters, and recorded voices detailing the historic 1947 partition of Punjab.",
    intel: "Weather Alert: Spend mid-day inside this fully air-conditioned colonial building to avoid heat."
  },
  {
    time: "03:30 PM",
    title: "Wagah Border Ceremony",
    location: "Attari-Wagah Border",
    tag: "Must-See",
    desc: "Witness the roaring border-lowering ceremony. High-stepping military drills, patriotic cheers, and synchronized flag lowering.",
    intel: "IRN Layer Hint: Exit exactly 5 mins before the final whistle to bypass the 4,000-person taxi stampede."
  },
  {
    time: "07:30 PM",
    title: "Niche Dinner & Heritage Walk",
    location: "Kesar Da Dhaba",
    tag: "Premium Dining",
    desc: "End the day inside the walled city eating legendary slow-simmered Mah-di-Dal (cooked for 12 hours) and warm, thick laccha parathas.",
    intel: "Booking Tip: Full-pack members get prioritized tables pre-registered through our network."
  }
];

// ── Components ────────────────────────────────────────────────────────────────

export default function TrustSection() {
  const [activeTab, setActiveTab] = useState<"itinerary" | "compare">("compare");
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check size={18} color="#22C55E" style={{ margin: "0 auto" }} />
      ) : (
        <X size={18} color="#EF4444" style={{ margin: "0 auto", opacity: 0.3 }} />
      );
    }
    return <span style={{ fontSize: "13px", fontWeight: 650, color: "#4B5563" }}>{val}</span>;
  };

  return (
    <section id="trust" style={{ backgroundColor: "#F9F9FB", position: "relative", overflow: "hidden" }} className="section-padding">
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(#A855F7 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>

        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "50px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "white", border: "1px solid rgba(168,85,247,0.15)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              marginBottom: "24px",
            }}
          >
            <Shield size={14} style={{ color: "#A855F7" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#7C3AED" }}>TRUST & AUTHENTICITY</span>
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
            Real Product <span className="gradient-text">Previews</span>
            <br />
            & Detailed Plan <span style={{ color: "#9CA3AF" }}>Matrix.</span>
          </motion.h2>

          <p style={{ fontSize: "17px", color: "#6B7280", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            No black boxes or hidden exclusions. Review our real day timeline and compare our exact plans side-by-side.
          </p>
        </div>

        {/* Custom Tabs */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "60px"
        }}>
          <button
            onClick={() => setActiveTab("compare")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "14px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              border: "1px solid",
              borderColor: activeTab === "compare" ? "rgba(59,130,246,0.3)" : "rgba(0,0,0,0.08)",
              background: activeTab === "compare" ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)" : "white",
              color: activeTab === "compare" ? "#1D4ED8" : "#6B7280",
              boxShadow: activeTab === "compare" ? "0 4px 12px rgba(59,130,246,0.1)" : "none",
              transition: "all 0.3s ease"
            }}
          >
            <BarChart size={16} />
            Full Plan Comparison Table
          </button>

          <button
            onClick={() => setActiveTab("itinerary")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "14px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              border: "1px solid",
              borderColor: activeTab === "itinerary" ? "rgba(168,85,247,0.3)" : "rgba(0,0,0,0.08)",
              background: activeTab === "itinerary" ? "linear-gradient(135deg, #FAF5FF, #F3E8FF)" : "white",
              color: activeTab === "itinerary" ? "#7C3AED" : "#6B7280",
              boxShadow: activeTab === "itinerary" ? "0 4px 12px rgba(168,85,247,0.1)" : "none",
              transition: "all 0.3s ease"
            }}
          >
            <Clock size={16} />
            Real Itinerary Preview
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ position: "relative", minHeight: "500px" }}>

          {/* TAB 1: Real Itinerary Timeline Preview */}
          {activeTab === "itinerary" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "40px",
                background: "white",
                borderRadius: "32px",
                padding: "48px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.03)"
              }}
              className="itinerary-grid"
            >
              {/* Left Column: Timeline Switcher */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderRight: "1px solid rgba(0,0,0,0.06)", paddingRight: "30px" }} className="timeline-left">
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Schedule Timeline (Day 1)
                </div>
                {previewTimeline.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTimelineIndex(idx)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "16px",
                      borderRadius: "16px",
                      cursor: "pointer",
                      border: "none",
                      background: selectedTimelineIndex === idx ? "linear-gradient(135deg, #1F1F24, #14141A)" : "rgba(0,0,0,0.02)",
                      color: selectedTimelineIndex === idx ? "white" : "#1F1F24",
                      textAlign: "left",
                      width: "100%",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 800, color: selectedTimelineIndex === idx ? "#FBBF24" : "#9CA3AF", marginBottom: "4px" }}>
                      {item.time}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 800, lineHeight: 1.2 }}>
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Column: Detailed View */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <motion.div
                  key={selectedTimelineIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "6px",
                      background: "#F3E8FF", color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.05em"
                    }}>
                      {previewTimeline[selectedTimelineIndex].tag}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6B7280", fontWeight: 600 }}>
                      <MapPin size={12} /> {previewTimeline[selectedTimelineIndex].location}
                    </div>
                  </div>

                  <h3 style={{ fontSize: "32px", fontWeight: 900, color: "#1F1F24", marginBottom: "20px", letterSpacing: "-0.03em" }}>
                    {previewTimeline[selectedTimelineIndex].title}
                  </h3>

                  <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: 1.8, fontWeight: 500, marginBottom: "32px" }}>
                    {previewTimeline[selectedTimelineIndex].desc}
                  </p>

                  {/* Smart Intel Overlay */}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(59,130,246,0.05) 100%)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    borderRadius: "20px",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px"
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px", background: "white",
                      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                    }}>
                      <Sparkles size={16} color="#EC4899" />
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 800, color: "#EC4899", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "2px" }}>
                        Dashboard Intel
                      </div>
                      <div style={{ fontSize: "13px", color: "#1F1F24", fontWeight: 700, lineHeight: 1.4 }}>
                        {previewTimeline[selectedTimelineIndex].intel}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Plan Comparison Matrix */}
          {activeTab === "compare" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "white",
                borderRadius: "32px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
                overflow: "hidden"
              }}
            >
              {/* Table Wrapper */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <th style={{ padding: "24px 30px", fontSize: "14px", fontWeight: 800, color: "#1F1F24", width: "40%" }}>Feature / Capability</th>
                      <th style={{ padding: "24px 20px", fontSize: "14px", fontWeight: 800, color: "#4B5563", textAlign: "center" }}>₹199 Plan</th>
                      <th style={{ padding: "24px 20px", fontSize: "14px", fontWeight: 800, color: "#4B5563", textAlign: "center" }}>₹499 Plan</th>
                      <th style={{
                        padding: "24px 20px", fontSize: "14px", fontWeight: 900,
                        color: "white", background: "#1F1F24", textAlign: "center",
                        position: "relative"
                      }}>
                        ₹999 Ultimate
                        <span style={{
                          position: "absolute", top: "4px", right: "12px",
                          fontSize: "8px", fontWeight: 900, background: "#22C55E",
                          color: "white", padding: "1px 6px", borderRadius: "100px", letterSpacing: "0.05em"
                        }}>
                          BEST
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid rgba(0,0,0,0.04)",
                          background: row.highlighted ? "rgba(251,191,36,0.08)" : "transparent",
                          transition: "background 0.2s ease"
                        }}
                      >
                        <td style={{
                          padding: "18px 30px",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#1F1F24",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          {row.highlighted && <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#D97706" }} />}
                          {row.name}
                          {row.highlighted && (
                            <span style={{
                              fontSize: "9px", fontWeight: 800, background: "#FEF3C7",
                              color: "#D97706", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase"
                            }}>
                              Highlighted
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "18px 20px", textAlign: "center" }}>
                          {renderValue(row.t199)}
                        </td>
                        <td style={{ padding: "18px 20px", textAlign: "center" }}>
                          {renderValue(row.t499)}
                        </td>
                        <td style={{
                          padding: "18px 20px", textAlign: "center",
                          background: "rgba(31,31,36,0.02)",
                          fontWeight: 750,
                          color: "#1F1F24"
                        }}>
                          {renderValue(row.t999)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .itinerary-grid { grid-template-columns: 1fr !important; gap: 30px !important; padding: 24px !important; }
          .timeline-left { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.06) !important; padding-right: 0 !important; padding-bottom: 20px !important; flex-direction: row !important; overflow-x: auto !important; }
          .timeline-left > button { width: auto !important; flex-shrink: 0 !important; }
        }
      `}</style>
    </section>
  );
}
