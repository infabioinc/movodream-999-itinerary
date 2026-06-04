import { createClient } from "@supabase/supabase-js";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

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

async function fetchLeads(): Promise<Lead[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin] Supabase fetch error:", error);
    return [];
  }

  return (data as Lead[]) ?? [];
}

export default async function AdminPage() {
  const leads = await fetchLeads();
  return <AdminDashboard initialLeads={leads} />;
}
