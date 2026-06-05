"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Clock, MapPin, Sparkles, Lock } from "lucide-react";
import { useTiltEffect } from "@/components/MouseGlow";

// ── Types & Data ──────────────────────────────────────────────────────────────

const previewTimeline = [
  {
    time: "06:00 AM",
    title: "Morning Darshan at Golden Temple",
    location: "Harmandir Sahib",
    tag: "Spiritual",
    desc: "Arrive before dawn when the crowd density is at its lowest (approx. 15%). Experience absolute serene chants reflected on the holy waters as the first rays hit the gilded domes.",
    intel: "AI Optimization: Saves 1.5 hours of queue wait compared to arriving at 10:00 AM.",
    image: "sunrise.png"
  },
  {
    time: "09:30 AM",
    title: "Amritsari Kulcha Breakfast",
    location: "Bhai Kulchant Singh (Maqbool Road)",
    tag: "Food Gem",
    desc: "A handpicked local spot. Feast on layered, clay-baked flatbreads stuffed with spiced potatoes and cauliflower, baked till golden-crisp and drenched in pure butter.",
    intel: "Guru Rec: Avoid main-street tourist trap restaurants; get the authentic street recipe here.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80"
  },
  {
    key: 2,
    time: "11:00 AM",
    title: "Partition Museum Tour",
    location: "Town Hall",
    tag: "Heritage",
    desc: "A deeply moving walk through newspapers, letters, and recorded voices detailing the historic 1947 partition of Punjab.",
    intel: "Weather Alert: Spend mid-day inside this fully air-conditioned colonial building to avoid heat.",
    image: "/partition-museum.jpeg"
  },
  {
    time: "03:30 PM",
    title: "Wagah Border Ceremony",
    location: "Attari-Wagah Border",
    tag: "Must-See",
    desc: "Witness the roaring border-lowering ceremony. High-stepping military drills, patriotic cheers, and synchronized flag lowering.",
    intel: "IRN Layer Hint: Exit exactly 5 mins before the final whistle to bypass the 4,000-person taxi stampede.",
    image: "https://images.unsplash.com/photo-1659763344736-7ea8ed3d1f5e?w=800&auto=format&fit=crop&q=80"
  },
  {
    time: "07:30 PM",
    title: "Niche Dinner & Heritage Walk",
    location: "Kesar Da Dhaba",
    tag: "Premium Dining",
    desc: "End the day inside the walled city eating legendary slow-simmered Mah-di-Dal (cooked for 12 hours) and warm, thick laccha parathas.",
    intel: "Booking Tip: Full-pack members get prioritized tables pre-registered through our network.",
    image: "heritage-walk.jpg"
  }
];

// ── Components ────────────────────────────────────────────────────────────────

export default function TrustSection() {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

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
          </motion.h2>

          <p style={{ fontSize: "17px", color: "#6B7280", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            No black boxes or hidden exclusions. Review our real day timeline to see how we plan your day.
          </p>
        </div>

        {/* Tab Content */}
        <div style={{ position: "relative", minHeight: "500px" }}>

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
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderRight: "1px solid rgba(0,0,0,0.06)", paddingRight: "30px", position: "relative" }} className="timeline-left">
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                Schedule Timeline (Day 1)
              </div>

              {/* First 2 items (Unlocked) */}
              {previewTimeline.slice(0, 2).map((item, idx) => (
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

              {/* Remaining items (Locked & Blurred) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
                {previewTimeline.slice(2).map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px",
                      borderRadius: "16px",
                      background: "rgba(0,0,0,0.015)",
                      border: "1px dashed rgba(0,0,0,0.08)",
                      opacity: 0.7,
                      filter: "blur(4px)",
                      userSelect: "none",
                      width: "100%",
                      pointerEvents: "none"
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: "#9CA3AF", marginBottom: "4px" }}>
                        {item.time}
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: 800, lineHeight: 1.2, color: "#1F1F24" }}>
                        {item.title}
                      </span>
                    </div>
                    <Lock size={14} style={{ color: "#9CA3AF", flexShrink: 0, marginLeft: "8px" }} />
                  </div>
                ))}
              </div>

              {/* Dedicated CTA at the bottom */}
              <div style={{
                marginTop: "12px",
                padding: "20px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #FAF5FF, #F3E8FF)",
                border: "1px solid rgba(168,85,247,0.12)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
              }}>
                <div style={{ fontSize: "12px", fontWeight: 850, color: "#7C3AED" }}>
                  Want the complete day itinerary?
                </div>
                <a
                  href="#simulator"
                  className="btn-primary"
                  style={{
                    padding: "10px 18px",
                    fontSize: "12px",
                    fontWeight: 800,
                    borderRadius: "100px",
                    boxShadow: "0 10px 25px rgba(124,58,237,0.15)",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  Customize Itinerary <Sparkles size={12} style={{ marginLeft: "6px" }} />
                </a>
              </div>
            </div>

            {/* Right Column: Detailed View */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <motion.div
                key={selectedTimelineIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  padding: "36px",
                  background: "#0B0B14",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 15px 45px rgba(0,0,0,0.3)",
                  overflow: "hidden",
                  color: "white"
                }}
              >
                {/* Dynamic Background Image */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${previewTimeline[selectedTimelineIndex].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.75,
                  pointerEvents: "none",
                  zIndex: 0
                }} />

                {/* Dark Vignette Overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(11,11,20,0.45) 0%, rgba(11,11,20,0.65) 100%)",
                  pointerEvents: "none",
                  zIndex: 0
                }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 900, padding: "4px 10px", borderRadius: "6px",
                      background: "#EC4899", color: "white", textTransform: "uppercase", letterSpacing: "0.05em"
                    }}>
                      {previewTimeline[selectedTimelineIndex].tag}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "rgba(255,255,255,0.8)", fontWeight: 800 }}>
                      <MapPin size={12} style={{ color: "#EC4899" }} /> {previewTimeline[selectedTimelineIndex].location}
                    </div>
                  </div>

                  <h3 style={{ fontSize: "30px", fontWeight: 950, color: "white", marginBottom: "20px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                    {previewTimeline[selectedTimelineIndex].title}
                  </h3>

                  <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.95)", lineHeight: 1.8, fontWeight: 700, marginBottom: "32px" }}>
                    {previewTimeline[selectedTimelineIndex].desc}
                  </p>

                  {/* Smart Intel Overlay */}
                  <div style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px"
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                      <Sparkles size={16} color="#EC4899" />
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 900, color: "#EC4899", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "2px" }}>
                        Guru Intel
                      </div>
                      <div style={{ fontSize: "13px", color: "white", fontWeight: 850, lineHeight: 1.4 }}>
                        {previewTimeline[selectedTimelineIndex].intel}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

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
