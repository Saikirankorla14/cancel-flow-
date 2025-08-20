import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Isomorphic client:
 * - On the server (API routes), use SUPABASE_SERVICE_ROLE_KEY if available (bypasses RLS for this evaluation task).
 * - In the browser, use the public anon key.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const isServer = typeof window === "undefined";
  const key = isServer
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createSupabaseClient(url, key);
}
