"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMagneticEffect } from "@/components/MouseGlow";

const footerLinks = [
   { label: "Privacy Policy", href: "#" },
   { label: "Terms of Service", href: "#" },
   { label: "Contact", href: "#" },
   { label: "Support", href: "#" },
];

export default function Footer() {
   const magneticCTA = useMagneticEffect(0.2);

   return (
      <footer style={{ backgroundColor: "#060608", color: "white", position: "relative", overflow: "hidden" }}>
         {/* Top border with moving light */}
         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }} />

         <div className="container" style={{ paddingTop: "100px", paddingBottom: "60px" }}>

            {/* Brand & Vision Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "60px", marginBottom: "80px" }} className="footer-top">

               <div style={{ maxWidth: "400px" }}>
                  <a href="#overview" style={{ display: "inline-block" }}>
                     <img
                        src="/logo.webp"
                        alt="movodream"
                        style={{ height: "32px", marginBottom: "24px", cursor: "pointer" }}
                     />
                  </a>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                     The definitive intelligence layer for Amritsar travelers. Built by locals,
                     powered by AI, and designed for those who demand a premium, low-crowd journey.
                  </p>
               </div>

               <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: "white", letterSpacing: "0.1em", marginBottom: "24px" }}>RESOURCES</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                     {navLinksGroup1.map(l => (
                        <a key={l.label} href={l.href} style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "white"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
                           {l.label}
                        </a>
                     ))}
                  </div>
               </div>

               <div ref={magneticCTA as React.RefObject<HTMLDivElement>}>
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: "white", letterSpacing: "0.1em", marginBottom: "24px" }}>GET STARTED</h4>
                  <motion.a
                     href="#cta"
                     className="btn-primary"
                     style={{ padding: "14px 28px", fontSize: "14px", fontWeight: 900, borderRadius: "14px" }}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     Get Royal Access <ArrowRight size={16} strokeWidth={3} />
                  </motion.a>
               </div>
            </div>
            {/* POWERED BY */}
            <div className="mt-5 flex justify-end">
               <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 transition-all duration-300 hover:bg-white/10">

                  <a
                     href="https://fabulousmedia.in/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="opacity-90 hover:opacity-100 transition-opacity"
                     aria-label="FabulousMedia"
                  >
                     <img
                        src="/fabulous-logo.png"
                        alt="FabulousMedia"
                        className="h-3 w-auto"
                     />
                  </a>

                  <span className="h-3 w-px bg-white/30" />

                  <a
                     href="https://gocommercially.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="opacity-200 hover:opacity-200 transition-opacity"
                     aria-label="GoCommercially"
                  >
                     <img
                        src="/gocommercially-logo.png"
                        alt="GoCommercially"
                        className="h-3 w-auto"
                     />
                  </a>

               </div>
            </div>
            {/* Bottom Bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>

               <div style={{ display: "flex", gap: "24px" }}>
                  {footerLinks.map(l => (
                     <a key={l.label} href={l.href} style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{l.label}</a>
                  ))}
               </div>
            </div>

            <div style={{ marginTop: "60px", textAlign: "center", opacity: 0.2 }}>
               <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>© 2026 MOVODREAM · MADE FOR THE MODERN EXPLORER</p>
            </div>
         </div>

         <style>{`
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
      </footer>
   );
}

const navLinksGroup1 = [
   { label: "Overview", href: "#overview" },
   { label: "Intelligence", href: "#features" },
   { label: "Personas", href: "#personas" },
   { label: "Pricing", href: "#pricing" },
];
