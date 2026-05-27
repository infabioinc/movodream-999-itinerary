"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowRight, MoreVertical, X, Compass, AlertCircle, Sparkles, Users, Tag } from "lucide-react";
import { useMagneticEffect } from "@/components/MouseGlow";

const navLinks = [
  { label: "Overview", href: "#overview", icon: Compass, sub: "Explore Amritsar's top highlights" },
  { label: "The Problem", href: "#problem", icon: AlertCircle, sub: "Why traditional travel guides fail" },
  { label: "Intelligence", href: "#features", icon: Sparkles, sub: "Real-time routing & crowd sync" },
  { label: "Personas", href: "#personas", icon: Users, sub: "Tailored vibes for every group" },
  { label: "Pricing", href: "#pricing", icon: Tag, sub: "Claim your 80% launch discount" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const magneticLogo = useMagneticEffect(0.2);
  const magneticCTA = useMagneticEffect(0.2);

  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    setScrolled(latest > 20);

    if (mobileOpen) {
      setHidden(false);
    } else if (latest > 100) {
      if (diff > 0) {
        setHidden(true);
      } else if (diff < -10) {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  return (
    <>
      {/* Dark & Blurred Backdrop Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(12px)",
              zIndex: 90,
            }}
          />
        )}
      </AnimatePresence>

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
          position: "relative",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div ref={magneticLogo as React.RefObject<HTMLDivElement>} style={{ marginLeft: "12px" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <img
              src="/logo.webp"
              alt="Movodream"
              style={{ height: "24px", backgroundColor: "white", borderRadius: "999px", padding: "4px" }}
            />
            <div className="live-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EC4899" }} />
          </a>
        </div>

        {/* Desktop Nav */}
        <div style={{ alignItems: "center", gap: "4px" }} className="hidden md:flex">
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
          <div ref={magneticCTA as React.RefObject<HTMLDivElement>} className="hidden sm:block">
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
            className="flex"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={18} color="white" /> : <MoreVertical size={18} color="white" />}
          </button>
        </div>
        {/* Mobile Menu & Backdrop Blur */}
        <AnimatePresence>
          {mobileOpen && (
            /* Floating Dropdown Box */
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: "0px",
                  left: "auto",
                  width: "min(320px, calc(100vw - 40px))",
                  backgroundColor: "rgba(10, 10, 16, 0.95)",
                  backdropFilter: "blur(30px)",
                  borderRadius: "20px",
                  padding: "12px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  zIndex: 95,
                  overflow: "hidden",
                }}
              >
                {/* Radial gradient reflection */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 0%, rgba(236,72,153,0.12), transparent 75%)",
                  pointerEvents: "none",
                }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "4px", position: "relative", zIndex: 1 }}>
                  {navLinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "8px 12px",
                          borderRadius: "14px",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          border: "1px solid transparent",
                          background: "rgba(255,255,255,0.01)",
                        }}
                        whileHover={{
                          background: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.06)",
                          x: 4,
                        }}
                      >
                        {/* Icon container */}
                        <div style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <LinkIcon size={14} color="#EC4899" />
                        </div>

                        {/* Label + Description */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>
                            {link.label}
                          </span>
                          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                            {link.sub}
                          </span>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
    </>
  );
}
