"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Menu, X, Zap } from "lucide-react";
import { useMagneticEffect } from "@/components/MouseGlow";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "The Problem", href: "#problem" },
  { label: "Intelligence", href: "#features" },
  { label: "Personas", href: "#personas" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const magneticLogo = useMagneticEffect(0.2);
  const magneticCTA = useMagneticEffect(0.2);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "center", padding: "20px" }}
      initial={{ y: -100 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "100px",
          padding: "8px 12px",
          backgroundColor: scrolled ? "rgba(6, 6, 8, 0.8)" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: scrolled ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <div ref={magneticLogo as React.RefObject<HTMLDivElement>} style={{ marginLeft: "12px" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <img
              src="/logo.webp"
              alt="MovoDreams"
              style={{ height: "24px", backgroundColor: "white", borderRadius: "999px", padding: "4px" }}
            />
            <div className="live-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EC4899" }} />
          </a>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.5)",
                padding: "8px 16px", borderRadius: "100px",
                transition: "all 0.3s ease", textDecoration: "none",
                letterSpacing: "0.02em"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div ref={magneticCTA as React.RefObject<HTMLDivElement>}>
            <motion.a
              href="#cta"
              className="btn-primary"
              style={{ padding: "10px 24px", fontSize: "12px", fontWeight: 800, borderRadius: "100px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Unlock Access
              <ArrowRight size={14} strokeWidth={3} />
            </motion.a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={18} color="white" /> : <Menu size={18} color="white" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{
            position: "absolute", top: "100px", left: "20px", right: "20px",
            backgroundColor: "rgba(6, 6, 8, 0.95)", backdropFilter: "blur(30px)",
            borderRadius: "32px", padding: "24px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "16px", fontSize: "16px",
                fontWeight: 700, color: "white", borderRadius: "16px",
                textDecoration: "none", transition: "background 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <Zap size={14} color="#EC4899" />
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
