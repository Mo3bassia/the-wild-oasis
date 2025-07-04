import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export { SUPABASE_URL };
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

export const supabaseUrl = SUPABASE_URL;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
