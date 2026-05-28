import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,

          persona: body.preferences.selectedPersona,
          interest: body.preferences.selectedInterest,
          arrival_date: body.preferences.arrivalDate,
          start_time: body.preferences.startTime,
          budget: body.preferences.budgetRange,
          food_pref: body.preferences.foodPref
        }
      ]);

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}