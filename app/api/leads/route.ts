import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  // Diagnostic: confirm env vars are present at runtime
  console.log("[leads] SUPABASE_URL set:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("[leads] SUPABASE_KEY set:", !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  try {
    const body = await req.json();
    console.log("[leads] Received body:", JSON.stringify(body));

    const { error, data, status } = await supabase
      .from("leads")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          persona: body.preferences?.selectedPersona,
          interest: body.preferences?.selectedInterest,
          arrival_date: body.preferences?.arrivalDate,
          start_time: body.preferences?.startTime,
          budget: body.preferences?.budgetRange,
          food_pref: body.preferences?.foodPref,
        },
      ])
      .select();

    if (error) {
      console.error("[leads] Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: error.message, code: error.code, details: error.details },
        { status: 500 }
      );
    }

    console.log("[leads] Insert success, status:", status, "data:", JSON.stringify(data));
    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("[leads] Caught exception:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}