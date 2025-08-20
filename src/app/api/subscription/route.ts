import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

const MOCK_USER_ID = "550e8400-e29b-41d4-a716-446655440001";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("id, monthly_price")
    .eq("user_id", MOCK_USER_ID)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "No active subscription" }, { status: 404 });
  }

  return NextResponse.json({ subscription_id: data.id, monthly_price: data.monthly_price });
}
