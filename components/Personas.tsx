"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTiltEffect } from "@/components/MouseGlow";
import { Heart, Users, User, UsersRound, Sparkles, MapPin } from "lucide-react";

const personas = [
  {
    icon: Heart, title: "Couples",
    desc: "Morning prayers at Golden Temple, candlelit heritage dinners, and shared moments at hidden gems.",
    tags: ["Sunset Spots", "Private Dining"],
    accent: "#EC4899", image: "/coulple.jpg",
    pos: { top: "0px", left: "0%", width: "45%" }
  },
  {
    icon: Users, title: "Families", subtitle: "Safe Adventures",
    desc: "Safe, enriching history that kids actually feel — Partition Museum, Gobindgarh Fort, food trails.",
    tags: ["Family-Safe", "Educational", "Food Trails"],
    accent: "#3B82F6", image: "/persona_family.png",
    pos: { top: "100px", right: "0%", width: "48%" }
  },
  {
    icon: User, title: "Solo Soul", subtitle: "Cultural Immersion",
    desc: "Explore the walled city's hidden lanes, connect with local artisans, find secret photo spots.",
    tags: ["Solo-Safe", "Local Connections", "Hidden Streets"],
    accent: "#A855F7", image: "/persona_solo.png",
    pos: { top: "600px", left: "5%", width: "42%" }
  },
  {
    icon: UsersRound, title: "Friend Squads", subtitle: "Epic Shared Trips",
    desc: "Vibrant food trails, Wagah ceremonies, rooftop parties in heritage havelis, and spiritual dives.",
    tags: ["Group Perks", "Nightlife", "Shared Moments"],
    accent: "#22C55E", image: "/persona_friends.webp",
    pos: { top: "700px", right: "5%", width: "44%" }
  },
];

function PersonaCard({ persona, index }: { persona: typeof personas[0]; index: number }) {
  const tiltRef = useTiltEffect(12);
  const Icon = persona.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="persona-card-wrapper"
      style={{
        position: "absolute",
        ...persona.pos,
        height: "540px",
        borderRadius: "32px",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? `0 30px 70px ${persona.accent}25, 0 10px 30px rgba(0,0,0,0.3)`
          : "0 20px 60px rgba(0,0,0,0.2)",
        zIndex: hovered ? 50 : 5 + index,
        transition: "box-shadow 0.3s ease, z-index 0.3s ease",
      }}
    >
      {/* Background Image with Hover Zoom */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img src={persona.image} alt={persona.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>

      {/* Cinematic Gradient Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(6,6,8,0.98) 0%, rgba(6,6,8,0.8) 40%, rgba(6,6,8,0.2) 100%)",
      }} />

      {/* Content Layer (elevated via preserve-3d) */}
      <div style={{
        position: "absolute", inset: 0, padding: "40px",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        transform: "translateZ(40px)", pointerEvents: "none"
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px",
          background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "20px",
        }}>
          <Icon size={20} color="white" />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)", marginBottom: "4px" }}>
            {persona.subtitle}
          </div>
          <h3 style={{ fontSize: "32px", fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {persona.title}
          </h3>
        </div>

        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.95)", fontWeight: 500, lineHeight: 1.6, marginBottom: "24px", maxWidth: "90%" }}>
          {persona.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {persona.tags.map(t => (
            <span key={t} style={{
              fontSize: "10px", fontWeight: 700, padding: "6px 14px", borderRadius: "100px",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              color: "white", backdropFilter: "blur(10px)"
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Floating accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "4px",
        background: `linear-gradient(90deg, ${persona.accent}, transparent)`,
        opacity: 0.8
      }} />
    </motion.div>
  );
}

export default function Personas() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="personas" ref={sectionRef} style={{ backgroundColor: "#F9F9FB", position: "relative" }} className="section-padding">
      {/* Background Spatial elements */}
      <div className="grid-overlay-light" style={{ opacity: 0.3 }} />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ position: "absolute", top: "15%", left: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <motion.div
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        style={{ position: "absolute", bottom: "10%", right: "10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container" style={{ position: "relative" }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "100px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "white", border: "1px solid rgba(0,0,0,0.06)",
              marginBottom: "24px",
            }}
          >
            <UsersRound size={14} style={{ color: "#EC4899" }} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F1F24" }}>Personalized Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900,
              color: "#1F1F24", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "24px",
            }}
          >
            Amritsar, Designed <span className="gradient-text">For Your Persona.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "18px", color: "#6B7280", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}
          >
            Amritsar is different for everyone. Our AI understands your context and tailors every second of your journey.
          </motion.p>
        </div>

        {/* Spatial Layered Composition */}
        <div style={{ position: "relative", height: "1350px" }} className="spatial-persona-container">
          {personas.map((p, i) => (
            <PersonaCard key={p.title} persona={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .spatial-persona-container {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .persona-card-wrapper {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 480px !important;
          }
        }
      `}</style>
    </section>
  );
}
