"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060608 0%, #0F0F1A 50%, #141420 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "fixed", top: "20%", left: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "400px",
      }}>
        {/* Logo badge */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "10px 20px", borderRadius: "100px",
            background: "rgba(236,72,153,0.08)",
            border: "1px solid rgba(236,72,153,0.2)",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#EC4899",
              boxShadow: "0 0 8px rgba(236,72,153,0.8)",
            }} />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#EC4899", letterSpacing: "0.12em" }}>
              MOVODREAM ADMIN
            </span>
          </div>
          <h1 style={{
            fontSize: "32px", fontWeight: 900, color: "white",
            letterSpacing: "-0.03em", marginBottom: "8px",
          }}>
            Leads Dashboard
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
            Enter your admin password to continue
          </p>
        </div>

        {/* Login card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 800,
                color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: "8px",
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                style={{
                  width: "100%", padding: "14px 16px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: "white", fontSize: "15px", outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = "rgba(236,72,153,0.5)"; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>

            {error && (
              <div style={{
                padding: "10px 14px", borderRadius: "10px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#FCA5A5", fontSize: "13px", fontWeight: 600,
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                marginTop: "4px",
                padding: "14px",
                borderRadius: "14px",
                background: loading || !password
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, #EC4899, #E11D8A)",
                border: "none",
                color: loading || !password ? "rgba(255,255,255,0.3)" : "white",
                fontSize: "15px", fontWeight: 800,
                cursor: loading || !password ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "-0.01em",
              }}
            >
              {loading ? "Verifying..." : "Access Dashboard →"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center", marginTop: "24px",
          fontSize: "12px", color: "rgba(255,255,255,0.2)", fontWeight: 500,
        }}>
          Movodream · Admin Panel · Protected
        </p>
      </div>
    </div>
  );
}
