import { createClient } from "@supabase/supabase-js";
//import { auth } from "@clerk/nextjs/server";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseURL = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey || !supabaseURL || !supabaseServiceKey) {
  throw new Error("Supabase env variable missing");
}

// export const supabase = createClient(supabaseURL, supabaseKey, {
//   async accessToken() {
//     return auth().getToken();
//   },
// });

export const supabaseAdmin = createClient(supabaseURL, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
