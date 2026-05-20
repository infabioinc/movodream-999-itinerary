"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            backgroundColor: "#060608",
          }}
        >
          {/* Spatial Background */}
          <div className="grid-overlay" style={{ opacity: 0.2 }} />
          <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
             transition={{ duration: 4, repeat: Infinity }}
             style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(236,72,153,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
          />

          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: "60px" }}
            >
              <img
                src="/logo.webp"
                alt="Movodream"
                style={{ height: "48px" }}
              />
            </motion.div>

            {/* Counter */}
            <div style={{ fontSize: "120px", fontWeight: 950, color: "white", letterSpacing: "-0.05em", lineHeight: 0.8, marginBottom: "40px", opacity: 0.1 }}>
               {Math.floor(progress)}
            </div>

            {/* Progress Bar */}
            <div style={{ width: "240px", height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden", position: "relative" }}>
               <motion.div
                  style={{ height: "100%", background: "linear-gradient(90deg, #EC4899, #3B82F6)", width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
               />
            </div>

            <motion.div
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               style={{ marginTop: "32px", fontSize: "10px", fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}
            >
               BOOTING NEURAL TRAVEL ENGINE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
