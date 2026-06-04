"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  persona: string | null;
  interest: string | null;
  arrival_date: string | null;
  start_time: string | null;
  budget: string | null;
  food_pref: string | null;
  created_at: string;
}

const PERSONA_COLORS: Record<string, string> = {
  couple: "#EC4899",
  family: "#3B82F6",
  solo: "#A855F7",
  friends: "#22C55E",
};

const INTEREST_COLORS: Record<string, string> = {
  religious: "#F59E0B",
  patriotic: "#10B981",
  food: "#EF4444",
  heritage: "#8B5CF6",
};

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "18px", padding: "20px 24px",
      display: "flex", flexDirection: "column", gap: "6px",
      flex: "1 1 160px",
    }}>
      <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: "32px", fontWeight: 900, color, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

function Badge({ text, color }: { text: string; color?: string }) {
  const c = color ?? "#9CA3AF";
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px", borderRadius: "100px",
      background: `${c}18`,
      border: `1px solid ${c}40`,
      color: c, fontSize: "11px", fontWeight: 700,
      textTransform: "capitalize",
    }}>
      {text}
    </span>
  );
}

export default function AdminDashboard({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [personaFilter, setPersonaFilter] = useState("all");
  const [interestFilter, setInterestFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh every 60s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/admin?_refresh=1", { method: "GET" });
        if (res.ok) {
          router.refresh();
          setLastRefresh(new Date());
        }
      } catch {
        // silent fail
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [router]);

  // Derived stats
  const today = new Date().toISOString().split("T")[0];
  const todayLeads = leads.filter((l) => l.created_at?.startsWith(today)).length;

  const topPersona = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => { if (l.persona) counts[l.persona] = (counts[l.persona] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  }, [leads]);

  const topInterest = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => { if (l.interest) counts[l.interest] = (counts[l.interest] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  }, [leads]);

  // Filtered leads
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) => {
      const matchSearch = !q ||
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q);
      const matchPersona = personaFilter === "all" || l.persona === personaFilter;
      const matchInterest = interestFilter === "all" || l.interest === interestFilter;
      const matchBudget = budgetFilter === "all" || l.budget?.includes(budgetFilter);
      return matchSearch && matchPersona && matchInterest && matchBudget;
    });
  }, [leads, search, personaFilter, interestFilter, budgetFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        alert("Failed to delete lead.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Persona", "Interest", "Arrival", "Start Time", "Budget", "Food Pref", "Submitted At"];
    const rows = filtered.map((l) => [
      l.id, l.name ?? "", l.email ?? "", l.phone ?? "",
      l.persona ?? "", l.interest ?? "", l.arrival_date ?? "",
      l.start_time ?? "", l.budget ?? "", l.food_pref ?? "",
      new Date(l.created_at).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `movodream-leads-${today}.csv`;
    a.click();
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "12px",
    color: "white",
    fontSize: "13px",
    fontWeight: 600,
    padding: "9px 14px",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #060608 0%, #0A0A0F 40%, #141420 100%)",
      fontFamily: "'Inter', sans-serif",
      color: "white",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#22C55E", boxShadow: "0 0 10px rgba(34,197,94,0.8)",
                animation: "pulse 2s infinite",
              }} />
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#22C55E", letterSpacing: "0.1em" }}>LIVE</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                Last refresh: {lastRefresh.toLocaleTimeString("en-IN")}
              </span>
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.03em", color: "white" }}>
              Movodream <span style={{ background: "linear-gradient(135deg,#EC4899,#A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Leads</span>
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
              {filtered.length} of {leads.length} leads shown
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={handleExportCSV}
              style={{
                ...inputStyle,
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#4ADE80", cursor: "pointer", padding: "10px 18px",
              }}
            >
              ↓ Export CSV
            </button>
            <button
              onClick={() => { router.refresh(); setLastRefresh(new Date()); }}
              style={{ ...inputStyle, cursor: "pointer", padding: "10px 18px" }}
            >
              ↺ Refresh
            </button>
            <button
              onClick={handleLogout}
              style={{
                ...inputStyle,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#FCA5A5", cursor: "pointer", padding: "10px 18px",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
          <StatCard label="Total Leads" value={leads.length} color="#EC4899" sub="all time" />
          <StatCard label="Today" value={todayLeads} color="#3B82F6" sub={today} />
          <StatCard label="Top Persona" value={topPersona} color={PERSONA_COLORS[topPersona] ?? "#9CA3AF"} sub="most popular" />
          <StatCard label="Top Interest" value={topInterest} color={INTEREST_COLORS[topInterest] ?? "#9CA3AF"} sub="most popular" />
        </div>

        {/* Filters */}
        <div style={{
          display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px", padding: "16px 20px",
        }}>
          <input
            type="text"
            placeholder="🔍  Search name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, flex: "1 1 200px", minWidth: "180px" }}
          />
          <select value={personaFilter} onChange={(e) => setPersonaFilter(e.target.value)} style={inputStyle}>
            <option value="all">All Personas</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="solo">Solo</option>
            <option value="friends">Friends</option>
          </select>
          <select value={interestFilter} onChange={(e) => setInterestFilter(e.target.value)} style={inputStyle}>
            <option value="all">All Interests</option>
            <option value="religious">Religious</option>
            <option value="patriotic">Patriotic</option>
            <option value="food">Food</option>
            <option value="heritage">Heritage</option>
          </select>
          <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)} style={inputStyle}>
            <option value="all">All Budgets</option>
            <option value="Budget">Budget (₹)</option>
            <option value="Standard">Standard (₹₹)</option>
            <option value="Moderate">Moderate (₹₹)</option>
            <option value="Luxury">Luxury (₹₹₹)</option>
          </select>
          {(search || personaFilter !== "all" || interestFilter !== "all" || budgetFilter !== "all") && (
            <button
              onClick={() => { setSearch(""); setPersonaFilter("all"); setInterestFilter("all"); setBudgetFilter("all"); }}
              style={{ ...inputStyle, color: "#FCA5A5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer" }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px", overflow: "hidden",
        }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
                {leads.length === 0 ? "No leads collected yet." : "No leads match your filters."}
              </div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Name", "Email", "Phone", "Persona", "Interest", "Arrival", "Budget", "Food Pref", "Submitted", ""].map((h) => (
                      <th key={h} style={{
                        padding: "14px 16px", textAlign: "left",
                        fontSize: "10px", fontWeight: 800,
                        color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em",
                        textTransform: "uppercase", whiteSpace: "nowrap",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: idx < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 700, fontSize: "14px", color: "white" }}>{lead.name ?? "—"}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{lead.email ?? "—"}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{lead.phone ?? "—"}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {lead.persona ? <Badge text={lead.persona} color={PERSONA_COLORS[lead.persona]} /> : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {lead.interest ? <Badge text={lead.interest} color={INTEREST_COLORS[lead.interest]} /> : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600, whiteSpace: "nowrap" }}>
                          {lead.arrival_date ?? "—"}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600, whiteSpace: "nowrap" }}>
                          {lead.budget ?? "—"}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                          {lead.food_pref ?? "—"}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 600, whiteSpace: "nowrap" }}>
                          {new Date(lead.created_at).toLocaleString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={deletingId === lead.id}
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: deletingId === lead.id ? "rgba(255,255,255,0.2)" : "#FCA5A5",
                            borderRadius: "8px",
                            padding: "5px 10px",
                            fontSize: "11px", fontWeight: 700,
                            cursor: deletingId === lead.id ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { if (deletingId !== lead.id) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)"; } }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                        >
                          {deletingId === lead.id ? "..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "32px", fontSize: "12px", color: "rgba(255,255,255,0.15)", fontWeight: 500 }}>
          Movodream Admin · Auto-refreshes every 60s · {leads.length} total leads
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        select option { background: #141420; color: white; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
