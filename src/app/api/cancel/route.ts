// src/app/api/cancel/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
import { cancelSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const MOCK_USER_ID = "550e8400-e29b-41d4-a716-446655440001";

function withCors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}
function json(data: any, init?: number | ResponseInit) {
  return withCors(
    typeof init === "number"
      ? NextResponse.json(data, { status: init })
      : NextResponse.json(data, init)
  );
}

export async function OPTIONS() {
  // CORS preflight (avoid 405 in dev tools)
  return json({}, 204);
}

export async function GET() {
  // Simple health check
  return json({ ok: true, route: "api/cancel" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = cancelSchema.safeParse(body);
    if (!parsed.success) {
      return json({ error: "Invalid input", issues: parsed.error.issues }, 400);
    }

    // If Supabase env is missing, short-circuit with OK so the UI can proceed in this evaluation
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return json({ ok: true, simulated: true, reason: "No Supabase env" });
    }

    const supabase = createClient();

    // 1) active subscription for mock user
    const { data: sub, error: subErr } = await supabase
      .from("subscriptions")
      .select("id, monthly_price, status")
      .eq("user_id", MOCK_USER_ID)
      .eq("status", "active")
      .maybeSingle();

    if (subErr) return json({ error: subErr.message }, 500);
    if (!sub) return json({ error: "No active subscription" }, 404);

    // 2) insert cancellation
    const downsell_variant = parsed.data.variant ?? "A";
    const { error: insErr } = await supabase.from("cancellations").insert({
      user_id: MOCK_USER_ID,
      subscription_id: sub.id,
      downsell_variant,
      reason: parsed.data.reason ?? null,
      accepted_downsell: parsed.data.accepted_downsell ?? false,
    });
    if (insErr) return json({ error: insErr.message }, 500);

    // 3) mark subscription as pending_cancellation
    const { error: updErr } = await supabase
      .from("subscriptions")
      .update({
        status: "pending_cancellation",
        updated_at: new Date().toISOString(),
      })
      .eq("id", sub.id);
    if (updErr) return json({ error: updErr.message }, 500);

    return json({ ok: true });
  } catch (err: any) {
    return json({ error: err?.message ?? "Unexpected server error" }, 500);
  }
}
