import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_KEY;
const supabaseURL = process.env.SUPABASE_URL;

if (!supabaseKey || !supabaseURL) {
  throw new Error("Supabase env variable missing");
}

export const supabase = createClient(supabaseURL, supabaseKey);
