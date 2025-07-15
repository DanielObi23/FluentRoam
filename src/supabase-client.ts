
import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey || !supabaseURL || !supabaseServiceKey) {
    throw new Error("Supabase env variable missing")
}

export const supabase = createClient(supabaseURL, supabaseKey)
export const supabaseAdmin = createClient(supabaseURL, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})