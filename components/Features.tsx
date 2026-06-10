"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTiltEffect } from "@/components/MouseGlow";
import { Route, Sparkles, Users, Zap, Radio, Utensils, Clock, Shield, MapPin, ArrowRight, ArrowLeft, BarChart3, Activity, ShoppingBag } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Route, title: "Personalized Smart Itinerary", accent: "#EC4899",
    desc: "Your itinerary isn't generic. It's built around your group size, interests, pace, and travel dates — with day-by-day plans for every hour of your trip.",
    tag: "AI-Powered", type: "mega",
    bgImage: "/Kesariya-Darbar.jpg",
  },
  {
    icon: MapPin, title: "Local Culture Explorer", accent: "#3B82F6",
    desc: "Deep dive into local traditions. Curated guides for heritage walks, Punjabi folk performances, and authentic clay kitchens.",
    type: "medium",
    bgImage: "/sadda-pind.jpg",
  },
  {
    icon: Sparkles, title: "Hidden Gems", accent: "#A855F7",
    desc: "Discover the unexplored side of Amritsar. Unlock secret spots, offbeat experiences, hidden food joints, peaceful corners, local markets, authentic cultural experiences, and lesser-known places recommended by trusted locals.",
    tag: "Exclusive", type: "small",
    bgImage: "/pul-kanjari-amritsar-punjab-4-musthead-hero.jpeg",
  },
  {
    icon: Utensils, title: "Food Intelligence", accent: "#EF4444",
    desc: "A curated food guide featuring iconic dhabas and hidden street food gems perfectly sequenced for your taste.",
    tag: "Curated", type: "medium",
    bgImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
  },
  {
    icon: Zap, title: "Route Optimization", accent: "#F59E0B",
    desc: "AI-optimized routes that minimize travel time and sequence visits for maximum efficiency.",
    type: "mega",
    bgImage: "/heritage_street_amritsar1.png",
  },
  {
    icon: Clock, title: "Timing Intelligence", accent: "#8B5CF6",
    desc: "Perfect timing for landmarks — early morning Darshan at Golden Temple, ceremony at Wagah Border.",
    tag: "Optimized", type: "mega",
    bgImage: "/partition-museum-townhall.jpg",
  },
  {
    icon: Shield, title: "Priority Support", accent: "#F43F5E",
    desc: "Our expert team remains just a call away, providing real-time priority support and physical on-ground assistance in case of emergencies.",
    tag: "Support", type: "mega",
    bgImage: "https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: ShoppingBag, title: "HERO PRODUCTS", accent: "#F59E0B",
    desc: "Discover the most iconic tastes, crafts, and specialties of Amritsar. Explore authentic Punjabi juttis, phulkari, papad-wadiyan, handcrafted items, kulchas, lassi, sweets, spices, and other locally loved favorites recommended by trusted Local Gurus.",
    tag: "Local Icons", type: "full",
    bgImage: "/phirni.png",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function BentoCard({ feature, index, cardsPerPage, children }: { feature: typeof features[0]; index: number; cardsPerPage: number; children?: React.ReactNode }) {
  const tiltRef = useTiltEffect(10);
  const Icon = feature.icon;

  return (
    <motion.div
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card same-size"
      style={{
        background: "#0B0B14",
        borderRadius: "28px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        textAlign: "left",
        flex: `0 0 calc((100% - (${24 * (cardsPerPage - 1)}px)) / ${cardsPerPage})`,
        width: `calc((100% - (${24 * (cardsPerPage - 1)}px)) / ${cardsPerPage})`,
      }}
    >
      {/* Background Image Overlay */}
      {feature.bgImage && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${feature.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      {/* Text protection overlay - Direction-aware dark gradient */}
      {feature.bgImage && (
        <div
          className="bento-card-gradient"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(11,11,20,0.95) 0%, rgba(11,11,20,0.7) 50%, rgba(11,11,20,0.15) 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Background glow accent */}
      <div style={{
        position: "absolute", top: "-20%", right: "-20%",
        width: "60%", height: "60%", borderRadius: "50%",
        background: `radial-gradient(circle, ${feature.accent}08, transparent 70%)`,
        filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
        opacity: 0.8,
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "left", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "16px",
            background: `${feature.accent}14`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={24} style={{ color: feature.accent }} />
          </div>
          {feature.tag && (
            <span style={{
              fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "100px",
              background: `${feature.accent}22`, color: feature.accent,
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              {feature.tag}
            </span>
          )}
        </div>

        <h3 style={{ fontSize: "20px", fontWeight: 900, color: "white", marginBottom: "12px", letterSpacing: "-0.02em", lineHeight: 1.2, textAlign: "left" }}>
          {feature.title}
        </h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 500, lineHeight: 1.6, marginBottom: 0, textAlign: "left" }}>
          {feature.desc}
        </p>
      </div>

      {children && (
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto", display: "flex", flexDirection: "column" }}>
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
      background: "rgba(255, 255, 255, 0.05)", borderRadius: "20px", padding: "20px",
      border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "12px"
    }}>
      {[
        { t: "06:00", d: "Golden Temple Morning Darshan", c: "#EC4899" },
        { t: "09:30", d: "Kulcha Breakfast Run", c: "#F59E0B" },
        { t: "11:00", d: "Partition Museum", c: "#3B82F6" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", width: "35px" }}>{item.t}</span>
          <div style={{ width: "2px", height: "20px", background: `${item.c}30`, borderRadius: "1px" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{item.d}</span>
        </motion.div>
      ))}
      <div style={{ borderTop: "1px dashed rgba(255,255,255,0.15)", paddingTop: "12px", marginTop: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#EC4899" }}>OPTIMIZED ROUTE READY</span>
        <Activity size={12} color="#EC4899" className="live-dot" />
      </div>
    </div>
  );
}

function CultureHighlights() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {[
        { l: "Folk Dance & Music", v: "Gidha & Bhangra shows", c: "#3B82F6" },
        { l: "Clay Kitchens", v: "Authentic wood-fire cooking", c: "#F59E0B" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            background: "rgba(6, 6, 8, 0.8)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{s.l}</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{s.v}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FoodGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]" style={{ width: "100%" }}>
      {[
        { n: "Kesar Dhaba", t: "Legendary" },
        { n: "Beera Chicken", t: "Non-Veg" },
      ].map((f, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "12px", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{f.n}</div>
          <div style={{ fontSize: "15px", color: "rgba(255, 255, 255, 1)" }}>{f.t}</div>
        </div>
      ))}
    </div>
  );
}

function RouteMap() {
  return (
    <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "140px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <img src="/map.png" alt="Route Map" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(245,158,11,0.15), transparent)" }} />
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
      <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(11,11,20,0.85)", borderRadius: "8px", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, color: "white" }}>SAVING 45 MINS</span>
      </div>
    </div>
  );
}

function HeroProductsPreview() {
  const products = [
    { name: "Amritsari Kulcha", type: "Food" },
    { name: "Amritsari Lassi", type: "Beverage" },
    { name: "Papad Wadiyaan", type: "Local Treat" },
    { name: "Amritsari Jutti", type: "Craft" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", width: "100%" }}>
      {products.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
            padding: "10px 12px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 800, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
          <span style={{
            fontSize: "8px",
            fontWeight: 800,
            padding: "2px 6px",
            borderRadius: "4px",
            alignSelf: "flex-start",
            background: p.type === "Food" || p.type === "Beverage" || p.type === "Local Treat" ? "#FEF3C7" : "#F3E8FF",
            color: p.type === "Food" || p.type === "Beverage" || p.type === "Local Treat" ? "#D97706" : "#7C3AED",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            {p.type}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export default function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const cardsPerPage = isMobile ? 1 : isTablet ? 2 : 3;

  const sliderFeatures = [
    { feature: features[0], child: <ItineraryPreview /> },
    { feature: features[1], child: <CultureHighlights /> },
    { feature: features[3], child: <FoodGrid /> },
    { feature: features[4], child: <RouteMap /> },
    { feature: features[5], child: null },
    { feature: features[2], child: null },
    { feature: features[6], child: null },
    { feature: features[7], child: <HeroProductsPreview /> },
  ];

  const maxIndex = sliderFeatures.length - cardsPerPage;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="features" style={{ backgroundColor: "white", position: "relative", overflow: "hidden" }} className="section-padding">
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div className="glow-orb" style={{ width: "800px", height: "800px", background: "rgba(236,72,153,0.04)", top: "20%", left: "-10%", transform: "translateY(-50%)" }} />
      <div className="glow-orb" style={{ width: "600px", height: "600px", background: "rgba(59,130,246,0.05)", bottom: "10%", right: "-5%", transform: "translateY(50%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "60px" }}>
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
            Not just a guide. The personalized intelligence layer that ensures every minute of your trip is perfect.
          </motion.p>
        </div>

        {/* Slider Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#6B7280" }}>
            Feature <span style={{ color: "#3B82F6" }}>{currentIndex + 1}</span> of {sliderFeatures.length}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={prevSlide}
              style={{
                width: "48px", height: "48px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "white",
                color: "#1F1F24",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              style={{
                width: "48px", height: "48px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "white",
                color: "#1F1F24",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Wrapper */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ width: "100%", overflow: "hidden", position: "relative" }}
        >
          <motion.div
            animate={{ x: `calc(-${currentIndex} * (100% + 24px) / ${cardsPerPage})` }}
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {sliderFeatures.map((item, i) => (
              <BentoCard key={i} feature={item.feature} index={i} cardsPerPage={cardsPerPage}>
                {item.child}
              </BentoCard>
            ))}
          </motion.div>
        </div>

        {/* Pagination Indicator Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === currentIndex ? "#3B82F6" : "rgba(0,0,0,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Full-width Call To Action Card below the Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ borderColor: "rgba(245, 158, 11, 0.25)", boxShadow: "0 25px 90px rgba(245, 158, 11, 0.05)" }}
          className="cta-card"
          style={{
            background: "linear-gradient(135deg, #0A0A16 0%, #111126 100%)",
            borderRadius: "28px",
            display: "flex",
            flexDirection: windowWidth >= 768 ? "row" : "column",
            justifyContent: "space-between",
            alignItems: windowWidth >= 768 ? "center" : "flex-start",
            textAlign: "left",
            width: "100%",
            marginTop: "60px",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
            position: "relative",
            overflow: "hidden",
            padding: windowWidth >= 768 ? "48px" : "32px",
            gap: "32px",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Background Image Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(/heritage-walk.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.28,
            pointerEvents: "none",
            zIndex: 0,
          }} />

          {/* Golden/Amber Radial Ambient Glow */}
          <div style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }} />

          {/* Indigo Radial Ambient Glow */}
          <div style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }} />

          <div style={{ position: "relative", zIndex: 1, flex: "1 1 auto", maxWidth: "800px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "100px",
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#F59E0B",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              <Users size={12} /> Local Guru
            </div>

            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "white", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
              Experience Amritsar through the eyes of locals.
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.65)", fontWeight: 500, lineHeight: 1.6, marginTop: "8px", marginBottom: 0 }}>
              Unlock exclusive recommendations, hidden gems, authentic food trails, cultural experiences, best timings, parking, hygienic washrooms, photo spots, and smart journey guidance curated by Local Gurus.
            </p>
          </div>
          <motion.a
            href="#simulator"
            className="btn-primary"
            style={{
              padding: "16px 36px",
              fontSize: "15px",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
              background: "#F59E0B",
              borderColor: "#F59E0B",
              color: "#0F0F1A",
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(245, 158, 11, 0.2)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(245, 158, 11, 0.35)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Full Access Now <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        .bento-card {
          padding: 24px;
          min-height: 420px;
          transition: all 0.3s ease;
        }
        @media (max-width: 940px) {
          .bento-card {
            padding: 20px !important;
            min-height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
