import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — evaluated at request time, not build time,
// so missing env vars don't crash the Next.js build.
let _client: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[Supabase] Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or " +
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Add them in Vercel > Project Settings > Environment Variables."
    );
  }

  _client = createClient(url, key);
  return _client;
};

// Convenience alias — binds methods to the real client so `this` is never lost.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});